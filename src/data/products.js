import { Boxes, Recycle, MessageCircle, BotMessageSquare, LineChart } from 'lucide-react'

// `own: true` = products AFTR built in-house (shown first, badged "Our product").
// `anim` picks the icon animation on the Products page: stack | spin | chat | pulse.
export const products = [
  {
    icon: Boxes,
    tag: 'ERP',
    title: 'Phelix ERP',
    anim: 'stack',
    own: true,
    text: 'Our own ERP, designed and built in-house. Finance, inventory, sales and operations run from one system that we configure around the way your business works.',
    features: ['Finance & accounting', 'Inventory & purchasing', 'Sales, invoicing & customers', 'Role-based access & reports'],
  },
  {
    icon: Recycle,
    tag: 'Operations',
    title: 'Scrap Management',
    anim: 'spin',
    own: true,
    text: 'A complete system for scrap and recycling businesses. Track every load from purchase to sale, with stock, pricing and accounts always up to date.',
    features: ['Purchase & weighing records', 'Stock by material & grade', 'Buyer & supplier accounts', 'Profit and stock reports'],
  },
  {
    icon: MessageCircle,
    tag: 'WhatsApp',
    title: 'AI WhatsApp Chatbot',
    anim: 'chat',
    own: true,
    text: 'An AI assistant on your WhatsApp number that answers customers instantly, day and night. It learns your products, prices and FAQs so every reply is accurate.',
    features: ['Instant replies, day and night', 'Trained on your business info', 'Captures leads & orders', 'Hand-off to your team'],
  },
  {
    icon: BotMessageSquare,
    tag: 'Website',
    title: 'Website AI Chatbot',
    anim: 'chat',
    own: true,
    text: 'We integrate an AI chatbot into your existing website that answers visitor questions, recommends services and turns visitors into leads.',
    features: ['Works on any website', 'Trained on your content', 'Collects enquiries & bookings', 'Matches your brand'],
  },
  {
    icon: LineChart,
    tag: 'Insights',
    title: 'Analytics & Forecasting',
    anim: 'pulse',
    text: 'Dashboards and predictive models that turn operational data into clear, timely decisions.',
    features: ['Live KPI dashboards', 'Sales & demand forecasting', 'Anomaly alerts', 'Connects to your databases'],
  },
]
