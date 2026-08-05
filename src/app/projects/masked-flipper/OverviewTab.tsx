'use client';
import React, { useState, useEffect, useRef } from 'react';

/* --- Data Structures --- */

const objectives = [
  { title: 'RF Experimentation', desc: 'Sweep and analyze sub-GHz frequencies to capture fixed-code wireless signals.', icon: 'fa-wave-square' },
  { title: 'NFC/RFID Research', desc: 'Read tag UIDs, inspect memory dumps, and explore 13.56MHz and 125kHz protocols.', icon: 'fa-id-card' },
  { title: 'Network Auditing', desc: 'Passively map access points, trace BLE beacons, and evaluate WiFi roaming resilience.', icon: 'fa-wifi' },
  { title: 'Embedded Linux', desc: 'Optimize Raspberry Pi OS for portable headless operation with minimal power draw.', icon: 'fa-linux fa-brands' },
  { title: 'Portable Toolkit', desc: 'A pocket-sized platform independent of laptops, driven entirely by an on-device UI.', icon: 'fa-toolbox' },
  { title: 'Modular Architecture', desc: 'A unified backend pattern allowing new capabilities (BLE, GPS) to plug in seamlessly.', icon: 'fa-cubes' },
];

const hardwareSpecs = [
  { name: 'Raspberry Pi 4 Model B (4GB)', role: 'Compute Core', desc: 'Selected for its balance of compute power and GPIO availability. Runs the full Linux OS needed for aircrack-ng, hosts the Flask backend, and drives SPI/I2C peripherals. Chosen over microcontrollers (ESP32/STM32) due to the need for full OS networking stacks.', icon: 'fa-microchip' },
  { name: 'CC1101 Transceiver', role: 'Sub-GHz Radio', desc: 'Selected for versatile sub-GHz tuning. Handles 315/433/868/915 MHz frequency sweeping and raw OOK/ASK packet injection via SPI. Chosen for its wide library support in Python.', icon: 'fa-tower-broadcast' },
  { name: 'PN532 / RC522', role: 'High-Freq NFC/RFID', desc: 'Interacts with 13.56MHz tags (Mifare Classic, NTAG). Supports UID reading, sector memory dumps, and magic tag cloning. Wired via SPI to free up I2C for the RTC.', icon: 'fa-wifi-fair' },
  { name: 'RDM6300', role: 'Low-Freq RFID', desc: 'Handles 125kHz legacy RFID tags (EM4100). Interfaced via UART since it outputs simple serial ASCII data when a tag is present.', icon: 'fa-id-badge' },
  { name: '1.54" ST7789', role: 'SPI Display', desc: '240x240 color IPS display driven by Python Pillow/luma.lcd for the standalone field interface. Chosen for its fast SPI refresh rate compared to I2C OLEDs.', icon: 'fa-tv' },
  { name: '4x4 Matrix Keypad', role: 'Physical Input', desc: 'Membrane keypad wired directly to 8 GPIO pins. A custom Python polling loop handles debouncing, enabling menu navigation without a touch screen.', icon: 'fa-keyboard' },
  { name: 'PiSugar 3', role: 'Power & RTC', desc: '1200mAh battery hat providing portable power. Includes an onboard Real-Time Clock (I2C) to keep accurate timestamps for audit logs when offline.', icon: 'fa-car-battery' },
  { name: 'USB WiFi (RTL8812AU)', role: 'Network Auditing', desc: 'External USB adapter supporting Monitor Mode and Packet Injection, bypassing the limitations of the internal Broadcom chip.', icon: 'fa-wifi' },
  { name: 'GPS (NEO-6M)', role: 'Location Tagging', desc: 'UART GPS module used to geo-tag captured WiFi networks (Wardriving) and map BLE beacons.', icon: 'fa-location-dot' },
];

