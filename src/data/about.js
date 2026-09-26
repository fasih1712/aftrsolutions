import { Layers, ShieldCheck, Gauge, Handshake } from 'lucide-react'

// The four co-founders. Photos live in src/assets/team/ (see teamPhotos.js); initials show until one is added.
export const team = [
  {
    name: 'Muhammad Fasihullah',
    role: 'Co-founder · Cloud, DevOps & AI',
    short: 'Designs and runs cloud platforms, CI/CD pipelines and Kubernetes, and builds AI into the systems behind them.',
    bio: 'Fasih has worked in cloud, DevOps and AI from day one and still does, every day. Fasih designs and runs infrastructure on AWS, Azure and Alibaba Cloud, builds CI/CD pipelines and Kubernetes platforms, and uses Python and LLMs to automate the operations around them. Fasih holds the Alibaba Cloud Professional certification and is an engineering graduate of NED University.',
    skills: ['AWS', 'Azure', 'Alibaba Cloud', 'Kubernetes', 'CI/CD', 'Python', 'LLMs'],
    linkedin: 'https://www.linkedin.com/in/muhammad-fasihullah/',
  },
  {
    name: 'Abdul Rafay',
    role: 'Co-founder · Data Engineering & AI',
    short: 'Builds the pipelines, warehouses and Power BI dashboards behind our data work, and the AI that runs on top.',
    bio: 'Rafay’s experience is in data engineering and AI. Rafay builds the pipelines that bring data together from different systems, the warehouses that keep it organised and the Power BI dashboards that make it useful, then puts that clean data to work in AI and LLM applications that answer questions and automate decisions.',
    skills: ['Python', 'SQL', 'Data pipelines', 'Power BI', 'LLMs'],
    linkedin: 'https://www.linkedin.com/in/abdul-rafay-3a0757247/',
  },
  {
    name: 'Syed Taha Javaid',
    role: 'Co-founder · AI & Data Engineering',
    short: 'Works where data engineering meets AI, turning raw business data into datasets and models that deliver.',
    bio: 'Taha works on AI and data engineering, writing the Python pipelines that collect, clean and connect business data and preparing the datasets that machine learning models and LLM applications depend on. The focus is simple: make sure the data behind every AI solution is accurate, reliable and ready to use.',
    skills: ['Python', 'Data pipelines', 'Machine learning', 'Power BI', 'LLMs'],
    linkedin: 'https://www.linkedin.com/in/sjtaha/',
  },
  {
    name: 'Syed Ali Javaid',
    role: 'Co-founder · ERP Functional Consultant',
    short: 'ERP functional consultant who maps how a business runs and sets the system up to match, with AI where it helps.',
    bio: 'Ali is an ERP functional consultant. Every ERP project starts with Ali studying how a business actually runs across finance, inventory, sales and operations, then configuring the ERP to match and training the people who will use it every day. With a good understanding of AI, Ali also spots where automation can take manual work out of those processes.',
    skills: ['ERP', 'Functional consulting', 'Business processes', 'Finance & inventory', 'AI'],
    linkedin: 'https://www.linkedin.com/in/syed-ali-javaid/',
  },
]

export const values = [
  { icon: Layers, title: 'End-to-end ownership', text: 'Infrastructure, software, data and AI under one roof, with one team accountable from the first commit to production.' },
  { icon: ShieldCheck, title: 'Security by default', text: 'Least-privilege access, encrypted data and hardened environments are part of every delivery.' },
  { icon: Gauge, title: 'Built to perform', text: 'Automated, observable and cost-aware systems designed to scale with your business.' },
  { icon: Handshake, title: 'A partner, not a vendor', text: 'Straight answers, transparent pricing and long-term support you can count on.' },
]
