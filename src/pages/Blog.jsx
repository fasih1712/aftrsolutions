import { PageHeader, CTA } from '../components/Common'
import { posts } from '../data/blog'
import PostCard from '../components/PostCard'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Blog() {
  usePageTitle('Blog')
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights from the team."
        lead="Practical notes on AI automation, cloud, DevOps and building software that lasts."
      />
      <section className="section section--tight">
        <div className="container">
          <div className="posts">
            {posts.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
          </div>
        </div>
      </section>
      <CTA />
    </>
  )
}
