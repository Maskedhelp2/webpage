'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-root {
          position: relative; z-index: 1;
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          padding: 150px 40px 80px;
          max-width: 960px; margin: 0 auto;
        }
        .hero-title {
          font-family: var(--display);
          font-size: clamp(48px, 9vw, 104px);
          font-weight: 900; color: #fff;
          line-height: 1; letter-spacing: -2px;
        }
        .hero-cta-primary {
          font-family: var(--mono); font-size: 12px;
          letter-spacing: 3px; padding: 16px 36px;
          background: var(--accent); color: #fff;
          border: 1px solid var(--accent);
          transition: opacity 0.2s; text-decoration: none;
        }
        .hero-cta-primary:hover { opacity: 0.82; }
        .hero-cta-secondary {
          font-family: var(--mono); font-size: 12px;
          letter-spacing: 3px; padding: 16px 36px;
          background: transparent; color: var(--text-dim);
          border: 1px solid #2a2a2a;
          transition: all 0.2s; text-decoration: none;
        }
        .hero-cta-secondary:hover { border-color: var(--accent); color: var(--accent); }

        @media (max-width: 640px) {
          .hero-root { padding: 110px 16px 60px; }
          .hero-logo { width: 64px !important; height: 64px !important; }
          .hero-stats { gap: 24px !important; }
          .hero-cta-primary, .hero-cta-secondary { padding: 12px 20px; font-size: 11px; }
          .hero-cta-row { flex-direction: column !important; }
          .hero-bio { font-size: 14px !important; }
        }
      `}</style>

      <section className="hero-root">
        {/* Eyebrow */}
        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '4px', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--accent)' }} />
          MASKEDHELP // PORTFOLIO 2026
        </div>

        {/* Logo + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px', marginBottom: '36px', flexWrap: 'wrap' }}>
          <Image
            src="/logo.webp"
            alt="MaskedHelp"
            width={110}
            height={110}
            className="hero-logo"
            style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 32px rgba(230,51,41,0.55))' }}
          />
          <div>
            <h1 className="hero-title">
              MASKED<span style={{ color: 'var(--accent)' }}>HELP</span>
            </h1>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: 'var(--text-dim)', letterSpacing: '3px', marginTop: '10px' }}>
              WE BUILD WHAT WE WISH EXISTED
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="hero-bio" style={{ fontFamily: 'var(--prose)', fontSize: '16px', color: 'var(--text)', lineHeight: 1.85, maxWidth: '600px', marginBottom: '48px' }}>
          A crew from Amity University building at the intersection of embedded systems,
          full-stack software, and AI/robotics. We turn ideas into hardware that ships and software that works.
        </p>

        {/* Stats */}
        <div className="hero-stats" style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', marginBottom: '48px', borderTop: '1px solid #1a1a1a', paddingTop: '32px' }}>
          {[
            { value: '3', label: 'PROJECTS SHIPPED' },
            { value: '4', label: 'FRIENDS' },
            { value: '2026', label: 'ACTIVE' },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontFamily: 'var(--display)', fontSize: '40px', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '3px', marginTop: '6px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-cta-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/projects" className="hero-cta-primary">VIEW PROJECTS →</Link>
          <Link href="/friends" className="hero-cta-secondary">MEET THE FRIENDS</Link>
        </div>
      </section>
    </>
  )
}
