FROM node:18.6

WORKDIR /app

COPY . /app/

#first dot represent source(copy all files form current destination) second dot represent destination(paste all files in app direstory)
#COPY package.json/app(ONE BY ONE)


# RUN npm install
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
    npm install; \
else\
    npm install --only=production; \
fi


#ABOVE FOUR LINES WILL RUN AT COMPILE TIME(BUILDING THE IMAGE.IT WILL INSTALL ALL THE DEPENDENCIES FROM PACKAGE.JSON)
#BELOW TWO LINES WILL RUN AT RUN TIME(AT CONTAINER)

#docker build .(to build the image)
#build the image with custom name=> docker build -t(tag) express-crud-image

# EXPOSE 3000

ENV PORT 3000
EXPOSE ${PORT}

CMD ["nodemon", "server.js"]


# CMD ["nodemon","server.js"]
# CMD["npm","run","dev"]=>BEST PRACTICE(change dev)
# CMD ["npm","start"]
# CMD ["npm","run","dev"]