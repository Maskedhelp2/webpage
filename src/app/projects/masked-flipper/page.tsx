'use client';
import React, { useState, useEffect } from 'react';
import OverviewTab from './OverviewTab';

/* ── Data ── */
const moduleCards = [
  { icon: 'fa-keyboard', name: 'BadUSB HID', status: 'IDLE', statusColor: '#5c5c5c', info: 'Disarmed (Safe)', badge: 'simulated' },
  { icon: 'fa-gear', name: 'Hardware & Telemetry', status: 'RUNNING', statusColor: '#e6192c', info: 'Temp: 41.0°C | Batt: 3.84V (63%)', badge: 'simulated' },
  { icon: 'fa-bolt', name: 'Infrared (IR)', status: 'IDLE', statusColor: '#5c5c5c', info: 'Idle', badge: 'simulated' },
  { icon: 'fa-address-card', name: 'NFC / RFID', status: 'IDLE', statusColor: '#5c5c5c', info: 'Present a Tag …', badge: 'simulated' },
  { icon: 'fa-tower-broadcast', name: 'Sub-GHz RF', status: 'IDLE', statusColor: '#5c5c5c', info: 'Idle (433.92MHz)', badge: 'simulated' },
  { icon: 'fa-shield-halved', name: 'WiFi Audit (Active)', status: 'IDLE', statusColor: '#5c5c5c', info: 'Idle (Scope Protected)', badge: 'simulated' },
  { icon: 'fa-wifi', name: 'WiFi Recon (Passive)', status: 'IDLE', statusColor: '#5c5c5c', info: 'Passive Scan Active (14 networks, 3 BLE)', badge: 'simulated' },
];

const navItems = [
  { id: 'dashboard', icon: 'fa-chart-line', label: 'Dashboard' },
  { id: 'wifi', icon: 'fa-wifi', label: 'WiFi Auditing' },
  { id: 'badusb', icon: 'fa-keyboard', label: 'BadUSB HID' },
  { id: 'rf', icon: 'fa-tower-broadcast', label: 'Sub-GHz & IR' },
  { id: 'nfc', icon: 'fa-address-card', label: 'NFC / RFID' },
  { id: 'hardware', icon: 'fa-gauge-high', label: 'Telemetry & Sensors' },
  { id: 'virtual-device', icon: 'fa-display', label: 'ST7789 Screen & Keypad' },
  { id: 'audit-logs', icon: 'fa-clipboard-list', label: 'Audit Logs' },
  { id: 'overview', icon: 'fa-circle-info', label: 'Project Overview' },
];

