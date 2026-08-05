'use client';
import React from 'react';

const styles: Record<string, React.CSSProperties> = {
  /* ── Tokens ── */
  root: {
    '--bg-primary': '#0a0a0a',
    '--bg-surface': '#141414',
    '--bg-surface-raised': '#1c1c1c',
    '--border-subtle': '#2a2a2a',
    '--red-primary': '#e6192c',
    '--red-dim': '#8f0f1c',
    '--red-glow': 'rgba(230, 25, 44, 0.25)',
    '--text-primary': '#f2f2f2',
    '--text-secondary': '#9a9a9a',
    '--text-muted': '#5c5c5c',
    '--font-heading': "'Fira Code', monospace",
    '--font-body': "'Outfit', system-ui, sans-serif",
  } as React.CSSProperties,
};

/* ── Module card data ── */
const modules = [
  { icon: 'fa-wifi', name: 'WiFi Auditing', desc: 'Deauth testing, rogue AP, and packet capture via Aircrack-ng.' },
  { icon: 'fa-tower-broadcast', name: 'Sub-GHz Radio', desc: 'Capture and replay signals on common ISM frequencies.' },
  { icon: 'fa-address-card', name: 'NFC / RFID', desc: 'Read, clone, and emulate 13.56 MHz and 125 kHz tags.' },
  { icon: 'fa-satellite-dish', name: 'Infrared', desc: 'Learn, store, and replay IR remote control signals.' },
  { icon: 'fa-keyboard', name: 'BadUSB HID', desc: 'Inject keystroke payloads via USB rubber-ducky scripts.' },
  { icon: 'fa-gauge-high', name: 'Telemetry', desc: 'Real-time CPU, memory, temperature, and uptime monitoring.' },
];

