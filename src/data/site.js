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
  { label: 'Home', to: '/', end: true },
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

// Home page: concrete examples of what each service delivers
export const useCases = [
  { title: 'A WhatsApp & website assistant', text: 'Answers customer questions from your own knowledge base, 24/7, and hands off to your team when needed.', service: 'ai-automation-agents' },
  { title: 'Hands-free lead follow-up', text: 'New enquiries are qualified, logged in your CRM and followed up automatically — nothing slips through.', service: 'ai-automation-agents' },
  { title: 'A move to the cloud', text: 'Migrate servers and apps to AWS, Azure or Alibaba Cloud with a clear plan, zero surprises and lower running costs.', service: 'devops-cloud' },
  { title: 'Releases in minutes', text: 'CI/CD pipelines and containers that test and deploy every change safely — no more late-night manual releases.', service: 'devops-cloud' },
  { title: 'A website that sells', text: 'A fast, elegant, SEO-ready company website or online store that represents your brand and converts visitors.', service: 'development' },
  { title: 'ERP that fits your business', text: 'Finance, inventory, sales and operations in one system — implemented and customised to how you actually work.', service: 'development' },
  { title: 'One dashboard for the business', text: 'Data from your ERP, CRM, sales and finance tools piped into one warehouse and live dashboards.', service: 'data-engineering' },
  { title: 'Ask your documents anything', text: 'Private AI search across contracts, policies and reports that returns accurate, cited answers.', service: 'ai-solutions' },
  { title: 'IT that just works', text: 'Servers, Microsoft 365, identity and backups managed and monitored — so your team can focus on its work.', service: 'managed-infrastructure' },
]
