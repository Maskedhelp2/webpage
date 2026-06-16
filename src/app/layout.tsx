import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MASKEDHELP // PORTFOLIO',
  description: 'Portfolio of  MaskedHelp - Karthik Kumar.',
  icons: { icon: '/logo.webp' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@300;400;600;700&family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
