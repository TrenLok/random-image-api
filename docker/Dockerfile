ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare

COPY . .

RUN pnpm install --frozen-lockfile

FROM node:${NODE_VERSION}-alpine AS runtime
WORKDIR /app

COPY --from=builder /app .

CMD ["npm", "start"]
