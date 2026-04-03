FROM node:22-alpine

WORKDIR /app/backend

COPY backend/ .

RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
