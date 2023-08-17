FROM node:14

WORKDIR /frontend-tambang

COPY package*.json ./
RUN npm i --silent
COPY . ./
RUN npm run build
EXPOSE 3001

CMD ["npm", "run", "dev"]