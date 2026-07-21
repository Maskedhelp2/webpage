'use client'

import { useEffect, useRef } from 'react'
import Header from '@/components/Header'

const SERVICES = [
  {
    icon: '◈',
    name: 'CUSTOM PRINTS',
    desc: 'Got an STL? Send it over. We print anything you design — household objects, replacement parts, artistic pieces, personalised gifts.',
    tags: ['ANY STL', 'MULTI-COLOUR', 'POST-PROCESS'],
  },
  {
    icon: '⬡',
    name: 'PROTOTYPES',
    desc: 'Rapid prototyping for engineers, designers, and entrepreneurs. Functional mockups, fit-and-form testing, and iterative production runs.',
    tags: ['FAST TURNAROUND', 'FUNCTIONAL', 'ITERATIVE'],
  },
  {
    icon: '⚔',
    name: 'COSPLAY PROPS',
    desc: 'Armour, weapons, accessories, helmets — built to your specs. Large-format multi-colour printing available, post-processing and painting on request.',
    tags: ['MULTI-COLOUR', 'PAINTABLE', 'WEARABLE'],
  },
  {
    icon: '▦',
    name: 'MECHANICAL PARTS',
    desc: 'Brackets, enclosures, gears, jigs, and fixtures. Printed in engineering-grade materials built for real-world tolerances.',
    tags: ['PETG / ABS', 'TIGHT TOLERANCE', 'FUNCTIONAL'],
  },
  {
    icon: '◉',
    name: 'MINIATURES',
    desc: 'High-detail FDM miniatures and figurines with fine layer resolution. Perfect for tabletop pieces, scale models, and display figures.',
    tags: ['HIGH DETAIL', '0.05MM LAYERS', 'DISPLAY GRADE'],
  },
  {
    icon: '✦',
    name: 'DESIGN HELP',
    desc: "No model? No problem. Describe what you need and we'll model it for you — from a sketch, photo, or written brief.",
    tags: ['CAD MODELLING', 'FROM SKETCH', 'PRINT-READY'],
  },
]

const MATERIALS = [
  {
    name: 'PLA',
    desc: 'Best all-rounder for display models, prototypes, and decorative pieces. Easy to post-process and paint. Available in 16 colours.',
    props: ['EASY FINISH', 'RIGID', 'BIODEGRADABLE', '16 COLOURS'],
  },
  {
    name: 'PETG',
    desc: 'Durable and slightly flexible. Ideal for functional parts needing impact resistance and light moisture exposure.',
    props: ['IMPACT RESISTANT', 'MOISTURE RESISTANT', 'FUNCTIONAL'],
  },
  {
    name: 'ABS',
    desc: 'Heat-resistant and strong. Standard for mechanical and automotive parts that need to endure stress and elevated temperatures.',
    props: ['HEAT RESISTANT', 'MACHINABLE', 'TOUGH'],
  },
  {
    name: 'ASA',
    desc: 'UV and weather resistant. Built for outdoor use — signage, enclosures, anything that lives in the sun.',
    props: ['UV STABLE', 'OUTDOOR SAFE', 'CHEMICAL RESISTANT'],
  },
]

const SPECS = [
  ['PRINTER',          'Bambu Lab A1'],
  ['BUILD VOLUME',     '256 × 256 × 256 MM'],
  ['MIN LAYER HEIGHT', '0.05 MM'],
  ['MAX LAYER HEIGHT', '0.35 MM'],
  ['MULTI-COLOUR',     'UP TO 4 COLOURS (AMS LITE)'],
  ['NOZZLE',          '0.4 MM (0.2 / 0.6 / 0.8 AVAILABLE)'],
  ['TYPICAL SPEED',   'UP TO 500 MM/S'],
  ['TURNAROUND',      '2–5 BUSINESS DAYS'],
  ['FILE FORMATS',    'STL · OBJ · STEP · 3MF'],
  ['POST PROCESSING', 'SANDING · PAINTING · ASSEMBLY'],
]

const PROCESS = [
  { num: '01', title: 'SEND YOUR FILE',    desc: 'Email us your STL, OBJ, or STEP file along with your requirements. No file yet? Just describe what you need.' },
  { num: '02', title: 'WE ASSESS',         desc: 'We check your model for printability, suggest material and colour options, and reply with a quote within 24 hours.' },
  { num: '03', title: 'CONFIRM & PAY',     desc: 'Approve the quote, confirm material and colour, and we get it into the print queue immediately.' },
  { num: '04', title: 'RECEIVE YOUR PART', desc: 'Printed, post-processed, and shipped or available for pickup. Most orders ready in 2–5 business days.' },
]

