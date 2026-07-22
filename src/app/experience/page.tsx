'use client';

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
    tags: ['INTERNSHIP', 'MANUFACTURING', 'REMOTE'],
    description: 'Interned at IndCasting.com, a platform in the casting and manufacturing industry. Gained hands-on exposure to industrial workflows and contributed to technical development work.',
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
  },
];

type WorkItem = typeof EXPERIENCE[number];
type EducationItem = typeof EDUCATION[number];
type CardItem = WorkItem | EducationItem;

function ExternalLink() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function Card({ item, index }: { item: CardItem; index: number }) {
  const isEdu = item.type === 'edu';

  return (
    <div className="exp-card" style={{ animationDelay: `${index * 80}ms` }}>

      {/* Top bar */}
      <div className="exp-card-top">
        <div className="exp-type-badge">
          {isEdu ? '// EDUCATION' : '// EXPERIENCE'}
        </div>
        <div className="exp-period">{item.period}</div>
      </div>

      {/* Main content */}
      <div className="exp-card-body">

        {/* Left — title block */}
        <div className="exp-left">
          <div className="exp-role">
            {'role' in item ? (
              item.role
            ) : (
              <>
                {(item as EducationItem).degree}
                <span className="exp-role-accent">
                  <br />// {(item as EducationItem).field}
                </span>
              </>
            )}
          </div>

          <a href={item.orgUrl} target="_blank" rel="noopener noreferrer" className="exp-org">
            {item.org}
            <span className="exp-org-icon"><ExternalLink /></span>
          </a>

          <div className="exp-meta-row">
            <span className="exp-meta-chip">{item.duration}</span>
            <span className="exp-meta-chip">{item.mode}</span>
            <span className="exp-meta-chip">{item.location}</span>
          </div>
        </div>

        {/* Right — description */}
        <div className="exp-right">
          <p className="exp-desc">{item.description}</p>

          {'skills' in item && item.skills && (
            <div className="exp-skills">
              {(item as EducationItem).skills!.map(s => (
                <span key={s} className="exp-skill-tag">{s}</span>
              ))}
            </div>
          )}

          <div className="exp-tags">
            {item.tags.map(t => (
              <span key={t} className="exp-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="exp-card-bottom" />
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <>
      <style>{`

        /* ── PAGE ── */
        .exp-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 140px 2rem 8rem;
          min-height: 100vh;
          position: relative;
          z-index: 1;
        }

        /* ── HEADER ── */
        .exp-eyebrow {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--accent, #e63329);
          letter-spacing: 0.22em;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .exp-eyebrow::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: var(--accent, #e63329);
          flex-shrink: 0;
        }

        .exp-title {
          font-family: var(--display);
          font-size: clamp(2.4rem, 7vw, 5rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 0.92;
          margin-bottom: 0.5rem;
        }
        .exp-title-accent { color: var(--accent, #e63329); }

        .exp-subtitle {
          font-family: var(--mono);
          font-size: 11px;
          color: #555;
          letter-spacing: 0.18em;
          margin-bottom: 4rem;
        }

        /* ── STATS ── */
        .exp-stats {
          display: flex;
          gap: 0;
          margin-bottom: 5rem;
          border: 1px solid #1a1a1a;
          width: fit-content;
          flex-wrap: wrap;
        }
        .exp-stat {
          padding: 18px 28px;
          border-right: 1px solid #1a1a1a;
          position: relative;
        }
        .exp-stat:last-child { border-right: none; }
        .exp-stat::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, var(--accent, #e63329), transparent);
        }
        .exp-stat-num {
          font-family: var(--display);
          font-size: 2rem;
          font-weight: 900;
          color: var(--accent, #e63329);
          line-height: 1;
        }
        .exp-stat-label {
          font-family: var(--mono);
          font-size: 9px;
          color: #444;
          letter-spacing: 0.18em;
          margin-top: 6px;
        }

        /* ── SECTION LABEL ── */
        .exp-section-label {
          font-family: var(--mono);
          font-size: 10px;
          color: var(--accent, #e63329);
          letter-spacing: 0.3em;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .exp-section-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(230,51,41,0.25), transparent);
        }
        .exp-section { margin-bottom: 4rem; }

        /* ── CARD ── */
        .exp-card {
          border: 1px solid #1c1c1c;
          background: rgba(8,8,8,0.6);
          position: relative;
          margin-bottom: 1px;
          transition: border-color 0.25s, background 0.25s;
          animation: card-in 0.5s both;
        }
        .exp-card:last-child { margin-bottom: 0; }

        @keyframes card-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .exp-card:hover {
          border-color: rgba(230,51,41,0.25);
          background: rgba(12,8,8,0.8);
        }
        .exp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, #e63329 0%, rgba(230,51,41,0.15) 60%, transparent 100%);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .exp-card:hover::before { opacity: 1; }

        .exp-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          border-bottom: 1px solid #111;
          background: rgba(230,51,41,0.02);
        }
        .exp-type-badge {
          font-family: var(--mono);
          font-size: 10px;
          color: var(--accent, #e63329);
          letter-spacing: 0.2em;
        }
        .exp-period {
          font-family: var(--mono);
          font-size: 10px;
          color: #444;
          letter-spacing: 0.15em;
        }

        .exp-card-body {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 0;
          padding: 0;
        }

        .exp-left {
          padding: 28px 24px;
          border-right: 1px solid #111;
        }

        .exp-right {
          padding: 28px 28px;
        }

        .exp-role {
          font-family: var(--display);
          font-size: clamp(0.9rem, 1.8vw, 1.2rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.04em;
          line-height: 1.3;
          margin-bottom: 12px;
        }
        .exp-role-accent {
          color: var(--accent, #e63329);
          font-size: 0.82em;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .exp-org {
          font-family: var(--mono);
          font-size: 11px;
          color: #666;
          letter-spacing: 0.08em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 16px;
          transition: color 0.2s;
          line-height: 1.4;
        }
        .exp-org:hover { color: var(--accent, #e63329); }
        .exp-org-icon { opacity: 0.4; display: flex; align-items: center; flex-shrink: 0; }
        .exp-org:hover .exp-org-icon { opacity: 1; }

        .exp-meta-row { display: flex; flex-direction: column; gap: 6px; }
        .exp-meta-chip {
          font-family: var(--mono);
          font-size: 9px;
          color: #555;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .exp-meta-chip::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #2a2a2a;
          flex-shrink: 0;
        }

        .exp-desc {
          font-family: 'Inter', var(--prose, sans-serif);
          font-size: 14px;
          color: #aaa;
          line-height: 1.8;
          margin-bottom: 20px;
          font-weight: 400;
        }

        .exp-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }
        .exp-skill-tag {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--accent, #e63329);
          border: 1px solid rgba(230,51,41,0.2);
          background: rgba(230,51,41,0.04);
          padding: 3px 10px;
          letter-spacing: 0.1em;
        }

        .exp-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .exp-tag {
          font-family: var(--mono);
          font-size: 9px;
          color: #333;
          border: 1px solid #1c1c1c;
          padding: 3px 10px;
          letter-spacing: 0.1em;
        }

        .exp-card-bottom {
          height: 1px;
          background: linear-gradient(90deg, rgba(230,51,41,0.5), transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .exp-card:hover .exp-card-bottom { opacity: 1; }

        /* ── TIMELINE ── */
        .exp-timeline {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          margin: 32px auto;
          width: fit-content;
        }
        .exp-timeline-dot {
          width: 8px;
          height: 8px;
          background: var(--accent, #e63329);
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(230,51,41,0.6);
        }
        .exp-timeline-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, var(--accent, #e63329), transparent);
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .exp-page { padding: 120px 1rem 5rem; }
          .exp-card-body { grid-template-columns: 1fr; }
          .exp-left { border-right: none; border-bottom: 1px solid #111; padding: 20px 20px 16px; }
          .exp-right { padding: 20px; }
          .exp-meta-row { flex-direction: row; flex-wrap: wrap; gap: 6px; }
          .exp-meta-chip { flex-direction: row; }
          .exp-stats { width: 100%; }
          .exp-stat { flex: 1; min-width: 80px; padding: 14px 16px; }
        }

      `}</style>

      <main className="exp-page">

        {/* Header */}
        <p className="exp-eyebrow">MASKEDHELP // KARTHIK KUMAR // TIMELINE</p>
        <h1 className="exp-title">
          EXPERIENCE<span className="exp-title-accent">_</span>
        </h1>
        <p className="exp-subtitle">EDUCATION · WORK · INTERNSHIPS</p>

        {/* Stats */}
        <div className="exp-stats">
          {[
            ['3',       'INTERNSHIPS'],
            ['5+',      'MONTHS EXP'],
            ['2028',    'GRADUATING'],
            ['BTech AI','DEGREE'],
          ].map(([num, label]) => (
            <div key={label} className="exp-stat">
              <div className="exp-stat-num">{num}</div>
              <div className="exp-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Work */}
        <div className="exp-section">
          <div className="exp-section-label">// 01 · WORK EXPERIENCE</div>
          {EXPERIENCE.map((item, i) => (
            <Card key={i} item={item} index={i} />
          ))}
        </div>

        {/* Connector */}
        <div className="exp-timeline">
          <div className="exp-timeline-dot" />
          <div className="exp-timeline-line" />
        </div>

        {/* Education */}
        <div className="exp-section">
          <div className="exp-section-label">// 02 · EDUCATION</div>
          {EDUCATION.map((item, i) => (
            <Card key={i} item={item} index={i} />
          ))}
        </div>

      </main>
    </>
  );
}