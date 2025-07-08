# Use Node.js 20 for better compatibility
FROM node:20-alpine AS base

# Install dependencies needed for building
RUN apk update && apk add --no-cache \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:20-alpine AS runtime

WORKDIR /app

# Install serve for static hosting
RUN npm install -g serve

# Copy built application
COPY --from=base /app/dist ./dist

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "dist", "-s", "-l", "3000"]
