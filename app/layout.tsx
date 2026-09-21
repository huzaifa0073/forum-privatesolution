import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Private Solutions — Forum',
  description: 'Community hub for DMA hardware, firmware, private solutions, and support.',
  openGraph: {
    title: 'Private Solutions Forum',
    description: 'Hardware. Firmware. Human support. — The Private Solutions community forum.',
    type: 'website',
    url: 'https://forum.privatesolution.org',
    siteName: 'Private Solutions',
  },
}

export const viewport: Viewport = {
  themeColor: '#080c10',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/ps-logo.webp" type="image/webp" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-canvas text-fg">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
