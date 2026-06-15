'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SITE_FOOTER } from '@/lib/constants'

const SOCIALS = [
  {
    label: 'GITHUB',
    href: 'https://github.com/Maskedhelp2',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LINKEDIN',
    href: 'https://linkedin.com/in/karthik-kumar-7319b6332',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'IEEE',
    href: 'https://www.ieee.org',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
    ),
  },
]

const FOOTER_LINKS = [
  { label: 'FRIENDS', href: '/friends' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'RESUME', href: '/resume' },
  { label: 'PRIVACY POLICY', href: '/privacy' },
  { label: 'TERMS', href: '/terms' },
]

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-root {
          position: relative; z-index: 1;
          border-top: 1px solid #1a1a1a;
          background: rgba(5,5,5,0.98);
        }
        .footer-inner {
          max-width: 960px; margin: 0 auto;
          padding: 56px 40px 32px;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 48px;
          padding-bottom: 40px;
          border-bottom: 1px solid #1a1a1a;
          margin-bottom: 32px;
        }

        /* Brand col */
        .footer-brand-name {
          font-family: var(--display); font-size: 20px; font-weight: 900;
          color: #fff; letter-spacing: 3px; margin-bottom: 12px;
        }
        .footer-brand-tagline {
          font-family: var(--mono); font-size: 10px;
          color: var(--text-dim); letter-spacing: 2px; line-height: 1.8;
          margin-bottom: 24px;
        }

        /* Social icons */
        .footer-socials { display: flex; gap: 12px; }
        .footer-social-btn {
          width: 38px; height: 38px;
          border: 1px solid #2a2a2a;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-dim);
          transition: all 0.2s; text-decoration: none;
        }
        .footer-social-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          box-shadow: 0 0 12px var(--accent-glow);
        }

        /* Nav col */
        .footer-col-label {
          font-family: var(--mono); font-size: 10px;
          color: var(--accent); letter-spacing: 4px;
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .footer-col-label::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, var(--accent-dim), transparent);
        }
        .footer-nav-link {
          display: block;
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 2px;
          text-decoration: none; margin-bottom: 12px;
          transition: color 0.2s;
        }
        .footer-nav-link:hover { color: var(--accent); }

        /* Status col */
        .footer-status-box {
          border: 1px solid rgba(230,51,41,0.2);
          background: rgba(230,51,41,0.04);
          padding: 20px;
          position: relative;
        }
        .footer-status-box::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
        }
        .footer-status-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #00d2d2;
          box-shadow: 0 0 8px #00d2d2;
          display: inline-block; margin-right: 8px;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .footer-status-line {
          font-family: var(--mono); font-size: 10px;
          color: var(--text-dim); letter-spacing: 2px;
          margin-bottom: 10px;
          display: flex; align-items: center;
        }
        .footer-status-val {
          font-family: var(--mono); font-size: 11px;
          color: #fff; letter-spacing: 1px;
        }

        /* Bottom bar */
        .footer-bottom {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .footer-copy {
          font-family: var(--mono); font-size: 10px;
          color: var(--text-dim); letter-spacing: 2px;
        }
        .footer-made {
          font-family: var(--mono); font-size: 10px;
          color: var(--text-dim); letter-spacing: 2px;
        }
        .footer-made span { color: var(--accent); }

        /* Mobile */
        @media (max-width: 768px) {
          .footer-inner { padding: 40px 16px 24px; }
          .footer-top { grid-template-columns: 1fr; gap: 32px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
          .footer-copy, .footer-made { font-size: 9px; }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          <div className="footer-top">

            {/* Col 1 — Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Image src="/logo.webp" alt="MaskedHelp" width={32} height={32} style={{ objectFit: 'contain' }} />
                <div className="footer-brand-name">
                  MASKED<span style={{ color: 'var(--accent)' }}>HELP</span>
                </div>
              </div>
              <p className="footer-brand-tagline">
                WE BUILD WHAT WE<br />WISH EXISTED.<br />
                AMITY UNIVERSITY · 2026
              </p>
              <div className="footer-socials">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Nav */}
            <div>
              <div className="footer-col-label">// NAVIGATE</div>
              {FOOTER_LINKS.map(l => (
                <Link key={l.href} href={l.href} className="footer-nav-link">{l.label}</Link>
              ))}
            </div>

            {/* Col 3 — Status */}
            <div>
              <div className="footer-col-label">// STATUS</div>
              <div className="footer-status-box">
                <div className="footer-status-line">
                  <span className="footer-status-dot" />
                  <span>SYSTEMS ONLINE</span>
                </div>
                <div style={{ height: '1px', background: '#1a1a1a', margin: '12px 0' }} />
                <div className="footer-status-line" style={{ marginBottom: '6px' }}>LOCATION</div>
                <div className="footer-status-val" style={{ marginBottom: '14px' }}>AMITY UNIVERSITY, INDIA</div>
                <div className="footer-status-line" style={{ marginBottom: '6px' }}>OPEN TO</div>
                <div className="footer-status-val" style={{ marginBottom: '14px' }}>COLLABS · INTERNSHIPS</div>
                <div className="footer-status-line" style={{ marginBottom: '6px' }}>STACK</div>
                <div className="footer-status-val">RUST · REACT · ROS2</div>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <span className="footer-copy">{SITE_FOOTER}</span>
            <span className="footer-made">BUILT WITH <span>♥</span> AND TOO MUCH CAFFEINE</span>
          </div>
        </div>
      </footer>
    </>
  )
}
