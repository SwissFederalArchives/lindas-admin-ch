FROM docker.io/library/node:20-alpine

# some default values
ENV DATASET_BASE_URL=""
ENV SPARQL_ENDPOINT_URL="https://test.lindas.admin.ch/query"
ENV SPARQL_USERNAME="public"
ENV SPARQL_PASSWORD="public"
ENV SPARQL_PROXY_CACHE_PREFIX="default"
ENV SPARQL_PROXY_CACHE_CLEAR_AT_STARTUP="true"

RUN apk add --no-cache tini

# run as the "node" user
USER 1000

# build the app
WORKDIR /app
COPY package.json package-lock.json ./
ENV NODE_ENV="production"
RUN npm ci && npm cache clean --force
COPY . .

# expose the HTTP service under the unprivileged (>1024) http-alt port
EXPOSE 8080

ENTRYPOINT [ "tini", "--" ]
CMD [ "node", "./node_modules/.bin/trifid" ]
