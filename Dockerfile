FROM node:alpine

WORKDIR /frontend-tambang

COPY package*.json ./
RUN npm i --silent
COPY . ./
EXPOSE 3001