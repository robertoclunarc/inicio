#STAGE 0 COMPILE TS ON NODEJS
FROM node:12 as ts
WORKDIR /app
COPY ./app/ /app/
RUN npm install
RUN npm run build 
RUN ls -lah