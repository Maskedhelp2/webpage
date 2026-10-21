
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import RemoteTerminal from './RemoteTerminal';

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

type GatewayStatus = {
  hostname: string;
  uptime_seconds: number;
  cpu_load_1_5_15: number[];
  memory: {
    total_kb: number;
    available_kb: number;
    used_percent: number | null;
  };
  cpu_temperature_c: number | null;
  gateway: string;
  hardware_control: string;
  timestamp?: string;
};

const navGroups: {
  title: string;
  items: { id: TabId; icon: string; label: string }[];
}[] = [
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
  {
    time: '09:41:08',
    level: 'INFO',
    message: 'Web interface initialized',
  },
  {
    time: '09:41:08',
    level: 'SAFE',
    message: 'Hardware actions remain disabled unless explicitly implemented',
  },
];

const modules = [
  {
    id: 'wifi' as TabId,
    name: 'Wi-Fi auditing',
    detail: 'Passive discovery and scoped test tools',
    icon: '⌁',
    state: 'STANDBY',
  },
  {
    id: 'badusb' as TabId,
    name: 'BadUSB HID',
    detail: 'Payload review and HID device status',
    icon: '⌨',
    state: 'DISARMED',
  },
  {
    id: 'rf' as TabId,
    name: 'Sub-GHz & IR',
    detail: 'Radio experiments and infrared tools',
    icon: '◉',
    state: 'STANDBY',
  },
  {
    id: 'nfc' as TabId,
    name: 'NFC / RFID',
    detail: 'Tag inspection and reader status',
    icon: '▤',
    state: 'STANDBY',
  },
  {
    id: 'hardware' as TabId,
    name: 'Hardware telemetry',
    detail: 'Sensors and system health',
    icon: '⌁',
    state: 'LIVE API',
  },
  {
    id: 'screen' as TabId,
    name: 'Screen & keypad',
    detail: 'Display and keypad preview',
    icon: '▣',
    state: 'PREVIEW',
  },
];

