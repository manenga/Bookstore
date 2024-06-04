# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
# guide: https://dev.to/code42cate/how-to-dockerize-a-bun-app-38e4

########################### LIGHT APPROACH WIP ###########################

FROM oven/bun
COPY . .
RUN bun install
EXPOSE 100
CMD ["bun", "app/index.ts"]

################################# CLI WIP #################################
# tag it as build
# FROM oven/bun AS build 

# WORKDIR /app

# COPY bun.lockb .
# COPY package.json .

# RUN bun install --frozen-lockfile

# COPY app ./src

# # compile everything to a binary called cli which includes the bun runtime
# RUN bun build ./src/index.ts --compile --outfile cli

# # use a smaller image without bun
# FROM ubuntu:22.04 

# WORKDIR /app

# # copy the compiled binary from the build image
# COPY --from=build /app/cli /app/cli

# # execute the binary!
# EXPOSE 80
# EXPOSE 80/tcp
# CMD ["/app/cli"]
