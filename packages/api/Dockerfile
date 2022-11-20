FROM node:18.12.1-alpine
RUN apk add --update --no-cache gammu
COPY .gammurc /etc/gammurc
WORKDIR /app
COPY package.json package.json
RUN npm install --omit dev
COPY users.json users.json
COPY index.js index.js
COPY lib lib
CMD ["node", "index.js"]
