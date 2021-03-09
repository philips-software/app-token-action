FROM node:14-slim
COPY dist /action

ENTRYPOINT ["node", "/action/index.js"]

