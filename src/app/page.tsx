'use client'

import { useEffect, useRef, useState } from 'react'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
import { projects } from '@/data/projects'

const SKILL_GROUPS = [
  { cat: 'FRONTEND',  color: '#e63329', skills: ['NEXT.JS', 'REACT', 'TYPESCRIPT', 'TAILWIND', 'HTML/CSS'] },
  { cat: 'BACKEND',   color: '#e63329', skills: ['NODE.JS', 'FASTAPI', 'REST APIs', 'POSTGRESQL', 'MONGODB'] },
  { cat: 'AI & ML',   color: '#e63329', skills: ['PYTHON', 'PYTORCH', 'OPENCV', 'YOLO', 'NLP'] },
  { cat: 'ROBOTICS',  color: '#e63329', skills: ['ROS2', 'SLAM', 'LIDAR', 'PCL', 'ARDUINO'] },
  { cat: 'EMBEDDED',  color: '#e63329', skills: ['RASPBERRY PI', 'RP2040', 'QMK', 'C/C++', 'RUST'] },
  { cat: 'DEVOPS',    color: '#e63329', skills: ['DOCKER', 'GIT', 'LINUX', 'AWS', 'TAURI'] },
]

const STATS = [
  { num: '3+',  label: 'YEARS BUILDING', sub: 'Since 2022' },
  { num: '4',   label: 'INTERNSHIPS',    sub: 'Real-world exp' },
  { num: '20+', label: 'TECHNOLOGIES',   sub: 'Across the stack' },
  { num: '∞',   label: 'IDEAS LEFT',     sub: 'Never running out' },
]

const QUICK_LINKS = [
  { label: 'EXPERIENCE',  href: '/experience', desc: '4 internships', num: '04' },
  { label: 'SKILLS',      href: '/skills',      desc: 'Full tech stack', num: '20+' },
  { label: '3D PRINTING', href: '/print',       desc: 'Order a print in ₹', num: '∞' },
  { label: 'FRIENDS',     href: '/friends',     desc: 'The crew', num: '05' },
]

function useCounter(target: number, trigger: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger || target === 0) return
    let start = 0
    const step = (ts: number) => {
      if (!start) start = ts
      const prog = Math.min((ts - start) / 1600, 1)
      setVal(Math.round(prog * prog * target))
      if (prog < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [trigger, target])
  return val
}

