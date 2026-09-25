# AFTR Solutions — Website

Official website for **AFTR Solutions** — Cloud, DevOps, AI and software engineering.

Built with **React + Vite**. Minimal, elegant design with **light and dark themes** (follows the visitor's system setting, with a toggle in the navbar that remembers their choice).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
  data/site.js          ← ALL website text: services, products, contact info (edit here)
  components/           ← Navbar, Hero, Services, Products, Approach, Why, Contact, Footer
  hooks/useTheme.js     ← light/dark theme logic
  hooks/useReveal.js    ← scroll-in animations
  assets/               ← logos (light + dark versions)
  index.css             ← design tokens (colors for both themes) + all styles
public/                 ← favicons (A mark)
```

## Before going live

- Update `phone` and social links in `src/data/site.js` (email is `info@aftrsolutions.com`).
- The contact form currently opens the visitor's email app (no backend). To receive
  submissions directly, connect it to Formspree, EmailJS or your own API in
  `src/components/Contact.jsx`.

## Deployment

Dockerised (multi-stage Node build → nginx) and deployed to AWS EC2 behind Caddy.

```bash
docker compose up -d --build    # serves on 127.0.0.1:8081
```

Full steps (DNS, Caddy reverse proxy, updates): see [DEPLOY.md](DEPLOY.md).
