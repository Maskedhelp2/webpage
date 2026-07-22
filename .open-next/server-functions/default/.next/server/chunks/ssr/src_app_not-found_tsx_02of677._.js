module.exports=[36394,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(20238),e=a.i(72131);let f=[{text:"> MASKEDHELP_OS v2.0 — BOOTING...",delay:0},{text:"> CHECKING ROUTES...",delay:300},{text:"> ERROR 404 — ROUTE NOT MAPPED",color:"#e63329",delay:600},{text:'> TYPE "help" FOR AVAILABLE COMMANDS',color:"#ffb400",delay:900}],g={help:()=>["  AVAILABLE COMMANDS:","  ─────────────────────────────────────","  home          → go to homepage","  projects      → view all projects","  skills        → skill matrix","  experience    → work history","  team          → meet the team","  resume        → download CV","  whoami        → who is maskedhelp","  clear         → clear terminal","  ls            → list all pages","  ping          → check if site is alive","  hack          → ...","  sudo          → try it","  exit          → close terminal (joke)"],home:()=>(window.location.href="/","> REDIRECTING TO HOME..."),projects:()=>(window.location.href="/projects","> REDIRECTING TO PROJECTS..."),skills:()=>(window.location.href="/skills","> REDIRECTING TO SKILLS..."),experience:()=>(window.location.href="/experience","> REDIRECTING TO EXPERIENCE..."),team:()=>(window.location.href="/team","> REDIRECTING TO TEAM..."),resume:()=>(window.location.href="/resume","> REDIRECTING TO RESUME..."),ls:()=>["  drwxr  /home","  drwxr  /projects","  drwxr  /skills","  drwxr  /experience","  drwxr  /team","  drwxr  /resume","  drwxr  /friends","  -rw-r  /privacy","  -rw-r  /terms","  ??     /404  ← you are here"],whoami:()=>["  KARTHIK KUMAR // MASKEDHELP","  ─────────────────────────────────────","  ROLE      : FULL STACK DEV · AI · ROBOTICS","  LOCATION  : AMITY UNIVERSITY, INDIA","  STACK     : RUST · REACT · ROS2 · QMK","  STATUS    : BUILDING THINGS THAT SHOULDNT EXIST","  GITHUB    : github.com/Maskedhelp2"],ping:()=>["  PINGING MASKEDHELP.COM...","  64 bytes from maskedhelp.com: icmp_seq=1 ttl=64 time=0.4ms","  64 bytes from maskedhelp.com: icmp_seq=2 ttl=64 time=0.3ms","  64 bytes from maskedhelp.com: icmp_seq=3 ttl=64 time=0.3ms","  ─────────────────────────────────────","  SITE IS ALIVE. YOU ARE JUST LOST."],hack:()=>["  INITIATING HACK SEQUENCE...","  [████████████████████░░░░] 80%","  ...","  ACCESS DENIED.","  (nice try)"],sudo:()=>["  sudo: you are not in the sudoers file.","  This incident will be reported.","  (it wont)"],exit:()=>["  this is a webpage.","  you cannot exit.","  close the tab if you must."],clear:()=>"__CLEAR__"};a.s(["default",0,function(){let[a,h]=(0,e.useState)([]),[i,j]=(0,e.useState)(""),[k,l]=(0,e.useState)(!1),[m,n]=(0,e.useState)([]),[o,p]=(0,e.useState)(-1),q=(0,e.useRef)(null),r=(0,e.useRef)(null);return(0,e.useEffect)(()=>{let a=[];return f.forEach(({text:b,color:c,delay:d})=>{a.push(setTimeout(()=>{h(a=>[...a,{text:b,color:c}]),900===d&&setTimeout(()=>l(!0),300)},d))}),()=>a.forEach(clearTimeout)},[]),(0,e.useEffect)(()=>{r.current?.scrollIntoView({behavior:"smooth"})},[a]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
        .nf-wrap {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          position: relative; z-index: 1; padding: 100px 24px 60px;
        }
        /* 404 above terminal */
        .nf-code {
          font-family: var(--display);
          font-size: clamp(5rem, 22vw, 14rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 2px rgba(230,51,41,0.35);
          line-height: 0.85;
          letter-spacing: -6px;
          user-select: none;
          pointer-events: none;
          position: relative; z-index: 1;
          margin-bottom: 28px;
          animation: nfGlitch 4s infinite;
          text-shadow:
            0 0 80px rgba(230,51,41,0.08),
            0 0 160px rgba(230,51,41,0.04);
        }
        @keyframes nfGlitch {
          0%,88%,100%{ transform:none; }
          90%{ transform:translate(-4px,0); -webkit-text-stroke-color:rgba(230,51,41,0.6); }
          92%{ transform:translate(4px,0);  -webkit-text-stroke-color:rgba(230,51,41,0.2); }
          94%{ transform:none; }
        }
        .nf-terminal {
          width: min(680px, 92vw); position: relative; z-index: 1;
          border: 1px solid rgba(230,51,41,0.25);
          background: rgba(2,2,2,0.97);
          backdrop-filter: blur(8px);
          box-shadow: 0 0 60px rgba(230,51,41,0.05);
        }
        .nf-terminal::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(230,51,41,0.5),transparent);
        }
        .nf-title-bar {
          display:flex; align-items:center; gap:8px;
          padding:12px 16px; border-bottom:1px solid #0d0d0d;
          background:rgba(255,255,255,0.015);
        }
        .nf-dot { width:10px; height:10px; border-radius:50%; }
        .nf-title-text {
          font-family:var(--mono); font-size:11px;
          color:var(--text-dim); letter-spacing:3px; margin-left:8px;
        }
        .nf-output {
          padding:20px 20px 8px; max-height:320px; overflow-y:auto;
          scrollbar-width:thin; scrollbar-color:rgba(230,51,41,0.3) transparent;
        }
        .nf-output::-webkit-scrollbar{width:3px;}
        .nf-output::-webkit-scrollbar-thumb{background:rgba(230,51,41,0.3);}
        .nf-out-line {
          font-family:var(--mono); font-size:clamp(10px,2vw,12px);
          line-height:1.9; letter-spacing:0.5px; white-space:pre-wrap; word-break:break-all;
        }
        .nf-input-row {
          display:flex; align-items:center; gap:8px;
          padding:12px 20px 14px; border-top:1px solid #0d0d0d;
        }
        .nf-prompt { font-family:var(--mono); font-size:13px; color:var(--accent); flex-shrink:0; }
        .nf-input {
          flex:1; background:none; border:none; outline:none;
          font-family:var(--mono); font-size:13px;
          color:#fff; caret-color:var(--accent); letter-spacing:1px;
        }
        .nf-input::placeholder{color:#2a2a2a;}
        .nf-hint {
          font-family:var(--mono); font-size:10px; color:#222;
          letter-spacing:2px; text-align:center; padding:0 20px 14px;
        }
        .nf-nav { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin-top:24px; position:relative; z-index:1; }
        .nf-nav-btn {
          font-family:var(--mono); font-size:10px; letter-spacing:2px;
          padding:10px 20px; border:1px solid #1a1a1a; color:var(--text-dim);
          text-decoration:none; transition:all 0.2s;
        }
        .nf-nav-btn:hover{color:var(--accent);border-color:var(--accent);}
        @media(max-width:480px){
          .nf-output{max-height:220px;}
          .nf-nav{gap:8px;}
          .nf-nav-btn{font-size:9px;padding:8px 12px;}
        }
      `}),(0,b.jsx)(d.default,{}),(0,b.jsxs)("main",{className:"nf-wrap",onClick:function(){q.current?.focus()},children:[(0,b.jsx)("div",{className:"nf-code",children:"404"}),(0,b.jsxs)("div",{className:"nf-terminal",children:[(0,b.jsxs)("div",{className:"nf-title-bar",children:[(0,b.jsx)("div",{className:"nf-dot",style:{background:"#e63329"}}),(0,b.jsx)("div",{className:"nf-dot",style:{background:"#ffb400"}}),(0,b.jsx)("div",{className:"nf-dot",style:{background:"#00d2d2"}}),(0,b.jsx)("span",{className:"nf-title-text",children:"MASKEDHELP_OS — 404.sh"})]}),(0,b.jsxs)("div",{className:"nf-output",children:[a.map((a,c)=>(0,b.jsx)("div",{className:"nf-out-line",style:{color:a.color??(a.isInput?"#00d2d2":"#555")},children:a.text},c)),(0,b.jsx)("div",{ref:r})]}),k&&(0,b.jsxs)("div",{className:"nf-input-row",children:[(0,b.jsx)("span",{className:"nf-prompt",children:"$"}),(0,b.jsx)("input",{ref:q,className:"nf-input",value:i,onChange:a=>j(a.target.value),onKeyDown:function(a){if("Enter"===a.key)!function(a){let b=a.trim().toLowerCase();if(!b)return;if(n(a=>[b,...a].slice(0,20)),p(-1),h(b=>[...b,{text:"$ "+a,color:"#00d2d2",isInput:!0}]),"clear"===b)return h([]);let c=g[b];if(!c)return h(a=>[...a,{text:"  command not found: "+b,color:"#e63329"},{text:'  type "help" for available commands',color:"#444"}]);let d=c();"__CLEAR__"===d?h([]):"string"==typeof d?h(a=>[...a,{text:d}]):h(a=>[...a,...d.map(a=>({text:a}))])}(i),j("");else if("ArrowUp"===a.key){a.preventDefault();let b=Math.min(o+1,m.length-1);p(b),j(m[b]??"")}else if("ArrowDown"===a.key){a.preventDefault();let b=Math.max(o-1,-1);p(b),j(-1===b?"":m[b]??"")}else if("Tab"===a.key){a.preventDefault();let b=Object.keys(g).find(a=>a.startsWith(i.toLowerCase()));b&&j(b)}},placeholder:"type a command...",autoFocus:!0,autoComplete:"off",autoCorrect:"off",autoCapitalize:"off",spellCheck:!1})]}),(0,b.jsx)("div",{className:"nf-hint",children:'TAB autocomplete · ↑↓ history · "help" to start'})]}),(0,b.jsxs)("div",{className:"nf-nav",children:[(0,b.jsx)(c.default,{href:"/",className:"nf-nav-btn",children:"HOME"}),(0,b.jsx)(c.default,{href:"/projects",className:"nf-nav-btn",children:"PROJECTS"}),(0,b.jsx)(c.default,{href:"/skills",className:"nf-nav-btn",children:"SKILLS"}),(0,b.jsx)(c.default,{href:"/experience",className:"nf-nav-btn",children:"EXPERIENCE"})]})]})]})}])}];

//# sourceMappingURL=src_app_not-found_tsx_02of677._.js.map