FROM harbor-core.harbor.svc.cluster.local/dockerhub-cache/library/node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]