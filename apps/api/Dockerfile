FROM node:18.18.2-alpine as base

# skip download uneeded binary
ENV CYPRESS_INSTALL_BINARY=0
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

# for node-gyp
RUN apk add --update python3 make g++\
  && rm -rf /var/cache/apk/*

COPY package.json pnpm-*.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm dlx nx run api:build

# Build the final image
FROM node:18.18.2-alpine
WORKDIR /usr/src/app

# pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY --from=base /usr/src/app/dist/apps/api .
COPY --from=base /usr/src/app/patches ./patches
RUN pnpm install --prod && \
  pnpm store prune && \
  npm remove -g yarn && \
  npm cache clean --force && \
  rm -rf /tmp/* /root/.npm /root/.node-gyp /root/.cache /root/.config /root/.local /root/.pnpm-store /root/.yarn

CMD [ "node", "main.js" ]
