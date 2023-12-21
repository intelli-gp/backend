FROM node:18.3.0-alpine3.14

WORKDIR /app

# copy the package.json and package-lock.json to install dependencies to take advantage of cached Docker layers
COPY package*.json ./

RUN npm install

COPY . .
