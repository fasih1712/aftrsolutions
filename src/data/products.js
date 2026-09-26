import { Boxes, Recycle, MessageCircle, BotMessageSquare, FileSearch, LineChart } from 'lucide-react'

// `own: true` = products AFTR built in-house (shown first, badged "Our product").
export const products = [
  {
    icon: Boxes,
    tag: 'ERP',
    title: 'Phelix ERP',
    own: true,
    text: 'Our own ERP, built in-house — finance, inventory, sales and operations in one system, customised to how your business actually works.',
    features: ['Finance & accounting', 'Inventory & purchasing', 'Sales, invoicing & customers', 'Role-based access & reports'],
  },
  {
    icon: Recycle,
    tag: 'Operations',
    title: 'Scrap Management',
    own: true,
    text: 'A complete system for scrap and recycling businesses — track every load from purchase to sale, with stock, pricing and accounts always up to date.',
    features: ['Purchase & weighing records', 'Stock by material & grade', 'Buyer & supplier accounts', 'Profit and stock reports'],
  },
  {
    icon: MessageCircle,
    tag: 'WhatsApp',
    title: 'AI WhatsApp Chatbot',
    own: true,
    text: 'An AI assistant on your WhatsApp number that answers customers instantly, 24/7 — trained on your products, prices and FAQs.',
    features: ['Instant replies, day and night', 'Trained on your business info', 'Captures leads & orders', 'Hand-off to your team'],
  },
  {
    icon: BotMessageSquare,
    tag: 'Website',
    title: 'Website AI Chatbot',
    own: true,
    text: 'We integrate an AI chatbot into your existing website that answers visitor questions, recommends services and turns visitors into leads.',
    features: ['Works on any website', 'Trained on your content', 'Collects enquiries & bookings', 'Matches your brand'],
  },
  {
    icon: FileSearch,
    tag: 'Documents',
    title: 'Document Intelligence',
    text: 'Extract, classify and search across contracts, invoices and reports in seconds instead of hours.',
    features: ['Invoice & form extraction', 'Contract search & summaries', 'Export to ERP / sheets', 'Secure, private processing'],
  },
  {
    icon: LineChart,
    tag: 'Insights',
    title: 'Analytics & Forecasting',
    text: 'Dashboards and predictive models that turn operational data into clear, timely decisions.',
    features: ['Live KPI dashboards', 'Sales & demand forecasting', 'Anomaly alerts', 'Connects to your databases'],
  },
]
