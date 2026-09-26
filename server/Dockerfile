# AFTR website assistant (chat API). Build context is the repo root.

# ---- Knowledge stage: turn the site's data files into server/knowledge.md ----
FROM node:22-alpine AS knowledge
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY src/data ./src/data
COPY scripts ./scripts
RUN mkdir -p server && node scripts/build-knowledge.mjs

# ---- Runtime ----
FROM node:22-alpine
WORKDIR /srv
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/index.mjs ./
COPY --from=knowledge /app/server/knowledge.md ./
USER node
EXPOSE 8787
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8787/api/health >/dev/null || exit 1
CMD ["node", "index.mjs"]
