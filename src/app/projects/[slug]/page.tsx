import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { projects } from '@/data/projects'
import { team } from '@/data/team'

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

const STATUS_COLORS = {
  ACTIVE:   '#00d2d2',
  COMPLETE: '#e63329',
  RESEARCH: '#a78bfa',
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) notFound()

  const color = STATUS_COLORS[project.status]

  const members = team.filter(m =>
    project.team.some(name =>
      name.toLowerCase().includes(m.firstName.toLowerCase()) ||
      m.name?.toLowerCase().includes(name.toLowerCase())
    )
  )

  return (
    <>
      <style>{`
        .proj-back {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 2px;
          text-decoration: none; transition: color 0.2s;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .proj-back:hover { color: var(--accent); }

        .proj-github-btn {
          font-family: var(--mono); font-size: 11px;
          color: var(--accent); letter-spacing: 2px;
          border: 1px solid rgba(230,51,41,0.4);
          background: rgba(230,51,41,0.06);
          padding: 14px 28px;
          text-decoration: none; transition: all 0.2s;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .proj-github-btn:hover {
          background: rgba(230,51,41,0.14);
          box-shadow: 0 0 20px rgba(230,51,41,0.25);
        }

        .friend-chip {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px 8px 10px;
          border: 1px solid #2a2a2a;
          text-decoration: none; transition: all 0.2s;
        }
        .friend-chip:hover { border-color: var(--accent); }
        .friend-chip:hover .chip-name { color: var(--accent); }
        .chip-avatar {
          width: 28px; height: 28px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--display); font-size: 11px; font-weight: 900;
        }
        .chip-name {
          font-family: var(--mono); font-size: 10px;
          color: var(--text-dim); letter-spacing: 1px; transition: color 0.2s;
        }

        .stack-pill {
          font-family: var(--mono); font-size: 10px;
          padding: 6px 14px; letter-spacing: 1.5px;
          border: 1px solid rgba(230,51,41,0.2);
          color: var(--accent); background: rgba(230,51,41,0.06);
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

        /* mobile */
        @media (max-width: 768px) {
          .proj-hero-grid { grid-template-columns: 1fr !important; }
          .proj-meta-row { flex-direction: column !important; gap: 12px !important; }
        }
      `}</style>

      <main style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: 'clamp(100px,14vw,120px) clamp(16px,4vw,40px) 80px' }}>

        {/* Back */}
        <Link href="/projects" className="proj-back" style={{ marginBottom: '40px', display: 'inline-flex' }}>
          ← BACK TO PROJECTS
        </Link>

        {/* Hero */}
        <div style={{ marginTop: '32px', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '3px' }}>{project.year}</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 12px', letterSpacing: '2px', border: `1px solid ${color}44`, color, background: `${color}11` }}>
              {project.status}
            </span>
          </div>

          <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, color: '#fff', lineHeight: 0.95, letterSpacing: '-0.5px', marginBottom: '10px' }}>
            {project.name}
          </h1>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '4px' }}>
            {project.subtitle}
          </p>
        </div>

        {/* Highlight callout */}
        <div style={{ border: `1px solid ${color}33`, background: `${color}08`, padding: '24px 28px', marginBottom: '48px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color, letterSpacing: '3px', marginBottom: '8px' }}>// KEY HIGHLIGHT</div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '13px', color: '#fff', letterSpacing: '1px', lineHeight: 1.6 }}>{project.highlight}</p>
        </div>

        {/* Long description */}
        <div className="sec-label">// OVERVIEW</div>
        <p style={{ fontFamily: 'var(--prose)', fontSize: '15px', color: 'var(--text)', lineHeight: 1.85, marginBottom: '48px' }}>
          {project.longDescription}
        </p>

        {/* Stack */}
        <div className="sec-label">// TECH STACK</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
          {project.stack.map(s => <span key={s} className="stack-pill">{s}</span>)}
        </div>

        {/* Team */}
        {members.length > 0 && (
          <>
            <div className="sec-label">// BUILT WITH</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '48px' }}>
              {members.map(m => (
                <Link key={m.slug} href={`/friends/${m.slug}`} className="friend-chip">
                  <div className="chip-avatar" style={{ background: m.accentFaint, border: `1px solid ${m.accentDim}`, color: m.accent }}>
                    {m.firstName[0]}
                  </div>
                  <span className="chip-name">{m.firstName} {m.lastName}</span>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Solo project note */}
        {members.length === 0 && (
          <>
            <div className="sec-label">// BUILT BY</div>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--text-dim)', letterSpacing: '2px', marginBottom: '48px' }}>
              KARTHIK KUMAR // SOLO PROJECT
            </p>
          </>
        )}

        {/* GitHub CTA */}
        {project.github ? (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="proj-github-btn">
            ⌥ VIEW SOURCE ON GITHUB →
          </a>
        ) : (
          <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '2px', padding: '14px 0', borderTop: '1px solid #1a1a1a' }}>
            // REPOSITORY NOT YET PUBLIC
          </div>
        )}

      </main>
    </>
  )
}