'use client';

import { useEffect, useRef } from 'react';

type ExperienceItem = {
  type: 'work';
  role: string;
  org: string;
  orgUrl: string;
  period: string;
  duration: string;
  mode: string;
  location: string;
  status: string;
  tags: string[];
  description: string;
  highlights: string[];
};

type EducationItem = {
  type: 'edu';
  degree: string;
  field: string;
  org: string;
  orgUrl: string;
  period: string;
  duration: string;
  mode: string;
  location: string;
  status: string;
  tags: string[];
  description: string;
  highlights: string[];
  skills: string[];
};

type CardItem = ExperienceItem | EducationItem;

const EXPERIENCE: ExperienceItem[] = [
  {
    type: 'work',
    role: 'RESEARCH INTERN',
    org: 'AMEYA SONIC OPTEO SYSTEMS',
    orgUrl: 'https://ameyasonicopteosystem.com',
    period: '2026 - PRESENT',
    duration: 'ONGOING',
    mode: 'ON-SITE',
    location: 'INDIA',
    status: 'ACTIVE',
    tags: ['INTERNSHIP', 'RESEARCH', 'SYSTEMS'],
    description:
      'Contributing to research and development work in an applied engineering environment, with exposure to advanced system design and technical problem solving.',
    highlights: [
      'Supporting R&D workflows across hardware and software touchpoints.',
      'Documenting technical findings and implementation constraints.',
      'Building practical systems intuition in a specialised engineering setting.',
    ],
  },
  {
    type: 'work',
    role: 'INTERN',
    org: 'INDCASTING.COM',
    orgUrl: 'https://indcasting.com',
    period: '2025 - 2026',
    duration: 'CONTRACT',
    mode: 'REMOTE',
    location: 'INDIA',
    status: 'COMPLETE',
    tags: ['INTERNSHIP', 'MANUFACTURING', 'REMOTE'],
    description:
      'Worked with a casting and manufacturing platform, gaining exposure to industrial workflows while contributing to technical development tasks.',
    highlights: [
      'Learned how software supports manufacturing and casting workflows.',
      'Worked remotely with delivery constraints and async communication.',
      'Improved implementation discipline through production-facing tasks.',
    ],
  },
  {
    type: 'work',
    role: 'TECHNOLOGY INTERN',
    org: 'KARVY INNOTECH LTD.',
    orgUrl: 'https://www.linkedin.com/company/karvy-innotech-ltd/',
    period: 'DEC 2025 - APR 2026',
    duration: '5 MONTHS',
    mode: 'HYBRID',
    location: 'INDIA',
    status: 'COMPLETE',
    tags: ['INTERNSHIP', 'FINTECH', 'HYBRID'],
    description:
      'Contributed to internal tooling and software development work inside a financial technology environment with a hybrid operating model.',
    highlights: [
      'Worked around internal tooling, delivery expectations, and team workflows.',
      'Strengthened fundamentals in practical software development.',
      'Built context around fintech systems and operational constraints.',
    ],
  },
];

const EDUCATION: EducationItem[] = [
  {
    type: 'edu',
    degree: 'BACHELOR OF TECHNOLOGY',
    field: 'ARTIFICIAL INTELLIGENCE',
    org: 'AMITY UNIVERSITY, NOIDA',
    orgUrl: 'https://www.linkedin.com/school/amity-university/posts/?feedView=all',
    period: 'SEP 2024 - SEP 2028',
    duration: '4 YEARS',
    mode: 'ON-CAMPUS',
    location: 'NOIDA, INDIA',
    status: 'IN PROGRESS',
    tags: ['BTECH', 'ARTIFICIAL INTELLIGENCE', 'COMPUTER SCIENCE'],
    description:
      'Pursuing a Bachelor of Technology in Artificial Intelligence with coursework across machine learning, computer vision, NLP, robotics, and full-stack development.',
    highlights: [
      'Studying AI fundamentals alongside computer science and engineering foundations.',
      'Applying coursework through web, robotics, and embedded systems projects.',
      'Building toward a 2028 graduation timeline.',
    ],
    skills: ['COMPUTER SCIENCE', 'ARTIFICIAL INTELLIGENCE', 'MACHINE LEARNING', 'NLP', 'ROBOTICS'],
  },
];