const softwareStack = [
  { layer: 'Frontend Dashboard', tech: 'React & Next.js', desc: 'Provides the rich, responsive LAN-accessible web interface with real-time UI updates.', icon: 'fa-react fa-brands' },
  { layer: 'Backend Service', tech: 'Python 3 & Flask', desc: 'Central intelligence managing hardware lifecycles, REST API, and SQLite database.', icon: 'fa-python fa-brands' },
  { layer: 'Real-time Comms', tech: 'Socket.IO / WebSockets', desc: 'Synchronizes state instantly between the Python backend, the SPI display, and the browser.', icon: 'fa-network-wired' },
  { layer: 'Hardware Drivers', tech: 'RPi.GPIO, spidev, Pillow', desc: 'Low-level Python libraries interfacing directly with the SPI bus and GPIO pins.', icon: 'fa-memory' },
  { layer: 'Storage / Audit', tech: 'SQLite3', desc: 'Zero-config embedded database logging every capture, target scope, and audit event.', icon: 'fa-database' },
];

const roadmapMilestones = [
  { phase: 'Phase 1', title: 'Planning & Hardware Selection', status: 'Completed', desc: 'Defined the architecture, selected the Raspberry Pi 4, and ordered breakout modules (CC1101, RC522, ST7789).' },
  { phase: 'Phase 2', title: 'OS & Headless Setup', status: 'Completed', desc: 'Flashed Kali Linux / RPiOS, disabled HDMI, optimized boot times, and configured SSH/I2C/SPI interfaces.' },
  { phase: 'Phase 3 (M1)', title: 'Backend Skeleton', status: 'Completed', desc: 'Built the Flask + Socket.IO API, designed the Module Manager pattern, and established the SQLite audit database.' },
  { phase: 'Phase 4 (M2)', title: 'On-Device Display', status: 'Completed', desc: 'Integrated the ST7789 SPI display and 4x4 keypad. Built the Python Pillow renderer for field navigation.' },
  { phase: 'Phase 5 (M3)', title: 'IR & NFC Integration', status: 'Completed', desc: 'Wired IR receivers and the RC522 module. Implemented tag reading, saving, and the replay logic.' },
  { phase: 'Phase 6', title: 'Web Dashboard V1', status: 'Completed', desc: 'Developed the React frontend, establishing WebSocket connections and the initial cyberpunk UI styling.' },
  { phase: 'Phase 7 (M4)', title: 'Sub-GHz & Telemetry', status: 'In Progress', desc: 'Wired the CC1101 module for RF sweeps. Implemented ADC voltage monitoring and piezo audio feedback.' },
  { phase: 'Phase 8 (M5)', title: 'WiFi Auditing Suite', status: 'Planned', desc: 'Integrating the RTL8812AU adapter, enabling monitor mode, aircrack-ng parsing, and rogue AP deployment.' },
  { phase: 'Phase 9', title: 'BadUSB & Security Gates', status: 'Planned', desc: 'Configuring Linux USB Gadget mode (`dwc2`) and enforcing scope-confirmation tokens for all active operations.' },
  { phase: 'Phase 10 (M6)', title: 'Optimization & Demo Prep', status: 'Planned', desc: 'Finalizing the unified architecture, fixing SPI tearing, optimizing battery draw, and preparing the hackathon demo.' },
];

const limitations = [
  { limit: 'RC522 Protocol Constraints', impact: 'Cannot natively read low-frequency 125kHz RFID tags (requires separate RDM6300 module). Does not support FeliCa or ISO15693.' },
  { limit: 'Rolling Code RF', impact: 'Sub-GHz module captures raw waveforms but cannot emulate encrypted rolling codes (e.g., modern car keys).' },
  { limit: 'Linux Boot Time', impact: 'Unlike RTOS microcontrollers (e.g. Flipper Zero), the Raspberry Pi takes 30-40 seconds to boot before the UI is usable.' },
  { limit: 'Battery Runtime', impact: 'The Pi 4 draws significant idle current. The 1200mAh battery provides only ~1.5 hours of active field use.' },
];

const techMetrics = [
  { label: 'Compute Core', value: 'Broadcom BCM2711' },
  { label: 'Memory (RAM)', value: '4GB LPDDR4' },
  { label: 'Operating System', value: 'Raspberry Pi OS (Linux)' },
  { label: 'Core Language', value: 'Python 3.11' },
  { label: 'Sub-GHz Bands', value: '315, 433, 868, 915 MHz' },
  { label: 'NFC Support', value: '13.56MHz (ISO14443A)' },
  { label: 'Display Buffer', value: '240x240 RGB565' },
  { label: 'Real-time Protocol', value: 'WebSocket (Socket.IO)' },
];

