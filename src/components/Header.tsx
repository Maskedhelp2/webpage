'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { NAV_LINKS } from '@/lib/constants'

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          background: rgba(5,5,5,0.92);
          border-bottom: 1px solid rgba(230,51,41,0.3);
          backdrop-filter: blur(10px);
          transition: height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-root.large { height: 100px; padding: 0 48px; }
        .nav-root.small  { height: 60px;  padding: 0 40px; }

        /* Logo — left col */
        .nav-logo {
          display: flex; align-items: center; gap: 14px;
          text-decoration: none; justify-self: start;
        }
        .nav-logo-img {
          object-fit: contain;
          transition: width 0.4s ease, height 0.4s ease;
          filter: drop-shadow(0 0 8px rgba(230,51,41,0.4));
        }
        .nav-root.large .nav-logo-img { width: 48px; height: 48px; }
        .nav-root.small  .nav-logo-img { width: 30px; height: 30px; }
        .nav-logo-text {
          font-family: var(--display); font-weight: 900;
          color: #fff; letter-spacing: 4px;
          transition: font-size 0.4s ease;
        }
        .nav-root.large .nav-logo-text { font-size: 20px; }
        .nav-root.small  .nav-logo-text { font-size: 14px; }

        /* Nav links — center col */
        .nav-links {
          display: flex; align-items: center;
          gap: 48px; justify-self: center;
          position: relative;
        }
        .nav-links::before, .nav-links::after {
          content: '';
          display: block; width: 1px;
          background: rgba(230,51,41,0.2);
          transition: height 0.4s ease;
          align-self: stretch;
        }
        .nav-link {
          font-family: var(--mono); letter-spacing: 4px;
          text-decoration: none; position: relative;
          transition: color 0.2s, font-size 0.4s ease;
          padding: 4px 0;
        }
        .nav-root.large .nav-link { font-size: 12px; }
        .nav-root.small  .nav-link { font-size: 11px; }
        .nav-link.active { color: var(--accent); }
        .nav-link:not(.active) { color: var(--text-dim); }
        .nav-link:hover { color: var(--accent); }
        .nav-link::after {
          content: '';
          position: absolute; bottom: -2px; left: 0; right: 0;
          height: 1px; background: var(--accent);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.2s ease;
        }
        .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }

        /* Right col — tag */
        .nav-tag {
          font-family: var(--mono); font-size: 10px;
          color: var(--text-dim); letter-spacing: 3px;
          justify-self: end;
          transition: opacity 0.4s ease;
        }
        .nav-root.small .nav-tag { opacity: 0; pointer-events: none; }

        /* Mobile */
        @media (max-width: 768px) {
          .nav-root.large,
          .nav-root.small {
            height: 56px; padding: 0 16px;
            grid-template-columns: auto 1fr;
          }
          .nav-root.large .nav-logo-img,
          .nav-root.small .nav-logo-img { width: 28px; height: 28px; }
          .nav-root.large .nav-logo-text,
          .nav-root.small .nav-logo-text { font-size: 13px; letter-spacing: 2px; }
          .nav-links {
            justify-self: end; gap: 20px;
          }
          .nav-links::before, .nav-links::after { display: none; }
          .nav-root.large .nav-link,
          .nav-root.small .nav-link { font-size: 10px; letter-spacing: 1px; }
          .nav-tag { display: none; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? 'small' : 'large'}`}>
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <Image src="/logo.webp" alt="MaskedHelp" width={48} height={48} className="nav-logo-img" style={{ objectFit: 'contain' }} />
          <span className="nav-logo-text">
            MASKED<span style={{ color: 'var(--accent)' }}>HELP</span>
          </span>
        </Link>

        {/* Center nav */}
        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname.startsWith(link.href) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right tag */}
        <span className="nav-tag">// 2026</span>
      </nav>
    </>
  )
}