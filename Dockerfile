FROM node:18-alpine as BUILD_IMAGE

WORKDIR /frontend-tambang

COPY package*.json ./
RUN npm i --silent
COPY . ./
RUN npm run build

FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /frontend-tambang

COPY  --from=BUILD_IMAGE /frontend-tambang/dist /frontend-tambang/dist

EXPOSE 3001


COPY package.json .
COPY vite.config.js .
EXPOSE 3001
CMD ["npm", "run", "preview"]