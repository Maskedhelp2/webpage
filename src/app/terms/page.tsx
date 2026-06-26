'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'


const sections = [
  {
    id: '01',
    title: 'ACCEPTANCE',
    content: `By accessing maskedhelp.dev (the "Site"), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use the Site. These terms apply to all visitors and users of the Site.`,
  },
  {
    id: '02',
    title: 'PURPOSE OF THE SITE',
    content: `This Site is a personal portfolio for the MaskedHelp team. It is provided for informational purposes only — to display our work, introduce our team members, and share our resumes. No transactions, purchases, or services are offered through this Site.`,
  },
  {
    id: '03',
    title: 'INTELLECTUAL PROPERTY',
    content: `All content on this Site — including text, design, code, graphics, and project descriptions — is the intellectual property of the respective MaskedHelp team members unless otherwise stated. You may not reproduce, distribute, or create derivative works from any content on this Site without explicit written permission from the relevant author.`,
  },
  {
    id: '04',
    title: 'RESUME & CV FILES',
    content: `Resume files made available for download are provided solely for professional evaluation purposes — for example, by potential employers, collaborators, or academic institutions. You may not redistribute, modify, or republish these documents without the written consent of the respective team member.`,
  },
  {
    id: '05',
    title: 'THIRD-PARTY LINKS',
    content: `This Site contains links to external services including GitHub and LinkedIn. These links are provided for your convenience. We have no control over the content or availability of external sites and accept no responsibility for them. Inclusion of a link does not imply endorsement.`,
  },
  {
    id: '06',
    title: 'DISCLAIMER OF WARRANTIES',
    content: `This Site is provided "as is" without warranties of any kind, express or implied. We make no guarantees regarding the accuracy, completeness, or availability of the Site or its content. We reserve the right to modify, suspend, or discontinue the Site at any time without notice.`,
  },
  {
    id: '07',
    title: 'LIMITATION OF LIABILITY',
    content: `To the fullest extent permitted by applicable law, the MaskedHelp team members shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this Site or its content.`,
  },
  {
    id: '08',
    title: 'CHANGES TO THESE TERMS',
    content: `We reserve the right to update these Terms at any time. Changes will be reflected on this page with an updated effective date. Your continued use of the Site after any changes constitutes acceptance of the revised Terms.`,
  },
  {
    id: '09',
    title: 'GOVERNING LAW',
    content: `These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of the Site shall be subject to the jurisdiction of the courts of India.`,
  },
]

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', padding: '120px 40px 80px' }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: '11px',
          color: 'var(--accent)', letterSpacing: '4px',
          marginBottom: '20px',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--accent)', display: 'block' }} />
          MASKEDHELP // LEGAL
        </div>

        <h1 style={{
          fontFamily: 'var(--display)', fontSize: 'clamp(28px, 5vw, 52px)',
          fontWeight: 900, color: '#fff', lineHeight: 1,
          marginBottom: '12px', letterSpacing: '-0.5px',
        }}>
          TERMS OF <span style={{ color: 'var(--accent)' }}>USE</span>
        </h1>

        <p style={{
          fontFamily: 'var(--mono)', fontSize: '11px',
          color: 'var(--text-dim)', letterSpacing: '2px',
          marginBottom: '60px',
        }}>
          EFFECTIVE DATE // JANUARY 1, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {sections.map(sec => (
            <div key={sec.id}>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: '10px',
                color: 'var(--accent)', letterSpacing: '4px',
                marginBottom: '14px',
                display: 'flex', alignItems: 'center', gap: '12px',
              }}>
                <span style={{ color: 'var(--text-dim)' }}>{sec.id}</span>
                {sec.title}
                <span style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(230,51,41,0.3), transparent)' }} />
              </div>
              <p style={{
                fontFamily: 'var(--prose)', fontSize: '15px',
                color: 'var(--text)', lineHeight: 1.85,
              }}>
                {sec.content}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}