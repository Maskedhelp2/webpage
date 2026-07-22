'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useEffect, useRef, useState } from 'react'

const BOOT_LINES = [
  { text: '> MASKEDHELP_OS v2.0 — BOOTING...', delay: 0 },
  { text: '> CHECKING ROUTES...', delay: 300 },
  { text: '> ERROR 404 — ROUTE NOT MAPPED', color: '#e63329', delay: 600 },
  { text: '> TYPE "help" FOR AVAILABLE COMMANDS', color: '#ffb400', delay: 900 },
]

const COMMANDS: Record<string, () => string | string[]> = {
  help: () => [
    '  AVAILABLE COMMANDS:',
    '  ─────────────────────────────────────',
    '  home          → go to homepage',
    '  projects      → view all projects',
    '  skills        → skill matrix',
    '  experience    → work history',
    '  team          → meet the team',
    '  resume        → download CV',
    '  whoami        → who is maskedhelp',
    '  clear         → clear terminal',
    '  ls            → list all pages',
    '  ping          → check if site is alive',
    '  hack          → ...',
    '  sudo          → try it',
    '  exit          → close terminal (joke)',
  ],
  home:       () => { window.location.href = '/';          return '> REDIRECTING TO HOME...' },
  projects:   () => { window.location.href = '/projects';  return '> REDIRECTING TO PROJECTS...' },
  skills:     () => { window.location.href = '/skills';    return '> REDIRECTING TO SKILLS...' },
  experience: () => { window.location.href = '/experience';return '> REDIRECTING TO EXPERIENCE...' },
  team:       () => { window.location.href = '/team';      return '> REDIRECTING TO TEAM...' },
  resume:     () => { window.location.href = '/resume';    return '> REDIRECTING TO RESUME...' },
  ls: () => [
    '  drwxr  /home',
    '  drwxr  /projects',
    '  drwxr  /skills',
    '  drwxr  /experience',
    '  drwxr  /team',
    '  drwxr  /resume',
    '  drwxr  /friends',
    '  -rw-r  /privacy',
    '  -rw-r  /terms',
    '  ??     /404  ← you are here',
  ],
  whoami: () => [
    '  KARTHIK KUMAR // MASKEDHELP',
    '  ─────────────────────────────────────',
    '  ROLE      : FULL STACK DEV · AI · ROBOTICS',
    '  LOCATION  : AMITY UNIVERSITY, INDIA',
    '  STACK     : RUST · REACT · ROS2 · QMK',
    '  STATUS    : BUILDING THINGS THAT SHOULDNT EXIST',
    '  GITHUB    : github.com/Maskedhelp2',
  ],
  ping: () => [
    '  PINGING MASKEDHELP.COM...',
    '  64 bytes from maskedhelp.com: icmp_seq=1 ttl=64 time=0.4ms',
    '  64 bytes from maskedhelp.com: icmp_seq=2 ttl=64 time=0.3ms',
    '  64 bytes from maskedhelp.com: icmp_seq=3 ttl=64 time=0.3ms',
    '  ─────────────────────────────────────',
    '  SITE IS ALIVE. YOU ARE JUST LOST.',
  ],
  hack: () => [
    '  INITIATING HACK SEQUENCE...',
    '  [████████████████████░░░░] 80%',
    '  ...',
    '  ACCESS DENIED.',
    '  (nice try)',
  ],
  sudo: () => [
    '  sudo: you are not in the sudoers file.',
    '  This incident will be reported.',
    '  (it wont)',
  ],
  exit: () => [
    '  this is a webpage.',
    '  you cannot exit.',
    '  close the tab if you must.',
  ],
  clear: () => '__CLEAR__',
}

type Line = { text: string; color?: string; isInput?: boolean }

