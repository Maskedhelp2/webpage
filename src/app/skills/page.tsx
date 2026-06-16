'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useEffect, useRef } from 'react';

const SKILLS: { left: string; right: string; icon: string }[] = [
  { left: 'NEXT.JS',            right: 'FULL STACK',     icon: '⬡' },
  { left: 'REACT',              right: 'FRONTEND',       icon: '⚛' },
  { left: 'TYPESCRIPT',         right: 'BACKEND',        icon: '{ }' },
  { left: 'NODE.JS',            right: 'SERVER-SIDE',    icon: '⬢' },
  { left: 'REST APIs',          right: 'APIs',           icon: '⇄' },
  { left: 'CSS-IN-JS',          right: 'STYLING',        icon: '✦' },
  { left: 'POSTGRESQL',         right: 'DATABASE',       icon: '▦' },
  { left: 'CLOUDFLARE',         right: 'EDGE DEPLOY',    icon: '☁' },
  { left: 'DOCKER',             right: 'CONTAINERS',     icon: '◉' },
  { left: 'RASPBERRY PI',       right: 'HARDWARE',       icon: '◈' },
  { left: 'ARDUINO',            right: 'MICROCTRL',      icon: '⏣' },
  { left: 'MICROCONTROLLERS',   right: 'EMBEDDED',       icon: '⬡' },
  { left: 'EMBEDDED C',         right: 'SYSTEMS',        icon: '</>' },
  { left: 'GPIO / I2C / SPI',   right: 'PROTOCOLS',      icon: '⇌' },
  { left: 'SENSOR FUSION',      right: 'IOT',            icon: '◎' },
  { left: 'MACHINE LEARNING',   right: 'AI / ML',        icon: '◆' },
  { left: 'PYTHON',             right: 'SCRIPTING',      icon: '≋' },
  { left: 'PYTORCH',            right: 'DEEP LEARNING',  icon: '⬟' },
  { left: 'LLM INTEGRATION',    right: 'GENERATIVE AI',  icon: '◈' },
  { left: 'COMPUTER VISION',    right: 'CV',             icon: '◉' },
  { left: 'NLP',                right: 'LANGUAGE',       icon: '≡' },
  { left: 'PROMPT ENGINEERING', right: 'PROMPTING',      icon: '⟡' },
  { left: 'AI ON EDGE',         right: 'EDGE AI',        icon: '⬡' },
];

const TAGS = ['FULL STACK', 'ROBOTICS', 'AI', 'HARDWARE', 'EDGE COMPUTING', 'OPEN SOURCE'];

// Group skills into domains for the stat cards
const DOMAINS = [
  { label: 'WEB & CLOUD',  skills: ['NEXT.JS','REACT','TYPESCRIPT','NODE.JS','REST APIs','CLOUDFLARE','DOCKER'] },
  { label: 'EMBEDDED',     skills: ['RASPBERRY PI','ARDUINO','EMBEDDED C','GPIO / I2C / SPI','SENSOR FUSION','MICROCONTROLLERS'] },
  { label: 'AI & ROBOTICS',skills: ['MACHINE LEARNING','PYTORCH','COMPUTER VISION','NLP','PROMPT ENGINEERING','LLM INTEGRATION','AI ON EDGE'] },
];

