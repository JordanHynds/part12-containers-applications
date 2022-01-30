FROM node:16

USER node

WORKDIR /usr/src/app

COPY --chown=node:node  . /usr/src/app/

RUN npm ci

ENV DEBUG=playground:*

CMD npm start

