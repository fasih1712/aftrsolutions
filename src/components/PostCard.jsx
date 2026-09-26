import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { formatDate } from '../data/blog'

export default function PostCard({ post, index = 0 }) {
  return (
    <Link to={`/blog/${post.slug}`} className="post-card reveal" style={{ '--d': `${index * 90}ms` }}>
      <div className="post-card__art" aria-hidden="true"><span>{post.category}</span></div>
      <div className="post-card__body">
        <span className="post-card__meta">{formatDate(post.date)} · {post.readTime}</span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="product__link">Read article <ArrowUpRight size={16} /></span>
      </div>
    </Link>
  )
}