class DualWaveAnimation {
  wrapper: HTMLElement;
  config: { waveNumber: number; waveSpeed: number };
  leftColumn!: HTMLElement;
  rightColumn!: HTMLElement;
  leftTexts: HTMLElement[] = [];
  rightTexts: HTMLElement[] = [];
  thumbnail!: HTMLElement;
  thumbnailLabel!: HTMLElement;
  halfRange = 0;
  leftQuickSetters:  Array<(v: number) => void> = [];
  rightQuickSetters: Array<(v: number) => void> = [];
  scrollTriggerInstance: any = null;
  resizeHandler?: () => void;
  gsap: any = null;
  currentFocused = -1;

  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper;
    this.config = {
      waveNumber: wrapper.dataset.waveNumber ? parseFloat(wrapper.dataset.waveNumber) : 12,
      waveSpeed:  wrapper.dataset.waveSpeed  ? parseFloat(wrapper.dataset.waveSpeed)  : 1,
    };
  }

  async init() {
    const gsapMod = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    this.gsap = gsapMod.default;
    this.gsap.registerPlugin(ScrollTrigger);

    this.leftColumn   = this.wrapper.querySelector('.wave-column-left')!  as HTMLElement;
    this.rightColumn  = this.wrapper.querySelector('.wave-column-right')! as HTMLElement;
    this.thumbnail    = this.wrapper.querySelector('.wave-thumbnail')!    as HTMLElement;
    this.thumbnailLabel = this.wrapper.querySelector('.wave-thumbnail-label')! as HTMLElement;
    if (!this.leftColumn || !this.rightColumn) return;

    this.leftTexts  = this.gsap.utils.toArray(this.leftColumn.querySelectorAll('.animated-text'))  as HTMLElement[];
    this.rightTexts = this.gsap.utils.toArray(this.rightColumn.querySelectorAll('.animated-text')) as HTMLElement[];
    if (!this.leftTexts.length) return;

    this.leftQuickSetters  = this.leftTexts.map(t  => this.gsap.quickTo(t, 'x', { duration: 0.6, ease: 'power4.out' }));
    this.rightQuickSetters = this.rightTexts.map(t => this.gsap.quickTo(t, 'x', { duration: 0.6, ease: 'power4.out' }));

    this.calculateRange();

    this.scrollTriggerInstance = ScrollTrigger.create({
      trigger: this.wrapper,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self: any) => this.handleScroll(self),
    });

    this.resizeHandler = () => this.calculateRange();
    window.addEventListener('resize', this.resizeHandler);
  }

  calculateRange() {
    const colW   = this.leftColumn.offsetWidth;
    const maxTxt = Math.max(...this.leftTexts.map(t => t.offsetWidth));
    this.halfRange = Math.max(0, (colW - maxTxt) / 2);
  }

  handleScroll(self: any) {
    const progress     = self.progress;
    const focusedIndex = this.findClosestToViewportCenter();

    this.updateColumn(this.leftTexts,  this.leftQuickSetters,  progress, focusedIndex,  1);
    this.updateColumn(this.rightTexts, this.rightQuickSetters, progress, focusedIndex, -1);

    if (this.thumbnail) {
      const skill = SKILLS[focusedIndex];
      if (focusedIndex !== this.currentFocused && skill) {
        this.currentFocused = focusedIndex;
        this.thumbnail.textContent = skill.icon;
        if (this.thumbnailLabel) this.thumbnailLabel.textContent = skill.left;
      }
      // Track viewport centre
      const wrapperRect = this.wrapper.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const thumbH  = (this.thumbnail.parentElement?.offsetHeight ?? 80);
      const wrapperH = this.wrapper.offsetHeight;
      const idealY  = viewportCenter - wrapperRect.top - thumbH / 2;
      const clampY  = Math.max(-thumbH / 2, Math.min(wrapperH - thumbH / 2, idealY));
      this.gsap.set(this.thumbnail.parentElement, { y: clampY });
    }
  }

  updateColumn(
    texts: HTMLElement[], setters: Array<(v: number) => void>,
    progress: number, focusedIndex: number, dir: number
  ) {
    texts.forEach((text, index) => {
      const phase = this.config.waveNumber * index
                  + this.config.waveSpeed * progress * Math.PI * 2
                  - Math.PI / 2;
      const x = Math.sin(phase) * this.halfRange * dir;
      setters[index](x);

      const dist = Math.abs(index - focusedIndex);
      const isFocused = index === focusedIndex;
      const isNear    = dist === 1;
      text.classList.toggle('focused', isFocused);
      text.classList.toggle('near',    isNear && !isFocused);
    });
  }

  findClosestToViewportCenter(): number {
    const center = window.innerHeight / 2;
    let closest = 0, minDist = Infinity;
    this.leftTexts.forEach((t, i) => {
      const rect = t.getBoundingClientRect();
      const dist = Math.abs(rect.top + rect.height / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    return closest;
  }

  destroy() {
    this.scrollTriggerInstance?.kill();
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
  }
}

export default function SkillsPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animRef    = useRef<DualWaveAnimation | null>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const anim = new DualWaveAnimation(wrapperRef.current);
    anim.init();
    animRef.current = anim;
    return () => { animRef.current?.destroy(); };
  }, []);

  return (
    <>
      <style>{`
        /* ── WAVE COLUMNS ── */
        .dual-wave-wrapper {
          display: flex;
          width: 100%;
          position: relative;
          gap: 0;
        }

        .wave-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;           /* more breathing room */
          overflow: visible;
          padding: 0 1.5rem;
        }

        .wave-column-left  { align-items: center; }
        .wave-column-right { align-items: center; }

        /* ── WAVE TEXT — much bigger ── */
        .animated-text {
          width: max-content;
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(1.1rem, 2.4vw, 2rem);   /* was 0.8–1.3rem */
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1;
          color: #2a2a2a;
          transition: color 220ms ease-out, text-shadow 220ms ease-out, opacity 220ms ease-out;
          cursor: default;
          will-change: transform;
          white-space: nowrap;
          opacity: 0.5;
        }

        .animated-text.near {
          color: #7a2a28;
          opacity: 0.75;
          text-shadow: 0 0 20px rgba(230,51,41,0.15);
        }

        .animated-text.focused {
          color: #e63329 !important;
          opacity: 1 !important;
          text-shadow: 0 0 30px rgba(230,51,41,0.6), 0 0 60px rgba(230,51,41,0.25);
        }

        /* ── CENTER THUMBNAIL ── */
        .wave-thumbnail-wrapper {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 14vw;
          min-width: 100px;
          max-width: 160px;
          pointer-events: none;
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .wave-thumbnail {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(3rem, 6vw, 5.5rem);   /* bigger icon */
          color: #e63329;
          text-shadow: 0 0 40px rgba(230,51,41,0.7), 0 0 80px rgba(230,51,41,0.3);
          line-height: 1;
          text-align: center;
          width: 100%;
          animation: iconPulse 2s ease-in-out infinite;
        }

        .wave-thumbnail-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(0.5rem, 1vw, 0.7rem);
          color: #e63329;
          letter-spacing: 0.15em;
          opacity: 0.6;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        @keyframes iconPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* ── CENTER LINE ── */
        .wave-center-line {
          position: absolute;
          left: 50%;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, #e63329 20%, #e63329 80%, transparent);
          opacity: 0.12;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .wave-spacer { height: 30svh; }

        /* ── DOMAIN CARDS ── */
        .domain-card {
          border: 1px solid #1a1a1a;
          background: rgba(255,255,255,0.015);
          padding: 28px;
          position: relative;
          transition: border-color 0.2s, background 0.2s;
        }
        .domain-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #e63329, transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .domain-card:hover { border-color: rgba(230,51,41,0.25); background: rgba(230,51,41,0.03); }
        .domain-card:hover::before { opacity: 1; }

        .domain-skill-pill {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: #444;
          border: 1px solid #1e1e1e;
          padding: 4px 10px;
          letter-spacing: 0.1em;
          transition: color 0.2s, border-color 0.2s;
        }
        .domain-card:hover .domain-skill-pill {
          color: #666;
          border-color: #2a2a2a;
        }

        /* ── SKILL TAGS ── */
        .skill-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: #e63329;
          border: 1px solid #2a0a09;
          background: rgba(230,51,41,0.05);
          padding: 5px 14px;
          letter-spacing: 0.1em;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .skill-tag:hover {
          background: rgba(230,51,41,0.14);
          box-shadow: 0 0 10px rgba(230,51,41,0.2);
        }

        /* ── STAT COUNTER ── */
        .stat-num {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #e63329;
          line-height: 1;
          position: relative;
        }
        .stat-num::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 100%; height: 1px;
          background: linear-gradient(90deg, #e63329, transparent);
        }

        @media (max-width: 768px) {
          .animated-text { font-size: clamp(0.85rem, 3.5vw, 1.2rem); }
          .wave-column { gap: 1.2rem; padding: 0 0.5rem; }
          .wave-thumbnail { font-size: 2.5rem; }
          .domain-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Header />

      <main style={{ paddingTop: 100, minHeight: '100vh' }}>

        {/* ── HERO HEADER ── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 2rem 0' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#e63329', letterSpacing: '0.22em', marginBottom: '1rem' }}>
            MASKEDHELP // KARTHIK KUMAR // SKILL MATRIX
          </p>
          <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 0.95, marginBottom: '1.5rem' }}>
            SKILL<span style={{ color: '#e63329' }}>_</span>SET
          </h1>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#444', letterSpacing: '0.18em', marginBottom: '3rem', maxWidth: 500 }}>
            SCROLL TO EXPLORE · 3 DOMAINS · 24 TECHNOLOGIES
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: '4rem' }}>
            {[['3','DOMAINS'],['24','TECHNOLOGIES'],['∞','STILL LEARNING']].map(([num, label], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span className="stat-num">{num}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#333', letterSpacing: '0.18em' }}>{label}</span>
                </div>
                {i < 2 && <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, transparent, #1a1a1a, transparent)' }} />}
              </div>
            ))}
          </div>

          {/* Domain cards */}
          <div className="domain-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '5rem' }}>
            {DOMAINS.map(d => (
              <div key={d.label} className="domain-card">
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#e63329', letterSpacing: '0.2em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 16, height: 1, background: '#e63329', display: 'block', flexShrink: 0 }} />
                  {d.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {d.skills.map(s => <span key={s} className="domain-skill-pill">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SCROLL HINT ── */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#333', letterSpacing: '0.2em' }}>
            ↓ SCROLL THROUGH THE STACK ↓
          </span>
        </div>

        <div className="wave-spacer" />

        {/* ── DUAL WAVE ── */}
        <div
          ref={wrapperRef}
          className="dual-wave-wrapper"
          data-wave-number="12"
          data-wave-speed="1"
        >
          <div className="wave-center-line" />

          <div className="wave-column wave-column-left">
            {SKILLS.map((s, i) => (
              <span key={i} className="animated-text">{s.left}</span>
            ))}
          </div>

          <div className="wave-thumbnail-wrapper">
            <div className="wave-thumbnail">◆</div>
            <div className="wave-thumbnail-label">SKILL</div>
          </div>

          <div className="wave-column wave-column-right">
            {SKILLS.map((s, i) => (
              <span key={i} className="animated-text">{s.right}</span>
            ))}
          </div>
        </div>

        <div className="wave-spacer" />

        {/* ── FOOTER TAGS ── */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 6rem' }}>
          <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '2.5rem' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: '#2a2a2a', letterSpacing: '0.18em', marginBottom: '1rem' }}>
              // DOMAINS
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {TAGS.map(tag => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}