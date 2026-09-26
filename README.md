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

## Pages

`/` Home · `/services` · `/services/:slug` (one page per service) · `/products` · `/about` · `/blog` · `/blog/:slug` · `/contact`

## Project structure

```
src/
  data/                 ← ALL content (edit here)
    site.js               contact info, navigation, technologies
    services.js           the 5 services + their detail-page content
    products.js           products
    about.js              team (4 members) + values
    blog.js               blog posts
  pages/                ← one file per page
  components/           ← Navbar, Footer, Intro (opening animation), ServiceCard, …
  hooks/                ← theme, scroll reveal, page title
  assets/               ← logos (light + dark) and intro animation pieces
  index.css             ← design tokens for both themes + all styles
public/                 ← favicons (A mark)
```

## Adding a blog post

Copy an object in `src/data/blog.js`, give it a new `slug`, and put it at the top of the list.

## Before going live

- Update `phone` and social links in `src/data/site.js` (email is `info@aftrsolutions.com`).
- Replace team names / roles / photos in `src/data/about.js`, and review the About page story and blog posts.
- The contact form currently opens the visitor's email app (no backend). To receive
  submissions directly, connect it to Formspree, EmailJS or your own API in
  `src/components/Contact.jsx`.

## Deployment

Dockerised (multi-stage Node build → nginx) and deployed to AWS EC2 behind Caddy.

```bash
docker compose up -d --build    # serves on 127.0.0.1:8081
```

Full steps (DNS, Caddy reverse proxy, updates): see [DEPLOY.md](DEPLOY.md).