const STATS = [
  ['3', 'INTERNSHIPS'],
  ['4+', 'YEARS DEGREE'],
  ['2028', 'GRADUATING'],
  ['AI', 'FOCUS'],
];

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

function TimelineCard({ item, index }: { item: CardItem; index: number }) {
  const isEducation = item.type === 'edu';
  const title = isEducation ? item.degree : item.role;
  const subtitle = isEducation ? item.field : item.org;

  return (
    <article className="exp-card" style={{ animationDelay: `${index * 75}ms` }}>
      <div className="exp-node" aria-hidden="true">
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>

      <div className="exp-card-shell">
        <div className="exp-card-top">
          <span className="exp-type">{isEducation ? 'EDUCATION' : 'EXPERIENCE'}</span>
          <span className={`exp-status ${item.status === 'ACTIVE' || item.status === 'IN PROGRESS' ? 'is-live' : ''}`}>
            {item.status}
          </span>
        </div>

        <div className="exp-card-grid">
          <div className="exp-aside">
            <span className="exp-period">{item.period}</span>
            <div className="exp-meta-list">
              <span>{item.duration}</span>
              <span>{item.mode}</span>
              <span>{item.location}</span>
            </div>
          </div>

          <div className="exp-main">
            <div className="exp-heading-row">
              <div>
                <h2 className="exp-role">{title}</h2>
                <p className="exp-subrole">{subtitle}</p>
              </div>
              <a href={item.orgUrl} target="_blank" rel="noopener noreferrer" className="exp-org" aria-label={`Open ${item.org}`}>
                <span>{item.org}</span>
                <ExternalLinkIcon />
              </a>
            </div>

            <p className="exp-desc">{item.description}</p>

            <ul className="exp-highlights">
              {item.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            {'skills' in item && (
              <div className="exp-skills" aria-label="Education focus areas">
                {item.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            )}

            <div className="exp-tags" aria-label="Tags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ExperiencePage() {
  const pageRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const revealTargets = root.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(18px);
          will-change: transform, opacity;
        }

        .reveal.is-visible {
          animation: exp-rise 720ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
          animation-delay: var(--delay, 0ms);
        }

        @keyframes exp-rise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .exp-page {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
          padding: 136px 0 96px;
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }

        .exp-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 48px;
          align-items: end;
          margin-bottom: 48px;
        }

        .exp-eyebrow {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--accent);
          letter-spacing: 0.22em;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .exp-eyebrow::before {
          content: '';
          width: 30px;
          height: 1px;
          background: var(--accent);
          flex: 0 0 auto;
          box-shadow: 0 0 16px rgba(230, 51, 41, 0.55);
        }

        .exp-title {
          font-family: var(--display);
          font-size: clamp(2.5rem, 7vw, 5.4rem);
          font-weight: 900;
          color: #fff;
          line-height: 0.92;
          letter-spacing: 0;
          margin-bottom: 18px;
        }

        .exp-title span {
          color: var(--accent);
          text-shadow: 0 0 28px rgba(230, 51, 41, 0.35);
        }

        .exp-summary {
          font-family: var(--prose);
          color: #b1b1b1;
          font-size: clamp(14px, 1.35vw, 16px);
          line-height: 1.9;
          max-width: 62ch;
        }

        .exp-terminal {
          border: 1px solid rgba(230, 51, 41, 0.22);
          background:
            linear-gradient(180deg, rgba(230, 51, 41, 0.07), rgba(230, 51, 41, 0.015)),
            rgba(8, 8, 8, 0.72);
          padding: 18px;
          position: relative;
          overflow: hidden;
        }

        .exp-terminal::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(230, 51, 41, 0.08), transparent);
          transform: translateX(-100%);
          animation: exp-scan 4.5s linear infinite;
          pointer-events: none;
        }

        .exp-terminal:hover::before {
          animation-duration: 2.6s;
        }

        @keyframes exp-scan {
          to { transform: translateX(100%); }
        }

        .exp-terminal-line {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: #555;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .exp-terminal-line:last-child {
          border-bottom: none;
        }

        .exp-terminal-line strong {
          color: var(--accent);
          font-weight: 400;
          text-align: right;
        }

        .exp-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border: 1px solid #1a1a1a;
          background: rgba(255, 255, 255, 0.012);
          margin-bottom: 56px;
        }

        .exp-stat {
          padding: 20px 22px;
          border-right: 1px solid #1a1a1a;
          position: relative;
          min-width: 0;
          overflow: hidden;
        }

        .exp-stat:last-child {
          border-right: none;
        }

        .exp-stat::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(230, 51, 41, 0.65), transparent);
          opacity: 0.75;
        }

        .exp-stat::after {
          content: '';
          position: absolute;
          inset: auto -15% 0 -15%;
          height: 42%;
          background: radial-gradient(circle, rgba(230, 51, 41, 0.1), transparent 72%);
          transform: translateY(25%);
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .exp-stat:hover::after {
          opacity: 1;
        }

        .exp-stat-num {
          font-family: var(--display);
          color: var(--accent);
          font-size: clamp(1.5rem, 3vw, 2.15rem);
          font-weight: 900;
          line-height: 1;
          white-space: nowrap;
        }

        .exp-stat-label {
          font-family: var(--mono);
          color: #474747;
          font-size: 9px;
          letter-spacing: 0.18em;
          margin-top: 8px;
        }

        .exp-section {
          margin-bottom: 54px;
        }

        .exp-section-head {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          font-family: var(--mono);
          color: var(--accent);
          font-size: 10px;
          letter-spacing: 0.26em;
        }

        .exp-section-head::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(230, 51, 41, 0.28), transparent);
        }

        .exp-timeline {
          position: relative;
          display: grid;
          gap: 18px;
        }

        .exp-timeline::before {
          content: '';
          position: absolute;
          left: 23px;
          top: 18px;
          bottom: 18px;
          width: 1px;
          background: linear-gradient(to bottom, rgba(230, 51, 41, 0.5), rgba(230, 51, 41, 0.08));
        }

        .exp-card {
          position: relative;
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          gap: 18px;
          animation: exp-card-in 0.45s ease both;
        }

        @keyframes exp-card-in {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .exp-node {
          width: 48px;
          display: flex;
          justify-content: center;
          padding-top: 18px;
          position: relative;
          z-index: 2;
        }

        .exp-node span {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(230, 51, 41, 0.4);
          background: #080808;
          color: var(--accent);
          font-family: var(--mono);
          font-size: 10px;
          box-shadow: 0 0 20px rgba(230, 51, 41, 0.14);
          animation: exp-node-breathe 3.4s ease-in-out infinite;
        }

        @keyframes exp-node-breathe {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(230, 51, 41, 0.14);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 28px rgba(230, 51, 41, 0.22);
          }
        }

        .exp-card-shell {
          border: 1px solid #1c1c1c;
          background:
            linear-gradient(135deg, rgba(230, 51, 41, 0.05), transparent 40%),
            rgba(8, 8, 8, 0.72);
          transition: border-color 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          min-width: 0;
        }

        .exp-card-shell:hover {
          border-color: rgba(230, 51, 41, 0.36);
          background:
            linear-gradient(135deg, rgba(230, 51, 41, 0.075), transparent 44%),
            rgba(12, 8, 8, 0.86);
          box-shadow: 0 0 36px rgba(230, 51, 41, 0.08);
          transform: translateY(-3px);
        }

        .exp-card-shell::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.03) 50%, transparent 100%);
          transform: translateX(-120%);
          transition: transform 0.7s ease;
          pointer-events: none;
        }

        .exp-card-shell:hover::before {
          transform: translateX(120%);
        }

        .exp-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 12px 18px;
          border-bottom: 1px solid #131313;
        }

        .exp-type,
        .exp-status,
        .exp-period,
        .exp-meta-list,
        .exp-subrole,
        .exp-org,
        .exp-tags span,
        .exp-skills span {
          font-family: var(--mono);
        }

        .exp-type {
          color: var(--accent);
          font-size: 10px;
          letter-spacing: 0.2em;
        }

        .exp-status {
          color: #555;
          font-size: 9px;
          letter-spacing: 0.18em;
          border: 1px solid #202020;
          padding: 4px 9px;
        }

        .exp-status.is-live {
          color: var(--accent);
          border-color: rgba(230, 51, 41, 0.28);
          background: rgba(230, 51, 41, 0.06);
        }

        .exp-card-grid {
          display: grid;
          grid-template-columns: 210px minmax(0, 1fr);
        }

        .exp-aside {
          border-right: 1px solid #131313;
          padding: 28px 22px;
        }

        .exp-period {
          color: #d8d8d8;
          font-size: 11px;
          letter-spacing: 0.14em;
          line-height: 1.5;
          display: block;
          margin-bottom: 18px;
        }

        .exp-meta-list {
          display: grid;
          gap: 8px;
          color: #555;
          font-size: 9px;
          letter-spacing: 0.12em;
        }

        .exp-meta-list span {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .exp-meta-list span::before {
          content: '';
          width: 5px;
          height: 5px;
          border: 1px solid rgba(230, 51, 41, 0.35);
          background: rgba(230, 51, 41, 0.08);
          flex: 0 0 auto;
        }

        .exp-main {
          padding: 28px;
          min-width: 0;
        }

        .exp-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          margin-bottom: 18px;
        }

        .exp-role {
          font-family: var(--display);
          color: #fff;
          font-size: clamp(1rem, 2vw, 1.35rem);
          line-height: 1.25;
          letter-spacing: 0.04em;
          font-weight: 900;
          margin-bottom: 6px;
        }

        .exp-subrole {
          color: var(--accent);
          font-size: 10px;
          letter-spacing: 0.2em;
          line-height: 1.6;
        }

        .exp-org {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #646464;
          font-size: 10px;
          letter-spacing: 0.1em;
          line-height: 1.4;
          transition: color 0.18s ease;
          text-align: right;
          max-width: 220px;
        }

        .exp-org:hover {
          color: var(--accent);
        }

        .exp-org svg {
          flex: 0 0 auto;
          opacity: 0.58;
        }

        .exp-desc {
          font-family: var(--prose);
          color: #bebebe;
          font-size: 14px;
          line-height: 1.85;
          margin-bottom: 18px;
          max-width: 760px;
        }

        .exp-highlights {
          display: grid;
          gap: 9px;
          list-style: none;
          margin-bottom: 20px;
        }

        .exp-highlights li {
          position: relative;
          padding-left: 18px;
          color: #909090;
          font-family: var(--prose);
          font-size: 13px;
          line-height: 1.65;
        }

        .exp-highlights li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.75em;
          width: 8px;
          height: 1px;
          background: var(--accent);
        }

        .exp-skills,
        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .exp-skills {
          margin-bottom: 12px;
        }

        .exp-skills span {
          color: var(--accent);
          border: 1px solid rgba(230, 51, 41, 0.24);
          background: rgba(230, 51, 41, 0.055);
          padding: 4px 10px;
          font-size: 9px;
          letter-spacing: 0.12em;
        }

        .exp-tags span {
          color: #3f3f3f;
          border: 1px solid #1e1e1e;
          padding: 4px 10px;
          font-size: 9px;
          letter-spacing: 0.12em;
        }

        .exp-tags span:hover,
        .exp-skills span:hover {
          transform: translateY(-1px);
        }

        .exp-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 42px 0;
        }

        .exp-divider span {
          width: 8px;
          height: 8px;
          background: var(--accent);
          box-shadow: 0 0 16px rgba(230, 51, 41, 0.7);
          animation: exp-dot-pulse 2.6s ease-in-out infinite;
        }

        @keyframes exp-dot-pulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.35); opacity: 1; }
        }

        .exp-divider::before,
        .exp-divider::after {
          content: '';
          width: 90px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(230, 51, 41, 0.35));
        }

        .exp-divider::after {
          background: linear-gradient(90deg, rgba(230, 51, 41, 0.35), transparent);
        }

        @media (max-width: 860px) {
          .exp-page {
            width: min(100% - 28px, 1120px);
            padding-top: 116px;
          }

          .exp-hero {
            grid-template-columns: 1fr;
            gap: 28px;
            margin-bottom: 34px;
          }

          .exp-terminal {
            max-width: 420px;
          }

          .exp-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .exp-stat:nth-child(2) {
            border-right: none;
          }

          .exp-stat:nth-child(-n + 2) {
            border-bottom: 1px solid #1a1a1a;
          }

          .exp-card-grid {
            grid-template-columns: 1fr;
          }

          .exp-aside {
            border-right: none;
            border-bottom: 1px solid #131313;
            padding: 20px;
          }

          .exp-meta-list {
            display: flex;
            flex-wrap: wrap;
          }

          .exp-main {
            padding: 22px 20px;
          }

          .exp-heading-row {
            flex-direction: column;
            gap: 12px;
          }

          .exp-org {
            text-align: left;
            max-width: 100%;
          }
        }

        @media (max-width: 560px) {
          .exp-page {
            width: min(100% - 24px, 1120px);
            padding-bottom: 72px;
          }

          .exp-eyebrow {
            font-size: 9px;
            letter-spacing: 0.14em;
          }

          .exp-summary {
            font-size: 14px;
          }

          .exp-stats {
            grid-template-columns: 1fr;
          }

          .exp-stat,
          .exp-stat:nth-child(2) {
            border-right: none;
            border-bottom: 1px solid #1a1a1a;
          }

          .exp-stat:last-child {
            border-bottom: none;
          }

          .exp-timeline::before {
            display: none;
          }

          .exp-card {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .exp-node {
            width: auto;
            justify-content: flex-start;
            padding-top: 0;
          }

          .exp-card-top {
            align-items: flex-start;
            flex-direction: column;
            gap: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .reveal.is-visible,
          .exp-terminal::before,
          .exp-node span,
          .exp-divider span,
          .exp-card-shell::before {
            animation: none !important;
            transition: none !important;
          }

          .reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <main className="exp-page" ref={pageRef}>
        <section className="exp-hero reveal" data-reveal style={{ ['--delay' as string]: '0ms' }} aria-labelledby="experience-title">
          <div>
            <p className="exp-eyebrow">MASKEDHELP // KARTHIK KUMAR // TIMELINE</p>
            <h1 id="experience-title" className="exp-title">
              EXPERIENCE<span>_</span>
            </h1>
            <p className="exp-summary">
              A compact record of internships, engineering exposure, and AI-focused education. Built around practical systems work, software fundamentals, and a long-term interest in intelligent hardware.
            </p>
          </div>

          <aside className="exp-terminal" data-reveal style={{ ['--delay' as string]: '120ms' }} aria-label="Timeline summary">
            <div className="exp-terminal-line">
              <span>TRACK</span>
              <strong>AI + SYSTEMS</strong>
            </div>
            <div className="exp-terminal-line">
              <span>STATUS</span>
              <strong>BUILDING</strong>
            </div>
            <div className="exp-terminal-line">
              <span>BASE</span>
              <strong>INDIA</strong>
            </div>
          </aside>
        </section>

        <section className="exp-stats reveal" data-reveal style={{ ['--delay' as string]: '140ms' }} aria-label="Experience statistics">
          {STATS.map(([num, label]) => (
            <div key={label} className="exp-stat">
              <div className="exp-stat-num">{num}</div>
              <div className="exp-stat-label">{label}</div>
            </div>
          ))}
        </section>

        <section className="exp-section" data-reveal style={{ ['--delay' as string]: '180ms' }} aria-labelledby="work-heading">
          <h2 id="work-heading" className="exp-section-head">{'// 01 - WORK EXPERIENCE'}</h2>
          <div className="exp-timeline">
            {EXPERIENCE.map((item, index) => (
              <div key={`${item.org}-${item.role}`} className="reveal" data-reveal style={{ ['--delay' as string]: `${index * 110}ms` }}>
                <TimelineCard item={item} index={index} />
              </div>
            ))}
          </div>
        </section>

        <div className="exp-divider reveal" data-reveal style={{ ['--delay' as string]: '260ms' }} aria-hidden="true">
          <span />
        </div>

        <section className="exp-section" data-reveal style={{ ['--delay' as string]: '300ms' }} aria-labelledby="education-heading">
          <h2 id="education-heading" className="exp-section-head">{'// 02 - EDUCATION'}</h2>
          <div className="exp-timeline">
            {EDUCATION.map((item, index) => (
              <div key={`${item.org}-${item.degree}`} className="reveal" data-reveal style={{ ['--delay' as string]: `${(EXPERIENCE.length + index) * 110}ms` }}>
                <TimelineCard item={item} index={EXPERIENCE.length + index} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
