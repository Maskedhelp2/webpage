'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ── EXPERIENCE DATA ──────────────────────────────────────────────
const EXPERIENCE = [
  {
    type: 'work',
    role: 'RESEARCH INTERN',
    org: 'AMEYA SONIC OPTEO SYSTEMS',
    orgUrl: 'https://ameyasonicopteosystem.com',
    period: '2026 — PRESENT',
    duration: 'ONGOING',
    mode: 'ON-SITE',
    location: 'INDIA',
    tags: ['INTERNSHIP', 'RESEARCH', 'SYSTEMS'],
    description: 'Currently interning at Ameya Sonic Opteo Systems, contributing to research and development in advanced systems engineering. Working on applied technical projects within a specialised engineering environment.',
    accent: '#e63329',
  },
  {
    type: 'work',
    role: 'INTERN',
    org: 'INDCASTING.COM',
    orgUrl: 'https://indcasting.com',
    period: '2025 — 2026',
    duration: 'CONTRACT',
    mode: 'REMOTE',
    location: 'INDIA',
    tags: ['INTERNSHIP', 'CASTING', 'REMOTE'],
    description: 'Completed an internship at IndCasting.com, a platform operating in the casting and manufacturing industry. Gained exposure to industrial workflows and contributed to technical development initiatives.',
    accent: '#e63329',
  },
  {
    type: 'work',
    role: 'TECHNOLOGY INTERN',
    org: 'KARVY INNOTECH LTD.',
    orgUrl: 'https://www.linkedin.com/company/karvy-innotech-ltd/',
    period: 'DEC 2025 — APR 2026',
    duration: '5 MONTHS',
    mode: 'HYBRID',
    location: 'INDIA',
    tags: ['INTERNSHIP', 'FINTECH', 'HYBRID'],
    description: "Worked as a technology intern at Karvy Innotech, one of India's leading financial technology firms. Contributed to internal tooling and software development within a hybrid work environment.",
    accent: '#e63329',
  },
];

const EDUCATION = [
  {
    type: 'edu',
    degree: 'BACHELOR OF TECHNOLOGY',
    field: 'ARTIFICIAL INTELLIGENCE',
    org: 'AMITY UNIVERSITY, NOIDA',
    orgUrl: 'https://www.linkedin.com/school/amity-university/posts/?feedView=all',
    period: 'SEP 2024 — SEP 2028',
    duration: '4 YEARS',
    mode: 'ON-CAMPUS',
    location: 'NOIDA, INDIA',
    tags: ['BTECH', 'ARTIFICIAL INTELLIGENCE', 'COMPUTER SCIENCE'],
    description: 'Pursuing a Bachelor of Technology in Artificial Intelligence at Amity University, Noida. Core subjects include machine learning, computer vision, NLP, robotics, and full-stack development.',
    skills: ['COMPUTER SCIENCE', 'ARTIFICIAL INTELLIGENCE', 'MACHINE LEARNING', 'NLP', 'ROBOTICS'],
    accent: '#e63329',
  },
];

// ── THREE.JS SCENE ───────────────────────────────────────────────
const NODE_COUNT     = 120
const MAX_CONN_DIST  = 2.8
const PARTICLE_COUNT = 340

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

// Shared scroll ref passed into the canvas
const scrollRef = { current: 0, velocity: 0, last: 0 }