export default function MaskedFlipperPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        .mf-wrapper { position:relative; min-height:100vh; width:100%; display:flex; flex-direction:column; overflow:hidden; background:#0a0a0a; font-family:'Outfit',system-ui,sans-serif; color:#f2f2f2; }

        /* Overlay grid + glow */
        .mf-overlay { position:absolute; inset:0; background:
          radial-gradient(ellipse 65% 55% at 25% 50%, rgba(230,25,44,0.12) 0%, transparent 70%),
          linear-gradient(rgba(10,10,10,0.85),rgba(10,10,10,0.85)),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(0deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 48px 48px, 48px 48px; z-index:1; pointer-events:none; }

        .mf-content { position:relative; z-index:10; display:flex; flex-direction:column; min-height:100vh; justify-content:space-between; padding:16px 24px; max-width:1280px; margin:0 auto; width:100%; box-sizing:border-box; }

        /* Nav */
        .mf-nav { display:flex; justify-content:space-between; align-items:center; padding:8px 0; }
        .mf-brand { display:flex; align-items:center; gap:12px; }
        .mf-brand-icon { font-size:28px; color:#e6192c; text-shadow:0 0 10px #e6192c; }
        .mf-brand-title { font-family:'Fira Code',monospace; font-weight:700; font-size:16px; letter-spacing:1px; }
        .mf-brand-sub { display:block; font-size:11px; color:#9a9a9a; }

        .mf-nav-pill { display:flex; align-items:center; gap:24px; background:#141414; border:1px solid #2a2a2a; padding:12px 24px; border-radius:9999px; box-shadow:0 4px 20px rgba(0,0,0,0.4); }
        .mf-nav-pill a { color:#9a9a9a; text-decoration:none; font-size:14px; font-weight:500; transition:color .2s; }
        .mf-nav-pill a:hover { color:#f2f2f2; }

        .mf-nav-cta { background:transparent; color:#f2f2f2; border:1px solid #e6192c; padding:8px 16px; border-radius:9999px; font-size:13px; font-weight:600; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:all .2s; }
        .mf-nav-cta:hover { background:rgba(230,25,44,0.12); }

        /* Top row */
        .mf-top-row { display:grid; grid-template-columns:2fr 1fr; gap:16px; align-items:center; margin:16px 0; }
        .mf-top-left { color:#9a9a9a; font-size:14px; max-width:640px; line-height:1.5; }
        .mf-top-right { text-align:right; font-family:'Fira Code',monospace; color:#9a9a9a; font-size:14px; letter-spacing:1px; }

        /* Hero center */
        .mf-hero { display:flex; flex-direction:column; align-items:flex-start; justify-content:center; margin:auto 0; padding:16px 0; }
        .mf-eyebrow { font-family:'Fira Code',monospace; font-size:12px; letter-spacing:2px; color:#9a9a9a; text-transform:uppercase; margin-bottom:8px; display:flex; align-items:center; gap:8px; }
        .mf-dot { width:8px; height:8px; background:#e6192c; border-radius:50%; box-shadow:0 0 8px #e6192c; animation:mf-pulse 2s ease-in-out infinite; }
        @keyframes mf-pulse { 0%,100%{box-shadow:0 0 8px #e6192c} 50%{box-shadow:0 0 18px #e6192c} }

        .mf-heading { font-family:'Fira Code',monospace; font-size:clamp(44px,7.5vw,96px); font-weight:700; line-height:0.95; letter-spacing:-2px; margin-bottom:16px; }
        .mf-heading-line1 { display:block; color:#f2f2f2; }
        .mf-shiny { display:inline-block; padding-right:0.05em; background-image:linear-gradient(100deg,#8f0f1c 0%,#e6192c 25%,#fff 50%,#e6192c 75%,#8f0f1c 100%); background-size:200% auto; background-clip:text; -webkit-background-clip:text; color:transparent; animation:mf-shine 3s linear infinite; }
        @keyframes mf-shine { to { background-position:200% center; } }

        .mf-hero-btn { background:#e6192c; color:#fff; padding:12px 28px; border-radius:9999px; font-size:15px; font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:10px; box-shadow:0 0 20px rgba(230,25,44,0.25); border:1px solid #e6192c; transition:all .25s; margin-top:8px; }
        .mf-hero-btn:hover { background:#d01426; box-shadow:0 0 30px rgba(230,25,44,0.5); transform:translateY(-2px); }

        /* Modules section */
        .mf-modules { padding:80px 0 60px; }
        .mf-section-label { font-family:'Fira Code',monospace; font-size:12px; color:#e6192c; letter-spacing:3px; margin-bottom:12px; }
        .mf-section-title { font-family:'Fira Code',monospace; font-size:28px; font-weight:700; margin-bottom:8px; }
        .mf-section-desc { color:#9a9a9a; font-size:14px; margin-bottom:32px; max-width:600px; }

        .mf-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
        .mf-card { background:#141414; border:1px solid #2a2a2a; border-radius:12px; padding:24px; transition:all .2s; }
        .mf-card:hover { border-color:rgba(230,25,44,0.4); transform:translateY(-2px); }
        .mf-card-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
        .mf-card-icon { font-size:24px; color:#e6192c; }
        .mf-card-name { font-family:'Fira Code',monospace; font-size:15px; font-weight:600; }
        .mf-card-desc { font-size:13px; color:#9a9a9a; font-family:'Fira Code',monospace; margin-top:4px; }

        /* Footer */
        .mf-footer { display:flex; justify-content:space-between; align-items:center; padding-bottom:16px; font-size:13px; color:#5c5c5c; }

        /* Responsive */
        @media (max-width:900px) {
          .mf-nav-pill { display:none; }
          .mf-top-row { grid-template-columns:1fr; }
          .mf-top-right { text-align:left; }
        }
        @media (prefers-reduced-motion:reduce) { .mf-shiny { animation:none; color:#e6192c; } .mf-dot { animation:none; } }
      `}</style>

      <div className="mf-wrapper" style={styles.root}>
        <div className="mf-overlay" />

        <div className="mf-content">
          {/* Navigation */}
          <header className="mf-nav">
            <div className="mf-brand">
              <i className="fa-solid fa-mask mf-brand-icon" />
              <div>
                <span className="mf-brand-title">MASKED FLIPPER</span>
                <span className="mf-brand-sub">Raspberry Pi Multi-Tool</span>
              </div>
            </div>

            <nav className="mf-nav-pill">
              <a href="#modules">Modules</a>
              <a href="https://github.com/POLARI-S/masked-flipper" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="/projects">← Portfolio</a>
            </nav>

            <a href="https://github.com/POLARI-S/masked-flipper" target="_blank" rel="noopener noreferrer" className="mf-nav-cta">
              View Source <i className="fa-solid fa-arrow-right" />
            </a>
          </header>

          {/* Top row */}
          <div className="mf-top-row">
            <div className="mf-top-left">
              A pocket-sized Raspberry Pi multi-tool for testing and understanding your own devices and networks — featuring both an on-device LCD interface and a live web companion dashboard.
            </div>
            <div className="mf-top-right">6 Modules. One Dashboard.</div>
          </div>

          {/* Hero */}
          <main className="mf-hero">
            <div className="mf-eyebrow">
              <span className="mf-dot" />
              LIVE — HARDWARE ACTIVE
            </div>

            <h1 className="mf-heading">
              <span className="mf-heading-line1">Hack Your</span>
              <span className="mf-shiny">Own Devices.</span>
            </h1>

            <a href="https://github.com/POLARI-S/masked-flipper" target="_blank" rel="noopener noreferrer" className="mf-hero-btn">
              View on GitHub <i className="fa-solid fa-arrow-right" />
            </a>
          </main>

          {/* Modules */}
          <section className="mf-modules" id="modules">
            <div className="mf-section-label">// HARDWARE MODULES</div>
            <div className="mf-section-title">SIX MODULES. ONE BACKEND.</div>
            <div className="mf-section-desc">
              Every module shares one lifecycle interface — the same Flask + Socket.IO backend drives both the on-device screen and the browser dashboard.
            </div>

            <div className="mf-grid">
              {modules.map(m => (
                <div key={m.name} className="mf-card">
                  <div className="mf-card-header">
                    <span className="mf-card-name">{m.name}</span>
                    <i className={`fa-solid ${m.icon} mf-card-icon`} />
                  </div>
                  <div className="mf-card-desc">{m.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mf-footer">
            <div>Masked Flipper — 2026 Hackathon Project</div>
            <div>By Arindam Maity</div>
          </footer>
        </div>
      </div>

      {/* Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    </>
  );
}
