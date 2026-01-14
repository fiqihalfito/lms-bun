FROM oven/bun:1 AS dependencies-env

# ARG HTTP_PROXY
# ENV HTTP_PROXY=$HTTP_PROXY

WORKDIR /app
COPY . /app

# FROM dependencies-env AS development-dependencies-env
# COPY ./package.json bun.lock /app/
# WORKDIR /app
# RUN HTTP_PROXY=$HTTP_PROXY HTTPS_PROXY=$HTTP_PROXY bun i --frozen-lockfile

# FROM dependencies-env AS production-dependencies-env
# COPY ./package.json bun.lock /app/
# WORKDIR /app
# RUN HTTP_PROXY=$HTTP_PROXY HTTPS_PROXY=$HTTP_PROXY bun i --production

FROM dependencies-env AS build-env
COPY ./package.json bun.lock node-modul-development.tar.gz /app/
# COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN tar -xzf node-modul-development.tar.gz; \
    bun run build

FROM dependencies-env
COPY ./package.json bun.lock node-modul-production.tar.gz /app/
# COPY --from=production-dependencies-env /app/node_modules /app/node_modules
RUN tar -xzf /app/node-modul-production.tar.gz
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["bun", "run", "start"]