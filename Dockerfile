# ========================================
# Stage 1: Dependencies (Builder)
# ========================================
FROM node:22-alpine AS deps

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install ALL dependencies (needed for build)
RUN apk add --no-cache libc6-compat python3 make g++ && \
    yarn install --frozen-lockfile --network-timeout 1000000

# ========================================
# Stage 2: Builder
# ========================================
FROM node:22-alpine AS builder

# Build argument for Storyblok token
ARG STORYBLOK_ACCESS_TOKEN

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Create .env.local for type generation
RUN echo "STORYBLOK_ACCESS_TOKEN=${STORYBLOK_ACCESS_TOKEN}" > .env.local

# Build the application
RUN yarn build && rm -f .env.local

# ========================================
# Stage 3: Production Runner (Final Image)
# ========================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only production dependencies
COPY package.json yarn.lock ./
RUN apk add --no-cache libc6-compat && \
    yarn install --production --frozen-lockfile --network-timeout 1000000 && \
    yarn cache clean && \
    apk del libc6-compat

# Copy built application from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node_modules/.bin/next", "start"]