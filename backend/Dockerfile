# Backend Dockerfile (backend/Dockerfile)
# Multi-stage build: install and build in a node image, run in a smaller node runtime
FROM node:18-alpine AS builder
WORKDIR /app

# Copy only backend package files first for better caching
COPY backend/package*.json ./backend/
COPY backend/tsconfig.json ./backend/

# Install dependencies for backend
RUN cd backend && npm ci --production=false

# Copy backend source and build
COPY backend/ ./backend/
RUN cd backend && npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Copy built backend
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/package*.json ./

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/server.js"]
