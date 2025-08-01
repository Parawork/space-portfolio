# Use official Node.js image as the base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Build Next.js app
RUN npm run build

# Expose port (default Next.js port)
EXPOSE 80

# Start the Next.js app
CMD ["npm", "start"]
