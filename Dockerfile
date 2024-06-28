FROM --platform=linux/amd64 node:20-alpine as builder
RUN apk add g++ make python3

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]