const capabilities = {
  completed: ['Dashboard Shell', 'NFC/RFID Module', 'Hardware Telemetry', 'Module Architecture', 'SQLite Logging'],
  progress: ['Sub-GHz Integration', 'Dashboard Synchronization', 'ST7789 Screen Rendering'],
  planned: ['WiFi Active Tier', 'BadUSB HID Injection', 'BLE Beacon Tracking', 'Mobile PWA Support']
};

export default function OverviewTab() {
  const [activeSection, setActiveSection] = useState('exec-summary');
  const sectionsRef = useRef<HTMLDivElement>(null);

  // Scroll Spy logic
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionsRef.current) return;
      const sections = sectionsRef.current.querySelectorAll('section');
      let currentId = 'exec-summary';
      let minDistance = Infinity;

      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        // Check distance to top of viewport (plus offset for sticky header)
        const distance = Math.abs(rect.top - 120);
        if (distance < minDistance && rect.top < 300) {
          minDistance = distance;
          currentId = sec.id;
        }
      });
      setActiveSection(currentId);
    };

    const container = document.querySelector('.mfd-content');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const container = document.querySelector('.mfd-content');
    if (el && container) {
      const topPos = el.offsetTop - 40; // offset for padding
      container.scrollTo({ top: topPos, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'exec-summary', label: '1. Executive Summary' },
    { id: 'objectives', label: '2. Project Objectives' },
    { id: 'architecture', label: '3. System Architecture' },
    { id: 'hardware', label: '4. Hardware Specs' },
    { id: 'software', label: '5. Software Stack' },
    { id: 'features', label: '6. Feature Docs' },
    { id: 'roadmap', label: '7. Dev Roadmap' },
    { id: 'challenges', label: '8. Engineering Challenges' },
    { id: 'security', label: '9. Security & Use' },
    { id: 'capabilities', label: '10. Capabilities' },
    { id: 'limitations', label: '11. Limitations' },
    { id: 'future', label: '12. Future Roadmap' },
    { id: 'metrics', label: '13. Tech Metrics' }
  ];

  return (
    <div className="doc-wrapper mfd-fade-in">
      <style>{`
        .doc-wrapper { display:flex; gap:32px; font-family:'Outfit', sans-serif; color:#d4d4d4; }
        
        /* Sidebar Scroll Spy */
        .doc-sidebar { width:240px; flex-shrink:0; position:sticky; top:20px; align-self:flex-start; max-height:calc(100vh - 120px); overflow-y:auto; border-right:1px solid #1e1e1e; padding-right:16px; scrollbar-width:thin; scrollbar-color:#333 transparent; }
        .doc-sidebar::-webkit-scrollbar { width:4px; }
        .doc-sidebar::-webkit-scrollbar-thumb { background:#333; border-radius:4px; }
        .doc-nav-item { display:block; padding:8px 12px; color:#7a7a7a; font-size:13px; font-weight:500; text-decoration:none; border-radius:6px; cursor:pointer; transition:all .15s; margin-bottom:4px; border-left:2px solid transparent; }
        .doc-nav-item:hover { color:#fff; background:#141414; }
        .doc-nav-item.active { color:#e6192c; background:rgba(230,25,44,0.08); border-left-color:#e6192c; font-weight:600; }
        
        /* Main Content */
        .doc-content { flex:1; max-width:900px; padding-bottom:100px; }
        .doc-section { margin-bottom:64px; scroll-margin-top:40px; }
        .doc-h1 { font-family:'Fira Code', monospace; font-size:28px; font-weight:700; color:#fff; margin-bottom:24px; border-bottom:1px solid #1e1e1e; padding-bottom:12px; }
        .doc-h2 { font-family:'Fira Code', monospace; font-size:18px; font-weight:600; color:#fff; margin-bottom:16px; margin-top:32px; display:flex; align-items:center; gap:10px; }
        .doc-h2 i { color:#e6192c; }
        .doc-p { font-size:15px; line-height:1.7; margin-bottom:16px; color:#a3a3a3; }
        .doc-strong { color:#fff; font-weight:600; }
        
        /* Grids & Cards */
        .doc-grid-2 { display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px; margin-bottom:24px; }
        .doc-grid-3 { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:24px; }
        
        .doc-card { background:#0a0a0a; border:1px solid #1e1e1e; border-radius:10px; padding:24px; transition:all .2s; }
        .doc-card:hover { border-color:#333; box-shadow:0 8px 24px rgba(0,0,0,0.3); transform:translateY(-2px); }
        .doc-card-icon { font-size:24px; color:#e6192c; margin-bottom:16px; display:block; }
        .doc-card-title { font-family:'Fira Code', monospace; font-size:15px; font-weight:600; color:#fff; margin-bottom:8px; }
        .doc-card-subtitle { font-size:11px; color:#e6192c; text-transform:uppercase; font-weight:700; letter-spacing:1px; margin-bottom:12px; }
        .doc-card-p { font-size:13px; line-height:1.6; color:#9a9a9a; }
        
        /* Architecture Flow */
        .doc-arch-flow { background:#0c0c0c; border:1px solid #1e1e1e; padding:32px; border-radius:12px; text-align:center; margin-bottom:32px; position:relative; overflow:hidden; }
        .doc-arch-flow::before { content:''; position:absolute; top:0; left:0; width:100%; height:100%; background:radial-gradient(circle at 50% 50%, rgba(230,25,44,0.03) 0%, transparent 70%); pointer-events:none; }
        .doc-flow-node { display:inline-block; padding:12px 24px; background:#141414; border:1px solid #2a2a2a; border-radius:8px; font-family:'Fira Code',monospace; font-size:13px; font-weight:600; color:#fff; position:relative; z-index:1; }
        .doc-flow-arrow { display:block; margin:16px auto; color:#e6192c; font-size:18px; }

        /* Timelines */
        .doc-timeline { position:relative; padding-left:24px; margin-left:12px; border-left:2px solid #1e1e1e; }
        .doc-tl-item { position:relative; margin-bottom:32px; }
        .doc-tl-dot { position:absolute; left:-31px; top:4px; width:12px; height:12px; border-radius:50%; background:#0a0a0a; border:2px solid #e6192c; }
        .doc-tl-item.completed .doc-tl-dot { background:#e6192c; }
        .doc-tl-phase { font-family:'Fira Code',monospace; font-size:11px; color:#e6192c; font-weight:700; margin-bottom:4px; }
        .doc-tl-title { font-size:16px; font-weight:600; color:#fff; margin-bottom:8px; }
        .doc-tl-desc { font-size:14px; color:#9a9a9a; line-height:1.6; }

        /* Metric Grid */
        .doc-metric-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); gap:12px; }
        .doc-metric { background:#111; border:1px solid #1e1e1e; padding:16px; border-radius:8px; text-align:center; }
        .doc-metric-val { font-family:'Fira Code',monospace; font-size:14px; color:#fff; font-weight:700; margin-bottom:4px; }
        .doc-metric-label { font-size:11px; color:#7a7a7a; text-transform:uppercase; letter-spacing:0.5px; }

        /* Badges */
        .doc-badge { display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:600; font-family:'Fira Code',monospace; }
        .doc-badge-completed { background:rgba(59,165,92,0.15); color:#3ba55c; border:1px solid rgba(59,165,92,0.3); }
        .doc-badge-progress { background:rgba(230,162,25,0.15); color:#e6a219; border:1px solid rgba(230,162,25,0.3); }
        .doc-badge-planned { background:rgba(154,154,154,0.1); color:#9a9a9a; border:1px solid rgba(154,154,154,0.2); }

        /* Callouts */
        .doc-callout { padding:20px; border-radius:8px; margin-bottom:24px; border-left:4px solid; display:flex; gap:16px; align-items:flex-start; }
        .doc-callout-icon { font-size:20px; margin-top:2px; }
        .doc-callout.info { background:rgba(6,182,212,0.05); border-color:#06b6d4; }
        .doc-callout.info .doc-callout-icon { color:#06b6d4; }
        .doc-callout.warning { background:rgba(230,162,25,0.05); border-color:#e6a219; }
        .doc-callout.warning .doc-callout-icon { color:#e6a219; }

        @media (max-width: 900px) {
          .doc-wrapper { flex-direction:column; }
          .doc-sidebar { width:100%; position:relative; top:0; max-height:200px; border-right:none; border-bottom:1px solid #1e1e1e; margin-bottom:24px; }
        }
      `}</style>

      <aside className="doc-sidebar">
        <div style={{fontSize:'11px', color:'#5c5c5c', fontWeight:700, letterSpacing:'1px', marginBottom:'16px'}}>DOCUMENTATION INDEX</div>
        {navLinks.map(link => (
          <div 
            key={link.id} 
            className={`doc-nav-item ${activeSection === link.id ? 'active' : ''}`}
            onClick={() => scrollTo(link.id)}
          >
            {link.label}
          </div>
        ))}
      </aside>

      <main className="doc-content" ref={sectionsRef}>
        
        {/* 1. Executive Summary */}
        <section id="exec-summary" className="doc-section">
          <h1 className="doc-h1">1. Executive Summary</h1>
          <p className="doc-p">
            <span className="doc-strong">Masked Flipper</span> is a pocket-sized, Raspberry Pi–powered hardware multi-tool engineered for inspecting, understanding, and testing physical devices and wireless networks. Conceived as a hackathon build, it bridges the gap between raw terminal hacking tools and consumer-grade security devices (like the Flipper Zero or WiFi Pineapple).
          </p>
          <p className="doc-p">
            While commercial multi-tools are often proprietary black boxes with fixed capabilities and tiny screens, Masked Flipper combines modular open-source hardware with a modern Web Dashboard and an on-device menu system. It transforms complex hardware capabilities—like analyzing Sub-GHz radio waves, dumping NFC memory, and auditing WiFi resilience—into an intuitive, accessible, and highly educational platform.
          </p>
          <div className="doc-callout info">
            <i className="fa-solid fa-circle-info doc-callout-icon"></i>
            <div>
              <h4 style={{color:'#06b6d4', fontSize:'14px', marginBottom:'6px'}}>Educational & Open-Source Philosophy</h4>
              <p className="doc-p" style={{margin:0, fontSize:'13px', color:'#9a9a9a'}}>This project is intended strictly for research, learning, and authorized security testing. The entire stack is open-source, allowing students and engineers to read the Python hardware drivers, modify the React dashboard, and understand exactly how wireless protocols operate at a low level.</p>
            </div>
          </div>
        </section>

        {/* 2. Project Objectives */}
        <section id="objectives" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-bullseye"></i> 2. Project Objectives</h2>
          <div className="doc-grid-2">
            {objectives.map((obj, i) => (
              <div key={i} className="doc-card">
                <i className={`fa-solid ${obj.icon} doc-card-icon`}></i>
                <h3 className="doc-card-title">{obj.title}</h3>
                <p className="doc-card-p">{obj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. System Architecture */}
        <section id="architecture" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-diagram-project"></i> 3. System Architecture</h2>
          <p className="doc-p">Masked Flipper operates through two synchronized interfaces sharing a single backend intelligence. State changes made via the physical keypad instantly reflect on the browser dashboard via WebSockets.</p>
          
          <div className="doc-arch-flow">
            <div className="doc-flow-node" style={{borderColor:'#06b6d4', color:'#06b6d4'}}>User (Web Browser) / User (Physical Keypad)</div>
            <i className="fa-solid fa-arrow-down doc-flow-arrow"></i>
            <div className="doc-flow-node">React + Next.js Dashboard / Pillow ST7789 Renderer</div>
            <i className="fa-solid fa-arrow-down doc-flow-arrow"></i>
            <div className="doc-flow-node" style={{borderColor:'#e6a219', color:'#e6a219'}}>Python 3 + Flask + Socket.IO API</div>
            <i className="fa-solid fa-arrow-down doc-flow-arrow"></i>
            <div className="doc-flow-node">Module Manager (Hardware Abstraction Layer)</div>
            <i className="fa-solid fa-arrow-down doc-flow-arrow"></i>
            <div className="doc-flow-node" style={{borderColor:'#3ba55c', color:'#3ba55c'}}>SPI / I2C / UART / GPIO Drivers</div>
            <i className="fa-solid fa-arrow-down doc-flow-arrow"></i>
            <div className="doc-flow-node">Hardware (CC1101, RC522, WiFi Adapter, RTC)</div>
          </div>
        </section>

        {/* 4. Hardware Specs */}
        <section id="hardware" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-microchip"></i> 4. Hardware Specifications</h2>
          <div className="doc-grid-2">
            {hardwareSpecs.map((hw, i) => (
              <div key={i} className="doc-card">
                <i className={`fa-solid ${hw.icon} doc-card-icon`}></i>
                <h3 className="doc-card-title">{hw.name}</h3>
                <div className="doc-card-subtitle">{hw.role}</div>
                <p className="doc-card-p">{hw.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Software Stack */}
        <section id="software" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-layer-group"></i> 5. Software Stack</h2>
          <div className="doc-grid-3">
            {softwareStack.map((stack, i) => (
              <div key={i} className="doc-card">
                <i className={`fa-solid ${stack.icon} doc-card-icon`}></i>
                <h3 className="doc-card-title">{stack.layer}</h3>
                <div className="doc-card-subtitle">{stack.tech}</div>
                <p className="doc-card-p">{stack.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Feature Docs */}
        <section id="features" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-toolbox"></i> 6. Feature Documentation</h2>
          <div className="doc-callout warning">
            <i className="fa-solid fa-triangle-exclamation doc-callout-icon"></i>
            <div>
              <h4 style={{color:'#e6a219', fontSize:'14px', marginBottom:'6px'}}>Hardware Dependency</h4>
              <p className="doc-p" style={{margin:0, fontSize:'13px', color:'#9a9a9a'}}>If a specific physical hardware module is not wired to the GPIO header, the Python backend will gracefully degrade and render that module as "Not Connected" or "Simulation Mode" on the dashboard without crashing the core system.</p>
            </div>
          </div>
          <div className="doc-grid-2">
            <div className="doc-card">
              <h3 className="doc-card-title">WiFi Auditing & Recon</h3>
              <p className="doc-card-p"><span className="doc-strong">Purpose:</span> Passively map nearby APs, trace associated clients, and execute active security tests (Deauth, Rogue AP).<br/><br/><span className="doc-strong">Tech:</span> Requires external USB WiFi adapter supporting Monitor Mode and packet injection. Uses aircrack-ng suite under the hood.</p>
            </div>
            <div className="doc-card">
              <h3 className="doc-card-title">BadUSB HID Injection</h3>
              <p className="doc-card-p"><span className="doc-strong">Purpose:</span> Emulate a physical keyboard to inject rapid keystroke payloads (Duckyscript).<br/><br/><span className="doc-strong">Tech:</span> Uses Raspberry Pi 4 OTG USB gadget mode (`dwc2`, `g_hid`). Scripts are parsed from text to binary HID reports.</p>
            </div>
            <div className="doc-card">
              <h3 className="doc-card-title">Sub-GHz RF</h3>
              <p className="doc-card-p"><span className="doc-strong">Purpose:</span> Capture and replay simple fixed-code radio signals (e.g., fans, old garage doors).<br/><br/><span className="doc-strong">Tech:</span> CC1101 module over SPI. Captures raw OOK/ASK waveforms into bin files for replay.</p>
            </div>
            <div className="doc-card">
              <h3 className="doc-card-title">NFC / RFID</h3>
              <p className="doc-card-p"><span className="doc-strong">Purpose:</span> Read tag UIDs and dump sector memory for analysis.<br/><br/><span className="doc-strong">Tech:</span> RC522/PN532 reader. Currently limited to 13.56MHz ISO14443A tags (Mifare Classic).</p>
            </div>
          </div>
        </section>

        {/* 7. Roadmap */}
        <section id="roadmap" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-route"></i> 7. Development Roadmap</h2>
          <div className="doc-timeline">
            {roadmapMilestones.map((ms, i) => (
              <div key={i} className={`doc-tl-item ${ms.status === 'Completed' ? 'completed' : ''}`}>
                <div className="doc-tl-dot"></div>
                <div className="doc-tl-phase">{ms.phase}</div>
                <div className="doc-tl-title">{ms.title}</div>
                <div className="doc-tl-desc">{ms.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Engineering Challenges */}
        <section id="challenges" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-wrench"></i> 8. Engineering Challenges</h2>
          <p className="doc-p">Building a cohesive tool on embedded Linux presents unique hardware-software integration hurdles:</p>
          <div className="doc-grid-2">
            <div className="doc-card">
              <h3 className="doc-card-title">SPI Bus Sharing</h3>
              <p className="doc-card-p">Both the ST7789 display and the CC1101 radio require high-speed SPI. <span className="doc-strong">Solution:</span> Careful management of Chip Select (CS) pins and enforcing thread-safe SPI locking in Python to prevent display tearing during RF transmission.</p>
            </div>
            <div className="doc-card">
              <h3 className="doc-card-title">Display Rendering Performance</h3>
              <p className="doc-card-p">Pushing 240x240 pixels over SPI from Python is slow. <span className="doc-strong">Solution:</span> Using Pillow to draw only bounding box diffs (partial updates) rather than full frame redraws, achieving a usable ~15-20 FPS menu navigation.</p>
            </div>
            <div className="doc-card">
              <h3 className="doc-card-title">Power Management</h3>
              <p className="doc-card-p">The RPi4 draws ~3W idle, draining small batteries fast. <span className="doc-strong">Solution:</span> Underclocking CPU profiles in battery mode and disabling HDMI out. Implementing an aggressive display sleep timeout.</p>
            </div>
            <div className="doc-card">
              <h3 className="doc-card-title">USB Gadget Mode Stability</h3>
              <p className="doc-card-p">Enabling `dwc2` on the Pi 4 USB-C port for BadUSB sometimes prevents charging. <span className="doc-strong">Solution:</span> Using a PiSugar battery hat via pogo pins to supply power independently of the USB-C data port.</p>
            </div>
          </div>
        </section>

        {/* 9. Security & Use */}
        <section id="security" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-shield-halved"></i> 9. Security & Responsible Use</h2>
          <p className="doc-p">Unlike pure offensive scripts, Masked Flipper builds safety, logging, and explicit consent mechanisms directly into the User Experience.</p>
          <div className="doc-grid-3">
            <div className="doc-card" style={{borderLeft:'3px solid #06b6d4'}}>
              <h3 className="doc-card-title">Scope Tokens</h3>
              <p className="doc-card-p">Active operations (Deauth, Rogue AP, Payload injection) strictly require a single-use token confirming the target scope, which expires in 5 minutes.</p>
            </div>
            <div className="doc-card" style={{borderLeft:'3px solid #3ba55c'}}>
              <h3 className="doc-card-title">Immutable Audit Trail</h3>
              <p className="doc-card-p">Every active action, target MAC/SSID, and scope note is permanently recorded in a timestamped, AES-encrypted SQLite database.</p>
            </div>
            <div className="doc-card" style={{borderLeft:'3px solid #e6192c'}}>
              <h3 className="doc-card-title">Hardware Kill Switch</h3>
              <p className="doc-card-p">A dedicated physical button interrupt immediately halts all running background tasks, radio transmissions, and active payloads.</p>
            </div>
          </div>
        </section>

        {/* 10. Capabilities */}
        <section id="capabilities" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-list-check"></i> 10. Current Capabilities</h2>
          <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
            <div>
              <h3 style={{fontSize:'14px', color:'#fff', marginBottom:'8px'}}>Completed</h3>
              <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                {capabilities.completed.map(c => <span key={c} className="doc-badge doc-badge-completed"><i className="fa-solid fa-check"></i> {c}</span>)}
              </div>
            </div>
            <div>
              <h3 style={{fontSize:'14px', color:'#fff', marginBottom:'8px'}}>In Progress</h3>
              <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                {capabilities.progress.map(c => <span key={c} className="doc-badge doc-badge-progress"><i className="fa-solid fa-bolt"></i> {c}</span>)}
              </div>
            </div>
            <div>
              <h3 style={{fontSize:'14px', color:'#fff', marginBottom:'8px'}}>Planned</h3>
              <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
                {capabilities.planned.map(c => <span key={c} className="doc-badge doc-badge-planned"><i className="fa-regular fa-circle"></i> {c}</span>)}
              </div>
            </div>
          </div>
        </section>

        {/* 11. Limitations */}
        <section id="limitations" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-circle-exclamation"></i> 11. Known Limitations</h2>
          <div className="doc-grid-2">
            {limitations.map((lim, i) => (
              <div key={i} className="doc-card" style={{borderTop:'2px solid #1e1e1e'}}>
                <h3 className="doc-card-title" style={{color:'#e6192c'}}>{lim.limit}</h3>
                <p className="doc-card-p">{lim.impact}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 12. Future Roadmap */}
        <section id="future" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-rocket"></i> 12. Future Roadmap</h2>
          <ul style={{listStyleType:'none', padding:0, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px'}}>
            <li className="doc-card" style={{padding:'16px'}}><i className="fa-solid fa-mobile-screen" style={{color:'#06b6d4', marginRight:'8px'}}></i> Companion Mobile App (PWA)</li>
            <li className="doc-card" style={{padding:'16px'}}><i className="fa-brands fa-bluetooth" style={{color:'#3b82f6', marginRight:'8px'}}></i> Advanced BLE Beacon Tracking</li>
            <li className="doc-card" style={{padding:'16px'}}><i className="fa-solid fa-box" style={{color:'#3ba55c', marginRight:'8px'}}></i> Custom 3D Printed Enclosure</li>
            <li className="doc-card" style={{padding:'16px'}}><i className="fa-solid fa-microchip" style={{color:'#a855f7', marginRight:'8px'}}></i> Hardware Revision 2 (Custom PCB)</li>
            <li className="doc-card" style={{padding:'16px'}}><i className="fa-solid fa-cloud-arrow-up" style={{color:'#e6a219', marginRight:'8px'}}></i> Opt-in Cloud Syncing</li>
          </ul>
        </section>

        {/* 13. Metrics */}
        <section id="metrics" className="doc-section">
          <h2 className="doc-h2"><i className="fa-solid fa-chart-bar"></i> 13. Technical Metrics</h2>
          <div className="doc-metric-grid">
            {techMetrics.map((m, i) => (
              <div key={i} className="doc-metric">
                <div className="doc-metric-val">{m.value}</div>
                <div className="doc-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section id="conclusion" className="doc-section" style={{borderTop:'1px solid #1e1e1e', paddingTop:'40px', marginTop:'60px'}}>
          <h2 className="doc-h2" style={{marginTop:0}}><i className="fa-solid fa-flag-checkered"></i> Conclusion</h2>
          <p className="doc-p">
            Masked Flipper demonstrates the feasibility of combining modular, low-cost hardware with modern web technologies to create a powerful, educational multi-tool. By enforcing strict UI guardrails and audit trails, it establishes a responsible framework for security testing and radio frequency exploration. 
          </p>
          <div className="doc-card" style={{marginTop:'24px', background:'rgba(230,25,44,0.05)', borderColor:'rgba(230,25,44,0.2)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div>
              <div style={{fontFamily:'Fira Code', fontSize:'13px', color:'#e6192c', fontWeight:700, marginBottom:'4px'}}>PROJECT STATUS</div>
              <div style={{fontSize:'16px', color:'#fff', fontWeight:600}}>Active Development (Hackathon Build)</div>
            </div>
            <i className="fa-solid fa-code-commit" style={{fontSize:'32px', color:'#e6192c', opacity:0.5}}></i>
          </div>
        </section>

      </main>
    </div>
  );
}
