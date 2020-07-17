#STAGE 0 COMPILE TS ON NODEJS
FROM node:12 as ts
WORKDIR /app
COPY ./app/ /app/
RUN npm install
RUN npm run build 
RUN ls -lah
RUN npm start

#STAGE 1 DEPLOY ON NODE
#FROM node:12 as node
#WORKDIR /app
#RUN mkdir dist
#COPY --from=ts /dist/ /app/dist/
#COPY ./app/package.json /app/package.json
#COPY ./app/package-lock.json /app/package-lock.json
#RUN npm install
#RUN npm start