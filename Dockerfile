# ========================================
# Stage 1: Dependencies (Builder)
# ========================================
FROM node:22-alpine AS deps

WORKDIR /app

# Setup better npm mirrors and cache settings
RUN echo "registry=https://registry.npmjs.org/" > .npmrc && \
    echo "fetch-retries=5" >> .npmrc && \
    echo "fetch-retry-mintimeout=20000" >> .npmrc && \
    echo "fetch-retry-maxtimeout=120000" >> .npmrc && \
    echo "network-timeout=300000" >> .npmrc

# Copy package files
COPY package.json yarn.lock ./

# Install ALL dependencies (including dev) with retry logic - we need dev deps for build
RUN apk add --no-cache libc6-compat python3 make g++ && \
    yarn config set network-timeout 600000 && \
    for i in 1 2 3; do \
        echo "Attempt $i: Installing all dependencies..." && \
        yarn install --frozen-lockfile --network-timeout 600000 --network-concurrency 1 && break || \
        echo "Attempt $i failed, retrying in 10 seconds..." && \
        sleep 10; \
    done

# ========================================
# Stage 2: Builder
# ========================================
FROM node:22-alpine AS builder

# Build argument for Storyblok token
ARG STORYBLOK_ACCESS_TOKEN

WORKDIR /app

# Copy dependencies from deps stage (includes all deps including TypeScript)
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Create .env.local for type generation
RUN echo "STORYBLOK_ACCESS_TOKEN=${STORYBLOK_ACCESS_TOKEN}" > .env.local

# Build the application
RUN yarn build && rm -f .env.local

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

# Copy production-only node_modules from deps stage
# Filter out dev dependencies by reinstalling production only
COPY package.json yarn.lock ./
COPY --from=deps /app/.npmrc ./.npmrc

# Install ONLY production dependencies (much smaller, faster, less network calls)
RUN apk add --no-cache libc6-compat && \
    yarn config set network-timeout 600000 && \
    yarn install --production --frozen-lockfile --network-timeout 600000 --network-concurrency 1 && \
    # Add TypeScript for next.config.ts (needed at runtime)
    yarn add typescript --network-timeout 300000 && \
    yarn cache clean && \
    rm -f .npmrc && \
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