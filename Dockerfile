FROM node:latest

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY src /app/src
COPY tsconfig.json /app
COPY prisma /app/prisma
COPY .env /app

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]