function NetworkScene() {
  const { viewport } = useThree()
  const time = useRef(0)

  // ── NODES (circuit dots) ──────────────────────────────────────
  const nodes = useMemo(() => {
    return Array.from({ length: NODE_COUNT }, (_, i) => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width  * 1.6,
        (Math.random() - 0.5) * viewport.height * 3.0,
        (Math.random() - 0.5) * 4,
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        0,
      ),
      size:  0.03 + Math.random() * 0.07,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
    }))
  }, [viewport.width, viewport.height])

  // Node points geometry
  const nodeGeo  = useMemo(() => new THREE.BufferGeometry(), [])
  const nodePos  = useMemo(() => new Float32Array(NODE_COUNT * 3), [])
  const nodeSizes = useMemo(() => new Float32Array(NODE_COUNT), [])

  useEffect(() => {
    nodes.forEach((n, i) => {
      nodePos[i * 3]     = n.pos.x
      nodePos[i * 3 + 1] = n.pos.y
      nodePos[i * 3 + 2] = n.pos.z
      nodeSizes[i]        = n.size
    })
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3))
    nodeGeo.setAttribute('size',     new THREE.BufferAttribute(nodeSizes, 1))
  }, [nodeGeo, nodePos, nodeSizes, nodes])

  // ── CONNECTIONS (lines) ───────────────────────────────────────
  const lineGeo = useMemo(() => new THREE.BufferGeometry(), [])
  // Max possible connections: allocate generously
  const linePos = useMemo(() => new Float32Array(NODE_COUNT * NODE_COUNT * 6), [])
  const lineRef = useRef<THREE.LineSegments>(null)
  const nodeRef = useRef<THREE.Points>(null)

  useEffect(() => {
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
  }, [lineGeo, linePos])

  // ── PARTICLES (drift field) ───────────────────────────────────
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width  * 2,
        (Math.random() - 0.5) * viewport.height * 3.5,
        (Math.random() - 0.5) * 6,
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        -0.001 - Math.random() * 0.003,  // gentle downward drift
        0,
      ),
      size:  0.01 + Math.random() * 0.025,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [viewport.width, viewport.height])

  const particleGeo   = useMemo(() => new THREE.BufferGeometry(), [])
  const particlePos   = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), [])
  const particleSizes = useMemo(() => new Float32Array(PARTICLE_COUNT), [])
  const particleRef   = useRef<THREE.Points>(null)

  useEffect(() => {
    particles.forEach((p, i) => {
      particlePos[i * 3]     = p.pos.x
      particlePos[i * 3 + 1] = p.pos.y
      particlePos[i * 3 + 2] = p.pos.z
      particleSizes[i]        = p.size
    })
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))
    particleGeo.setAttribute('size',     new THREE.BufferAttribute(particleSizes, 1))
  }, [particleGeo, particlePos, particleSizes, particles])

  // ── ANIMATION LOOP ────────────────────────────────────────────
  useFrame((_, delta) => {
    time.current += delta
    const t   = time.current
    const vel = scrollRef.velocity          // RGB shift intensity
    const scrollY = scrollRef.current / 800  // normalised scroll for parallax

    // Move nodes
    nodes.forEach((n, i) => {
      n.pos.add(n.vel)
      // Gentle sine bob
      n.pos.y += Math.sin(t * n.speed + n.phase) * 0.0008
      // Wrap within bounds
      const bx = viewport.width  * 0.85
      const by = viewport.height * 1.6
      if (n.pos.x >  bx) n.pos.x = -bx
      if (n.pos.x < -bx) n.pos.x =  bx
      if (n.pos.y >  by) n.pos.y = -by
      if (n.pos.y < -by) n.pos.y =  by

      nodePos[i * 3]     = n.pos.x
      nodePos[i * 3 + 1] = n.pos.y + scrollY * (0.3 + (i % 4) * 0.15) // parallax layers
      nodePos[i * 3 + 2] = n.pos.z
    })
    nodeGeo.attributes.position.needsUpdate = true

    // Rebuild connections
    let li = 0
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const dx   = nodePos[a*3]   - nodePos[b*3]
        const dy   = nodePos[a*3+1] - nodePos[b*3+1]
        const dist = Math.sqrt(dx*dx + dy*dy)
        if (dist < MAX_CONN_DIST && li + 6 < linePos.length) {
          linePos[li++] = nodePos[a*3];   linePos[li++] = nodePos[a*3+1]; linePos[li++] = nodePos[a*3+2]
          linePos[li++] = nodePos[b*3];   linePos[li++] = nodePos[b*3+1]; linePos[li++] = nodePos[b*3+2]
        }
      }
    }
    // Zero out the rest
    linePos.fill(0, li)
    lineGeo.attributes.position.needsUpdate = true
    lineGeo.setDrawRange(0, li / 3)

    // Move particles
    particles.forEach((p, i) => {
      p.pos.add(p.vel)
      // Scroll-speed turbulence
      p.pos.x += Math.sin(t * 0.3 + p.phase) * 0.001
      p.pos.x += vel * 0.04 * (Math.random() - 0.5)
      // Wrap
      const bx = viewport.width  * 1.1
      const by = viewport.height * 1.9
      if (p.pos.y < -by) p.pos.y =  by
      if (p.pos.x >  bx) p.pos.x = -bx
      if (p.pos.x < -bx) p.pos.x =  bx

      particlePos[i * 3]     = p.pos.x
      particlePos[i * 3 + 1] = p.pos.y + scrollY * (0.5 + (i % 3) * 0.2)
      particlePos[i * 3 + 2] = p.pos.z
    })
    particleGeo.attributes.position.needsUpdate = true

    // RGB shift on fast scroll — shift the node layer slightly
    if (nodeRef.current) {
      nodeRef.current.position.x = lerp(nodeRef.current.position.x, vel * 0.06, 0.1)
    }
  })

  // ── MATERIALS ─────────────────────────────────────────────────
  const nodeMat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color('#e63329'),
    size: 0.06,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [])

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color('#e63329'),
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [])

  const particleMat = useMemo(() => new THREE.PointsMaterial({
    color: new THREE.Color('#ff6b5b'),
    size: 0.022,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [])

  return (
    <>
      {/* Connection lines */}
      <lineSegments ref={lineRef} geometry={lineGeo} material={lineMat} />
      {/* Circuit nodes */}
      <points ref={nodeRef} geometry={nodeGeo} material={nodeMat} />
      {/* Ambient particle field */}
      <points ref={particleRef} geometry={particleGeo} material={particleMat} />
    </>
  )
}

// ── CARD COMPONENT ───────────────────────────────────────────────
type WorkItem = typeof EXPERIENCE[number]
type EduItem  = typeof EDUCATION[number]
type CardItem = WorkItem | EduItem

function ExternalLink() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}

