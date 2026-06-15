'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'

export default function HomePage() {
  return (
    <>
      <Header />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />

        {/* Projects */}
        <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 40px 120px' }}>
          <div className="sec-label">// FEATURED PROJECTS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {projects.map(p => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
