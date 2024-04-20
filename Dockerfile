FROM node:18-alpine3.18
# RUN apt-get update
# RUN apt-get install -y openssl
WORKDIR /app


# copy the package.json and package-lock.json to install dependencies to take advantage of cached Docker layers
COPY package*.json ./

# install dependencies
RUN npm install

COPY . .
