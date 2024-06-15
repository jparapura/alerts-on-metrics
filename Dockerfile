FROM node:21

USER node

WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm install

# NOTE: .env file must exist and be filled with secrets
# for a container to start
COPY --chown=node . .

RUN npm run build

ENTRYPOINT ["node", "dist/index.js"]