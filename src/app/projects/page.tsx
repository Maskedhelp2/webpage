'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'


export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto', padding: '120px 40px 80px' }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: '11px',
          color: 'var(--accent)', letterSpacing: '4px',
          marginBottom: '20px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--accent)', display: 'block' }} />
          MASKEDHELP // PROJECTS
        </div>

        <h1 style={{
          fontFamily: 'var(--display)', fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 900, color: '#fff', lineHeight: 1,
          marginBottom: '16px', letterSpacing: '-0.5px',
        }}>
          WHAT WE <span style={{ color: 'var(--accent)' }}>BUILD</span>
        </h1>

        <p style={{
          fontFamily: 'var(--prose)', fontSize: '15px',
          color: 'var(--text)', lineHeight: 1.75,
          maxWidth: '560px', marginBottom: '60px',
        }}>
          Hardware that ships. Software that works. Research that pushes forward.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </main>
    </>
  )
}