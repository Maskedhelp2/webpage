import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { projects } from '@/data/projects'
import { team } from '@/data/team'
import DeskHelper from "@/app/projects/desk-helper/page";
import SlamNav from "@/app/projects/slam-nav/page";

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE:   '#00d2d2',
  COMPLETE: '#e63329',
  RESEARCH: '#a78bfa',
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) notFound()

  if (params.slug === "desk-helper") {
  return <DeskHelper />;
}

  if (params.slug === "slam-nav") {
  return <SlamNav />;
}

  const color = STATUS_COLORS[project.status]

  const members = team.filter(m =>
    project.team.some(name =>
      name.toLowerCase().includes(m.firstName.toLowerCase()) ||
      m.name.toLowerCase().includes(name.toLowerCase())
    )
  )

  return (
    <>
      <style>{`
        .proj-detail-back {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 2px;
          text-decoration: none; display: inline-flex;
          align-items: center; gap: 8px; transition: color 0.2s;
          margin-bottom: 48px; display: inline-flex;
        }
        .proj-detail-back:hover { color: var(--accent); }

        .proj-stack-tag {
          font-family: var(--mono); font-size: 10px;
          padding: 6px 14px; letter-spacing: 1.5px;
          border: 1px solid rgba(230,51,41,0.25);
          color: var(--accent); background: rgba(230,51,41,0.06);
          transition: all 0.2s;
        }
        .proj-stack-tag:hover {
          background: rgba(230,51,41,0.14);
          box-shadow: 0 0 10px rgba(230,51,41,0.2);
        }

        .proj-github-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--mono); font-size: 12px;
          color: var(--accent); letter-spacing: 2px;
          border: 1px solid rgba(230,51,41,0.4);
          background: rgba(230,51,41,0.06);
          padding: 14px 28px; text-decoration: none;
          transition: all 0.2s;
        }
        .proj-github-btn:hover {
          background: rgba(230,51,41,0.14);
          box-shadow: 0 0 20px rgba(230,51,41,0.25);
        }

        .friend-chip {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 8px 16px 8px 10px;
          border: 1px solid #2a2a2a;
          text-decoration: none; transition: all 0.2s;
        }
        .friend-chip:hover { border-color: var(--accent); }
        .friend-chip:hover .fc-name { color: var(--accent); }
        .fc-avatar {
          width: 28px; height: 28px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--display); font-size: 11px; font-weight: 900;
        }
        .fc-name {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 1px;
          transition: color 0.2s;
        }

        .sec-label {
          font-family: var(--mono); font-size: 10px;
          color: var(--accent); letter-spacing: 4px;
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px;
        }
        .sec-label::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(230,51,41,0.3), transparent);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .proj-detail-main { padding: 100px 16px 60px !important; }
          .proj-detail-title { font-size: clamp(1.8rem, 8vw, 3rem) !important; }
          .proj-meta-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <Header />

      <main
        className="proj-detail-main"
        style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '120px 40px 80px' }}
      >
        {/* Back */}
        <Link href="/projects" className="proj-detail-back">← BACK TO PROJECTS</Link>

        {/* Eyebrow */}
        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '4px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--accent)', display: 'block' }} />
          {project.subtitle}
        </div>

        {/* Title */}
        <h1
          className="proj-detail-title"
          style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.5px', marginBottom: '24px' }}
        >
          {project.name}
        </h1>

        {/* Meta row */}
        <div
          className="proj-meta-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '0', marginBottom: '48px', border: '1px solid #1a1a1a', width: 'fit-content' }}
        >
          {[
            ['YEAR',   project.year],
            ['STATUS', project.status],
            ['TEAM',   `${project.team.length} MEMBER${project.team.length > 1 ? 'S' : ''}`],
          ].map(([label, val], i) => (
            <div key={label} style={{
              padding: '14px 24px',
              borderRight: i < 2 ? '1px solid #1a1a1a' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--text-dim)', letterSpacing: '3px', marginBottom: '6px' }}>{label}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: label === 'STATUS' ? color : '#fff', letterSpacing: '2px' }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Highlight bar */}
        <div style={ {paddingLeft: '20px', marginBottom: '48px', background: 'rgba(230,51,41,0.03)', padding: '20px 20px 20px 20px', borderLeft: '2px solid var(--accent)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
          <div style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--accent)', letterSpacing: '3px', marginBottom: '10px' }}>// KEY HIGHLIGHT</div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: '#fff', letterSpacing: '1px', lineHeight: 1.7 }}>{project.highlight}</p>
        </div>

        {/* Long description */}
        <div className="sec-label">// OVERVIEW</div>
        <p style={{ fontFamily: 'var(--prose)', fontSize: '15px', color: 'var(--text)', lineHeight: 1.85, marginBottom: '48px' }}>
          {project.longDescription}
        </p>

        {/* Stack */}
        <div className="sec-label">// TECH STACK</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
          {project.stack.map(s => (
            <span key={s} className="proj-stack-tag">{s}</span>
          ))}
        </div>

        {/* Team */}
        {members.length > 0 && (
          <>
            <div className="sec-label">// TEAM</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '48px' }}>
              {members.map(m => (
                <Link key={m.slug} href={`/friends/${m.slug}`} className="friend-chip">
                  <div className="fc-avatar" style={{ background: m.accentFaint, border: `1px solid ${m.accentDim}`, color: m.accent }}>
                    {m.firstName[0]}
                  </div>
                  <span className="fc-name">{m.firstName} {m.lastName}</span>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-github-btn">
              ⌥ VIEW ON GITHUB →
            </a>
          )}
          <Link href="/projects" className="proj-detail-back" style={{ marginBottom: 0, border: '1px solid #1a1a1a', padding: '14px 28px' }}>
            ← ALL PROJECTS
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}