'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import TeamCard from '@/components/TeamCard'
import { team } from '@/data/team'

export default function FriendsPage() {
  return (
    <>
      <Header />
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '960px', margin: '0 auto', padding: '160px 40px 80px' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '4px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--accent)', display: 'block' }} />
          MASKEDHELP // FRIENDS
        </div>

        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '16px', letterSpacing: '-0.5px' }}>
          THE <span style={{ color: 'var(--accent)' }}>FRIENDS</span>
        </h1>

        <p style={{ fontFamily: 'var(--prose)', fontSize: '15px', color: 'var(--text)', lineHeight: 1.75, maxWidth: '560px', marginBottom: '60px' }}>
          Four builders from Amity University. Firmware, full-stack, robotics, AI.
          We work on things we care about — together.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {team.map(m => <TeamCard key={m.slug} member={m} friendsMode />)}
        </div>
      </main>
      <Footer />
    </>
  )
}
