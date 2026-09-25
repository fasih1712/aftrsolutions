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

- Update `email`, `phone` and social links in `src/data/site.js`.
- The contact form currently opens the visitor's email app (no backend). To receive
  submissions directly, connect it to Formspree, EmailJS or your own API in
  `src/components/Contact.jsx`.

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to
**GitHub Pages** on every push to `main`.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The build output (`dist/`) is fully static, so it can also be hosted on Vercel,
Netlify, Cloudflare Pages, S3 + CloudFront, or Nginx.
