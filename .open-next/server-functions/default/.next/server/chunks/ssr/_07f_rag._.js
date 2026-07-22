module.exports=[11051,a=>{"use strict";var b=a.i(87924),c=a.i(20238),d=a.i(72131);let e=[{left:"NEXT.JS",right:"FULL STACK",icon:"⬡"},{left:"REACT",right:"FRONTEND",icon:"⚛"},{left:"TYPESCRIPT",right:"BACKEND",icon:"{ }"},{left:"NODE.JS",right:"SERVER-SIDE",icon:"⬢"},{left:"REST APIs",right:"APIs",icon:"⇄"},{left:"CSS-IN-JS",right:"STYLING",icon:"✦"},{left:"POSTGRESQL",right:"DATABASE",icon:"▦"},{left:"CLOUDFLARE",right:"EDGE DEPLOY",icon:"☁"},{left:"DOCKER",right:"CONTAINERS",icon:"◉"},{left:"RASPBERRY PI",right:"HARDWARE",icon:"◈"},{left:"ARDUINO",right:"MICROCTRL",icon:"⏣"},{left:"MICROCONTROLLERS",right:"EMBEDDED",icon:"⬡"},{left:"EMBEDDED C",right:"SYSTEMS",icon:"</>"},{left:"GPIO / I2C / SPI",right:"PROTOCOLS",icon:"⇌"},{left:"SENSOR FUSION",right:"IOT",icon:"◎"},{left:"MACHINE LEARNING",right:"AI / ML",icon:"◆"},{left:"PYTHON",right:"SCRIPTING",icon:"≋"},{left:"PYTORCH",right:"DEEP LEARNING",icon:"⬟"},{left:"LLM INTEGRATION",right:"GENERATIVE AI",icon:"◈"},{left:"COMPUTER VISION",right:"CV",icon:"◉"},{left:"NLP",right:"LANGUAGE",icon:"≡"},{left:"PROMPT ENGINEERING",right:"PROMPTING",icon:"⟡"},{left:"AI ON EDGE",right:"EDGE AI",icon:"⬡"}],f=["FULL STACK","ROBOTICS","AI","HARDWARE","EDGE COMPUTING","OPEN SOURCE"],g=[{label:"WEB & CLOUD",skills:["NEXT.JS","REACT","TYPESCRIPT","NODE.JS","REST APIs","CLOUDFLARE","DOCKER"]},{label:"EMBEDDED",skills:["RASPBERRY PI","ARDUINO","EMBEDDED C","GPIO / I2C / SPI","SENSOR FUSION","MICROCONTROLLERS"]},{label:"AI & ROBOTICS",skills:["MACHINE LEARNING","PYTORCH","COMPUTER VISION","NLP","PROMPT ENGINEERING","LLM INTEGRATION","AI ON EDGE"]}];class h{wrapper;config;leftColumn;rightColumn;leftTexts=[];rightTexts=[];thumbnail;thumbnailLabel;halfRange=0;leftQuickSetters=[];rightQuickSetters=[];scrollTriggerInstance=null;resizeHandler;gsap=null;currentFocused=-1;constructor(a){this.wrapper=a,this.config={waveNumber:a.dataset.waveNumber?parseFloat(a.dataset.waveNumber):12,waveSpeed:a.dataset.waveSpeed?parseFloat(a.dataset.waveSpeed):1}}async init(){let b=await a.A(46756),{ScrollTrigger:c}=await a.A(22714);this.gsap=b.default,this.gsap.registerPlugin(c),this.leftColumn=this.wrapper.querySelector(".wave-column-left"),this.rightColumn=this.wrapper.querySelector(".wave-column-right"),this.thumbnail=this.wrapper.querySelector(".wave-thumbnail"),this.thumbnailLabel=this.wrapper.querySelector(".wave-thumbnail-label"),this.leftColumn&&this.rightColumn&&(this.leftTexts=this.gsap.utils.toArray(this.leftColumn.querySelectorAll(".animated-text")),this.rightTexts=this.gsap.utils.toArray(this.rightColumn.querySelectorAll(".animated-text")),this.leftTexts.length&&(this.leftQuickSetters=this.leftTexts.map(a=>this.gsap.quickTo(a,"x",{duration:.6,ease:"power4.out"})),this.rightQuickSetters=this.rightTexts.map(a=>this.gsap.quickTo(a,"x",{duration:.6,ease:"power4.out"})),this.calculateRange(),this.scrollTriggerInstance=c.create({trigger:this.wrapper,start:"top bottom",end:"bottom top",onUpdate:a=>this.handleScroll(a)}),this.resizeHandler=()=>this.calculateRange(),window.addEventListener("resize",this.resizeHandler)))}calculateRange(){let a=this.leftColumn.offsetWidth,b=Math.max(...this.leftTexts.map(a=>a.offsetWidth));this.halfRange=Math.max(0,(a-b)/2)}handleScroll(a){let b=a.progress,c=this.findClosestToViewportCenter();if(this.updateColumn(this.leftTexts,this.leftQuickSetters,b,c,1),this.updateColumn(this.rightTexts,this.rightQuickSetters,b,c,-1),this.thumbnail){let a=e[c];c!==this.currentFocused&&a&&(this.currentFocused=c,this.thumbnail.textContent=a.icon,this.thumbnailLabel&&(this.thumbnailLabel.textContent=a.left));let b=this.wrapper.getBoundingClientRect(),d=window.innerHeight/2,f=this.thumbnail.parentElement?.offsetHeight??80,g=this.wrapper.offsetHeight,h=d-b.top-f/2,i=Math.max(-f/2,Math.min(g-f/2,h));this.gsap.set(this.thumbnail.parentElement,{y:i})}}updateColumn(a,b,c,d,e){a.forEach((a,f)=>{let g=Math.sin(this.config.waveNumber*f+this.config.waveSpeed*c*Math.PI*2-Math.PI/2)*this.halfRange*e;b[f](g);let h=Math.abs(f-d),i=f===d;a.classList.toggle("focused",i),a.classList.toggle("near",1===h&&!i)})}findClosestToViewportCenter(){let a=window.innerHeight/2,b=0,c=1/0;return this.leftTexts.forEach((d,e)=>{let f=d.getBoundingClientRect(),g=Math.abs(f.top+f.height/2-a);g<c&&(c=g,b=e)}),b}destroy(){this.scrollTriggerInstance?.kill(),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler)}}a.s(["default",0,function(){let a=(0,d.useRef)(null),i=(0,d.useRef)(null);return(0,d.useEffect)(()=>{if(!a.current)return;let b=new h(a.current);return b.init(),i.current=b,()=>{i.current?.destroy()}},[]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
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
      `}),(0,b.jsx)(c.default,{}),(0,b.jsxs)("main",{style:{paddingTop:100,minHeight:"100vh"},children:[(0,b.jsxs)("div",{style:{maxWidth:1100,margin:"0 auto",padding:"3rem 2rem 0"},children:[(0,b.jsx)("p",{style:{fontFamily:"var(--mono)",fontSize:11,color:"#e63329",letterSpacing:"0.22em",marginBottom:"1rem"},children:"MASKEDHELP // KARTHIK KUMAR // SKILL MATRIX"}),(0,b.jsxs)("h1",{style:{fontFamily:"var(--display)",fontSize:"clamp(2.5rem, 7vw, 5rem)",fontWeight:900,color:"#fff",letterSpacing:"-0.02em",lineHeight:.95,marginBottom:"1.5rem"},children:["SKILL",(0,b.jsx)("span",{style:{color:"#e63329"},children:"_"}),"SET"]}),(0,b.jsx)("p",{style:{fontFamily:"var(--mono)",fontSize:11,color:"#444",letterSpacing:"0.18em",marginBottom:"3rem",maxWidth:500},children:"SCROLL TO EXPLORE · 3 DOMAINS · 24 TECHNOLOGIES"}),(0,b.jsx)("div",{style:{display:"flex",gap:"40px",flexWrap:"wrap",alignItems:"flex-end",marginBottom:"4rem"},children:[["3","DOMAINS"],["24","TECHNOLOGIES"],["∞","STILL LEARNING"]].map(([a,c],d)=>(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"40px"},children:[(0,b.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[(0,b.jsx)("span",{className:"stat-num",children:a}),(0,b.jsx)("span",{style:{fontFamily:"var(--mono)",fontSize:10,color:"#333",letterSpacing:"0.18em"},children:c})]}),d<2&&(0,b.jsx)("div",{style:{width:1,height:48,background:"linear-gradient(to bottom, transparent, #1a1a1a, transparent)"}})]},d))}),(0,b.jsx)("div",{className:"domain-grid",style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"16px",marginBottom:"5rem"},children:g.map(a=>(0,b.jsxs)("div",{className:"domain-card",children:[(0,b.jsxs)("div",{style:{fontFamily:"var(--mono)",fontSize:10,color:"#e63329",letterSpacing:"0.2em",marginBottom:"16px",display:"flex",alignItems:"center",gap:8},children:[(0,b.jsx)("span",{style:{width:16,height:1,background:"#e63329",display:"block",flexShrink:0}}),a.label]}),(0,b.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"},children:a.skills.map(a=>(0,b.jsx)("span",{className:"domain-skill-pill",children:a},a))})]},a.label))})]}),(0,b.jsx)("div",{style:{textAlign:"center",marginBottom:"2rem"},children:(0,b.jsx)("span",{style:{fontFamily:"var(--mono)",fontSize:10,color:"#333",letterSpacing:"0.2em"},children:"↓ SCROLL THROUGH THE STACK ↓"})}),(0,b.jsx)("div",{className:"wave-spacer"}),(0,b.jsxs)("div",{ref:a,className:"dual-wave-wrapper","data-wave-number":"12","data-wave-speed":"1",children:[(0,b.jsx)("div",{className:"wave-center-line"}),(0,b.jsx)("div",{className:"wave-column wave-column-left",children:e.map((a,c)=>(0,b.jsx)("span",{className:"animated-text",children:a.left},c))}),(0,b.jsxs)("div",{className:"wave-thumbnail-wrapper",children:[(0,b.jsx)("div",{className:"wave-thumbnail",children:"◆"}),(0,b.jsx)("div",{className:"wave-thumbnail-label",children:"SKILL"})]}),(0,b.jsx)("div",{className:"wave-column wave-column-right",children:e.map((a,c)=>(0,b.jsx)("span",{className:"animated-text",children:a.right},c))})]}),(0,b.jsx)("div",{className:"wave-spacer"}),(0,b.jsx)("div",{style:{maxWidth:1100,margin:"0 auto",padding:"0 2rem 6rem"},children:(0,b.jsxs)("div",{style:{borderTop:"1px solid #1a1a1a",paddingTop:"2.5rem"},children:[(0,b.jsx)("p",{style:{fontFamily:"var(--mono)",fontSize:10,color:"#2a2a2a",letterSpacing:"0.18em",marginBottom:"1rem"},children:"// DOMAINS"}),(0,b.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"0.5rem"},children:f.map(a=>(0,b.jsx)("span",{className:"skill-tag",children:a},a))})]})})]})]})}])},46756,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_gsap_index_1ux5xn8.js","server/chunks/ssr/node_modules_gsap_index_0pqgy-j.js"].map(b=>a.l(b))).then(()=>b(77488)))},22714,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_gsap_ScrollTrigger_1zboij_.js"].map(b=>a.l(b))).then(()=>b(81783)))}];

//# sourceMappingURL=_07f_rag._.js.map