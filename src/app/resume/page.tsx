'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { team } from '@/data/team'

export default function ResumePage() {
  return (
    <>
      <style>{`
        .resume-dl { transition: box-shadow 0.2s; }
        .resume-dl:hover { box-shadow: 0 0 12px rgba(230,51,41,0.35); }
      `}</style>
      <Header />
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto', padding: '120px 40px 80px' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--accent)', display: 'block' }} />
          MASKEDHELP // RESUME
        </div>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '40px', letterSpacing: '-0.5px' }}>
          CV / <span style={{ color: 'var(--accent)' }}>RESUMES</span>
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {team.map(member => (
            <div key={member.slug} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              border: `1px solid ${member.accentDim}`, background: member.accentFaint,
              padding: '20px 28px', flexWrap: 'wrap', gap: '16px', position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)` }} />
              <div>
                <div style={{ fontFamily: 'var(--display)', fontSize: '16px', fontWeight: 900, color: '#fff', letterSpacing: '1px', marginBottom: '4px' }}>
                  {member.firstName} <span style={{ color: member.accent }}>{member.lastName}</span>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '2px' }}>{member.role}</div>
              </div>
              {member.resumeFile ? (
                <a href={member.resumeFile} target="_blank" rel="noopener noreferrer" className="resume-dl" style={{
                  fontFamily: 'var(--mono)', fontSize: '11px', padding: '12px 24px',
                  border: `1px solid ${member.accentDim}`, background: member.accentFaint,
                  color: member.accent, letterSpacing: '2px', textDecoration: 'none',
                }}>
                  ↓ DOWNLOAD PDF
                </a>
              ) : (
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '2px' }}>COMING SOON</span>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}