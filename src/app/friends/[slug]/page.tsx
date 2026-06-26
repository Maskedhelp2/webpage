import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { team } from '@/data/team'

export async function generateStaticParams() {
  return team.map((member) => ({
    slug: member.slug,
  }))
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const member = team.find((m) => m.slug === slug)

  if (!member) {
    notFound()
  }

  const {
    firstName,
    lastName,
    role,
    eyebrow,
    bio,
    skills,
    funFact,
    accent,
    accentGlow,
    accentFaint,
    accentDim,
    github,
    githubHandle,
    linkedin,
    resumeFile,
  } = member

  return (
    <>
      <style>{`
        :root { --accent: ${accent}; --accent-glow: ${accentGlow}; --accent-faint: ${accentFaint}; --accent-dim: ${accentDim}; }
        nav { border-bottom-color: ${accentDim} !important; }
        .profile-link {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 24px; border: 1px solid #2a2a2a;
          font-family: var(--mono); font-size: 12px;
          color: var(--text-dim); letter-spacing: 2px;
          transition: all 0.2s; text-decoration: none;
        }
        .profile-link:hover { border-color: ${accent}; color: ${accent}; box-shadow: 0 0 16px ${accentGlow}; }
        .resume-link {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 24px;
          border: 1px solid ${accentDim};
          background: ${accentFaint};
          font-family: var(--mono); font-size: 12px;
          color: ${accent}; letter-spacing: 2px;
          transition: all 0.2s; text-decoration: none;
        }
        .resume-link:hover { box-shadow: 0 0 16px ${accentGlow}; }
        .back-link { font-family: var(--mono); font-size: 11px; color: var(--text-dim); letter-spacing: 2px; transition: color 0.2s; }
        .back-link:hover { color: ${accent}; }
        .skill-tag {
          font-family: var(--mono); font-size: 11px;
          padding: 6px 14px; letter-spacing: 1.5px;
          border: 1px solid ${accentDim};
          color: ${accent}; background: ${accentFaint};
        }
      `}</style>

      <Header />
      <main
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '860px',
          margin: '0 auto',
          padding: '120px 40px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '40px',
            marginBottom: '60px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              flexShrink: 0,
              border: `2px solid ${accent}`,
              background: accentFaint,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--display)',
              fontSize: '32px',
              fontWeight: 900,
              color: accent,
              position: 'relative',
              boxShadow: `0 0 30px ${accentGlow}`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '-6px',
                border: `1px solid ${accentDim}`,
                pointerEvents: 'none',
              }}
            />
            {firstName[0]}
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                color: accent,
                letterSpacing: '4px',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: '24px',
                  height: '1px',
                  background: accent,
                }}
              />
              {eyebrow}
            </div>

            <h1
              style={{
                fontFamily: 'var(--display)',
                fontSize: 'clamp(28px, 5vw, 52px)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1,
                letterSpacing: '-0.5px',
                marginBottom: '8px',
              }}
            >
              {firstName}
              <br />
              <span style={{ color: accent }}>{lastName}</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '13px',
                color: 'var(--text-dim)',
                letterSpacing: '2px',
              }}
            >
              {role}
            </p>
          </div>
        </div>

        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: accent, letterSpacing: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          // ABOUT <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${accentDim}, transparent)` }} />
        </div>

        <p style={{ fontFamily: 'var(--prose)', fontSize: '15px', color: 'var(--text)', lineHeight: 1.85, marginBottom: '40px' }}>
          {bio}
        </p>

        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: accent, letterSpacing: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          // SKILLS <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${accentDim}, transparent)` }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
          {skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>

        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: accent, letterSpacing: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          // SYS.LOG <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${accentDim}, transparent)` }} />
        </div>

        <div style={{ border: `1px solid ${accentDim}`, background: accentFaint, padding: '24px 28px', marginBottom: '40px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: accent, letterSpacing: '3px', marginBottom: '10px' }}>
            SYS.LOG // PERSONAL
          </div>
          <p style={{ fontFamily: 'var(--prose)', fontSize: '14px', color: 'var(--text)', lineHeight: 1.7 }}>
            {funFact}
          </p>
        </div>

        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: accent, letterSpacing: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          // CONNECT <span style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${accentDim}, transparent)` }} />
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="profile-link">
              ⌥ GITHUB {githubHandle ? `/ ${githubHandle}` : ''}
            </a>
          )}

          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">
              ◈ LINKEDIN
            </a>
          )}

          {resumeFile && (
            <a href={resumeFile} target="_blank" rel="noopener noreferrer" className="resume-link">
              ↓ RESUME / CV
            </a>
          )}
        </div>

        <Link href="/friends" className="back-link">
          ← BACK TO FRIENDS
        </Link>
      </main>

      <Footer />
    </>
  )
}
