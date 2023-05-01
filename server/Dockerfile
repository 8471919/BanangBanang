# syntax=docker/dockerfile:1

FROM node:16-alpine

ENV NODE_ENV=development

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]