// Global site info + navigation. Page content lives in the sibling data files.

export const site = {
  name: 'AFTR Solutions',
  email: 'info@aftrsolutions.com',
  // TODO: add real phone + LinkedIn before going live
  phone: '', // e.g. '+92 300 1234567' — hidden while empty
  location: 'Karachi, Pakistan',
  social: {
    linkedin: '', // hidden while empty
    github: 'https://github.com/fasih1712',
  },
}

export const nav = [
  { label: 'Services', to: '/services', hasMenu: true },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export const technologies = [
  'Kubernetes', 'Docker', 'AWS', 'Microsoft Azure', 'Alibaba Cloud', 'Google Cloud',
  'Terraform', 'GitHub Actions', 'VMware', 'Linux', 'Windows Server', 'Microsoft 365',
  'React', 'React Native', 'Node.js', 'Python', 'PostgreSQL', 'OpenAI', 'LangChain', 'n8n',
  'Prometheus', 'Grafana',
]

export const steps = [
  { n: '01', title: 'Discover', text: 'We learn your goals, systems and constraints, then define what success looks like.' },
  { n: '02', title: 'Design', text: 'A clear architecture and roadmap — scoped, estimated and agreed before any build begins.' },
  { n: '03', title: 'Build', text: 'Short iterations, working software early, and full visibility at every stage.' },
  { n: '04', title: 'Run', text: 'We deploy, monitor and keep improving — so it keeps working long after launch.' },
]
