FROM node:10

WORKDIR /usr/src/emergency-mobile-app

COPY . ./

RUN npm install
RUN npm run build

EXPOSE 8080

ENTRYPOINT [ "npm", "run", "start" ]
