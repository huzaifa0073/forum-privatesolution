import Image from 'next/image'
import ForumCategory from '@/components/ForumCategory'
import Sidebar from '@/components/Sidebar'
import ThreadRow from '@/components/ThreadRow'
import { CATEGORIES, THREADS } from '@/lib/data'

const DISCORD_URL = 'https://discord.gg/XFEkf2kV26'
const PINNED_THREADS = THREADS.filter((t) => t.pinned)
const RECENT_THREADS = THREADS.filter((t) => !t.pinned).slice(0, 6)

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[82rem] px-4 py-6 sm:px-6">
      <div className="forum-layout">

        {/* Main content */}
        <div className="min-w-0 flex flex-col gap-6">

          {/* Hero banner */}
          <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-surface-1 to-surface-1 p-6">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(45,156,245,0.12),transparent_60%)]" />
            <div className="relative flex items-start gap-4">
              <Image
                src="/ps-logo.webp"
                alt="Private Solutions"
                width={56}
                height={56}
                className="shrink-0 rounded-xl shadow-[0_0_24px_rgba(45,156,245,0.25)] hidden sm:block"
              />
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Community Forum
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
                  Private<span className="text-accent">Solutions</span> Forum
                </h1>
                <p className="mt-1.5 text-sm text-fg-muted max-w-xl">
                  Hardware. Firmware. Human support. — The community hub for DMA hardware, firmware configuration, and technical support.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-control bg-accent px-4 py-2 text-sm font-semibold text-on-accent hover:bg-accent-bright transition-colors shadow-[0_0_0_1px_rgba(45,156,245,0.3),0_0_16px_rgba(45,156,245,0.15)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 640 512" fill="currentColor" aria-hidden="true">
                      <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
                    </svg>
                    Get started on Discord
                  </a>
                  <a
                    href="https://privatesolution.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-control border border-line bg-surface-2 px-4 py-2 text-sm font-semibold text-fg-muted hover:text-fg transition-colors"
                  >
                    Main Site →
                  </a>
                </div>
              </div>
            </div>
          </div>


          {/* Forum categories */}
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg-dim">Categories</h2>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((category) => (
                <ForumCategory key={category.slug} category={category} />
              ))}
            </div>
          </section>

          {/* Pinned threads */}
          {PINNED_THREADS.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg-dim">Pinned</h2>
              <div className="rounded-2xl border border-line bg-surface-1 overflow-hidden divide-y divide-line">
                {PINNED_THREADS.map((thread) => (
                  <ThreadRow key={thread.id} thread={thread} />
                ))}
              </div>
            </section>
          )}

          {/* Recent threads */}
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-fg-dim">Recent Activity</h2>
            <div className="rounded-2xl border border-line bg-surface-1 overflow-hidden divide-y divide-line">
              {RECENT_THREADS.map((thread) => (
                <ThreadRow key={thread.id} thread={thread} />
              ))}
            </div>
          </section>

        </div>

        {/* Sidebar — stacked on mobile, side column on desktop */}
        <Sidebar />

      </div>
    </div>
  )
}
