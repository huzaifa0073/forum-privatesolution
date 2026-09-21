'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const DISCORD_URL = 'https://discord.gg/XFEkf2kV26'

const navLinks = [
  { href: '/', label: 'Forums', external: false },
  { href: '/members', label: 'Members', external: false },
  { href: 'https://privatesolution.org/#products', label: 'Store', external: true },
  { href: '/category/support', label: 'Support', external: false },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-[1100] border-b border-line bg-canvas/90 glass">
      <div className="mx-auto grid h-16 max-w-[82rem] grid-cols-[auto_1fr_auto] items-center gap-2 px-4 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          aria-label="Private Solutions Forum"
          className="group flex items-center gap-2.5"
        >
          <Image
            src="/ps-logo.webp"
            alt="Private Solutions"
            width={32}
            height={32}
            className="shrink-0 rounded-md"
            priority
          />
          <span className="font-display text-base font-extrabold tracking-tight text-fg hidden sm:block">
            Private<span className="text-accent">Solutions</span>
          </span>
          <span className="font-display text-xs font-semibold tracking-widest text-fg-dim uppercase ml-0.5 hidden md:block">
            Forum
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden min-w-0 max-w-full items-center justify-center gap-0.5 justify-self-center rounded-full border border-line bg-surface-1/70 p-1 lg:flex">
          {navLinks.map((link, i) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-150 text-fg-muted hover:bg-surface-2 hover:text-fg"
              >
                {link.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" />
                </svg>
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-150 ${
                  i === 0
                    ? 'bg-accent text-on-accent shadow-[0_0_0_1px_rgba(45,156,245,0.3),0_0_16px_rgba(45,156,245,0.15)]'
                    : 'text-fg-muted hover:bg-surface-2 hover:text-fg'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-2">
          {/* Discord */}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-control border border-line bg-surface-2 px-3 py-2 text-xs font-semibold text-fg-muted hover:text-fg hover:border-accent/30 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 640 512" fill="currentColor" aria-hidden="true">
              <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
            </svg>
            Discord
          </a>

          {/* Sign in */}
          <Link
            href="/sign-in"
            className="hidden lg:inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap rounded-control transition-colors duration-200 text-fg-muted hover:text-fg hover:bg-surface-2 bg-transparent text-sm min-h-[2.5rem] px-4"
          >
            Sign in
          </Link>

          {/* Sign up — Discord CTA */}
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap rounded-control transition-all duration-200 bg-accent text-on-accent hover:bg-accent-bright text-sm min-h-[2.5rem] px-4 shadow-[0_0_0_1px_rgba(45,156,245,0.3),0_0_16px_rgba(45,156,245,0.15)]"
          >
            <svg width="14" height="14" viewBox="0 0 640 512" fill="currentColor" aria-hidden="true" className="hidden sm:block">
              <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
            </svg>
            Join Discord
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-10 w-10 place-items-center rounded-control border border-line bg-surface-2 text-fg-muted transition-colors hover:text-fg lg:hidden"
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-line bg-canvas px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-fg-muted hover:bg-surface-2 hover:text-fg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-line pt-2 flex gap-2">
              <Link href="/sign-in" className="flex-1 rounded-control border border-line bg-surface-2 py-2 text-center text-sm font-semibold text-fg-muted hover:text-fg transition-colors">
                Sign in
              </Link>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-control bg-accent py-2 text-center text-sm font-semibold text-on-accent hover:bg-accent-bright transition-colors"
              >
                Join Discord
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
