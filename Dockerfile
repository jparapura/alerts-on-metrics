FROM node:22-alpine3.19

# Alpine update
RUN apk update \
&& apk upgrade \
&& rm -rf /var/cache/apk/*

USER node
WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

# NOTE: .env file must exist and be filled with secrets
# for a container to start
COPY --chown=node . .

RUN npm run build

ENTRYPOINT ["node", "dist/index.js"]