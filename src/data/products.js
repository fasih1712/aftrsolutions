import { Bot, FileSearch, LineChart } from 'lucide-react'

export const products = [
  {
    icon: Bot,
    tag: 'Assistants',
    title: 'AI Agents & Assistants',
    text: 'Conversational agents for support, sales and internal help-desks — trained on your knowledge base and connected to your tools.',
    features: ['Website, WhatsApp & email channels', 'Trained on your documents', 'Hand-off to human agents', 'Analytics dashboard'],
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
