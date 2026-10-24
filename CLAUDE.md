# AFTR Solutions website

Company website for AFTR Solutions (Cloud, DevOps, AI, software services). Owner: Muhammad Fasihullah.

## Stack
- React 19 + Vite, plain CSS (no Tailwind), lucide-react icons.
- Light + dark theme via `data-theme` on `<html>`; tokens in `src/index.css` (`:root` and `:root[data-theme='dark']`).
- Multi-page with react-router-dom (BrowserRouter). Routes in `src/App.jsx`:
  `/`, `/services`, `/services/:slug`, `/products`, `/about`, `/blog`, `/blog/:slug`, `/contact`, `/privacy`, `/hub`, 404,
  plus the Innovation Hub pages `/hub/login`, `/hub/request-access`, `/hub/app`, `/hub/demos/:slug`, `/hub/account`, `/hub/admin`
  (lazy-loaded; see "Innovation Hub" below).
- All content lives in `src/data/` — edit there, not in components:
  `site.js` (contact, nav, tech list, steps, home use cases), `services.js` (7 services + detail page content),
  `products.js`, `about.js` (4 co-founders with LinkedIn + values), `blog.js` (posts), `hub.js` (Innovation Hub demos).
- Pages in `src/pages/`, shared UI in `src/components/` (ServiceCard = hover-animated card, Intro = opening animation).
- Logos in `src/assets/` come in `-light` (black mark, for light bg) and `-dark` (silver mark, for dark bg) pairs; `components/Logo.jsx` swaps them via CSS. `src/assets/intro/` holds the split mark/wordmark/tagline used by the intro.
- Intro animation plays once per browser session (sessionStorage `aftr-intro-seen`).
- Vite `base: '/'` is required for nested routes.
- SEO / prerendering: `npm run build` = client build + SSR build (`src/entry-server.jsx`) + `scripts/prerender.mjs`, which writes
  a real HTML file per route (`dist/services/devops-cloud.html` etc.) with its own title, description, canonical, Open Graph and
  JSON-LD from `src/seo.js`, plus `404.html` and `sitemap.xml` (generated, don't add one to `public/`). New page or route →
  add it to `pages`/`allRoutes()` in `src/seo.js`. nginx serves `try_files $uri $uri.html $uri/ =404` (real 404s, no SPA fallback).
- Components must render on the server too: no `window`/`document`/storage access during render (use effects).
- Security headers + CSP live in `security-headers.conf` (included in every nginx location). No inline scripts: the theme
  bootstrap is `public/theme-init.js`. Fonts are self-hosted via @fontsource (no Google Fonts).
- Images: WebP in `src/assets/`; `public/og-image.png` (1200x630) is the link-preview image.
- Favicons (A mark only) in `public/`.

## Design rules
- Minimal, elegant, monochrome (Apple / Systems Ltd / 10Pearls style). No bright accent colours.
- Full logo (A mark + AFTR + SOLUTIONS) in hero and intro; horizontal lockup in navbar/footer; A mark only for favicon.
- Everything must look right in both themes and at 390px mobile width.
- Copy: no em dashes (—) anywhere; write plain, natural sentences so it never reads as AI-generated.
- Motion: animated counters (`components/Counter.jsx`) on Home facts; product icons on /products animate per `anim` in `products.js`. Animations stay ON under prefers-reduced-motion (Windows reports it whenever "Animation effects" is off, which hid all motion on the owner’s laptop); only smooth scroll and the hero glow drift are disabled there.

- Services (AI first, in this order): AI Automation & Agents, AI Solutions, Data Engineering & Analytics, DevOps & Cloud, Development (Websites, Apps & ERP), Digital Marketing (SEO, Social & Performance), Managed Infrastructure. AI is the lead message across the site.
- Products (AI first): WhatsApp AI Chatbot, Website AI Chatbot, AI Forecasting & Analytics, Phelix ERP (own), Scrap Management (own).
- Founders (all four co-founders): Muhammad Fasihullah (cloud/DevOps/AI), Abdul Rafay (data engineering/AI), Syed Ali Javaid (ERP/AI), Syed Taha Javaid (data engineering).
- Any card that lists services must have the hover treatment (lift, deep shadow, gradient border, cursor spotlight).

## AI chat assistant
- Widget: `src/components/ChatWidget.jsx` (bottom-right, mounted in the App layout). Hidden unless `GET /api/health` returns `{ ready: true }`.
- Backend: `server/index.mjs`, streams plain text from `POST /api/chat`. Provider: Google Gemini free tier via `@google/genai` when `GEMINI_API_KEY` is set (models `GEMINI_MODELS`, falls back on 429/404/5xx); Claude (`claude-opus-5`, paid) only if just `ANTHROPIC_API_KEY` is set. Owner wants it free, so Gemini is the live provider. Rate limit 30 req / 10 min per IP (real IP via nginx realip from Caddy's X-Forwarded-For) and a site-wide daily cap (`CHAT_DAILY_LIMIT`, default 800).
- Knowledge: `scripts/build-knowledge.mjs` turns `src/data/*` into `server/knowledge.md` (generated, gitignored), so the bot only knows what the site says. Founders = name + role only; no personal info, no prices. Data files must stay importable by plain Node (no `import.meta.glob` in `src/data/*` except `teamPhotos.js`).
- Key: GitHub secret `GEMINI_API_KEY` (or `ANTHROPIC_API_KEY`) -> deploy writes `.env` on the server -> `aftr-chat` container. nginx proxies `/api/` to `aftr-chat:8787`.
- Local: `cd server && npm i && GEMINI_API_KEY=... npm start`, then `npm run dev` (Vite proxies `/api`).

## Innovation Hub
- Login-protected area where approved prospects try live product demos. Public landing `/hub` (prerendered, in sitemap);
  everything under `/hub/*` is lazy-loaded, prerendered only as a loader (`privateRoutes()` in `src/seo.js`), noindex
  (meta + nginx `X-Robots-Tag`, `no-store`) and kept out of the sitemap.
- Backend: `hub/index.mjs` (+ `hub/db.mjs`), container `hub-api` on :8790, nginx proxies `/api/hub/`. SQLite via better-sqlite3 at
  `/data/hub.db` on the `hub-data` volume; argon2id passwords; session = random token in cookie `aftr_hub` (HttpOnly, Secure,
  SameSite=Lax, Domain=.aftrsolutions.com, 7 days; only the SHA-256 is stored). POSTs need an allowed `Origin` (CSRF). Rate limits:
  login 10 / 15 min, signup 5 / hour per IP. Sign-up -> `pending`; an admin approves / rejects / revokes / resets at `/hub/admin`.
- Admins: GitHub secrets `HUB_ADMIN_EMAILS` (comma-separated) + `HUB_ADMIN_PASSWORD` create them on first start only.
- New-request email: `hub/notify.mjs` (nodemailer over SMTP), on when secrets `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS` are set;
  goes to `HUB_NOTIFY_EMAIL` (default info@aftrsolutions.com), max 50/day, never blocks a sign-up.
- Frontend: `components/HubSessionProvider.jsx` + `hooks/useHubSession.js` (session), `hooks/hubApi.js` (fetch helper, safe `next`),
  `components/RequireHub.jsx` (guard), `components/DemoCard.jsx`, `components/HubUserMenu.jsx` (navbar). Only browsers that signed
  in before (localStorage `aftr-hub`) call `/api/hub/me` on load.
- Demos: `src/data/hub.js`, one per product, `type` live | video | coming-soon. Every demo is coming-soon until its container is
  deployed. Live demos run as their own containers on demo subdomains protected by Caddy `forward_auth` ->
  `/api/hub/auth/verify?redirect=1` (see DEPLOY.md "Innovation Hub demos"). Sample data only, never client data.
- Tests: `hub/test-flow.mjs` (API flow + security checks), `npm run a11y` covers the Hub pages with a mocked session.
- Local: `cd hub && npm i && HUB_ADMIN_EMAILS=you@example.com HUB_ADMIN_PASSWORD=... npm start`, then `npm run dev` (Vite proxies `/api/hub`).

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- `npm run knowledge` — rebuild the chatbot knowledge file
- `docker compose up -d --build` — serves on 127.0.0.1:8081 (aftr-web + aftr-chat + hub-api)

## Deployment
- AWS EC2 (Ubuntu 24.04) — the same server that hosts Thesis Craft Mentors.
- Container: multi-stage Dockerfile (node build -> nginx-unprivileged, listens on 8080). Bound to 127.0.0.1:8081 and 172.17.0.1:8081 (docker0).
- Caddy runs inside the `thesiscraftmentors` container (Caddyfile baked in the ThesisCraftMentor repo) and reverse-proxies `aftrsolutions.com` + `www` to 172.17.0.1:8081. See DEPLOY.md.
- Contact email: info@aftrsolutions.com
