// Central place for all website content — edit text here, not in components.
import {
  Cloud,
  GitBranch,
  BrainCircuit,
  Code2,
  ServerCog,
  Rocket,
  Bot,
  FileSearch,
  LineChart,
  ShieldCheck,
  Gauge,
  Handshake,
  Layers,
} from 'lucide-react'

export const site = {
  name: 'AFTR Solutions',
  // TODO: replace with the real company email / phone before going live
  email: 'hello@aftrsolutions.com',
  phone: '+92 300 0000000',
  location: 'Karachi, Pakistan',
  social: {
    linkedin: '#',
    github: '#',
  },
}

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'AI Products', href: '#products' },
  { label: 'Approach', href: '#approach' },
  { label: 'Why AFTR', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

export const technologies = [
  'Kubernetes', 'Docker', 'AWS', 'Microsoft Azure', 'Alibaba Cloud', 'Google Cloud',
  'Terraform', 'GitHub Actions', 'VMware', 'Linux', 'Windows Server', 'Microsoft 365',
  'React', 'Node.js', 'Python', 'PostgreSQL', 'LLMs & RAG', 'Prometheus', 'Grafana',
]

export const services = [
  {
    icon: Cloud,
    title: 'Cloud Infrastructure & Migration',
    text: 'Design, build and migrate to secure, cost-efficient cloud platforms on AWS, Azure, Alibaba Cloud and GCP — without downtime surprises.',
    points: ['Landing zones & networking', 'Lift-and-shift & re-platforming', 'Cost optimisation'],
  },
  {
    icon: GitBranch,
    title: 'DevOps & CI/CD',
    text: 'Automated pipelines, containers and Kubernetes that turn every commit into a reliable, repeatable release.',
    points: ['Docker & Kubernetes', 'GitHub Actions / GitLab CI', 'Infrastructure as Code'],
  },
  {
    icon: BrainCircuit,
    title: 'AI Solutions',
    text: 'Practical AI that plugs into your workflows — assistants, automation and intelligent search built on your own data.',
    points: ['LLM integration & RAG', 'Workflow automation', 'Private, secure deployments'],
  },
  {
    icon: Code2,
    title: 'Custom Software Development',
    text: 'Web platforms, internal tools and APIs engineered with modern stacks, clean architecture and room to scale.',
    points: ['Web apps & dashboards', 'APIs & microservices', 'CRM & business systems'],
  },
  {
    icon: Rocket,
    title: 'Deployment & Reliability',
    text: 'Production launches done right — observability, backups, zero-downtime rollouts and incident-ready runbooks.',
    points: ['Monitoring & alerting', 'High availability', 'Disaster recovery'],
  },
  {
    icon: ServerCog,
    title: 'Managed IT Infrastructure',
    text: 'Day-to-day care for the systems your team relies on, from servers and identity to email and collaboration.',
    points: ['Windows Server & Active Directory', 'Microsoft 365 & Exchange', 'Virtualisation'],
  },
]

export const products = [
  {
    icon: Bot,
    tag: 'Assistants',
    title: 'AI Agents & Assistants',
    text: 'Conversational agents for support, sales and internal help-desks — trained on your knowledge base and connected to your tools.',
  },
  {
    icon: FileSearch,
    tag: 'Documents',
    title: 'Document Intelligence',
    text: 'Extract, classify and search across contracts, invoices and reports in seconds instead of hours.',
  },
  {
    icon: LineChart,
    tag: 'Insights',
    title: 'Analytics & Forecasting',
    text: 'Dashboards and predictive models that turn operational data into clear, timely decisions.',
  },
]

export const steps = [
  { n: '01', title: 'Discover', text: 'We learn your goals, systems and constraints, then define what success looks like.' },
  { n: '02', title: 'Design', text: 'A clear architecture and roadmap — scoped, estimated and agreed before any build begins.' },
  { n: '03', title: 'Build', text: 'Short iterations, working software early, and full visibility at every stage.' },
  { n: '04', title: 'Run', text: 'We deploy, monitor and keep improving — so it keeps working long after launch.' },
]

export const reasons = [
  { icon: Layers, title: 'End-to-end ownership', text: 'Infrastructure, software and AI under one roof — one team accountable from first commit to production.' },
  { icon: ShieldCheck, title: 'Security by default', text: 'Least-privilege access, encrypted data and hardened environments are part of every delivery.' },
  { icon: Gauge, title: 'Built to perform', text: 'Automated, observable and cost-aware systems designed to scale with your business.' },
  { icon: Handshake, title: 'A partner, not a vendor', text: 'Straight answers, transparent pricing and long-term support you can count on.' },
]
