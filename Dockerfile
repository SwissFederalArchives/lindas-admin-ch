FROM node:16-alpine as builder

WORKDIR /src

RUN apk add --no-cache curl git

# Copy the package.json and install the dependencies
COPY package*.json ./
RUN npm ci
COPY . .
RUN node scripts/build.js

FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

ADD content/ ./content
ADD locales/ ./locales
ADD views/ ./views
ADD trifid/ ./trifid
ADD config.json .
COPY --from=builder /src/public ./public

USER node:node

# Ideally set those for published images. To do so, run something like
#
#   docker build . \
#     --tag YOUR_TAG \
#     --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
#     --build-arg COMMIT=$(git rev-parse HEAD) \
#     --build-arg VERSION=$(git describe)
#
ARG BUILD_DATE
ARG COMMIT
ARG VERSION

LABEL org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.name="Trifid" \
      org.label-schema.description="Trifid for lindas.admin.ch" \
      org.label-schema.url="http://lindas.admin.ch" \
      org.label-schema.vcs-url="https://gitlab.ldbar.ch/zazuko/lindas-admin-ch" \
      org.label-schema.vcs-ref=$COMMIT \
      org.label-schema.vendor="Zazuko" \
      org.label-schema.version=$VERSION \
      org.label-schema.schema-version="0.9"

ENTRYPOINT []

# Using npm scripts for running the app allows two things:
#  - Handle signals correctly (Node does not like to be PID1)
#  - Let Skaffold detect it's a node app so it can attach the Node debugger
CMD ["npm", "run", "start"]

EXPOSE 8080
HEALTHCHECK CMD wget -q -O- http://localhost:8080/health
