'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

// ── DATA ─────────────────────────────────────────────────────────
const SPECS = [
  { label: 'ROLE',        value: 'FULL STACK / AI / ROBOTICS' },
  { label: 'BASE',        value: 'NOIDA, INDIA' },
  { label: 'EDUCATION',   value: 'B.TECH AI · 2024–2028' },
  { label: 'EXPERIENCE',  value: '4 INTERNSHIPS' },
  { label: 'STACK SIZE',  value: '20+ TECHNOLOGIES' },
  { label: 'STATUS',      value: 'OPEN TO WORK' },
]

const FEATURES = [
  {
    n: '01',
    tag: 'FULL STACK',
    title: 'BUILT FOR\nTHE WEB',
    body: 'Next.js, React, TypeScript on the front. Node, FastAPI, PostgreSQL underneath. Every project ships end-to-end — designed, built, and deployed solo.',
    stats: [{ v: '5+', l: 'FRAMEWORKS' }, { v: '3', l: 'YEARS CODING' }],
    href: '/skills',
    cta: 'VIEW SKILLS',
  },
  {
    n: '02',
    tag: 'ROBOTICS & EMBEDDED',
    title: 'ENGINEERED\nFOR HARDWARE',
    body: 'ROS2 navigation, SLAM mapping, LiDAR fusion, custom RP2040 firmware. From autonomous robots to programmable macro pads — hardware is where ideas get physical.',
    stats: [{ v: 'ROS2', l: 'NAVIGATION' }, { v: 'RP2040', l: 'FIRMWARE' }],
    href: '/skills',
    cta: 'VIEW SKILLS',
  },
  {
    n: '03',
    tag: 'ARTIFICIAL INTELLIGENCE',
    title: 'TRAINED\nFOR VISION',
    body: 'YOLO-based object detection, computer vision pipelines, inverse kinematics. Built ARIA — an AI robot that sees, classifies, and sorts waste in real time.',
    stats: [{ v: '>90%', l: 'MODEL ACCURACY' }, { v: 'PYTORCH', l: 'FRAMEWORK' }],
    href: '/experience',
    cta: 'VIEW EXPERIENCE',
  },
]

const GALLERY_STOPS = [
  { n: '4',   l: 'INTERNSHIPS' },
  { n: '3',   l: 'MAJOR PROJECTS' },
  { n: '20+', l: 'TECHNOLOGIES' },
  { n: '₹',   l: '3D PRINT SERVICE' },
]

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, vis] as const
}

