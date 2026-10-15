'use client';

import React, { useEffect, useMemo, useState } from 'react';

type TabId =
  | 'dashboard'
  | 'terminal'
  | 'wifi'
  | 'badusb'
  | 'rf'
  | 'nfc'
  | 'hardware'
  | 'screen'
  | 'logs'
  | 'overview';

type LogEntry = {
  time: string;
  level: 'INFO' | 'WARN' | 'SAFE';
  message: string;
};

const navGroups: { title: string; items: { id: TabId; icon: string; label: string }[] }[] = [
  {
    title: 'CONTROL',
    items: [
      { id: 'dashboard', icon: '◫', label: 'Dashboard' },
      { id: 'terminal', icon: '>_', label: 'Device terminal' },
    ],
  },
  {
    title: 'MODULES',
    items: [
      { id: 'wifi', icon: '⌁', label: 'Wi-Fi auditing' },
      { id: 'badusb', icon: '⌨', label: 'BadUSB HID' },
      { id: 'rf', icon: '⌁', label: 'Sub-GHz & IR' },
      { id: 'nfc', icon: '▤', label: 'NFC / RFID' },
      { id: 'hardware', icon: '◉', label: 'Hardware & telemetry' },
      { id: 'screen', icon: '▣', label: 'Screen & keypad' },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'logs', icon: '≡', label: 'Audit logs' },
      { id: 'overview', icon: 'ⓘ', label: 'Project overview' },
    ],
  },
];

const initialLogs: LogEntry[] = [
  { time: '09:41:08', level: 'INFO', message: 'Web interface initialized' },
  { time: '09:41:08', level: 'SAFE', message: 'Hardware commands are disabled until a device gateway is configured' },
  { time: '09:40:52', level: 'INFO', message: 'Local dashboard session started' },
];

const modules = [
  { id: 'wifi' as TabId, name: 'Wi-Fi auditing', detail: 'Passive discovery and scoped test tools', icon: '⌁', state: 'STANDBY' },
  { id: 'badusb' as TabId, name: 'BadUSB HID', detail: 'Payload review and HID device status', icon: '⌨', state: 'DISARMED' },
  { id: 'rf' as TabId, name: 'Sub-GHz & IR', detail: 'Radio experiments and infrared tools', icon: '◉', state: 'STANDBY' },
  { id: 'nfc' as TabId, name: 'NFC / RFID', detail: 'Tag inspection and reader status', icon: '▤', state: 'STANDBY' },
  { id: 'hardware' as TabId, name: 'Hardware telemetry', detail: 'Sensors, battery, and system health', icon: '⌁', state: 'SIMULATED' },
  { id: 'screen' as TabId, name: 'Screen & keypad', detail: 'ST7789 display and keypad preview', icon: '▣', state: 'PREVIEW' },
];

