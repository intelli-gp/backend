FROM node:18-alpine3.18

WORKDIR /app

# copy the package.json and package-lock.json to install dependencies to take advantage of cached Docker layers
COPY package*.json ./

# install dependencies
RUN npm install

COPY . .