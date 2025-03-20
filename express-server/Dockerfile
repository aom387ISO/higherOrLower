# Dockerfile for express server
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Bind the app to port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]