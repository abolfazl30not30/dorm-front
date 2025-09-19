# Frontend Dockerfile
FROM node:16-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --force

# Copy the rest of the application files
COPY . .

# Expose the port
EXPOSE 3000

# Run React app
CMD ["npm", "run", "start"]
