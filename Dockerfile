FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY docs/package.json docs/package-lock.json ./docs/

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