// Animated print bed / layer lines
function PrintBedDeco() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let frame = 0
    let raf: number

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      const layers = 28
      const layerH = height / layers
      const t      = frame * 0.012

      for (let i = 0; i < layers; i++) {
        const y      = i * layerH
        const prog   = Math.min(1, (frame - i * 4) / 60)
        if (prog <= 0) continue
        const alpha  = 0.06 + Math.sin(t + i * 0.4) * 0.02
        ctx.strokeStyle = `rgba(56,191,255,${alpha * prog})`
        ctx.lineWidth = 1
        ctx.beginPath()
        // Slightly wavy fill lines like actual layer lines
        for (let x = 0; x < width; x += 2) {
          const wy = y + Math.sin(x * 0.04 + t + i) * 1.5
          x === 0 ? ctx.moveTo(x, wy) : ctx.lineTo(x, wy)
        }
        ctx.stroke()
      }

      // Nozzle indicator
      const nozzleX = (Math.sin(t * 0.7) * 0.4 + 0.5) * width
      const activeLayer = Math.min(layers - 1, Math.floor(frame / 4))
      const nozzleY = activeLayer * layerH

      ctx.beginPath()
      ctx.arc(nozzleX, nozzleY, 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(56,191,255,0.7)'
      ctx.fill()

      // Glow
      const grad = ctx.createRadialGradient(nozzleX, nozzleY, 0, nozzleX, nozzleY, 20)
      grad.addColorStop(0, 'rgba(56,191,255,0.15)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(nozzleX, nozzleY, 20, 0, Math.PI * 2)
      ctx.fill()

      frame++
      if (frame > layers * 4 + 80) frame = 0
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.6, pointerEvents: 'none' }}
    />
  )
}

