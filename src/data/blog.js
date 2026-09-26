// Blog posts. Each post renders at /blog/:slug.
// Body is a list of blocks: { h2 }, { p }, { ul: [...] }, { quote }.
// To add a post, copy one object, give it a new slug and put it at the top.

export const posts = [
  {
    slug: 'ai-agents-for-small-businesses',
    title: 'AI Agents for Small Businesses: Where to Start',
    excerpt: 'AI agents are no longer just for big tech. Here is a practical way to pick your first use case and launch it safely.',
    category: 'AI Automation',
    date: '2026-09-20',
    readTime: '5 min read',
    author: 'AFTR Team',
    body: [
      { p: 'Every business has work that is repetitive, rules-based and time-consuming: answering the same customer questions, copying data between systems, chasing leads, preparing weekly reports. That is exactly where AI agents shine — and you do not need a data-science team to benefit.' },
      { h2: 'What is an AI agent, really?' },
      { p: 'An AI agent is a language model that can do more than chat. It can read context, decide on a next step, and use tools — search your knowledge base, update your CRM, send an email or create a ticket. Think of it as a tireless junior teammate that follows your playbook.' },
      { h2: 'Pick the right first use case' },
      { p: 'The best first project is narrow, frequent and measurable. Good candidates usually share three traits:' },
      { ul: [
        'It happens many times a day or week',
        'The steps are well understood and mostly written down',
        'Success is easy to measure — time saved, response time, leads handled',
      ] },
      { p: 'Customer support triage, lead qualification and invoice processing are classic starting points because they tick all three boxes.' },
      { h2: 'Keep a human in the loop' },
      { p: 'Early on, let the agent draft and a person approve. As confidence grows, you can allow it to act on its own for low-risk tasks while still requiring sign-off for anything sensitive. Every action should be logged so you can review what happened and why.' },
      { quote: 'Start with assistance, graduate to autonomy. That is how AI earns trust inside a team.' },
      { h2: 'Measure, then expand' },
      { p: 'Set a baseline before launch — how long does the task take today, and how many times does it happen? After two to four weeks you will have real numbers. Once the first agent proves its value, the same foundations (data connections, guardrails, monitoring) make the next one much faster to build.' },
      { p: 'If you are unsure where AI fits in your business, we are happy to map your processes with you and point out the quickest wins.' },
    ],
  },
  {
    slug: 'docker-or-kubernetes',
    title: 'Docker or Kubernetes? Choosing the Right Setup for Your App',
    excerpt: 'Kubernetes is powerful — but it is not always the answer. How to decide what your product actually needs today.',
    category: 'DevOps & Cloud',
    date: '2026-09-12',
    readTime: '6 min read',
    author: 'AFTR Team',
    body: [
      { p: 'Containers have become the default way to package applications, and Kubernetes has become the default answer to “how do we run them?”. But for many products, especially early on, a simpler setup delivers the same reliability at a fraction of the cost and complexity.' },
      { h2: 'When plain Docker is enough' },
      { p: 'A single well-sized cloud server running Docker Compose, fronted by a reverse proxy with automatic HTTPS and deployed through a CI/CD pipeline, can comfortably serve a large number of websites and internal tools. It is easy to understand, cheap to run and quick to recover.' },
      { ul: [
        'A handful of services with steady traffic',
        'A small team that wants minimal operational overhead',
        'Tight budgets where every instance counts',
      ] },
      { h2: 'When Kubernetes earns its place' },
      { p: 'Kubernetes pays off when you have many services, need automatic scaling, run multiple environments, or require zero-downtime rolling updates across a fleet. Managed offerings such as EKS, AKS and ACK remove much of the control-plane burden, but you still need solid practices around networking, secrets and observability.' },
      { h2: 'The part that matters most: automation' },
      { p: 'Whichever platform you choose, the real win comes from automation. Every change should flow through a pipeline that builds, tests and deploys the same way every time. Infrastructure should live in code so environments can be rebuilt in minutes, not remembered from someone’s notes.' },
      { quote: 'Choose the simplest platform that meets your needs today — and automate it so you can grow into the next one.' },
      { h2: 'A sensible path' },
      { p: 'Start with Docker and CI/CD. Add monitoring and backups from day one. When your service count, traffic or team grows to the point where coordination becomes painful, migrate to Kubernetes — your containers and pipelines will carry over with little change.' },
    ],
  },
  {
    slug: 'cloud-cost-optimisation-checklist',
    title: 'A Practical Cloud Cost Optimisation Checklist',
    excerpt: 'Most cloud bills carry avoidable waste. Ten checks you can run this month to spend less without slowing down.',
    category: 'DevOps & Cloud',
    date: '2026-09-03',
    readTime: '4 min read',
    author: 'AFTR Team',
    body: [
      { p: 'Cloud makes it easy to spin things up — and just as easy to forget them. Over time, idle resources, oversized instances and missing lifecycle rules quietly inflate the monthly bill. The good news: a few disciplined checks usually recover a meaningful share of spend.' },
      { h2: 'The checklist' },
      { ul: [
        'Tag every resource with an owner, project and environment',
        'Right-size instances using real CPU and memory metrics',
        'Shut down non-production environments outside working hours',
        'Delete unattached disks, old snapshots and unused IP addresses',
        'Move infrequently accessed data to cheaper storage tiers',
        'Use reserved instances or savings plans for steady workloads',
        'Review data-transfer costs between regions and zones',
        'Set budgets and alerts so surprises are caught early',
        'Autoscale based on demand instead of peak capacity',
        'Review the bill monthly with the people who own the workloads',
      ] },
      { h2: 'Make it a habit, not a project' },
      { p: 'One-off clean-ups help, but costs creep back without ownership. Tagging plus a short monthly review keeps spending visible and gives each team the information to make better decisions.' },
      { quote: 'The cheapest resource is the one you no longer need — the next cheapest is the one sized correctly.' },
      { p: 'Need a second pair of eyes on your cloud bill? A cost review is often one of the fastest returns on investment in infrastructure work.' },
    ],
  },
]

export const getPost = (slug) => posts.find((p) => p.slug === slug)

export const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