function Panel({
  title,
  eyebrow,
  action,
  children,
  className = '',
}: {
  title: string;
  eyebrow?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mf-panel ${className}`}>
      <div className="mf-panel-head">
        <div>
          {eyebrow && <div className="mf-eyebrow">{eyebrow}</div>}
          <h2>{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Pill({ children, tone = 'muted' }: { children: React.ReactNode; tone?: 'muted' | 'red' | 'green' | 'amber' }) {
  return <span className={`mf-pill mf-pill-${tone}`}>{children}</span>;
}


function MaskedFlipperLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username.trim() || !password) { setError('Enter a username and password to continue.'); return; }
    setBusy(true); setError('');
    window.setTimeout(() => { sessionStorage.setItem('mf-ui-session', 'demo'); onLogin(); }, 250);
  };
  return <main className="mf-auth-page"><style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');
    .mf-auth-page{min-height:100vh;background:#050607;color:#f5f5f5;font-family:'Space Grotesk',sans-serif;position:relative;isolation:isolate;display:flex;flex-direction:column;padding:25px clamp(20px,5vw,70px);overflow:hidden}.mf-auth-page *{box-sizing:border-box}.mf-auth-page:before{content:'';position:absolute;inset:0;z-index:-1;background:radial-gradient(ellipse at 20% 45%,#20100e 0,transparent 48%),linear-gradient(#ffffff06 1px,transparent 1px),linear-gradient(90deg,#ffffff06 1px,transparent 1px);background-size:auto,34px 34px,34px 34px;mask-image:linear-gradient(90deg,#000,transparent 95%)}.mf-auth-head,.mf-auth-foot{display:flex;align-items:center;justify-content:space-between;gap:20px}.mf-auth-brand{display:flex;align-items:center;gap:12px;color:#fff;text-decoration:none}.mf-auth-mark{width:39px;height:39px;border:1px solid #783129;background:#190c0a;color:#e63329;display:grid;place-items:center;font-size:21px;font-weight:700;position:relative}.mf-auth-mark:after{content:'⌁';position:absolute;right:3px;bottom:1px;font:10px 'DM Mono',monospace;color:#55dff7}.mf-auth-brand b{font-size:13px;letter-spacing:.18em}.mf-auth-brand small{display:block;margin-top:4px;color:#55dff7;font:9px 'DM Mono',monospace;letter-spacing:.2em}.mf-auth-head>span,.mf-auth-foot{font:9px 'DM Mono',monospace;letter-spacing:.14em;color:#666972}.mf-auth-layout{width:min(1120px,100%);margin:auto;display:grid;grid-template-columns:1fr minmax(330px,420px);gap:clamp(35px,8vw,120px);align-items:center;padding:65px 0}.mf-auth-eyebrow{font:10px 'DM Mono',monospace;letter-spacing:.18em;color:#55dff7;margin-bottom:26px}.mf-auth-eyebrow i{display:inline-block;width:6px;height:6px;border-radius:50%;background:#e63329;margin-right:9px}.mf-auth-copy h1{font-size:clamp(55px,8vw,100px);font-weight:700;line-height:.86;letter-spacing:-.07em;margin:0}.mf-auth-copy h1 span{color:#e63329}.mf-auth-copy h1 em{font-style:normal;color:#55dff7}.mf-auth-copy>p{max-width:450px;color:#a0a1a8;font-size:13px;line-height:1.9;margin:26px 0 34px}.mf-auth-meta{display:flex;flex-wrap:wrap;border-top:1px solid #292a2e;border-bottom:1px solid #292a2e;max-width:520px}.mf-auth-meta div{padding:15px 18px 15px 0;margin-right:18px;border-right:1px solid #24252a}.mf-auth-meta div:last-child{border:0}.mf-auth-meta small{display:block;font:9px 'DM Mono',monospace;color:#55dff7;letter-spacing:.1em;margin-bottom:8px}.mf-auth-meta b{font-size:10px;font-weight:500;color:#ddd}.mf-auth-card{position:relative;border:1px solid #343136;background:linear-gradient(145deg,#101012,#08090a);padding:29px;box-shadow:0 24px 80px #0009}.mf-auth-card:before{content:'';position:absolute;left:-1px;top:0;width:3px;height:60px;background:#e63329}.mf-auth-card-top{display:flex;justify-content:space-between;align-items:center;font:10px 'DM Mono',monospace;letter-spacing:.13em;color:#55dff7}.mf-auth-card-top b{font-size:23px;color:#e63329;font-weight:400}.mf-auth-card h2{font-size:32px;letter-spacing:-.05em;margin:27px 0 7px}.mf-auth-card h2 span{color:#e63329}.mf-auth-card>p{font-size:11px;line-height:1.8;color:#888a92;margin:0 0 25px}.mf-auth-card label{display:block;font:9px 'DM Mono',monospace;letter-spacing:.12em;color:#b8b9c0;margin:17px 0 8px}.mf-auth-card input{width:100%;border:1px solid #34353a;background:#070809;padding:13px;color:#f5f5f5;font:11px 'DM Mono',monospace;outline:0}.mf-auth-card input:focus{border-color:#55dff7}.mf-auth-card input::placeholder{color:#54565e}.mf-auth-pass{display:flex}.mf-auth-pass input{min-width:0}.mf-auth-pass button{border:1px solid #34353a;border-left:0;background:#151619;color:#55dff7;padding:0 11px;font:9px 'DM Mono',monospace;cursor:pointer}.mf-auth-submit{width:100%;display:flex;justify-content:space-between;align-items:center;margin-top:25px;padding:14px 15px;border:1px solid #e63329;background:#e63329;color:#fff;font:10px 'DM Mono',monospace;letter-spacing:.06em;cursor:pointer}.mf-auth-submit:hover{background:#f3483d}.mf-auth-submit:disabled{opacity:.6}.mf-auth-error{font-size:10px;color:#ff827b}.mf-auth-note{display:flex;gap:10px;border-top:1px solid #292a2e;padding-top:16px;margin-top:22px}.mf-auth-note>i{font-style:normal;width:18px;height:18px;display:grid;place-items:center;border:1px solid #5c4827;color:#e6bd6c;flex:0 0 auto}.mf-auth-note p{font-size:9px;line-height:1.8;color:#777983;margin:0}.mf-auth-note b{color:#d9c18e;font-weight:500}.mf-auth-card-foot{display:flex;justify-content:space-between;gap:10px;border-top:1px solid #292a2e;padding-top:14px;margin-top:19px;font:8px 'DM Mono',monospace;letter-spacing:.06em;color:#62646c}.mf-auth-foot{padding-top:17px;border-top:1px solid #24252a}.mf-auth-foot i{color:#e63329;font-style:normal}@media(max-width:760px){.mf-auth-page{padding:18px}.mf-auth-head>span{font-size:7px;text-align:right}.mf-auth-layout{grid-template-columns:1fr;gap:30px;padding:45px 0}.mf-auth-copy h1{font-size:clamp(55px,15vw,82px)}.mf-auth-copy>p{margin:18px 0 22px}.mf-auth-meta div{padding-right:10px;margin-right:10px}.mf-auth-meta b{font-size:9px}.mf-auth-card{padding:22px}.mf-auth-foot{font-size:7px;align-items:flex-start}.mf-auth-foot span:last-child{text-align:right}}
  `}</style><header className="mf-auth-head"><a href="/" className="mf-auth-brand"><span className="mf-auth-mark">M</span><span><b>MASKEDFLIPPER</b><small>DEVICE WORKSPACE</small></span></a><span>MASKEDHELP // PRIVATE WORKSPACE</span></header><section className="mf-auth-layout"><div className="mf-auth-copy"><div className="mf-auth-eyebrow"><i/>RESTRICTED WORKSPACE / AUTH GATE</div><h1>ACCESS<br/><span>CONTROL</span><em>_</em></h1><p>A dedicated control surface for MaskedFlipper hardware. Sign in to open the device workspace and development modules.</p><div className="mf-auth-meta"><div><small>01 / TARGET</small><b>Raspberry Pi 4</b></div><div><small>02 / SESSION</small><b>Browser workspace</b></div><div><small>03 / MODE</small><b>Development preview</b></div></div></div><div className="mf-auth-card"><div className="mf-auth-card-top"><span>SECURE AREA <span style={{color:'#e63329'}}>// 01</span></span><b>↗</b></div><h2>Sign in<span>_</span></h2><p>Enter your workspace credentials to continue.</p><form onSubmit={submit}><label htmlFor="mf-auth-user">USERNAME / EMAIL</label><input id="mf-auth-user" value={username} onChange={e=>setUsername(e.target.value)} autoComplete="username" placeholder="your-username"/><label htmlFor="mf-auth-password">PASSWORD</label><div className="mf-auth-pass"><input id="mf-auth-password" type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" placeholder="••••••••••••"/><button type="button" onClick={()=>setShowPassword(v=>!v)}>{showPassword?'HIDE':'SHOW'}</button></div>{error&&<p className="mf-auth-error" role="alert">{error}</p>}<button className="mf-auth-submit" type="submit" disabled={busy}>{busy?'OPENING WORKSPACE…':'CONTINUE TO WORKSPACE'} <span>↗</span></button></form><div className="mf-auth-note"><i>!</i><p><b>Demo login only</b><br/>Any non-empty username and password opens this UI prototype. This is not real authentication and does not secure the route against direct access. Add server-side auth before production.</p></div><div className="mf-auth-card-foot"><span>AUTH: DEMO ONLY</span><span>UI BUILD 0.3</span></div></div></section><footer className="mf-auth-foot"><span>MASKEDHELP / MASKEDFLIPPER</span><span>AUTHORIZED DEVELOPMENT ONLY <i>·</i> {new Date().getFullYear()}</span></footer></main>;
}

