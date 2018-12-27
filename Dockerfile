FROM node:alpine

WORKDIR /server

COPY package.json /server/package.json

RUN npm install --production

COPY . /server

RUN npm run postinstall && ls /server/dist

EXPOSE 8080

CMD ["npm", "start"]
