# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy only backend files
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
