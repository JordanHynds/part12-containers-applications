FROM node:16

USER node

WORKDIR /usr/src/app

COPY --chown=node:node  . /usr/src/app/

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm start is the command to start the application in development mode
CMD ["npm", "start"]