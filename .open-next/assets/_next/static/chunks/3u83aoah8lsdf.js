(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,13642,e=>{"use strict";var t=e.i(43476),a=e.i(22016),r=e.i(57688),i=e.i(85149);let o=[{label:"GITHUB",href:"https://github.com/Maskedhelp2",icon:(0,t.jsx)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor",children:(0,t.jsx)("path",{d:"M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"})})},{label:"LINKEDIN",href:"https://linkedin.com/in/karthik-kumar-7319b6332",icon:(0,t.jsx)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor",children:(0,t.jsx)("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})})},{label:"IEEE",href:"https://www.ieee.org",icon:(0,t.jsx)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"currentColor",children:(0,t.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"})})},{label:"EMAIL",href:"mailto:masked@maskedhelp.com",icon:(0,t.jsxs)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("rect",{x:"2",y:"4",width:"20",height:"16",rx:"2"}),(0,t.jsx)("path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"})]})}],n=[{label:"FRIENDS",href:"/friends"},{label:"PROJECTS",href:"/projects"},{label:"SKILLS",href:"/skills"},{label:"PRIVACY POLICY",href:"/privacy"},{label:"TERMS",href:"/terms"},{label:"EXPERIENCE",href:"/experience"}];e.s(["default",0,function(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:`
        .footer-root {
          position: relative;
          z-index: 1;
          border-top: 1px solid #1a1a1a;
          background: rgba(5,5,5,0.98);
        }

        /* ── Big CTA band ── */
        .footer-cta {
          border-bottom: 1px solid #1a1a1a;
          padding: 72px 40px;
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }
        .footer-cta-heading {
          font-family: var(--display);
          font-size: clamp(3rem, 7.5vw, 6rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: 0.04em;
          line-height: 0.92;
          margin-bottom: 20px;
        }
        .footer-cta-heading span { color: #e63329; }
        .footer-cta-sub {
          font-family: var(--mono);
          font-size: 12px;
          color: #999;
          letter-spacing: 0.2em;
        }
        .footer-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--mono);
          font-size: 13px;
          letter-spacing: 0.18em;
          color: #fff;
          border: 1px solid #e63329;
          padding: 18px 36px;
          background: transparent;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s, box-shadow 0.2s;
          flex-shrink: 0;
        }
        .footer-cta-btn:hover {
          background: rgba(230,51,41,0.1);
          box-shadow: 0 0 24px rgba(230,51,41,0.2);
        }
        .footer-cta-btn svg { transition: transform 0.2s; }
        .footer-cta-btn:hover svg { transform: translateX(4px); }

        /* ── Email display strip ── */
        .footer-email-strip {
          border-bottom: 1px solid #1a1a1a;
          padding: 20px 40px;
          max-width: 960px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .footer-email-label {
          font-family: var(--mono);
          font-size: 11px;
          color: #e63329;
          letter-spacing: 0.2em;
          flex-shrink: 0;
        }
        .footer-email-value {
          font-family: var(--mono);
          font-size: 16px;
          color: #aaa;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-email-value:hover { color: #e63329; }
        .footer-email-sep {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #1a1a1a, transparent);
        }

        /* ── Main 4-col grid ── */
        .footer-inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 56px 40px 32px;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid #1a1a1a;
          margin-bottom: 32px;
        }

        .footer-brand-name {
          font-family: var(--display);
          font-size: 20px;
          font-weight: 900;
          color: #fff;
          letter-spacing: 3px;
          margin-bottom: 12px;
        }
        .footer-brand-tagline {
          font-family: var(--mono);
          font-size: 10px;
          color: #999;
          letter-spacing: 2px;
          line-height: 1.9;
          margin-bottom: 24px;
        }

        .footer-socials { display: flex; gap: 10px; flex-wrap: wrap; }
        .footer-social-btn {
          width: 38px; height: 38px;
          border: 1px solid #3a3a3a;
          display: flex; align-items: center; justify-content: center;
          color: #999;
          transition: all 0.2s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .footer-social-btn:hover {
          border-color: #e63329;
          color: #e63329;
          box-shadow: 0 0 12px rgba(230,51,41,0.25);
        }

        .footer-col-label {
          font-family: var(--mono);
          font-size: 10px;
          color: #e63329;
          letter-spacing: 4px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .footer-col-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(230,51,41,0.3), transparent);
        }

        .footer-nav-link {
          display: block;
          font-family: var(--mono);
          font-size: 12px;
          color: #999;
          letter-spacing: 2px;
          text-decoration: none;
          margin-bottom: 14px;
          transition: color 0.2s, letter-spacing 0.2s;
        }
        .footer-nav-link:hover { color: #e63329; letter-spacing: 3px; }

        /* Status box */
        .footer-status-box {
          border: 1px solid rgba(230,51,41,0.15);
          background: rgba(230,51,41,0.03);
          padding: 20px;
          position: relative;
        }
        .footer-status-box::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #e63329, transparent);
          opacity: 0.4;
        }
        .footer-status-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #00d2d2;
          box-shadow: 0 0 8px #00d2d2;
          display: inline-block;
          margin-right: 8px;
          animation: fpulse 2s infinite;
        }
        @keyframes fpulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .footer-status-row {
          font-family: var(--mono);
          font-size: 10px;
          color: #999;
          letter-spacing: 2px;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
        }
        .footer-status-val {
          font-family: var(--mono);
          font-size: 12px;
          color: #e0e0e0;
          letter-spacing: 1px;
          margin-bottom: 14px;
        }
        .footer-status-divider {
          height: 1px;
          background: #151515;
          margin: 12px 0;
        }

        /* Tech tags in status col */
        .footer-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .footer-tech-tag {
          font-family: var(--mono);
          font-size: 9px;
          color: #e63329;
          border: 1px solid rgba(230,51,41,0.2);
          padding: 3px 8px;
          letter-spacing: 0.1em;
        }

        /* Bottom bar */
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-copy {
          font-family: var(--mono);
          font-size: 10px;
          color: #888;
          letter-spacing: 2px;
        }
        .footer-made {
          font-family: var(--mono);
          font-size: 10px;
          color: #888;
          letter-spacing: 2px;
        }
        .footer-made span { color: #e63329; }

        /* Version badge */
        .footer-version {
          font-family: var(--mono);
          font-size: 9px;
          color: #222;
          border: 1px solid #1a1a1a;
          padding: 3px 10px;
          letter-spacing: 0.15em;
        }

        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer-cta { padding: 48px 24px; }
          .footer-email-strip { padding: 16px 24px; }
          .footer-inner { padding: 40px 24px 24px; }
        }
        @media (max-width: 600px) {
          .footer-top { grid-template-columns: 1fr; gap: 28px; }
          .footer-cta { padding: 40px 16px; flex-direction: column; align-items: flex-start; }
          .footer-email-strip { padding: 14px 16px; }
          .footer-inner { padding: 32px 16px 20px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `}),(0,t.jsxs)("footer",{className:"footer-root",children:[(0,t.jsxs)("div",{className:"footer-cta",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"footer-cta-heading",children:["LET'S",(0,t.jsx)("span",{children:"_"}),"BUILD",(0,t.jsx)("br",{}),"SOMETHING."]}),(0,t.jsx)("p",{className:"footer-cta-sub",children:"OPEN TO COLLABS · INTERNSHIPS · PROJECTS"})]}),(0,t.jsxs)("a",{href:"mailto:masked@maskedhelp.com",className:"footer-cta-btn",children:["GET IN TOUCH",(0,t.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,t.jsx)("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})]}),(0,t.jsxs)("div",{className:"footer-email-strip",children:[(0,t.jsx)("span",{className:"footer-email-label",children:"// CONTACT"}),(0,t.jsx)("a",{href:"mailto:masked@maskedhelp.com",className:"footer-email-value",children:"masked@maskedhelp.com"}),(0,t.jsx)("div",{className:"footer-email-sep"})]}),(0,t.jsxs)("div",{className:"footer-inner",children:[(0,t.jsxs)("div",{className:"footer-top",children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"},children:[(0,t.jsx)(r.default,{src:"/logo.webp",alt:"MaskedHelp",width:32,height:32,style:{objectFit:"contain"}}),(0,t.jsxs)("div",{className:"footer-brand-name",children:["MASKED",(0,t.jsx)("span",{style:{color:"#e63329"},children:"HELP"})]})]}),(0,t.jsxs)("p",{className:"footer-brand-tagline",children:["WE BUILD WHAT WE",(0,t.jsx)("br",{}),"WISH EXISTED.",(0,t.jsx)("br",{}),"AMITY UNIVERSITY · 2026"]}),(0,t.jsx)("div",{className:"footer-socials",children:o.map(e=>(0,t.jsx)("a",{href:e.href,target:"_blank",rel:"noopener noreferrer",className:"footer-social-btn","aria-label":e.label,children:e.icon},e.label))})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"footer-col-label",children:"// NAVIGATE"}),n.map(e=>(0,t.jsx)(a.default,{href:e.href,className:"footer-nav-link",children:e.label},e.href))]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"footer-col-label",children:"// CONNECT"}),(0,t.jsx)("a",{href:"https://github.com/Maskedhelp2",target:"_blank",rel:"noopener noreferrer",className:"footer-nav-link",children:"GITHUB ↗"}),(0,t.jsx)("a",{href:"https://linkedin.com/in/karthik-kumar-7319b6332",target:"_blank",rel:"noopener noreferrer",className:"footer-nav-link",children:"LINKEDIN ↗"}),(0,t.jsx)("a",{href:"mailto:masked@maskedhelp.com",className:"footer-nav-link",children:"EMAIL ↗"}),(0,t.jsx)("a",{href:"https://www.ieee.org",target:"_blank",rel:"noopener noreferrer",className:"footer-nav-link",children:"IEEE ↗"}),(0,t.jsxs)("div",{style:{marginTop:"20px"},children:[(0,t.jsx)("div",{className:"footer-col-label",children:"// BASED IN"}),(0,t.jsxs)("p",{style:{fontFamily:"var(--mono)",fontSize:11,color:"#aaa",letterSpacing:"0.1em",lineHeight:1.7},children:["AMITY UNIVERSITY",(0,t.jsx)("br",{}),"NOIDA, INDIA"]})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:"footer-col-label",children:"// STATUS"}),(0,t.jsxs)("div",{className:"footer-status-box",children:[(0,t.jsxs)("div",{className:"footer-status-row",children:[(0,t.jsx)("span",{className:"footer-status-dot"}),"SYSTEMS ONLINE"]}),(0,t.jsx)("div",{className:"footer-status-divider"}),(0,t.jsx)("div",{className:"footer-status-row",children:"AVAILABILITY"}),(0,t.jsx)("div",{className:"footer-status-val",children:"OPEN TO WORK"}),(0,t.jsx)("div",{className:"footer-status-row",children:"OPEN TO"}),(0,t.jsx)("div",{className:"footer-status-val",children:"COLLABS · INTERNSHIPS"}),(0,t.jsx)("div",{className:"footer-status-divider"}),(0,t.jsx)("div",{className:"footer-status-row",style:{marginBottom:"8px"},children:"STACK"}),(0,t.jsx)("div",{className:"footer-tech-tags",children:["NEXT.JS","REACT","PYTHON","ROS2","RASPBERRY PI","AI"].map(e=>(0,t.jsx)("span",{className:"footer-tech-tag",children:e},e))})]})]})]}),(0,t.jsxs)("div",{className:"footer-bottom",children:[(0,t.jsx)("span",{className:"footer-copy",children:i.SITE_FOOTER}),(0,t.jsx)("span",{className:"footer-version",children:"v2.0 · 2026"}),(0,t.jsxs)("span",{className:"footer-made",children:["BUILT WITH ",(0,t.jsx)("span",{children:"♥"})," AND CHAOS"]})]})]})]})]})}])},94536,e=>{"use strict";var t=e.i(71645);let a={kinginyellow:function(){let e=i("egg-kiy");e.addEventListener("click",t=>{"kiy-dismiss"===t.target.id?r("egg-kiy"):(e.classList.add("jump-snap"),setTimeout(()=>e.classList.remove("jump-snap"),150))});let t=[{c:"xl",top:"50%",left:"50%",tx:-50,ty:-50,rot:0,z:20,bd:35e3,blur:0,op:1,zalgoed:!0},{c:"lg",top:"12%",left:"78%",tx:0,ty:0,rot:25,z:12},{c:"lg",top:"75%",left:"18%",tx:0,ty:0,rot:-35,z:13},{c:"lg",top:"82%",left:"85%",tx:0,ty:0,rot:55,z:14},{c:"md",top:"10%",left:"12%",tx:0,ty:0,rot:-15,z:11},{c:"md",top:"35%",left:"5%",tx:0,ty:0,rot:-45,z:9},{c:"md",top:"55%",left:"92%",tx:0,ty:0,rot:38,z:10},{c:"md",top:"22%",left:"45%",tx:0,ty:0,rot:8,z:15},{c:"sm",top:"92%",left:"45%",tx:-50,ty:0,rot:-5,z:8},{c:"xs",top:"82%",left:"12%",tx:0,ty:0,rot:135,z:5,bd:7100,blur:1.5,op:.5,zalgoed:!1}].map((e,t)=>{let a="xl"===e.c?18:"lg"===e.c?12:8,r=Array.from({length:a},(t,r)=>{let i=360/a*r+(40*Math.random()-20),o=15+25*Math.random(),n="xl"===e.c&&Math.random()>.5?2:1,s=3*Math.random(),l=Math.random()>.3?`<div class="kiy-vein-branch" style="--br: -${15+25*Math.random()}deg; --bh: ${40+40*Math.random()}%;"></div>`:"",d=Math.random()>.3?`<div class="kiy-vein-branch" style="--br: ${15+25*Math.random()}deg; --bh: ${40+40*Math.random()}%;"></div>`:"";return`
      <div class="kiy-vein-root" style="transform: rotate(${i}deg); --vt:${n}px; --vl:${o}%; --vd:${s}s;">
        ${l}
        ${d}
      </div>`}).join("");"xl"===e.c?[0,35,65].map((e,t)=>`<div class="kiy-tear" style="--td:${3.4+.8*t}s;--tdd:${.7*t}s;left:${e}%"></div>`).join(""):e.c;let i="xl"===e.c;return`<div class="kiy-eye-unit kiy-eye-${e.c}" data-idx="${t}"
      style="top:${e.top};left:${e.left};transform:translate(${e.tx}%,${e.ty}%) rotate(${e.rot}deg);z-index:${e.z};
             --bd:${i?35e3:2e3+5e3*Math.random()}ms; --bld:${5*Math.random()}s;
             --fd:${6+4*Math.random()}s; --fdd:${2*Math.random()}s; --fy:${6+6*Math.random()}px;
             --td:${5+3*Math.random()}s; --tdd:${2*Math.random()}s; --tx:${(Math.random()-.5)*4}px; --ty:${(Math.random()-.5)*3}px">
      <div class="kiy-glow"></div>
      <div class="kiy-swell"></div>
      <div class="kiy-eye-shape">
        ${r}
        <div class="kiy-iris"></div>
        <div class="kiy-pupil"></div>
        <div class="kiy-gloss"></div>
        <div class="kiy-lid-top"></div>
        <div class="kiy-lid-bot"></div>
      </div>
    </div>`}).join("\n");e.innerHTML=`
  <style>
    #egg-kiy {
      background: #000; overflow-y: auto; overflow-x: hidden; cursor: crosshair;
      position: fixed; inset: 0;
      font-family: 'Share Tech Mono', monospace;
      animation: kiy-screen-glitch 11s infinite 4s;
    }
    
    /* Jump snap triggered by click */
    #egg-kiy.jump-snap { animation: snap-scare 0.15s ease-out forwards !important; }
    @keyframes snap-scare {
      0% { filter: invert(1) contrast(3) hue-rotate(90deg); transform: scale(1.05) translate(10px, -10px); }
      50% { filter: invert(0) contrast(5) brightness(2); transform: scale(0.95) translate(-10px, 10px) skewX(10deg); }
      100% { filter: none; transform: none; }
    }

    @keyframes kiy-screen-glitch {
      0%,93%,100% { filter: none; transform: none; }
      94% { filter: brightness(0.1) contrast(4) invert(0.2); transform: translateY(-4px) skewX(-2deg) scale(1.01); }
      95% { filter: brightness(2.5) contrast(3) hue-rotate(80deg); transform: translateY(6px) scale(0.99); }
      96% { filter: brightness(0.5) saturate(4); transform: translateX(-3px); }
      97% { filter: none; transform: none; }
    }

    #kiy-flash {
      position: fixed; inset: 0; z-index: 999; pointer-events: none;
      display: flex; align-items: center; justify-content: center;
      opacity: 0; background: #fff; mix-blend-mode: difference;
    }
    #kiy-subliminal-text {
      font-family: 'Orbitron', sans-serif; font-size: 8vw; font-weight: 900;
      color: #000; text-align: center; line-height: 1; letter-spacing: -5px;
      transform: scale(1.5) rotate(-5deg);
    }
    #kiy-flash.fire { animation: kiy-strobe 0.18s cubic-bezier(0.1, 1, 0.1, 1) forwards; }
    @keyframes kiy-strobe {
      0%  { opacity: 1; filter: invert(1); transform: scale(1.05) rotate(1deg); }
      30% { opacity: 0.8; filter: none; transform: scale(0.95) rotate(-2deg) skewX(20deg); }
      60% { opacity: 0.9; filter: invert(1) hue-rotate(180deg); transform: scale(1.1) rotate(0deg); }
      100%{ opacity: 0; }
    }

    #kiy-noise {
      position: fixed; inset: 0; z-index: 2; opacity: 0.15; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      animation: noise-crawl 0.03s steps(2) infinite;
    }
    @keyframes noise-crawl { 0%{background-position:0 0} 100%{background-position:100px 100px} }

    #kiy-scan {
      position: fixed; inset: 0; z-index: 3; pointer-events: none;
      background: repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.6) 1px, rgba(0,0,0,0.6) 3px);
    }

    #kiy-vignette {
      position: fixed; inset: 0; z-index: 4; pointer-events: none;
      background: radial-gradient(circle at center, transparent 10%, rgba(0,0,0,0.98) 90%);
    }

    #kiy-eyes-wrap { position: fixed; inset: 0; z-index: 10; perspective: 1000px; pointer-events: none; }
    .kiy-eye-unit {
      position: absolute; pointer-events: none;
      animation: kiy-float var(--fd) ease-in-out infinite var(--fdd),
                 kiy-twitch var(--td) ease-in-out infinite var(--tdd);
      will-change: transform, filter;
    }
    /* Click jump-snap override */
    #egg-kiy.jump-snap .kiy-eye-unit { animation: none !important; }
    #egg-kiy.jump-snap .kiy-iris { transform: translate(calc(-50% + var(--px,0px)*1.5), calc(-50% + var(--py,0px)*1.5)) scale(1.1) !important; transition: none !important; }
    #egg-kiy.jump-snap .kiy-pupil { transform: translate(calc(-50% + var(--px,0px)*1.8), calc(-50% + var(--py,0px)*1.8)) scale(0.4) !important; transition: none !important; }

    @keyframes kiy-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(var(--fy))} }
    @keyframes kiy-twitch {
      0%,92%,100% { filter: none; }
      94% { transform: translateX(calc(var(--tx)*3)) translateY(var(--ty)) scale(1.08); filter: brightness(1.5) contrast(1.2); }
      96% { transform: translateX(calc(var(--tx)*-2.5)) scale(0.95) skewX(6deg); filter: brightness(0.6); }
    }

    .kiy-eye-shape {
      position: relative; border-radius: 50%; overflow: hidden;
      background: radial-gradient(ellipse 85% 92% at 50% 44%,
        rgba(255,240,100,0.95) 0%, rgba(220,190,50,0.9) 30%,
        rgba(150,110,20,0.85) 60%, rgba(50,20,5,0.9) 100%);
      /* Bloodshot rim effect */
      box-shadow: inset 0 0 25px 10px rgba(180,20,0,0.7), inset 0 0 40px 15px rgba(0,0,0,0.9), 0 0 60px rgba(160,80,0,0.5);
    }

    .kiy-iris {
      position: absolute; top: 50%; left: 50%; border-radius: 50%; z-index: 5;
      transform: translate(calc(-50% + var(--px,0px)), calc(-50% + var(--py,0px)));
      background: radial-gradient(circle,
        rgba(255,255,150,1) 0%, rgba(240,160,10,1) 20%,
        rgba(150,80,0,1) 50%, rgba(40,10,0,1) 80%, #000 100%);
      box-shadow: inset 0 0 15px 5px rgba(0,0,0,0.9), 0 0 10px 5px rgba(0,0,0,0.95);
      transition: transform 0.1s cubic-bezier(0.1, 0.9, 0.2, 1);
    }

    .kiy-pupil {
      position: absolute; top: 50%; left: 50%; border-radius: 50%; z-index: 6;
      /* Dilation via --dil var */
      transform: translate(calc(-50% + var(--px,0px)*1.2), calc(-50% + var(--py,0px)*1.2)) scale(var(--dil, 1));
      background: #000;
      box-shadow: 0 0 15px 8px #000, inset 0 2px 5px rgba(255,255,255,0.15);
      animation: kiy-pupil-spasm var(--bd) cubic-bezier(0.4,0,0.6,1) infinite;
      transition: transform 0.1s cubic-bezier(0.1, 0.9, 0.2, 1);
    }
    @keyframes kiy-pupil-spasm {
      0%  { width:16%; height:66%; border-radius:48% }
      12% { width:5%;  height:72%; border-radius:40% }
      26% { width:4%;  height:76%; border-radius:38% }
      38% { width:10%; height:62%; border-radius:42% }
      52% { width:28%; height:50%; border-radius:50% }
      68% { width:7%;  height:68%; border-radius:44% }
      84% { width:20%; height:58%; border-radius:48% }
      100%{ width:16%; height:66%; border-radius:48% }
    }

    /* ── ORGANIC NERVES/VEINS ── */
    .kiy-vein-root {
      position: absolute;
      top: -2%; left: 50%; /* Start at the outer rim */
      width: var(--vt); height: var(--vl);
      background: rgba(180, 20, 10, 0.65);
      transform-origin: top center; /* Rotate around the rim */
      border-radius: 40px;
      filter: drop-shadow(0 0 2px rgba(200,0,0,0.5));
      animation: vein-pulse 3s ease-in-out infinite var(--vd);
      z-index: 2; pointer-events: none;
    }
    .kiy-vein-branch {
      position: absolute;
      top: 70%; left: 0;
      width: calc(var(--vt) * 0.7); height: var(--bh);
      background: rgba(180, 20, 10, 0.55);
      transform-origin: top center;
      transform: rotate(var(--br));
      border-radius: 40px;
    }
    @keyframes vein-pulse { 0%,100%{opacity:0.6;filter:blur(0.2px)} 50%{opacity:0.95;filter:blur(0.5px)} }

    /* Corneal gloss */
    .kiy-gloss {
      position: absolute; inset: 0; border-radius: 50%; z-index: 7; pointer-events: none;
      background: radial-gradient(ellipse 40% 30% at 35% 25%, rgba(255,255,255,0.6) 0%, transparent 60%);
      animation: gloss-shift 5s ease-in-out infinite;
    }
    @keyframes gloss-shift {
      0%,100%{ transform: translate(0,0) scale(1); }
      50%    { transform: translate(2px,2px) scale(0.95); }
    }

    .kiy-swell {
      position: absolute; inset: -12px; border-radius: 50%; z-index: -1; pointer-events: none;
      background: radial-gradient(circle, rgba(180,50,0,0.4) 0%, transparent 70%);
      animation: swell 4s ease-in-out infinite;
    }
    @keyframes swell { 0%,100%{transform:scale(0.9);opacity:0.5} 50%{transform:scale(1.1);opacity:1} }

    .kiy-lid-top, .kiy-lid-bot {
      position: absolute; left: -5px; right: -5px; background: #010000; z-index: 8; pointer-events: none;
      animation-delay: var(--bld); animation-duration: var(--bd);
    }
    .kiy-lid-top {
      top: -5px; border-radius: 70% 70% 20% 20% / 90% 90% 10% 10%;
      box-shadow: 0 5px 20px 8px rgba(0,0,0,0.98), inset 0 2px 8px rgba(100,30,0,0.5);
      animation-name: blink-top;
    }
    .kiy-lid-bot {
      bottom: -5px; border-radius: 20% 20% 70% 70% / 10% 10% 90% 90%;
      box-shadow: 0 -5px 20px 8px rgba(0,0,0,0.98), inset 0 -2px 8px rgba(100,30,0,0.5);
      animation-name: blink-bot;
    }
    @keyframes blink-top { 0%,85%,100%{height:0%} 88%{height:60%} 92%{height:10%} 95%{height:40%} 98%{height:0%} }
    @keyframes blink-bot { 0%,85%,100%{height:0%} 88%{height:60%} 92%{height:10%} 95%{height:40%} 98%{height:0%} }

    /* SIZE VARIANTS */
    .kiy-eye-xs .kiy-eye-shape { width:clamp(14px,1.8vw,22px); height:clamp(14px,1.8vw,22px) }
    .kiy-eye-xs .kiy-iris      { width:52%; height:52% }
    .kiy-eye-sm .kiy-eye-shape { width:clamp(22px,3vw,40px); height:clamp(22px,3vw,40px) }
    .kiy-eye-sm .kiy-iris      { width:55%; height:55% }
    .kiy-eye-md .kiy-eye-shape { width:clamp(36px,5vw,65px); height:clamp(36px,5vw,65px) }
    .kiy-eye-md .kiy-iris      { width:57%; height:57% }
    .kiy-eye-lg .kiy-eye-shape { width:clamp(55px,7.5vw,95px); height:clamp(55px,7.5vw,95px) }
    .kiy-eye-lg .kiy-iris      { width:60%; height:60% }
    .kiy-eye-xl .kiy-eye-shape { width:clamp(100px,13.5vw,175px); height:clamp(100px,13.5vw,175px) }
    .kiy-eye-xl .kiy-iris      { width:65%; height:65% }

    /* ── TEXT LAYER (FIXED TO AVOID OVERFLOW CLIPPING) ── */
    #kiy-content {
      position: absolute; inset: 0; z-index: 20;
      display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
      pointer-events: none; padding: max(20px, 5vh) 5vw; box-sizing: border-box; 
      overflow-y: auto; overflow-x: hidden;
    }
    /* Inner wrapper safely auto-margins to prevent top-clipping on small screens */
    .kiy-inner-wrap {
      margin: auto 0;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      width: 100%;
    }

    #kiy-title {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(2.5rem, 12vw, 6.5rem);
      font-weight: 900; color: #ffb300; letter-spacing: -2px;
      text-align: center; line-height: 0.9;
      width: 100%; word-wrap: break-word;
      text-shadow: 0 0 25px rgba(255,178,0,0.95), 0 0 60px rgba(255,60,0,0.7), 0 0 120px rgba(255,0,0,0.3);
      animation: title-in 1.2s 1s cubic-bezier(0.16,1,0.3,1) both,
                 title-glitch 3.5s 3s infinite;
    }
    @keyframes title-in { from{opacity:0;filter:blur(18px);letter-spacing:0.5em} to{opacity:1;filter:blur(0);letter-spacing:-2px} }
    @keyframes title-glitch {
      0%,92%,100%{transform:none;filter:none;opacity:1}
      93%{transform:translate(-15px,10px) skewX(-30deg) scale(1.1);filter:invert(1) hue-rotate(180deg);opacity:0.9}
      95%{transform:translate(20px,-15px) skewX(25deg);filter:brightness(5) contrast(8);opacity:1}
      97%{transform:translate(-5px,20px);filter:none;opacity:0}
    }

    #kiy-timer {
      font-size: clamp(10px,1.5vw,14px); color: rgba(255,50,0,0.8);
      letter-spacing: 6px; margin: 15px 0 25px;
      animation: kiy-fade 1s 1.5s both; font-weight: bold; text-align: center;
    }

    #kiy-box {
      border: 1px solid rgba(255,0,0,0.3); border-top: 3px solid rgba(255,0,0,0.8);
      padding: clamp(20px,4vw,40px); max-width: min(650px,90vw); text-align: center;
      background: rgba(5,0,0,0.95);
      box-shadow: 0 0 80px rgba(255,0,0,0.2), inset 0 0 50px rgba(0,0,0,1);
      animation: kiy-fade 1s 2s both;
    }
    .kiy-txt {
      font-size: clamp(10px,1.5vw,13px); color: rgba(220,150,0,0.7);
      line-height: 2.5; letter-spacing: 0.25em; text-transform: uppercase;
    }
    .kiy-txt .hl { color: #ff1100; font-weight: 900; animation: pulse-red 1.5s infinite; text-shadow: 0 0 10px rgba(255,0,0,0.8); }
    .kiy-txt .wht { color: rgba(255,255,255,0.7); }

    .kiy-txt .quote {
      display: block; margin-top: 15px; padding-left: 15px; text-align: left;
      border-left: 3px solid rgba(255,50,0,0.6);
      color: rgba(255,180,0,0.9); font-style: italic; font-weight: bold;
      animation: quote-flicker 2.5s ease-in-out infinite;
    }
    @keyframes quote-flicker { 0%,100%{opacity:1} 3%{opacity:0.3} 6%{opacity:1} 12%{opacity:0.5} 18%{opacity:1} }

    #kiy-dismiss {
      pointer-events: all; margin-top: 35px;
      font-size: 12px; color: rgba(255,255,255,0.3); letter-spacing: 12px;
      text-transform: uppercase; cursor: pointer; padding: 25px 40px;
      transition: all 0.2s; animation: kiy-fade 1s 4s both; font-weight: bold;
      text-align: center;
    }
    #kiy-dismiss:hover { color: #fff; letter-spacing: 16px; text-shadow: 0 0 20px #f00, 0 0 40px #f00; background: rgba(255,0,0,0.15); box-shadow: inset 0 0 20px rgba(255,0,0,0.5); }

    @keyframes kiy-fade { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none} }
  </style>

  <div id="kiy-flash"><div id="kiy-subliminal-text"></div></div>
  <div id="kiy-noise"></div>
  <div id="kiy-scan"></div>
  <div id="kiy-vignette"></div>

  <div id="kiy-eyes-wrap">
    ${t}
  </div>

  <div id="kiy-content">
    <div class="kiy-inner-wrap">
      <div id="kiy-title">CARCOSA<br>SEES<br>YOU</div>
      <div id="kiy-timer">[ EXPOSURE TIME: 00:00 — DO NOT BLINK ]</div>
      <div id="kiy-box">
        <div class="kiy-txt">
          it has been counting the seconds since you arrived.<br>
          <span class="hl">every erratic movement agitates them.</span><br>
          <span class="wht">— they are drawn to your cursor —</span><br>
          <br>
          <span style="font-size:9px;opacity:0.6;letter-spacing:4px;">if you click, they will all look at you at once.</span>
          <span class="quote">"don't you know you're destroying your own mind too?"</span>
        </div>
      </div>
      <div id="kiy-dismiss">[ SUBMIT ]</div>
    </div>
  </div>
  `;let a=e.querySelectorAll(".kiy-eye-unit"),o=e.querySelector("#kiy-flash"),n=e.querySelector("#kiy-subliminal-text"),s=e.querySelector("#kiy-timer"),l=window.innerWidth/2,d=window.innerHeight/2,p=0;e.addEventListener("mousemove",e=>{let t=e.clientX,r=e.clientY,i=1-Math.min((p=.8*p+.2*Math.hypot(t-l,r-d))/50,.6);i<.3&&(i=.3),a.forEach(e=>{let a=e.getBoundingClientRect(),o=a.left+a.width/2,n=a.top+a.height/2,s=Math.atan2(r-n,t-o),l=Math.min(.18*a.width,Math.hypot(t-o,r-n)/10);e.style.setProperty("--px",`${Math.cos(s)*l}px`),e.style.setProperty("--py",`${Math.sin(s)*l}px`),e.style.setProperty("--dil",`${i}`)}),l=t,d=r});let c=setInterval(()=>{(p*=.5)<1&&a.forEach(e=>e.style.setProperty("--dil","1.2"))},100),x=Date.now(),g=setInterval(()=>{let e=Math.floor((Date.now()-x)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),a=String(e%60).padStart(2,"0");s.textContent=`[ EXPOSURE TIME: ${t}:${a} — DO NOT BLINK ]`},1e3),f=["I AM IN YOUR WALLS","DO NOT LOOK BEHIND YOU","THEY ARE HATCHING","YOU CANNOT WAKE UP","CARCOSA","SUBMIT","IT SEES YOU","FLESH"],h=setInterval(()=>{Math.random()>.6&&(n.textContent=f[Math.floor(Math.random()*f.length)],o.classList.add("fire"),setTimeout(()=>o.classList.remove("fire"),200))},2500),m=new MutationObserver(()=>{document.body.contains(e)||(clearInterval(g),clearInterval(h),clearInterval(c),m.disconnect())});m.observe(document.body,{childList:!0})},d3rlord3:function(){let e=i("egg-d3r");e.innerHTML=`
  <style>
    #egg-d3r {
      background: #000; display: flex; align-items: center; justify-content: center;
      font-family: 'Share Tech Mono', monospace; padding: 20px; box-sizing: border-box;
    }
    #d3r-wrap {
      width: 100%; max-width: 850px; max-height: 90vh;
      display: flex; flex-direction: column;
      border: 1px solid #333; background: #050505;
      position: relative; overflow: hidden; /* Will be changed to visible during breach */
      box-shadow: 0 0 40px rgba(0,0,0,0.9);
      transition: all 0.5s cubic-bezier(0.1, 1, 0.1, 1);
    }
    
    /* ── THE BREACH STATE ── */
    #d3r-wrap.breach {
      overflow: visible; border-color: #f00; background: #1a0000;
      box-shadow: 0 0 0 2px #f00, 0 0 100px rgba(255,0,0,0.6), 0 0 250px rgba(255,0,0,0.3);
      animation: breach-shake 0.1s infinite;
    }
    @keyframes breach-shake {
      0% { transform: translate(2px, 1px) rotate(0deg); }
      20% { transform: translate(-3px, 0px) rotate(1deg); }
      40% { transform: translate(1px, -2px) rotate(-1deg); }
      60% { transform: translate(-2px, 2px) rotate(0deg); }
      80% { transform: translate(3px, -1px) rotate(-2deg); }
      100% { transform: translate(0px, 0px) rotate(0deg); }
    }

    #d3r-scanline {
      position: absolute; left: 0; right: 0; height: 3px; pointer-events: none;
      background: linear-gradient(90deg, transparent, rgba(0,255,255,0.4), transparent);
      animation: d3r-scan 3s linear infinite; z-index: 10;
    }
    #d3r-wrap.breach #d3r-scanline {
      background: linear-gradient(90deg, transparent, rgba(255,0,0,0.8), transparent);
      animation-duration: 0.5s; height: 5px;
    }
    @keyframes d3r-scan { 0%{top:-5px} 100%{top:100%} }

    #d3r-header {
      background: #0a0a0a; padding: 15px 25px;
      border-bottom: 1px solid #222; display: flex; align-items: center; gap: 10px;
      flex-shrink: 0;
    }
    .d3r-dot { width: 14px; height: 14px; border-radius: 50%; background: #333; flex-shrink:0; }
    #d3r-wrap.breach .d3r-dot { animation: dot-panic 0.1s step-end infinite; }
    @keyframes dot-panic { 0%{background:#f00;box-shadow:0 0 10px #f00} 50%{background:#500;box-shadow:none} }
    
    #d3r-file-label { font-size:12px; color:#555; letter-spacing:4px; margin-left:10px; font-weight:bold; }
    #d3r-wrap.breach #d3r-file-label { color:#f00; text-shadow:0 0 10px #f00; }
    
    #d3r-body {
      padding: 30px; flex: 1; min-height: 300px;
      overflow-y: auto; scroll-behavior: smooth;
      scrollbar-width: thin; scrollbar-color: #333 transparent;
      position: relative; z-index: 5;
    }
    #d3r-wrap.breach #d3r-body { overflow-y: auto; }

    .d3r-line {
      font-size: clamp(13px,1.8vw,18px); line-height: 1.8;
      margin-bottom: 5px; word-wrap: break-word; color: #00d2d2;
      text-shadow: 0 0 5px rgba(0,210,210,0.4);
    }
    .d3r-line.meta { color: #666; text-shadow: none; font-size: 11px; letter-spacing: 2px; }
    .d3r-line.highlight { color: #ffb400; text-shadow: 0 0 8px rgba(255,180,0,0.6); font-weight: bold; }
    
    .d3r-line.hazard-text {
      color: #fff !important; font-weight: 900;
      text-shadow: 0 0 10px #f00, 0 0 20px #f00, 0 0 40px #f00;
      font-size: clamp(18px,2.5vw,28px); letter-spacing: 0.1em;
      text-align: center; margin: 20px 0;
      animation: text-shake 0.1s infinite;
    }
    @keyframes text-shake { 0%{transform:translate(1px,1px)} 50%{transform:translate(-1px,-1px)} }

    .zalgo-text {
      position: absolute; color: #a00; font-family: serif; font-weight: bold;
      font-size: clamp(16px, 2.5vw, 24px); line-height: 1.2;
      text-shadow: 0 0 10px rgba(255,0,0,0.8); white-space: nowrap;
      pointer-events: none; z-index: 999;
    }

    #d3r-overlay-red {
      position: absolute; inset: 0; pointer-events: none; opacity: 0; z-index: 20;
      background: rgba(255,0,0,0.15); mix-blend-mode: color-burn;
      box-shadow: inset 0 0 150px rgba(255,0,0,0.8);
      transition: opacity 0.2s;
    }
    #d3r-wrap.breach #d3r-overlay-red { opacity: 1; }

    #d3r-dismiss {
      padding: 20px; text-align: center; color: #555; cursor: pointer;
      border-top: 1px solid #222; font-size: 13px; letter-spacing: 6px; flex-shrink: 0;
      font-weight: bold; transition: all 0.2s; position: relative; z-index: 30;
      background: #050505;
    }
    #d3r-dismiss:hover { background: #111; color: #fff; }
    #d3r-wrap.breach #d3r-dismiss { color: #f00; border-color: #f00; background: #200; }
    #d3r-wrap.breach #d3r-dismiss:hover { background: #f00; color: #fff; text-shadow: 0 0 10px #fff; }
    
    .cursor { display: inline-block; width: 10px; height: 1em; background: #00d2d2; vertical-align: bottom; animation: blink 1s step-end infinite; }
    #d3r-wrap.breach .cursor { background: #f00; animation-duration: 0.2s; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  </style>

  <div id="d3r-wrap">
    <div id="d3r-overlay-red"></div>
    <div id="d3r-scanline"></div>
    <div id="d3r-header">
      <div class="d3r-dot"></div><div class="d3r-dot"></div><div class="d3r-dot"></div>
      <span id="d3r-file-label">sys_recovery_v2.4.sh — D3RLORD3 ARCHIVE</span>
    </div>
    <div id="d3r-body"><span id="d3r-cursor" class="cursor"></span></div>
    <div id="d3r-dismiss">[ ABORT CONNECTION ]</div>
  </div>
  `;let t=e.querySelector("#d3r-body"),a=e.querySelector("#d3r-wrap"),o=e.querySelector("#d3r-dismiss"),n=e.querySelector("#d3r-cursor");o.addEventListener("click",()=>r("egg-d3r"));let s=[{type:"text",str:"> INITIATING SECURE CONNECTION...",cls:"meta"},{type:"newline"},{type:"pause",ms:500},{type:"text",str:"> AUTHENTICATING... USER: D3RLORD3",cls:"meta"},{type:"newline"},{type:"pause",ms:300},{type:"text",str:"> FRAGMENT 1/12 ........ [102:14:08] d3rlord3_raw_pt1.mp4",cls:"meta"},{type:"newline"},{type:"text",str:"> LOADING exploration_notes_FINAL.pdf",cls:"meta"},{type:"newline"},{type:"pause",ms:800},{type:"newline"},{type:"text",str:'D3rlord3: "The moss grows in spirals. Not from the centre outward... inward."',speed:20},{type:"newline"},{type:"pause",ms:600},{type:"text",str:'D3rlord3: "I stopped walking. The footsteps behind me didn\'t."',speed:25},{type:"newline"},{type:"pause",ms:1e3},{type:"newline"},{type:"text",str:"> WARNING: FILE CORRUPTION DETECTED IN SECTOR 0x4A",cls:"highlight"},{type:"newline"},{type:"pause",ms:400},{type:"text",str:'D3rlord3: "It\'s reading what I type before I send it. Real time."',speed:15},{type:"newline"},{type:"pause",ms:800},{type:"text",str:'D3rlord3: "Set a chunk-load trap at coords 1,247 / -882. It stepped around it."',speed:20},{type:"newline"},{type:"pause",ms:1200},{type:"newline"},{type:"text",str:'D3rlord3: "Got it. Good poem. Cipher stacking is cowardly."',speed:30},{type:"newline"},{type:"pause",ms:500},{type:"text",str:'D3rlord3: "Moving to the golden gates."',speed:30},{type:"newline"},{type:"pause",ms:1500},{type:"newline"},{type:"text",str:"> APPROACHING SECTOR: THE GOLDEN GATES",cls:"highlight",speed:40},{type:"newline"},{type:"pause",ms:2e3},{type:"breach"},{type:"text",str:"!!! COGNITOHAZARD BREACH — KNOWLEDGE TRANSFER INITIATED !!!",cls:"hazard-text",speed:10},{type:"newline"},{type:"pause",ms:200},{type:"text",str:"EXPOSURE: 15 SECONDS. FULL PAST/PRESENT/FUTURE TRANSFER.",cls:"hazard-text",speed:10},{type:"newline"},{type:"pause",ms:200},{type:"text",str:"H E  I S  L O O K I N G  B A C K",cls:"hazard-text",speed:50},{type:"newline"},{type:"pause",ms:400},{type:"text",str:"THEY TOOK HIS EYES. THEY GAVE HIM DIFFERENT ONES.",cls:"hazard-text",speed:15},{type:"newline"},{type:"pause",ms:300},{type:"text",str:"D3RLORD3: \"don't you know you're destroying your own mind too?\"",cls:"hazard-text",speed:10},{type:"newline"}],l="̖̗̘̙̜̝̞̟̠̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎͓͔͕͖̍̎̄̅̿̑̆̐͒͗̾͆͊͋͌̃̂̌͐̀́̋̏̒̓̔͗̕͘ͅ",d=["H̸E̷ ̷C̴O̶M̶E̴S̴","S̶E̴E̴","C̷A̴R̷C̸O̷S̴A̵","B̴L̸E̴E̴D̸","V̷O̴I̵D̴"],p=0,c=null,x=!1;function g(e){(c=document.createElement("div")).className="d3r-line "+(e||""),t.insertBefore(c,n)}g(),setTimeout(function r(){if(!document.body.contains(e))return;if(p>=s.length){x&&function t(){if(!document.body.contains(e))return;let r=document.createElement("div");r.className="zalgo-text";let i=a.getBoundingClientRect(),o=Math.random()*window.innerWidth-i.left,n=Math.random()*window.innerHeight-i.top;r.style.left=`${o}px`,r.style.top=`${n}px`,r.style.transform=`rotate(${(Math.random()-.5)*40}deg)`;let s=d[Math.floor(Math.random()*d.length)],p="";for(let e=0;e<s.length;e++){p+=s[e];let t=Math.floor(10*Math.random());for(let e=0;e<t;e++)p+=l[Math.floor(Math.random()*l.length)]}r.textContent=p,a.appendChild(r),setTimeout(t,50+100*Math.random())}();return}let i=s[p++];if("pause"===i.type)setTimeout(r,i.ms);else if("newline"===i.type)g(),r();else if("breach"===i.type)x=!0,a.classList.add("breach"),o.textContent="[ FATAL SYSTEM ERROR — NO ESCAPE ]",r();else if("text"===i.type){c?i.cls&&(c.className="d3r-line "+i.cls):g(i.cls);let a=i.str,o=i.speed??20,n=0;!function i(){document.body.contains(e)&&(n<a.length?(c.textContent+=a[n++],t.scrollTop=t.scrollHeight,setTimeout(i,o)):r())}()}else if("backspace"===i.type){let t=i.count,a=i.speed??30;!function i(){document.body.contains(e)&&(t>0&&c&&c.textContent.length>0?(c.textContent=c.textContent.slice(0,-1),t--,setTimeout(i,a)):r())}()}},1e3)},wop:function(){let e=i("egg-wop"),t=`192.168.${Math.floor(254*Math.random())+1}.${Math.floor(254*Math.random())+1}`;e.innerHTML=`
  <style>
    #egg-wop {
      background: #010201; display:flex; align-items:center; justify-content:center;
      font-family:'Share Tech Mono',monospace;
      overflow: hidden; padding: 20px; box-sizing: border-box;
    }
    
    /* Background pulse on hover/reveal */
    #egg-wop::before {
      content:''; position:fixed; inset:0; pointer-events:none;
      background: radial-gradient(ellipse at center, rgba(255,0,0,0.04) 0%, transparent 70%);
      opacity: 0; transition: opacity 0.8s;
    }
    #egg-wop.revealed::before { opacity: 1; }

    #wop-card {
      width:min(620px,90vw);
      max-height: 90vh; overflow-y: auto;
      border:1px solid rgba(0,255,80,0.4);
      background: #010801;
      position:relative; 
      box-shadow: 0 0 0 1px rgba(0,255,80,0.06), 0 0 50px rgba(0,255,80,0.08);
      transition: border-color 0.6s, box-shadow 0.6s, background 0.6s;
      animation: wop-in 0.7s cubic-bezier(0.16,1,0.3,1) both;
    }
    @keyframes wop-in { from{opacity:0;transform:translateY(24px) scale(0.94)} to{opacity:1;transform:none} }
    
    #egg-wop.revealed #wop-card {
      border-color: rgba(255,0,0,0.6);
      box-shadow: 0 0 0 1px rgba(255,0,0,0.1), 0 0 80px rgba(255,0,0,0.25);
      background: #080100;
    }

    /* Scanline overlaid on card */
    #wop-scan-line {
      position:absolute; left:0; right:0; height:2px; pointer-events:none; z-index:20;
      background: linear-gradient(90deg, transparent, rgba(0,255,80,0.2), transparent);
      animation: wop-scan 5s linear infinite;
    }
    #egg-wop.revealed #wop-scan-line {
      background: linear-gradient(90deg, transparent, rgba(255,0,0,0.35), transparent);
      animation-duration: 1.2s;
    }
    @keyframes wop-scan { 0%{top:-2px} 100%{top:100%} }

    .w-head {
      padding: 14px 22px; border-bottom: 1px solid rgba(0,255,80,0.12);
      display: flex; align-items: center; justify-content: space-between;
      font-size: 11px; color: rgba(0,255,80,0.4); letter-spacing: 5px;
      transition: all 0.6s;
    }
    #egg-wop.revealed .w-head { color: rgba(255,0,0,0.6); border-color: rgba(255,0,0,0.15); }
    
    .w-cam-dot {
      width: 9px; height: 9px; background: #f00; border-radius: 50%;
      box-shadow: 0 0 6px #f00; opacity: 0;
      animation: cam-blink 0.9s step-end infinite;
      transition: opacity 0.4s;
    }
    #egg-wop.revealed .w-cam-dot { opacity: 1; }
    @keyframes cam-blink { 0%,100%{opacity:1} 50%{opacity:0.1} }

    .w-body { padding: 8% 10%; text-align: center; }
    
    .w-stamp {
      font-family: 'Orbitron', sans-serif;
      font-size: clamp(1.8rem, 8vw, 4.8rem); font-weight: 900;
      color: #00ff50; letter-spacing: 6px; line-height: 1;
      text-shadow: 0 0 20px rgba(0,255,80,0.7), 0 0 60px rgba(0,255,80,0.25);
      transition: all 0.6s;
      animation: stamp-in 0.8s 0.2s cubic-bezier(0.34,1.56,0.64,1) both;
    }
    @keyframes stamp-in { from{opacity:0;transform:scale(3.5) rotate(-6deg);filter:blur(6px)} to{opacity:1;transform:scale(1) rotate(-2deg);filter:blur(0)} }
    #egg-wop.revealed .w-stamp { color: #f00; text-shadow: 0 0 20px rgba(255,0,0,0.8), 0 0 60px rgba(255,0,0,0.35); transform: scale(1.04) rotate(-2deg); }

    .w-sub {
      font-size: clamp(7px,1.6vw,10px); color: rgba(0,255,80,0.3);
      letter-spacing: 4px; margin: 10px 0 32px; transition: color 0.6s;
    }
    #egg-wop.revealed .w-sub { color: rgba(255,0,0,0.4); }

    .w-divider { height: 1px; background: rgba(0,255,80,0.08); margin: 0 0 28px; transition: background 0.6s; }
    #egg-wop.revealed .w-divider { background: rgba(255,0,0,0.12); }

    .w-text {
      font-size: clamp(10px,2vw,15px); color: rgba(0,255,80,0.55);
      line-height: 2.2; transition: color 0.6s;
    }
    #egg-wop.revealed .w-text { color: rgba(255,60,60,0.55); }

    /* Text swap on reveal */
    .swap { position: relative; display: inline-block; }
    .swap .base { transition: opacity 0.4s; }
    .swap .alt  { position:absolute; top:0; left:0; width:100%; opacity:0; color:#f00; font-weight:700; text-shadow:0 0 8px rgba(255,0,0,0.6); pointer-events:none; transition: opacity 0.4s; white-space:nowrap; }
    #egg-wop.revealed .swap .base { opacity: 0; }
    #egg-wop.revealed .swap .alt  { opacity: 1; }

    .w-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 0;
      border: 1px solid rgba(0,255,80,0.1); margin: 28px 0 0;
      transition: border-color 0.6s;
    }
    #egg-wop.revealed .w-grid { border-color: rgba(255,0,0,0.15); }
    
    .w-row {
      padding: 11px 16px; border-bottom: 1px solid rgba(0,255,80,0.07);
      display: flex; flex-direction: column; gap: 2px;
      transition: border-color 0.6s; border-right: 1px solid rgba(0,255,80,0.07);
    }
    #egg-wop.revealed .w-row { border-color: rgba(255,0,0,0.1); }
    .w-row:nth-child(even) { border-right: none; }
    
    .w-label { font-size: 9px; color: rgba(0,255,80,0.25); letter-spacing: 3px; transition: color 0.6s; }
    #egg-wop.revealed .w-label { color: rgba(255,0,0,0.3); }
    
    .w-val { font-size: clamp(9px,1.8vw,13px); color: rgba(0,255,80,0.8); letter-spacing: 1px; transition: color 0.6s; word-wrap: break-word; }
    #egg-wop.revealed .w-val { color: rgba(255,60,60,0.9); }

    .w-blink { animation: cam-blink 1.2s step-end infinite; }

    .w-btn {
      display: block; margin: 32px auto 0; padding: 14px 36px;
      border: 1px solid rgba(0,255,80,0.4); background: transparent;
      color: rgba(0,255,80,0.8); cursor: pointer; font-family: inherit;
      font-size: clamp(10px,1.6vw,14px); letter-spacing: 5px;
      transition: all 0.25s;
    }
    .w-btn:hover { background: rgba(0,255,80,0.08); color: #00ff50; border-color: #00ff50; }
    #egg-wop.revealed .w-btn { border-color: rgba(255,0,0,0.5); color: rgba(255,60,60,0.7); }
    #egg-wop.revealed .w-btn:hover { background: rgba(255,0,0,0.1); color: #f00; border-color: #f00; }

    .w-footer {
      padding: 12px 22px; border-top: 1px solid rgba(0,255,80,0.06);
      font-size: 9px; color: rgba(0,255,80,0.15); letter-spacing: 4px;
      text-align: center; transition: all 0.6s;
    }
    #egg-wop.revealed .w-footer { color: rgba(255,0,0,0.2); border-color: rgba(255,0,0,0.08); }
  </style>

  <div id="wop-card">
    <div id="wop-scan-line"></div>
    <div class="w-head">
      <span class="swap">
        <span class="base">// SECURE CHANNEL UPLINK //</span>
        <span class="alt">// SYSTEM COMPROMISED //</span>
      </span>
      <div style="display:flex;align-items:center;gap:10px">
        <span class="swap" style="font-size:10px; text-align:right;">
          <span class="base">ENCRYPTED</span>
          <span class="alt">RECORDING</span>
        </span>
        <div class="w-cam-dot"></div>
      </div>
    </div>
    
    <div class="w-body">
      <div class="w-stamp swap">
        <span class="base">WORLD'S<br>OPERATION</span>
        <span class="alt" style="letter-spacing:14px;">W O R L D ' S<br>E N D</span>
      </div>
      
      <div class="w-sub swap">
        <span class="base">CLEARANCE GRANTED \xb7 FIELD OPERATIVE \xb7 EYES ONLY</span>
        <span class="alt">TARGET ACQUIRED \xb7 SURVEILLANCE ACTIVE \xb7 NO EXIT</span>
      </div>
      
      <div class="w-divider"></div>
      
      <div class="w-text">
        <span class="swap">
          <span class="base">You have been selected for clearance.</span>
          <span class="alt">You walked directly into the trap.</span>
        </span><br>
        <span class="swap">
          <span class="base">Your objective: locate the hidden path.</span>
          <span class="alt">Do not look behind you. Do not turn left.</span>
        </span><br>
        <span class="swap">
          <span class="base">Report to the crossroads for deployment.</span>
          <span class="alt">They are already inside your house.</span>
        </span>
      </div>

      <div class="w-grid">
        <div class="w-row">
          <div class="w-label">ISSUED</div>
          <div class="w-val" id="wop-ts">——:——:——</div>
        </div>
        <div class="w-row">
          <div class="w-label">CONNECTION</div>
          <div class="w-val swap">
            <span class="base"><span class="w-blink" style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#00ff50;margin-right:6px;vertical-align:middle"></span>SECURE</span>
            <span class="alt">TARGET: ${t}</span>
          </div>
        </div>
        <div class="w-row">
          <div class="w-label">ADVISORY</div>
          <div class="w-val swap" style="font-size:85%">
            <span class="base">AT CROSSROADS — DO NOT TURN LEFT</span>
            <span class="alt" style="color:#f00">SOMETHING IS LISTENING</span>
          </div>
        </div>
      </div>
      <button class="w-btn swap" id="wop-dismiss">
        <span class="base">[ ACCEPT MISSION ]</span>
        <span class="alt">[ OFFER FLESH ]</span>
      </button>
    </div>
    <div class="w-footer swap">
      <span class="base">THIS MESSAGE SELF-DESTRUCTS ON DISMISSAL</span>
      <span class="alt">THEY ALREADY KNOW YOU READ THIS</span>
    </div>
  </div>
  `,e.querySelector("#wop-ts").textContent=new Date().toISOString().split("T")[1].split(".")[0]+" UTC";let a=e.querySelector("#wop-card");a.addEventListener("mouseenter",()=>e.classList.add("revealed")),a.addEventListener("mouseleave",()=>e.classList.remove("revealed")),e.querySelector("#wop-dismiss").addEventListener("click",()=>r("egg-wop"))}};function r(e){let t=document.getElementById(e);t&&(t.style.opacity="0",setTimeout(()=>t.remove(),500)),document.body.style.overflow=""}function i(e){document.getElementById(e)?.remove();let t=document.createElement("div");return t.id=e,t.style.cssText="position:fixed;inset:0;z-index:999999;pointer-events:all;opacity:0;transition:opacity 0.5s ease-in;",document.body.appendChild(t),t.offsetWidth,t.style.opacity="1",document.body.style.overflow="hidden",t}e.s(["default",0,function(){let e=(0,t.useRef)(""),i=(0,t.useRef)(null);return(0,t.useEffect)(()=>{let t=Math.max(...Object.keys(a).map(e=>e.length));function o(o){if("Escape"===o.key){document.querySelectorAll('[id^="egg-"]').forEach(e=>{r(e.id)}),e.current="",i.current&&clearTimeout(i.current);return}let n=o.target.tagName;if("INPUT"!==n&&"TEXTAREA"!==n&&!o.target.isContentEditable&&1===o.key.length){for(let[r,n]of(e.current=(e.current+o.key.toLowerCase()).slice(-t),i.current&&clearTimeout(i.current),i.current=setTimeout(()=>{e.current=""},2e3),Object.entries(a)))if(e.current.endsWith(r)){e.current="",n();break}}}return window.addEventListener("keydown",o),()=>window.removeEventListener("keydown",o)},[]),null}])}]);