export default function MaskedFlipperPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeWifiTab, setActiveWifiTab] = useState('recon');
  const [time, setTime] = useState('00:00:00');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderViewContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="mfd-fade-in">
            <div>
              <h2 className="mfd-section-title">SYSTEM OVERVIEW</h2>
              <p className="mfd-section-sub">Real-time module health and active background scanning states</p>
            </div>

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

            <div className="mfd-bottom-grid">
              <div className="mfd-panel">
                <div className="mfd-panel-title"><i className="fa-solid fa-database" /> RECENT CAPTURES</div>
                <div className="mfd-table-wrap">
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
              </div>

              <div className="mfd-panel">
                <div className="mfd-panel-title"><i className="fa-solid fa-sliders" /> QUICK CONTROLS</div>
                <div className="mfd-qc-grid">
                  <button className="mfd-btn mfd-qc-green" onClick={() => alert('RTC Sync Triggered')}><i className="fa-solid fa-rotate" /> Sync System RTC</button>
                  <button className="mfd-btn mfd-btn-secondary" onClick={() => alert('Audio Test Triggered')}><i className="fa-solid fa-volume-high" /> Test Piezo Audio (440Hz)</button>
                  <button className="mfd-btn mfd-btn-secondary" onClick={() => alert('Haptic Test Triggered')}><i className="fa-solid fa-gear" /> Test Haptic Motors</button>
                  <button className="mfd-btn mfd-btn-primary" style={{width:'100%'}} onClick={() => alert('Shutdown Triggered')}><i className="fa-solid fa-power-off" /> Safe Device Shutdown</button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'wifi':
        return (
          <div className="mfd-fade-in">
             <h2 className="mfd-section-title">WIFI & NETWORK AUDITING</h2>
             <p className="mfd-section-sub">Passive recon sweeps and scope-gated active wireless testing</p>
             
             <div className="mfd-tab-bar">
               <button className={`mfd-tab-btn ${activeWifiTab === 'recon' ? 'active' : ''}`} onClick={() => setActiveWifiTab('recon')}>Passive Recon</button>
               <button className={`mfd-tab-btn ${activeWifiTab === 'clients' ? 'active' : ''}`} onClick={() => setActiveWifiTab('clients')}>Clients & BLE</button>
               <button className={`mfd-tab-btn ${activeWifiTab === 'audit' ? 'active' : ''}`} onClick={() => setActiveWifiTab('audit')}>Active Security Suite</button>
               <button className={`mfd-tab-btn ${activeWifiTab === 'pcaps' ? 'active' : ''}`} onClick={() => setActiveWifiTab('pcaps')}>PCAP Captures</button>
             </div>

             {activeWifiTab === 'recon' && (
               <div className="mfd-card">
                 <div className="mfd-card-header">
                   <div className="mfd-card-title"><i className="fa-solid fa-wifi" style={{color:'#06b6d4'}}></i> DETECTED ACCESS POINTS</div>
                   <button className="mfd-btn mfd-btn-primary"><i className="fa-solid fa-arrows-rotate"></i> Refresh Scan</button>
                 </div>
                 <div className="mfd-table-wrap">
                   <table className="mfd-table">
                     <thead><tr><th>SSID</th><th>BSSID</th><th>Channel</th><th>Signal</th><th>Security</th><th>Clients</th><th>Action</th></tr></thead>
                     <tbody><tr><td colSpan={7} style={{textAlign:'center', padding:'20px'}}>Scanning wireless channels...</td></tr></tbody>
                   </table>
                 </div>
               </div>
             )}

             {activeWifiTab === 'clients' && (
               <div className="mfd-grid-2">
                 <div className="mfd-card">
                   <div className="mfd-card-title" style={{marginBottom:'16px'}}><i className="fa-solid fa-laptop" style={{color:'#3ba55c'}}></i> ASSOCIATED CLIENTS</div>
                   <table className="mfd-table">
                     <thead><tr><th>Client MAC</th><th>BSSID</th><th>Vendor</th></tr></thead>
                     <tbody><tr><td colSpan={3} style={{textAlign:'center', padding:'20px'}}>No clients found.</td></tr></tbody>
                   </table>
                 </div>
                 <div className="mfd-card">
                   <div className="mfd-card-title" style={{marginBottom:'16px'}}><i className="fa-brands fa-bluetooth-b" style={{color:'#3b82f6'}}></i> NEARBY BLE BEACONS</div>
                   <table className="mfd-table">
                     <thead><tr><th>Name</th><th>MAC</th><th>RSSI</th></tr></thead>
                     <tbody><tr><td colSpan={3} style={{textAlign:'center', padding:'20px'}}>No beacons detected.</td></tr></tbody>
                   </table>
                 </div>
               </div>
             )}

             {activeWifiTab === 'audit' && (
               <div>
                 <div className="mfd-alert">
                   <i className="fa-solid fa-triangle-exclamation" style={{marginTop:'2px'}}></i>
                   <div><strong>EXPLICIT SCOPE CONFIRMATION REQUIRED:</strong> Active operations (Deauth, Rogue AP, Responder) require issuing a 5-minute single-use scope confirmation token before running.</div>
                 </div>
                 <div className="mfd-grid-3">
                   <div className="mfd-card" style={{display:'flex', flexDirection:'column'}}>
                     <i className="fa-solid fa-ban" style={{fontSize:'24px', color:'#e6192c', marginBottom:'12px'}}></i>
                     <h3 style={{fontSize:'14px', marginBottom:'8px'}}>DEAUTH TEST</h3>
                     <p style={{fontSize:'12px', color:'#9a9a9a', marginBottom:'16px', flex:1}}>Send 802.11 deauthentication frames to evaluate network roaming resiliency.</p>
                     <div className="mfd-form-group">
                       <label className="mfd-label">Target BSSID:</label>
                       <input type="text" className="mfd-input" defaultValue="70:3A:0E:8F:11:22" />
                     </div>
                     <button className="mfd-btn mfd-btn-primary mfd-btn-block"><i className="fa-solid fa-crosshairs"></i> RUN DEAUTH</button>
                   </div>
                   <div className="mfd-card" style={{display:'flex', flexDirection:'column'}}>
                     <i className="fa-solid fa-masks-theater" style={{fontSize:'24px', color:'#e6a219', marginBottom:'12px'}}></i>
                     <h3 style={{fontSize:'14px', marginBottom:'8px'}}>ROGUE AP / EVIL PORTAL</h3>
                     <p style={{fontSize:'12px', color:'#9a9a9a', marginBottom:'16px', flex:1}}>Spin up test Access Point with customizable captive portal template.</p>
                     <div className="mfd-form-group">
                       <label className="mfd-label">Rogue SSID:</label>
                       <input type="text" className="mfd-input" defaultValue="Hackathon_Test_AP" />
                     </div>
                     <button className="mfd-btn mfd-btn-secondary mfd-btn-block" style={{borderColor:'#e6a219', color:'#e6a219'}}><i className="fa-solid fa-tower-broadcast"></i> START AP</button>
                   </div>
                   <div className="mfd-card" style={{display:'flex', flexDirection:'column'}}>
                     <i className="fa-solid fa-skull-crossbones" style={{fontSize:'24px', color:'#a855f7', marginBottom:'12px'}}></i>
                     <h3 style={{fontSize:'14px', marginBottom:'8px'}}>RESPONDER POISONER</h3>
                     <p style={{fontSize:'12px', color:'#9a9a9a', marginBottom:'16px', flex:1}}>LLMNR / NBT-NS / MDNS poisoner and audit listener.</p>
                     <div className="mfd-form-group">
                       <label className="mfd-label">Network Interface:</label>
                       <input type="text" className="mfd-input" defaultValue="wlan0" />
                     </div>
                     <button className="mfd-btn mfd-btn-secondary mfd-btn-block" style={{borderColor:'#a855f7', color:'#a855f7'}}><i className="fa-solid fa-spider"></i> START RESPONDER</button>
                   </div>
                 </div>
               </div>
             )}

             {activeWifiTab === 'pcaps' && (
               <div className="mfd-card">
                 <div className="mfd-card-title" style={{marginBottom:'16px'}}><i className="fa-solid fa-file-code" style={{color:'#06b6d4'}}></i> STORED PCAP FILES</div>
                 <table className="mfd-table">
                   <thead><tr><th>Filename</th><th>Size</th><th>Created At</th><th>Action</th></tr></thead>
                   <tbody><tr><td colSpan={4} style={{textAlign:'center', padding:'20px'}}>No captures found.</td></tr></tbody>
                 </table>
               </div>
             )}
          </div>
        );

      case 'badusb':
        return (
          <div className="mfd-fade-in">
             <h2 className="mfd-section-title">BADUSB HID PAYLOAD MANAGER</h2>
             <p className="mfd-section-sub">Duckyscript keystroke payload editor, target scope notes, and two-stage Arm & Fire execution</p>
             
             <div className="mfd-grid-2" style={{marginTop:'20px'}}>
               <div className="mfd-card">
                 <div className="mfd-card-title" style={{marginBottom:'16px'}}><i className="fa-solid fa-list" style={{color:'#06b6d4'}}></i> PAYLOAD LIBRARY</div>
                 <table className="mfd-table">
                   <thead><tr><th>Name</th><th>Action</th></tr></thead>
                   <tbody>
                     <tr><td>Windows Reverse Shell</td><td><button className="mfd-btn mfd-btn-secondary" style={{padding:'4px 8px'}}>Load</button></td></tr>
                     <tr><td>Rickroll macOS</td><td><button className="mfd-btn mfd-btn-secondary" style={{padding:'4px 8px'}}>Load</button></td></tr>
                   </tbody>
                 </table>
               </div>
               <div className="mfd-card">
                 <div className="mfd-card-title" style={{marginBottom:'16px'}}><i className="fa-solid fa-code" style={{color:'#3ba55c'}}></i> DUCKYSCRIPT EDITOR</div>
                 <div className="mfd-form-group">
                   <label className="mfd-label">Payload Name:</label>
                   <input type="text" className="mfd-input" defaultValue="Audit Test Script" />
                 </div>
                 <div className="mfd-form-group">
                   <label className="mfd-label">Script Body:</label>
                   <textarea className="mfd-textarea" defaultValue={"GUI r\nDELAY 500\nSTRING notepad\nENTER"}></textarea>
                 </div>
                 <div style={{background:'#0a0a0a', border:'1px solid #1e1e1e', borderRadius:'8px', padding:'16px', marginTop:'16px'}}>
                   <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px'}}>
                     <span style={{background:'#1c1c1c', color:'#9a9a9a', padding:'4px 8px', borderRadius:'4px', fontSize:'11px', fontWeight:600}}>DISARMED</span>
                     <span style={{fontSize:'12px', color:'#9a9a9a'}}>Select payload to arm.</span>
                   </div>
                   <div style={{display:'flex', gap:'8px'}}>
                     <button className="mfd-btn mfd-btn-secondary"><i className="fa-solid fa-floppy-disk"></i> Save</button>
                     <button className="mfd-btn mfd-btn-primary" style={{flex:1}}><i className="fa-solid fa-fire-flame-curved"></i> CONFIRM SCOPE & FIRE</button>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        );

      case 'rf':
        return (
          <div className="mfd-fade-in">
             <h2 className="mfd-section-title">SUB-GHZ RF & INFRARED (IR)</h2>
             <p className="mfd-section-sub">Frequency sweeping, waveform signal captures, IR pulse analyzer, and code replays</p>
             
             <div className="mfd-grid-2" style={{marginTop:'20px'}}>
               <div className="mfd-card">
                 <div className="mfd-card-title" style={{marginBottom:'16px'}}><i className="fa-solid fa-wave-square" style={{color:'#06b6d4'}}></i> SUB-GHZ RSSI SPECTRUM</div>
                 <div style={{height:'150px', background:'#0a0a0a', border:'1px solid #1e1e1e', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center', color:'#5c5c5c', marginBottom:'16px'}}>
                    <i className="fa-solid fa-chart-area" style={{fontSize:'32px'}}></i>
                 </div>
                 <div style={{display:'flex', gap:'8px', marginBottom:'16px'}}>
                   <button className="mfd-btn mfd-btn-secondary" style={{flex:1}}>315 MHz</button>
                   <button className="mfd-btn mfd-btn-primary" style={{flex:1, background:'rgba(230,25,44,0.15)', color:'#e6192c', borderColor:'#e6192c'}}>433.92 MHz</button>
                   <button className="mfd-btn mfd-btn-secondary" style={{flex:1}}>868 MHz</button>
                   <button className="mfd-btn mfd-btn-secondary" style={{flex:1}}>915 MHz</button>
                 </div>
                 <button className="mfd-btn mfd-btn-primary mfd-btn-block"><i className="fa-solid fa-satellite-dish"></i> ARM CAPTURE</button>
               </div>
               <div className="mfd-card">
                 <div className="mfd-card-title" style={{marginBottom:'16px'}}><i className="fa-solid fa-bolt" style={{color:'#e6a219'}}></i> INFRARED (IR) RECEIVER</div>
                 <div style={{textAlign:'center', padding:'40px 0'}}>
                   <i className="fa-solid fa-satellite" style={{fontSize:'48px', color:'#06b6d4', marginBottom:'16px'}}></i>
                   <div style={{fontSize:'14px', fontWeight:600, marginBottom:'24px'}}>IR Receiver Ready</div>
                   <button className="mfd-btn mfd-btn-secondary" style={{borderColor:'#e6a219', color:'#e6a219'}}><i className="fa-solid fa-ear-listen"></i> START IR LISTENING</button>
                 </div>
               </div>
             </div>
          </div>
        );

      case 'nfc':
        return (
          <div className="mfd-fade-in">
             <h2 className="mfd-section-title">NFC / RFID TAG MODULE</h2>
             <p className="mfd-section-sub">Tag UID detection, sector memory dump, mfoc key recovery, and magic tag writer</p>
             
             <div className="mfd-grid-2" style={{marginTop:'20px'}}>
               <div className="mfd-card">
                 <div className="mfd-card-title" style={{marginBottom:'16px'}}><i className="fa-solid fa-id-card" style={{color:'#06b6d4'}}></i> SCANNER CARD</div>
                 <div style={{textAlign:'center', padding:'40px 0'}}>
                   <i className="fa-solid fa-wifi-fair" style={{fontSize:'48px', color:'#3ba55c', marginBottom:'16px'}}></i>
                   <p style={{fontSize:'13px', color:'#9a9a9a', marginBottom:'24px'}}>Present a 13.56MHz NFC or 125kHz RFID Tag to RC522 Reader</p>
                   <button className="mfd-btn mfd-btn-primary"><i className="fa-solid fa-expand"></i> SCAN TAG NOW</button>
                 </div>
               </div>
               <div className="mfd-card">
                 <div className="mfd-card-title" style={{marginBottom:'16px'}}><i className="fa-solid fa-floppy-disk" style={{color:'#a855f7'}}></i> SAVED TAG DUMPS</div>
                 <table className="mfd-table">
                   <thead><tr><th>Name</th><th>UID</th><th>Action</th></tr></thead>
                   <tbody><tr><td colSpan={3} style={{textAlign:'center', padding:'20px'}}>No tags saved.</td></tr></tbody>
                 </table>
               </div>
             </div>
          </div>
        );

      case 'hardware':
        return (
          <div className="mfd-fade-in">
             <h2 className="mfd-section-title">HARDWARE TELEMETRY & DIAGNOSTICS</h2>
             <p className="mfd-section-sub">Live ADC voltage dials, CPU temperatures, RTC synchronization, piezo audio, and haptic testing</p>
             
             <div className="mfd-grid-3" style={{marginTop:'20px'}}>
               <div className="mfd-card mfd-dial">
                 <i className="fa-solid fa-car-battery mfd-dial-icon" style={{color:'#06b6d4'}}></i>
                 <h3 style={{fontSize:'12px', marginBottom:'12px', color:'#9a9a9a'}}>BATTERY ADC VOLTAGE</h3>
                 <div className="mfd-dial-val">3.89 V</div>
                 <div className="mfd-dial-sub">LiPo Battery (69%)</div>
               </div>
               <div className="mfd-card mfd-dial">
                 <i className="fa-solid fa-temperature-arrow-up mfd-dial-icon" style={{color:'#e6a219'}}></i>
                 <h3 style={{fontSize:'12px', marginBottom:'12px', color:'#9a9a9a'}}>RPi4 CPU TEMP</h3>
                 <div className="mfd-dial-val">43.6 °C</div>
                 <div className="mfd-dial-sub">Thermal Zone 0</div>
               </div>
               <div className="mfd-card mfd-dial">
                 <i className="fa-solid fa-hard-drive mfd-dial-icon" style={{color:'#3ba55c'}}></i>
                 <h3 style={{fontSize:'12px', marginBottom:'12px', color:'#9a9a9a'}}>STORAGE DISK</h3>
                 <div className="mfd-dial-val">172.6 GB</div>
                 <div className="mfd-dial-sub">Disk Used: 28%</div>
               </div>
             </div>
             <div className="mfd-card" style={{marginTop:'16px'}}>
               <div className="mfd-card-title" style={{marginBottom:'16px'}}><i className="fa-solid fa-sliders" style={{color:'#06b6d4'}}></i> HARDWARE TEST BENCH</div>
               <div style={{display:'flex', gap:'12px'}}>
                 <button className="mfd-btn mfd-btn-secondary"><i className="fa-solid fa-clock"></i> Sync System RTC</button>
                 <button className="mfd-btn mfd-btn-secondary"><i className="fa-solid fa-music"></i> Piezo 440Hz Tone</button>
                 <button className="mfd-btn mfd-btn-secondary"><i className="fa-solid fa-music"></i> Piezo 880Hz Tone</button>
                 <button className="mfd-btn mfd-btn-secondary" style={{borderColor:'#e6a219', color:'#e6a219'}}><i className="fa-solid fa-vibration"></i> Trigger Haptic Buzz</button>
               </div>
             </div>
          </div>
        );

      case 'virtual-device':
        return (
          <div className="mfd-fade-in">
             <h2 className="mfd-section-title">VIRTUAL DEVICE EMULATOR</h2>
             <p className="mfd-section-sub">Live 240x240 ST7789 LCD display screen frame mirror and interactive 4x4 matrix keypad</p>
             
             <div style={{marginTop:'40px'}}>
               <div className="mfd-chassis">
                 <div style={{textAlign:'center', fontSize:'11px', fontWeight:700, letterSpacing:'2px', marginBottom:'16px', color:'#5c5c5c'}}>MASKED FLIPPER</div>
                 <div className="mfd-screen">
                   [ ST7789 BUFFER ]
                 </div>
                 <div className="mfd-keypad">
                   <button className="mfd-key">1</button><button className="mfd-key">2 (▲)</button><button className="mfd-key">3</button><button className="mfd-key mfd-key-action">▲ UP</button>
                   <button className="mfd-key">4</button><button className="mfd-key">5 (OK)</button><button className="mfd-key">6</button><button className="mfd-key mfd-key-action">▼ DWN</button>
                   <button className="mfd-key">7</button><button className="mfd-key">8 (▼)</button><button className="mfd-key">9</button><button className="mfd-key mfd-key-primary">SELECT</button>
                   <button className="mfd-key">*</button><button className="mfd-key">0</button><button className="mfd-key">#</button><button className="mfd-key mfd-key-danger">BACK</button>
                 </div>
               </div>
             </div>
          </div>
        );

      case 'audit-logs':
        return (
          <div className="mfd-fade-in">
             <h2 className="mfd-section-title">AUDIT LOGS & COMPLIANCE TRAIL</h2>
             <p className="mfd-section-sub">Timestamped SQLite audit trail for all start/stop, active tier tests, and target scope notes</p>
             
             <div className="mfd-card" style={{marginTop:'20px'}}>
               <div style={{display:'flex', justifyContent:'space-between', marginBottom:'16px'}}>
                 <div style={{display:'flex', alignItems:'center', gap:'8px', background:'#0a0a0a', border:'1px solid #2a2a2a', padding:'8px 12px', borderRadius:'6px', width:'300px'}}>
                   <i className="fa-solid fa-magnifying-glass" style={{color:'#5c5c5c'}}></i>
                   <input type="text" placeholder="Filter by target..." style={{background:'none', border:'none', color:'#fff', outline:'none', fontSize:'12px', width:'100%'}} />
                 </div>
                 <button className="mfd-btn mfd-btn-secondary"><i className="fa-solid fa-arrows-rotate"></i> Refresh Logs</button>
               </div>
               <table className="mfd-table">
                 <thead><tr><th>ID</th><th>Timestamp</th><th>Action</th><th>Module</th><th>Target</th><th>Details</th></tr></thead>
                 <tbody><tr><td colSpan={6} style={{textAlign:'center', padding:'20px'}}>No audit log entries found.</td></tr></tbody>
               </table>
             </div>
          </div>
        );

      case 'overview':
        return <OverviewTab />;
      
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

        .mfd * { box-sizing:border-box; margin:0; padding:0; }
        .mfd { display:flex; min-height:100vh; background:#0a0a0a; color:#f2f2f2; font-family:'Outfit',system-ui,sans-serif; padding-top: 90px; padding-bottom: 60px; }

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
        .mfd-bottom-grid { display:grid; grid-template-columns:2fr 1fr; gap:12px; margin-top: 20px; }
        .mfd-panel { background:#141414; border:1px solid #1e1e1e; border-radius:10px; padding:16px; }
        .mfd-panel-title { font-family:'Fira Code',monospace; font-size:13px; font-weight:600; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
        .mfd-panel-title i { color:#e6192c; }

        /* Table */
        .mfd-table-wrap { overflow-x:auto; }
        .mfd-table { width:100%; border-collapse:collapse; font-size:12px; text-align:left; }
        .mfd-table th { padding:10px; border-bottom:1px solid #2a2a2a; color:#e6192c; font-family:'Fira Code',monospace; font-weight:600; }
        .mfd-table td { padding:10px; border-bottom:1px solid #1e1e1e; color:#9a9a9a; }

        /* Quick controls */
        .mfd-qc-grid { display:flex; flex-wrap:wrap; gap:8px; }
        .mfd-qc-green { background:rgba(59,165,92,0.15); color:#3ba55c; border:1px solid rgba(59,165,92,0.3); }
        .mfd-qc-green:hover { background:rgba(59,165,92,0.25); }
        .mfd-qc-gray { background:#1c1c1c; color:#9a9a9a; border:1px solid #2a2a2a; }
        .mfd-qc-gray:hover { background:#252525; color:#fff; }
        .mfd-qc-red { background:#e6192c; color:#fff; }
        .mfd-qc-red:hover { background:#d01426; }

        /* Back link */
        .mfd-back { position:fixed; top:12px; right:16px; z-index:100; font-family:'Fira Code',monospace; font-size:11px; color:#9a9a9a; text-decoration:none; background:#141414; border:1px solid #2a2a2a; padding:6px 14px; border-radius:6px; transition:all .15s; letter-spacing:1px; }
        .mfd-back:hover { color:#e6192c; border-color:#e6192c; }

        /* Animations */
        .mfd-fade-in { animation: fadeIn 0.3s ease-in-out; display: flex; flex-direction: column; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* Component Styles for Sub-views */
        .mfd-tab-bar { display:flex; gap:8px; border-bottom:1px solid #1e1e1e; margin-bottom:16px; padding-bottom:12px; margin-top:20px;}
        .mfd-tab-btn { background:none; border:none; color:#9a9a9a; font-family:'Outfit',sans-serif; font-size:13px; font-weight:500; cursor:pointer; padding:8px 16px; border-radius:6px; transition:all .15s; }
        .mfd-tab-btn.active { color:#fff; background:rgba(230,25,44,0.15); border:1px solid rgba(230,25,44,0.3); }
        .mfd-tab-btn:hover:not(.active) { color:#fff; background:#1c1c1c; }

        .mfd-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .mfd-grid-3 { display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; }

        .mfd-card { background:#141414; border:1px solid #1e1e1e; border-radius:10px; padding:20px; }
        .mfd-card-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
        .mfd-card-title { font-family:'Fira Code',monospace; font-size:14px; font-weight:600; color:#fff; display:flex; align-items:center; gap:8px; }

        .mfd-form-group { margin-bottom:16px; }
        .mfd-label { display:block; font-size:11px; color:#9a9a9a; margin-bottom:6px; font-family:'Fira Code',monospace; }
        .mfd-input { width:100%; background:#0a0a0a; border:1px solid #2a2a2a; color:#fff; padding:10px; border-radius:6px; font-family:'Fira Code',monospace; font-size:12px; }
        .mfd-textarea { width:100%; background:#0a0a0a; border:1px solid #2a2a2a; color:#fff; padding:10px; border-radius:6px; font-family:'Fira Code',monospace; font-size:12px; resize:vertical; min-height:120px; }
        .mfd-input:focus, .mfd-textarea:focus { outline:none; border-color:#e6192c; }

        .mfd-btn { padding:10px 16px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:8px; border:none; transition:all .15s; font-family:'Outfit',sans-serif; }
        .mfd-btn-primary { background:#e6192c; color:#fff; border:1px solid #e6192c; }
        .mfd-btn-primary:hover { background:#d01426; }
        .mfd-btn-secondary { background:#1c1c1c; color:#fff; border:1px solid #2a2a2a; }
        .mfd-btn-secondary:hover { background:#252525; }
        .mfd-btn-block { width:100%; }

        .mfd-alert { background:rgba(230,162,25,0.1); border:1px solid rgba(230,162,25,0.3); color:#e6a219; padding:16px; border-radius:8px; font-size:13px; display:flex; align-items:flex-start; gap:12px; margin-bottom:16px; line-height:1.5;}

        /* Hardware Dials */
        .mfd-dial { text-align:center; padding:32px 24px; }
        .mfd-dial-icon { font-size:40px; margin-bottom:16px; }
        .mfd-dial-val { font-family:'Fira Code',monospace; font-size:32px; font-weight:700; color:#fff; margin-bottom:8px; }
        .mfd-dial-sub { font-size:13px; color:#9a9a9a; }

        /* Virtual Device */
        .mfd-chassis { background:#111; border:2px solid #2a2a2a; border-radius:16px; padding:24px; width:fit-content; margin:0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5);}
        .mfd-screen { width:240px; height:240px; background:#000; border:4px solid #000; border-radius:6px; margin:0 auto 24px; display:flex; align-items:center; justify-content:center; color:#e6192c; font-family:'Fira Code',monospace; font-size:14px; text-align:center; box-shadow: inset 0 0 20px rgba(230,25,44,0.2); }
        .mfd-keypad { display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; }
        .mfd-key { background:#1c1c1c; border:1px solid #2a2a2a; color:#fff; padding:16px 0; border-radius:8px; font-family:'Fira Code',monospace; font-size:13px; font-weight:600; cursor:pointer; transition:all .1s; }
        .mfd-key:active { transform:scale(0.95); background:#2a2a2a; }
        .mfd-key-action { color:#3ba55c; }
        .mfd-key-primary { color:#e6192c; border-color:rgba(230,25,44,0.3); }
        .mfd-key-danger { color:#e6192c; }

        /* Responsive */
        @media (max-width:900px) {
          .mfd { flex-direction:column; }
          .mfd-sidebar { width:100%; border-right:none; border-bottom:1px solid #1e1e1e; flex-direction:row; flex-wrap:wrap; padding:12px; gap:8px; }
          .mfd-nav { flex-direction:row; flex-wrap:wrap; gap:4px; }
          .mfd-sidebar-footer { flex-direction:row; margin-top:0; border-top:none; padding-top:0; }
          .mfd-bottom-grid { grid-template-columns:1fr; }
          .mfd-modules-grid { grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); }
          .mfd-grid-2, .mfd-grid-3 { grid-template-columns:1fr; }
          .mfd-tab-bar { overflow-x:auto; white-space:nowrap; }
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
              <button 
                key={n.id} 
                className={`mfd-nav-item${activeTab === n.id ? ' active' : ''}`}
                onClick={() => setActiveTab(n.id)}
              >
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
            <button className="mfd-stop-btn" onClick={() => alert('All Scans Stopped!')}>
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
            <div className="mfd-status-item">
              <i className="fa-solid fa-clock" style={{ color: '#e6192c' }} /> 
              RTC: {isClient ? time : '00:00:00'}
            </div>
          </div>

          {/* Dynamic Content View */}
          {renderViewContent()}
          
        </main>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    </>
  );
}
