import Link from 'next/link'
import Image from 'next/image'

const DISCORD_URL = 'https://discord.gg/XFEkf2kV26'

const footerLinks = [
  { href: '/terms', label: 'Terms' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/category/announcements', label: 'Rules' },
  { href: '/category/support', label: 'Support' },
]

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t border-line bg-surface-1">
      <div className="mx-auto flex max-w-[82rem] flex-col gap-3 px-4 py-6 text-xs text-fg-dim sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image src="/ps-logo.webp" alt="Private Solutions" width={22} height={22} className="rounded" />
            <span className="font-display font-extrabold tracking-tight text-fg text-sm">
              Private<span className="text-accent">Solutions</span>
            </span>
            <span className="text-fg-dim">·</span>
            <p>Hardware. Firmware. Human support.</p>
          </div>
          <div className="flex items-center gap-4">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-fg">
                {link.label}
              </Link>
            ))}
            <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              Discord
            </a>
            <a href="https://privatesolution.org" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
              Main Site
            </a>
          </div>
        </div>
        <p className="text-center sm:text-left text-fg-dim/70">
          © {new Date().getFullYear()} Private Solutions. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
