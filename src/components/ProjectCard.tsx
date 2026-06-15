'use client'

import Link from 'next/link'
import type { Project } from '@/data/projects'
import { team } from '@/data/team'

const STATUS_COLORS: Record<Project['status'], string> = {
  ACTIVE: '#00d2d2',
  COMPLETE: '#e63329',
  RESEARCH: '#a78bfa',
}

export default function ProjectCard({ project }: { project: Project }) {
  const color = STATUS_COLORS[project.status]

  // Match team members by name
  const members = team.filter(m =>
    project.team.some(name =>
      name.toLowerCase().includes(m.firstName.toLowerCase()) ||
      m.name.toLowerCase().includes(name.toLowerCase())
    )
  )

  return (
    <>
      <style>{`
        .proj-card { border: 1px solid rgba(230,51,41,0.2); background: rgba(230,51,41,0.04); padding: 32px; position: relative; }
        .proj-github-${project.slug} {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 2px;
          border: 1px solid #2a2a2a; padding: 10px 20px;
          display: inline-block; transition: all 0.2s; text-decoration: none;
        }
        .proj-github-${project.slug}:hover { color: var(--accent); border-color: var(--accent); }

        .friend-chip {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px 6px 8px;
          border: 1px solid #2a2a2a;
          text-decoration: none;
          transition: all 0.2s;
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
      `}</style>

      <div className="proj-card">
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(230,51,41,0.5), transparent)' }} />

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-dim)', letterSpacing: '3px' }}>{project.year}</div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px', letterSpacing: '2px', border: `1px solid ${color}33`, color, background: `${color}11` }}>
            {project.status}
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--display)', fontSize: '22px', fontWeight: 900, color: '#fff', letterSpacing: '1px', marginBottom: '4px' }}>{project.name}</h3>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '3px', marginBottom: '16px' }}>{project.subtitle}</p>
        <p style={{ fontFamily: 'var(--prose)', fontSize: '14px', color: 'var(--text)', lineHeight: 1.75, marginBottom: '20px' }}>{project.description}</p>

        {/* Highlight */}
        <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '14px', marginBottom: '20px' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '1px', lineHeight: 1.6 }}>{project.highlight}</p>
        </div>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
          {project.stack.map(s => (
            <span key={s} style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px', border: '1px solid rgba(230,51,41,0.2)', color: 'var(--accent)', background: 'rgba(230,51,41,0.06)' }}>{s}</span>
          ))}
        </div>

        {/* Friends / team members */}
        {members.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
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

        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className={`proj-github-${project.slug}`}>
            ⌥ VIEW ON GITHUB →
          </a>
        )}
      </div>
    </>
  )
}