export default function HomePage() {
  const [heroRef]              = useReveal<HTMLDivElement>()
  const [specRef, specVis]     = useReveal<HTMLDivElement>()
  const [f1Ref, f1Vis]         = useReveal<HTMLDivElement>()
  const [f2Ref, f2Vis]         = useReveal<HTMLDivElement>()
  const [f3Ref, f3Vis]         = useReveal<HTMLDivElement>()
  const [galRef, galVis]       = useReveal<HTMLDivElement>()
  const [pjRef, pjVis]         = useReveal<HTMLDivElement>()
  const [ctaRef, ctaVis]       = useReveal<HTMLDivElement>()
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 150); return () => clearTimeout(t) }, [])

  const featureRefs = [
    { ref: f1Ref, vis: f1Vis },
    { ref: f2Ref, vis: f2Vis },
    { ref: f3Ref, vis: f3Vis },
  ]

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .hp { background: #0a0a0a; overflow-x: hidden; }

        /* ═══════════════════════════════════════════════
           1. HERO — full viewport, product reveal
        ═══════════════════════════════════════════════ */
        .h-hero {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding: 140px 64px 80px;
          border-bottom: 1px solid #161616;
        }
        .h-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent);
          pointer-events: none;
        }
        .h-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .h-hero.on .h-brand { opacity: 1; transform: translateY(0); }
        .h-brand-mark {
          font-family: var(--display);
          font-size: 15px;
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.12em;
        }
        .h-brand-mark span { color: #e63329; }
        .h-brand-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #e63329, transparent);
          max-width: 200px;
        }

        .h-eyebrow {
          font-family: var(--mono);
          font-size: 13px;
          color: #e63329;
          letter-spacing: 0.28em;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 14px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
        }
        .h-hero.on .h-eyebrow { opacity: 1; transform: translateY(0); }
        .h-eyebrow::before { content: ''; width: 32px; height: 1px; background: #e63329; }

        .h-name {
          font-family: var(--display);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.04em;
          line-height: 0.88;
          font-size: clamp(3rem, 10vw, 10rem);
          margin: 0;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(.16,1,.3,1) 0.1s,
                      transform 0.9s cubic-bezier(.16,1,.3,1) 0.1s;
        }
        .h-hero.on .h-name { opacity: 1; transform: translateY(0); }
        .h-name .word { display: block; }
        .h-name .r { color: #e63329; }

        .h-tagline {
          font-family: var(--mono);
          font-size: 16px;
          color: #999;
          letter-spacing: 0.05em;
          margin-top: 32px;
          max-width: 480px;
          line-height: 1.8;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s;
        }
        .h-hero.on .h-tagline { opacity: 1; transform: translateY(0); }
        .h-tagline b { color: #ddd; font-weight: 600; }

        .h-scroll-cue {
          position: absolute;
          bottom: 40px; left: 64px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--mono);
          font-size: 11px;
          color: #666;
          letter-spacing: 0.18em;
          opacity: 0;
          transition: opacity 0.7s ease 0.7s;
        }
        .h-hero.on .h-scroll-cue { opacity: 1; }
        .h-scroll-line {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, #e63329, transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }

        /* ═══════════════════════════════════════════════
           2. SPEC SHEET — horizontal strip
        ═══════════════════════════════════════════════ */
        .h-specs {
          border-bottom: 1px solid #161616;
          background: #0c0c0c;
        }
        .h-specs-inner {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
        }
        .h-spec {
          padding: 32px 24px;
          border-right: 1px solid #161616;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease, background 0.2s;
        }
        .h-spec:last-child { border-right: none; }
        .h-spec.vis { opacity: 1; transform: translateY(0); }
        .h-spec:hover { background: #111; }
        .h-spec-l {
          font-family: var(--mono);
          font-size: 11px;
          color: #e63329;
          letter-spacing: 0.18em;
          margin-bottom: 10px;
          display: block;
        }
        .h-spec-v {
          font-family: var(--display);
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
          display: block;
          line-height: 1.4;
        }

        /* ═══════════════════════════════════════════════
           3. FEATURE SPOTLIGHTS — alternating panels
        ═══════════════════════════════════════════════ */
        .h-feature {
          border-bottom: 1px solid #161616;
          background: #0a0a0a;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 82vh;
        }
        .h-feature.rev { direction: rtl; }
        .h-feature.rev > * { direction: ltr; }

        .h-feat-visual {
          border-right: 1px solid #161616;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background:
            radial-gradient(circle at 30% 30%, rgba(230,51,41,0.05), transparent 60%);
        }
        .h-feature.rev .h-feat-visual { border-right: none; border-left: 1px solid #161616; }
        .h-feat-num {
          font-family: var(--display);
          font-size: clamp(11rem, 22vw, 20rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 2.5px #2a2a2a;
          line-height: 1;
          letter-spacing: -0.05em;
          user-select: none;
          transition: -webkit-text-stroke 0.4s ease, filter 0.4s ease, color 0.4s ease;
          filter: drop-shadow(0 0 0 rgba(230,51,41,0));
        }
        .h-feature:hover .h-feat-num {
          -webkit-text-stroke: 2.5px #e63329;
          color: rgba(230,51,41,0.12);
          filter: drop-shadow(0 0 60px rgba(230,51,41,0.5));
        }
        .h-feat-visual::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(230,51,41,0.08), transparent 65%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .h-feature:hover .h-feat-visual::after { opacity: 1; }

        .h-feat-content {
          padding: 72px 64px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1);
        }
        .h-feature.vis .h-feat-content { opacity: 1; transform: translateY(0); }

        .h-feat-tag {
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 700;
          color: #e63329;
          letter-spacing: 0.22em;
          margin-bottom: 20px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          width: fit-content;
        }
        .h-feat-tag::before {
          content: '';
          width: 8px; height: 8px;
          background: #e63329;
          box-shadow: 0 0 12px rgba(230,51,41,0.8);
        }
        .h-feat-title {
          font-family: var(--display);
          font-size: clamp(2.3rem, 4.5vw, 4rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 0.98;
          white-space: pre-line;
          margin-bottom: 28px;
          text-shadow: 0 0 40px rgba(255,255,255,0.06);
        }
        .h-feat-body {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: #aaa;
          line-height: 1.85;
          max-width: 440px;
          margin-bottom: 32px;
        }
        .h-feat-stats {
          display: flex;
          gap: 40px;
          margin-bottom: 32px;
        }
        .h-feat-stat-v {
          font-family: var(--display);
          font-size: 2.1rem;
          font-weight: 900;
          color: #e63329;
          line-height: 1;
          display: block;
          margin-bottom: 8px;
          text-shadow: 0 0 24px rgba(230,51,41,0.35);
        }
        .h-feat-stat-l {
          font-family: var(--mono);
          font-size: 11px;
          color: #00d4ff;
          letter-spacing: 0.12em;
        }
        .h-feat-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--mono);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #fff;
          text-decoration: none;
          border: 1.5px solid #333;
          padding: 14px 24px;
          width: fit-content;
          transition: all 0.25s ease;
        }
        .h-feat-link:hover {
          border-color: #e63329;
          background: #e63329;
          color: #fff;
          gap: 16px;
          box-shadow: 0 0 30px rgba(230,51,41,0.4);
        }

        /* ═══════════════════════════════════════════════
           4. GALLERY / CONFIGURATOR STRIP
        ═══════════════════════════════════════════════ */
        .h-gallery {
          background: #0c0c0c;
          border-bottom: 1px solid #161616;
        }
        .h-gal-inner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .h-gal-item {
          padding: 56px 40px;
          border-right: 1px solid #161616;
          text-align: center;
          opacity: 0;
          transform: scale(0.94);
          transition: opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1), background 0.2s;
        }
        .h-gal-item:last-child { border-right: none; }
        .h-gal-item.vis { opacity: 1; transform: scale(1); }
        .h-gal-item:hover { background: #111; }
        .h-gal-n {
          font-family: var(--display);
          font-size: clamp(2.5rem, 4.5vw, 4rem);
          font-weight: 900;
          color: #e63329;
          line-height: 1;
          margin-bottom: 12px;
        }
        .h-gal-l {
          font-family: var(--mono);
          font-size: 12px;
          color: #999;
          letter-spacing: 0.14em;
        }

        /* ═══════════════════════════════════════════════
           5. PROJECTS — filmstrip cards
        ═══════════════════════════════════════════════ */
        .h-projects {
          background: #0a0a0a;
          border-bottom: 1px solid #161616;
          padding: 96px 64px;
        }
        .h-pj-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .h-pj-head.vis { opacity: 1; transform: translateY(0); }
        .h-pj-eyebrow {
          font-family: var(--mono);
          font-size: 12px;
          color: #e63329;
          letter-spacing: 0.24em;
          margin-bottom: 14px;
          display: block;
        }
        .h-pj-title {
          font-family: var(--display);
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .h-pj-title .r { color: #e63329; }
        .h-pj-count {
          font-family: var(--mono);
          font-size: 11px;
          color: #00d4ff;
          letter-spacing: 0.12em;
          text-align: right;
        }

        /* ═══════════════════════════════════════════════
           6. CTA — test drive equivalent
        ═══════════════════════════════════════════════ */
        .h-cta {
          background: #0a0a0a;
          padding: 100px 64px;
          text-align: center;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .h-cta.vis { opacity: 1; transform: translateY(0); }
        .h-cta-eyebrow {
          font-family: var(--mono);
          font-size: 13px;
          color: #e63329;
          letter-spacing: 0.24em;
          margin-bottom: 24px;
        }
        .h-cta-title {
          font-family: var(--display);
          font-size: clamp(2.2rem, 6vw, 5rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 0.95;
          margin-bottom: 40px;
        }
        .h-cta-title .r { color: #e63329; }
        .h-cta-btns {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .h-btn-primary {
          display: inline-flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 13px; letter-spacing: 0.15em;
          color: #fff; background: #e63329; border: 2px solid #e63329;
          padding: 18px 36px; text-decoration: none; font-weight: 700;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .h-btn-primary:hover { background: #c42820; box-shadow: 0 0 32px rgba(230,51,41,0.4); }
        .h-btn-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--mono); font-size: 13px; letter-spacing: 0.12em;
          color: #00d4ff; background: transparent; border: 1px solid rgba(0,212,255,0.3);
          padding: 18px 30px; text-decoration: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .h-btn-ghost:hover { border-color: #00d4ff; box-shadow: 0 0 20px rgba(0,212,255,0.15); }

        /* ═══════════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .h-specs-inner { grid-template-columns: repeat(3, 1fr); }
          .h-spec:nth-child(3n) { border-right: none; }
          .h-feature { grid-template-columns: 1fr; min-height: auto; }
          .h-feat-visual { min-height: 240px; border-right: none !important; border-left: none !important; border-bottom: 1px solid #161616; }
          .h-gal-inner { grid-template-columns: repeat(2, 1fr); }
          .h-gal-item:nth-child(2n) { border-right: none; }
        }
        @media (max-width: 768px) {
          .h-hero, .h-feat-content, .h-projects, .h-cta { padding-left: 24px; padding-right: 24px; }
          .h-specs-inner { grid-template-columns: repeat(2, 1fr); }
          .h-spec:nth-child(2n) { border-right: none; }
          .h-spec:nth-child(3n) { border-right: 1px solid #161616; }
          .h-gal-inner { grid-template-columns: 1fr; }
          .h-gal-item { border-right: none; border-bottom: 1px solid #161616; }
          .h-gal-item:last-child { border-bottom: none; }
          .h-pj-head { flex-direction: column; align-items: flex-start; gap: 16px; }
          .h-scroll-cue { display: none; }
          .h-feat-stats { gap: 24px; }
        }
      `}</style>

      <div className="hp">

        {/* ══ 1. HERO ══ */}
        <div className={`h-hero${heroVisible ? ' on' : ''}`} ref={heroRef}>
          <div className="h-brand">
            <span className="h-brand-mark">MASKED<span>HELP</span></span>
            <span className="h-brand-line" />
          </div>
          <div className="h-eyebrow">FULL STACK · AI · ROBOTICS // 2026 MODEL</div>
          <h1 className="h-name">
            <span className="word">MASKED</span>
            <span className="word">HELP<span className="r">_</span></span>
          </h1>
          <p className="h-tagline">
            <b>Full stack developer</b> engineered for <b>the web, hardware, and AI</b>.
            B.Tech AI student at Amity University — builds robots, firmware,
            and products end-to-end.
          </p>
          <div className="h-scroll-cue">
            <span className="h-scroll-line" />
            SCROLL TO EXPLORE
          </div>
        </div>

        {/* ══ 2. SPEC SHEET ══ */}
        <div className="h-specs" ref={specRef}>
          <div className="h-specs-inner">
            {SPECS.map((s, i) => (
              <div key={s.label} className={`h-spec${specVis ? ' vis' : ''}`} style={{ transitionDelay: `${i * 0.06}s` }}>
                <span className="h-spec-l">{s.label}</span>
                <span className="h-spec-v">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 3. FEATURE SPOTLIGHTS ══ */}
        {FEATURES.map((f, i) => {
          const { ref, vis } = featureRefs[i]
          return (
            <div
              key={f.n}
              className={`h-feature${i % 2 === 1 ? ' rev' : ''}${vis ? ' vis' : ''}`}
              ref={ref}
            >
              <div className="h-feat-visual">
                <span className="h-feat-num">{f.n}</span>
              </div>
              <div className="h-feat-content">
                <span className="h-feat-tag">// {f.tag}</span>
                <h2 className="h-feat-title">{f.title}</h2>
                <p className="h-feat-body">{f.body}</p>
                <div className="h-feat-stats">
                  {f.stats.map(s => (
                    <div key={s.l}>
                      <span className="h-feat-stat-v">{s.v}</span>
                      <span className="h-feat-stat-l">{s.l}</span>
                    </div>
                  ))}
                </div>
                <Link href={f.href} className="h-feat-link">
                  {f.cta} →
                </Link>
              </div>
            </div>
          )
        })}

        {/* ══ 4. GALLERY STRIP ══ */}
        <div className="h-gallery" ref={galRef}>
          <div className="h-gal-inner">
            {GALLERY_STOPS.map((g, i) => (
              <div key={g.l} className={`h-gal-item${galVis ? ' vis' : ''}`} style={{ transitionDelay: `${i * 0.09}s` }}>
                <div className="h-gal-n">{g.n}</div>
                <div className="h-gal-l">{g.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ 5. PROJECTS ══ */}
        <div className="h-projects" ref={pjRef}>
          <div className={`h-pj-head${pjVis ? ' vis' : ''}`}>
            <div>
              <span className="h-pj-eyebrow">// THE LINEUP</span>
              <h2 className="h-pj-title">FEATURED<span className="r">_</span>PROJECTS</h2>
            </div>
            <div className="h-pj-count">{projects.length} PROJECTS<br />IN PORTFOLIO</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>

        {/* ══ 6. CTA ══ */}
        <div className={`h-cta${ctaVis ? ' vis' : ''}`} ref={ctaRef}>
          <div className="h-cta-eyebrow">// LET'S BUILD TOGETHER</div>
          <h2 className="h-cta-title">
            READY TO<span className="r">_</span>DRIVE?
          </h2>
          <div className="h-cta-btns">
            <a href="/resumes/karthik-kumar-cv.pdf" download="MaskedHelp-CV.pdf" className="h-btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              DOWNLOAD CV
            </a>
            <Link href="/experience" className="h-btn-ghost">VIEW EXPERIENCE →</Link>
          </div>
        </div>

      </div>
    </>
  )
}