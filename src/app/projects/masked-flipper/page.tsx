'use client';
import React from 'react';

/* ── Module cards ── */
const moduleCards = [
  { icon: 'fa-keyboard', name: 'BadUSB HID', status: 'IDLE', statusColor: '#5c5c5c', info: 'Disarmed (Safe)', badge: 'simulated' },
  { icon: 'fa-gear', name: 'Hardware & Telemetry', status: 'RUNNING', statusColor: '#e6192c', info: 'Temp: 41.0°C | Batt: 3.84V (63%)', badge: 'simulated' },
  { icon: 'fa-bolt', name: 'Infrared (IR)', status: 'IDLE', statusColor: '#5c5c5c', info: 'Idle', badge: 'simulated' },
  { icon: 'fa-address-card', name: 'NFC / RFID', status: 'IDLE', statusColor: '#5c5c5c', info: 'Present a Tag …', badge: 'simulated' },
  { icon: 'fa-tower-broadcast', name: 'Sub-GHz RF', status: 'IDLE', statusColor: '#5c5c5c', info: 'Idle (433.92MHz)', badge: 'simulated' },
  { icon: 'fa-shield-halved', name: 'WiFi Audit (Active)', status: 'IDLE', statusColor: '#5c5c5c', info: 'Idle (Scope Protected)', badge: 'simulated' },
  { icon: 'fa-wifi', name: 'WiFi Recon (Passive)', status: 'IDLE', statusColor: '#5c5c5c', info: 'Passive Scan Active (14 networks, 3 BLE)', badge: 'simulated' },
];

/* ── Sidebar nav items ── */
const navItems = [
  { icon: 'fa-chart-line', label: 'Dashboard', active: true },
  { icon: 'fa-wifi', label: 'WiFi Auditing' },
  { icon: 'fa-keyboard', label: 'BadUSB HID' },
  { icon: 'fa-tower-broadcast', label: 'Sub-GHz & IR' },
  { icon: 'fa-address-card', label: 'NFC / RFID' },
  { icon: 'fa-gauge-high', label: 'Telemetry & Sensors' },
  { icon: 'fa-display', label: 'ST7789 Screen & Keypad' },
  { icon: 'fa-clipboard-list', label: 'Audit Logs' },
  { icon: 'fa-circle-info', label: 'Project Overview' },
];

