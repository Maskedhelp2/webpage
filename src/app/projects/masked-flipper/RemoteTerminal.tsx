
'use client';

import React, { useEffect, useRef, useState } from 'react';

type LogLevel = 'INFO' | 'WARN' | 'SAFE';

type RemoteTerminalProps = {
  onLog: (level: LogLevel, message: string) => void;
};

type ConnectionState =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'error';

type ServerMessage = {
  type?: string;
  message?: string;
  commands?: string[];
  command?: string;
  exitCode?: number;
  output?: string;
};

const WS_URL = 'wss://terminal.maskedhelp.com/ws';
const FULL_SHELL_URL = 'https://shell.maskedhelp.com/';

const ALLOWED_COMMANDS = new Set([
  'status',
  'memory',
  'disk',
  'hostname',
]);

const LOCAL_COMMANDS = new Set([
  'help',
  'modules',
  'clear',
]);

export default function RemoteTerminal({
  onLog,
}: RemoteTerminalProps) {
  const [connection, setConnection] =
    useState<ConnectionState>('disconnected');

  const [input, setInput] = useState('');

  const [lines, setLines] = useState<string[]>([
    'MASKEDFLIPPER / DEVICE CONSOLE',
    'Restricted remote terminal initialized.',
    'Target: Raspberry Pi / maskedhelp',
    '',
    'Restricted commands: status, memory, disk, hostname',
    'Use Open Full Terminal for an interactive Linux shell.',
    '',
  ]);

  const socketRef = useRef<WebSocket | null>(null);
  const authenticatedRef = useRef(false);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const appendLines = (...newLines: string[]) => {
    setLines((current) => [...current, ...newLines].slice(-400));
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop =
        outputRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    return () => {
      const socket = socketRef.current;

      socketRef.current = null;
      authenticatedRef.current = false;

      if (socket && socket.readyState < WebSocket.CLOSING) {
        socket.close(1000, 'Terminal component closed');
      }
    };
  }, []);

  const disconnect = () => {
    const socket = socketRef.current;

    socketRef.current = null;
    authenticatedRef.current = false;

    if (socket && socket.readyState < WebSocket.CLOSING) {
      socket.close(1000, 'Disconnected by user');
    }

    setConnection('disconnected');
    appendLines('Disconnected from the restricted gateway.', '');
    onLog('INFO', 'Restricted terminal disconnected');
  };

  const connect = () => {
    const existing = socketRef.current;

    if (
      existing &&
      (existing.readyState === WebSocket.CONNECTING ||
        existing.readyState === WebSocket.OPEN)
    ) {
      disconnect();
      return;
    }

    setConnection('connecting');
    authenticatedRef.current = false;

    appendLines(
      `Connecting to ${WS_URL} ...`,
      'Waiting for Cloudflare Access authentication...',
    );

    let socket: WebSocket;

    try {
      socket = new WebSocket(WS_URL);
    } catch {
      setConnection('error');
      appendLines(
        'ERROR: Could not initialize the WebSocket connection.',
        '',
      );
      return;
    }

    socketRef.current = socket;

    socket.onopen = () => {
      appendLines(
        'WebSocket transport connected.',
        'Waiting for terminal authentication...',
        '',
      );
    };

    socket.onmessage = (event: MessageEvent) => {
      let message: ServerMessage;

      try {
        message = JSON.parse(String(event.data)) as ServerMessage;
      } catch {
        appendLines('ERROR: Invalid response received from the gateway.', '');
        return;
      }

      if (message.type === 'ready') {
        authenticatedRef.current = true;
        setConnection('connected');

        appendLines(
          'Restricted remote session authenticated.',
          `Available server commands: ${(message.commands ?? []).join(', ')}`,
          '',
        );

        onLog('INFO', 'Restricted remote terminal connected');
        inputRef.current?.focus();
        return;
      }

      if (message.type === 'output') {
        const output = (message.output ?? '').replace(/\s+$/, '');

        appendLines(
          `[${message.command ?? 'command'}] exit code: ${message.exitCode ?? 'unknown'}`,
          ...(output ? output.split('\n') : ['(no output)']),
          '',
        );

        return;
      }

      if (message.type === 'error') {
        const text = message.message ?? 'The gateway rejected the request';

        appendLines(`ERROR: ${text}`, '');
        onLog('WARN', `Remote terminal request rejected: ${text}`);
      }
    };

    socket.onerror = () => {
      appendLines(
        'ERROR: WebSocket connection failed.',
        'Check Cloudflare Access and the terminal service logs.',
        '',
      );
    };

    socket.onclose = (event: CloseEvent) => {
      // Ignore events belonging to a socket that was already replaced
      // or manually disconnected.
      if (socketRef.current !== socket) {
        return;
      }

      const wasAuthenticated = authenticatedRef.current;

      socketRef.current = null;
      authenticatedRef.current = false;

      setConnection(wasAuthenticated ? 'disconnected' : 'error');

      if (!wasAuthenticated) {
        appendLines(
          'The restricted session did not authenticate.',
          'Complete Cloudflare Access sign-in for terminal.maskedhelp.com',
          'and retry the connection.',
          '',
        );
      } else if (event.code !== 1000) {
        appendLines(
          `Connection closed (${event.code}).`,
          event.reason || '',
          '',
        );
      }

      onLog(
        'INFO',
        wasAuthenticated
          ? 'Restricted terminal disconnected'
          : 'Restricted terminal authentication failed',
      );
    };
  };

  const runCommand = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const command = input.trim();

    if (!command) {
      return;
    }

    setInput('');

    if (command === 'clear') {
      setLines([]);
      return;
    }

    appendLines(`pi@maskedhelp:~$ ${command}`);

    if (command === 'help') {
      appendLines(
        'Restricted remote commands:',
        '  status    - uptime and system load',
        '  memory    - memory usage',
        '  disk      - root filesystem usage',
        '  hostname  - Raspberry Pi hostname',
        '',
        'Local display commands:',
        '  help, modules, clear',
        '',
        'For arbitrary Linux commands, use Open Full Terminal.',
        '',
      );
      return;
    }

    if (command === 'modules') {
      appendLines(
        'Wi-Fi auditing · BadUSB HID · Sub-GHz/IR',
        'NFC/RFID · Hardware telemetry · Screen preview',
        '',
      );
      return;
    }

    if (!ALLOWED_COMMANDS.has(command)) {
      appendLines(
        'Command blocked: this console accepts only the configured allowlist.',
        'Use Open Full Terminal for the full Linux shell.',
        '',
      );

      onLog('SAFE', `Blocked restricted terminal command: ${command}`);
      return;
    }

    const socket = socketRef.current;

    if (
      !authenticatedRef.current ||
      !socket ||
      socket.readyState !== WebSocket.OPEN
    ) {
      appendLines(
        'Not connected to the gateway.',
        'Click Connect to Gateway before running remote commands.',
        '',
      );
      return;
    }

    try {
      socket.send(JSON.stringify({ command }));
      onLog('INFO', `Restricted remote command requested: ${command}`);
    } catch {
      appendLines('ERROR: Failed to send the command.', '');
    }
  };

  const connectionLabel: Record<ConnectionState, string> = {
    disconnected: 'DISCONNECTED',
    connecting: 'CONNECTING',
    connected: 'CONNECTED',
    error: 'CONNECTION ERROR',
  };

  const connectionTone =
    connection === 'connected'
      ? 'green'
      : connection === 'error'
        ? 'red'
        : 'amber';

  const handleQuickCommand = (command: string) => {
    setInput(command);
    inputRef.current?.focus();
  };

  return (
    <>
      <style jsx global>{`
        .mf-remote-terminal {
          --rt-bg: #070809;
          --rt-panel: #111215;
          --rt-border: #303138;
          --rt-muted: #90929c;
          --rt-text: #f3f3f5;
          --rt-red: #e63329;
          --rt-cyan: #55dff7;

          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
          color: var(--rt-text);
          font-family: 'Manrope', sans-serif;
        }

        .mf-remote-terminal *,
        .mf-remote-terminal *::before,
        .mf-remote-terminal *::after {
          box-sizing: border-box;
        }

        .mf-remote-terminal .rt-page-intro {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }

        .mf-remote-terminal .rt-eyebrow {
          margin-bottom: 9px;
          color: var(--rt-cyan);
          font: 10px 'DM Mono', monospace;
          letter-spacing: 1.5px;
        }

        .mf-remote-terminal .rt-page-intro h2 {
          margin: 0;
          color: var(--rt-text);
          font-size: 25px;
          letter-spacing: -0.7px;
        }

        .mf-remote-terminal .rt-page-intro p {
          margin: 8px 0 0;
          color: var(--rt-muted);
          font-size: 11px;
          line-height: 1.7;
        }

        .mf-remote-terminal .rt-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 9px;
          border: 1px solid var(--rt-border);
          background: #191a1f;
          color: #bcbec6;
          font: 9px 'DM Mono', monospace;
          letter-spacing: 0.4px;
          white-space: nowrap;
        }

        .mf-remote-terminal .rt-pill-green {
          border-color: #244d3a;
          background: #102119;
          color: #6ed69a;
        }

        .mf-remote-terminal .rt-pill-red {
          border-color: #63212a;
          background: #291015;
          color: #ff7b86;
        }

        .mf-remote-terminal .rt-pill-amber {
          border-color: #5c4824;
          background: #241d10;
          color: #e8c06b;
        }

        .mf-remote-terminal .rt-banner {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 13px;
          padding: 15px;
          border: 1px solid #594321;
          background: #1d1710;
        }

        .mf-remote-terminal .rt-banner-icon {
          display: grid;
          place-items: center;
          flex: 0 0 32px;
          width: 32px;
          height: 32px;
          background: #352817;
          color: #e8bd66;
          font-weight: 800;
        }

        .mf-remote-terminal .rt-banner-copy {
          flex: 1 1 250px;
          min-width: 0;
        }

        .mf-remote-terminal .rt-banner-copy b {
          display: block;
          color: #f0d8a0;
          font-size: 11px;
        }

        .mf-remote-terminal .rt-banner-copy p {
          margin: 5px 0 0;
          color: #b8a98d;
          font-size: 10px;
          line-height: 1.7;
        }

        .mf-remote-terminal .rt-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 36px;
          padding: 9px 12px;
          border: 1px solid #3b3c43;
          background: #17181c;
          color: #e3e4e8;
          font: 10px 'DM Mono', monospace;
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }

        .mf-remote-terminal .rt-button:hover {
          border-color: var(--rt-cyan);
          color: var(--rt-cyan);
        }

        .mf-remote-terminal .rt-button-primary {
          border-color: var(--rt-red);
          background: var(--rt-red);
          color: #fff;
        }

        .mf-remote-terminal .rt-button-primary:hover {
          border-color: #ff574c;
          background: #ff4438;
          color: #fff;
        }

        .mf-remote-terminal .rt-button:disabled {
          cursor: not-allowed;
          opacity: 0.55;
        }

        .mf-remote-terminal .rt-terminal-window {
          width: 100%;
          min-width: 0;
          overflow: hidden;
          border: 1px solid #33343a;
          background: var(--rt-bg);
          box-shadow: 0 15px 45px #0003;
        }

        .mf-remote-terminal .rt-titlebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          min-height: 55px;
          padding: 10px 15px;
          border-bottom: 1px solid #292a30;
          background: #151619;
        }

        .mf-remote-terminal .rt-window-dots {
          display: flex;
          flex: 0 0 auto;
          gap: 5px;
        }

        .mf-remote-terminal .rt-window-dots i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e95460;
        }

        .mf-remote-terminal .rt-window-dots i:nth-child(2) {
          background: #d8a74d;
        }

        .mf-remote-terminal .rt-window-dots i:nth-child(3) {
          background: #5bc98a;
        }

        .mf-remote-terminal .rt-title {
          flex: 1 1 110px;
          min-width: 0;
          color: #c7c8cf;
          font: 11px 'DM Mono', monospace;
          text-align: center;
        }

        .mf-remote-terminal .rt-title-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mf-remote-terminal .rt-terminal-body {
          width: 100%;
          min-width: 0;
          min-height: 320px;
          max-height: 520px;
          overflow: auto;
          padding: 20px;
          background: var(--rt-bg);
          color: #c5c8ca;
          font: 12px/1.9 'DM Mono', monospace;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .mf-remote-terminal .rt-line {
          min-height: 1.9em;
          overflow-wrap: anywhere;
        }

        .mf-remote-terminal .rt-line-accent {
          color: #f05465;
          font-weight: 500;
        }

        .mf-remote-terminal .rt-line-muted {
          color: #e6b95f;
        }

        .mf-remote-terminal .rt-prompt {
          color: #6cdd9c;
        }

        .mf-remote-terminal .rt-input-form {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #25262b;
        }

        .mf-remote-terminal .rt-input-form label {
          flex: 0 0 auto;
          color: #6cdd9c;
          white-space: nowrap;
        }

        .mf-remote-terminal .rt-input-form input {
          display: block;
          flex: 1 1 auto;
          width: 100%;
          min-width: 0;
          padding: 9px 10px;
          border: 1px solid #33343a;
          border-radius: 0;
          outline: none;
          background: #0b0c0e;
          color: #f4f4f4;
          font: 12px 'DM Mono', monospace;
        }

        .mf-remote-terminal .rt-input-form input:focus {
          border-color: var(--rt-cyan);
        }

        .mf-remote-terminal .rt-input-form button {
          flex: 0 0 auto;
          min-width: 35px;
          min-height: 35px;
          border: 1px solid #563039;
          background: #271116;
          color: #ff6674;
          font: 16px 'DM Mono', monospace;
          cursor: pointer;
        }

        .mf-remote-terminal .rt-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          padding: 11px 15px;
          border-top: 1px solid #25262b;
          color: #92939c;
          font: 9px 'DM Mono', monospace;
          letter-spacing: 0.4px;
        }

        .mf-remote-terminal .rt-footer-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .mf-remote-terminal .rt-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #d8a74d;
        }

        .mf-remote-terminal .rt-status-dot-green {
          background: #5bc98a;
          box-shadow: 0 0 10px #5bc98a50;
        }

        .mf-remote-terminal .rt-status-dot-red {
          background: #e95460;
        }

        .mf-remote-terminal .rt-quick-commands {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
        }

        .mf-remote-terminal .rt-quick-commands button {
          padding: 8px 10px;
          border: 1px solid #303138;
          background: #15161a;
          color: #b9bac2;
          font: 10px 'DM Mono', monospace;
          cursor: pointer;
        }

        .mf-remote-terminal .rt-quick-commands button:hover {
          border-color: var(--rt-cyan);
          color: var(--rt-cyan);
        }

        .mf-remote-terminal .rt-help-text {
          margin: 0;
          color: #92939c;
          font-size: 10px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        @media (max-width: 760px) {
          .mf-remote-terminal .rt-page-intro h2 {
            font-size: 22px;
          }

          .mf-remote-terminal .rt-banner {
            align-items: flex-start;
          }

          .mf-remote-terminal .rt-terminal-body {
            min-height: 280px;
            padding: 13px;
            font-size: 11px;
          }

          .mf-remote-terminal .rt-titlebar {
            gap: 9px;
            padding: 9px 10px;
          }

          .mf-remote-terminal .rt-title {
            font-size: 9px;
          }

          .mf-remote-terminal .rt-input-form {
            align-items: stretch;
            flex-wrap: wrap;
          }

          .mf-remote-terminal .rt-input-form label {
            flex: 0 0 100%;
          }

          .mf-remote-terminal .rt-input-form input {
            flex-basis: 180px;
          }

          .mf-remote-terminal .rt-footer {
            font-size: 8px;
          }
        }
      `}</style>

      <section className="mf-remote-terminal">
        <div className="rt-page-intro">
          <div>
            <div className="rt-eyebrow">
              REMOTE ACCESS / DEVICE CONSOLE
            </div>
            <h2>Device terminal</h2>
            <p>
              Restricted command console for your Raspberry Pi.
              Open the full shell when you need normal Linux commands.
            </p>
          </div>

          <span className={`rt-pill rt-pill-${connectionTone}`}>
            <span
              className={`rt-status-dot ${
                connection === 'connected'
                  ? 'rt-status-dot-green'
                  : connection === 'error'
                    ? 'rt-status-dot-red'
                    : ''
              }`}
            />
            {connectionLabel[connection]}
          </span>
        </div>

        <div className="rt-banner">
          <span className="rt-banner-icon">!</span>

          <div className="rt-banner-copy">
            <b>Need a full interactive Linux shell?</b>
            <p>
              Open a real Bash session as your existing
              <code> maskedhelp </code>
              account, with normal directory navigation and commands.
            </p>
          </div>

          <a
            className="rt-button rt-button-primary"
            href={FULL_SHELL_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Open the full interactive Linux terminal as maskedhelp"
          >
            Open Full Terminal ↗
          </a>
        </div>

        <section className="rt-terminal-window">
          <div className="rt-titlebar">
            <div className="rt-window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>

            <span className="rt-title">
              pi@maskedhelp:~ / Restricted Console
            </span>

            <div className="rt-title-actions">
              <span className={`rt-pill rt-pill-${connectionTone}`}>
                {connectionLabel[connection]}
              </span>

              <button
                type="button"
                className="rt-button"
                onClick={
                  connection === 'connected' ||
                  connection === 'connecting'
                    ? disconnect
                    : connect
                }
                disabled={connection === 'connecting' && !socketRef.current}
              >
                {connection === 'connected' ||
                connection === 'connecting'
                  ? 'Disconnect'
                  : connection === 'error'
                    ? 'Retry'
                    : 'Connect'}
              </button>
            </div>
          </div>

          <div
            className="rt-terminal-body"
            ref={outputRef}
            role="log"
            aria-live="polite"
            aria-label="Restricted terminal output"
          >
            {lines.map((line, index) => {
              const className = line.startsWith('MASKEDFLIPPER')
                ? 'rt-line rt-line-accent'
                : line.startsWith('ERROR:') ||
                    line.startsWith('Command blocked:')
                  ? 'rt-line rt-line-muted'
                  : line.startsWith('pi@maskedhelp:~$')
                    ? 'rt-line rt-prompt'
                    : 'rt-line';

              return (
                <div
                  className={className}
                  key={`${index}-${line}`}
                >
                  {line || '\u00a0'}
                </div>
              );
            })}

            <form
              className="rt-input-form"
              onSubmit={runCommand}
            >
              <label htmlFor="mf-restricted-command">
                pi@maskedhelp:~$
              </label>

              <input
                ref={inputRef}
                id="mf-restricted-command"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="status, memory, disk, hostname..."
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Restricted terminal command"
              />

              <button
                type="submit"
                aria-label="Run restricted command"
              >
                ↵
              </button>
            </form>
          </div>

          <div className="rt-footer">
            <span className="rt-footer-status">
              <span
                className={`rt-status-dot ${
                  connection === 'connected'
                    ? 'rt-status-dot-green'
                    : connection === 'error'
                      ? 'rt-status-dot-red'
                      : ''
                }`}
              />
              {connectionLabel[connection]}
            </span>

            <span>ACCESS PROTECTED · COMMAND ALLOWLIST</span>
          </div>
        </section>

        <div className="rt-quick-commands">
          {['status', 'memory', 'disk', 'hostname', 'help'].map(
            (command) => (
              <button
                type="button"
                key={command}
                onClick={() => handleQuickCommand(command)}
              >
                {command}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => {
              setLines([]);
              onLog('INFO', 'Restricted terminal display cleared');
            }}
          >
            clear display
          </button>
        </div>

        <p className="rt-help-text">
          This embedded console deliberately allows only four remote
          system commands. For unrestricted Bash, use Open Full Terminal.
          Both terminal services should remain protected by Cloudflare
          Access.
        </p>
      </section>
    </>
  );
}
