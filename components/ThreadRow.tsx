import Link from 'next/link'
import { Thread } from '@/lib/data'

const TAG_COLORS: Record<string, string> = {
  Release: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
  Guide: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  Announcement: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  Help: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
  Vendor: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
  Discussion: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  WTS: 'bg-green-500/15 text-green-300 border-green-500/25',
  Research: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
}

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

type Props = {
  thread: Thread
}

export default function ThreadRow({ thread }: Props) {
  const tagClass = thread.tag ? TAG_COLORS[thread.tag] ?? 'bg-surface-3 text-fg-muted border-line' : ''

  return (
    <div className={`group flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-surface-2/50 ${thread.pinned ? 'bg-accent/[0.03]' : ''}`}>
      {/* Avatar */}
      <div className="shrink-0 mt-0.5">
        <div
          className={`h-8 w-8 rounded-full bg-gradient-to-br ${getGradient(thread.author.username)} flex items-center justify-center text-xs font-bold text-white`}
        >
          {thread.author.username[0].toUpperCase()}
        </div>
      </div>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
          {/* Pinned indicator */}
          {thread.pinned && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-accent shrink-0" aria-label="Pinned">
              <path d="M12 2L8 6H4l2 6-2 4h6v6h4v-6h6l-2-4 2-6h-4l-4-4z" />
            </svg>
          )}
          {/* Tag */}
          {thread.tag && (
            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-2xs font-semibold ${tagClass}`}>
              {thread.tag}
            </span>
          )}
          {/* Locked indicator */}
          {thread.locked && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-fg-dim shrink-0">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
        </div>

        <Link
          href={`/thread/${thread.id}`}
          className="text-sm font-semibold text-fg group-hover:text-accent transition-colors line-clamp-1"
        >
          {thread.title}
        </Link>

        <div className="mt-0.5 flex items-center gap-1.5 text-2xs text-fg-dim">
          <Link href={`/user/${thread.author.username}`} className="font-medium text-fg-muted hover:text-accent transition-colors">
            {thread.author.username}
          </Link>
          <span>·</span>
          <Link href={`/category/${thread.categorySlug}`} className="hover:text-fg-muted transition-colors">
            {thread.categoryName}
          </Link>
          <span>·</span>
          <span>Last reply by <span className="text-fg-muted">{thread.lastReply.author}</span> {thread.lastReply.at}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="hidden sm:flex shrink-0 gap-4 text-center min-w-[6rem]">
        <div>
          <div className="text-sm font-semibold text-fg">{thread.replyCount}</div>
          <div className="text-2xs text-fg-dim">Replies</div>
        </div>
        <div>
          <div className="text-sm font-semibold text-fg">{thread.viewCount.toLocaleString()}</div>
          <div className="text-2xs text-fg-dim">Views</div>
        </div>
      </div>
    </div>
  )
}
