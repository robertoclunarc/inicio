#Este es la base
FROM node:12 as builder
WORKDIR /app
COPY ./app/ /app/
RUN npm install && npm run build 

#una vez que se compila se crea el contenedor definitivo
FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules 
CMD [ "node", "dist/app.js" ]

#STAGE 0 COMPILE TS ON NODEJS
# FROM node:12 as nodeback
# WORKDIR /app
# COPY ./app/ /app/
# RUN npm install && npm run build 
# CMD [ "node", "dist/app.js" ]