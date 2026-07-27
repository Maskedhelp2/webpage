'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ── DATA ─────────────────────────────────────────────────────────
const ITEMS = [
  {
    idx: '01', type: 'WORK',
    role: 'RESEARCH INTERN',
    org: 'AMEYA SONIC OPTEO SYSTEMS',
    orgUrl: 'https://ameyasonicopteosystem.com',
    period: '2026 — PRESENT',
    year: '2026',
    mode: 'ON-SITE',
    location: 'INDIA',
    tags: ['RESEARCH', 'SYSTEMS', 'ON-SITE'],
    description: 'Contributing to R&D in advanced systems engineering at Ameya Sonic Opteo Systems. Working on applied technical projects within a specialised engineering environment.',
    skills: [] as string[],
  },
  {
    idx: '02', type: 'WORK',
    role: 'LEAD DEVELOPER INTERN',
    org: 'INDCASTING.COM',
    orgUrl: 'https://indcasting.com',
    period: '2025 — 2026',
    year: '2025',
    mode: 'REMOTE',
    location: 'INDIA',
    tags: ['MANUFACTURING', 'REMOTE', 'CONTRACT'],
    description: 'Gained hands-on exposure to industrial workflows at IndCasting.com, a platform in the casting and manufacturing industry. Contributed to technical development work.',
    skills: [] as string[],
  },
  {
    idx: '03', type: 'WORK',
    role: 'TECHNOLOGY INTERN',
    org: 'KARVY INNOTECH LTD.',
    orgUrl: 'https://www.linkedin.com/company/karvy-innotech-ltd/',
    period: 'DEC 2025 — APR 2026',
    year: '2025',
    mode: 'HYBRID',
    location: 'INDIA',
    tags: ['FINTECH', 'HYBRID', '5 MONTHS'],
    description: "Worked as a technology intern at Karvy Innotech, one of India's leading financial technology firms. Contributed to internal tooling and software development.",
    skills: [] as string[],
  },
  {
    idx: '04', type: 'EDUCATION',
    role: 'B.TECH — ARTIFICIAL INTELLIGENCE',
    org: 'AMITY UNIVERSITY, NOIDA',
    orgUrl: 'https://www.linkedin.com/school/amity-university/',
    period: 'SEP 2024 — SEP 2028',
    year: '2024',
    mode: 'ON-CAMPUS',
    location: 'NOIDA, INDIA',
    tags: ['AI', 'COMPUTER SCIENCE', '4 YEARS'],
    description: 'Pursuing a Bachelor of Technology in Artificial Intelligence. Core subjects span machine learning, computer vision, NLP, robotics, embedded systems, and full-stack development.',
    skills: ['MACHINE LEARNING', 'COMPUTER VISION', 'NLP', 'ROBOTICS', 'FULL-STACK'],
  },
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&';

function useScramble(text: string) {
  const [display, setDisplay] = useState(text);
  const frame = useRef<number>(0);
  const iter  = useRef(0);
  const scramble = useCallback(() => {
    cancelAnimationFrame(frame.current);
    iter.current = 0;
    const tick = () => {
      setDisplay(text.split('').map((ch, i) => {
        if (ch === ' ' || ch === '.' || ch === '-' || ch === '—') return ch;
        if (i < iter.current) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(''));
      iter.current += 0.09;
      if (iter.current < text.length) frame.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    frame.current = requestAnimationFrame(tick);
  }, [text]);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  return { display, scramble };
}

// ── ACCORDION ROW ─────────────────────────────────────────────────
function Row({ item, index }: { item: typeof ITEMS[number]; index: number }) {
  const [open, setOpen]   = useState(false);
  const bodyRef           = useRef<HTMLDivElement>(null);
  const rowRef            = useRef<HTMLDivElement>(null);
  const { display, scramble } = useScramble(item.role);

  // Animate open/close
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    if (open) {
      gsap.fromTo(body,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.55, ease: 'power3.inOut' }
      );
    } else {
      gsap.to(body, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
    }
  }, [open]);

  // Scroll-in animation
  useEffect(() => {
    if (!rowRef.current) return;
    gsap.fromTo(rowRef.current,
      { x: -40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: rowRef.current, start: 'top 90%', toggleActions: 'play none none none' },
        delay: index * 0.07,
      }
    );
  }, [index]);

  const isEdu = item.type === 'EDUCATION';

  return (
    <div
      ref={rowRef}
      className={`row ${open ? 'row-open' : ''}`}
      style={{ opacity: 0 }}
    >
      {/* ── COLLAPSED HEADER ── */}
      <div
        className="row-header"
        onClick={() => setOpen(o => !o)}
        onMouseEnter={scramble}
      >
        {/* Index */}
        <span className="row-idx">{item.idx}</span>

        {/* Type pill */}
        <span className={`row-type ${isEdu ? 'row-type-edu' : ''}`}>{item.type}</span>

        {/* Role — takes up most space */}
        <span className="row-role">{open ? item.role : display}</span>

        {/* Org */}
        <span className="row-org">{item.org}</span>

        {/* Year */}
        <span className="row-year">{item.year}</span>

        {/* Expand icon */}
        <span className={`row-icon ${open ? 'row-icon-open' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1.5" className="row-plus-v"/>
            <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </span>
      </div>

      {/* ── EXPANDED BODY ── */}
      <div ref={bodyRef} className="row-body" style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <div className="row-body-inner">

          {/* Left col — meta */}
          <div className="row-meta">
            <div className="row-meta-block">
              <span className="row-meta-label">// PERIOD</span>
              <span className="row-meta-val">{item.period}</span>
            </div>
            <div className="row-meta-block">
              <span className="row-meta-label">// MODE</span>
              <span className="row-meta-val">{item.mode}</span>
            </div>
            <div className="row-meta-block">
              <span className="row-meta-label">// LOCATION</span>
              <span className="row-meta-val">{item.location}</span>
            </div>
            <a
              href={item.orgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="row-org-link"
              onClick={e => e.stopPropagation()}
            >
              VIEW ORG ↗
            </a>
          </div>

          {/* Center col — description */}
          <div className="row-desc-col">
            <p className="row-desc">{item.description}</p>
            {item.skills.length > 0 && (
              <div className="row-skills">
                {item.skills.map(s => (
                  <span key={s} className="row-skill">{s}</span>
                ))}
              </div>
            )}
          </div>

          {/* Right col — tags */}
          <div className="row-tags-col">
            {item.tags.map(t => (
              <span key={t} className="row-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ANIMATED COUNTER ─────────────────────────────────────────────
function Counter({ val }: { val: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const n   = parseInt(val.replace(/\D/g, '')) || 0;
  useEffect(() => {
    if (!ref.current || n === 0) return;
    const el = ref.current;
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.fromTo({ v: 0 }, { v: n }, {
          duration: 1.6, ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Math.round((this as any).targets()[0].v) + (val.includes('+') ? '+' : '');
          }
        });
      }
    });
  }, [n, val]);
  return <span ref={ref}>{val}</span>;
}

// ── PAGE ─────────────────────────────────────────────────────────
export default function ExperiencePage() {
  const pageRef    = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  // Lenis
  useEffect(() => {
    let lenis: any;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1.2 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t: number) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    });
    return () => lenis?.destroy();
  }, []);

  // Title clip-path wipe
  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll('.t-char');
    gsap.fromTo(chars,
      { clipPath: 'inset(0 0 100% 0)', y: 20 },
      { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1, ease: 'power4.out', stagger: 0.04, delay: 0.1 }
    );
  }, []);

  // Marquee
  useEffect(() => {
    if (!marqueeRef.current) return;
    const inner = marqueeRef.current.querySelector('.mq-inner');
    if (inner) gsap.to(inner, { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });
    ScrollTrigger.create({
      trigger: marqueeRef.current, start: 'top 90%',
      onEnter: () => gsap.to(marqueeRef.current, { opacity: 1, duration: 0.6 }),
    });
  }, []);

  const title = 'EXPERIENCE';

  return (
    <>
      <style>{`
        /* ── PAGE ── */
        .xp-page {
          min-height: 100vh;
          padding: 140px 0 8rem;
          position: relative;
        }

        /* ── HERO ── */
        .xp-hero {
          padding: 0 2.5rem 3rem;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 2rem;
        }
        .xp-eyebrow {
          font-family: var(--mono);
          font-size: 12px;
          color: #55dff7;
          letter-spacing: 0.25em;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .xp-eyebrow::before {
          content: '';
          width: 24px; height: 1px;
          background: #e63329;
        }
        .xp-title {
          font-family: var(--display);
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 0.88;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
        }
        .t-char {
          display: inline-block;
          will-change: clip-path, transform;
        }
        .t-char-accent { color: #e63329; }

        /* Right — vertical stats */
        .xp-hero-stats {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid #1a1a1a;
          align-self: end;
          margin-bottom: 0.2rem;
        }
        .xp-stat {
          padding: 14px 24px;
          border-bottom: 1px solid #1a1a1a;
          position: relative;
        }
        .xp-stat:last-child { border-bottom: none; }
        .xp-stat::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: #e63329;
        }
        .xp-stat-n {
          font-family: var(--display);
          font-size: 1.6rem;
          font-weight: 900;
          color: #e63329;
          line-height: 1;
        }
        .xp-stat-l {
          font-family: var(--mono);
          font-size: 11px;
          color: #55dff7;
          letter-spacing: 0.18em;
          margin-top: 4px;
        }

        /* ── MARQUEE ── */
        .xp-mq {
          border-top: 1px solid #111;
          border-bottom: 1px solid #111;
          padding: 10px 0;
          overflow: hidden;
          opacity: 0;
          margin-bottom: 0;
        }
        .mq-inner {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .mq-text {
          font-family: var(--mono);
          font-size: 11px;
          color: #555;
          letter-spacing: 0.25em;
          white-space: nowrap;
          padding-right: 4rem;
        }
        .mq-text .mq-hl { color: #e63329; }

        /* ── TABLE HEADER ── */
        .xp-table-head {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 48px 100px 1fr 200px 60px 36px;
          gap: 0;
          padding: 10px 2.5rem;
          border-bottom: 1px solid #1a1a1a;
        }
        .xp-th {
          font-family: var(--mono);
          font-size: 11px;
          color: #55dff7;
          letter-spacing: 0.2em;
        }

        /* ── ROW ── */
        .row {
          max-width: 1200px;
          margin: 0 auto;
          border-bottom: 1px solid #141414;
          transition: border-color 0.2s;
        }
        .row:hover, .row.row-open {
          border-color: #252525;
        }

        .row-header {
          display: grid;
          grid-template-columns: 48px 100px 1fr 200px 60px 36px;
          gap: 0;
          align-items: center;
          padding: 30px 2.5rem;
          cursor: pointer;
          transition: background 0.2s;
          user-select: none;
        }
        .row-header:hover { background: rgba(255,255,255,0.02); }
        .row-open .row-header { background: rgba(230,51,41,0.03); }

        .row-idx {
          font-family: var(--mono);
          font-size: 13px;
          color: #55dff7;
          letter-spacing: 0.15em;
        }
        .row-open .row-idx { color: #e63329; }

        .row-type {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.12em;
          color: #55dff7;
          border: 1px solid rgba(124,58,237,0.35);
          padding: 4px 10px;
          width: fit-content;
          transition: all 0.2s;
        }
        .row-type-edu {
          color: #55dff7;
          border-color: rgba(124,58,237,0.35);
        }
        .row-open .row-type {
          color: #e63329;
          border-color: rgba(230,51,41,0.3);
        }

        .row-role {
          font-family: var(--display);
          font-size: clamp(0.9rem, 1.5vw, 1.15rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
          transition: color 0.2s;
          padding-right: 1rem;
        }
        .row-header:hover .row-role,
        .row-open .row-role { color: #e63329; }

        .row-org {
          font-family: var(--mono);
          font-size: 13px;
          color: #55dff7;
          letter-spacing: 0.06em;
          padding-right: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s;
        }
        .row-header:hover .row-org { color: #55dff7; }

        .row-year {
          font-family: var(--mono);
          font-size: 14px;
          color: #55dff7;
          letter-spacing: 0.1em;
        }
        .row-open .row-year { color: #55dff7; }

        .row-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #55dff7;
          transition: transform 0.4s ease, color 0.2s;
        }
        .row-icon-open {
          transform: rotate(45deg);
          color: #e63329;
        }
        .row-plus-v {
          transition: transform 0.4s ease;
          transform-origin: center;
        }
        .row-icon-open .row-plus-v {
          transform: rotate(90deg);
        }

        /* ── EXPANDED BODY ── */
        .row-body { overflow: hidden; }
        .row-body-inner {
          display: grid;
          grid-template-columns: 200px 1fr 160px;
          gap: 0;
          padding: 0 2.5rem 3rem calc(2.5rem + 48px + 100px);
          border-top: 1px solid #111;
        }

        .row-meta {
          padding: 1.5rem 1.5rem 0 0;
          border-right: 1px solid #111;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .row-meta-block { display: flex; flex-direction: column; gap: 3px; }
        .row-meta-label {
          font-family: var(--mono);
          font-size: 12px;
          color: #e63329;
          letter-spacing: 0.2em;
        }
        .row-meta-val {
          font-family: var(--mono);
          font-size: 14px;
          color: #fff;
          letter-spacing: 0.08em;
        }
        .row-org-link {
          font-family: var(--mono);
          font-size: 12px;
          color: #e63329;
          letter-spacing: 0.15em;
          text-decoration: none;
          margin-top: auto;
          padding-top: 0.5rem;
          transition: color 0.2s;
        }
        .row-org-link:hover { color: #fff; }

        .row-desc-col {
          padding: 1.5rem 2rem 0;
        }
        .row-desc {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          color: #e8e8e8;
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }
        .row-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .row-skill {
          font-family: var(--mono);
          font-size: 12px;
          color: #e63329;
          border: 1px solid rgba(230,51,41,0.25);
          background: rgba(230,51,41,0.04);
          padding: 5px 12px;
          letter-spacing: 0.1em;
        }

        .row-tags-col {
          padding: 1.5rem 0 0 1.5rem;
          border-left: 1px solid #111;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
        }
        .row-tag {
          font-family: var(--mono);
          font-size: 12px;
          color: #e63329;
          border: 1px solid rgba(230,51,41,0.25);
          padding: 5px 12px;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        /* ── FOOTER COUNT ── */
        .xp-foot {
          max-width: 1200px;
          margin: 3rem auto 0;
          padding: 1.5rem 2.5rem;
          border-top: 1px solid #111;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .xp-foot-label {
          font-family: var(--mono);
          font-size: 12px;
          color: #55dff7;
          letter-spacing: 0.2em;
        }
        .xp-foot-count {
          font-family: var(--display);
          font-size: 0.9rem;
          font-weight: 700;
          color: #55dff7;
          letter-spacing: 0.1em;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .xp-page { padding: 120px 0 5rem; }
          .xp-hero { grid-template-columns: 1fr; padding: 0 1rem 2rem; }
          .xp-hero-stats { flex-direction: row; }
          .xp-stat { flex: 1; }
          .xp-title { font-size: clamp(2.8rem, 14vw, 5rem); }
          .xp-table-head { display: none; }
          .row-header {
            grid-template-columns: 36px 1fr 50px 28px;
            padding: 16px 1rem;
          }
          .row-type { display: none; }
          .row-org  { display: none; }
          .row-body-inner {
            grid-template-columns: 1fr;
            padding: 0 1rem 1.5rem 1rem;
          }
          .row-meta { border-right: none; border-bottom: 1px solid #111; padding-bottom: 1rem; }
          .row-desc-col { padding: 1rem 0 0; }
          .row-tags-col { border-left: none; border-top: 1px solid #111; padding: 1rem 0 0; flex-direction: row; flex-wrap: wrap; }
          .xp-foot { padding: 1.5rem 1rem; }
        }
      `}</style>

      <div className="xp-page" ref={pageRef}>

        {/* ── HERO ── */}
        <div className="xp-hero">
          <div>
            <p className="xp-eyebrow">MASKEDHELP // KARTHIK KUMAR // TIMELINE</p>
            <h1 className="xp-title" ref={titleRef}>
              {title.split('').map((ch, i) => (
                <span key={i} className={`t-char${i === title.length - 1 ? ' t-char-accent' : ''}`}>
                  {ch}
                </span>
              ))}
              <span className="t-char t-char-accent">_</span>
            </h1>
          </div>

          <div className="xp-hero-stats">
            {[
              { n: '3',     l: 'INTERNSHIPS' },
              { n: '5+',   l: 'MONTHS EXP'  },
              { n: '2028', l: 'GRADUATING'  },
            ].map(({ n, l }) => (
              <div key={l} className="xp-stat">
                <div className="xp-stat-n"><Counter val={n} /></div>
                <div className="xp-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MARQUEE ── */}
        <div className="xp-mq" ref={marqueeRef}>
          <div className="mq-inner">
            {[0, 1].map(i => (
              <div key={i} className="mq-text">
                {'WORK · EDUCATION · INTERNSHIPS · AMITY UNIVERSITY · KARVY INNOTECH · AMEYA SONIC · INDCASTING · AI · ROBOTICS · FULL STACK · '
                  .split('·').map((seg, j) => (
                    <span key={j}>
                      {j % 4 === 0
                        ? <span className="mq-hl">{seg.trim()} · </span>
                        : `${seg.trim()} · `}
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── TABLE HEAD ── */}
        <div className="xp-table-head">
          <span className="xp-th">#</span>
          <span className="xp-th">TYPE</span>
          <span className="xp-th">ROLE</span>
          <span className="xp-th">ORGANISATION</span>
          <span className="xp-th">YEAR</span>
          <span className="xp-th"></span>
        </div>

        {/* ── ROWS ── */}
        {ITEMS.map((item, i) => (
          <Row key={item.idx} item={item} index={i} />
        ))}

        {/* ── FOOTER ── */}
        <div className="xp-foot">
          <span className="xp-foot-label">// END OF TIMELINE</span>
          <span className="xp-foot-count">{ITEMS.length} ENTRIES</span>
        </div>

      </div>
    </>
  );
}