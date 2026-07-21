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
  {
    label: 'EMAIL',
    href: 'mailto:masked@maskedhelp.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
]

const FOOTER_LINKS = [
  { label: 'FRIENDS',      href: '/friends' },
  { label: 'PROJECTS',     href: '/projects' },
  { label: 'SKILLS',       href: '/skills' },
  { label: 'PRIVACY POLICY', href: '/privacy' },
  { label: 'TERMS',        href: '/terms' },
  { label: 'EXPERIENCE', href: '/experience' },
]

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-root {
          position: relative;
          z-index: 1;
          border-top: 1px solid #1a1a1a;
          background: rgba(5,5,5,0.98);
        }

        /* ── Big CTA band ── */
        .footer-cta {
          border-bottom: 1px solid #1a1a1a;
          padding: 72px 40px;
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }
        .footer-cta-heading {
          font-family: var(--display);
          font-size: clamp(3rem, 7.5vw, 6rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.04em;
          line-height: 0.92;
          margin-bottom: 20px;
        }
        .footer-cta-heading span { color: #e63329; }
        .footer-cta-sub {
          font-family: var(--mono);
          font-size: 12px;
          color: #999;
          letter-spacing: 0.2em;
        }
        .footer-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--mono);
          font-size: 13px;
          letter-spacing: 0.18em;
          color: #fff;
          border: 1px solid #e63329;
          padding: 18px 36px;
          background: transparent;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s, box-shadow 0.2s;
          flex-shrink: 0;
        }
        .footer-cta-btn:hover {
          background: rgba(230,51,41,0.1);
          box-shadow: 0 0 24px rgba(230,51,41,0.2);
        }
        .footer-cta-btn svg { transition: transform 0.2s; }
        .footer-cta-btn:hover svg { transform: translateX(4px); }

        /* ── Email display strip ── */
        .footer-email-strip {
          border-bottom: 1px solid #1a1a1a;
          padding: 20px 40px;
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .footer-email-label {
          font-family: var(--mono);
          font-size: 11px;
          color: #e63329;
          letter-spacing: 0.2em;
          flex-shrink: 0;
        }
        .footer-email-value {
          font-family: var(--mono);
          font-size: 16px;
          color: #aaa;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-email-value:hover { color: #e63329; }
        .footer-email-sep {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #1a1a1a, transparent);
        }

        /* ── Main 4-col grid ── */
        .footer-inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 56px 40px 32px;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid #1a1a1a;
          margin-bottom: 32px;
        }

        .footer-brand-name {
          font-family: var(--display);
          font-size: 20px;
          font-weight: 900;
          color: #fff;
          letter-spacing: 3px;
          margin-bottom: 12px;
        }
        .footer-brand-tagline {
          font-family: var(--mono);
          font-size: 10px;
          color: #999;
          letter-spacing: 2px;
          line-height: 1.9;
          margin-bottom: 24px;
        }

        .footer-socials { display: flex; gap: 10px; flex-wrap: wrap; }
        .footer-social-btn {
          width: 38px; height: 38px;
          border: 1px solid #3a3a3a;
          display: flex; align-items: center; justify-content: center;
          color: #999;
          transition: all 0.2s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .footer-social-btn:hover {
          border-color: #e63329;
          color: #e63329;
          box-shadow: 0 0 12px rgba(230,51,41,0.25);
        }

        .footer-col-label {
          font-family: var(--mono);
          font-size: 10px;
          color: #e63329;
          letter-spacing: 4px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .footer-col-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(230,51,41,0.3), transparent);
        }

        .footer-nav-link {
          display: block;
          font-family: var(--mono);
          font-size: 12px;
          color: #999;
          letter-spacing: 2px;
          text-decoration: none;
          margin-bottom: 14px;
          transition: color 0.2s, letter-spacing 0.2s;
        }
        .footer-nav-link:hover { color: #e63329; letter-spacing: 3px; }

        /* Status box */
        .footer-status-box {
          border: 1px solid rgba(230,51,41,0.15);
          background: rgba(230,51,41,0.03);
          padding: 20px;
          position: relative;
        }
        .footer-status-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e63329, transparent);
          opacity: 0.4;
        }
        .footer-status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #00d2d2;
          box-shadow: 0 0 8px #00d2d2;
          display: inline-block;
          margin-right: 8px;
          animation: fpulse 2s infinite;
        }
        @keyframes fpulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .footer-status-row {
          font-family: var(--mono);
          font-size: 10px;
          color: #999;
          letter-spacing: 2px;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
        }
        .footer-status-val {
          font-family: var(--mono);
          font-size: 12px;
          color: #e0e0e0;
          letter-spacing: 1px;
          margin-bottom: 14px;
        }
        .footer-status-divider {
          height: 1px;
          background: #151515;
          margin: 12px 0;
        }

        /* Tech tags in status col */
        .footer-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .footer-tech-tag {
          font-family: var(--mono);
          font-size: 9px;
          color: #e63329;
          border: 1px solid rgba(230,51,41,0.2);
          padding: 3px 8px;
          letter-spacing: 0.1em;
        }

        /* Bottom bar */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-copy {
          font-family: var(--mono);
          font-size: 10px;
          color: #888;
          letter-spacing: 2px;
        }
        .footer-made {
          font-family: var(--mono);
          font-size: 10px;
          color: #888;
          letter-spacing: 2px;
        }
        .footer-made span { color: #e63329; }

        /* Version badge */
        .footer-version {
          font-family: var(--mono);
          font-size: 9px;
          color: #222;
          border: 1px solid #1a1a1a;
          padding: 3px 10px;
          letter-spacing: 0.15em;
        }

        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer-cta { padding: 48px 24px; }
          .footer-email-strip { padding: 16px 24px; }
          .footer-inner { padding: 40px 24px 24px; }
        }
        @media (max-width: 600px) {
          .footer-top { grid-template-columns: 1fr; gap: 28px; }
          .footer-cta { padding: 40px 16px; flex-direction: column; align-items: flex-start; }
          .footer-email-strip { padding: 14px 16px; }
          .footer-inner { padding: 32px 16px 20px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `}</style>

      <footer className="footer-root">

        {/* ── Big CTA band ── */}
        <div className="footer-cta">
          <div>
            <div className="footer-cta-heading">
              LET'S<span>_</span>BUILD<br />SOMETHING.
            </div>
            <p className="footer-cta-sub">OPEN TO COLLABS · INTERNSHIPS · PROJECTS</p>
          </div>
          <a href="mailto:masked@maskedhelp.com" className="footer-cta-btn">
            GET IN TOUCH
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* ── Email strip ── */}
        <div className="footer-email-strip">
          <span className="footer-email-label">// CONTACT</span>
          <a href="mailto:masked@maskedhelp.com" className="footer-email-value">
            masked@maskedhelp.com
          </a>
          <div className="footer-email-sep" />
        </div>

        {/* ── 4-col grid ── */}
        <div className="footer-inner">
          <div className="footer-top">

            {/* Col 1 — Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Image src="/logo.webp" alt="MaskedHelp" width={32} height={32} style={{ objectFit: 'contain' }} />
                <div className="footer-brand-name">
                  MASKED<span style={{ color: '#e63329' }}>HELP</span>
                </div>
              </div>
              <p className="footer-brand-tagline">
                WE BUILD WHAT WE<br />WISH EXISTED.<br />
                AMITY UNIVERSITY · 2026
              </p>
              <div className="footer-socials">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="footer-social-btn" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2 — Navigate */}
            <div>
              <div className="footer-col-label">// NAVIGATE</div>
              {FOOTER_LINKS.map(l => (
                <Link key={l.href} href={l.href} className="footer-nav-link">{l.label}</Link>
              ))}
            </div>

            {/* Col 3 — Connect */}
            <div>
              <div className="footer-col-label">// CONNECT</div>
              <a href="https://github.com/Maskedhelp2" target="_blank" rel="noopener noreferrer" className="footer-nav-link">GITHUB ↗</a>
              <a href="https://linkedin.com/in/karthik-kumar-7319b6332" target="_blank" rel="noopener noreferrer" className="footer-nav-link">LINKEDIN ↗</a>
              <a href="mailto:masked@maskedhelp.com" className="footer-nav-link">EMAIL ↗</a>
              <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" className="footer-nav-link">IEEE ↗</a>
              <div style={{ marginTop: '20px' }}>
                <div className="footer-col-label">// BASED IN</div>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#aaa', letterSpacing: '0.1em', lineHeight: 1.7 }}>
                  AMITY UNIVERSITY<br />NOIDA, INDIA
                </p>
              </div>
            </div>

            {/* Col 4 — Status */}
            <div>
              <div className="footer-col-label">// STATUS</div>
              <div className="footer-status-box">
                <div className="footer-status-row">
                  <span className="footer-status-dot" />
                  SYSTEMS ONLINE
                </div>
                <div className="footer-status-divider" />
                <div className="footer-status-row">AVAILABILITY</div>
                <div className="footer-status-val">OPEN TO WORK</div>
                <div className="footer-status-row">OPEN TO</div>
                <div className="footer-status-val">COLLABS · INTERNSHIPS</div>
                <div className="footer-status-divider" />
                <div className="footer-status-row" style={{ marginBottom: '8px' }}>STACK</div>
                <div className="footer-tech-tags">
                  {['NEXT.JS','REACT','PYTHON','ROS2','RASPBERRY PI','AI'].map(t => (
                    <span key={t} className="footer-tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <span className="footer-copy">{SITE_FOOTER}</span>
            <span className="footer-version">v2.0 · 2026</span>
            <span className="footer-made">BUILT WITH <span>♥</span> AND CHAOS</span>
          </div>
        </div>

      </footer>
    </>
  )
}