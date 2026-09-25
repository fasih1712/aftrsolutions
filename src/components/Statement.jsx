export default function Statement() {
  return (
    <section className="statement">
      <div className="container">
        <p className="statement__text reveal">
          One partner. <span>From the first line of code</span> to the servers it runs on{' '}
          <span>— and the intelligence built into it.</span>
        </p>
        <div className="statement__pillars">
          <div className="reveal" style={{ '--d': '0ms' }}>
            <strong>Infrastructure</strong>
            <span>Cloud, on-prem and hybrid platforms that stay fast and secure.</span>
          </div>
          <div className="reveal" style={{ '--d': '100ms' }}>
            <strong>Software</strong>
            <span>Products and internal systems engineered for real users.</span>
          </div>
          <div className="reveal" style={{ '--d': '200ms' }}>
            <strong>Intelligence</strong>
            <span>AI that automates work and surfaces what matters.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