export default function NotFound() {
  const [lines, setLines]     = useState<Line[]>([])
  const [input, setInput]     = useState('')
  const [ready, setReady]     = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef  = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    BOOT_LINES.forEach(({ text, color, delay }) => {
      timers.push(setTimeout(() => {
        setLines(prev => [...prev, { text, color }])
        if (delay === 900) setTimeout(() => setReady(true), 300)
      }, delay))
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  function focusInput() { inputRef.current?.focus() }

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setHistory(prev => [cmd, ...prev].slice(0, 20))
    setHistIdx(-1)
    setLines(prev => [...prev, { text: '$ ' + raw, color: '#00d2d2', isInput: true }])
    if (cmd === 'clear') { setLines([]); return }
    const handler = COMMANDS[cmd]
    if (!handler) {
      setLines(prev => [...prev,
        { text: '  command not found: ' + cmd, color: '#e63329' },
        { text: '  type "help" for available commands', color: '#444' },
      ])
      return
    }
    const result = handler()
    if (result === '__CLEAR__') { setLines([]); return }
    if (typeof result === 'string') {
      setLines(prev => [...prev, { text: result }])
    } else {
      setLines(prev => [...prev, ...result.map(t => ({ text: t }))])
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      runCommand(input); setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      setHistIdx(next); setInput(history[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(histIdx - 1, -1)
      setHistIdx(next); setInput(next === -1 ? '' : history[next] ?? '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = Object.keys(COMMANDS).find(k => k.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  return (
    <>
      <style>{`
        .nf-wrap {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          position: relative; z-index: 1; padding: 100px 24px 60px;
        }
        /* 404 above terminal */
        .nf-code {
          font-family: var(--display);
          font-size: clamp(5rem, 22vw, 14rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 2px rgba(230,51,41,0.35);
          line-height: 0.85;
          letter-spacing: -6px;
          user-select: none;
          pointer-events: none;
          position: relative; z-index: 1;
          margin-bottom: 28px;
          animation: nfGlitch 4s infinite;
          text-shadow:
            0 0 80px rgba(230,51,41,0.08),
            0 0 160px rgba(230,51,41,0.04);
        }
        @keyframes nfGlitch {
          0%,88%,100%{ transform:none; }
          90%{ transform:translate(-4px,0); -webkit-text-stroke-color:rgba(230,51,41,0.6); }
          92%{ transform:translate(4px,0);  -webkit-text-stroke-color:rgba(230,51,41,0.2); }
          94%{ transform:none; }
        }
        .nf-terminal {
          width: min(680px, 92vw); position: relative; z-index: 1;
          border: 1px solid rgba(230,51,41,0.25);
          background: rgba(2,2,2,0.97);
          backdrop-filter: blur(8px);
          box-shadow: 0 0 60px rgba(230,51,41,0.05);
        }
        .nf-terminal::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(230,51,41,0.5),transparent);
        }
        .nf-title-bar {
          display:flex; align-items:center; gap:8px;
          padding:12px 16px; border-bottom:1px solid #0d0d0d;
          background:rgba(255,255,255,0.015);
        }
        .nf-dot { width:10px; height:10px; border-radius:50%; }
        .nf-title-text {
          font-family:var(--mono); font-size:11px;
          color:var(--text-dim); letter-spacing:3px; margin-left:8px;
        }
        .nf-output {
          padding:20px 20px 8px; max-height:320px; overflow-y:auto;
          scrollbar-width:thin; scrollbar-color:rgba(230,51,41,0.3) transparent;
        }
        .nf-output::-webkit-scrollbar{width:3px;}
        .nf-output::-webkit-scrollbar-thumb{background:rgba(230,51,41,0.3);}
        .nf-out-line {
          font-family:var(--mono); font-size:clamp(10px,2vw,12px);
          line-height:1.9; letter-spacing:0.5px; white-space:pre-wrap; word-break:break-all;
        }
        .nf-input-row {
          display:flex; align-items:center; gap:8px;
          padding:12px 20px 14px; border-top:1px solid #0d0d0d;
        }
        .nf-prompt { font-family:var(--mono); font-size:13px; color:var(--accent); flex-shrink:0; }
        .nf-input {
          flex:1; background:none; border:none; outline:none;
          font-family:var(--mono); font-size:13px;
          color:#fff; caret-color:var(--accent); letter-spacing:1px;
        }
        .nf-input::placeholder{color:#2a2a2a;}
        .nf-hint {
          font-family:var(--mono); font-size:10px; color:#222;
          letter-spacing:2px; text-align:center; padding:0 20px 14px;
        }
        .nf-nav { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-top:24px; position:relative; z-index:1; }
        .nf-nav-btn {
          font-family:var(--mono); font-size:10px; letter-spacing:2px;
          padding:10px 20px; border:1px solid #1a1a1a; color:var(--text-dim);
          text-decoration:none; transition:all 0.2s;
        }
        .nf-nav-btn:hover{color:var(--accent);border-color:var(--accent);}
        @media(max-width:480px){
          .nf-output{max-height:220px;}
          .nf-nav{gap:8px;}
          .nf-nav-btn{font-size:9px;padding:8px 12px;}
        }
      `}</style>

      <Header />

      <main className="nf-wrap" onClick={focusInput}>
        <div className="nf-code">404</div>
        <div className="nf-terminal">
          <div className="nf-title-bar">
            <div className="nf-dot" style={{ background: '#e63329' }} />
            <div className="nf-dot" style={{ background: '#ffb400' }} />
            <div className="nf-dot" style={{ background: '#00d2d2' }} />
            <span className="nf-title-text">MASKEDHELP_OS — 404.sh</span>
          </div>

          <div className="nf-output">
            {lines.map((line, i) => (
              <div key={i} className="nf-out-line"
                style={{ color: line.color ?? (line.isInput ? '#00d2d2' : '#555') }}>
                {line.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {ready && (
            <div className="nf-input-row">
              <span className="nf-prompt">$</span>
              <input
                ref={inputRef}
                className="nf-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command..."
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          )}

          <div className="nf-hint">TAB autocomplete · ↑↓ history · "help" to start</div>
        </div>

        <div className="nf-nav">
          <Link href="/"           className="nf-nav-btn">HOME</Link>
          <Link href="/projects"   className="nf-nav-btn">PROJECTS</Link>
          <Link href="/skills"     className="nf-nav-btn">SKILLS</Link>
          <Link href="/experience" className="nf-nav-btn">EXPERIENCE</Link>
        </div>
      </main>

    </>
  )
}