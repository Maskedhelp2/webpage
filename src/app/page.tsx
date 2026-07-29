'use client'

import { useEffect, useRef, useState } from 'react'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
import { projects } from '@/data/projects'

// ── DATA ─────────────────────────────────────────────────────────
const SKILL_GROUPS = [
  { cat: 'FRONTEND',  skills: ['NEXT.JS', 'REACT', 'TYPESCRIPT', 'TAILWIND', 'HTML/CSS'] },
  { cat: 'BACKEND',   skills: ['NODE.JS', 'FASTAPI', 'REST APIs', 'POSTGRESQL', 'MONGODB'] },
  { cat: 'AI & ML',   skills: ['PYTHON', 'PYTORCH', 'OPENCV', 'YOLO', 'NLP'] },
  { cat: 'ROBOTICS',  skills: ['ROS2', 'SLAM', 'LIDAR', 'PCL', 'ARDUINO'] },
  { cat: 'EMBEDDED',  skills: ['RASPBERRY PI', 'RP2040', 'QMK', 'C/C++', 'RUST'] },
  { cat: 'DEVOPS',    skills: ['DOCKER', 'GIT', 'LINUX', 'AWS', 'TAURI'] },
]

function useReveal<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, vis]
}

function useCounter(target: number, trigger: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger || target === 0) return
    let start = 0
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 2000, 1)
      setVal(Math.round(p ** 2 * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [trigger, target])
  return val
}

