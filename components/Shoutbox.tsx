'use client'

import { useState, useRef, useEffect } from 'react'

type ChatMessage = {
  id: string
  username: string
  role: 'admin' | 'moderator' | 'vendor' | 'member'
  content: string
  createdAt: Date
  replyTo?: { username: string; content: string }
}

const ROLE_COLORS: Record<string, string> = {
  admin: 'text-rose-400',
  moderator: 'text-amber-400',
  vendor: 'text-purple-400',
  member: 'text-accent',
}

const AVATAR_GRADIENTS = [
  'from-blue-500 to-blue-800',
  'from-indigo-500 to-indigo-800',
  'from-purple-500 to-purple-800',
  'from-rose-500 to-rose-800',
  'from-emerald-500 to-emerald-800',
  'from-amber-500 to-amber-800',
]

function getGradient(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h)
  return AVATAR_GRADIENTS[Math.abs(h) % AVATAR_GRADIENTS.length]
}

function timeAgo(date: Date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

// Demo seed messages
const SEED_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    username: 'HuzaifaAdmin',
    role: 'admin',
    content: 'Welcome to the Private Solutions shoutbox! Keep it civil. 🛡️',
    createdAt: new Date(Date.now() - 1000 * 60 * 48),
  },
  {
    id: '2',
    username: 'FirmwareGod',
    role: 'vendor',
    content: 'Shadow DMA v3.1 is out — check the firmware section!',
    createdAt: new Date(Date.now() - 1000 * 60 * 31),
  },
  {
    id: '3',
    username: 'NullPtr_x64',
    role: 'moderator',
    content: 'Anyone having issues with the 35T on Z790 boards? DM me.',
    createdAt: new Date(Date.now() - 1000 * 60 * 18),
  },
  {
    id: '4',
    username: 'SpectralDMA',
    role: 'vendor',
    content: 'New slots open for EAC firmware this week.',
    createdAt: new Date(Date.now() - 1000 * 60 * 9),
  },
  {
    id: '5',
    username: 'KernelPanic',
    role: 'member',
    content: 'Just got my first DMA card setup working, thanks to the guides here 🔥',
    createdAt: new Date(Date.now() - 1000 * 60 * 3),
  },
]

// Simulated current user (in a real app this would come from auth)
const CURRENT_USER = {
  username: 'Guest',
  role: 'member' as const,
}

export default function Shoutbox() {
  const [messages, setMessages] = useState<ChatMessage[]>(SEED_MESSAGES)
  const [input, setInput] = useState('')
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null)
  const [, tick] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Re-render every 30s so "X min ago" stays fresh
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 30000)
    return () => clearInterval(t)
  }, [])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      username: CURRENT_USER.username,
      role: CURRENT_USER.role,
      content: text,
      createdAt: new Date(),
      replyTo: replyTo ? { username: replyTo.username, content: replyTo.content } : undefined,
    }
    setMessages((prev) => [...prev, msg])
    setInput('')
    setReplyTo(null)
  }

  function handleDelete(id: string) {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
    if (e.key === 'Escape') setReplyTo(null)
  }

  // Is current user a mod/admin? (demo: always true for delete on own messages)
  const canModerate = (msg: ChatMessage) => {
    const role = CURRENT_USER.role as string
    return msg.username === CURRENT_USER.username || role === 'admin' || role === 'moderator'
  }

  return (
    <section className="rounded-2xl border border-line bg-surface-1 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between gap-2 border-b border-line px-4 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <h2 className="text-xs font-bold uppercase tracking-wider text-fg">Shoutbox</h2>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-fg-dim">
          <span>{messages.length} msgs</span>
          <a
            href="https://privatesolution.org/#products"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Store
          </a>
          <a
            href="/category/support"
            className="hover:text-fg transition-colors"
          >
            Support
          </a>
        </div>
      </header>

      {/* Messages */}
      <div className="flex flex-col gap-0 overflow-y-auto max-h-[400px] min-h-[220px] px-3 py-2">
        {messages.map((msg) => (
          <div key={msg.id} className="group flex items-start gap-2.5 py-2 border-b border-line/50 last:border-0">
            {/* Avatar */}
            <div
              className={`shrink-0 h-7 w-7 rounded-full bg-gradient-to-br ${getGradient(msg.username)} flex items-center justify-center text-[11px] font-bold text-white mt-0.5`}
            >
              {msg.username[0].toUpperCase()}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className={`text-xs font-bold ${ROLE_COLORS[msg.role]}`}>
                  {msg.username}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-2xs text-fg-dim opacity-0 group-hover:opacity-100 transition-opacity">
                    {timeAgo(msg.createdAt)}
                  </span>
                  {/* Reply */}
                  <button
                    onClick={() => { setReplyTo(msg); inputRef.current?.focus() }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-fg-dim hover:text-accent"
                    aria-label="Reply"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 17 4 12 9 7" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                    </svg>
                  </button>
                  {/* Delete (moderated) */}
                  {canModerate(msg) && (
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-fg-dim hover:text-rose-400"
                      aria-label="Delete message"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Reply quote */}
              {msg.replyTo && (
                <div className="mt-0.5 mb-1 flex items-start gap-1.5 rounded-md border-l-2 border-accent/40 bg-surface-2 px-2 py-1">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent shrink-0 mt-0.5">
                    <polyline points="9 17 4 12 9 7" /><path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                  </svg>
                  <span className="text-2xs text-fg-dim truncate">
                    <span className="font-semibold text-accent/80">{msg.replyTo.username}</span>
                    {' · '}
                    {msg.replyTo.content.slice(0, 50)}{msg.replyTo.content.length > 50 ? '…' : ''}
                  </span>
                </div>
              )}

              <p className="text-xs text-fg leading-relaxed mt-0.5">{msg.content}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Reply banner */}
      {replyTo && (
        <div className="flex items-center justify-between gap-2 border-t border-accent/20 bg-accent-soft px-3 py-1.5">
          <span className="text-2xs text-accent truncate">
            Replying to <span className="font-semibold">{replyTo.username}</span>: {replyTo.content.slice(0, 40)}…
          </span>
          <button onClick={() => setReplyTo(null)} className="text-accent/60 hover:text-accent shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-line px-3 py-2.5 flex items-center gap-2 shrink-0 bg-surface-2">
        {/* Emoji placeholder */}
        <button className="text-fg-dim hover:text-fg transition-colors shrink-0" aria-label="Emoji">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" />
          </svg>
        </button>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Say something…"
          maxLength={280}
          className="flex-1 min-w-0 bg-transparent text-xs text-fg placeholder:text-fg-dim focus:outline-none"
        />

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white transition-colors hover:bg-accent-bright disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Send"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
          </svg>
        </button>
      </div>
    </section>
  )
}
