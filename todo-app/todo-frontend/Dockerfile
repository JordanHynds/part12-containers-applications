FROM node:16 AS build-stage

ENV REACT_APP_BACKEND_URL="http://localhost:3001"

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm ci

RUN CI=true npm test

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]

# FROM nginx:1.20-alpine

# COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html