export default function MaskedFlipperPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        .mfd * { box-sizing:border-box; margin:0; padding:0; }
        .mfd { display:flex; min-height:100vh; background:#0a0a0a; color:#f2f2f2; font-family:'Outfit',system-ui,sans-serif; }

        /* Sidebar */
        .mfd-sidebar { width:220px; flex-shrink:0; display:flex; flex-direction:column; padding:20px 16px; border-right:1px solid #1e1e1e; background:#0c0c0c; }
        .mfd-brand { display:flex; align-items:center; gap:10px; padding-bottom:20px; border-bottom:1px solid #1e1e1e; margin-bottom:16px; }
        .mfd-brand-icon { font-size:22px; color:#e6192c; text-shadow:0 0 8px #e6192c; }
        .mfd-brand-title { font-family:'Fira Code',monospace; font-weight:700; font-size:13px; letter-spacing:0.5px; }
        .mfd-brand-sub { display:block; font-size:10px; color:#9a9a9a; margin-top:1px; }

        .mfd-nav { display:flex; flex-direction:column; gap:4px; flex:1; }
        .mfd-nav-item { display:flex; align-items:center; gap:10px; padding:9px 12px; color:#9a9a9a; text-decoration:none; border-radius:6px; font-size:13px; font-weight:500; transition:all .15s; cursor:pointer; border:none; background:none; text-align:left; }
        .mfd-nav-item i { font-size:14px; width:18px; text-align:center; }
        .mfd-nav-item:hover { color:#fff; background:rgba(230,25,44,0.1); }
        .mfd-nav-item.active { color:#fff; background:rgba(230,25,44,0.18); border:1px solid rgba(230,25,44,0.4); }

        .mfd-sidebar-footer { border-top:1px solid #1e1e1e; margin-top:auto; padding-top:14px; display:flex; flex-direction:column; gap:8px; }
        .mfd-sim-badge { text-align:center; font-family:'Fira Code',monospace; font-size:10px; color:#e6192c; background:rgba(230,25,44,0.08); padding:6px 10px; border-radius:6px; border:1px dashed rgba(230,25,44,0.4); display:flex; align-items:center; justify-content:center; gap:6px; }
        .mfd-stop-btn { background:#e6192c; color:#fff; border:none; padding:10px; border-radius:6px; font-family:'Outfit',sans-serif; font-size:12px; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:background .15s; }
        .mfd-stop-btn:hover { background:#d01426; }

        /* Content area */
        .mfd-content { flex:1; padding:20px; display:flex; flex-direction:column; gap:20px; overflow-y:auto; }

        /* Top status bar */
        .mfd-status-bar { display:flex; justify-content:space-around; align-items:center; padding:10px 20px; font-family:'Fira Code',monospace; font-size:12px; background:#111; border:1px solid #1e1e1e; border-radius:8px; }
        .mfd-status-item { display:flex; align-items:center; gap:6px; }
        .mfd-status-item i { color:#e6192c; font-size:12px; }

        /* Section header */
        .mfd-section-title { font-family:'Fira Code',monospace; font-size:18px; font-weight:700; letter-spacing:0.5px; }
        .mfd-section-sub { font-size:12px; color:#5c5c5c; margin-top:2px; }

        /* Module cards grid */
        .mfd-modules-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:12px; }
        .mfd-mod-card { background:#141414; border:1px solid #1e1e1e; border-radius:10px; padding:16px; transition:border-color .15s; }
        .mfd-mod-card:hover { border-color:rgba(230,25,44,0.35); }
        .mfd-mod-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
        .mfd-mod-icon-name { display:flex; align-items:center; gap:8px; }
        .mfd-mod-icon { font-size:18px; color:#e6192c; }
        .mfd-mod-badge { font-family:'Fira Code',monospace; font-size:9px; letter-spacing:0.5px; padding:3px 8px; border-radius:4px; font-weight:600; }
        .mfd-mod-badge.idle { background:rgba(92,92,92,0.2); color:#5c5c5c; border:1px solid #3a3a3a; }
        .mfd-mod-badge.running { background:rgba(230,25,44,0.2); color:#e6192c; border:1px solid #e6192c; }
        .mfd-mod-name { font-family:'Fira Code',monospace; font-size:13px; font-weight:600; }
        .mfd-mod-info { font-size:12px; color:#9a9a9a; margin-top:4px; font-family:'Fira Code',monospace; }
        .mfd-mod-sim { display:inline-block; font-family:'Fira Code',monospace; font-size:9px; color:#5c5c5c; background:#1a1a1a; border:1px solid #2a2a2a; padding:2px 8px; border-radius:4px; margin-top:8px; }

        /* Bottom grid */
        .mfd-bottom-grid { display:grid; grid-template-columns:2fr 1fr; gap:12px; }
        .mfd-panel { background:#141414; border:1px solid #1e1e1e; border-radius:10px; padding:16px; }
        .mfd-panel-title { font-family:'Fira Code',monospace; font-size:13px; font-weight:600; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
        .mfd-panel-title i { color:#e6192c; }

        /* Table */
        .mfd-table { width:100%; border-collapse:collapse; font-size:12px; }
        .mfd-table th { text-align:left; padding:8px 10px; color:#e6192c; font-family:'Fira Code',monospace; font-size:11px; border-bottom:1px solid #1e1e1e; }
        .mfd-table td { padding:8px 10px; border-bottom:1px solid #1e1e1e; color:#5c5c5c; }

        /* Quick controls */
        .mfd-qc-grid { display:flex; flex-wrap:wrap; gap:8px; }
        .mfd-qc-btn { padding:8px 14px; border-radius:6px; font-size:11px; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:6px; border:none; transition:all .15s; font-family:'Outfit',sans-serif; }
        .mfd-qc-green { background:rgba(59,165,92,0.15); color:#3ba55c; border:1px solid rgba(59,165,92,0.3); }
        .mfd-qc-green:hover { background:rgba(59,165,92,0.25); }
        .mfd-qc-gray { background:#1c1c1c; color:#9a9a9a; border:1px solid #2a2a2a; }
        .mfd-qc-gray:hover { background:#252525; color:#fff; }
        .mfd-qc-red { background:#e6192c; color:#fff; }
        .mfd-qc-red:hover { background:#d01426; }

        /* Back link */
        .mfd-back { position:fixed; top:12px; right:16px; z-index:100; font-family:'Fira Code',monospace; font-size:11px; color:#9a9a9a; text-decoration:none; background:#141414; border:1px solid #2a2a2a; padding:6px 14px; border-radius:6px; transition:all .15s; letter-spacing:1px; }
        .mfd-back:hover { color:#e6192c; border-color:#e6192c; }

        /* Responsive */
        @media (max-width:900px) {
          .mfd { flex-direction:column; }
          .mfd-sidebar { width:100%; border-right:none; border-bottom:1px solid #1e1e1e; flex-direction:row; flex-wrap:wrap; padding:12px; gap:8px; }
          .mfd-nav { flex-direction:row; flex-wrap:wrap; gap:4px; }
          .mfd-sidebar-footer { flex-direction:row; margin-top:0; border-top:none; padding-top:0; }
          .mfd-bottom-grid { grid-template-columns:1fr; }
          .mfd-modules-grid { grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); }
        }
      `}</style>

      <a href="/projects" className="mfd-back">← PORTFOLIO</a>

      <div className="mfd">
        {/* Sidebar */}
        <aside className="mfd-sidebar">
          <div className="mfd-brand">
            <i className="fa-solid fa-mask mfd-brand-icon" />
            <div>
              <span className="mfd-brand-title">MASKED FLIPPER</span>
              <span className="mfd-brand-sub">RPi4 Multi-Tool Companion</span>
            </div>
          </div>

          <nav className="mfd-nav">
            {navItems.map(n => (
              <button key={n.label} className={`mfd-nav-item${n.active ? ' active' : ''}`}>
                <i className={`fa-solid ${n.icon}`} />
                {n.label}
              </button>
            ))}
          </nav>

          <div className="mfd-sidebar-footer">
            <div className="mfd-sim-badge">
              <i className="fa-solid fa-triangle-exclamation" />
              SIMULATION MODE
            </div>
            <button className="mfd-stop-btn">
              <i className="fa-solid fa-stop" />
              STOP ALL SCANS
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="mfd-content">
          {/* Status bar */}
          <div className="mfd-status-bar">
            <div className="mfd-status-item"><i className="fa-solid fa-battery-three-quarters" /> 3.89V (69%)</div>
            <div className="mfd-status-item"><i className="fa-solid fa-temperature-half" /> 43.6°C</div>
            <div className="mfd-status-item"><i className="fa-solid fa-hard-drive" /> 172699.6 MB Free</div>
            <div className="mfd-status-item"><i className="fa-solid fa-clock" style={{ color: '#e6192c' }} /> RTC: 16:31:13</div>
          </div>

          {/* Section header */}
          <div>
            <h2 className="mfd-section-title">SYSTEM OVERVIEW</h2>
            <p className="mfd-section-sub">Real-time module health and active background scanning states</p>
          </div>

          {/* Module cards */}
          <div className="mfd-modules-grid">
            {moduleCards.map(m => (
              <div key={m.name} className="mfd-mod-card">
                <div className="mfd-mod-header">
                  <div className="mfd-mod-icon-name">
                    <i className={`fa-solid ${m.icon} mfd-mod-icon`} />
                  </div>
                  <span className={`mfd-mod-badge ${m.status === 'RUNNING' ? 'running' : 'idle'}`}>
                    {m.status}
                  </span>
                </div>
                <div className="mfd-mod-name">{m.name}</div>
                <div className="mfd-mod-info">{m.info}</div>
                <span className="mfd-mod-sim">{m.badge}</span>
              </div>
            ))}
          </div>

          {/* Bottom: Captures + Quick Controls */}
          <div className="mfd-bottom-grid">
            <div className="mfd-panel">
              <div className="mfd-panel-title"><i className="fa-solid fa-database" /> RECENT CAPTURES</div>
              <table className="mfd-table">
                <thead>
                  <tr>
                    <th>Module</th><th>Name</th><th>Type</th><th>Timestamp</th><th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={5} style={{ textAlign: 'center', color: '#5c5c5c', padding: '20px' }}>No recent captures saved.</td></tr>
                </tbody>
              </table>
            </div>

            <div className="mfd-panel">
              <div className="mfd-panel-title"><i className="fa-solid fa-sliders" /> QUICK CONTROLS</div>
              <div className="mfd-qc-grid">
                <button className="mfd-qc-btn mfd-qc-green"><i className="fa-solid fa-rotate" /> Sync System RTC</button>
                <button className="mfd-qc-btn mfd-qc-gray"><i className="fa-solid fa-volume-high" /> Test Piezo Audio (440Hz)</button>
                <button className="mfd-qc-btn mfd-qc-gray"><i className="fa-solid fa-gear" /> Test Haptic Motors</button>
                <button className="mfd-qc-btn mfd-qc-red"><i className="fa-solid fa-power-off" /> Safe Device Shutdown</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    </>
  );
}