function Panel({
  title,
  eyebrow,
  action,
  children,
}: {
  title: string;
  eyebrow?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mf-panel">
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

function Pill({
  children,
  tone = 'muted',
}: {
  children: React.ReactNode;
  tone?: 'muted' | 'red' | 'green' | 'amber';
}) {
  return <span className={`mf-pill mf-pill-${tone}`}>{children}</span>;
}

/*
 * IMPORTANT:
 * This is a UI-only sign-in gate, not production authentication.
 * Do not place real account passwords in frontend code.
 *
 * Replace this with your real server-side authentication before
 * treating the workspace as private.
 */

function MaskedFlipperLogin({
  onLogin,
}: {
  onLogin: (email: string, role: 'admin' | 'user') => void;
}) { 
  return (
    <main className="mf-auth">
      <div className="mf-auth-brand">
        <span className="mf-brand-mark">M</span>
        <div>
          <b>MASKEDFLIPPER</b>
          <small>DEVICE WORKSPACE</small>
        </div>
      </div>

      <div className="mf-auth-card">
        <div className="mf-eyebrow">MASKEDFLIPPER / DEVICE CONSOLE</div>
        <h1>
          ACCESS <span>CONTROL_</span>
        </h1>
        <p>
          Open the workspace to access the dashboard and remote terminal.
          Cloudflare Access separately protects the terminal connection.
        </p>

        <button
          type="button"
          className="mf-btn mf-btn-primary mf-wide"
          onClick={() => onLogin('Cloudflare Access session', 'user')}
        >
          Continue to workspace →
        </button>

        <p className="mf-field-hint">
          Continuing opens the interface; it does not authenticate your
          identity. The terminal must still pass Cloudflare Access validation.
        </p>
      </div>
    </main>
  );
}


export default function MaskedFlipperPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [clock, setClock] = useState('--:--:--');
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [wifiMode, setWifiMode] = useState<'passive' | 'scope'>('passive');
  const [selectedNetwork, setSelectedNetwork] = useState('Lab network');
  const [payloadName, setPayloadName] = useState('New HID script');
  const [screenText, setScreenText] = useState('MASKED\nFLIPPER');
  const [gatewayStatus, setGatewayStatus] = useState<GatewayStatus | null>(null);
  const [gatewayOnline, setGatewayOnline] = useState(false);
  const [gatewayLatency, setGatewayLatency] = useState<number | null>(null);

  useEffect(() => {
    /*
     * Existing sessions are deliberately not trusted based on a
     * client-controlled role alone. Connect real authentication here.
     */
    try {
      sessionStorage.removeItem('mf-ui-session');
    } catch {
      // Storage can be unavailable in some browser contexts.
    }
    setAuthChecked(true);
  }, []);

  useEffect(() => {
    const update = () => {
      setClock(
        new Date().toLocaleTimeString('en-GB', { hour12: false }),
      );
    };

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Read-only telemetry through the server-side proxy.
  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function refresh() {
      const started = performance.now();

      try {
        const response = await fetch('/api/maskedflipper/status', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Gateway returned ${response.status}`);
        }

        const data = (await response.json()) as GatewayStatus;

        if (!stopped) {
          setGatewayStatus(data);
          setGatewayOnline(true);
          setGatewayLatency(Math.round(performance.now() - started));
        }
      } catch {
        if (!stopped) {
          setGatewayOnline(false);
          setGatewayLatency(null);
        }
      }

      if (!stopped) {
        timer = setTimeout(refresh, 5000);
      }
    }

    void refresh();

    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const addLog = (
    level: LogEntry['level'],
    message: string,
  ) => {
    const time = new Date().toLocaleTimeString('en-GB', {
      hour12: false,
    });

    setLogs((current) =>
      [{ time, level, message }, ...current].slice(0, 100),
    );
  };

  const formatUptime = (seconds: number) => {
    const safe = Math.max(0, Math.floor(seconds || 0));
    const days = Math.floor(safe / 86400);
    const hours = Math.floor((safe % 86400) / 3600);
    const minutes = Math.floor((safe % 3600) / 60);

    return days
      ? `${days}d ${hours}h`
      : hours
        ? `${hours}h ${minutes}m`
        : `${minutes}m`;
  };

  const pageTitle = useMemo(() => {
    for (const group of navGroups) {
      const item = group.items.find((entry) => entry.id === activeTab);
      if (item) return item.label;
    }
    return 'Dashboard';
  }, [activeTab]);

  const renderDashboard = () => (
    <div className="mf-stack">
      <section className="mf-hero">
        <div>
          <div className="mf-eyebrow">DEVICE CONTROL CENTER</div>
          <h2>
            Know your hardware.
            <br />
            <span>Own your workflow.</span>
          </h2>
          <p>
            One workspace for MaskedFlipper development, system
            telemetry, and diagnostics.
          </p>
          <div className="mf-actions">
            <button
              className="mf-btn mf-btn-primary"
              onClick={() => setActiveTab('terminal')}
            >
              Open device terminal ↗
            </button>
            <button
              className="mf-btn"
              onClick={() => setActiveTab('hardware')}
            >
              View telemetry
            </button>
          </div>
        </div>
        <div className="mf-device-art">
          <div className="mf-device">
            <b>MASKEDFLIPPER</b>
            <div className="mf-device-screen">
              <span>MF / SYSTEM</span>
              <strong>{gatewayOnline ? 'ONLINE_' : 'WAITING_'}</strong>
              <small>
                {gatewayOnline ? 'GATEWAY ONLINE' : 'GATEWAY OFFLINE'}
              </small>
            </div>
            <div className="mf-device-buttons">●　●　●　●　●</div>
          </div>
        </div>
      </section>

      <div className="mf-stats">
        <div className="mf-stat">
          <small>DEVICE STATUS</small>
          <strong>{gatewayOnline ? 'Online' : 'Offline'}</strong>
          <span>{gatewayStatus?.hostname ?? 'Raspberry Pi'}</span>
        </div>
        <div className="mf-stat">
          <small>CPU TEMPERATURE</small>
          <strong>
            {gatewayStatus?.cpu_temperature_c == null
              ? '—'
              : `${gatewayStatus.cpu_temperature_c.toFixed(1)} °C`}
          </strong>
          <span>
            Load:{' '}
            {gatewayStatus?.cpu_load_1_5_15?.[0]?.toFixed(2) ?? '—'}
          </span>
        </div>
        <div className="mf-stat">
          <small>MEMORY USED</small>
          <strong>
            {gatewayStatus?.memory?.used_percent == null
              ? '—'
              : `${gatewayStatus.memory.used_percent.toFixed(1)}%`}
          </strong>
          <span>
            Uptime{' '}
            {gatewayStatus
              ? formatUptime(gatewayStatus.uptime_seconds)
              : '—'}
          </span>
        </div>
        <div className="mf-stat">
          <small>GATEWAY LATENCY</small>
          <strong>{gatewayLatency == null ? '—' : `${gatewayLatency} ms`}</strong>
          <span>{gatewayOnline ? 'Live API response' : 'Unavailable'}</span>
        </div>
      </div>

      <div className="mf-section-heading">
        <div>
          <div className="mf-eyebrow">WORKSPACE</div>
          <h2>Modules & tools</h2>
        </div>
        <span>6 MODULES</span>
      </div>

      <div className="mf-module-grid">
        {modules.map((module) => (
          <button
            className="mf-module-card"
            key={module.id}
            onClick={() => setActiveTab(module.id)}
          >
            <div className="mf-module-top">
              <span className="mf-module-icon">{module.icon}</span>
              <Pill
                tone={module.state === 'LIVE API' && gatewayOnline ? 'green' : 'amber'}
              >
                {module.state}
              </Pill>
            </div>
            <h3>{module.name}</h3>
            <p>{module.detail}</p>
            <span className="mf-module-open">Open module ↗</span>
          </button>
        ))}
      </div>

      <div className="mf-two-col">
        <Panel
          title="Recent activity"
          eyebrow="SESSION LOG"
          action={
            <button className="mf-text-btn" onClick={() => setActiveTab('logs')}>
              View all ↗
            </button>
          }
        >
          <div className="mf-log-list">
            {logs.slice(0, 5).map((entry, index) => (
              <div className="mf-log-row" key={`${entry.time}-${index}`}>
                <time>{entry.time}</time>
                <Pill
                  tone={
                    entry.level === 'WARN'
                      ? 'amber'
                      : entry.level === 'SAFE'
                        ? 'green'
                        : 'muted'
                  }
                >
                  {entry.level}
                </Pill>
                <span>{entry.message}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Connection status" eyebrow="RASPBERRY PI">
          <div className="mf-check-row">
            <span>Gateway API</span>
            <Pill tone={gatewayOnline ? 'green' : 'red'}>
              {gatewayOnline ? 'ONLINE' : 'OFFLINE'}
            </Pill>
          </div>
          <div className="mf-check-row">
            <span>Read-only telemetry</span>
            <Pill tone={gatewayOnline ? 'green' : 'amber'}>
              {gatewayOnline ? 'RECEIVING' : 'WAITING'}
            </Pill>
          </div>
          <div className="mf-check-row">
            <span>Remote terminal</span>
            <Pill tone="amber">OPEN TERMINAL TO CONNECT</Pill>
          </div>
          <button
            className="mf-btn mf-wide"
            onClick={() => setActiveTab('terminal')}
          >
            Open device terminal →
          </button>
        </Panel>
      </div>
    </div>
  );

  const renderModule = (tab: TabId) => {
    if (tab === 'wifi') {
      return (
        <div className="mf-stack">
          <div className="mf-page-intro">
            <div>
              <div className="mf-eyebrow">WIRELESS TOOLKIT</div>
              <h2>Wi-Fi auditing</h2>
              <p>Lab discovery and explicitly scoped security checks.</p>
            </div>
            <Pill>STANDBY</Pill>
          </div>

          <div className="mf-segmented">
            <button
              className={wifiMode === 'passive' ? 'active' : ''}
              onClick={() => setWifiMode('passive')}
            >
              Passive discovery
            </button>
            <button
              className={wifiMode === 'scope' ? 'active' : ''}
              onClick={() => setWifiMode('scope')}
            >
              Authorized test scope
            </button>
          </div>

          {wifiMode === 'passive' ? (
            <Panel title="Nearby access points" eyebrow="SCAN RESULTS">
              <div className="mf-empty">
                <b>No live scan data</b>
                <p>
                  No wireless scan has been started. This module currently
                  displays UI state only.
                </p>
              </div>
            </Panel>
          ) : (
            <Panel title="Scope confirmation" eyebrow="AUTHORIZED TESTING ONLY">
              <label htmlFor="wifi-network">Authorized lab network</label>
              <input
                id="wifi-network"
                value={selectedNetwork}
                onChange={(event) => setSelectedNetwork(event.target.value)}
              />
              <p>
                Active testing is not connected. Review the scope before
                integrating any device-side actions.
              </p>
              <button
                className="mf-btn"
                onClick={() =>
                  addLog(
                    'SAFE',
                    `Scope draft reviewed for ${selectedNetwork || 'unnamed network'}`,
                  )
                }
              >
                Review scope draft
              </button>
            </Panel>
          )}
        </div>
      );
    }

    if (tab === 'badusb') {
      return (
        <div className="mf-stack">
          <div className="mf-page-intro">
            <div>
              <div className="mf-eyebrow">HID DEVELOPMENT</div>
              <h2>BadUSB HID</h2>
              <p>Draft and review scripts for devices you own or are authorized to test.</p>
            </div>
            <Pill tone="green">DISARMED</Pill>
          </div>
          <Panel title="Payload workspace" eyebrow="LOCAL DRAFT">
            <label htmlFor="payload-name">Draft name</label>
            <input
              id="payload-name"
              value={payloadName}
              onChange={(event) => setPayloadName(event.target.value)}
            />
            <pre className="mf-code-preview">
{`REM MaskedFlipper HID script draft
REM Review before exporting to your own test device
REM Execution is not connected`}
            </pre>
            <button
              className="mf-btn"
              onClick={() => addLog('INFO', `HID draft reviewed: ${payloadName || 'Untitled'}`)}
            >
              Save review event
            </button>
          </Panel>
        </div>
      );
    }

    if (tab === 'rf' || tab === 'nfc') {
      const isRf = tab === 'rf';
      return (
        <div className="mf-stack">
          <div className="mf-page-intro">
            <div>
              <div className="mf-eyebrow">
                {isRf ? 'RADIO FREQUENCY / INFRARED' : 'NEAR-FIELD COMMUNICATION'}
              </div>
              <h2>{isRf ? 'Sub-GHz & IR' : 'NFC / RFID'}</h2>
              <p>
                {isRf
                  ? 'Organize lab captures and review radio hardware state.'
                  : 'Reader status and tag inspection workspace.'}
              </p>
            </div>
            <Pill>STANDBY</Pill>
          </div>
          <div className="mf-stats mf-stats-three">
            <div className="mf-stat">
              <small>{isRf ? 'RADIO' : 'READER'}</small>
              <strong>Offline</strong>
              <span>Not connected</span>
            </div>
            <div className="mf-stat">
              <small>{isRf ? 'IR TRANSCEIVER' : 'LAST TAG'}</small>
              <strong>—</strong>
              <span>No data</span>
            </div>
            <div className="mf-stat">
              <small>RECORDS</small>
              <strong>00</strong>
              <span>No files loaded</span>
            </div>
          </div>
          <Panel title={isRf ? 'Capture library' : 'Tag inspector'} eyebrow="WAITING FOR HARDWARE">
            <div className="mf-empty">
              <b>{isRf ? 'No captures available' : 'Reader not connected'}</b>
              <p>
                This module is not yet connected to a device-side hardware API.
              </p>
            </div>
          </Panel>
        </div>
      );
    }

    if (tab === 'hardware') {
      return (
        <div className="mf-stack">
          <div className="mf-page-intro">
            <div>
              <div className="mf-eyebrow">DEVICE HEALTH</div>
              <h2>Hardware & telemetry</h2>
              <p>Live Raspberry Pi system telemetry from the status API.</p>
            </div>
            <Pill tone={gatewayOnline ? 'green' : 'amber'}>
              {gatewayOnline ? 'LIVE TELEMETRY' : 'WAITING FOR GATEWAY'}
            </Pill>
          </div>

          <div className="mf-stats mf-stats-three">
            <div className="mf-stat">
              <small>CPU TEMPERATURE</small>
              <strong>
                {gatewayStatus?.cpu_temperature_c == null
                  ? '—'
                  : `${gatewayStatus.cpu_temperature_c.toFixed(1)} °C`}
              </strong>
              <span>Raspberry Pi sensor</span>
            </div>
            <div className="mf-stat">
              <small>MEMORY USED</small>
              <strong>
                {gatewayStatus?.memory?.used_percent == null
                  ? '—'
                  : `${gatewayStatus.memory.used_percent.toFixed(1)}%`}
              </strong>
              <span>
                {gatewayStatus?.memory
                  ? `${Math.round(gatewayStatus.memory.available_kb / 1024)} MB available`
                  : 'No system feed'}
              </span>
            </div>
            <div className="mf-stat">
              <small>SYSTEM UPTIME</small>
              <strong>
                {gatewayStatus ? formatUptime(gatewayStatus.uptime_seconds) : '—'}
              </strong>
              <span>{gatewayStatus?.hostname ?? 'Pi not connected'}</span>
            </div>
          </div>

          <Panel title="System channels" eyebrow="LIVE TELEMETRY FEED">
            <div className="mf-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Channel</th>
                    <th>Latest reading</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gateway</td>
                    <td>{gatewayOnline ? 'Connected' : 'Unavailable'}</td>
                    <td><Pill tone={gatewayOnline ? 'green' : 'red'}>{gatewayOnline ? 'Online' : 'Offline'}</Pill></td>
                  </tr>
                  <tr>
                    <td>CPU temperature</td>
                    <td>{gatewayStatus?.cpu_temperature_c == null ? '—' : `${gatewayStatus.cpu_temperature_c.toFixed(1)} °C`}</td>
                    <td><Pill>{gatewayStatus?.cpu_temperature_c == null ? 'No data' : 'Live'}</Pill></td>
                  </tr>
                  <tr>
                    <td>CPU load (1 min)</td>
                    <td>{gatewayStatus?.cpu_load_1_5_15?.[0]?.toFixed(2) ?? '—'}</td>
                    <td><Pill>{gatewayStatus ? 'Live' : 'Waiting'}</Pill></td>
                  </tr>
                  <tr>
                    <td>Memory</td>
                    <td>{gatewayStatus?.memory?.used_percent == null ? '—' : `${gatewayStatus.memory.used_percent.toFixed(1)}% used`}</td>
                    <td><Pill>{gatewayStatus?.memory ? 'Live' : 'Waiting'}</Pill></td>
                  </tr>
                  <tr>
                    <td>Hardware control</td>
                    <td>{gatewayStatus?.hardware_control ?? '—'}</td>
                    <td><Pill tone="amber">Read-only</Pill></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mf-field-hint">Status refreshes every five seconds. This API reads telemetry only.</p>
          </Panel>
        </div>
      );
    }

    if (tab === 'screen') {
      return (
        <div className="mf-stack">
          <div className="mf-page-intro">
            <div>
              <div className="mf-eyebrow">DISPLAY SIMULATOR</div>
              <h2>Screen & keypad</h2>
              <p>Local display preview; does not drive physical hardware.</p>
            </div>
            <Pill>LOCAL PREVIEW</Pill>
          </div>
          <div className="mf-two-col">
            <Panel title="Display preview" eyebrow="MOCK SCREEN">
              <div className="mf-screen">
                <div>MASKED FLIPPER <span>●</span></div>
                <pre>{screenText || ' '}</pre>
                <small>LOCAL PREVIEW ONLY</small>
              </div>
            </Panel>
            <Panel title="Display content" eyebrow="TEST TEXT">
              <label htmlFor="screen-text">Screen text</label>
              <textarea
                id="screen-text"
                value={screenText}
                maxLength={120}
                onChange={(event) => setScreenText(event.target.value)}
              />
              <p className="mf-field-hint">{screenText.length}/120 characters</p>
              <button
                className="mf-btn"
                onClick={() => {
                  setScreenText('MASKED\nFLIPPER');
                  addLog('INFO', 'Display preview reset');
                }}
              >
                Reset preview
              </button>
              <div className="mf-keypad">
                {['↑', '←', 'OK', '→', '↓'].map((key) => (
                  <button
                    key={key}
                    onClick={() => addLog('INFO', `Virtual keypad ${key} pressed in preview mode`)}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderLogs = () => (
    <div className="mf-stack">
      <div className="mf-page-intro">
        <div>
          <div className="mf-eyebrow">SESSION HISTORY</div>
          <h2>Audit logs</h2>
          <p>Local interface events, not a device-side security log.</p>
        </div>
        <button className="mf-btn" onClick={() => setLogs([])}>
          Clear local logs
        </button>
      </div>
      <Panel title="Event stream" eyebrow={`${logs.length} LOCAL EVENTS`}>
        <div className="mf-log-list">
          {logs.length ? logs.map((entry, index) => (
            <div className="mf-log-row" key={`${entry.time}-${index}`}>
              <time>{entry.time}</time>
              <Pill tone={entry.level === 'WARN' ? 'amber' : entry.level === 'SAFE' ? 'green' : 'muted'}>
                {entry.level}
              </Pill>
              <span>{entry.message}</span>
            </div>
          )) : <div className="mf-empty"><b>No local events</b></div>}
        </div>
      </Panel>
    </div>
  );

  const renderOverview = () => (
    <div className="mf-stack">
      <div className="mf-page-intro">
        <div>
          <div className="mf-eyebrow">PROJECT DOCUMENTATION</div>
          <h2>About MaskedFlipper</h2>
          <p>A modular hardware research and development interface.</p>
        </div>
        <Pill>DEVELOPMENT</Pill>
      </div>
      <Panel title="Project intent" eyebrow="OVERVIEW">
        <p>
          MaskedFlipper is a modular interface for device telemetry, wireless
          lab tooling, HID development, NFC/RFID inspection, and screen/keypad
          previews. The website is the control surface; hardware integration
          is handled separately.
        </p>
        <div className="mf-info-grid">
          <div><b>01 / Web UI</b><p>Responsive browser workspace.</p></div>
          <div><b>02 / Gateway</b><p>Authenticated transport to the Raspberry Pi.</p></div>
          <div><b>03 / Hardware</b><p>Explicit APIs for telemetry and permitted actions.</p></div>
        </div>
      </Panel>
      <Panel title="Implementation status" eyebrow="CURRENT STATE">
        <div className="mf-check-row"><span>Dashboard UI</span><Pill tone="green">READY</Pill></div>
        <div className="mf-check-row"><span>Read-only telemetry</span><Pill tone={gatewayOnline ? 'green' : 'amber'}>{gatewayOnline ? 'ONLINE' : 'WAITING'}</Pill></div>
        <div className="mf-check-row"><span>Restricted WebSocket terminal</span><Pill tone="amber">SEPARATE SERVICE</Pill></div>
        <div className="mf-check-row"><span>Hardware module actions</span><Pill>NOT CONNECTED</Pill></div>
      </Panel>
    </div>
  );

  if (!authChecked) {
    return <div className="mf-loading">INITIALIZING WORKSPACE_</div>;
  }

  if (!authenticated) {
    return (
      <>
        <style jsx global>{styles}</style>
        <MaskedFlipperLogin
          onLogin={(email, role) => {
            setUserEmail(email);
            setUserRole(role);
            setAuthenticated(true);
          }}
        />
      </>
    );
  }

  return (
    <main className="mf-shell">
      <style jsx global>{styles}</style>

      <aside className="mf-sidebar">
        <div className="mf-brand">
          <span className="mf-brand-mark">M</span>
          <div>
            <b>MASKEDFLIPPER</b>
            <small>DEVICE WORKSPACE</small>
          </div>
        </div>

        <nav aria-label="Main navigation">
          {navGroups.map((group) => (
            <div className="mf-nav-group" key={group.title}>
              <div className="mf-nav-label">{group.title}</div>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  className={`mf-nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="mf-nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.id === 'terminal' && (
                    <span className="mf-nav-tag">REMOTE</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="mf-sidebar-bottom">
          <div className="mf-status-card">
            <div className="mf-check-row">
              <b>{gatewayStatus?.hostname ?? 'Raspberry Pi'}</b>
              <Pill tone={gatewayOnline ? 'green' : 'red'}>
                {gatewayOnline ? 'ONLINE' : 'OFFLINE'}
              </Pill>
            </div>
            <small>MASKED FLIPPER / TARGET</small>
            <p>{gatewayOnline ? 'Live telemetry connected' : 'Gateway unreachable'}</p>
          </div>
        </div>
      </aside>

      <div className="mf-main">
        <header className="mf-topbar">
          <div className="mf-breadcrumb">
            WORKSPACE <span>/</span> <b>{pageTitle.toUpperCase()}</b>
          </div>
          <div className="mf-top-right">
            <span className="mf-clock">{clock}</span>
            <Pill tone={gatewayOnline ? 'green' : 'amber'}>
              {gatewayOnline ? 'GATEWAY ONLINE' : 'GATEWAY WAITING'}
            </Pill>
            <span className="mf-user">
              {userEmail || (userRole === 'admin' ? 'ADMIN' : 'USER')}
            </span>
            <button
              className="mf-btn"
              onClick={() => {
                setAuthenticated(false);
                setUserRole(null);
                setUserEmail('');
              }}
            >
              Sign out
            </button>
          </div>
        </header>

        <div className="mf-content">
          <div className="mf-content-head">
            <div>
              <h1>{pageTitle}</h1>
              <p>MaskedFlipper development console · Raspberry Pi integration</p>
            </div>
            <Pill>BUILD 0.3.0</Pill>
          </div>

          {activeTab === 'dashboard' && renderDashboard()}

          {activeTab === 'terminal' && (
            <RemoteTerminal onLog={addLog} />
          )}

          {['wifi', 'badusb', 'rf', 'nfc', 'hardware', 'screen'].includes(activeTab) &&
            renderModule(activeTab)}

          {activeTab === 'logs' && renderLogs()}
          {activeTab === 'overview' && renderOverview()}

          <footer className="mf-footer">
            MASKEDFLIPPER // DEVELOPMENT WORKSPACE
            <span>REMOTE TERMINAL USES A SEPARATE AUTHENTICATED SERVICE</span>
          </footer>
        </div>
      </div>
    </main>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap');

.mf-shell,.mf-auth,.mf-loading{--bg:#090a0c;--panel:#111215;--border:#292a30;--muted:#898b95;--text:#f3f3f5;--red:#e63329;--cyan:#55dff7;min-height:100vh;background:var(--bg);color:var(--text);font:13px 'Manrope',sans-serif}
.mf-shell *,.mf-auth *{box-sizing:border-box}
.mf-shell{display:flex}
.mf-sidebar{width:245px;flex:0 0 245px;min-height:100vh;height:100vh;position:sticky;top:0;overflow:auto;padding:24px 15px;background:#0c0d0f;border-right:1px solid #25262c;display:flex;flex-direction:column}
.mf-brand{display:flex;align-items:center;gap:12px;padding:0 8px 24px;border-bottom:1px solid #25262c}
.mf-brand-mark{width:38px;height:38px;display:grid;place-items:center;border:1px solid #73302b;color:var(--red);font-weight:800;font-size:20px}
.mf-brand b,.mf-auth-brand b{font-size:12px;letter-spacing:1.6px}
.mf-brand small,.mf-auth-brand small{display:block;margin-top:5px;color:var(--cyan);font:9px 'DM Mono',monospace;letter-spacing:1.5px}
.mf-nav-group{margin-top:24px}
.mf-nav-label,.mf-eyebrow{font:10px 'DM Mono',monospace;letter-spacing:1.5px;color:var(--cyan);margin-bottom:10px}
.mf-nav-label{color:#777984;padding-left:10px}
.mf-nav-item{width:100%;display:flex;align-items:center;gap:10px;padding:11px 10px;margin:3px 0;border:1px solid transparent;background:transparent;color:#a2a3ab;text-align:left;cursor:pointer}
.mf-nav-item:hover,.mf-nav-item.active{background:#21100e;border-color:#48211b;color:white}
.mf-nav-item.active .mf-nav-icon{color:var(--red)}
.mf-nav-icon{width:22px;text-align:center;font:15px 'DM Mono',monospace}
.mf-nav-tag{margin-left:auto;font:8px 'DM Mono',monospace;color:var(--cyan)}
.mf-sidebar-bottom{margin-top:auto;padding-top:20px}
.mf-status-card{border:1px solid var(--border);padding:12px;background:#111215}
.mf-status-card small,.mf-status-card p{color:var(--muted);font-size:10px}
.mf-main{flex:1;min-width:0}
.mf-topbar{min-height:66px;display:flex;align-items:center;justify-content:space-between;gap:15px;padding:12px 28px;border-bottom:1px solid #25262c;background:#0b0c0e}
.mf-breadcrumb,.mf-clock,.mf-user{font:10px 'DM Mono',monospace;color:#bcbec6}
.mf-breadcrumb span{padding:0 8px;color:#666}
.mf-top-right{display:flex;align-items:center;gap:13px;flex-wrap:wrap}
.mf-content{max-width:1600px;margin:auto;padding:28px}
.mf-content-head,.mf-page-intro,.mf-section-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:15px}
.mf-content-head{margin-bottom:25px}
.mf-content-head h1,.mf-page-intro h2{margin:0;font-size:24px;letter-spacing:-.7px}
.mf-content-head p,.mf-page-intro p{color:var(--muted);font-size:11px;line-height:1.7}
.mf-stack{display:flex;flex-direction:column;gap:20px}
.mf-hero{min-height:280px;padding:32px;display:flex;justify-content:space-between;align-items:center;gap:20px;border:1px solid #3a211c;background:radial-gradient(ellipse at 80% 40%,#2a120f,#111114 58%,#090a0c)}
.mf-hero h2{font-size:clamp(26px,3vw,38px);line-height:1.2;letter-spacing:-1px}
.mf-hero h2 span{color:var(--red)}
.mf-hero p{max-width:470px;color:#a2a3ab;line-height:1.8}
.mf-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}
.mf-btn{border:1px solid #3b3c43;background:#17181c;color:#e3e4e8;padding:10px 13px;cursor:pointer;font:10px 'DM Mono',monospace}
.mf-btn:hover{border-color:var(--cyan);color:var(--cyan)}
.mf-btn-primary{background:var(--red);border-color:var(--red);color:white}
.mf-wide{width:100%;margin-top:16px}
.mf-device-art{width:230px;display:grid;place-items:center}
.mf-device{width:135px;height:205px;border:1px solid #71423d;border-radius:15px;background:linear-gradient(140deg,#292a2f,#0c0d10);padding:16px 10px;transform:rotate(5deg);box-shadow:0 15px 35px #0009;text-align:center;font:8px 'DM Mono',monospace}
.mf-device-screen{margin-top:16px;padding:12px 6px;height:80px;background:#08100c;border:2px solid #39443c;color:#65e7a0;display:flex;flex-direction:column;gap:9px;text-align:left}
.mf-device-screen strong{font-size:13px}
.mf-device-screen small{font-size:7px;color:#e65a65}
.mf-device-buttons{margin-top:20px;color:#8e9099}
.mf-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.mf-stats-three{grid-template-columns:repeat(3,minmax(0,1fr))}
.mf-stat{padding:17px;border:1px solid var(--border);background:var(--panel);min-width:0}
.mf-stat small{display:block;color:#8e9099;font:9px 'DM Mono',monospace;letter-spacing:1px;margin-bottom:13px}
.mf-stat strong{display:block;font-size:22px;overflow-wrap:anywhere}
.mf-stat span{display:block;color:var(--muted);font-size:10px;margin-top:8px}
.mf-section-heading{align-items:end}
.mf-section-heading h2{margin:0;font-size:19px}
.mf-module-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.mf-module-card{padding:17px;text-align:left;background:linear-gradient(145deg,#141519,#101114);border:1px solid var(--border);color:var(--text);cursor:pointer;min-width:0}
.mf-module-card:hover{border-color:#77322c;transform:translateY(-1px)}
.mf-module-top{display:flex;align-items:center;justify-content:space-between;gap:8px}
.mf-module-icon{display:grid;place-items:center;width:36px;height:36px;border:1px solid #48251f;background:#21110e;color:var(--red);font-size:18px}
.mf-module-card h3{font-size:13px;margin:17px 0 7px}
.mf-module-card p{min-height:34px;color:var(--muted);font-size:10px;line-height:1.7}
.mf-module-open{display:block;border-top:1px solid var(--border);padding-top:12px;margin-top:14px;color:var(--cyan);font:9px 'DM Mono',monospace}
.mf-two-col{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start}
.mf-panel{padding:18px;border:1px solid var(--border);background:var(--panel);min-width:0}
.mf-panel-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}
.mf-panel-head h2{font-size:14px;margin:0}
.mf-panel-head .mf-eyebrow{font-size:9px;margin-bottom:6px}
.mf-text-btn{border:0;background:none;color:var(--cyan);cursor:pointer}
.mf-pill{display:inline-flex;align-items:center;white-space:nowrap;border:1px solid #393a42;background:#191a1f;color:#b7b8c0;padding:5px 7px;font:8px 'DM Mono',monospace;letter-spacing:.3px}
.mf-pill-red{border-color:#63212a;background:#291015;color:#ff7b86}
.mf-pill-green{border-color:#244d3a;background:#102119;color:#6ed69a}
.mf-pill-amber{border-color:#5c4824;background:#241d10;color:#e8c06b}
.mf-log-list{display:flex;flex-direction:column}
.mf-log-row{display:grid;grid-template-columns:65px auto minmax(0,1fr);align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid #25262b;font-size:10px}
.mf-log-row:last-child{border-bottom:0}
.mf-log-row time{font:9px 'DM Mono',monospace;color:#81838d}
.mf-log-row>span:last-child{overflow-wrap:anywhere;color:#c3c4cb;line-height:1.6}
.mf-check-row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)}
.mf-check-row:last-child{border-bottom:0}
.mf-page-intro p{margin-top:7px}
.mf-segmented{display:flex;gap:6px;flex-wrap:wrap}
.mf-segmented button,.mf-keypad button{padding:10px 13px;border:1px solid #35363d;background:#15161a;color:#aaa;cursor:pointer}
.mf-segmented button.active{border-color:var(--red);color:white;background:#29110f}
.mf-empty{min-height:130px;display:grid;place-content:center;text-align:center;gap:9px;padding:20px}
.mf-empty p,.mf-panel>p{color:#9a9ba4;font-size:11px;line-height:1.8}
.mf-panel label,.mf-auth label{display:block;margin:14px 0 7px;color:#b5b6bf;font-size:10px}
.mf-panel input,.mf-panel textarea,.mf-auth input{width:100%;padding:11px;border:1px solid #383941;background:#090a0c;color:white;outline:none;font:11px 'DM Mono',monospace}
.mf-panel input:focus,.mf-panel textarea:focus,.mf-auth input:focus{border-color:var(--cyan)}
.mf-code-preview{white-space:pre-wrap;overflow-wrap:anywhere;background:#08090b;border:1px solid var(--border);padding:15px;color:#79d59a;font:11px/1.9 'DM Mono',monospace}
.mf-table-wrap{overflow:auto}
.mf-table-wrap table{width:100%;border-collapse:collapse;text-align:left;font-size:10px}
.mf-table-wrap th,.mf-table-wrap td{padding:12px;border-bottom:1px solid var(--border)}
.mf-table-wrap th{color:#8e9099;font:9px 'DM Mono',monospace}
.mf-field-hint{color:#81838d;font-size:10px;line-height:1.7}
.mf-info-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.mf-info-grid>div{border:1px solid var(--border);padding:13px;background:#15161a}
.mf-info-grid b{font-size:11px}
.mf-info-grid p{color:var(--muted);font-size:10px;line-height:1.7}
.mf-screen{min-height:230px;padding:16px;background:#0a2017;border:7px solid #303239;color:#7ef5ad;font:10px 'DM Mono',monospace}
.mf-screen div{display:flex;justify-content:space-between;border-bottom:1px solid #286344;padding-bottom:8px}
.mf-screen pre{font:20px/1.5 'DM Mono',monospace;white-space:pre-wrap;overflow-wrap:anywhere;min-height:100px}
.mf-screen small{font-size:8px}
.mf-keypad{display:flex;gap:6px;flex-wrap:wrap;margin-top:15px}
.mf-keypad button{flex:1}
.mf-footer{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;border-top:1px solid #25262c;padding-top:15px;margin-top:35px;color:#747680;font:8px 'DM Mono',monospace;letter-spacing:.4px}
.mf-auth{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:25px;gap:45px;background:radial-gradient(ellipse at 20% 40%,#20100e,transparent 55%),#050607}
.mf-auth-brand{display:flex;align-items:center;gap:12px}
.mf-auth-card{width:min(460px,100%);padding:30px;border:1px solid #343136;background:#101012}
.mf-auth-card h1{font-size:30px;line-height:1.2}
.mf-auth-card h1 span{color:var(--red)}
.mf-auth-card>p{color:var(--muted);font-size:11px;line-height:1.8}
.mf-password-row{display:flex;gap:7px}
.mf-password-row input{min-width:0}
.mf-error{color:#ff7b86;font-size:11px}
.mf-loading{display:grid;place-items:center;color:var(--cyan);font-family:'DM Mono',monospace}
@media(max-width:1100px){.mf-sidebar{width:210px;flex-basis:210px}.mf-content{padding:22px}.mf-module-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.mf-stats{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:760px){.mf-shell{display:block}.mf-sidebar{position:relative;width:100%;height:auto;min-height:0;padding:14px}.mf-sidebar-bottom{display:none}.mf-nav-group{margin-top:12px}.mf-nav-group:not(:first-of-type){display:none}.mf-nav-group:first-of-type .mf-nav-item{display:inline-flex;width:auto;margin-right:5px}.mf-topbar{padding:12px;align-items:flex-start}.mf-top-right{gap:7px;justify-content:flex-end}.mf-content{padding:18px 13px}.mf-content-head h1{font-size:20px}.mf-hero{padding:22px}.mf-device-art{display:none}.mf-stats,.mf-stats-three{grid-template-columns:repeat(2,minmax(0,1fr))}.mf-module-grid,.mf-two-col,.mf-info-grid{grid-template-columns:1fr}.mf-page-intro{flex-direction:column}.mf-log-row{grid-template-columns:54px auto minmax(0,1fr);gap:7px}.mf-footer{line-height:1.8}}
`;
