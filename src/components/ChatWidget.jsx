import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BotMessageSquare, X, ArrowUp, RotateCcw } from 'lucide-react'
import { site } from '../data/site'

const STORE = 'aftr-chat'
const GREETING = {
  role: 'assistant',
  content: 'Hi! I’m the AFTR Assistant. Ask me anything about our services, products or how we work. You can write in any language, including Urdu and Roman Urdu.',
}
const SUGGESTIONS = [
  'What services do you offer?',
  'Can you build a WhatsApp AI chatbot?',
  'Tell me about Phelix ERP',
  'How does a project start?',
]

function load() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE))
    if (Array.isArray(saved) && saved.length) return saved
  } catch { /* storage unavailable */ }
  return [GREETING]
}

// Minimal, safe markdown: paragraphs, "- " bullets, **bold** and [text](url) links.
function Inline({ text }) {
  const parts = []
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g
  let last = 0
  let m
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1]) parts.push(<strong key={m.index}>{m[1]}</strong>)
    else {
      const href = m[3].replace(/^https?:\/\/(www\.)?aftrsolutions\.com/, '') || '/'
      parts.push(href.startsWith('/')
        ? <Link key={m.index} to={href}>{m[2]}</Link>
        : href.startsWith('mailto:') || href.startsWith('https://')
          ? <a key={m.index} href={href} target="_blank" rel="noreferrer">{m[2]}</a>
          : m[2])
    }
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function Rich({ text }) {
  const blocks = text.split(/\n{2,}/)
  return blocks.map((block, i) => {
    const lines = block.split('\n')
    if (lines.every((l) => /^\s*([-*•]|\d+\.)\s+/.test(l))) {
      return <ul key={i}>{lines.map((l, j) => <li key={j}><Inline text={l.replace(/^\s*([-*•]|\d+\.)\s+/, '')} /></li>)}</ul>
    }
    return <p key={i}>{lines.map((l, j) => <span key={j}>{j > 0 && <br />}<Inline text={l.replace(/^#+\s*/, '')} /></span>)}</p>
  })
}

export default function ChatWidget() {
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(load)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  // Only show the assistant when the chat service is configured.
  useEffect(() => {
    fetch('/api/health').then((r) => (r.ok ? r.json() : null)).then((d) => setReady(Boolean(d?.ready))).catch(() => {})
  }, [])

  useEffect(() => {
    try { sessionStorage.setItem(STORE, JSON.stringify(messages.slice(-30))) } catch { /* ignore */ }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function send(text) {
    const content = text.trim()
    if (!content || busy) return
    const history = [...messages, { role: 'user', content }]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setBusy(true)
    const update = (reply) => setMessages([...history, { role: 'assistant', content: reply }])
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // the greeting is UI-only, so it is not sent
        body: JSON.stringify({ messages: history.filter((m) => m !== GREETING && m.content !== GREETING.content) }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        update(res.status === 429
          ? 'You’ve sent a lot of messages in a short time. Please wait a few minutes and try again.'
          : err.error || `Sorry, something went wrong. Please email us at ${site.email}.`)
        return
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let reply = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        reply += decoder.decode(value, { stream: true })
        update(reply)
      }
    } catch {
      update(`Sorry, I couldn’t connect. Please try again, or email us at ${site.email}.`)
    } finally {
      setBusy(false)
      inputRef.current?.focus()
    }
  }

  if (!ready) return null
  const fresh = messages.length === 1

  return (
    <div className={`chat ${open ? 'chat--open' : ''}`}>
      <section className="chat__panel" role="dialog" aria-label="AFTR Assistant" aria-hidden={!open}>
        <header className="chat__head">
          <span className="chat__avatar"><BotMessageSquare size={20} strokeWidth={1.7} /></span>
          <div className="chat__title">
            <strong>AFTR Assistant</strong>
            <span><i className="chat__dot" /> Online · replies in any language</span>
          </div>
          {!fresh && (
            <button className="icon-btn chat__icon" onClick={() => setMessages([GREETING])} aria-label="Start a new chat" title="New chat">
              <RotateCcw size={16} />
            </button>
          )}
          <button className="icon-btn chat__icon" onClick={() => setOpen(false)} aria-label="Close chat">
            <X size={18} />
          </button>
        </header>

        <div className="chat__list" ref={listRef} aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`chat__msg chat__msg--${m.role}`} dir="auto">
              {m.content
                ? <Rich text={m.content} />
                : <span className="chat__typing" aria-label="Assistant is typing"><i /><i /><i /></span>}
            </div>
          ))}
          {fresh && (
            <div className="chat__suggest">
              {SUGGESTIONS.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}
            </div>
          )}
        </div>

        <form className="chat__form" onSubmit={(e) => { e.preventDefault(); send(input) }}>
          <textarea
            ref={inputRef}
            rows={1}
            dir="auto"
            value={input}
            maxLength={2000}
            placeholder="Ask about our services…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
          />
          <button type="submit" className="chat__send" disabled={busy || !input.trim()} aria-label="Send message">
            <ArrowUp size={18} />
          </button>
        </form>
        <p className="chat__note">AI assistant. For quotes and project details, <Link to="/contact" onClick={() => setOpen(false)}>contact the team</Link>.</p>
      </section>

      <button className="chat__fab" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close chat' : 'Chat with the AFTR Assistant'} aria-expanded={open}>
        {open ? <X size={22} /> : <BotMessageSquare size={24} strokeWidth={1.7} />}
        {!open && <span className="chat__fab-label">Ask AI</span>}
      </button>
    </div>
  )
}
