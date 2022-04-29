FROM node:12-alpine3.11

COPY . .

RUN npm install

CMD ["node", "api/server.js"]