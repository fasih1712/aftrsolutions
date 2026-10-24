# AFTR Innovation Hub API. Build context is the repo root (it also needs src/data/hub.js).

# ---- Dependencies: better-sqlite3 and argon2 are native modules. Prebuilt binaries are
# used when available; the toolchain is only a fallback for compiling better-sqlite3. ----
FROM node:22-alpine AS deps
WORKDIR /app/hub
RUN apk add --no-cache python3 make g++
COPY hub/package*.json ./
RUN npm ci --omit=dev

# ---- Runtime ----
FROM node:22-alpine
WORKDIR /app
# Same layout as the repo, so `../src/data/hub.js` resolves; "type": "module" makes it ESM.
RUN echo '{ "type": "module" }' > package.json \
 && mkdir -p /data && chown node:node /data
COPY --from=deps /app/hub/node_modules ./hub/node_modules
COPY hub/package.json hub/index.mjs hub/db.mjs hub/notify.mjs ./hub/
COPY src/data/hub.js ./src/data/hub.js
ENV NODE_ENV=production PORT=8790
USER node
EXPOSE 8790
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8790/api/hub/health >/dev/null || exit 1
CMD ["node", "hub/index.mjs"]
