FROM node:alpine
RUN npm install -g express nodemon

WORKDIR /app
ADD . /app
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
