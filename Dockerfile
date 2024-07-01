# Use the official node:20-alpine image as the base for both development and production stages
FROM node:20-alpine AS development

WORKDIR /src/app

# Copy package files for dependency resolution
COPY package*.json ./

# Install dependencies for development and testing
RUN npm install glob rimraf --save-dev

# Install only production dependencies (if applicable)
RUN npm install --only=production

# Copy application code from the current context to the working directory
COPY . .

# Build the application for development (if required)
RUN npm run build

# Start the application in development mode
CMD [ "npm", "run", "start:dev" ]

# Use node:20-alpine for production stage as well
FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /src/app

# Copy package files for dependency resolution
COPY package*.json ./

# Install only production dependencies (if applicable)
RUN npm install --only=production

# Copy application code from the current context to the working directory
COPY . .

# Copy the built production artifacts from the development stage
COPY --from=development /src/app/dist ./dist

# Start the application in production mode
CMD [ "node", "dist/main" ]