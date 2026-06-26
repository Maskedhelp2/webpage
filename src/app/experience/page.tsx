'use client';

const EXPERIENCE = [
  {
    type: 'work',
    role: 'INTERN',
    org: 'KARVY INNOTECH LTD.',
    orgUrl: 'https://www.linkedin.com/company/karvy-innotech-ltd/',
    period: 'DEC 2025 — APR 2026',
    duration: '5 MONTHS',
    mode: 'HYBRID',
    location: 'INDIA',
    tags: ['INTERNSHIP', 'FINTECH', 'HYBRID'],
    description: 'Worked as a technology intern at Karvy Innotech, one of India\'s leading financial technology firms. Contributed to internal tooling and software development within a hybrid work environment.',
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

function Card({ item }: { item: CardItem }) {
  const isEdu = item.type === 'edu';

  return (
    <div className="exp-card">
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
                <span>{item.degree}</span>
                <span className="exp-role-accent"> // {item.field}</span>
              </>
            )}
          </div>
          <a
            href={item.orgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="exp-org"
          >
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

          {/* Skills pills (education only) */}
          {'skills' in item && item.skills && (
            <div className="exp-skills">
              {item.skills.map(s => (
                <span key={s} className="exp-skill-tag">{s}</span>
              ))}
            </div>
          )}

          {/* Tags */}
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
        .exp-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 140px 2rem 6rem;
          min-height: 100vh;
        }

        /* ── Header ── */
        .exp-eyebrow {
          font-family: var(--mono);
          font-size: 11px;
          color: #e63329;
          letter-spacing: 0.2em;
          margin-bottom: 1rem;
        }
        .exp-title {
          font-family: var(--display);
          font-size: clamp(2.2rem, 6vw, 4.5rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.05em;
          line-height: 0.95;
          margin-bottom: 0.6rem;
        }
        .exp-title-accent { color: #e63329; }
        .exp-subtitle {
          font-family: var(--mono);
          font-size: 12px;
          color: #777;
          letter-spacing: 0.15em;
          margin-bottom: 4rem;
        }

        /* ── Stats row ── */
        .exp-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 5rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .exp-stat-num {
          font-family: var(--display);
          font-size: 2rem;
          font-weight: 900;
          color: #e63329;
          line-height: 1;
        }
        .exp-stat-label {
          font-family: var(--mono);
          font-size: 10px;
          color: #555;
          letter-spacing: 0.15em;
          margin-top: 4px;
        }
        .exp-stat-divider {
          width: 1px;
          height: 40px;
          background: #1a1a1a;
        }

        /* ── Section label ── */
        .exp-section-label {
          font-family: var(--mono);
          font-size: 10px;
          color: #e63329;
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
          background: linear-gradient(90deg, rgba(230,51,41,0.3), transparent);
        }
        .exp-section { margin-bottom: 4rem; }

        /* ── Card ── */
        .exp-card {
          border: 1px solid #1a1a1a;
          background: rgba(255,255,255,0.015);
          position: relative;
          margin-bottom: 1.5rem;
          transition: border-color 0.3s ease;
        }
        .exp-card:hover {
          border-color: rgba(230,51,41,0.3);
        }
        .exp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, #e63329, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .exp-card:hover::before { opacity: 1; }

        .exp-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem 0.75rem;
          border-bottom: 1px solid #111;
        }
        .exp-type-badge {
          font-family: var(--mono);
          font-size: 10px;
          color: #e63329;
          letter-spacing: 0.2em;
        }
        .exp-period {
          font-family: var(--mono);
          font-size: 10px;
          color: #555;
          letter-spacing: 0.15em;
        }

        .exp-card-body {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 2rem;
          padding: 2rem 1.5rem;
        }

        .exp-role {
          font-family: var(--display);
          font-size: clamp(1rem, 2vw, 1.4rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.06em;
          line-height: 1.2;
          margin-bottom: 0.75rem;
        }
        .exp-role-accent { color: #e63329; }

        .exp-org {
          font-family: var(--mono);
          font-size: 12px;
          color: #888;
          letter-spacing: 0.1em;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 1.25rem;
          transition: color 0.2s;
        }
        .exp-org:hover { color: #e63329; }
        .exp-org-icon {
          opacity: 0.5;
          display: flex;
          align-items: center;
        }
        .exp-org:hover .exp-org-icon { opacity: 1; }

        .exp-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .exp-meta-chip {
          font-family: var(--mono);
          font-size: 9px;
          color: #666;
          border: 1px solid #1e1e1e;
          padding: 3px 10px;
          letter-spacing: 0.12em;
        }

        .exp-desc {
          font-family: var(--body, 'Rajdhani', sans-serif);
          font-size: 15px;
          color: #999;
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }

        .exp-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .exp-skill-tag {
          font-family: var(--mono);
          font-size: 9px;
          color: #e63329;
          border: 1px solid rgba(230,51,41,0.25);
          background: rgba(230,51,41,0.05);
          padding: 3px 10px;
          letter-spacing: 0.1em;
        }

        .exp-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .exp-tag {
          font-family: var(--mono);
          font-size: 9px;
          color: #444;
          border: 1px solid #1a1a1a;
          padding: 3px 10px;
          letter-spacing: 0.1em;
        }

        .exp-card-bottom {
          height: 2px;
          background: linear-gradient(90deg, #e63329, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .exp-card:hover .exp-card-bottom { opacity: 0.4; }

        /* ── Timeline connector ── */
        .exp-timeline-dot {
          width: 8px;
          height: 8px;
          background: #e63329;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(230,51,41,0.5);
          margin: 0 auto 1.5rem;
        }
        .exp-timeline-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, #e63329, transparent);
          margin: 0 auto 1.5rem;
        }

        @media (max-width: 768px) {
          .exp-card-body { grid-template-columns: 1fr; gap: 1rem; }
          .exp-page { padding: 130px 1rem 4rem; }
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
            ['1', 'INTERNSHIP'],
            ['5', 'MONTHS EXP'],
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

        {/* Work Experience */}
        <div className="exp-section">
          <div className="exp-section-label">// 01 · WORK EXPERIENCE</div>
          {EXPERIENCE.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </div>

        {/* Timeline connector */}
        <div className="exp-timeline-dot" />
        <div className="exp-timeline-line" />

        {/* Education */}
        <div className="exp-section">
          <div className="exp-section-label">// 02 · EDUCATION</div>
          {EDUCATION.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </div>

      </main>
    </>
  );
}