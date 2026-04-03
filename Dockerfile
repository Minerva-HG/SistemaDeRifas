FROM node:22-alpine

WORKDIR /app

COPY backend/ .

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "server.js"]
