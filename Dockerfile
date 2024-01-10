# First stage: Build the application
FROM node:20-alpine as builder_runtime

WORKDIR /app

# Copy all
COPY . /app/
COPY ./.env-cmdrc /app/packages/siaj

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["pnpm", "start"]
