import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { CTA } from '../components/Common'
import { posts, getPost, formatDate } from '../data/blog'
import PostCard from '../components/PostCard'
import { usePageTitle } from '../hooks/usePageTitle'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)
  usePageTitle(post?.title)
  if (!post) return <NotFound />
  const more = posts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <>
      <article className="article">
        <header className="article__head container">
          <Link to="/blog" className="back-link reveal"><ArrowLeft size={16} /> All articles</Link>
          <p className="eyebrow reveal">{post.category}</p>
          <h1 className="reveal">{post.title}</h1>
          <p className="article__meta reveal">{post.author} · {formatDate(post.date)} · {post.readTime}</p>
        </header>
        <div className="article__body container reveal">
          {post.body.map((b, i) => {
            if (b.h2) return <h2 key={i}>{b.h2}</h2>
            if (b.ul) return <ul key={i}>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>
            if (b.quote) return <blockquote key={i}>{b.quote}</blockquote>
            return <p key={i}>{b.p}</p>
          })}
        </div>
      </article>
      {more.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <h2 className="section__title reveal" style={{ marginBottom: 40 }}>Keep reading</h2>
            <div className="posts posts--two">
              {more.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
      <CTA />
    </>
  )
}
