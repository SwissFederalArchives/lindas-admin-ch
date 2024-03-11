FROM docker.io/library/node:20-alpine

# Some default values
ENV DATASET_BASE_URL="https://ld.admin.ch/"
ENV SPARQL_ENDPOINT_URL="https://test.lindas.admin.ch/query"
ENV SPARQL_USERNAME="public"
ENV SPARQL_PASSWORD="public"
ENV SPARQL_PROXY_CACHE_PREFIX="default"
ENV SPARQL_PROXY_CACHE_CLEAR_AT_STARTUP="true"
ENV TRIFID_CONFIG="/app/config.yaml"

RUN apk add --no-cache tini

# Run as the "node" user
USER 1000

# Build the app
WORKDIR /app
COPY package.json package-lock.json ./
ENV NODE_ENV="production"
RUN npm ci && npm cache clean --force
COPY . .

# Expose the HTTP service under the unprivileged (>1024) http-alt port
EXPOSE 8080

ENTRYPOINT [ "tini", "--" ]
CMD [ "node", "./node_modules/.bin/trifid" ]
