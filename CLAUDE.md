# AFTR Solutions website

Company website for AFTR Solutions (Cloud, DevOps, AI, software services). Owner: Muhammad Fasihullah.

## Stack
- React 19 + Vite, plain CSS (no Tailwind), lucide-react icons.
- Light + dark theme via `data-theme` on `<html>`; tokens in `src/index.css` (`:root` and `:root[data-theme='dark']`).
- Multi-page with react-router-dom (BrowserRouter). Routes in `src/App.jsx`:
  `/`, `/services`, `/services/:slug`, `/products`, `/about`, `/blog`, `/blog/:slug`, `/contact`, 404.
- All content lives in `src/data/` — edit there, not in components:
  `site.js` (contact, nav, tech list, steps, home use cases), `services.js` (6 services + detail page content),
  `products.js`, `about.js` (4 co-founders with LinkedIn + values), `blog.js` (posts).
- Pages in `src/pages/`, shared UI in `src/components/` (ServiceCard = hover-animated card, Intro = opening animation).
- Logos in `src/assets/` come in `-light` (black mark, for light bg) and `-dark` (silver mark, for dark bg) pairs; `components/Logo.jsx` swaps them via CSS. `src/assets/intro/` holds the split mark/wordmark/tagline used by the intro.
- Intro animation plays once per browser session (sessionStorage `aftr-intro-seen`).
- Vite `base: '/'` is required for nested routes; nginx `try_files ... /index.html` handles SPA fallback.
- Favicons (A mark only) in `public/`.

## Design rules
- Minimal, elegant, monochrome (Apple / Systems Ltd / 10Pearls style). No bright accent colours.
- Full logo (A mark + AFTR + SOLUTIONS) in hero and intro; horizontal lockup in navbar/footer; A mark only for favicon.
- Everything must look right in both themes and at 390px mobile width.
- Copy: no em dashes (—) anywhere; write plain, natural sentences so it never reads as AI-generated.
- Motion: animated counters (`components/Counter.jsx`) on Home facts; product icons on /products animate per `anim` in `products.js`. Animations stay ON under prefers-reduced-motion (Windows reports it whenever "Animation effects" is off, which hid all motion on the owner’s laptop); only smooth scroll and the hero glow drift are disabled there.

- Services (AI first, in this order): AI Automation & Agents, AI Solutions, Data Engineering & Analytics, DevOps & Cloud, Development (Websites, Apps & ERP), Managed Infrastructure. AI is the lead message across the site.
- Products (AI first): AI WhatsApp Chatbot, Website AI Chatbot, AI Forecasting & Analytics, Phelix ERP (own), Scrap Management (own).
- Founders (all four co-founders): Muhammad Fasihullah (cloud/DevOps/AI), Abdul Rafay (data engineering/AI), Syed Ali Javaid (ERP/AI), Syed Taha Javaid (data engineering).
- Any card that lists services must have the hover treatment (lift, deep shadow, gradient border, cursor spotlight).

## AI chat assistant
- Widget: `src/components/ChatWidget.jsx` (bottom-right, mounted in the App layout). Hidden unless `GET /api/health` returns `{ ready: true }`.
- Backend: `server/index.mjs`, streams plain text from `POST /api/chat`. Provider: Google Gemini free tier via `@google/genai` when `GEMINI_API_KEY` is set (models `GEMINI_MODELS`, falls back on 429/404/5xx); Claude (`claude-opus-5`, paid) only if just `ANTHROPIC_API_KEY` is set. Owner wants it free, so Gemini is the live provider. Rate limit 30 req / 10 min per IP.
- Knowledge: `scripts/build-knowledge.mjs` turns `src/data/*` into `server/knowledge.md` (generated, gitignored), so the bot only knows what the site says. Founders = name + role only; no personal info, no prices. Data files must stay importable by plain Node (no `import.meta.glob` in `src/data/*` except `teamPhotos.js`).
- Key: GitHub secret `GEMINI_API_KEY` (or `ANTHROPIC_API_KEY`) -> deploy writes `.env` on the server -> `aftr-chat` container. nginx proxies `/api/` to `aftr-chat:8787`.
- Local: `cd server && npm i && GEMINI_API_KEY=... npm start`, then `npm run dev` (Vite proxies `/api`).

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- `npm run knowledge` — rebuild the chatbot knowledge file
- `docker compose up -d --build` — serves on 127.0.0.1:8081 (aftr-web + aftr-chat)

## Deployment
- AWS EC2 (Ubuntu 24.04) — the same server that hosts Thesis Craft Mentors.
- Container: multi-stage Dockerfile (node build -> nginx). Bound to 127.0.0.1:8081 and 172.17.0.1:8081 (docker0).
- Caddy runs inside the `thesiscraftmentors` container (Caddyfile baked in the ThesisCraftMentor repo) and reverse-proxies `aftrsolutions.com` + `www` to 172.17.0.1:8081. See DEPLOY.md.
- Contact email: info@aftrsolutions.com