export default function PrintLabPage() {
  return (
    <>
      <style>{`
        /* ── BLUE THEME OVERRIDES ── */
        .pl-hero, .pl-section, .pl-inner, .pl-email-cta,
        .pl-svc, .pl-mat, .pl-step, .pl-spec, .pl-detail,
        .pl-eyebrow, .pl-sec-label, .pl-btn-primary, .pl-mailto,
        .pl-svc-icon, .pl-mat-name, .pl-mat-prop, .pl-svc-tag,
        .pl-hero-badge, .pl-email-label, .pl-email-addr,
        .pl-template-line .key, .pl-detail-dot,
        .pl-step-num, .pl-step::after, .pl-spec-label {
          --pl-accent:       #38bfff;
          --pl-accent-dim:   rgba(56,191,255,0.3);
          --pl-accent-faint: rgba(56,191,255,0.07);
        }
        .pl-hero {
          position: relative; z-index: 1; min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: flex-start; justify-content: center;
          padding: clamp(100px,15vw,160px) clamp(24px,6vw,80px) 80px;
          overflow: hidden;
        }
        .pl-eyebrow {
          font-family: var(--mono); font-size: 10px; color: var(--pl-accent);
          letter-spacing: 5px; margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px;
        }
        .pl-eyebrow::before { content:''; width:32px; height:1px; background:var(--pl-accent); }
        .pl-hero-title {
          font-family: var(--display);
          font-size: clamp(2.8rem, 9vw, 8rem);
          font-weight: 900; color: #fff; line-height: 0.92;
          letter-spacing: -2px; margin-bottom: 28px; position: relative; z-index: 1;
        }
        .pl-hero-title .outline {
          color: transparent; -webkit-text-stroke: 2px rgba(56,191,255,0.5);
        }
        .pl-hero-sub {
          font-family: var(--prose); font-size: clamp(14px,2vw,17px);
          color: #aaa; line-height: 1.8;
          max-width: 480px; margin-bottom: 48px; position: relative; z-index: 1;
        }
        .pl-ctas { display: flex; gap: 12px; flex-wrap: wrap; position: relative; z-index: 1; }
        .pl-btn-primary {
          font-family: var(--mono); font-size: 11px; letter-spacing: 3px;
          padding: 14px 32px; background: var(--pl-accent);
          color: #fff; border: none; cursor: pointer;
          transition: all 0.2s; text-decoration: none; display: inline-block;
        }
        .pl-btn-primary:hover { background: #0099e6; box-shadow: 0 0 24px rgba(56,191,255,0.4); }
        .pl-btn-ghost {
          font-family: var(--mono); font-size: 11px; letter-spacing: 3px;
          padding: 14px 32px; background: transparent;
          color: var(--text); border: 1px solid #2a2a2a;
          transition: all 0.2s; text-decoration: none; display: inline-block;
        }
        .pl-btn-ghost:hover { border-color: var(--pl-accent); color: var(--pl-accent); }
        .pl-hero-badge {
          position: absolute; z-index: 1;
          top: clamp(100px,18vw,160px); right: clamp(24px,6vw,80px);
          font-family: var(--mono); font-size: 10px; color: var(--pl-accent);
          letter-spacing: 3px; text-align: right;
          border: 1px solid var(--pl-accent-dim); padding: 12px 16px;
          background: var(--pl-accent-faint);
        }
        .pl-hero-badge span { display: block; font-family: var(--display); font-size: 18px; font-weight: 900; color: #fff; margin-top: 6px; letter-spacing: 2px; }

        .pl-section { position: relative; z-index: 1; border-top: 1px solid #111; }
        .pl-section.surface { background: #0d0d0d; }
        .pl-inner { max-width: 1100px; margin: 0 auto; padding: 100px clamp(24px,6vw,80px); }
        .pl-sec-label {
          font-family: var(--mono); font-size: 11px; color: var(--pl-accent);
          letter-spacing: 5px; margin-bottom: 24px;
          display: flex; align-items: center; gap: 14px;
        }
        .pl-sec-label::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,var(--pl-accent-dim),transparent); }
        .pl-sec-title {
          font-family: var(--display); font-size: clamp(1.8rem,5vw,3.5rem);
          font-weight: 900; color: #fff; letter-spacing: -0.5px;
          line-height: 1; margin-bottom: 60px;
        }

        /* SERVICES */
        .pl-services {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(260px,100%), 1fr));
          gap: 1px; background: #111; border: 1px solid #111;
        }
        .pl-svc {
          background: #060606; padding: 40px 32px;
          position: relative; transition: background 0.25s; overflow: hidden;
        }
        .pl-svc::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,var(--pl-accent),transparent);
          transform:scaleX(0); transform-origin:left; transition:transform 0.3s;
        }
        .pl-svc:hover { background: rgba(56,191,255,0.04); }
        .pl-svc:hover::before { transform: scaleX(1); }
        .pl-svc-icon { font-family:var(--mono); font-size:28px; color:var(--pl-accent); margin-bottom:20px; display:block; text-shadow:0 0 16px rgba(56,191,255,0.4); }
        .pl-svc-name { font-family:var(--display); font-size:14px; font-weight:700; color:#fff; letter-spacing:2px; margin-bottom:14px; }
        .pl-svc-desc { font-family:var(--prose); font-size:14px; color:#a0a0a0; line-height:1.8; }
        .pl-svc-tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:20px; }
        .pl-svc-tag { font-family:var(--mono); font-size:9px; letter-spacing:1.5px; padding:4px 10px; border:1px solid #2a2a2a; color:#888; }

        /* PROCESS */
        .pl-process { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); border:1px solid #1a1a1a; }
        .pl-step { padding:36px 28px; border-right:1px solid #1a1a1a; position:relative; }
        .pl-step:last-child { border-right:none; }
        .pl-step::after { content:'→'; position:absolute; right:-12px; top:50%; transform:translateY(-50%); font-family:var(--mono); font-size:14px; color:var(--pl-accent-dim); z-index:2; }
        .pl-step:last-child::after { display:none; }
        .pl-step-num { font-family:var(--mono); font-size:10px; color:var(--pl-accent); letter-spacing:3px; margin-bottom:16px; }
        .pl-step-title { font-family:var(--display); font-size:14px; font-weight:700; color:#fff; letter-spacing:2px; margin-bottom:12px; }
        .pl-step-desc { font-family:var(--prose); font-size:13px; color:#a0a0a0; line-height:1.75; }

        /* MATERIALS */
        .pl-materials { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr)); gap:12px; }
        .pl-mat { border:1px solid #1a1a1a; padding:24px 20px; transition:all 0.2s; position:relative; }
        .pl-mat::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--pl-accent-dim),transparent); opacity:0; transition:opacity 0.2s; }
        .pl-mat:hover { border-color:var(--pl-accent-dim); background:var(--pl-accent-faint); }
        .pl-mat:hover::before { opacity:1; }
        .pl-mat-name { font-family:var(--display); font-size:12px; font-weight:700; color:var(--pl-accent); letter-spacing:2px; margin-bottom:8px; }
        .pl-mat-desc { font-family:var(--prose); font-size:13px; color:#a0a0a0; line-height:1.7; }
        .pl-mat-props { margin-top:14px; display:flex; flex-wrap:wrap; gap:5px; }
        .pl-mat-prop { font-family:var(--mono); font-size:9px; letter-spacing:1px; padding:3px 8px; background:var(--pl-accent-faint); border:1px solid var(--pl-accent-dim); color:rgba(56,191,255,0.6); }

        /* SPECS */
        .pl-specs { display:grid; grid-template-columns:1fr 1fr; border:1px solid #1a1a1a; max-width:700px; }
        .pl-spec { display:flex; justify-content:space-between; align-items:center; padding:16px 24px; border-bottom:1px solid #111; border-right:1px solid #111; gap:16px; flex-wrap:wrap; }
        .pl-spec:nth-child(even) { border-right:none; }
        .pl-spec:nth-last-child(-n+2) { border-bottom:none; }
        .pl-spec-label { font-family:var(--mono); font-size:10px; color:#777; letter-spacing:2px; }
        .pl-spec-val   { font-family:var(--mono); font-size:11px; color:#e0e0e0; letter-spacing:1px; text-align:right; }

        /* CONTACT */
        .pl-contact-wrap {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
        }
        .pl-contact-p { font-family:var(--prose); font-size:15px; color:#aaa; line-height:1.85; margin-bottom:32px; }
        .pl-contact-details { display:flex; flex-direction:column; gap:16px; }
        .pl-detail { display:flex; align-items:flex-start; gap:14px; font-family:var(--mono); font-size:11px; color:#999; letter-spacing:1px; }
        .pl-detail-dot { width:6px; height:6px; border-radius:50%; background:var(--pl-accent); flex-shrink:0; margin-top:4px; }

        /* Email CTA */
        .pl-email-cta {
          border: 1px solid var(--pl-accent-dim);
          background: var(--pl-accent-faint);
          padding: 40px; position: relative;
        }
        .pl-email-cta::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,var(--pl-accent),transparent);
        }
        .pl-email-label { font-family:var(--mono); font-size:11px; color:#38bfff; letter-spacing:4px; margin-bottom:16px; }
        .pl-email-addr {
          font-family:var(--display); font-size:clamp(14px,2.5vw,22px); font-weight:900;
          color:#fff; letter-spacing:2px; margin-bottom:20px; word-break:break-all;
        }
        .pl-email-sub { font-family:var(--prose); font-size:13px; color:#aaa; line-height:1.7; margin-bottom:28px; }
        .pl-email-template {
          background: #0a0a0a; border: 1px solid #222;
          padding: 20px 24px; margin-bottom: 28px;
        }
        .pl-email-template-label { font-family:var(--mono); font-size:9px; color:var(--text-dim); letter-spacing:3px; margin-bottom:12px; }
        .pl-template-line { font-family:var(--mono); font-size:11px; color:#888; line-height:2.2; letter-spacing:0.5px; }
        .pl-template-line .key { color:var(--pl-accent); }
        .pl-mailto {
          display:inline-flex; align-items:center; gap:10px;
          font-family:var(--mono); font-size:11px; letter-spacing:3px;
          padding:14px 28px; background:var(--pl-accent);
          color:#fff; text-decoration:none; transition:all 0.2s;
        }
        .pl-mailto:hover { background:#0099e6; box-shadow:0 0 24px rgba(56,191,255,0.4); }

        /* MOBILE */
        @media (max-width: 768px) {
          .pl-hero-badge { display:none; }
          .pl-contact-wrap { grid-template-columns:1fr; gap:40px; }
          .pl-process { grid-template-columns:1fr; }
          .pl-step { border-right:none; border-bottom:1px solid #1a1a1a; }
          .pl-step::after { content:'↓'; right:auto; left:50%; top:auto; bottom:-14px; transform:translateX(-50%); }
          .pl-step:last-child::after { display:none; }
          .pl-specs { grid-template-columns:1fr; }
          .pl-spec { border-right:none; }
          .pl-spec:nth-last-child(-n+2) { border-bottom:1px solid #111; }
          .pl-spec:last-child { border-bottom:none; }
        }
      `}</style>

      <Header />

      {/* HERO */}
      <section className="pl-hero">
        <PrintBedDeco />
        <div className="pl-eyebrow">// BAMBU LAB A1 · PRECISION FDM PRINTING</div>
        <h1 className="pl-hero-title">
          WE PRINT<br />
          WHAT YOU<br />
          <span className="outline">IMAGINE.</span>
        </h1>
        <p className="pl-hero-sub">
          Custom 3D printing for prototypes, mechanical parts, miniatures, cosplay props, and everything in between. Powered by the Bambu Lab A1 with multi-colour AMS Lite support.
        </p>
        <div className="pl-ctas">
          <a href="#contact" className="pl-btn-primary">GET A QUOTE</a>
          <a href="#services" className="pl-btn-ghost">VIEW SERVICES</a>
        </div>
        <div className="pl-hero-badge">
          POWERED BY
          <span>BAMBU A1</span>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="pl-section">
        <div className="pl-inner">
          <div className="pl-sec-label">// WHAT WE DO</div>
          <h2 className="pl-sec-title">SERVICES</h2>
          <div className="pl-services">
            {SERVICES.map(s => (
              <div key={s.name} className="pl-svc">
                <span className="pl-svc-icon">{s.icon}</span>
                <div className="pl-svc-name">{s.name}</div>
                <p className="pl-svc-desc">{s.desc}</p>
                <div className="pl-svc-tags">
                  {s.tags.map(t => <span key={t} className="pl-svc-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="pl-section surface">
        <div className="pl-inner">
          <div className="pl-sec-label">// HOW IT WORKS</div>
          <h2 className="pl-sec-title">PROCESS</h2>
          <div className="pl-process">
            {PROCESS.map(p => (
              <div key={p.num} className="pl-step">
                <div className="pl-step-num">{p.num}</div>
                <div className="pl-step-title">{p.title}</div>
                <p className="pl-step-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section id="materials" className="pl-section">
        <div className="pl-inner">
          <div className="pl-sec-label">// WHAT WE PRINT WITH</div>
          <h2 className="pl-sec-title">MATERIALS</h2>
          <div className="pl-materials">
            {MATERIALS.map(m => (
              <div key={m.name} className="pl-mat">
                <div className="pl-mat-name">{m.name}</div>
                <p className="pl-mat-desc">{m.desc}</p>
                <div className="pl-mat-props">
                  {m.props.map(p => <span key={p} className="pl-mat-prop">{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section id="specs" className="pl-section surface">
        <div className="pl-inner">
          <div className="pl-sec-label">// MACHINE CAPABILITIES</div>
          <h2 className="pl-sec-title">BUILD SPECS</h2>
          <div className="pl-specs">
            {SPECS.map(([label, val]) => (
              <div key={label} className="pl-spec">
                <span className="pl-spec-label">{label}</span>
                <span className="pl-spec-val">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="pl-section">
        <div className="pl-inner">
          <div className="pl-sec-label">// GET IN TOUCH</div>
          <h2 className="pl-sec-title">REQUEST A QUOTE</h2>
          <div className="pl-contact-wrap">

            <div>
              <p className="pl-contact-p">
                Send us an email with your project details and we will get back with a quote within 24 hours. Include your file if you have one — no file yet, no problem, just describe what you need.
              </p>
              <div className="pl-contact-details">
                {[
                  'Quotes returned within 24 hours',
                  'No minimum order quantity',
                  'File review and printability check included',
                  'Pickup or shipping available',
                  'Bulk order discounts available',
                  'Up to 4-colour prints with AMS Lite',
                ].map(d => (
                  <div key={d} className="pl-detail">
                    <div className="pl-detail-dot" />
                    {d}
                  </div>
                ))}
              </div>
            </div>

            <div className="pl-email-cta">
              <div className="pl-email-label">// CONTACT</div>
              <div className="pl-email-addr">masked@maskedhelp.com</div>
              <p className="pl-email-sub">
                Click the button below to open your email client with a pre-filled subject line — or just copy the address and send from anywhere.
              </p>

              <div className="pl-email-template">
                <div className="pl-email-template-label">// INCLUDE IN YOUR EMAIL</div>
                <div className="pl-template-line"><span className="key">SUBJECT:</span> 3D Print Quote — [brief description]</div>
                <div className="pl-template-line"><span className="key">SERVICE:</span> Custom Print / Prototype / Cosplay / etc.</div>
                <div className="pl-template-line"><span className="key">MATERIAL:</span> PLA / PETG / ABS / ASA / unsure</div>
                <div className="pl-template-line"><span className="key">COLOUR:</span> Your preferred colour(s)</div>
                <div className="pl-template-line"><span className="key">QUANTITY:</span> How many pieces</div>
                <div className="pl-template-line"><span className="key">FILE:</span> Attach STL / OBJ / STEP or describe</div>
              </div>

              <a
                href="mailto:masked@maskedhelp.com?subject=3D%20Print%20Quote%20%E2%80%94%20&body=SERVICE%3A%20%0AMATERIAL%3A%20%0AQUANTITY%3A%20%0ADESCRIPTION%3A%20%0A%0AFILE%20ATTACHED%20OR%20LINK%3A%20"
                className="pl-mailto"
              >
                ✉ OPEN EMAIL CLIENT →
              </a>
            </div>

          </div>
        </div>
      </section>

    </>
  )
}