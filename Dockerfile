FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/package.json .
COPY --from=prerelease /usr/src/app/build build

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "start" ]

# FROM oven/bun:1 AS dependencies-env
# COPY . /app

# FROM dependencies-env AS development-dependencies-env
# COPY ./package.json bun.lockb /app/
# WORKDIR /app
# RUN bun i --frozen-lockfile

# FROM dependencies-env AS production-dependencies-env
# COPY ./package.json bun.lockb /app/
# WORKDIR /app
# RUN bun i --production

# FROM dependencies-env AS build-env
# COPY ./package.json bun.lockb /app/
# COPY --from=development-dependencies-env /app/node_modules /app/node_modules
# WORKDIR /app
# RUN bun run build

# FROM dependencies-env
# COPY ./package.json bun.lockb /app/
# p/n-dependencies-env /app/node_modules /app/node_modules
# COPY --from=build-env /app/build /app/build
# WORKDIR /app
# CMD ["bun", "run", "start"]