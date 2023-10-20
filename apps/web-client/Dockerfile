FROM node:18.18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

# skip download uneeded binary
ENV CYPRESS_INSTALL_BINARY=0
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# for node-gyp
RUN apk add --update python3 make g++\
  && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY package.json pnpm-*.yaml /usr/src/app/
COPY patches /usr/src/app/patches
RUN pnpm install --frozen-lockfile

COPY . /usr/src/app

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG PORT
ENV PORT=${PORT}
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ARG NEXT_PUBLIC_FIREBASE_CONFIG
ENV NEXT_PUBLIC_FIREBASE_CONFIG=${NEXT_PUBLIC_FIREBASE_CONFIG}
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js
RUN pnpm dlx nx run web-client:build

# Step 2. Production image, copy all the files and run next
FROM base AS runner

# pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /usr/src/app

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /usr/src/app/dist/apps/web-client ./
COPY --from=builder /usr/src/app/patches ./patches
RUN pnpm install && \
  pnpm store prune && \
  npm remove -g yarn && \
  npm cache clean --force && \
  rm -rf /tmp/* /root/.npm /root/.node-gyp /root/.cache /root/.config /root/.local /root/.pnpm-store /root/.yarn

# Environment variables must be redefined at run time
ARG PORT
ENV PORT=${PORT}
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ARG NEXT_PUBLIC_FIREBASE_CONFIG
ENV NEXT_PUBLIC_FIREBASE_CONFIG=${NEXT_PUBLIC_FIREBASE_CONFIG}
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# The following line to disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us
CMD ["pnpm", "start"]
