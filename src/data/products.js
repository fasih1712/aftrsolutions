import { Boxes, Recycle, MessageCircle, BotMessageSquare, LineChart } from 'lucide-react'

// `own: true` = products AFTR built in-house (shown first, badged "Our product").
// `anim` picks the icon animation on the Products page: stack | spin | chat | bot | chart.
export const products = [
  {
    icon: Recycle,
    tag: 'Operations',
    title: 'Scrap Management System',
    anim: 'spin',
    own: true,
    text: 'Track scrap from collection to sale: inventory, weighing, pricing, buyers and reports in one place, so nothing goes missing and every kilo is accounted for.',
    features: ['Scrap inventory by type and grade', 'Purchase and sales records', 'Buyer and vendor management', 'Reports and dashboards'],
  },
  {
    icon: MessageCircle,
    tag: 'AI · WhatsApp',
    title: 'WhatsApp AI Chatbot',
    anim: 'chat',
    own: true,
    text: 'An AI assistant on your WhatsApp number that answers customers instantly, day and night. It learns your products, prices and FAQs so every reply is accurate.',
    features: ['Instant replies, day and night', 'Trained on your business info', 'Captures leads & orders', 'Hand-off to your team'],
  },
  {
    icon: BotMessageSquare,
    tag: 'AI · Website',
    title: 'Website AI Chatbot',
    anim: 'bot',
    own: true,
    text: 'We integrate an AI chatbot into your existing website that answers visitor questions, recommends services and turns visitors into leads.',
    features: ['Works on any website', 'Trained on your content', 'Collects enquiries & bookings', 'Matches your brand'],
  },
  {
    icon: LineChart,
    tag: 'AI · Insights',
    title: 'AI Forecasting & Analytics',
    anim: 'chart',
    text: 'Machine learning models and live dashboards that forecast sales and demand, spot unusual activity early and turn operational data into clear decisions.',
    features: ['Live KPI dashboards', 'Sales & demand forecasting', 'Anomaly alerts', 'Connects to your databases'],
  },
  {
    icon: Boxes,
    tag: 'ERP',
    title: 'Phelix ERP',
    anim: 'stack',
    own: true,
    text: 'Our own ERP, designed and built in-house. Finance, inventory, sales and operations run from one system that we configure around the way your business works.',
    features: ['Finance & accounting', 'Inventory & purchasing', 'Sales, invoicing & customers', 'Role-based access & reports'],
  },
]
