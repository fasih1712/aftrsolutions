import { Bot, Cloud, Code2, ServerCog, BrainCircuit, Database } from 'lucide-react'

// Each service gets its own page at /services/:slug
export const services = [
  {
    slug: 'ai-automation-agents',
    icon: Bot,
    title: 'AI Automation & Agents',
    short: 'Autonomous AI agents and automated workflows that take repetitive work off your team’s plate, around the clock.',
    tagline: 'Let AI handle the busywork.',
    intro:
      'We design and build AI agents that read, decide and act inside your existing tools: answering customers, qualifying leads, processing documents and moving data between systems. Every agent is grounded in your own data, guarded by clear rules, and monitored in production.',
    offerings: [
      { title: 'Custom AI agents', text: 'Task-specific agents that plan, use tools and complete multi-step work, from research to ticket resolution.' },
      { title: 'Customer support bots', text: 'Website, WhatsApp and email assistants trained on your knowledge base, with smooth hand-off to humans.' },
      { title: 'Workflow automation', text: 'End-to-end automations connecting your CRM, email, sheets and internal apps with n8n, Make or custom code.' },
      { title: 'Sales & lead agents', text: 'Agents that qualify inbound leads, enrich records, book meetings and follow up automatically.' },
      { title: 'Back-office automation', text: 'Invoice processing, data entry, report generation and reconciliation handled without manual effort.' },
      { title: 'Human-in-the-loop controls', text: 'Approval steps, audit logs and guardrails so you stay in control of every critical action.' },
    ],
    stack: ['OpenAI', 'Claude', 'LangChain', 'LangGraph', 'n8n', 'Make', 'Python', 'Node.js', 'Vector DBs'],
    outcomes: [
      'Hours of manual work removed every week',
      'Faster response times for customers and leads',
      'Consistent, auditable processes',
      '24/7 operation without extra headcount',
    ],
    faqs: [
      { q: 'Will an AI agent work with the tools we already use?', a: 'Yes. We integrate with your CRM, helpdesk, email, spreadsheets, databases and internal APIs, so the agent works where your team already works.' },
      { q: 'How do you keep agents from making mistakes?', a: 'Agents are grounded in your approved data, restricted to specific actions, and can require human approval for anything sensitive. Every action is logged.' },
      { q: 'How long does a first agent take to launch?', a: 'A focused first agent typically goes live in 2 to 4 weeks, followed by iterative improvements based on real usage.' },
    ],
  },
  {
    slug: 'ai-solutions',
    icon: BrainCircuit,
    title: 'AI Solutions',
    short: 'Custom AI built on your own data: intelligent search, document understanding, analytics and predictions.',
    tagline: 'Turn your data into decisions.',
    intro:
      'We help businesses find where AI creates real value and then build it: private LLM applications, retrieval-augmented search over company knowledge, document intelligence, forecasting models and more. Solutions are deployed securely on your cloud, with your data staying yours.',
    offerings: [
      { title: 'AI strategy & consulting', text: 'Identify high-impact use cases, assess data readiness and plan a practical roadmap.' },
      { title: 'LLM applications', text: 'Custom GPT-style apps and copilots integrated into your products and internal tools.' },
      { title: 'Knowledge search (RAG)', text: 'Ask questions across documents, wikis and databases and get accurate, cited answers.' },
      { title: 'Document intelligence', text: 'Extract and classify data from invoices, contracts, forms and reports automatically.' },
      { title: 'Predictive analytics', text: 'Forecasting, churn prediction and anomaly detection models that inform decisions.' },
      { title: 'Private & secure deployment', text: 'Models hosted in your own cloud with access controls, logging and data privacy by design.' },
    ],
    stack: ['LLMs', 'OpenAI', 'Claude', 'Llama', 'Python', 'LangChain', 'pgvector', 'Power BI', 'FastAPI', 'AWS Bedrock'],
    outcomes: [
      'Instant answers from company knowledge',
      'Less manual data handling',
      'Better, data-backed decisions',
      'AI that respects your privacy',
    ],
    faqs: [
      { q: 'Is our data safe with AI?', a: 'Yes. We use enterprise APIs that do not train on your data, or host models privately in your cloud. Access is controlled and logged.' },
      { q: 'We are not sure where AI fits. Can you help?', a: 'That is exactly what our strategy workshop is for. We map your processes and highlight where AI will pay off first.' },
      { q: 'What is the difference between AI Solutions and AI Automation & Agents?', a: 'AI Solutions builds the intelligence itself: search, insights and predictions. AI Automation & Agents puts that intelligence to work, taking actions across your tools.' },
    ],
  },
  {
    slug: 'data-engineering',
    icon: Database,
    title: 'Data Engineering & Analytics',
    subtitle: 'Pipelines, BI & Reporting',
    short: 'Data pipelines, warehouses, analysis and Power BI dashboards that turn scattered business data into answers you can trust.',
    tagline: 'Clean data. Clear decisions.',
    intro:
      'Most businesses have plenty of data, but it is spread across apps, spreadsheets, ERPs and databases that never talk to each other. We build the pipelines that bring it together and clean it, then analyse it and deliver it to warehouses, dashboards and AI models, with monitoring so the numbers stay right.',
    offerings: [
      { title: 'Data pipelines (ETL / ELT)', text: 'Automated, scheduled pipelines that pull data from your apps, APIs and databases and keep it in sync.' },
      { title: 'Data warehouses & lakes', text: 'Modern warehouses on the cloud, modelled so reporting is fast and consistent across teams.' },
      { title: 'Data analysis & BI', text: 'Analysis of sales, operations and finance data, with Power BI dashboards and self-serve reports built on a single source of truth.' },
      { title: 'Data integration', text: 'Connect CRM, ERP, e-commerce and finance systems so data flows without manual exports.' },
      { title: 'Data quality & governance', text: 'Validation, lineage and access controls so everyone can trust the numbers and use them safely.' },
      { title: 'Data for AI', text: 'Prepared, well-structured datasets and feature pipelines that make AI projects actually work.' },
    ],
    stack: ['Python', 'SQL', 'Apache Airflow', 'Apache Spark', 'dbt', 'PostgreSQL', 'BigQuery', 'Snowflake', 'Power BI'],
    outcomes: [
      'One source of truth for the business',
      'Reports that update themselves',
      'No more manual spreadsheet exports',
      'Data that is ready for AI',
    ],
    faqs: [
      { q: 'Our data is spread across many tools. Where do we start?', a: 'We start with the questions you need answered, map where that data lives, and build the first pipeline and dashboard around it. Then we expand.' },
      { q: 'Do we need a big data platform?', a: 'Usually not. Many businesses are well served by a managed cloud database and a few reliable pipelines. We size the platform to your data, not the other way round.' },
      { q: 'Can you work with our ERP data?', a: 'Yes. We regularly integrate ERP, CRM and finance systems, and our team includes ERP specialists who know how that data is structured.' },
    ],
  },
  {
    slug: 'devops-cloud',
    icon: Cloud,
    title: 'DevOps & Cloud',
    short: 'Cloud platforms, CI/CD pipelines and Kubernetes that make every release fast, safe and repeatable.',
    tagline: 'Ship faster. Sleep better.',
    intro:
      'From your first cloud migration to fully automated delivery pipelines, we build infrastructure that is secure, observable and cost-efficient. We work across AWS, Azure, Alibaba Cloud and GCP with Kubernetes, Terraform and Python, and treat everything as code so it can be reviewed, repeated and recovered.',
    offerings: [
      { title: 'Cloud migration', text: 'Plan and execute moves from on-prem or between clouds with minimal downtime and a clear rollback path.' },
      { title: 'CI/CD pipelines', text: 'Automated build, test and deploy pipelines with GitHub Actions, GitLab CI or Jenkins.' },
      { title: 'Containers & Kubernetes', text: 'Dockerised applications running on Kubernetes (EKS, AKS, ACK) or lean Docker hosts, sized to what you actually need.' },
      { title: 'Infrastructure as Code', text: 'Terraform and Ansible for reproducible environments, reviewed like any other code.' },
      { title: 'Monitoring & observability', text: 'Metrics, logs and alerts with Prometheus, Grafana and cloud-native tooling, so you know about problems before your users do.' },
      { title: 'Cost optimisation', text: 'Right-sizing, reserved capacity and clean-up that typically cuts cloud bills without touching performance.' },
    ],
    stack: ['AWS', 'Azure', 'Alibaba Cloud', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'Python', 'GitHub Actions', 'Prometheus', 'Grafana'],
    outcomes: [
      'Releases in minutes instead of days',
      'Fewer incidents and faster recovery',
      'Lower, predictable cloud spend',
      'Environments anyone on the team can rebuild',
    ],
    faqs: [
      { q: 'Which cloud provider should we choose?', a: 'It depends on your workloads, region, existing licences and budget. We hold certifications across providers and will recommend what fits you, not what we happen to prefer.' },
      { q: 'Do we really need Kubernetes?', a: 'Not always. For many products a well-built Docker setup with CI/CD is simpler and cheaper. We recommend Kubernetes only when scale or complexity justify it.' },
      { q: 'Can you work with our existing pipelines?', a: 'Yes. We can audit and improve what you have or build fresh, whichever gets you to reliable delivery sooner.' },
    ],
  },
  {
    slug: 'development',
    icon: Code2,
    title: 'Development',
    subtitle: 'Websites, Apps & ERP',
    short: 'Fast, beautiful websites and mobile apps engineered with modern stacks and built to scale.',
    tagline: 'Products people love to use.',
    intro:
      'We design and develop websites, web applications, mobile apps and business systems that look sharp, load fast and are easy to maintain. From a company website to a full SaaS platform, an ERP rollout or a cross-platform app, we take it from idea to launch and keep it running afterwards.',
    offerings: [
      { title: 'Business websites', text: 'Elegant, responsive, SEO-ready websites that represent your brand and convert visitors.' },
      { title: 'Web applications', text: 'Dashboards, portals, CRMs and SaaS platforms with clean architecture and secure APIs.' },
      { title: 'Mobile apps', text: 'Cross-platform iOS and Android apps with React Native. One codebase, native feel.' },
      { title: 'E-commerce', text: 'Online stores with payments, inventory and order management that scale with demand.' },
      { title: 'APIs & integrations', text: 'REST and GraphQL APIs, payment gateways and third-party integrations done properly.' },
      { title: 'ERP & business systems', text: 'ERP implementation and customisation that connects finance, inventory, sales and operations in one system.' },
    ],
    stack: ['React', 'Next.js', 'React Native', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Tailwind', 'Figma'],
    outcomes: [
      'A product that is fast on every device',
      'Clean code your team can extend',
      'Built-in SEO, analytics and security',
      'Deployed with CI/CD from day one',
    ],
    faqs: [
      { q: 'How long does a website take?', a: 'A business website usually takes 2 to 4 weeks. Web and mobile apps depend on scope, and we give a clear estimate after the discovery call.' },
      { q: 'Will we own the code?', a: 'Yes. You get full ownership of the code, designs and infrastructure accounts.' },
      { q: 'Do you provide support after launch?', a: 'Yes. Our maintenance plans cover updates, security patches, monitoring and small improvements.' },
    ],
  },
  {
    slug: 'managed-infrastructure',
    icon: ServerCog,
    title: 'Managed Infrastructure',
    short: 'Day-to-day care for your servers, networks, identity and Microsoft 365, so your team can simply get on with its work.',
    tagline: 'IT that simply works.',
    intro:
      'We become your infrastructure team, managing servers, virtualisation, identity, email and collaboration tools with proactive monitoring and fast support. Whether you are on-prem, in the cloud or hybrid, we keep things secure, patched and running.',
    offerings: [
      { title: 'Server management', text: 'Windows Server and Linux administration, patching, backups and hardening.' },
      { title: 'Active Directory & identity', text: 'User lifecycle, Group Policy, Entra ID and single sign-on configured the right way.' },
      { title: 'Microsoft 365', text: 'Exchange Online, Teams, SharePoint and licensing, set up, migrated and managed.' },
      { title: 'Virtualisation', text: 'VMware and Hyper-V environments designed for performance and high availability.' },
      { title: '24/7 monitoring', text: 'Proactive alerting on servers, services and networks with clear escalation paths.' },
      { title: 'Backup & disaster recovery', text: 'Tested backups and recovery plans so a bad day never becomes a lost week.' },
    ],
    stack: ['Windows Server', 'Active Directory', 'Microsoft 365', 'Entra ID', 'VMware', 'Hyper-V', 'Linux', 'Zabbix', 'Veeam'],
    outcomes: [
      'Fewer outages and faster fixes',
      'Secure, compliant user access',
      'Predictable monthly IT costs',
      'A team that knows your environment',
    ],
    faqs: [
      { q: 'Do you support on-premise environments?', a: 'Yes. We manage on-prem, cloud and hybrid setups, and can help you plan a gradual move to the cloud when it makes sense.' },
      { q: 'What are your support hours?', a: 'Monitoring runs 24/7. Support coverage and response times are agreed in your service plan.' },
      { q: 'Can you take over from our current provider?', a: 'Yes. We run a structured hand-over: documentation, access review and a health check before we take responsibility.' },
    ],
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
