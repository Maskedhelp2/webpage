(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,30815,e=>{"use strict";var t=e.i(43476),i=e.i(2971),a=e.i(71645);let r=[{left:"NEXT.JS",right:"FULL STACK",icon:"⬡"},{left:"REACT",right:"FRONTEND",icon:"⚛"},{left:"TYPESCRIPT",right:"BACKEND",icon:"{ }"},{left:"NODE.JS",right:"SERVER-SIDE",icon:"⬢"},{left:"REST APIs",right:"APIs",icon:"⇄"},{left:"CSS-IN-JS",right:"STYLING",icon:"✦"},{left:"POSTGRESQL",right:"DATABASE",icon:"▦"},{left:"CLOUDFLARE",right:"EDGE DEPLOY",icon:"☁"},{left:"DOCKER",right:"CONTAINERS",icon:"◉"},{left:"RASPBERRY PI",right:"HARDWARE",icon:"◈"},{left:"ARDUINO",right:"MICROCTRL",icon:"⏣"},{left:"MICROCONTROLLERS",right:"EMBEDDED",icon:"⬡"},{left:"EMBEDDED C",right:"SYSTEMS",icon:"</>"},{left:"GPIO / I2C / SPI",right:"PROTOCOLS",icon:"⇌"},{left:"SENSOR FUSION",right:"IOT",icon:"◎"},{left:"MACHINE LEARNING",right:"AI / ML",icon:"◆"},{left:"PYTHON",right:"SCRIPTING",icon:"≋"},{left:"PYTORCH",right:"DEEP LEARNING",icon:"⬟"},{left:"LLM INTEGRATION",right:"GENERATIVE AI",icon:"◈"},{left:"COMPUTER VISION",right:"CV",icon:"◉"},{left:"NLP",right:"LANGUAGE",icon:"≡"},{left:"PROMPT ENGINEERING",right:"PROMPTING",icon:"⟡"},{left:"AI ON EDGE",right:"EDGE AI",icon:"⬡"}],n=["FULL STACK","ROBOTICS","AI","HARDWARE","EDGE COMPUTING","OPEN SOURCE"],l=[{label:"WEB & CLOUD",skills:["NEXT.JS","REACT","TYPESCRIPT","NODE.JS","REST APIs","CLOUDFLARE","DOCKER"]},{label:"EMBEDDED",skills:["RASPBERRY PI","ARDUINO","EMBEDDED C","GPIO / I2C / SPI","SENSOR FUSION","MICROCONTROLLERS"]},{label:"AI & ROBOTICS",skills:["MACHINE LEARNING","PYTORCH","COMPUTER VISION","NLP","PROMPT ENGINEERING","LLM INTEGRATION","AI ON EDGE"]}];class s{wrapper;config;leftColumn;rightColumn;leftTexts=[];rightTexts=[];thumbnail;thumbnailLabel;halfRange=0;leftQuickSetters=[];rightQuickSetters=[];scrollTriggerInstance=null;resizeHandler;gsap=null;currentFocused=-1;constructor(e){this.wrapper=e,this.config={waveNumber:e.dataset.waveNumber?parseFloat(e.dataset.waveNumber):12,waveSpeed:e.dataset.waveSpeed?parseFloat(e.dataset.waveSpeed):1}}async init(){let t=await e.A(16495),{ScrollTrigger:i}=await e.A(96349);this.gsap=t.default,this.gsap.registerPlugin(i),this.leftColumn=this.wrapper.querySelector(".wave-column-left"),this.rightColumn=this.wrapper.querySelector(".wave-column-right"),this.thumbnail=this.wrapper.querySelector(".wave-thumbnail"),this.thumbnailLabel=this.wrapper.querySelector(".wave-thumbnail-label"),this.leftColumn&&this.rightColumn&&(this.leftTexts=this.gsap.utils.toArray(this.leftColumn.querySelectorAll(".animated-text")),this.rightTexts=this.gsap.utils.toArray(this.rightColumn.querySelectorAll(".animated-text")),this.leftTexts.length&&(this.leftQuickSetters=this.leftTexts.map(e=>this.gsap.quickTo(e,"x",{duration:.6,ease:"power4.out"})),this.rightQuickSetters=this.rightTexts.map(e=>this.gsap.quickTo(e,"x",{duration:.6,ease:"power4.out"})),this.calculateRange(),this.scrollTriggerInstance=i.create({trigger:this.wrapper,start:"top bottom",end:"bottom top",onUpdate:e=>this.handleScroll(e)}),this.resizeHandler=()=>this.calculateRange(),window.addEventListener("resize",this.resizeHandler)))}calculateRange(){let e=this.leftColumn.offsetWidth,t=Math.max(...this.leftTexts.map(e=>e.offsetWidth));this.halfRange=Math.max(0,(e-t)/2)}handleScroll(e){let t=e.progress,i=this.findClosestToViewportCenter();if(this.updateColumn(this.leftTexts,this.leftQuickSetters,t,i,1),this.updateColumn(this.rightTexts,this.rightQuickSetters,t,i,-1),this.thumbnail){let e=r[i];i!==this.currentFocused&&e&&(this.currentFocused=i,this.thumbnail.textContent=e.icon,this.thumbnailLabel&&(this.thumbnailLabel.textContent=e.left));let t=this.wrapper.getBoundingClientRect(),a=window.innerHeight/2,n=this.thumbnail.parentElement?.offsetHeight??80,l=this.wrapper.offsetHeight,s=a-t.top-n/2,o=Math.max(-n/2,Math.min(l-n/2,s));this.gsap.set(this.thumbnail.parentElement,{y:o})}}updateColumn(e,t,i,a,r){e.forEach((e,n)=>{let l=Math.sin(this.config.waveNumber*n+this.config.waveSpeed*i*Math.PI*2-Math.PI/2)*this.halfRange*r;t[n](l);let s=Math.abs(n-a),o=n===a;e.classList.toggle("focused",o),e.classList.toggle("near",1===s&&!o)})}findClosestToViewportCenter(){let e=window.innerHeight/2,t=0,i=1/0;return this.leftTexts.forEach((a,r)=>{let n=a.getBoundingClientRect(),l=Math.abs(n.top+n.height/2-e);l<i&&(i=l,t=r)}),t}destroy(){this.scrollTriggerInstance?.kill(),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler)}}e.s(["default",0,function(){let e=(0,a.useRef)(null),o=(0,a.useRef)(null);return(0,a.useEffect)(()=>{if(!e.current)return;let t=new s(e.current);return t.init(),o.current=t,()=>{o.current?.destroy()}},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:`
        /* ── WAVE COLUMNS ── */
        .dual-wave-wrapper {
          display: flex;
          width: 100%;
          position: relative;
          gap: 0;
        }

        .wave-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;           /* more breathing room */
          overflow: visible;
          padding: 0 1.5rem;
        }

        .wave-column-left  { align-items: center; }
        .wave-column-right { align-items: center; }

        /* ── WAVE TEXT — much bigger ── */
        .animated-text {
          width: max-content;
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(1.1rem, 2.4vw, 2rem);   /* was 0.8–1.3rem */
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1;
          color: #2a2a2a;
          transition: color 220ms ease-out, text-shadow 220ms ease-out, opacity 220ms ease-out;
          cursor: default;
          will-change: transform;
          white-space: nowrap;
          opacity: 0.5;
        }

        .animated-text.near {
          color: #7a2a28;
          opacity: 0.75;
          text-shadow: 0 0 20px rgba(230,51,41,0.15);
        }

        .animated-text.focused {
          color: #e63329 !important;
          opacity: 1 !important;
          text-shadow: 0 0 30px rgba(230,51,41,0.6), 0 0 60px rgba(230,51,41,0.25);
        }

        /* ── CENTER THUMBNAIL ── */
        .wave-thumbnail-wrapper {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 14vw;
          min-width: 100px;
          max-width: 160px;
          pointer-events: none;
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .wave-thumbnail {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(3rem, 6vw, 5.5rem);   /* bigger icon */
          color: #e63329;
          text-shadow: 0 0 40px rgba(230,51,41,0.7), 0 0 80px rgba(230,51,41,0.3);
          line-height: 1;
          text-align: center;
          width: 100%;
          animation: iconPulse 2s ease-in-out infinite;
        }

        .wave-thumbnail-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: clamp(0.5rem, 1vw, 0.7rem);
          color: #e63329;
          letter-spacing: 0.15em;
          opacity: 0.6;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        @keyframes iconPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* ── CENTER LINE ── */
        .wave-center-line {
          position: absolute;
          left: 50%;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, #e63329 20%, #e63329 80%, transparent);
          opacity: 0.12;
          transform: translateX(-50%);
          pointer-events: none;
        }

        .wave-spacer { height: 30svh; }

        /* ── DOMAIN CARDS ── */
        .domain-card {
          border: 1px solid #1a1a1a;
          background: rgba(255,255,255,0.015);
          padding: 28px;
          position: relative;
          transition: border-color 0.2s, background 0.2s;
        }
        .domain-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #e63329, transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .domain-card:hover { border-color: rgba(230,51,41,0.25); background: rgba(230,51,41,0.03); }
        .domain-card:hover::before { opacity: 1; }

        .domain-skill-pill {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: #444;
          border: 1px solid #1e1e1e;
          padding: 4px 10px;
          letter-spacing: 0.1em;
          transition: color 0.2s, border-color 0.2s;
        }
        .domain-card:hover .domain-skill-pill {
          color: #666;
          border-color: #2a2a2a;
        }

        /* ── SKILL TAGS ── */
        .skill-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          color: #e63329;
          border: 1px solid #2a0a09;
          background: rgba(230,51,41,0.05);
          padding: 5px 14px;
          letter-spacing: 0.1em;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .skill-tag:hover {
          background: rgba(230,51,41,0.14);
          box-shadow: 0 0 10px rgba(230,51,41,0.2);
        }

        /* ── STAT COUNTER ── */
        .stat-num {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          color: #e63329;
          line-height: 1;
          position: relative;
        }
        .stat-num::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 100%; height: 1px;
          background: linear-gradient(90deg, #e63329, transparent);
        }

        @media (max-width: 768px) {
          .animated-text { font-size: clamp(0.85rem, 3.5vw, 1.2rem); }
          .wave-column { gap: 1.2rem; padding: 0 0.5rem; }
          .wave-thumbnail { font-size: 2.5rem; }
          .domain-grid { grid-template-columns: 1fr !important; }
        }
      `}),(0,t.jsx)(i.default,{}),(0,t.jsxs)("main",{style:{paddingTop:100,minHeight:"100vh"},children:[(0,t.jsxs)("div",{style:{maxWidth:1100,margin:"0 auto",padding:"3rem 2rem 0"},children:[(0,t.jsx)("p",{style:{fontFamily:"var(--mono)",fontSize:11,color:"#e63329",letterSpacing:"0.22em",marginBottom:"1rem"},children:"MASKEDHELP // KARTHIK KUMAR // SKILL MATRIX"}),(0,t.jsxs)("h1",{style:{fontFamily:"var(--display)",fontSize:"clamp(2.5rem, 7vw, 5rem)",fontWeight:900,color:"#fff",letterSpacing:"-0.02em",lineHeight:.95,marginBottom:"1.5rem"},children:["SKILL",(0,t.jsx)("span",{style:{color:"#e63329"},children:"_"}),"SET"]}),(0,t.jsx)("p",{style:{fontFamily:"var(--mono)",fontSize:11,color:"#444",letterSpacing:"0.18em",marginBottom:"3rem",maxWidth:500},children:"SCROLL TO EXPLORE · 3 DOMAINS · 24 TECHNOLOGIES"}),(0,t.jsx)("div",{style:{display:"flex",gap:"40px",flexWrap:"wrap",alignItems:"flex-end",marginBottom:"4rem"},children:[["3","DOMAINS"],["24","TECHNOLOGIES"],["∞","STILL LEARNING"]].map(([e,i],a)=>(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"40px"},children:[(0,t.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[(0,t.jsx)("span",{className:"stat-num",children:e}),(0,t.jsx)("span",{style:{fontFamily:"var(--mono)",fontSize:10,color:"#333",letterSpacing:"0.18em"},children:i})]}),a<2&&(0,t.jsx)("div",{style:{width:1,height:48,background:"linear-gradient(to bottom, transparent, #1a1a1a, transparent)"}})]},a))}),(0,t.jsx)("div",{className:"domain-grid",style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",marginBottom:"5rem"},children:l.map(e=>(0,t.jsxs)("div",{className:"domain-card",children:[(0,t.jsxs)("div",{style:{fontFamily:"var(--mono)",fontSize:10,color:"#e63329",letterSpacing:"0.2em",marginBottom:"16px",display:"flex",alignItems:"center",gap:8},children:[(0,t.jsx)("span",{style:{width:16,height:1,background:"#e63329",display:"block",flexShrink:0}}),e.label]}),(0,t.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"},children:e.skills.map(e=>(0,t.jsx)("span",{className:"domain-skill-pill",children:e},e))})]},e.label))})]}),(0,t.jsx)("div",{style:{textAlign:"center",marginBottom:"2rem"},children:(0,t.jsx)("span",{style:{fontFamily:"var(--mono)",fontSize:10,color:"#333",letterSpacing:"0.2em"},children:"↓ SCROLL THROUGH THE STACK ↓"})}),(0,t.jsx)("div",{className:"wave-spacer"}),(0,t.jsxs)("div",{ref:e,className:"dual-wave-wrapper","data-wave-number":"12","data-wave-speed":"1",children:[(0,t.jsx)("div",{className:"wave-center-line"}),(0,t.jsx)("div",{className:"wave-column wave-column-left",children:r.map((e,i)=>(0,t.jsx)("span",{className:"animated-text",children:e.left},i))}),(0,t.jsxs)("div",{className:"wave-thumbnail-wrapper",children:[(0,t.jsx)("div",{className:"wave-thumbnail",children:"◆"}),(0,t.jsx)("div",{className:"wave-thumbnail-label",children:"SKILL"})]}),(0,t.jsx)("div",{className:"wave-column wave-column-right",children:r.map((e,i)=>(0,t.jsx)("span",{className:"animated-text",children:e.right},i))})]}),(0,t.jsx)("div",{className:"wave-spacer"}),(0,t.jsx)("div",{style:{maxWidth:1100,margin:"0 auto",padding:"0 2rem 6rem"},children:(0,t.jsxs)("div",{style:{borderTop:"1px solid #1a1a1a",paddingTop:"2.5rem"},children:[(0,t.jsx)("p",{style:{fontFamily:"var(--mono)",fontSize:10,color:"#2a2a2a",letterSpacing:"0.18em",marginBottom:"1rem"},children:"// DOMAINS"}),(0,t.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.5rem"},children:n.map(e=>(0,t.jsx)("span",{className:"skill-tag",children:e},e))})]})})]})]})}])},16495,e=>{e.v(t=>Promise.all(["static/chunks/0rbgb--dsg-d8.js","static/chunks/32_-f3kvirmsg.js"].map(t=>e.l(t))).then(()=>t(20697)))},96349,e=>{e.v(t=>Promise.all(["static/chunks/2qoc_kn_izwiv.js"].map(t=>e.l(t))).then(()=>t(83495)))}]);