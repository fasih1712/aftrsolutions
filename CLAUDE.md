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

- Services: AI Automation & Agents, DevOps & Cloud, Development (Websites, Apps & ERP), Managed Infrastructure, AI Solutions, Data Engineering.
- Founders (all four co-founders): Muhammad Fasihullah (cloud/DevOps/AI), Abdul Rafay (data engineering/AI), Syed Ali Javaid (ERP/AI), Syed Taha Javaid (data engineering).
- Any card that lists services must have the hover treatment (lift, deep shadow, gradient border, cursor spotlight).

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- `docker compose up -d --build` — serves on 127.0.0.1:8081

## Deployment
- AWS EC2 (Ubuntu 24.04) — the same server that hosts Thesis Craft Mentors.
- Container: multi-stage Dockerfile (node build -> nginx). Bound to 127.0.0.1:8081 and 172.17.0.1:8081 (docker0).
- Caddy runs inside the `thesiscraftmentors` container (Caddyfile baked in the ThesisCraftMentor repo) and reverse-proxies `aftrsolutions.com` + `www` to 172.17.0.1:8081. See DEPLOY.md.
- Contact email: info@aftrsolutions.com
