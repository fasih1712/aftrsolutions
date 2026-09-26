import { Layers, ShieldCheck, Gauge, Handshake } from 'lucide-react'

// TODO: replace names, roles and photos with the real team details.
// `photo` is optional — put images in src/assets/team/ and import them here.
export const team = [
  { name: 'Muhammad Fasihullah', role: 'Founder · DevOps & Cloud', bio: 'Certified cloud engineer leading infrastructure, Kubernetes, CI/CD and cloud migrations.' },
  { name: 'Team Member', role: 'AI & Automation Engineer', bio: 'Builds AI agents, LLM applications and automated workflows grounded in client data.' },
  { name: 'Team Member', role: 'Full-Stack Developer', bio: 'Designs and develops fast, modern websites, web apps and mobile applications.' },
  { name: 'Team Member', role: 'Infrastructure Engineer', bio: 'Manages servers, identity, Microsoft 365 and day-to-day IT operations for clients.' },
]

export const values = [
  { icon: Layers, title: 'End-to-end ownership', text: 'Infrastructure, software and AI under one roof — one team accountable from first commit to production.' },
  { icon: ShieldCheck, title: 'Security by default', text: 'Least-privilege access, encrypted data and hardened environments are part of every delivery.' },
  { icon: Gauge, title: 'Built to perform', text: 'Automated, observable and cost-aware systems designed to scale with your business.' },
  { icon: Handshake, title: 'A partner, not a vendor', text: 'Straight answers, transparent pricing and long-term support you can count on.' },
]