// ── PAGE ─────────────────────────────────────────────────────────
export default function HomePage() {
  const [sgRef,   sgVis]   = useReveal<HTMLDivElement>()
  const [stRef,   stVis]   = useReveal<HTMLDivElement>()
  const [cvRef,   cvVis]   = useReveal<HTMLDivElement>()
  const [abRef,   abVis]   = useReveal<HTMLDivElement>()
  const [qlRef,   qlVis]   = useReveal<HTMLDivElement>()
  const [pjRef,   pjVis]   = useReveal<HTMLDivElement>()

  const c3  = useCounter(3,  stVis)
  const c4  = useCounter(4,  stVis)
  const c20 = useCounter(20, stVis)

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════════════════════
           FERRARI-INSPIRED TOKENS — cyber variant
           Canvas: #0c0c0c (warmer than pure black)
           Red: #e63329 (your brand, replaces Rosso Corsa)
           Rule: red appears ONCE per visual frame
        ═══════════════════════════════════════════════════ */

        /* ── SECTION UTILITY ── */
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(.16,1,.3,1),
                      transform 0.9s cubic-bezier(.16,1,.3,1);
        }
        .reveal.vis { opacity: 1; transform: translateY(0); }

        /* ══════════════════════════════════════════
           1. IDENTITY SLAB — full-bleed, cinematic
        ══════════════════════════════════════════ */
        .id-slab {
          background: #0c0c0c;
          border-bottom: 1px solid #e63329;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 52vh;
        }
        .id-left {
          padding: 72px 64px;
          border-right: 1px solid #161616;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .id-headline {
          font-family: var(--display);
          font-size: clamp(2.5rem, 5.5vw, 6.5rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 0.88;
          margin: 0;
          word-break: keep-all;
          overflow-wrap: normal;
        }
        .id-headline .r { color: #e63329; }
        .id-foot {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        .id-label {
          font-family: var(--mono);
          font-size: 9px;
          color: #00d4ff;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .id-label span { color: #fff; }
        .id-right {
          display: grid;
          grid-template-rows: 1fr 1fr;
        }
        .id-stat {
          padding: 40px 52px;
          border-bottom: 1px solid #111;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .id-stat:last-child { border-bottom: none; }
        .id-stat:hover { background: #111; }
        .id-stat::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: #e63329;
          transform: scaleY(0);
          transition: transform 0.35s cubic-bezier(.16,1,.3,1);
        }
        .id-stat:hover::before { transform: scaleY(1); }
        .id-stat-n {
          font-family: var(--display);
          font-size: clamp(4rem, 8vw, 8rem);
          font-weight: 900;
          color: #e63329;
          line-height: 0.88;
          letter-spacing: -0.04em;
          display: block;
          margin-bottom: 10px;
        }
        .id-stat-l {
          font-family: var(--mono);
          font-size: 10px;
          color: #fff;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          display: block;
        }
        .id-stat-s {
          font-family: var(--mono);
          font-size: 9px;
          color: #00d4ff;
          letter-spacing: 0.15em;
          margin-top: 4px;
          display: block;
        }

        /* ══════════════════════════════════════════
           2. DISCIPLINE LINE — single red rule
        ══════════════════════════════════════════ */
        .rule-line {
          background: #0c0c0c;
          padding: 28px 64px;
          border-bottom: 1px solid #111;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .rule-txt {
          font-family: var(--mono);
          font-size: 9px;
          color: #00d4ff;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }
        .rule-dot { width: 6px; height: 6px; background: #e63329; border-radius: 50%; }

        /* ══════════════════════════════════════════
           3. SKILL GRID — editorial pacing
        ══════════════════════════════════════════ */
        .sg-slab {
          background: #0c0c0c;
          border-bottom: 1px solid #111;
        }
        .sg-header {
          padding: 52px 64px 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 0;
        }
        .sg-overline {
          font-family: var(--mono);
          font-size: 9px;
          color: #e63329;
          letter-spacing: 0.3em;
        }
        .sg-title {
          font-family: var(--display);
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
          margin: 12px 0 0;
        }
        .sg-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          border-top: 1px solid #111;
          margin-top: 40px;
        }
        .sg-col {
          padding: 40px 28px 48px;
          border-right: 1px solid #111;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(.16,1,.3,1),
                      transform 0.6s cubic-bezier(.16,1,.3,1),
                      background 0.25s;
        }
        .sg-col:last-child { border-right: none; }
        .sg-col.vis { opacity: 1; transform: translateY(0); }
        .sg-col:hover { background: #111; }
        .sg-cat {
          font-family: var(--mono);
          font-size: 8px;
          color: #e63329;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid #1a1a1a;
          display: block;
        }
        .sg-skill {
          display: block;
          font-family: var(--mono);
          font-size: 11px;
          color: #888;
          letter-spacing: 0.08em;
          padding: 7px 0;
          border-bottom: 1px solid #0f0f0f;
          transition: color 0.2s, padding-left 0.25s;
          cursor: default;
        }
        .sg-col:hover .sg-skill { color: #00d4ff; }
        .sg-skill:hover { color: #fff !important; padding-left: 8px; text-shadow: 0 0 12px rgba(0,212,255,0.4); }

        /* ══════════════════════════════════════════
           4. CV SLAB — full bleed, inverted
        ══════════════════════════════════════════ */
        .cv-slab {
          background: #0c0c0c;
          border-top: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
          position: relative;
          overflow: hidden;
        }
        .cv-slab::after {
          content: attr(data-text);
          position: absolute;
          right: -40px;
          top: 50%;
          transform: translateY(-50%);
          font-family: var(--display);
          font-size: clamp(160px, 22vw, 280px);
          font-weight: 900;
          color: rgba(230,51,41,0.06);
          letter-spacing: -0.06em;
          pointer-events: none;
          line-height: 1;
          white-space: nowrap;
        }
        .cv-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 64px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .cv-overline {
          font-family: var(--mono);
          font-size: 9px;
          color: #e63329;
          letter-spacing: 0.3em;
          margin-bottom: 16px;
          display: block;
        }
        .cv-headline {
          font-family: var(--display);
          font-size: clamp(3rem, 6vw, 6rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 0.88;
          margin-bottom: 20px;
        }
        .cv-sub {
          font-family: var(--mono);
          font-size: 9px;
          color: #00d4ff;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .cv-btns { display: flex; flex-direction: column; gap: 12px; align-items: flex-end; }
        .cv-btn-dl {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.2em;
          color: #fff; background: #e63329; border: 2px solid #e63329;
          padding: 18px 36px; text-decoration: none; font-weight: 700;
          white-space: nowrap;
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .cv-btn-dl:hover { background: #c42820; box-shadow: 0 0 32px rgba(230,51,41,0.4); }
        .cv-btn-pre {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em;
          color: #00d4ff; background: transparent;
          border: 1px solid rgba(0,212,255,0.3);
          padding: 14px 28px; text-decoration: none;
          white-space: nowrap;
          transition: border-color 0.2s, color 0.2s, box-shadow 0.2s;
        }
        .cv-btn-pre:hover { border-color: #00d4ff; box-shadow: 0 0 20px rgba(0,212,255,0.15); }

        /* ══════════════════════════════════════════
           5. QUICK LINKS — wide tiles, tall
        ══════════════════════════════════════════ */
        .ql-slab {
          background: #0c0c0c;
          border-bottom: 1px solid #111;
        }
        .ql-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1200px;
          margin: 0 auto;
        }
        .ql-tile {
          display: block;
          padding: 56px 40px;
          border-right: 1px solid #111;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s cubic-bezier(.16,1,.3,1),
                      transform 0.6s cubic-bezier(.16,1,.3,1),
                      background 0.25s;
        }
        .ql-tile:last-child { border-right: none; }
        .ql-tile.vis { opacity: 1; transform: translateY(0); }
        .ql-tile:hover { background: #111; }
        .ql-tile::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: #e63329;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(.16,1,.3,1);
        }
        .ql-tile:hover::before { transform: scaleX(1); }
        .ql-big-n {
          font-family: var(--display);
          font-size: clamp(3rem, 5vw, 5.5rem);
          font-weight: 900;
          color: #1c1c1c;
          letter-spacing: -0.04em;
          line-height: 1;
          margin-bottom: 20px;
          display: block;
          transition: color 0.3s;
        }
        .ql-tile:hover .ql-big-n { color: #e63329; }
        .ql-tile-label {
          font-family: var(--display);
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 8px;
        }
        .ql-tile-desc {
          font-family: var(--mono);
          font-size: 9px;
          color: #00d4ff;
          letter-spacing: 0.15em;
          display: block;
          margin-bottom: 28px;
        }
        .ql-tile-arrow {
          font-family: var(--mono);
          font-size: 16px;
          color: #222;
          display: inline-block;
          transition: color 0.2s, transform 0.25s;
        }
        .ql-tile:hover .ql-tile-arrow { color: #e63329; transform: translateX(6px); }

        /* ══════════════════════════════════════════
           6. ABOUT — full bleed, editorial
        ══════════════════════════════════════════ */
        .ab-slab {
          background: #0c0c0c;
          border-bottom: 1px solid #111;
        }
        .ab-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 60vh;
        }
        .ab-left {
          padding: 80px 64px;
          border-right: 1px solid #111;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .ab-overline {
          font-family: var(--mono);
          font-size: 9px;
          color: #e63329;
          letter-spacing: 0.3em;
          margin-bottom: 28px;
          display: flex; align-items: center; gap: 12px;
        }
        .ab-overline::before { content: ''; width: 28px; height: 1px; background: #e63329; flex-shrink: 0; }
        .ab-title {
          font-family: var(--display);
          font-size: clamp(2.2rem, 4.5vw, 5rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 0.92;
          margin-bottom: 40px;
          word-break: keep-all;
          overflow-wrap: normal;
        }
        .ab-title .r { color: #e63329; }
        .ab-body {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          color: #ccc;
          line-height: 1.9;
          max-width: 420px;
          margin-bottom: 40px;
        }
        .ab-cta {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em;
          color: #fff; border: 1px solid #e63329; padding: 14px 28px;
          text-decoration: none; background: transparent;
          transition: background 0.2s, box-shadow 0.2s; width: fit-content;
        }
        .ab-cta:hover { background: rgba(230,51,41,0.1); box-shadow: 0 0 28px rgba(230,51,41,0.15); }

        .ab-right { border-left: 1px solid #0f0f0f; }
        .ab-fact {
          padding: 36px 52px;
          border-bottom: 1px solid #0f0f0f;
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 20px;
          align-items: start;
          transition: background 0.25s;
        }
        .ab-fact:last-child { border-bottom: none; }
        .ab-fact:hover { background: #111; }
        .ab-fact-n {
          font-family: var(--display);
          font-size: 1.8rem;
          font-weight: 900;
          color: #1c1c1c;
          line-height: 1;
          padding-top: 4px;
          transition: color 0.25s;
        }
        .ab-fact:hover .ab-fact-n { color: #e63329; }
        .ab-fact-h {
          font-family: var(--display);
          font-size: 0.75rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }
        .ab-fact-t {
          font-family: var(--mono);
          font-size: 10px;
          color: #00d4ff;
          letter-spacing: 0.06em;
          line-height: 1.7;
        }

        /* ══════════════════════════════════════════
           7. PROJECTS — editorial layout
        ══════════════════════════════════════════ */
        .pj-slab {
          background: #0c0c0c;
        }
        .pj-header {
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 64px 48px;
          border-bottom: 1px solid #111;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }
        .pj-title {
          font-family: var(--display);
          font-size: clamp(2.5rem, 5vw, 5rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 0.88;
        }
        .pj-title .r { color: #e63329; }
        .pj-meta {
          font-family: var(--mono);
          font-size: 9px;
          color: #00d4ff;
          letter-spacing: 0.2em;
          text-align: right;
        }
        .pj-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 64px 96px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        /* ══════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .id-slab     { grid-template-columns: 1fr; min-height: auto; }
          .id-right    { grid-template-rows: auto; grid-template-columns: 1fr 1fr; }
          .id-stat:nth-child(2) { border-bottom: none; border-left: 1px solid #111; }
          .sg-grid     { grid-template-columns: repeat(3, 1fr); }
          .ql-grid     { grid-template-columns: repeat(2, 1fr); }
          .ql-tile:nth-child(2) { border-right: none; }
          .ab-inner    { grid-template-columns: 1fr; }
          .ab-right    { border-left: none; border-top: 1px solid #111; }
          .cv-inner    { grid-template-columns: 1fr; gap: 40px; }
          .cv-btns     { flex-direction: row; align-items: flex-start; }
        }
        @media (max-width: 768px) {
          .id-left, .ab-left, .cv-inner, .pj-header, .pj-body,
          .sg-header, .rule-line { padding-left: 24px; padding-right: 24px; }
          .id-right    { grid-template-columns: 1fr; }
          .id-stat:nth-child(2) { border-left: none; border-bottom: none; }
          .sg-grid     { grid-template-columns: repeat(2, 1fr); }
          .ql-grid     { grid-template-columns: 1fr; }
          .ql-tile     { border-right: none; }
          .ab-fact     { padding: 24px; }
          .cv-btns     { flex-direction: column; width: 100%; }
          .cv-btn-dl, .cv-btn-pre { width: 100%; justify-content: center; }
          .pj-header   { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>

      <main style={{ background: '#0c0c0c', minHeight: '100vh' }}>
        <Hero />

        {/* ══ 1. IDENTITY SLAB ══ */}
        <div className={`id-slab reveal ${stVis ? 'vis' : ''}`} ref={stRef}>
          <div className="id-left">
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 9, color: '#00d4ff', letterSpacing: '0.3em', marginBottom: 24 }}>
                // MASKEDHELP · KARTHIK KUMAR · 2026
              </p>
              <h2 className="id-headline">
                FULL<span className="r">_</span><br />
                STACK<br />
                BUILDER
              </h2>
            </div>
            <div className="id-foot">
              <div className="id-label">AMITY UNIVERSITY · NOIDA<br /><span>B.TECH AI · 2024–2028</span></div>
              <div className="id-label" style={{ textAlign: 'right' }}>IEEE STUDENT<br /><span>MEMBER</span></div>
            </div>
          </div>
          <div className="id-right">
            {[
              { n: stVis ? `${c4}` : '0',   suf: '',  l: 'INTERNSHIPS',  s: 'Real-world experience' },
              { n: stVis ? `${c20}` : '0',  suf: '+', l: 'TECHNOLOGIES', s: 'Across the full stack' },
            ].map(({ n, suf, l, s }) => (
              <div key={l} className="id-stat">
                <span className="id-stat-n">{n}{suf}</span>
                <span className="id-stat-l">{l}</span>
                <span className="id-stat-s">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ RULE LINE ══ */}
        <div className="rule-line">
          {['FULL STACK', 'EMBEDDED SYSTEMS', 'ARTIFICIAL INTELLIGENCE', 'ROBOTICS', '3D PRINTING'].map((t, i) => (
            <span key={t} className="rule-txt" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {i > 0 && <span className="rule-dot" />}
              {t}
            </span>
          ))}
        </div>

        {/* ══ 2. SKILL GRID ══ */}
        <div className="sg-slab" ref={sgRef}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="sg-header">
              <div>
                <span className="sg-overline">// TECHNICAL ARSENAL</span>
                <h2 className="sg-title">SKILL<span style={{ color: '#e63329' }}>_</span>SET</h2>
              </div>
            </div>
            <div className="sg-grid">
              {SKILL_GROUPS.map((grp, i) => (
                <div
                  key={grp.cat}
                  className={`sg-col${sgVis ? ' vis' : ''}`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <span className="sg-cat">{grp.cat}</span>
                  {grp.skills.map(s => (
                    <span key={s} className="sg-skill">{s}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ 3. CV SLAB ══ */}
        <div className={`cv-slab reveal ${cvVis ? 'vis' : ''}`} ref={cvRef} data-text="CV">
          <div className="cv-inner">
            <div>
              <span className="cv-overline">// CURRICULUM VITAE · 2026</span>
              <h2 className="cv-headline">DOWNLOAD<br />MY CV</h2>
              <p className="cv-sub">FULL STACK · EMBEDDED · AI · ROBOTICS · PDF · 1 PAGE</p>
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
                PREVIEW ↗
              </a>
            </div>
          </div>
        </div>

        {/* ══ 4. QUICK LINKS ══ */}
        <div className="ql-slab" ref={qlRef}>
          <div className="ql-grid">
            {[
              { n: '04', label: 'EXPERIENCE',  href: '/experience', desc: 'Internships & research' },
              { n: '∞',  label: 'SKILLS',       href: '/skills',     desc: 'Full technical stack'  },
              { n: '₹',  label: '3D PRINTING',  href: '/print',      desc: 'Order a custom print'  },
              { n: '05', label: 'FRIENDS',       href: '/friends',    desc: 'The crew'              },
            ].map(({ n, label, href, desc }, i) => (
              <Link
                key={label} href={href}
                className={`ql-tile${qlVis ? ' vis' : ''}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="ql-big-n">{n}</span>
                <span className="ql-tile-label">{label}</span>
                <span className="ql-tile-desc">{desc}</span>
                <span className="ql-tile-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ══ 5. ABOUT ══ */}
        <div className="ab-slab" ref={abRef}>
          <div className={`ab-inner reveal ${abVis ? 'vis' : ''}`}>
            <div className="ab-left">
              <div>
                <div className="ab-overline">// WHO I AM</div>
                <h2 className="ab-title">
                  BUILDER<span className="r">_</span><br />
                  BY<br />
                  DEFAULT
                </h2>
                <p className="ab-body">
                  B.Tech AI student at Amity University, Noida.
                  I build across the full stack — React frontends,
                  Node backends, ROS2 robots, embedded firmware,
                  AI pipelines. IEEE student member. 3D printing
                  service on the side.
                  <br /><br />
                  If I can think it, I build it.
                </p>
              </div>
              <Link href="/experience" className="ab-cta">
                VIEW FULL EXPERIENCE →
              </Link>
            </div>
            <div className="ab-right">
              {[
                { n: '01', h: 'UNIVERSITY',   t: 'Amity University, Noida · B.Tech AI · 2024–2028' },
                { n: '02', h: 'INTERNSHIPS',  t: 'Karvy InnoTech · IndCasting · Ameya Sonic · Amity Research' },
                { n: '03', h: 'IEEE',         t: 'Student Council Member · Amity University Chapter' },
                { n: '04', h: '3D PRINTING',  t: 'Custom prints in ₹ · WhatsApp or email to order' },
                { n: '05', h: 'CONTACT',      t: 'karthik31012007@gmail.com · +91 95999 74690' },
              ].map(({ n, h, t }) => (
                <div key={n} className="ab-fact">
                  <div className="ab-fact-n">{n}</div>
                  <div>
                    <div className="ab-fact-h">{h}</div>
                    <div className="ab-fact-t">{t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ 6. PROJECTS ══ */}
        <div className="pj-slab" ref={pjRef}>
          <div className={`reveal ${pjVis ? 'vis' : ''}`}>
            <div className="pj-header">
              <h2 className="pj-title">FEATURED<span className="r">_</span><br />PROJECTS</h2>
              <div className="pj-meta">{projects.length} PROJECTS<br />IN PORTFOLIO</div>
            </div>
            <div className="pj-body">
              {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
            </div>
          </div>
        </div>

      </main>
    </>
  )
}