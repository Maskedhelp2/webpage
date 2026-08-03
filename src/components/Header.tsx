'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useCallback } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890#%&/'

function useScramble(text: string) {
  const [display, setDisplay] = useState(text)
  const frame = useRef<number>(0)
  const iter = useRef(0)
  const scramble = useCallback(() => {
    cancelAnimationFrame(frame.current)
    iter.current = 0
    const tick = () => {
      setDisplay(text.split('').map((ch, i) => {
        if (ch === ' ') return ' '
        if (i < iter.current) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join(''))
      iter.current += 0.45
      if (iter.current < text.length) frame.current = requestAnimationFrame(tick)
      else setDisplay(text)
    }
    frame.current = requestAnimationFrame(tick)
  }, [text])
  useEffect(() => () => cancelAnimationFrame(frame.current), [])
  return { display, scramble }
}

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

const panelVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
}

const linkVariants: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', x: -20 },
  visible: {
    clipPath: 'inset(0 0 0% 0)', x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.2 } },
}

function OverlayLink({ link, index, active, onClose }: any) {
  const { display, scramble } = useScramble(link.label)
  return (
    <motion.div variants={linkVariants}>
      <Dialog.Close asChild>
        <Link
          href={link.href}
          onMouseEnter={scramble}
          className={`nav-overlay-link ${active ? 'active' : ''}`}
        >
          <span className="nav-overlay-link-num">
            {String(index + 1).padStart(2, '0')}
            <span className="nol-bracket">//</span>
          </span>
          <span className="nav-overlay-link-text" data-text={link.label}>{display}</span>
          <span className="nav-overlay-link-arrow">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </Link>
      </Dialog.Close>
    </motion.div>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <style>{`
        @keyframes scanSweep {
          0%   { transform: translateY(-100%); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(2000%); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes flicker {
          0%, 92%, 100% { opacity: 1; }
          93%, 95% { opacity: 0.4; }
          94% { opacity: 0.8; }
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes rotateBracket {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ═══════════ HEADER BAR ═══════════ */
        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(8,8,8,0.88);
          border-bottom: 1px solid #1a1a1a;
          backdrop-filter: blur(16px);
          transition: height 0.35s cubic-bezier(.16,1,.3,1), padding 0.35s cubic-bezier(.16,1,.3,1);
        }
        .nav-root.large { height: 92px; padding: 0 56px; }
        .nav-root.small { height: 60px; padding: 0 40px; background: rgba(6,6,6,0.97); }
        .nav-root::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #e63329 20%, #e63329 80%, transparent);
          box-shadow: 0 0 8px rgba(230,51,41,0.6);
        }

        .nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; z-index: 2; }
        .nav-logo-img {
          object-fit: contain; transition: width 0.35s ease, height 0.35s ease;
          filter: drop-shadow(0 0 12px rgba(230,51,41,0.5));
        }
        .nav-root.large .nav-logo-img { width: 42px; height: 42px; }
        .nav-root.small .nav-logo-img { width: 30px; height: 30px; }
        .nav-logo-text {
          font-family: var(--display); font-weight: 900; color: #fff; letter-spacing: 0.15em;
          transition: font-size 0.35s ease; animation: flicker 6s infinite;
        }
        .nav-root.large .nav-logo-text { font-size: 18px; }
        .nav-root.small .nav-logo-text { font-size: 14px; }
        .nav-logo-text span { color: #e63329; text-shadow: 0 0 12px rgba(230,51,41,0.6); }

        .nav-links-desktop { display: flex; align-items: center; gap: 4px; }
        .nav-link {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em; text-decoration: none;
          padding: 10px 18px; position: relative; color: #666; transition: color 0.25s ease;
        }
        .nav-link::before {
          content: ''; position: absolute; left: 50%; bottom: 4px; width: 0; height: 2px;
          background: #e63329; box-shadow: 0 0 10px rgba(230,51,41,0.8);
          transition: width 0.25s cubic-bezier(.16,1,.3,1), left 0.25s cubic-bezier(.16,1,.3,1);
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::before { width: calc(100% - 36px); left: 18px; }
        .nav-link.active { color: #e63329; }
        .nav-link.active::before { width: calc(100% - 36px); left: 18px; }

        .nav-right { display: flex; align-items: center; gap: 20px; z-index: 2; }
        .nav-cta {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em; color: #fff;
          background: #e63329; border: 1px solid #e63329; padding: 10px 20px; text-decoration: none;
          transition: background 0.2s, box-shadow 0.2s; white-space: nowrap; position: relative; overflow: hidden;
        }
        .nav-cta::before {
          content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          transition: left 0.5s ease;
        }
        .nav-cta:hover::before { left: 150%; }
        .nav-cta:hover { background: #c42820; box-shadow: 0 0 24px rgba(230,51,41,0.5); }

        /* ═══════════ HAMBURGER ═══════════ */
        .nav-burger {
          display: none; flex-direction: column; justify-content: center; gap: 5px;
          width: 40px; height: 40px; background: none; border: 1px solid #222; cursor: pointer;
          position: relative; transition: border-color 0.25s ease;
        }
        .nav-burger:hover { border-color: #e63329; }
        .nav-burger span {
          display: block; width: 18px; height: 2px; margin: 0 auto; background: #fff;
          transition: transform 0.35s cubic-bezier(.16,1,.3,1), opacity 0.25s ease, background 0.25s ease;
          transform-origin: center;
        }
        .nav-burger[data-state="open"] { border-color: #e63329; box-shadow: 0 0 16px rgba(230,51,41,0.3); }
        .nav-burger[data-state="open"] span:nth-child(1) { transform: translateY(7px) rotate(45deg); background: #e63329; }
        .nav-burger[data-state="open"] span:nth-child(2) { opacity: 0; }
        .nav-burger[data-state="open"] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); background: #e63329; }

        /* ═══════════ MOBILE OVERLAY — MAXIMALIST ═══════════ */
        .nav-overlay {
          position: fixed; inset: 0; z-index: 199;
          background: #050505;
          display: flex; flex-direction: column; justify-content: center;
          padding: 110px 32px 40px;
          overflow: hidden;
        }
        /* Blueprint grid */
        .nav-overlay::before {
          content: ''; position: absolute; inset: 0;
          background:
            linear-gradient(rgba(230,51,41,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230,51,41,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }
        /* Scanning beam */
        .nav-scan {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, transparent, #e63329, transparent);
          box-shadow: 0 0 30px 4px rgba(230,51,41,0.7);
          animation: scanSweep 3.5s ease-in-out infinite;
          pointer-events: none;
        }
        /* Giant watermark */
        .nav-watermark {
          position: absolute; right: -4vw; bottom: -8vh;
          font-family: var(--display); font-weight: 900;
          font-size: 42vw; line-height: 1; letter-spacing: -0.06em;
          color: transparent; -webkit-text-stroke: 1px rgba(230,51,41,0.08);
          pointer-events: none; user-select: none; white-space: nowrap;
        }
        /* Corner HUD brackets */
        .nav-corner {
          position: absolute; width: 28px; height: 28px;
          border-color: rgba(230,51,41,0.5); pointer-events: none;
        }
        .nav-corner.tl { top: 20px; left: 20px; border-top: 2px solid; border-left: 2px solid; }
        .nav-corner.tr { top: 20px; right: 76px; border-top: 2px solid; border-right: 2px solid; }
        .nav-corner.bl { bottom: 20px; left: 20px; border-bottom: 2px solid; border-left: 2px solid; }
        .nav-corner.br { bottom: 20px; right: 20px; border-bottom: 2px solid; border-right: 2px solid; }

        /* Rotating deco ring near close button */
        .nav-deco-ring {
          position: absolute; top: 16px; right: 68px;
          width: 46px; height: 46px;
          border: 1px dashed rgba(230,51,41,0.3);
          border-radius: 50%;
          animation: rotateBracket 12s linear infinite;
          pointer-events: none;
        }

        /* Marquee ticker at top of overlay */
        .nav-ticker {
          position: relative; z-index: 1;
          overflow: hidden;
          border-top: 1px solid rgba(230,51,41,0.25);
          border-bottom: 1px solid rgba(230,51,41,0.25);
          margin-bottom: 40px;
          padding: 8px 0;
        }
        .nav-ticker-inner {
          display: flex; width: max-content;
          animation: marqueeScroll 14s linear infinite;
        }
        .nav-ticker-item {
          font-family: var(--mono); font-size: 10px; color: #e63329;
          letter-spacing: 0.3em; white-space: nowrap; padding-right: 3rem;
          text-shadow: 0 0 8px rgba(230,51,41,0.5);
        }

        .nav-overlay-links { display: flex; flex-direction: column; position: relative; z-index: 1; }
        .nav-overlay-link {
          display: flex; align-items: center; gap: 24px;
          padding: 22px 0; border-bottom: 1px solid #161616;
          text-decoration: none; position: relative;
          transition: padding-left 0.3s cubic-bezier(.16,1,.3,1), background 0.3s;
        }
        .nav-overlay-link:hover { padding-left: 16px; background: rgba(230,51,41,0.03); }
        .nav-overlay-link::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: #e63329; box-shadow: 0 0 12px rgba(230,51,41,0.8);
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.3s cubic-bezier(.16,1,.3,1);
        }
        .nav-overlay-link:hover::before, .nav-overlay-link.active::before { transform: scaleY(1); }

        .nav-overlay-link-num {
          font-family: var(--mono); font-size: 12px; color: #333; letter-spacing: 0.1em;
          display: flex; align-items: center; gap: 6px; min-width: 50px;
          transition: color 0.25s ease;
        }
        .nol-bracket { color: #1e1e1e; transition: color 0.25s ease; }
        .nav-overlay-link:hover .nav-overlay-link-num,
        .nav-overlay-link.active .nav-overlay-link-num { color: #e63329; }
        .nav-overlay-link:hover .nol-bracket,
        .nav-overlay-link.active .nol-bracket { color: #e63329; }

        .nav-overlay-link-text {
          font-family: var(--mono); font-size: clamp(1.8rem, 9vw, 2.8rem);
          font-weight: 700; color: #555; letter-spacing: 0.02em;
          transition: color 0.25s ease, text-shadow 0.25s ease;
          flex: 1;
        }
        .nav-overlay-link.active .nav-overlay-link-text,
        .nav-overlay-link:hover .nav-overlay-link-text {
          color: #fff; text-shadow: 0 0 24px rgba(230,51,41,0.35);
        }

        .nav-overlay-link-arrow {
          color: #1a1a1a; opacity: 0; transform: translateX(-12px) rotate(-45deg);
          transition: opacity 0.25s ease, transform 0.3s cubic-bezier(.16,1,.3,1), color 0.25s ease;
        }
        .nav-overlay-link:hover .nav-overlay-link-arrow {
          opacity: 1; transform: translateX(0) rotate(0deg); color: #e63329;
        }

        .nav-overlay-footer {
          position: relative; z-index: 1; margin-top: 40px; padding-top: 20px;
          border-top: 1px solid #161616; display: flex; justify-content: space-between; align-items: center;
        }
        .nav-overlay-tag {
          font-family: var(--mono); font-size: 10px; color: #333; letter-spacing: 0.2em;
          display: flex; align-items: center; gap: 8px;
        }
        .nav-overlay-tag .dot { width: 6px; height: 6px; background: #e63329; border-radius: 50%; animation: pulseGlow 2s infinite; box-shadow: 0 0 8px #e63329; }
        .nav-overlay-cta {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.15em; color: #fff;
          background: #e63329; padding: 13px 24px; text-decoration: none;
          box-shadow: 0 0 20px rgba(230,51,41,0.3); transition: box-shadow 0.25s ease;
        }
        .nav-overlay-cta:hover { box-shadow: 0 0 32px rgba(230,51,41,0.55); }

        .nav-overlay-close {
          position: absolute; top: 22px; right: 22px; width: 44px; height: 44px;
          border: 1px solid #262626; background: rgba(230,51,41,0.05);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 3; color: #888;
          transition: border-color 0.2s, color 0.2s, transform 0.3s cubic-bezier(.16,1,.3,1), box-shadow 0.2s;
        }
        .nav-overlay-close:hover {
          border-color: #e63329; color: #e63329; transform: rotate(90deg);
          box-shadow: 0 0 20px rgba(230,51,41,0.4);
        }

        @media (max-width: 900px) {
          .nav-links-desktop { display: none; }
          .nav-cta { display: none; }
          .nav-burger { display: flex; }
          .nav-root.large, .nav-root.small { height: 64px; padding: 0 20px; }
          .nav-root.large .nav-logo-img, .nav-root.small .nav-logo-img { width: 30px; height: 30px; }
          .nav-root.large .nav-logo-text, .nav-root.small .nav-logo-text { font-size: 14px; }
        }
        @media (max-width: 480px) {
          .nav-overlay { padding: 100px 20px 32px; }
          .nav-overlay-link-text { font-size: 1.6rem; }
        }
      `}</style>

      <nav className={`nav-root ${scrolled ? 'small' : 'large'}`}>
        <Link href="/" className="nav-logo">
          <Image
            src="/logo.webp" alt="MaskedHelp"
            width={42} height={42}
            className="nav-logo-img"
            style={{ objectFit: 'contain' }}
            loading="eager" priority
          />
          <span className="nav-logo-text">MASKED<span>HELP</span></span>
        </Link>

        <div className="nav-links-desktop">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className={`nav-link ${pathname.startsWith(link.href) ? 'active' : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <a href="/resumes/karthik-kumar-cv.pdf" download className="nav-cta">DOWNLOAD CV</a>

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <button className="nav-burger" data-state={menuOpen ? 'open' : 'closed'} aria-label="Toggle menu">
                <span /><span /><span />
              </button>
            </Dialog.Trigger>

            <AnimatePresence>
              {menuOpen && (
                <Dialog.Portal forceMount>
                  <Dialog.Overlay asChild forceMount>
                    <motion.div
                      variants={overlayVariants} initial="hidden" animate="visible" exit="exit"
                      style={{ position: 'fixed', inset: 0, zIndex: 198, background: 'rgba(0,0,0,0.6)' }}
                    />
                  </Dialog.Overlay>

                  <Dialog.Content asChild forceMount aria-describedby={undefined}>
                    <motion.div
                      className="nav-overlay"
                      variants={panelVariants} initial="hidden" animate="visible" exit="exit"
                    >
                      <Dialog.Title style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                        Navigation menu
                      </Dialog.Title>

                      <div className="nav-scan" />
                      <div className="nav-watermark">MH</div>
                      <div className="nav-corner tl" />
                      <div className="nav-corner tr" />
                      <div className="nav-corner bl" />
                      <div className="nav-corner br" />
                      <div className="nav-deco-ring" />

                      <Dialog.Close asChild>
                        <button className="nav-overlay-close" aria-label="Close menu">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </Dialog.Close>

                      <div className="nav-ticker">
                        <div className="nav-ticker-inner">
                          {[...Array(4)].flatMap(() =>
                            ['FULL STACK', 'AI', 'ROBOTICS', '3D PRINTING', 'MASKEDHELP', '2026'].map((t, i) => (
                              <span key={Math.random()} className="nav-ticker-item">{t} //</span>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="nav-overlay-links">
                        {NAV_LINKS.map((link, i) => (
                          <OverlayLink
                            key={link.href}
                            link={link}
                            index={i}
                            active={pathname.startsWith(link.href)}
                          />
                        ))}
                      </div>

                      <motion.div className="nav-overlay-footer" variants={linkVariants}>
                        <span className="nav-overlay-tag">
                          <span className="dot" />
                          MASKEDHELP · SYSTEMS ONLINE
                        </span>
                        <a href="/resumes/karthik-kumar-cv.pdf" download className="nav-overlay-cta">
                          DOWNLOAD CV
                        </a>
                      </motion.div>
                    </motion.div>
                  </Dialog.Content>
                </Dialog.Portal>
              )}
            </AnimatePresence>
          </Dialog.Root>
        </div>
      </nav>
    </>
  )
}