FROM node:14-alpine
RUN apk add --update --no-cache gammu
COPY .gammurc /etc/gammurc
WORKDIR /app
COPY package.json .
RUN npm install --only production
COPY . .
CMD ["node", "index.js"]
