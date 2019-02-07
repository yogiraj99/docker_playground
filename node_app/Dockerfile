FROM node

WORKDIR /opt/src/server

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT npm start

