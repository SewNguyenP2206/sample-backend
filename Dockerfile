FROM harbor-core.harbor.svc.cluster.local/dockerhub-cache/library/node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
