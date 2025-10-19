# Use Node.js 22 (matching your package.json requirement)
FROM node:22-alpine

# Accept build argument for Storyblok token
ARG STORYBLOK_ACCESS_TOKEN

# Set working directory
WORKDIR /app

# Copy package files for better layer caching
COPY package.json yarn.lock ./

# Install system dependencies for node-gyp and native modules
RUN apk add --no-cache libc6-compat python3 make g++

# Install dependencies with optimizations
RUN yarn install --frozen-lockfile --production=false --network-timeout 1000000

# Copy source code
COPY . .

# Create .env.local file from build arg for type generation (after COPY to ensure it's not overwritten)
RUN echo "STORYBLOK_ACCESS_TOKEN=${STORYBLOK_ACCESS_TOKEN}" > .env.local && \
    cat .env.local

# Build the application (this will run generate-types which needs the token)
RUN yarn build

# Remove .env.local after build (security)
RUN rm -f .env.local

# Expose port 3000
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["yarn", "start"]