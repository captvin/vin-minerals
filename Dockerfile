FROM node:alpine

WORKDIR /frontend-tambang

COPY package*.json ./
RUN npm i vite --save-dev
RUN npm i --silent
COPY . ./
EXPOSE 3001