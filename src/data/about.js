import { Layers, ShieldCheck, Gauge, Handshake } from 'lucide-react'

// The four co-founders. `photo` is optional — put images in src/assets/team/ and import them here.
export const team = [
  {
    name: 'Muhammad Fasihullah',
    role: 'Co-founder · Cloud, DevOps & AI',
    bio: 'Infrastructure and cloud engineer working across AWS, Azure and Alibaba Cloud, with Alibaba Cloud Professional certification. Leads cloud, DevOps and infrastructure work and builds AI solutions. NED University graduate.',
    skills: ['Cloud', 'DevOps', 'CI/CD', 'AI'],
    linkedin: 'https://www.linkedin.com/in/muhammad-fasihullah/',
  },
  {
    name: 'Abdul Rafay',
    role: 'Co-founder · Data Engineering & AI',
    bio: 'Builds the data pipelines, warehouses and models that turn raw business data into reliable insight — and the AI solutions that sit on top of it.',
    skills: ['Data pipelines', 'Analytics', 'AI'],
    linkedin: 'https://www.linkedin.com/in/abdul-rafay-3a0757247/',
  },
  {
    name: 'Syed Ali Javaid',
    role: 'Co-founder · ERP & AI',
    bio: 'Implements and customises ERP systems that connect finance, inventory, sales and operations — and brings AI into those workflows where it pays off.',
    skills: ['ERP', 'Business systems', 'AI'],
    linkedin: 'https://www.linkedin.com/in/syed-ali-javaid/',
  },
  {
    name: 'Syed Taha Javaid',
    role: 'Co-founder · Data Engineering',
    bio: 'Designs and builds data pipelines, integrations and analytics platforms that keep business data clean, connected and ready to use.',
    skills: ['Data pipelines', 'Integration', 'Warehousing'],
    linkedin: 'https://www.linkedin.com/in/sjtaha/',
  },
]

export const values = [
  { icon: Layers, title: 'End-to-end ownership', text: 'Infrastructure, software and AI under one roof — one team accountable from first commit to production.' },
  { icon: ShieldCheck, title: 'Security by default', text: 'Least-privilege access, encrypted data and hardened environments are part of every delivery.' },
  { icon: Gauge, title: 'Built to perform', text: 'Automated, observable and cost-aware systems designed to scale with your business.' },
  { icon: Handshake, title: 'A partner, not a vendor', text: 'Straight answers, transparent pricing and long-term support you can count on.' },
]
