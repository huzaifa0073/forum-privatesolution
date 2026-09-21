import Link from 'next/link'
import Image from 'next/image'
import { STATS, ONLINE_MEMBERS, NEW_MEMBERS, LATEST_THREADS } from '@/lib/data'
import Shoutbox from '@/components/Shoutbox'

const DISCORD_URL = 'https://discord.gg/XFEkf2kV26'

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

function Avatar({ username, size = 28 }: { username: string; size?: number }) {
  return (
    <Link href={`/user/${username}`} className="relative block rounded-full transition-transform hover:z-20 hover:-translate-y-0.5">
      <span className="relative block rounded-full ring-2 ring-surface-1">
        <span
          style={{ width: size, height: size }}
          className={`grid shrink-0 select-none place-items-center rounded-full bg-gradient-to-br ${getGradient(username)} font-bold leading-none text-white`}
        >
          <span style={{ fontSize: size * 0.43 }}>{username[0].toUpperCase()}</span>
        </span>
      </span>
    </Link>
  )
}

function SectionHeader({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <header className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-dim">{title}</h2>
      {href && linkLabel && (
        <Link href={href} className="text-xs font-medium text-accent hover:underline">
          {linkLabel}
        </Link>
      )}
    </header>
  )
}

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-5">

      {/* Shoutbox */}
      <Shoutbox />

      {/* Quick actions */}
      <section className="rounded-2xl border border-line bg-surface-1">
        <SectionHeader title="Quick Actions" />
        <div className="p-4 grid grid-cols-2 gap-2">
          <Link
            href="/sign-up"
            className="flex flex-col items-center gap-1.5 rounded-xl border border-accent/30 bg-accent-soft px-2 py-3 text-center text-xs font-medium text-accent transition-colors hover:border-accent/60"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" />
            </svg>
            Join Forum
          </Link>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-2 py-3 text-center text-xs font-medium text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            <svg width="18" height="18" viewBox="0 0 640 512" fill="currentColor" aria-hidden="true">
              <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
            </svg>
            Discord
          </a>
          <a
            href="https://privatesolution.org/#products"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-2 py-3 text-center text-xs font-medium text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" x2="21" y1="6" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Store
          </a>
          <Link
            href="/category/support"
            className="flex flex-col items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-2 py-3 text-center text-xs font-medium text-fg-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" x2="12.01" y1="17" y2="17" />
            </svg>
            Support
          </Link>
        </div>
      </section>

      {/* Stats */}

      <section className="rounded-2xl border border-line bg-surface-1">
        <SectionHeader title="Statistics" />
        <div className="p-4">
          <dl className="flex flex-col gap-2">
            {[
              { label: 'Members', value: STATS.members.toLocaleString(), href: '/members' },
              { label: 'Threads', value: STATS.threads.toLocaleString() },
              { label: 'Posts', value: STATS.posts.toLocaleString() },
            ].map(({ label, value, href }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <dt className="text-fg-muted">{label}</dt>
                <dd className="font-semibold text-fg">
                  {href ? (
                    <Link href={href} className="text-accent hover:underline transition-colors">{value}</Link>
                  ) : value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Online now */}
          <div className="mt-4 border-t border-line pt-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-fg-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online Now
              </span>
              <Link href="/members?filter=online" className="text-2xs font-semibold text-accent hover:underline">
                {STATS.onlineCount}
              </Link>
            </div>
            <div className="flex items-center [&>span:not(:first-child)]:-ml-2">
              {ONLINE_MEMBERS.slice(0, 6).map((m) => (
                <span key={m.id} className="inline-flex min-w-0">
                  <Avatar username={m.username} size={30} />
                </span>
              ))}
              {STATS.onlineCount > 6 && (
                <span
                  className="relative grid rounded-full border border-line bg-surface-3 font-display text-2xs font-bold text-fg ring-2 ring-surface-1 -ml-2"
                  style={{ width: 30, height: 30, placeItems: 'center' }}
                >
                  +{STATS.onlineCount - 6}
                </span>
              )}
            </div>
          </div>

          {/* New members */}
          <div className="mt-4 border-t border-line pt-3">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-fg-dim">New Members</div>
            <div className="flex items-center [&>span:not(:first-child)]:-ml-2">
              {NEW_MEMBERS.slice(0, 6).map((m) => (
                <span key={m.id} className="inline-flex min-w-0">
                  <Avatar username={m.username} size={30} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest threads */}
      <section className="rounded-2xl border border-line bg-surface-1">
        <SectionHeader title="Latest Threads" href="/" linkLabel="View all" />
        <div className="p-4">
          <ul className="flex flex-col gap-3">
            {LATEST_THREADS.slice(0, 6).map((thread) => (
              <li key={thread.id}>
                <Link href={`/thread/${thread.id}`} className="group block">
                  <span className="line-clamp-2 text-sm font-medium text-fg transition-colors group-hover:text-accent">
                    {thread.title}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-fg-dim">
                    {thread.author.username} · {thread.categoryName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </aside>
  )
}
