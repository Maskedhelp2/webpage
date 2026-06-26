'use client'

import Link from 'next/link'
import type { Project } from '@/data/projects'
import { team } from '@/data/team'

const STATUS_COLORS: Record<Project['status'], string> = {
  ACTIVE:   '#00d2d2',
  COMPLETE: '#e63329',
  RESEARCH: '#a78bfa',
}

export default function ProjectCard({ project }: { project: Project }) {
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
        .proj-card {
          border: 1px solid rgba(230,51,41,0.2);
          background: rgba(230,51,41,0.04);
          padding: 32px;
          position: relative;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .proj-card:hover {
          border-color: rgba(230,51,41,0.45);
          background: rgba(230,51,41,0.07);
          box-shadow: 0 0 40px rgba(230,51,41,0.08);
        }
        .proj-card:hover .proj-top-line { opacity: 1; }

        .proj-top-line {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(230,51,41,0.6), transparent);
          opacity: 0.4; transition: opacity 0.25s;
        }

        .proj-view-btn {
          font-family: var(--mono); font-size: 11px;
          color: var(--accent); letter-spacing: 2px;
          border: 1px solid rgba(230,51,41,0.35);
          background: rgba(230,51,41,0.06);
          padding: 10px 20px;
          display: inline-flex; align-items: center; gap: 8px;
          text-decoration: none; transition: all 0.2s;
        }
        .proj-view-btn:hover {
          background: rgba(230,51,41,0.14);
          box-shadow: 0 0 16px rgba(230,51,41,0.25);
          gap: 12px;
        }

        .proj-github-btn-${project.slug} {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 2px;
          border: 1px solid #2a2a2a;
          padding: 10px 20px;
          display: inline-flex; align-items: center; gap: 8px;
          text-decoration: none; transition: all 0.2s;
        }
        .proj-github-btn-${project.slug}:hover {
          color: var(--accent); border-color: var(--accent);
        }

        .friend-chip {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px 6px 8px;
          border: 1px solid #2a2a2a;
          text-decoration: none; transition: all 0.2s;
        }
        .friend-chip:hover { border-color: var(--accent); }
        .friend-chip:hover .friend-chip-name { color: var(--accent); }
        .friend-avatar {
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--display); font-size: 10px; font-weight: 900;
          flex-shrink: 0;
        }
        .friend-chip-name {
          font-family: var(--mono); font-size: 10px;
          color: var(--text-dim); letter-spacing: 1px;
          transition: color 0.2s;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .proj-card { padding: 20px 16px; }
          .proj-card-actions { flex-direction: column !important; }
          .proj-card-actions a { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="proj-card">
        <div className="proj-top-line" />

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '3px' }}>{project.year}</div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px', letterSpacing: '2px', border: `1px solid ${color}33`, color, background: `${color}11` }}>
            {project.status}
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: 900, color: '#fff', letterSpacing: '1px', marginBottom: '4px' }}>
          {project.name}
        </h3>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '3px', marginBottom: '16px' }}>
          {project.subtitle}
        </p>
        <p style={{ fontFamily: 'var(--prose)', fontSize: '14px', color: 'var(--text)', lineHeight: 1.75, marginBottom: '20px' }}>
          {project.description}
        </p>

        {/* Highlight */}
        <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '14px', marginBottom: '20px' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1px', lineHeight: 1.6 }}>
            {project.highlight}
          </p>
        </div>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
          {project.stack.map(s => (
            <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px', border: '1px solid rgba(230,51,41,0.2)', color: 'var(--accent)', background: 'rgba(230,51,41,0.06)' }}>
              {s}
            </span>
          ))}
        </div>

        {/* Team */}
        {members.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '3px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              // FRIENDS ON THIS
              <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(230,51,41,0.3), transparent)' }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {members.map(m => (
                <Link key={m.slug} href={`/friends/${m.slug}`} className="friend-chip">
                  <div className="friend-avatar" style={{ background: m.accentFaint, border: `1px solid ${m.accentDim}`, color: m.accent }}>
                    {m.firstName[0]}
                  </div>
                  <span className="friend-chip-name">{m.firstName} {m.lastName}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="proj-card-actions" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link href={`/projects/${project.slug}`} className="proj-view-btn">
            VIEW PROJECT →
          </Link>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={`proj-github-btn-${project.slug}`}>
              ⌥ GITHUB
            </a>
          )}
        </div>
      </div>
    </>
  )
}