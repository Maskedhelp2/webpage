'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'


const sections = [
  {
    id: '01',
    title: 'OVERVIEW',
    content: `This Privacy Policy explains how MaskedHelp ("we", "us", "our") handles information when you visit maskedhelp.dev (the "Site"). We built this site as a portfolio — to show our work, introduce our team, and share our resumes. We are not a company, we do not sell products or services through this site, and we do not collect, store, or sell your personal data.`,
  },
  {
    id: '02',
    title: 'INFORMATION WE DO NOT COLLECT',
    content: `We do not collect your name, email address, location, IP address, or any other personal information. We do not run analytics scripts, advertising trackers, or behavioural profiling on this site. We do not use cookies beyond what your browser or Cloudflare's infrastructure may set automatically for performance and security purposes.`,
  },
  {
    id: '03',
    title: 'CLOUDFLARE HOSTING',
    content: `This site is served through Cloudflare Pages. Cloudflare may process certain technical data — such as IP addresses and request metadata — as part of its standard infrastructure and security services. This processing is governed by Cloudflare's own Privacy Policy, available at cloudflare.com/privacypolicy. We do not have access to this data in any individually identifiable form.`,
  },
  {
    id: '04',
    title: 'THIRD-PARTY LINKS',
    content: `Our site contains links to external platforms including GitHub and LinkedIn. When you click these links and leave our site, you are subject to the privacy policies of those respective platforms. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites.`,
  },
  {
    id: '05',
    title: 'RESUME DOWNLOADS',
    content: `Resumes linked on this site are static PDF files hosted directly within this site. Downloading or viewing them does not involve any data collection on our end beyond what Cloudflare's infrastructure logs as part of standard request handling.`,
  },
  {
    id: '06',
    title: 'CHILDREN\'S PRIVACY',
    content: `This site is not directed at children under the age of 13, and we do not knowingly collect any information from children.`,
  },
  {
    id: '07',
    title: 'CHANGES TO THIS POLICY',
    content: `We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated effective date. Continued use of the site after changes constitutes your acceptance of the updated policy.`,
  },
  {
    id: '08',
    title: 'CONTACT',
    content: `If you have any questions about this Privacy Policy, you can reach the team via the GitHub or LinkedIn links on our team pages.`,
  },
]

export default function PrivacyPage() {
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
          PRIVACY <span style={{ color: 'var(--accent)' }}>POLICY</span>
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
      <Footer />
    </>
  )
}