function Card({ item }: { item: CardItem }) {
  const isEdu = item.type === 'edu'
  return (
    <div className="exp-card">
      <div className="exp-card-top">
        <div className="exp-type-badge">{isEdu ? '// EDUCATION' : '// EXPERIENCE'}</div>
        <div className="exp-period">{item.period}</div>
      </div>
      <div className="exp-card-body">
        <div className="exp-left">
          <div className="exp-role">
            {'role' in item ? item.role : (
              <><span>{(item as EduItem).degree}</span><span className="exp-role-accent"> // {(item as EduItem).field}</span></>
            )}
          </div>
          <a href={item.orgUrl} target="_blank" rel="noopener noreferrer" className="exp-org">
            {item.org}<span className="exp-org-icon"><ExternalLink /></span>
          </a>
          <div className="exp-meta-row">
            <span className="exp-meta-chip">{item.duration}</span>
            <span className="exp-meta-chip">{item.mode}</span>
            <span className="exp-meta-chip">{item.location}</span>
          </div>
        </div>
        <div className="exp-right">
          <p className="exp-desc">{item.description}</p>
          {'skills' in item && item.skills && (
            <div className="exp-skills">
              {item.skills.map(s => <span key={s} className="exp-skill-tag">{s}</span>)}
            </div>
          )}
          <div className="exp-tags">
            {item.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
          </div>
        </div>
      </div>
      <div className="exp-card-bottom" />
    </div>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────
export default function ExperiencePage() {
  const pageRef = useRef<HTMLDivElement>(null)

  // Track scroll for Three.js
  useEffect(() => {
    let last = 0
    function onScroll() {
      const y = window.scrollY
      scrollRef.velocity = y - last
      scrollRef.current  = y
      last = y
      // Decay velocity
      setTimeout(() => { scrollRef.velocity *= 0.85 }, 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <style>{`
        /* ── CANVAS BG ── */
        .exp-canvas-bg {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
        }

        /* ── PAGE ── */
        .exp-page {
          position: relative; z-index: 1;
          max-width: 1000px; margin: 0 auto;
          padding: 140px 2rem 6rem; min-height: 100vh;
        }

        /* ── HEADER ── */
        .exp-eyebrow {
          font-family: var(--mono); font-size: 11px; color: #e63329;
          letter-spacing: 0.2em; margin-bottom: 1rem;
        }
        .exp-title {
          font-family: var(--display);
          font-size: clamp(2.2rem, 6vw, 4.5rem);
          font-weight: 900; color: #fff;
          letter-spacing: 0.05em; line-height: 0.95; margin-bottom: 0.6rem;
        }
        .exp-title-accent { color: #e63329; }
        .exp-subtitle {
          font-family: var(--mono); font-size: 12px; color: #777;
          letter-spacing: 0.15em; margin-bottom: 4rem;
        }

        /* ── STATS ── */
        .exp-stats {
          display: flex; gap: 2rem; margin-bottom: 5rem;
          flex-wrap: wrap; align-items: center;
        }
        .exp-stat-num {
          font-family: var(--display); font-size: 2rem;
          font-weight: 900; color: #e63329; line-height: 1;
        }
        .exp-stat-label {
          font-family: var(--mono); font-size: 10px;
          color: #555; letter-spacing: 0.15em; margin-top: 4px;
        }
        .exp-stat-divider { width: 1px; height: 40px; background: #1a1a1a; }

        /* ── SECTION LABEL ── */
        .exp-section-label {
          font-family: var(--mono); font-size: 10px; color: #e63329;
          letter-spacing: 0.3em; margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 1rem;
        }
        .exp-section-label::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(230,51,41,0.3), transparent);
        }
        .exp-section { margin-bottom: 4rem; }

        /* ── CARD ── */
        .exp-card {
          border: 1px solid #1a1a1a;
          background: rgba(5,5,5,0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          position: relative; margin-bottom: 1.5rem;
          transition: border-color 0.3s ease;
        }
        .exp-card:hover { border-color: rgba(230,51,41,0.3); }
        .exp-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, #e63329, transparent);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .exp-card:hover::before { opacity: 1; }

        .exp-card-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 1.5rem 0.75rem; border-bottom: 1px solid #111;
        }
        .exp-type-badge {
          font-family: var(--mono); font-size: 10px;
          color: #e63329; letter-spacing: 0.2em;
        }
        .exp-period {
          font-family: var(--mono); font-size: 10px;
          color: #555; letter-spacing: 0.15em;
        }

        .exp-card-body {
          display: grid; grid-template-columns: 1fr 1.4fr;
          gap: 2rem; padding: 2rem 1.5rem;
        }

        .exp-role {
          font-family: var(--display);
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 700; color: #fff;
          letter-spacing: 0.06em; line-height: 1.2; margin-bottom: 0.75rem;
        }
        .exp-role-accent { color: #e63329; }

        .exp-org {
          font-family: var(--mono); font-size: 12px; color: #888;
          letter-spacing: 0.1em; text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
          margin-bottom: 1.25rem; transition: color 0.2s;
        }
        .exp-org:hover { color: #e63329; }
        .exp-org-icon { opacity: 0.5; display: flex; align-items: center; }
        .exp-org:hover .exp-org-icon { opacity: 1; }

        .exp-meta-row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .exp-meta-chip {
          font-family: var(--mono); font-size: 9px; color: #666;
          border: 1px solid #1e1e1e; padding: 3px 10px; letter-spacing: 0.12em;
        }

        .exp-desc {
          font-family: var(--body, 'Rajdhani', sans-serif);
          font-size: 15px; color: #999; line-height: 1.7; margin-bottom: 1.25rem;
        }

        .exp-skills { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
        .exp-skill-tag {
          font-family: var(--mono); font-size: 9px; color: #e63329;
          border: 1px solid rgba(230,51,41,0.25);
          background: rgba(230,51,41,0.05);
          padding: 3px 10px; letter-spacing: 0.1em;
        }

        .exp-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .exp-tag {
          font-family: var(--mono); font-size: 9px; color: #444;
          border: 1px solid #1a1a1a; padding: 3px 10px; letter-spacing: 0.1em;
        }

        .exp-card-bottom {
          height: 2px;
          background: linear-gradient(90deg, #e63329, transparent);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .exp-card:hover .exp-card-bottom { opacity: 0.4; }

        /* ── TIMELINE ── */
        .exp-timeline-dot {
          width: 8px; height: 8px; background: #e63329; border-radius: 50%;
          box-shadow: 0 0 10px rgba(230,51,41,0.5); margin: 0 auto 1.5rem;
        }
        .exp-timeline-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, #e63329, transparent);
          margin: 0 auto 1.5rem;
        }

        @media (max-width: 768px) {
          .exp-card-body { grid-template-columns: 1fr; gap: 1rem; }
          .exp-page { padding: 130px 1rem 4rem; }
        }
      `}</style>

      {/* THREE.JS CANVAS — fixed behind everything */}
      <div className="exp-canvas-bg">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: false, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <NetworkScene />
        </Canvas>
      </div>

      {/* PAGE CONTENT */}
      <main className="exp-page" ref={pageRef}>
        <p className="exp-eyebrow">MASKEDHELP // KARTHIK KUMAR // TIMELINE</p>
        <h1 className="exp-title">EXPERIENCE<span className="exp-title-accent">_</span></h1>
        <p className="exp-subtitle">EDUCATION · WORK · INTERNSHIPS</p>

        <div className="exp-stats">
          {[
            ['3', 'INTERNSHIPS'],
            ['5+', 'MONTHS EXP'],
            ['2028', 'GRADUATING'],
            ['BTech AI', 'DEGREE'],
          ].map(([num, label], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div>
                <div className="exp-stat-num">{num}</div>
                <div className="exp-stat-label">{label}</div>
              </div>
              {i < 3 && <div className="exp-stat-divider" />}
            </div>
          ))}
        </div>

        <div className="exp-section">
          <div className="exp-section-label">// 01 · WORK EXPERIENCE</div>
          {EXPERIENCE.map((item, i) => <Card key={i} item={item} />)}
        </div>

        <div className="exp-timeline-dot" />
        <div className="exp-timeline-line" />

        <div className="exp-section">
          <div className="exp-section-label">// 02 · EDUCATION</div>
          {EDUCATION.map((item, i) => <Card key={i} item={item} />)}
        </div>
      </main>
    </>
  )
}