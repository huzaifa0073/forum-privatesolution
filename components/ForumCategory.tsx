import Link from 'next/link'
import { Category } from '@/lib/data'

const GRADIENTS = ['avatar-gradient-1', 'avatar-gradient-2', 'avatar-gradient-3', 'avatar-gradient-4', 'avatar-gradient-5']

function getGradient(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length]
}

type Props = {
  category: Category
}

export default function ForumCategory({ category }: Props) {
  return (
    <div className="rounded-2xl border border-line bg-surface-1 overflow-hidden transition-colors hover:border-line-strong">
      {/* Main category row */}
      <div className="flex items-start gap-4 p-4">
        {/* Icon */}
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-xl`}>
          {category.icon}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/category/${category.slug}`}
              className={`text-base font-bold ${category.color} hover:underline transition-colors`}
            >
              {category.name}
            </Link>
          </div>
          <p className="mt-0.5 text-sm text-fg-dim">{category.description}</p>

          {/* Subforums */}
          {category.subforums && category.subforums.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {category.subforums.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/category/${sub.slug}`}
                  className="inline-flex items-center rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-fg-muted hover:text-fg hover:border-accent/40 transition-colors"
                >
                  {sub.name}
                  <span className="ml-1.5 text-fg-dim">{sub.threadCount}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Stats — hidden on small screens */}
        <div className="hidden sm:flex shrink-0 gap-6 text-center">
          <div>
            <div className="text-sm font-bold text-fg">{category.threadCount.toLocaleString()}</div>
            <div className="text-2xs font-medium uppercase tracking-wider text-fg-dim">Threads</div>
          </div>
          <div>
            <div className="text-sm font-bold text-fg">{category.postCount.toLocaleString()}</div>
            <div className="text-2xs font-medium uppercase tracking-wider text-fg-dim">Posts</div>
          </div>
        </div>

        {/* Latest thread — hidden on small screens */}
        {category.latestThread && (
          <div className="hidden xl:block shrink-0 w-48 min-w-0">
            <div className="text-2xs font-semibold uppercase tracking-wider text-fg-dim mb-1">Latest</div>
            <Link
              href={`/thread/${category.latestThread.id}`}
              className="block truncate text-sm font-medium text-fg hover:text-accent transition-colors"
            >
              {category.latestThread.title}
            </Link>
            <div className="mt-0.5 flex items-center gap-1">
              <span
                className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white ${getGradient(category.latestThread.author)}`}
              >
                {category.latestThread.author[0].toUpperCase()}
              </span>
              <span className="truncate text-2xs text-fg-dim">
                {category.latestThread.author} · {category.latestThread.at}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Subforum rows (visible on mobile) */}
      {category.subforums && category.subforums.length > 0 && (
        <div className="border-t border-line sm:hidden">
          {category.subforums.map((sub) => (
            <Link
              key={sub.slug}
              href={`/category/${sub.slug}`}
              className="flex items-center justify-between px-4 py-2.5 text-sm text-fg-muted hover:bg-surface-2 hover:text-fg transition-colors"
            >
              <span>{sub.name}</span>
              <span className="text-xs text-fg-dim">{sub.threadCount} threads</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
