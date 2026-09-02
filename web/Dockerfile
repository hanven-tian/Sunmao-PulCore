FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY web/package.json web/pnpm-lock.yaml web/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY web/ ./
COPY src/ /src/
RUN pnpm build

FROM node:22-alpine
LABEL org.opencontainers.image.title="PulCore Console" \
      org.opencontainers.image.description="榫卯 PulCore 低代码平台 Web 控制台" \
      org.opencontainers.image.source="https://github.com/hanven-tian/Sunmao-PulCore" \
      org.opencontainers.image.licenses="Apache-2.0"
WORKDIR /app
RUN corepack enable
COPY --from=build /app ./
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
HEALTHCHECK --interval=20s --timeout=5s --start-period=20s --retries=3 CMD wget -qO- http://127.0.0.1:3000/ || exit 1
CMD ["pnpm","exec","wrangler","dev","--config","dist/server/wrangler.json","--ip","0.0.0.0","--port","3000"]
