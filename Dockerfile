# ========================================
# Stage 1: Dependencies (Builder)
# ========================================
FROM node:22-alpine AS deps

# Build argument for GitHub token
ARG GITHUB_TOKEN

WORKDIR /app

# Copy package files first
COPY package.json yarn.lock ./

# Setup npm authentication for GitHub Packages and other settings
RUN if [ -n "$GITHUB_TOKEN" ]; then \
        echo "@gotpop:registry=https://npm.pkg.github.com" > /app/.npmrc && \
        echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" >> /app/.npmrc; \
    else \
        touch /app/.npmrc; \
    fi && \
    echo "registry=https://registry.npmjs.org/" >> /app/.npmrc && \
    echo "fetch-retries=5" >> /app/.npmrc && \
    echo "fetch-retry-mintimeout=20000" >> /app/.npmrc && \
    echo "fetch-retry-maxtimeout=120000" >> /app/.npmrc && \
    echo "network-timeout=300000" >> /app/.npmrc

# Install ALL dependencies (including dev) with retry logic - we need dev deps for build
RUN apk add --no-cache libc6-compat python3 make g++ && \
    yarn config set network-timeout 600000 && \
    for i in 1 2 3; do \
        echo "Attempt $i: Installing all dependencies..." && \
        yarn install --frozen-lockfile --network-timeout 600000 --network-concurrency 1 && break || \
        echo "Attempt $i failed, retrying in 10 seconds..." && \
        sleep 10; \
    done && \
    rm -f /app/.npmrc

# ========================================
# Stage 2: Builder
# ========================================
FROM node:22-alpine AS builder

# Build argument for Storyblok token
ARG STORYBLOK_ACCESS_TOKEN

WORKDIR /app

# Make build arg available as environment variable
ENV STORYBLOK_ACCESS_TOKEN=${STORYBLOK_ACCESS_TOKEN}

# Copy dependencies from deps stage (includes all deps including TypeScript)
COPY --from=deps /app/node_modules ./node_modules

# Copy configuration files first
COPY biome.json .biomeignore ./

# Copy source code
COPY . .

# Build the application (skip formatting in Docker to avoid git/ignore issues)
RUN yarn generate-types && yarn next build

# Ensure correct permissions
RUN mkdir -p /app/.next && chown -R 1001:1001 /app/.next

# ========================================
# Stage 3: Production Runner (Final Image)
# ========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Build argument for GitHub token (needed for production deps install)
ARG GITHUB_TOKEN

# Copy production-only node_modules from deps stage
# Filter out dev dependencies by reinstalling production only
COPY package.json yarn.lock ./

# Setup npm authentication and install ONLY production dependencies
RUN if [ -n "$GITHUB_TOKEN" ]; then \
        echo "@gotpop:registry=https://npm.pkg.github.com" > /app/.npmrc && \
        echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" >> /app/.npmrc; \
    else \
        touch /app/.npmrc; \
    fi && \
    echo "registry=https://registry.npmjs.org/" >> /app/.npmrc && \
    echo "fetch-retries=5" >> /app/.npmrc && \
    echo "fetch-retry-mintimeout=20000" >> /app/.npmrc && \
    echo "fetch-retry-maxtimeout=120000" >> /app/.npmrc && \
    echo "network-timeout=300000" >> /app/.npmrc && \
    apk add --no-cache libc6-compat && \
    yarn config set network-timeout 600000 && \
    yarn install --production --frozen-lockfile --network-timeout 600000 --network-concurrency 1 && \
    # Add TypeScript for next.config.ts (needed at runtime)
    yarn add typescript --network-timeout 300000 && \
    yarn cache clean && \
    rm -f /app/.npmrc && \
    apk del libc6-compat

# Copy built application from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder --chown=nextjs:nodejs /app/src ./src

# Ensure correct permissions for node_modules
RUN chown -R nextjs:nodejs /app/node_modules

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node_modules/.bin/next", "start"]