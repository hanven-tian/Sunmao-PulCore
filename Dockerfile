FROM node:22-alpine
LABEL org.opencontainers.image.title="PulCore API" \
      org.opencontainers.image.description="榫卯 PulCore 微内核与插件 API" \
      org.opencontainers.image.source="https://github.com/hanven-tian/Sunmao-PulCore" \
      org.opencontainers.image.licenses="Apache-2.0"
WORKDIR /app
COPY package.json ./
COPY src ./src
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
EXPOSE 3000
HEALTHCHECK --interval=20s --timeout=3s --start-period=10s --retries=3 CMD wget -qO- http://127.0.0.1:3000/health || exit 1
USER node
CMD ["npm","start"]
