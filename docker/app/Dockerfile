FROM node:12

EXPOSE 3001

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn --no-progress --non-interactive --frozen-lockfile

COPY ./abis/ /app/abis
COPY ./migrations/ /app/migrations
COPY ./transformers/ /app/transformers
COPY ./scripts /app/scripts

COPY ./.eslintrc /app/.eslintrc
COPY ./config.js /app/config.js
COPY ./loadenv.js /app/loadenv.js
COPY ./repl.js ./repl.js
