import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CATEGORIES, THREADS } from '@/lib/data'
import ThreadRow from '@/components/ThreadRow'
import Sidebar from '@/components/Sidebar'

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)
  if (!category) notFound()

  const threads = THREADS.filter((t) => t.categorySlug === slug)
  const pinnedThreads = threads.filter((t) => t.pinned)
  const regularThreads = threads.filter((t) => !t.pinned)

  return (
    <div className="mx-auto w-full max-w-[82rem] px-4 py-6 sm:px-6">
      <div className="forum-layout">
        <div className="min-w-0 flex flex-col gap-4">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-fg-dim">
            <Link href="/" className="hover:text-fg transition-colors">Forums</Link>
            <span>›</span>
            <span className={`font-medium ${category.color}`}>{category.name}</span>
          </nav>

          {/* Category header */}
          <div className="rounded-2xl border border-line bg-surface-1 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface-2 text-2xl">
                {category.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-xl font-bold ${category.color}`}>{category.name}</h1>
                <p className="mt-0.5 text-sm text-fg-muted">{category.description}</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-fg-dim">
                  <span><span className="font-semibold text-fg">{category.threadCount}</span> threads</span>
                  <span><span className="font-semibold text-fg">{category.postCount}</span> posts</span>
                </div>
              </div>
              <Link
                href={`/new-thread?category=${category.slug}`}
                className="hidden sm:inline-flex items-center gap-2 rounded-control bg-accent px-4 py-2 text-sm font-semibold text-on-accent hover:bg-accent-bright transition-colors shadow-[var(--glow-signal)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" />
                </svg>
                New Thread
              </Link>
            </div>
          </div>

          {/* Subforums */}
          {category.subforums && category.subforums.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {category.subforums.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/category/${sub.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface-1 px-4 py-3 hover:border-accent/30 hover:bg-surface-2 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-fg">{sub.name}</div>
                    <div className="text-xs text-fg-dim">{sub.description}</div>
                  </div>
                  <div className="text-xs text-fg-dim shrink-0">{sub.threadCount} threads</div>
                </Link>
              ))}
            </div>
          )}

          {/* Pinned threads */}
          {pinnedThreads.length > 0 && (
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-fg-dim">Pinned</div>
              <div className="rounded-2xl border border-line bg-surface-1 overflow-hidden divide-y divide-line">
                {pinnedThreads.map((thread) => (
                  <ThreadRow key={thread.id} thread={thread} />
                ))}
              </div>
            </div>
          )}

          {/* Regular threads */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-fg-dim">
                {regularThreads.length > 0 ? `${regularThreads.length} Threads` : 'Threads'}
              </span>
              <Link
                href={`/new-thread?category=${category.slug}`}
                className="sm:hidden inline-flex items-center gap-1 rounded-control bg-accent px-3 py-1.5 text-xs font-semibold text-on-accent hover:bg-accent-bright transition-colors"
              >
                + New Thread
              </Link>
            </div>

            {regularThreads.length > 0 ? (
              <div className="rounded-2xl border border-line bg-surface-1 overflow-hidden divide-y divide-line">
                {regularThreads.map((thread) => (
                  <ThreadRow key={thread.id} thread={thread} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-line bg-surface-1 p-10 text-center">
                <p className="text-sm text-fg-dim">No threads yet. Be the first to post!</p>
                <Link
                  href={`/new-thread?category=${category.slug}`}
                  className="mt-3 inline-flex items-center gap-2 rounded-control bg-accent px-4 py-2 text-sm font-semibold text-on-accent hover:bg-accent-bright transition-colors"
                >
                  Create Thread
                </Link>
              </div>
            )}
          </div>

        </div>
        <Sidebar />
      </div>
    </div>
  )
}
