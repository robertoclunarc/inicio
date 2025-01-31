#Este es la base
FROM node:12 as builder
WORKDIR /app
COPY ./app/ /app/
RUN npm install && npm run build 

#una vez que se compila se crea el contenedor definitivo
FROM mhart/alpine-node:12
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules 
CMD [ "node", "dist/app.js" ]
