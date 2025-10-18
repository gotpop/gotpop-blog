# Use Node.js 22 (matching your package.json requirement)
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files for better layer caching
COPY package.json yarn.lock ./

# Install system dependencies for node-gyp and native modules
RUN apk add --no-cache libc6-compat python3 make g++

# Install dependencies with optimizations
RUN yarn install --frozen-lockfile --production=false --network-timeout 1000000 --verbose

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "start"]