export default function MaskedFlipperPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [clock, setClock] = useState('--:--:--');
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'MASKED FLIPPER / DEVICE CONSOLE',
    'Web terminal UI initialized.',
    'No Raspberry Pi gateway is configured.',
    'Commands are local demo commands only; no shell is connected.',
    '',
  ]);
  const [wifiMode, setWifiMode] = useState<'passive' | 'scope'>('passive');
  const [selectedNetwork, setSelectedNetwork] = useState('Lab network');
  const [payloadName, setPayloadName] = useState('New HID script');
  const [screenText, setScreenText] = useState('MASKED\nFLIPPER');
  const [gatewayAddress, setGatewayAddress] = useState('');
  const [showGatewayHelp, setShowGatewayHelp] = useState(false);

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem('mf-ui-session') === 'demo');
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    const update = () => setClock(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const addLog = (level: LogEntry['level'], message: string) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs((current) => [{ time, level, message }, ...current].slice(0, 100));
  };

  const runDemoCommand = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = terminalInput.trim();
    if (!command) return;
    const allowed: Record<string, string> = {
      help: 'Available demo commands: help, status, modules, clear, date',
      status: 'Gateway: NOT CONFIGURED | Device: OFFLINE | Execution: DISABLED',
      modules: 'Wi-Fi · BadUSB · Sub-GHz/IR · NFC/RFID · Telemetry · Screen preview',
      date: new Date().toString(),
    };
    setTerminalLines((current) => {
      const next = [...current, `pi@maskedflipper:~$ ${command}`];
      if (command === 'clear') return [];
      return [...next, allowed[command] ?? `Demo mode: "${command}" was not executed. Connect an authenticated device gateway to enable remote commands.`, ''];
    });
    setTerminalInput('');
    addLog('INFO', `Local terminal demo command entered: ${command}`);
  };

  const pageTitle = useMemo(() => {
    for (const group of navGroups) {
      const item = group.items.find((entry) => entry.id === activeTab);
      if (item) return item.label;
    }
    return 'Dashboard';
  }, [activeTab]);

  const renderDashboard = () => (
    <div className="mf-page-stack">
      <div className="mf-hero">
        <div className="mf-hero-copy">
          <div className="mf-eyebrow"><span className="mf-live-dot" /> DEVICE CONTROL CENTER</div>
          <h2>Know your hardware.<br /><span>Own your workflow.</span></h2>
          <p>A single interface for your MaskedFlipper development board, modules, and diagnostics.</p>
          <div className="mf-hero-actions">
            <button className="mf-btn mf-btn-primary" onClick={() => setActiveTab('terminal')}>Open device terminal <span>↗</span></button>
            <button className="mf-btn mf-btn-secondary" onClick={() => setActiveTab('hardware')}>View telemetry</button>
          </div>
        </div>
        <div className="mf-device-art" aria-label="MaskedFlipper device illustration">
          <div className="mf-device-antenna" />
          <div className="mf-device">
            <div className="mf-device-brand">MASKED<span>FLIPPER</span></div>
            <div className="mf-device-screen"><span>MF / SYSTEM</span><b>READY_</b><small>GATEWAY OFFLINE</small></div>
            <div className="mf-device-pad"><i /><i /><i /><i /><i /></div>
            <div className="mf-device-port" />
          </div>
          <div className="mf-art-label">HARDWARE LINK <b>NOT CONFIGURED</b></div>
        </div>
      </div>

      <div className="mf-stat-grid">
        <div className="mf-stat"><span className="mf-stat-icon">◉</span><span className="mf-stat-label">DEVICE STATUS</span><strong>Offline</strong><small>Waiting for gateway</small></div>
        <div className="mf-stat"><span className="mf-stat-icon">⌁</span><span className="mf-stat-label">ACTIVE MODULES</span><strong>00 <em>/ 06</em></strong><small>No hardware actions running</small></div>
        <div className="mf-stat"><span className="mf-stat-icon">⌁</span><span className="mf-stat-label">GATEWAY LATENCY</span><strong>— <em>ms</em></strong><small>Connection not available</small></div>
        <div className="mf-stat"><span className="mf-stat-icon">▤</span><span className="mf-stat-label">SESSION EVENTS</span><strong>{String(logs.length).padStart(2, '0')}</strong><small>Local interface activity</small></div>
      </div>

      <div className="mf-section-heading"><div><div className="mf-eyebrow">WORKSPACE</div><h2>Modules & tools</h2></div><span>6 MODULES <i>·</i> DEVICE GATEWAY REQUIRED</span></div>
      <div className="mf-module-grid">
        {modules.map((module) => (
          <button className="mf-module-card" key={module.id} onClick={() => setActiveTab(module.id)}>
            <div className="mf-module-top"><span className="mf-module-icon">{module.icon}</span><Pill tone={module.state === 'SIMULATED' ? 'amber' : 'muted'}>{module.state}</Pill></div>
            <h3>{module.name}</h3><p>{module.detail}</p>
            <span className="mf-module-open">Open module <b>↗</b></span>
          </button>
        ))}
      </div>

      <div className="mf-two-col">
        <Panel title="Recent activity" eyebrow="SESSION LOG" action={<button className="mf-text-btn" onClick={() => setActiveTab('logs')}>View all ↗</button>}>
          <div className="mf-log-list">
            {logs.slice(0, 4).map((entry, index) => <div className="mf-log-row" key={`${entry.time}-${index}`}><span className={`mf-log-dot mf-log-${entry.level.toLowerCase()}`} /><time>{entry.time}</time><span>{entry.message}</span><Pill tone={entry.level === 'WARN' ? 'amber' : entry.level === 'SAFE' ? 'green' : 'muted'}>{entry.level}</Pill></div>)}
          </div>
        </Panel>
        <Panel title="Connection checklist" eyebrow="BRING YOUR DEVICE ONLINE">
          <div className="mf-check-list">
            <div><span className="mf-check-number">01</span><span><b>Device gateway</b><small>Run a secured gateway on your trusted network.</small></span><Pill tone="red">Pending</Pill></div>
            <div><span className="mf-check-number">02</span><span><b>Pair this browser</b><small>Authenticate with a short-lived device session.</small></span><Pill>Pending</Pill></div>
            <div><span className="mf-check-number">03</span><span><b>Verify hardware</b><small>Confirm device identity and permissions.</small></span><Pill>Pending</Pill></div>
          </div>
          <button className="mf-btn mf-btn-secondary mf-btn-wide" onClick={() => { setActiveTab('terminal'); setShowGatewayHelp(true); }}>Configure connection <span>→</span></button>
        </Panel>
      </div>
    </div>
  );

  const renderTerminal = () => (
    <div className="mf-page-stack">
      <div className="mf-page-intro"><div><div className="mf-eyebrow">REMOTE ACCESS / SSH-STYLE CONSOLE</div><h2>Device terminal</h2><p>A terminal interface prepared for a secured Raspberry Pi 4 connection.</p></div><Pill tone="amber">GATEWAY OFFLINE</Pill></div>
      <div className="mf-terminal-banner"><span className="mf-banner-icon">!</span><div><b>Remote shell is not connected</b><p>This console currently runs harmless local demo commands only. It does not execute commands on your Pi.</p></div><button className="mf-text-btn" onClick={() => setShowGatewayHelp((value) => !value)}>{showGatewayHelp ? 'Hide details −' : 'Connection details +'}</button></div>
      {showGatewayHelp && <Panel title="Gateway configuration" eyebrow="NEXT INTEGRATION STEP"><p className="mf-body-copy">The website needs an authenticated WebSocket gateway that runs on a trusted network and relays terminal input/output to the Raspberry Pi. Use TLS, short-lived pairing tokens, command/session authorization, and an allowlisted origin. Do not expose the Pi’s SSH port directly to the public internet.</p><label className="mf-field-label" htmlFor="gateway-address">Gateway URL (planning field)</label><input id="gateway-address" className="mf-input" placeholder="wss://your-gateway.example/ws" value={gatewayAddress} onChange={(event) => setGatewayAddress(event.target.value)} /><p className="mf-field-hint">Saving this field does not establish a connection; the backend still needs to be implemented.</p></Panel>}
      <section className="mf-terminal-window">
        <div className="mf-terminal-titlebar"><div className="mf-window-dots"><i /><i /><i /></div><span>pi@maskedflipper: ~</span><Pill>LOCAL DEMO</Pill></div>
        <div className="mf-terminal-body" role="log" aria-live="polite">
          {terminalLines.map((line, index) => <div className={line.startsWith('MASKED') ? 'mf-terminal-accent' : line.startsWith('Demo mode:') ? 'mf-terminal-muted' : ''} key={`${index}-${line}`}>{line || '\u00a0'}</div>)}
          <form className="mf-terminal-form" onSubmit={runDemoCommand}><label htmlFor="terminal-command">pi@maskedflipper:~$</label><input id="terminal-command" value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} placeholder="Type help, status, modules…" autoComplete="off" spellCheck={false} /><button type="submit" aria-label="Run local demo command">↵</button></form>
        </div>
        <div className="mf-terminal-footer"><span><i className="mf-live-dot" /> LOCAL INTERFACE READY</span><span>UTF-8 <i>·</i> 80 × 24</span></div>
      </section>
      <div className="mf-terminal-hints"><button onClick={() => setTerminalInput('help')}>help</button><button onClick={() => setTerminalInput('status')}>status</button><button onClick={() => setTerminalInput('modules')}>modules</button><button onClick={() => { setTerminalLines([]); addLog('INFO', 'Local terminal display cleared'); }}>clear display</button></div>
    </div>
  );

  const renderModule = (tab: TabId) => {
    const module = modules.find((item) => item.id === tab);
    if (!module) return null;
    if (tab === 'wifi') return <div className="mf-page-stack">
      <div className="mf-page-intro"><div><div className="mf-eyebrow">WIRELESS TOOLKIT</div><h2>Wi-Fi auditing</h2><p>Review local lab discovery and explicitly scoped security checks.</p></div><Pill>STANDBY</Pill></div>
      <div className="mf-segmented"><button className={wifiMode === 'passive' ? 'active' : ''} onClick={() => setWifiMode('passive')}>Passive discovery</button><button className={wifiMode === 'scope' ? 'active' : ''} onClick={() => setWifiMode('scope')}>Authorized test scope</button></div>
      {wifiMode === 'passive' ? <Panel title="Nearby access points" eyebrow="SCAN RESULTS" action={<button className="mf-btn mf-btn-secondary" onClick={() => addLog('INFO', 'Wi-Fi refresh requested in UI demo mode')}>↻ Refresh view</button>}><div className="mf-empty-state"><span>⌁</span><b>No live scan data</b><p>Connect the device gateway to display actual scan results. No wireless scan has been started.</p></div></Panel> : <Panel title="Scope confirmation" eyebrow="AUTHORIZED TESTING ONLY"><div className="mf-form-grid"><div><label className="mf-field-label" htmlFor="wifi-network">Lab / authorized network</label><input id="wifi-network" className="mf-input" value={selectedNetwork} onChange={(event) => setSelectedNetwork(event.target.value)} /></div><div><label className="mf-field-label">Execution status</label><div className="mf-readonly">Blocked — no gateway</div></div></div><p className="mf-body-copy">Active testing controls remain disabled until a backend verifies ownership/authorization and the device reports a valid scoped session.</p><button className="mf-btn mf-btn-primary" onClick={() => addLog('SAFE', `Scope draft reviewed for ${selectedNetwork || 'unnamed lab network'}; no test executed`)}>Review scope draft</button></Panel>}
    </div>;
    if (tab === 'badusb') return <div className="mf-page-stack"><div className="mf-page-intro"><div><div className="mf-eyebrow">HID DEVELOPMENT</div><h2>BadUSB HID</h2><p>Draft and review keyboard-emulation scripts for devices you own or are authorized to test.</p></div><Pill tone="green">DISARMED</Pill></div><Panel title="Payload workspace" eyebrow="LOCAL DRAFT"><label className="mf-field-label" htmlFor="payload-name">Draft name</label><input id="payload-name" className="mf-input" value={payloadName} onChange={(event) => setPayloadName(event.target.value)} /><div className="mf-code-preview"><div><span>01</span> REM <em>MaskedFlipper HID script draft</em></div><div><span>02</span> REM <em>Review before exporting to your own test device</em></div><div><span>03</span> <em>Execution is not connected</em></div></div><div className="mf-inline-actions"><Pill tone="amber">NOT DEPLOYED</Pill><button className="mf-btn mf-btn-secondary" onClick={() => addLog('INFO', `HID draft reviewed: ${payloadName || 'Untitled'}`)}>Save review event</button></div></Panel><Panel title="Safety status" eyebrow="EXECUTION INTERLOCK"><div className="mf-check-list"><div><span className="mf-check-number">01</span><span><b>Device connection</b><small>No connected HID device is detected.</small></span><Pill>Offline</Pill></div><div><span className="mf-check-number">02</span><span><b>Execution</b><small>Payload execution is disabled in this interface.</small></span><Pill tone="green">Disarmed</Pill></div></div></Panel></div>;
    if (tab === 'rf') return <div className="mf-page-stack"><div className="mf-page-intro"><div><div className="mf-eyebrow">RADIO FREQUENCY / INFRARED</div><h2>Sub-GHz & IR</h2><p>Organize test captures and review radio hardware state.</p></div><Pill>STANDBY</Pill></div><div className="mf-stat-grid mf-stat-grid-three"><div className="mf-stat"><span className="mf-stat-label">RADIO</span><strong>Offline</strong><small>Gateway unavailable</small></div><div className="mf-stat"><span className="mf-stat-label">IR TRANSCEIVER</span><strong>Unknown</strong><small>Awaiting telemetry</small></div><div className="mf-stat"><span className="mf-stat-label">CAPTURES</span><strong>00</strong><small>No files loaded</small></div></div><Panel title="Capture library" eyebrow="LOCAL VIEW"><div className="mf-empty-state"><span>⌁</span><b>No captures available</b><p>Captured signals will appear here after the device integration is implemented and files are imported.</p></div></Panel></div>;
    if (tab === 'nfc') return <div className="mf-page-stack"><div className="mf-page-intro"><div><div className="mf-eyebrow">NEAR-FIELD COMMUNICATION</div><h2>NFC / RFID</h2><p>Reader status and tag inspection workspace.</p></div><Pill>STANDBY</Pill></div><div className="mf-stat-grid mf-stat-grid-three"><div className="mf-stat"><span className="mf-stat-label">READER</span><strong>Offline</strong><small>Not connected</small></div><div className="mf-stat"><span className="mf-stat-label">LAST TAG</span><strong>—</strong><small>No tag read</small></div><div className="mf-stat"><span className="mf-stat-label">SAVED RECORDS</span><strong>00</strong><small>No local records</small></div></div><Panel title="Tag inspector" eyebrow="WAITING FOR HARDWARE"><div className="mf-empty-state"><span>▤</span><b>Reader not connected</b><p>Presenting a tag will have no effect until a compatible reader is connected through the device gateway.</p></div></Panel></div>;
    if (tab === 'hardware') return <div className="mf-page-stack"><div className="mf-page-intro"><div><div className="mf-eyebrow">DEVICE HEALTH</div><h2>Hardware & telemetry</h2><p>Sensor readings are shown as unavailable until real telemetry is received.</p></div><Pill tone="amber">NO LIVE DATA</Pill></div><div className="mf-stat-grid mf-stat-grid-three"><div className="mf-stat"><span className="mf-stat-label">CPU TEMPERATURE</span><strong>— <em>°C</em></strong><small>No sensor feed</small></div><div className="mf-stat"><span className="mf-stat-label">BATTERY VOLTAGE</span><strong>— <em>V</em></strong><small>No battery feed</small></div><div className="mf-stat"><span className="mf-stat-label">MEMORY</span><strong>— <em>%</em></strong><small>No system feed</small></div></div><Panel title="Sensor channels" eyebrow="TELEMETRY FEED"><div className="mf-table-wrap"><table className="mf-table"><thead><tr><th>Channel</th><th>Expected data</th><th>Latest reading</th><th>Status</th></tr></thead><tbody>{[['System temperature','°C'],['Battery monitor','V / %'],['IMU','Acceleration / gyro'],['GPIO health','Digital state']].map(([name,unit]) => <tr key={name}><td>{name}</td><td>{unit}</td><td>—</td><td><Pill>Waiting</Pill></td></tr>)}</tbody></table></div></Panel></div>;
    if (tab === 'screen') return <div className="mf-page-stack"><div className="mf-page-intro"><div><div className="mf-eyebrow">DISPLAY SIMULATOR</div><h2>Screen & keypad</h2><p>Preview text on a mock ST7789 screen. This does not drive the physical display.</p></div><Pill>LOCAL PREVIEW</Pill></div><div className="mf-two-col"><Panel title="Display preview" eyebrow="ST7789 / MOCK"><div className="mf-screen-stage"><div className="mf-screen"><div className="mf-screen-status">MASKED FLIPPER <span>●</span></div><pre>{screenText || ' '}</pre><div className="mf-screen-bottom">LOCAL PREVIEW ONLY</div></div></div></Panel><Panel title="Display content" eyebrow="TEST TEXT"><label className="mf-field-label" htmlFor="screen-text">Screen text</label><textarea id="screen-text" className="mf-textarea" value={screenText} maxLength={120} onChange={(event) => setScreenText(event.target.value)} /><div className="mf-field-hint">{screenText.length}/120 characters · line breaks supported</div><button className="mf-btn mf-btn-secondary mf-btn-wide" onClick={() => { setScreenText('MASKED\\nFLIPPER'); addLog('INFO', 'Display preview reset'); }}>Reset preview</button><div className="mf-keypad">{['↑','←','OK','→','↓'].map((key) => <button key={key} onClick={() => addLog('INFO', `Virtual keypad ${key} pressed in preview mode`)}>{key}</button>)}</div><p className="mf-field-hint">Virtual keys only create local UI log entries.</p></Panel></div></div>;
    return null;
  };

  const renderLogs = () => <div className="mf-page-stack"><div className="mf-page-intro"><div><div className="mf-eyebrow">SESSION HISTORY</div><h2>Audit logs</h2><p>Local interface events, not a device-side security log.</p></div><button className="mf-btn mf-btn-secondary" onClick={() => { setLogs([]); }}>Clear local logs</button></div><Panel title="Event stream" eyebrow={`${logs.length} LOCAL EVENTS`}><div className="mf-log-list mf-log-list-large">{logs.length ? logs.map((entry, index) => <div className="mf-log-row" key={`${entry.time}-${index}`}><span className={`mf-log-dot mf-log-${entry.level.toLowerCase()}`} /><time>{entry.time}</time><span>{entry.message}</span><Pill tone={entry.level === 'WARN' ? 'amber' : entry.level === 'SAFE' ? 'green' : 'muted'}>{entry.level}</Pill></div>) : <div className="mf-empty-state"><b>No local events</b><p>New UI activity will appear here.</p></div>}</div></Panel></div>;

  const renderOverview = () => <div className="mf-page-stack"><div className="mf-page-intro"><div><div className="mf-eyebrow">PROJECT DOCUMENTATION</div><h2>About MaskedFlipper</h2><p>A modular hardware research and development interface.</p></div><Pill>DEVELOPMENT</Pill></div><Panel title="Project intent" eyebrow="OVERVIEW"><p className="mf-body-copy">MaskedFlipper is a modular interface for experimenting with device telemetry, wireless lab tooling, HID development, NFC/RFID inspection, and a small screen/keypad workflow. The website is the control surface; hardware integration is a separate stage.</p><div className="mf-info-grid"><div><span>01</span><b>Web UI</b><p>Responsive browser workspace and local interaction states.</p></div><div><span>02</span><b>Device gateway</b><p>Authenticated transport between the browser and Raspberry Pi 4.</p></div><div><span>03</span><b>Hardware services</b><p>Explicit APIs for status, telemetry, files, and permitted actions.</p></div></div></Panel><Panel title="Implementation status" eyebrow="CURRENT STATE"><div className="mf-check-list"><div><span className="mf-check-number">01</span><span><b>Dashboard UI</b><small>Client-side navigation and visual module states.</small></span><Pill tone="green">UI</Pill></div><div><span className="mf-check-number">02</span><span><b>Terminal interface</b><small>Local demo console; not connected to a shell.</small></span><Pill tone="amber">Demo</Pill></div><div><span className="mf-check-number">03</span><span><b>Pi 4 gateway</b><small>Authentication, WebSocket relay, and command authorization remain to be implemented.</small></span><Pill tone="red">Pending</Pill></div></div></Panel></div>;

  if (!authChecked) return <div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#050607',color:'#55dff7',fontFamily:'monospace'}}>INITIALIZING WORKSPACE_</div>;
  if (!authenticated) return <MaskedFlipperLogin onLogin={() => setAuthenticated(true)} />;

  return (
    <main className="mf-shell">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');
        .mf-shell{--bg:#090a0c;--surface:#101114;--surface2:#15161a;--border:#25262c;--muted:#8b8d98;--text:#f3f3f5;--red:#ef2638;--red2:#a91020;min-height:100vh;background:var(--bg);color:var(--text);font-family:'Manrope',sans-serif;font-size:14px;display:flex}
        .mf-shell *{box-sizing:border-box}.mf-shell button,.mf-shell input,.mf-shell textarea{font:inherit}.mf-sidebar{width:248px;flex:0 0 248px;background:#0c0d0f;border-right:1px solid #222329;min-height:100vh;padding:25px 15px 18px;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow:auto}.mf-brand{display:flex;align-items:center;gap:11px;padding:0 9px 27px;border-bottom:1px solid #232429}.mf-brand-mark{width:37px;height:37px;border:1px solid #84212c;background:linear-gradient(145deg,#3b0b12,#171013);border-radius:10px;display:grid;place-items:center;color:#ff4657;font-size:19px;font-weight:800}.mf-brand-name{font-weight:800;letter-spacing:1.8px;font-size:14px}.mf-brand-name span{display:block;color:#a0a1a9;font-size:9px;letter-spacing:2.1px;margin-top:4px;font-family:'DM Mono',monospace}.mf-nav-group{margin-top:25px}.mf-nav-label{font:10px 'DM Mono',monospace;letter-spacing:1.8px;color:#646671;padding:0 11px 10px}.mf-nav-item{width:100%;display:flex;align-items:center;gap:11px;text-align:left;color:#9a9ba4;background:transparent;border:1px solid transparent;border-radius:8px;padding:10px 11px;margin:2px 0;cursor:pointer;font-size:12px;transition:.15s}.mf-nav-item:hover{background:#17181c;color:#f4f4f6}.mf-nav-item.active{background:linear-gradient(90deg,#351016,#1b1013);border-color:#51202a;color:#fff}.mf-nav-icon{width:20px;text-align:center;font:16px 'DM Mono',monospace;color:#8e909a}.mf-nav-item.active .mf-nav-icon{color:#ff4b5c}.mf-sidebar-bottom{margin-top:auto;padding:18px 8px 0}.mf-device-status{border:1px solid #292a30;background:#121316;border-radius:9px;padding:13px}.mf-status-head{display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:700}.mf-status-sub{font:10px 'DM Mono',monospace;color:#81838d;margin-top:8px}.mf-status-line{display:flex;align-items:center;gap:7px;color:#ff6975;font:10px 'DM Mono',monospace;margin-top:12px}.mf-main{min-width:0;flex:1}.mf-topbar{height:70px;border-bottom:1px solid #222329;display:flex;align-items:center;justify-content:space-between;padding:0 32px;background:#0b0c0e}.mf-breadcrumb{color:#777984;font:11px 'DM Mono',monospace}.mf-breadcrumb b{color:#f2f2f4;font-weight:500}.mf-top-right{display:flex;align-items:center;gap:19px}.mf-clock{font:12px 'DM Mono',monospace;color:#c5c6cc}.mf-top-divider{height:25px;width:1px;background:#2b2c32}.mf-avatar{width:30px;height:30px;border:1px solid #34353c;border-radius:50%;display:grid;place-items:center;background:#191a1e;color:#f35a67;font-size:11px;font-weight:800}.mf-content{padding:30px 32px 50px;max-width:1600px;margin:0 auto}.mf-content-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:25px;gap:18px}.mf-content-head h1{font-size:24px;letter-spacing:-.7px;margin:0;font-weight:800}.mf-content-head p{margin:7px 0 0;color:#858792;font-size:12px}.mf-top-badges{display:flex;align-items:center;gap:9px}.mf-eyebrow{font:10px 'DM Mono',monospace;letter-spacing:1.8px;color:#e74a59;margin-bottom:10px}.mf-live-dot{width:6px;height:6px;display:inline-block;background:#e92c40;border-radius:50%;margin-right:7px;box-shadow:0 0 10px #e92c4070}.mf-pill{display:inline-flex;align-items:center;white-space:nowrap;padding:5px 8px;border:1px solid #34353c;background:#191a1f;border-radius:5px;color:#a7a8b0;font:9px 'DM Mono',monospace;letter-spacing:.5px}.mf-pill-red{border-color:#63212a;background:#291015;color:#ff6674}.mf-pill-green{border-color:#244d3a;background:#102119;color:#6ed69a}.mf-pill-amber{border-color:#5c4824;background:#241d10;color:#e8c06b}.mf-page-stack{display:flex;flex-direction:column;gap:22px}.mf-hero{border:1px solid #362027;border-radius:13px;background:radial-gradient(ellipse at 80% 48%,#31141b 0%,#171014 28%,#111114 64%);padding:32px 36px;min-height:300px;display:flex;align-items:center;justify-content:space-between;overflow:hidden;position:relative}.mf-hero:after{content:'';position:absolute;inset:0;background-image:linear-gradient(#ffffff04 1px,transparent 1px),linear-gradient(90deg,#ffffff04 1px,transparent 1px);background-size:28px 28px;pointer-events:none}.mf-hero-copy{position:relative;z-index:1;max-width:520px}.mf-hero h2{font-size:34px;line-height:1.18;letter-spacing:-1.4px;margin:0;font-weight:800}.mf-hero h2 span{color:#f13b4d}.mf-hero p{color:#a1a0a8;font-size:12px;line-height:1.8;max-width:440px;margin:15px 0 21px}.mf-hero-actions{display:flex;gap:10px;flex-wrap:wrap}.mf-btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;border:1px solid transparent;border-radius:7px;padding:10px 13px;cursor:pointer;font-size:11px;font-weight:700;transition:.15s}.mf-btn-primary{background:#e9293d;color:#fff;border-color:#f33c4e}.mf-btn-primary:hover{background:#fa3d50}.mf-btn-secondary{background:#17181c;color:#d7d8de;border-color:#34353c}.mf-btn-secondary:hover{background:#202126;border-color:#4b4c55}.mf-btn-wide{width:100%;margin-top:18px}.mf-device-art{position:relative;width:280px;min-width:230px;height:245px;display:flex;justify-content:center;align-items:center;z-index:1}.mf-device{width:136px;height:220px;background:linear-gradient(120deg,#292a2f,#0b0c0f 55%,#1c1d21);border:1px solid #5a3038;border-radius:19px;box-shadow:0 18px 50px #000b,0 0 40px #e92a3b1c;transform:rotate(7deg);padding:13px 10px;position:relative}.mf-device-brand{text-align:center;font:8px 'DM Mono',monospace;letter-spacing:1px;color:#eee;margin:4px 0 12px}.mf-device-brand span{color:#f03a4d;margin-left:3px}.mf-device-screen{height:76px;background:#080d0d;border:2px solid #343b3b;box-shadow:inset 0 0 20px #1b6c4920;padding:9px 7px;color:#55e99a;font:7px 'DM Mono',monospace;display:flex;flex-direction:column;gap:8px}.mf-device-screen b{font-size:12px}.mf-device-screen small{color:#bc5a66;font-size:6px}.mf-device-pad{margin:14px auto 0;width:85px;display:grid;grid-template-columns:repeat(3,1fr);gap:5px;justify-items:center}.mf-device-pad i{width:18px;height:18px;border:1px solid #505159;border-radius:50%;background:linear-gradient(145deg,#25262b,#0d0e10);box-shadow:0 2px 2px #000}.mf-device-pad i:nth-child(3){background:#35161b;border-color:#9b2836}.mf-device-antenna{position:absolute;width:6px;height:67px;right:45px;top:0;background:linear-gradient(90deg,#282a2d,#676970,#1a1b1f);border-radius:4px;transform:rotate(7deg)}.mf-device-port{position:absolute;bottom:-4px;left:54px;width:27px;height:5px;background:#08090a;border:1px solid #4c3035;border-radius:0 0 4px 4px}.mf-art-label{position:absolute;bottom:0;right:0;text-align:right;font:9px 'DM Mono',monospace;color:#888995;letter-spacing:1px}.mf-art-label b{display:block;color:#ed5866;margin-top:6px;font-weight:500}.mf-stat-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px}.mf-stat-grid-three{grid-template-columns:repeat(3,minmax(0,1fr))}.mf-stat{background:#111215;border:1px solid #27282e;border-radius:10px;padding:17px 18px;min-width:0;position:relative}.mf-stat-icon{float:right;color:#e84a5a;font-size:17px}.mf-stat-label{display:block;color:#858792;font:9px 'DM Mono',monospace;letter-spacing:1px;margin-bottom:14px}.mf-stat strong{display:block;font-size:24px;letter-spacing:-.7px}.mf-stat strong em{font-style:normal;font-size:12px;color:#8b8c96;font-weight:500}.mf-stat small{display:block;color:#797b85;font-size:10px;margin-top:7px}.mf-section-heading{display:flex;justify-content:space-between;align-items:end;gap:15px}.mf-section-heading h2{font-size:19px;letter-spacing:-.5px;margin:0}.mf-section-heading>span{font:9px 'DM Mono',monospace;color:#777984;letter-spacing:1px}.mf-section-heading>span i{color:#e92d40;font-style:normal}.mf-module-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}.mf-module-card{min-width:0;text-align:left;border:1px solid #28292f;border-radius:10px;background:linear-gradient(145deg,#141519,#101114);padding:18px;color:#eee;cursor:pointer;transition:.18s}.mf-module-card:hover{border-color:#74303a;transform:translateY(-2px);background:linear-gradient(145deg,#1b1518,#111114)}.mf-module-top{display:flex;align-items:center;justify-content:space-between}.mf-module-icon{width:37px;height:37px;display:grid;place-items:center;background:#251318;border:1px solid #4b2028;color:#ff5364;border-radius:9px;font:19px 'DM Mono',monospace}.mf-module-card h3{font-size:13px;margin:17px 0 7px}.mf-module-card p{font-size:11px;color:#858792;line-height:1.7;min-height:38px;margin:0}.mf-module-open{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #292a30;padding-top:13px;margin-top:16px;font:10px 'DM Mono',monospace;color:#9a9ba4}.mf-module-open b{color:#f04455;font-size:14px}.mf-two-col{display:grid;grid-template-columns:1.05fr .95fr;gap:14px;align-items:start}.mf-panel{background:#111215;border:1px solid #292a30;border-radius:10px;padding:19px;min-width:0}.mf-panel-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px}.mf-panel-head h2{font-size:14px;margin:0;font-weight:700}.mf-panel-head .mf-eyebrow{font-size:9px;margin-bottom:7px}.mf-text-btn{background:none;border:0;color:#ed5361;cursor:pointer;font-size:10px;font-weight:700;white-space:nowrap}.mf-log-list{display:flex;flex-direction:column}.mf-log-row{display:grid;grid-template-columns:7px 62px minmax(0,1fr) auto;align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid #25262b;font-size:10px;min-width:0}.mf-log-row:last-child{border-bottom:0}.mf-log-row time{font:10px 'DM Mono',monospace;color:#7e808a}.mf-log-row>span:nth-child(3){color:#c3c4cb;line-height:1.5;overflow-wrap:anywhere}.mf-log-dot{width:6px;height:6px;border-radius:50%;background:#7c7e87}.mf-log-info{background:#69a9ed}.mf-log-warn{background:#e7b34d}.mf-log-safe{background:#59cb8a}.mf-check-list{display:flex;flex-direction:column;gap:16px}.mf-check-list>div{display:flex;align-items:center;gap:11px;min-width:0}.mf-check-number{width:28px;height:28px;display:grid;place-items:center;border-radius:7px;background:#1c1d22;border:1px solid #33343b;color:#f05a68;font:10px 'DM Mono',monospace;flex:0 0 auto}.mf-check-list>div>span:nth-child(2){flex:1;min-width:0}.mf-check-list b{display:block;font-size:11px}.mf-check-list small{display:block;color:#838590;font-size:10px;line-height:1.5;margin-top:4px}.mf-page-intro{display:flex;align-items:flex-start;justify-content:space-between;gap:15px}.mf-page-intro h2{font-size:25px;letter-spacing:-.8px;margin:0;font-weight:800}.mf-page-intro p{font-size:12px;color:#8d8f99;margin:8px 0 0;line-height:1.7}.mf-terminal-banner{display:flex;align-items:center;gap:13px;padding:14px 16px;background:#1d1710;border:1px solid #594321;border-radius:9px}.mf-banner-icon{width:28px;height:28px;display:grid;place-items:center;border-radius:50%;background:#352817;color:#e8bd66;font-weight:800;flex:0 0 auto}.mf-terminal-banner>div{flex:1}.mf-terminal-banner b{font-size:11px;color:#f0d8a0}.mf-terminal-banner p{font-size:10px;color:#b8a98d;margin:4px 0 0;line-height:1.6}.mf-terminal-window{background:#070809;border:1px solid #33343a;border-radius:10px;overflow:hidden;box-shadow:0 15px 45px #0003}.mf-terminal-titlebar{height:47px;background:#151619;border-bottom:1px solid #292a30;display:flex;align-items:center;justify-content:space-between;padding:0 15px;gap:12px}.mf-terminal-titlebar>span{font:11px 'DM Mono',monospace;color:#c7c8cf;flex:1;text-align:center}.mf-window-dots{display:flex;gap:5px}.mf-window-dots i{width:7px;height:7px;border-radius:50%;background:#e95460}.mf-window-dots i:nth-child(2){background:#d8a74d}.mf-window-dots i:nth-child(3){background:#5bc98a}.mf-terminal-body{padding:20px 20px 15px;min-height:330px;max-height:540px;overflow:auto;color:#c5c8ca;font:12px/1.9 'DM Mono',monospace;white-space:pre-wrap;overflow-wrap:anywhere}.mf-terminal-accent{color:#f05465;font-weight:500}.mf-terminal-muted{color:#e6b95f}.mf-terminal-form{display:flex;gap:9px;align-items:center;margin-top:6px}.mf-terminal-form label{color:#6cdd9c;white-space:nowrap}.mf-terminal-form input{background:transparent;border:0;outline:0;color:#f4f4f4;flex:1;min-width:0;font:12px 'DM Mono',monospace}.mf-terminal-form button{border:1px solid #563039;background:#271116;color:#ff6674;border-radius:5px;width:27px;height:27px;cursor:pointer}.mf-terminal-footer{border-top:1px solid #25262b;padding:10px 15px;display:flex;justify-content:space-between;color:#787a83;font:9px 'DM Mono',monospace;letter-spacing:.5px}.mf-terminal-footer>span:first-child{color:#73d79c}.mf-terminal-footer i{font-style:normal;color:#e94b5b}.mf-terminal-hints{display:flex;gap:8px;flex-wrap:wrap}.mf-terminal-hints button{border:1px solid #303138;background:#15161a;color:#b9bac2;border-radius:5px;padding:7px 10px;font:10px 'DM Mono',monospace;cursor:pointer}.mf-body-copy{font-size:12px;color:#a4a5ad;line-height:1.9;margin:0 0 17px}.mf-field-label{display:block;font-size:10px;color:#a4a5ad;margin:0 0 8px}.mf-input,.mf-textarea{width:100%;border:1px solid #36373e;background:#0b0c0e;border-radius:7px;color:#ededf0;padding:11px 12px;outline:none;font-size:12px}.mf-input:focus,.mf-textarea:focus{border-color:#b63847}.mf-field-hint{font-size:10px;color:#777984;margin-top:8px;line-height:1.6}.mf-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:17px}.mf-readonly{border:1px solid #36373e;background:#0b0c0e;border-radius:7px;padding:11px 12px;font:11px 'DM Mono',monospace;color:#e3bd6d}.mf-segmented{display:flex;gap:5px;padding:5px;background:#121316;border:1px solid #292a30;border-radius:8px;width:max-content;max-width:100%}.mf-segmented button{border:1px solid transparent;background:transparent;color:#8e9099;border-radius:5px;padding:9px 12px;font-size:10px;cursor:pointer}.mf-segmented button.active{background:#2a1116;border-color:#56212a;color:#ff6a78}.mf-empty-state{min-height:155px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:22px}.mf-empty-state>span{width:40px;height:40px;display:grid;place-items:center;border:1px solid #44232a;background:#211317;border-radius:10px;color:#f35464;font-size:21px;margin-bottom:13px}.mf-empty-state b{font-size:12px}.mf-empty-state p{font-size:11px;color:#838590;max-width:390px;line-height:1.8;margin:7px 0 0}.mf-code-preview{background:#08090b;border:1px solid #2c2d33;border-radius:8px;padding:15px;margin-top:16px;font:11px/2 'DM Mono',monospace;color:#d1d1d6;overflow:auto}.mf-code-preview div{white-space:nowrap}.mf-code-preview span{display:inline-block;width:30px;color:#666873}.mf-code-preview em{font-style:normal;color:#77bf91}.mf-inline-actions{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:15px}.mf-table-wrap{overflow:auto}.mf-table{width:100%;border-collapse:collapse;text-align:left;font-size:10px}.mf-table th{font:9px 'DM Mono',monospace;color:#797b85;letter-spacing:.7px;text-transform:uppercase;background:#15161a}.mf-table th,.mf-table td{padding:13px 12px;border-bottom:1px solid #292a30;white-space:nowrap}.mf-table td{color:#b8b9c1}.mf-info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px}.mf-info-grid>div{border:1px solid #2d2e34;background:#15161a;border-radius:8px;padding:16px}.mf-info-grid span{display:block;font:10px 'DM Mono',monospace;color:#f05261;margin-bottom:16px}.mf-info-grid b{font-size:12px}.mf-info-grid p{font-size:10px;color:#898b95;line-height:1.7;margin:7px 0 0}.mf-screen-stage{min-height:250px;display:grid;place-items:center;background:radial-gradient(ellipse,#23242a,#101114 68%);border:1px solid #2b2c32;border-radius:9px;padding:20px}.mf-screen{width:min(100%,290px);aspect-ratio:1.22/1;background:#0a2017;border:7px solid #303239;border-radius:7px;box-shadow:0 0 25px #31c87b12,inset 0 0 25px #0008;padding:12px;color:#7ef5ad;font:10px 'DM Mono',monospace;display:flex;flex-direction:column}.mf-screen-status{display:flex;justify-content:space-between;font-size:8px;border-bottom:1px solid #286344;padding-bottom:7px}.mf-screen-status span{color:#7ef5ad}.mf-screen pre{font:20px/1.5 'DM Mono',monospace;white-space:pre-wrap;overflow-wrap:anywhere;flex:1;margin:15px 0}.mf-screen-bottom{border-top:1px solid #286344;padding-top:7px;font-size:7px;color:#5aa77a}.mf-textarea{min-height:110px;resize:vertical;font-family:'DM Mono',monospace;line-height:1.7}.mf-keypad{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-top:17px}.mf-keypad button{border:1px solid #3a3b43;background:#1b1c21;color:#e2e2e7;border-radius:6px;padding:10px 0;cursor:pointer}.mf-keypad button:nth-child(3){background:#31151b;border-color:#6d2732;color:#ff6a78}.mf-mobile-menu{display:none}
        .mf-shell{--red:#e63329;--red2:#a91c15}.mf-brand-mark{border-radius:0;color:#e63329;background:linear-gradient(145deg,#210d0a,#111)}.mf-nav-item,.mf-device-status,.mf-panel,.mf-module-card,.mf-stat,.mf-terminal-window,.mf-btn,.mf-input,.mf-textarea,.mf-segmented,.mf-screen-stage,.mf-info-grid>div{border-radius:0}.mf-eyebrow{color:#55dff7}.mf-nav-item.active{background:linear-gradient(90deg,#25100d,#100d0c);border-color:#48211b}.mf-nav-item.active .mf-nav-icon,.mf-module-icon,.mf-module-card:hover h3{color:#e63329}.mf-hero{border-radius:0;background:radial-gradient(ellipse at 80% 48%,#24100d 0%,#101012 55%,#090a0c 90%);border-color:#34211d}.mf-hero h2 span{color:#e63329}.mf-btn-primary{background:#e63329;border-color:#e63329}.mf-btn-secondary:hover{border-color:#55dff7;color:#55dff7}.mf-live-dot{background:#e63329}.mf-pill{border-radius:0}.mf-stat:before{background:#e63329}.mf-signout{border:1px solid #33343a;background:#101114;color:#55dff7;padding:8px 10px;font:9px 'DM Mono',monospace;cursor:pointer}.mf-signout:hover{border-color:#e63329;color:#fff}
        @media(max-width:1100px){.mf-sidebar{width:215px;flex-basis:215px}.mf-content{padding:24px 22px}.mf-topbar{padding:0 22px}.mf-hero{padding:27px}.mf-hero h2{font-size:29px}.mf-module-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.mf-stat-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:760px){.mf-shell{display:block}.mf-sidebar{position:relative;width:100%;height:auto;min-height:0;padding:14px 15px;border-right:0;border-bottom:1px solid #25262b;overflow:visible}.mf-brand{padding:0 2px 13px;border-bottom:0}.mf-sidebar-bottom{display:none}.mf-nav-group{margin-top:10px}.mf-nav-label{padding:0 3px 7px}.mf-nav-group:not(:first-of-type){display:none}.mf-sidebar:focus-within .mf-nav-group{display:block}.mf-nav-group:first-of-type .mf-nav-item{display:inline-flex;width:auto;margin-right:4px;padding:8px 10px}.mf-nav-group:first-of-type .mf-nav-item .mf-nav-icon{width:auto}.mf-topbar{height:54px;padding:0 16px}.mf-content{padding:22px 14px 36px}.mf-content-head{margin-bottom:20px}.mf-content-head h1{font-size:20px}.mf-clock{font-size:10px}.mf-hero{padding:23px;min-height:0}.mf-device-art{display:none}.mf-hero h2{font-size:28px}.mf-hero p{font-size:11px}.mf-stat-grid,.mf-stat-grid-three{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.mf-stat{padding:14px}.mf-stat strong{font-size:21px}.mf-section-heading{align-items:start;flex-direction:column}.mf-module-grid{grid-template-columns:1fr}.mf-module-card p{min-height:0}.mf-two-col{grid-template-columns:1fr}.mf-panel{padding:15px}.mf-log-row{grid-template-columns:7px 55px minmax(0,1fr);gap:8px}.mf-log-row .mf-pill{display:none}.mf-page-intro{flex-direction:column}.mf-page-intro h2{font-size:23px}.mf-terminal-banner{align-items:flex-start;flex-wrap:wrap}.mf-terminal-banner .mf-text-btn{margin-left:40px}.mf-terminal-body{padding:15px;font-size:11px;min-height:300px}.mf-terminal-form{align-items:flex-start;flex-wrap:wrap}.mf-terminal-form label{width:100%}.mf-form-grid,.mf-info-grid{grid-template-columns:1fr}.mf-segmented{width:100%}.mf-segmented button{flex:1}.mf-table{min-width:500px}}
      `}</style>
      <aside className="mf-sidebar">
        <div className="mf-brand"><div className="mf-brand-mark">M<span>⌁</span></div><div className="mf-brand-name">MASKEDFLIPPER<span>DEVICE WORKSPACE</span></div></div>
        <nav aria-label="Main navigation">
          {navGroups.map((group) => <div className="mf-nav-group" key={group.title}><div className="mf-nav-label">{group.title}</div>{group.items.map((item) => <button key={item.id} className={`mf-nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}><span className="mf-nav-icon">{item.icon}</span><span>{item.label}</span>{item.id === 'terminal' && <span style={{ marginLeft: 'auto', color: '#d8a84f', font: '8px "DM Mono", monospace' }}>LOCAL</span>}</button>)}</div>)}
        </nav>
        <div className="mf-sidebar-bottom"><div className="mf-device-status"><div className="mf-status-head"><span>Raspberry Pi 4</span><Pill tone="red">OFFLINE</Pill></div><div className="mf-status-sub">MASKED FLIPPER / TARGET</div><div className="mf-status-line"><span className="mf-live-dot" /> GATEWAY NOT CONFIGURED</div></div></div>
      </aside>
      <div className="mf-main">
        <header className="mf-topbar"><div className="mf-breadcrumb">WORKSPACE <span style={{ color: '#4e5059', margin: '0 8px' }}>/</span> <b>{pageTitle.toUpperCase()}</b></div><div className="mf-top-right"><span className="mf-clock">{clock}</span><span className="mf-top-divider" /><Pill tone="amber">SIMULATION / UI</Pill><button className="mf-signout" onClick={() => { sessionStorage.removeItem('mf-ui-session'); setAuthenticated(false); }} title="Sign out">SIGN OUT ↗</button><div className="mf-avatar">MF</div></div></header>
        <div className="mf-content">
          <div className="mf-content-head"><div><h1>{pageTitle}</h1><p>MaskedFlipper development console <span style={{ color: '#e94455' }}>·</span> Raspberry Pi 4 integration workspace</p></div><div className="mf-top-badges"><Pill>BUILD 0.2.0</Pill></div></div>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'terminal' && renderTerminal()}
          {['wifi','badusb','rf','nfc','hardware','screen'].includes(activeTab) && renderModule(activeTab)}
          {activeTab === 'logs' && renderLogs()}
          {activeTab === 'overview' && renderOverview()}
          <footer style={{ borderTop: '1px solid #24252b', marginTop: 34, paddingTop: 16, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', color: '#656772', font: '9px "DM Mono", monospace', letterSpacing: '.5px' }}><span>MASKEDFLIPPER // DEVELOPMENT BUILD</span><span>HARDWARE COMMANDS DISABLED UNTIL GATEWAY AUTHENTICATION</span></footer>
        </div>
      </div>
    </main>
  );
}
