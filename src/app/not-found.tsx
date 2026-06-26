'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useEffect, useRef } from 'react'

export default function NotFound() {
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Glitch number effect
    const chars = '01'
    let frame = 0
    const interval = setInterval(() => {
      if (countRef.current) {
        if (frame < 20) {
          countRef.current.textContent = Array.from({ length: 3 }, () =>
            chars[Math.floor(Math.random() * chars.length)]
          ).join('')
        } else {
          countRef.current.textContent = '404'
          clearInterval(interval)
        }
        frame++
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        .nf-main {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          padding: 40px 24px;
          text-align: center;
        }

        .nf-code {
          font-family: var(--display);
          font-size: clamp(6rem, 20vw, 14rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 2px rgba(230,51,41,0.4);
          line-height: 1;
          position: relative;
          letter-spacing: -4px;
          user-select: none;
        }
        .nf-code::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0; right: 0;
          color: transparent;
          -webkit-text-stroke: 2px #e63329;
          clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
          animation: nfGlitch 3s infinite;
          transform: translateX(-3px);
        }
        @keyframes nfGlitch {
          0%, 90%, 100% { transform: translateX(0); opacity: 1; }
          92% { transform: translateX(-4px); opacity: 0.8; }
          94% { transform: translateX(4px); opacity: 0.9; }
          96% { transform: translateX(-2px); opacity: 1; }
        }

        .nf-label {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--accent);
          letter-spacing: 6px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .nf-label::before,
        .nf-label::after {
          content: '';
          width: 40px; height: 1px;
          background: var(--accent);
          opacity: 0.4;
        }

        .nf-title {
          font-family: var(--display);
          font-size: clamp(1rem, 3vw, 1.5rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: 3px;
          margin-bottom: 16px;
        }

        .nf-desc {
          font-family: var(--mono);
          font-size: 12px;
          color: var(--text-dim);
          letter-spacing: 2px;
          line-height: 1.8;
          max-width: 380px;
          margin: 0 auto 40px;
        }

        .nf-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .nf-btn-primary {
          font-family: var(--mono); font-size: 11px;
          color: var(--accent); letter-spacing: 2px;
          border: 1px solid rgba(230,51,41,0.4);
          background: rgba(230,51,41,0.06);
          padding: 12px 28px;
          text-decoration: none;
          transition: all 0.2s;
          display: inline-block;
        }
        .nf-btn-primary:hover {
          background: rgba(230,51,41,0.14);
          box-shadow: 0 0 20px rgba(230,51,41,0.25);
        }

        .nf-btn-ghost {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 2px;
          border: 1px solid #2a2a2a;
          padding: 12px 28px;
          text-decoration: none;
          transition: all 0.2s;
          display: inline-block;
        }
        .nf-btn-ghost:hover { color: var(--accent); border-color: var(--accent); }

        .nf-terminal {
          margin: 40px auto 0;
          max-width: 420px;
          border: 1px solid #1a1a1a;
          background: rgba(0,0,0,0.4);
          padding: 20px 24px;
          text-align: left;
          position: relative;
        }
        .nf-terminal::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(230,51,41,0.4), transparent);
        }
        .nf-terminal-bar {
          display: flex; gap: 6px; margin-bottom: 16px;
        }
        .nf-dot {
          width: 8px; height: 8px; border-radius: 50%;
        }
        .nf-line {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 1px;
          line-height: 2;
        }
        .nf-line .cmd { color: #e63329; }
        .nf-line .ok  { color: #00d2d2; }
        .nf-line .err { color: #e63329; }
        .nf-cursor {
          display: inline-block;
          width: 7px; height: 13px;
          background: var(--accent);
          animation: blink 1s step-end infinite;
          vertical-align: middle;
          margin-left: 2px;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        @media (max-width: 768px) {
          .nf-links { flex-direction: column; align-items: center; }
          .nf-btn-primary, .nf-btn-ghost { width: 220px; text-align: center; }
        }
      `}</style>

      <Header />

      <main className="nf-main">
        <div className="nf-label">// ERROR</div>

        <div className="nf-code" data-text="404">
          <span ref={countRef}>404</span>
        </div>

        <h1 className="nf-title">PAGE NOT FOUND</h1>

        <p className="nf-desc">
          The route you requested doesn't exist or has been moved.
          Check the URL or navigate back to safety.
        </p>

        <div className="nf-links">
          <Link href="/" className="nf-btn-primary">← GO HOME</Link>
          <Link href="/projects" className="nf-btn-ghost">PROJECTS</Link>
          <Link href="/skills" className="nf-btn-ghost">SKILLS</Link>
        </div>

        {/* Terminal easter egg */}
        <div className="nf-terminal">
          <div className="nf-terminal-bar">
            <div className="nf-dot" style={{ background: '#e63329' }} />
            <div className="nf-dot" style={{ background: '#ffb400' }} />
            <div className="nf-dot" style={{ background: '#00d2d2' }} />
          </div>
          <div className="nf-line"><span className="cmd">$</span> curl maskedhelp.com{typeof window !== 'undefined' ? window.location.pathname : '/???'}</div>
          <div className="nf-line"><span className="err">ERROR</span> 404 — route not mapped</div>
          <div className="nf-line"><span className="ok">TIP</span> try /projects or /skills</div>
          <div className="nf-line"><span className="cmd">$</span> <span className="nf-cursor" /></div>
        </div>
      </main>

      <Footer />
    </>
  )
}