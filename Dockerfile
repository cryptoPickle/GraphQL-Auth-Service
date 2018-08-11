FROM node:10-alpine

LABEL maintainer='halilibrahimirmak@gmail.com'

ENV PORT=9090
ENV DEST_FOLDER=/usr/src/auth-service

WORKDIR $DEST_FOLDER

COPY . $DEST_FOLDER





RUN npm install knex node-dev pm2 webpack -g && \
    mkdir -p $DEST_FOLDER && \
    npm install


EXPOSE $PORT
EXPOSE 9229