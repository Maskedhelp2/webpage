'use client'

import Link from 'next/link'
import type { TeamMember } from '@/data/team'

export default function TeamCard({ member, friendsMode = false }: { member: TeamMember; friendsMode?: boolean }) {
  const base = friendsMode ? '/friends' : '/team'
  return (
    <>
      <style>{`
        .team-card-${member.slug} {
          display: block;
          border: 1px solid ${member.accentDim};
          background: ${member.accentFaint};
          padding: 28px;
          transition: box-shadow 0.2s;
          position: relative;
          text-decoration: none;
        }
        .team-card-${member.slug}:hover { box-shadow: 0 0 24px ${member.accentGlow}; }
        .team-card-skill-${member.slug} {
          font-family: var(--mono); font-size: 10px;
          padding: 4px 10px; letter-spacing: 1px;
          border: 1px solid ${member.accentDim};
          color: ${member.accent}; background: ${member.accentFaint};
        }
      `}</style>
      <Link href={`${base}/${member.slug}`} className={`team-card-${member.slug}`}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)` }} />
        <div style={{ width: '56px', height: '56px', border: `2px solid ${member.accent}`, background: member.accentFaint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--display)', fontSize: '22px', fontWeight: 900, color: member.accent, marginBottom: '20px', boxShadow: `0 0 20px ${member.accentGlow}` }}>
          {member.firstName[0]}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: member.accent, letterSpacing: '3px', marginBottom: '8px' }}>{member.eyebrow}</div>
        <h3 style={{ fontFamily: 'var(--display)', fontSize: '18px', fontWeight: 900, color: '#fff', letterSpacing: '1px', marginBottom: '6px', lineHeight: 1.2 }}>
          {member.firstName} <span style={{ color: member.accent }}>{member.lastName}</span>
        </h3>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '2px', marginBottom: '16px' }}>{member.role}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {member.skills.slice(0, 4).map(skill => (
            <span key={skill} className={`team-card-skill-${member.slug}`}>{skill}</span>
          ))}
          {member.skills.length > 4 && (
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 10px', border: '1px solid #2a2a2a', color: 'var(--text-dim)' }}>+{member.skills.length - 4}</span>
          )}
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: member.accent, letterSpacing: '2px', marginTop: '20px' }}>VIEW PROFILE →</div>
      </Link>
    </>
  )
}
