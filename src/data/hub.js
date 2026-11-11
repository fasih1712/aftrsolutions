// Innovation Hub demos, one per product in products.js (matched by `product` title).
// Read by the website (src/pages/Hub*.jsx) and by the hub-api service (hub/index.mjs),
// so keep it plain data that Node can import: no icons, no Vite-only imports.
//
// type: 'live'        -> deployed demo. Its URL normally lives in hub/demo-urls.mjs (server-only), because
//                        this file ships in the public JS bundle.
// openUrl (optional)  -> a public demo link: the card opens it straight away in a new tab, no sign-in needed.
//                        Only for demos the owner chose to make public (they are visible to everyone).
//       'video'       -> recorded walkthrough at `videoUrl`
//       'coming-soon' -> no demo deployed yet
// Only switch an entry to 'live' once its container is running on the server (see DEPLOY.md).
export const demos = [
  {
    slug: 'scrap-management',
    product: 'Scrap Management System',
    summary: 'Explore a working scrap management system with sample data: stock, transactions and reports.',
    type: 'live',
    // Public on purpose (owner's call): clicking the card opens the demo directly.
    // TODO: move to https://demo-scrap.aftrsolutions.com behind the Hub login (DEPLOY.md).
    openUrl: 'http://13.233.73.99:8090',
    tryThis: [
      'Browse the scrap inventory and filter by category',
      'Record a sample purchase or sale',
      'Open the reports dashboard',
    ],
  },
  {
    slug: 'whatsapp-chatbot',
    product: 'WhatsApp AI Chatbot',
    summary: 'Message an AI assistant set up for a sample business and see how it answers, takes orders and hands off to a person.',
    type: 'coming-soon',
    tryThis: ['Ask about products, prices and delivery', 'Write in Urdu or Roman Urdu', 'Ask to speak to a person'],
  },
  {
    slug: 'website-chatbot',
    product: 'Website AI Chatbot',
    summary: 'Chat with an AI assistant trained on a sample company’s website and FAQs.',
    type: 'coming-soon',
    tryThis: ['Ask about pricing and opening hours', 'Ask in Urdu or Arabic', 'Ask for a human hand-off'],
  },
  {
    slug: 'ai-forecasting',
    product: 'AI Forecasting & Analytics',
    summary: 'Explore a live dashboard built on sample sales data, with a demand forecast and anomaly alerts.',
    type: 'coming-soon',
    tryThis: ['Compare this month with the forecast', 'Filter by region and product', 'Open an anomaly alert'],
  },
  {
    slug: 'phelix-erp',
    product: 'Phelix ERP',
    summary: 'Walk through a sample company in Phelix ERP: create an invoice, receive stock and see the reports update.',
    type: 'coming-soon',
    tryThis: ['Create a sales invoice', 'Receive a purchase into stock', 'Open the profit and loss report'],
  },
]

export const getDemo = (slug) => demos.find((d) => d.slug === slug)
