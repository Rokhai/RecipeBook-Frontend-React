FROM node:22.14.0-alpine

# Create app directory
WORKDIR /recipebook/frontend

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port 3000
EXPOSE 5173

# Start app
CMD ["npm", "run", "dev"]