export default function HomePage() {
  const statsRef  = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const cvRef     = useRef<HTMLDivElement>(null)
  const aboutRef  = useRef<HTMLDivElement>(null)
  const qlRef     = useRef<HTMLDivElement>(null)
  const [statsVis,  setStatsVis]  = useState(false)
  const [cvVis,     setCvVis]     = useState(false)
  const [aboutVis,  setAboutVis]  = useState(false)
  const [qlVis,     setQlVis]     = useState(false)

  useEffect(() => {
    const pairs: [React.RefObject<HTMLDivElement | null>, (v: boolean) => void][] = [
      [statsRef, setStatsVis],
      [cvRef, setCvVis],
      [aboutRef, setAboutVis],
      [qlRef, setQlVis],
    ]
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        const pair = pairs.find(([r]) => r.current === e.target)
        if (pair && e.isIntersecting) pair[1](true)
      }),
      { threshold: 0.15 }
    )
    pairs.forEach(([r]) => { if (r.current) obs.observe(r.current) })

    // Skill cols stagger
    const skillCols = skillsRef.current?.querySelectorAll('[data-col]')
    const colObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('vis') })
    }, { threshold: 0.1 })
    skillCols?.forEach(c => colObs.observe(c))

    return () => { obs.disconnect(); colObs.disconnect() }
  }, [])

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════
           SKILL GRID — BIG, LOUD, READABLE
        ══════════════════════════════════════════ */
        .sg-wrap {
          background: #050505;
          border-top: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
          padding: 0;
        }
        .sg-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
        }
        [data-col] {
          padding: 40px 28px 44px;
          border-right: 1px solid #111;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.55s ease, transform 0.55s ease, background 0.25s;
          position: relative;
          overflow: hidden;
        }
        [data-col]:last-child { border-right: none; }
        [data-col].vis { opacity: 1; transform: translateY(0); }
        [data-col]::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: #e63329;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        [data-col]:hover { background: #0a0a0a; }
        [data-col]:hover::before { transform: scaleX(1); }

        .sg-cat {
          font-family: var(--display);
          font-size: 0.65rem;
          font-weight: 700;
          color: #e63329;
          letter-spacing: 0.18em;
          margin-bottom: 24px;
          padding-bottom: 14px;
          border-bottom: 1px solid #1e1e1e;
        }
        .sg-skill {
          display: block;
          font-family: var(--mono);
          font-size: 12px;
          color: #777;
          letter-spacing: 0.06em;
          padding: 6px 0;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, padding-left 0.2s;
        }
        [data-col]:hover .sg-skill { color: #ccc; }
        .sg-skill:hover { color: #fff !important; padding-left: 6px; }

        /* ══════════════════════════════════════════
           STATS — MASSIVE NUMBERS
        ══════════════════════════════════════════ */
        .st-wrap {
          background: #050505;
          border-bottom: 1px solid #1a1a1a;
          overflow: hidden;
          position: relative;
        }
        .st-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #e63329, transparent);
          opacity: 0.4;
        }
        .st-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .st-item {
          padding: 52px 40px;
          border-right: 1px solid #111;
          position: relative;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease, background 0.25s;
          text-align: center;
        }
        .st-item:last-child { border-right: none; }
        .st-item.vis { opacity: 1; transform: translateY(0); }
        .st-item:hover { background: #080808; }
        .st-item::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: #e63329;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .st-item:hover::after { transform: scaleX(1); }
        .st-num {
          font-family: var(--display);
          font-size: clamp(3rem, 5vw, 5rem);
          font-weight: 900;
          color: #e63329;
          line-height: 1;
          margin-bottom: 10px;
          letter-spacing: -0.02em;
          display: block;
        }
        .st-label {
          font-family: var(--mono);
          font-size: 11px;
          color: #fff;
          letter-spacing: 0.2em;
          display: block;
          margin-bottom: 6px;
        }
        .st-sub {
          font-family: var(--mono);
          font-size: 9px;
          color: #444;
          letter-spacing: 0.15em;
        }

        /* ══════════════════════════════════════════
           CV STRIP — STATEMENT PIECE
        ══════════════════════════════════════════ */
        .cv-wrap {
          background: #e63329;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .cv-wrap.vis { opacity: 1; transform: translateY(0); }
        .cv-wrap::before {
          content: 'CV';
          position: absolute;
          right: -30px; top: 50%;
          transform: translateY(-50%);
          font-family: var(--display);
          font-size: 220px;
          font-weight: 900;
          color: rgba(0,0,0,0.1);
          pointer-events: none;
          line-height: 1;
          letter-spacing: -0.05em;
        }
        .cv-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 52px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          position: relative;
          z-index: 1;
        }
        .cv-label {
          font-family: var(--mono);
          font-size: 10px;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.25em;
          margin-bottom: 10px;
        }
        .cv-title {
          font-family: var(--display);
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.02em;
          line-height: 0.95;
          margin-bottom: 12px;
        }
        .cv-sub {
          font-family: var(--mono);
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.15em;
        }
        .cv-btns { display: flex; gap: 12px; flex-shrink: 0; }
        .cv-btn-dl {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--mono); font-size: 12px; letter-spacing: 0.18em;
          color: #e63329; background: #fff; border: 2px solid #fff;
          padding: 16px 32px; text-decoration: none;
          font-weight: 700;
          transition: all 0.2s; white-space: nowrap;
        }
        .cv-btn-dl:hover { background: #050505; color: #fff; border-color: #fff; }
        .cv-btn-pre {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--mono); font-size: 12px; letter-spacing: 0.15em;
          color: #fff; background: transparent; border: 2px solid rgba(255,255,255,0.4);
          padding: 16px 24px; text-decoration: none;
          transition: all 0.2s; white-space: nowrap;
        }
        .cv-btn-pre:hover { border-color: #fff; background: rgba(0,0,0,0.15); }

        /* ══════════════════════════════════════════
           QUICK LINKS — BIG TILES
        ══════════════════════════════════════════ */
        .ql-wrap {
          background: #050505;
          border-bottom: 1px solid #1a1a1a;
        }
        .ql-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .ql-item {
          display: block;
          padding: 44px 32px;
          border-right: 1px solid #111;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: background 0.25s;
          opacity: 0;
          transform: translateX(-16px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.25s;
        }
        .ql-item:last-child { border-right: none; }
        .ql-item.vis { opacity: 1; transform: translateX(0); }
        .ql-item:hover { background: #0a0a0a; }
        .ql-item::after {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #e63329;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s ease;
        }
        .ql-item:hover::after { transform: scaleY(1); }
        .ql-num {
          font-family: var(--display);
          font-size: 2.5rem;
          font-weight: 900;
          color: #1a1a1a;
          line-height: 1;
          margin-bottom: 14px;
          display: block;
          transition: color 0.25s;
        }
        .ql-item:hover .ql-num { color: #e63329; }
        .ql-label {
          font-family: var(--display);
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
          display: block;
        }
        .ql-desc {
          font-family: var(--mono);
          font-size: 10px;
          color: #555;
          letter-spacing: 0.12em;
          display: block;
          margin-bottom: 20px;
        }
        .ql-arrow {
          font-family: var(--mono);
          font-size: 18px;
          color: #2a2a2a;
          transition: color 0.2s, transform 0.2s;
          display: inline-block;
        }
        .ql-item:hover .ql-arrow { color: #e63329; transform: translateX(4px); }

        /* ══════════════════════════════════════════
           ABOUT — TWO-COL, BIG TEXT
        ══════════════════════════════════════════ */
        .ab-wrap {
          background: #050505;
          border-bottom: 1px solid #1a1a1a;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ab-wrap.vis { opacity: 1; transform: translateY(0); }
        .ab-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .ab-eyebrow {
          font-family: var(--mono);
          font-size: 10px;
          color: #e63329;
          letter-spacing: 0.3em;
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .ab-eyebrow::before { content: ''; width: 24px; height: 1px; background: #e63329; }
        .ab-title {
          font-family: var(--display);
          font-size: clamp(2.2rem, 4.5vw, 4rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 0.92;
          margin-bottom: 28px;
        }
        .ab-title .acc { color: #e63329; }
        .ab-body {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: #aaa;
          line-height: 1.9;
        }
        .ab-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 28px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #fff;
          border: 1px solid #e63329;
          padding: 13px 24px;
          text-decoration: none;
          background: transparent;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .ab-cta:hover { background: rgba(230,51,41,0.1); box-shadow: 0 0 20px rgba(230,51,41,0.2); }

        /* Right facts */
        .ab-facts { display: flex; flex-direction: column; }
        .ab-fact {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 16px;
          padding: 24px 0;
          border-bottom: 1px solid #0d0d0d;
          align-items: start;
        }
        .ab-fact:first-child { border-top: 1px solid #0d0d0d; }
        .ab-fact-num {
          font-family: var(--display);
          font-size: 1.4rem;
          font-weight: 900;
          color: #1c1c1c;
          line-height: 1;
          padding-top: 2px;
          transition: color 0.2s;
        }
        .ab-fact:hover .ab-fact-num { color: #e63329; }
        .ab-fact-title {
          font-family: var(--display);
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.1em;
          margin-bottom: 5px;
        }
        .ab-fact-text {
          font-family: var(--mono);
          font-size: 11px;
          color: #666;
          letter-spacing: 0.05em;
          line-height: 1.6;
        }

        /* ══════════════════════════════════════════
           PROJECTS
        ══════════════════════════════════════════ */
        .pj-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 40px 100px;
        }
        .pj-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
          border-bottom: 1px solid #111;
          padding-bottom: 24px;
        }
        .pj-title {
          font-family: var(--display);
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.02em;
          line-height: 1;
        }
        .pj-title span { color: #e63329; }
        .pj-count {
          font-family: var(--mono);
          font-size: 10px;
          color: #333;
          letter-spacing: 0.2em;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 900px) {
          .sg-inner { grid-template-columns: repeat(3, 1fr); }
          [data-col]:nth-child(3) { border-right: none; }
          .st-inner { grid-template-columns: repeat(2, 1fr); }
          .st-item:nth-child(2) { border-right: none; }
          .ql-inner { grid-template-columns: repeat(2, 1fr); }
          .ql-item:nth-child(2) { border-right: none; }
          .ab-inner { grid-template-columns: 1fr; gap: 48px; padding: 48px 16px; }
          .cv-inner { flex-direction: column; align-items: flex-start; padding: 40px 16px; }
          .pj-wrap { padding: 48px 16px 80px; }
          .sg-inner { padding: 0; }
        }
        @media (max-width: 600px) {
          .sg-inner { grid-template-columns: repeat(2, 1fr); }
          .st-inner { grid-template-columns: repeat(2, 1fr); }
          .ql-inner { grid-template-columns: 1fr; }
          .ql-item { border-right: none; }
          .cv-btns { flex-direction: column; }
        }
      `}</style>

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />

        {/* ══ SKILL GRID ══ */}
        <div className="sg-wrap" ref={skillsRef}>
          <div className="sg-inner">
            {SKILL_GROUPS.map((grp, i) => (
              <div key={grp.cat} data-col style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="sg-cat">{grp.cat}</div>
                {grp.skills.map(s => (
                  <span key={s} className="sg-skill">{s}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══ STATS ══ */}
        <div className="st-wrap" ref={statsRef}>
          <div className="st-inner">
            {STATS.map(({ num, label, sub }, i) => {
              const n = parseInt(num.replace(/\D/g, '')) || 0
              const suffix = num.replace(/\d/g, '')
              const counted = useCounter(n, statsVis)
              return (
                <div
                  key={label}
                  className={`st-item${statsVis ? ' vis' : ''}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <span className="st-num">
                    {n > 0 ? `${counted}${suffix}` : num}
                  </span>
                  <span className="st-label">{label}</span>
                  <span className="st-sub">{sub}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ══ CV DOWNLOAD ══ */}
        <div className={`cv-wrap${cvVis ? ' vis' : ''}`} ref={cvRef}>
          <div className="cv-inner">
            <div>
              <div className="cv-label">// CURRICULUM VITAE · 2026</div>
              <div className="cv-title">DOWNLOAD<br />MY CV</div>
              <div className="cv-sub">FULL STACK · EMBEDDED · AI · ROBOTICS · PDF · 1 PAGE</div>
            </div>
            <div className="cv-btns">
              <a href="/resumes/karthik-kumar-cv.pdf" download="Karthik-Kumar-CV.pdf" className="cv-btn-dl">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                DOWNLOAD PDF
              </a>
              <a href="/resumes/karthik-kumar-cv.pdf" target="_blank" rel="noopener noreferrer" className="cv-btn-pre">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                PREVIEW
              </a>
            </div>
          </div>
        </div>

        {/* ══ QUICK LINKS ══ */}
        <div className="ql-wrap" ref={qlRef}>
          <div className="ql-inner">
            {QUICK_LINKS.map(({ label, href, desc, num }, i) => (
              <Link
                key={label} href={href}
                className={`ql-item${qlVis ? ' vis' : ''}`}
                style={{ transitionDelay: `${i * 0.09}s` }}
              >
                <span className="ql-num">{num}</span>
                <span className="ql-label">{label}</span>
                <span className="ql-desc">{desc}</span>
                <span className="ql-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ══ ABOUT ══ */}
        <div className={`ab-wrap${aboutVis ? ' vis' : ''}`} ref={aboutRef}>
          <div className="ab-inner">
            <div>
              <div className="ab-eyebrow">// WHO I AM</div>
              <h2 className="ab-title">
                BUILDER<span className="acc">_</span><br />
                BY<br />
                DEFAULT
              </h2>
              <p className="ab-body">
                B.Tech AI student at Amity University, Noida.
                I build across the full stack — from React frontends
                and Node backends to ROS2 robots, embedded firmware,
                and AI pipelines. I also run a 3D printing service.
                <br /><br />
                If I can think it, I'll find a way to build it.
              </p>
              <Link href="/experience" className="ab-cta">
                VIEW FULL EXPERIENCE →
              </Link>
            </div>
            <div className="ab-facts">
              {[
                { n: '01', title: 'UNIVERSITY',   text: 'Amity University, Noida · B.Tech AI · 2024–2028' },
                { n: '02', title: 'INTERNSHIPS',  text: 'Karvy InnoTech · IndCasting · Ameya Sonic · Amity Research' },
                { n: '03', title: 'IEEE',         text: 'Student Council Member · Amity University Chapter' },
                { n: '04', title: '3D PRINTING',  text: 'Custom prints in ₹ · WhatsApp or email to order' },
                { n: '05', title: 'CONTACT',      text: 'karthik31012007@gmail.com · +91 95999 74690' },
              ].map(({ n, title, text }) => (
                <div key={n} className="ab-fact">
                  <div className="ab-fact-num">{n}</div>
                  <div>
                    <div className="ab-fact-title">{title}</div>
                    <div className="ab-fact-text">{text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ PROJECTS ══ */}
        <section className="pj-wrap">
          <div className="pj-head">
            <div className="pj-title">FEATURED<span>_</span><br />PROJECTS</div>
            <div className="pj-count">{projects.length} TOTAL</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </section>

      </main>
    </>
  )
}