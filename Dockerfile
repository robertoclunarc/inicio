#STAGE 0 COMPILE TS ON NODEJS
FROM node:12 as nodeback
WORKDIR /app
COPY ./app/ /app/
RUN npm install && npm run build 
CMD [ "node", "dist/app.js" ]