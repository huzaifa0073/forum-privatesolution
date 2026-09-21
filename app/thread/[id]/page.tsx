import { notFound } from 'next/navigation'
import Link from 'next/link'
import { THREADS } from '@/lib/data'
import Sidebar from '@/components/Sidebar'

const GRADIENTS = [
  'from-indigo-600 to-indigo-900',
  'from-purple-600 to-purple-900',
  'from-blue-600 to-blue-900',
  'from-rose-600 to-rose-900',
  'from-emerald-600 to-emerald-900',
]

function getGradient(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length]
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function PostCard({
  username,
  role,
  posts,
  content,
  createdAt,
  likes,
  isOP = false,
}: {
  username: string
  role: string
  posts: number
  content: string
  createdAt: string
  likes: number
  isOP?: boolean
}) {
  const roleColors: Record<string, string> = {
    admin: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
    moderator: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    vendor: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    member: 'text-fg-dim border-line bg-surface-3',
  }

  return (
    <div className={`rounded-2xl border ${isOP ? 'border-accent/20 bg-surface-1' : 'border-line bg-surface-1'} overflow-hidden`}>
      <div className="flex gap-0 sm:gap-4">
        {/* Author panel */}
        <div className="hidden sm:flex w-36 shrink-0 flex-col items-center gap-2 border-r border-line bg-surface-2 px-3 py-4 text-center">
          <div
            className={`h-12 w-12 rounded-full bg-gradient-to-br ${getGradient(username)} flex items-center justify-center text-lg font-bold text-white`}
          >
            {username[0].toUpperCase()}
          </div>
          <Link href={`/user/${username}`} className="text-sm font-semibold text-fg hover:text-accent transition-colors">
            {username}
          </Link>
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-2xs font-semibold capitalize ${roleColors[role] ?? roleColors.member}`}>
            {role}
          </span>
          <div className="text-2xs text-fg-dim">{posts} posts</div>
          {isOP && (
            <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 text-2xs font-semibold text-accent">
              OP
            </span>
          )}
        </div>

        {/* Post content */}
        <div className="flex-1 min-w-0 p-4 sm:p-5">
          {/* Mobile author */}
          <div className="flex items-center gap-2 mb-3 sm:hidden">
            <div
              className={`h-7 w-7 rounded-full bg-gradient-to-br ${getGradient(username)} flex items-center justify-center text-xs font-bold text-white`}
            >
              {username[0].toUpperCase()}
            </div>
            <Link href={`/user/${username}`} className="text-sm font-semibold text-fg hover:text-accent">
              {username}
            </Link>
            <span className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-2xs font-semibold capitalize ${roleColors[role] ?? roleColors.member}`}>
              {role}
            </span>
            {isOP && <span className="text-2xs font-semibold text-accent">OP</span>}
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-sm max-w-none">
            {content.split('\n\n').map((para, i) => {
              if (para.startsWith('**') && para.includes('**')) {
                return (
                  <p key={i} className="text-sm text-fg leading-relaxed mb-2 last:mb-0 whitespace-pre-wrap">
                    {para.replace(/\*\*(.*?)\*\*/g, '$1')}
                  </p>
                )
              }
              return (
                <p key={i} className="text-sm text-fg leading-relaxed mb-2 last:mb-0 whitespace-pre-wrap">
                  {para}
                </p>
              )
            })}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
            <span className="text-2xs text-fg-dim">{formatDate(createdAt)}</span>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-2xs text-fg-dim hover:text-accent transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
                {likes}
              </button>
              <button className="text-2xs text-fg-dim hover:text-accent transition-colors">Quote</button>
              <button className="text-2xs text-fg-dim hover:text-accent transition-colors">Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return THREADS.map((t) => ({ id: t.id }))
}

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const thread = THREADS.find((t) => t.id === id)
  if (!thread) notFound()

  return (
    <div className="mx-auto w-full max-w-[82rem] px-4 py-6 sm:px-6">
      <div className="forum-layout">
        <div className="min-w-0 flex flex-col gap-4">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-fg-dim">
            <Link href="/" className="hover:text-fg transition-colors">Forums</Link>
            <span>›</span>
            <Link href={`/category/${thread.categorySlug}`} className="hover:text-fg transition-colors">{thread.categoryName}</Link>
            <span>›</span>
            <span className="text-fg-muted truncate">{thread.title}</span>
          </nav>

          {/* Thread header */}
          <div className="rounded-2xl border border-line bg-surface-1 p-5">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {thread.pinned && (
                <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 text-2xs font-semibold text-accent">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L8 6H4l2 6-2 4h6v6h4v-6h6l-2-4 2-6h-4l-4-4z" /></svg>
                  Pinned
                </span>
              )}
              {thread.locked && (
                <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-3 px-2 py-0.5 text-2xs font-semibold text-fg-dim">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  Locked
                </span>
              )}
              {thread.tag && (
                <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent-soft px-2 py-0.5 text-2xs font-semibold text-accent">
                  {thread.tag}
                </span>
              )}
            </div>
            <h1 className="text-xl font-bold text-fg sm:text-2xl">{thread.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-fg-dim">
              <span>By <Link href={`/user/${thread.author.username}`} className="text-accent hover:underline">{thread.author.username}</Link></span>
              <span>·</span>
              <span>{formatDate(thread.createdAt)}</span>
              <span>·</span>
              <span>{thread.replyCount} replies</span>
              <span>·</span>
              <span>{thread.viewCount.toLocaleString()} views</span>
            </div>
          </div>

          {/* OP post */}
          <PostCard
            username={thread.author.username}
            role={thread.author.role}
            posts={thread.author.posts}
            content={thread.content}
            createdAt={thread.createdAt}
            likes={0}
            isOP
          />

          {/* Replies */}
          {thread.replies.length > 0 && (
            <>
              <div className="text-xs font-semibold uppercase tracking-wider text-fg-dim mt-2">
                {thread.replies.length} {thread.replies.length === 1 ? 'Reply' : 'Replies'}
              </div>
              {thread.replies.map((reply) => (
                <PostCard
                  key={reply.id}
                  username={reply.author.username}
                  role={reply.author.role}
                  posts={reply.author.posts}
                  content={reply.content}
                  createdAt={reply.createdAt}
                  likes={reply.likes}
                />
              ))}
            </>
          )}

          {/* Reply box */}
          {!thread.locked && (
            <div className="rounded-2xl border border-line bg-surface-1 p-4">
              <h3 className="text-sm font-semibold text-fg mb-3">Post a Reply</h3>
              <textarea
                className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-fg placeholder:text-fg-dim focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/30 resize-none transition-colors"
                rows={4}
                placeholder="Write your reply..."
              />
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-fg-dim">Sign in to post a reply</p>
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-2 rounded-control bg-accent px-4 py-2 text-sm font-semibold text-on-accent hover:bg-accent-bright transition-colors"
                >
                  Sign In to Reply
                </Link>
              </div>
            </div>
          )}

          {thread.locked && (
            <div className="rounded-2xl border border-line bg-surface-1/50 p-4 text-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-fg-dim mx-auto mb-2">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p className="text-sm text-fg-dim">This thread is locked and no longer accepts new replies.</p>
            </div>
          )}
        </div>

        <Sidebar />
      </div>
    </div>
  )
}
