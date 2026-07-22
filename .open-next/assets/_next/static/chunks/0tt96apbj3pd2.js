(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,65142,e=>{"use strict";var a=e.i(43476),t=e.i(71645),l=e.i(2971);let i=[{icon:"◈",name:"CUSTOM PRINTS",desc:"Got an STL? Send it over. We print anything you design — household objects, replacement parts, artistic pieces, personalised gifts.",tags:["ANY STL","MULTI-COLOUR","POST-PROCESS"]},{icon:"⬡",name:"PROTOTYPES",desc:"Rapid prototyping for engineers, designers, and entrepreneurs. Functional mockups, fit-and-form testing, and iterative production runs.",tags:["FAST TURNAROUND","FUNCTIONAL","ITERATIVE"]},{icon:"⚔",name:"COSPLAY PROPS",desc:"Armour, weapons, accessories, helmets — built to your specs. Large-format multi-colour printing available, post-processing and painting on request.",tags:["MULTI-COLOUR","PAINTABLE","WEARABLE"]},{icon:"▦",name:"MECHANICAL PARTS",desc:"Brackets, enclosures, gears, jigs, and fixtures. Printed in engineering-grade materials built for real-world tolerances.",tags:["PETG / ABS","TIGHT TOLERANCE","FUNCTIONAL"]},{icon:"◉",name:"MINIATURES",desc:"High-detail FDM miniatures and figurines with fine layer resolution. Perfect for tabletop pieces, scale models, and display figures.",tags:["HIGH DETAIL","0.05MM LAYERS","DISPLAY GRADE"]},{icon:"✦",name:"DESIGN HELP",desc:"No model? No problem. Describe what you need and we'll model it for you — from a sketch, photo, or written brief.",tags:["CAD MODELLING","FROM SKETCH","PRINT-READY"]}],s=[{name:"PLA",desc:"Best all-rounder for display models, prototypes, and decorative pieces. Easy to post-process and paint. Available in 16 colours.",props:["EASY FINISH","RIGID","BIODEGRADABLE","16 COLOURS"]},{name:"PETG",desc:"Durable and slightly flexible. Ideal for functional parts needing impact resistance and light moisture exposure.",props:["IMPACT RESISTANT","MOISTURE RESISTANT","FUNCTIONAL"]},{name:"ABS",desc:"Heat-resistant and strong. Standard for mechanical and automotive parts that need to endure stress and elevated temperatures.",props:["HEAT RESISTANT","MACHINABLE","TOUGH"]},{name:"ASA",desc:"UV and weather resistant. Built for outdoor use — signage, enclosures, anything that lives in the sun.",props:["UV STABLE","OUTDOOR SAFE","CHEMICAL RESISTANT"]}],n=[["PRINTER","Bambu Lab A1"],["BUILD VOLUME","256 × 256 × 256 MM"],["MIN LAYER HEIGHT","0.05 MM"],["MAX LAYER HEIGHT","0.35 MM"],["MULTI-COLOUR","UP TO 4 COLOURS (AMS LITE)"],["NOZZLE","0.4 MM (0.2 / 0.6 / 0.8 AVAILABLE)"],["TYPICAL SPEED","UP TO 500 MM/S"],["TURNAROUND","2–5 BUSINESS DAYS"],["FILE FORMATS","STL · OBJ · STEP · 3MF"],["POST PROCESSING","SANDING · PAINTING · ASSEMBLY"]],r=[{num:"01",title:"SEND YOUR FILE",desc:"Email us your STL, OBJ, or STEP file along with your requirements. No file yet? Just describe what you need."},{num:"02",title:"WE ASSESS",desc:"We check your model for printability, suggest material and colour options, and reply with a quote within 24 hours."},{num:"03",title:"CONFIRM & PAY",desc:"Approve the quote, confirm material and colour, and we get it into the print queue immediately."},{num:"04",title:"RECEIVE YOUR PART",desc:"Printed, post-processed, and shipped or available for pickup. Most orders ready in 2–5 business days."}];function p(){let e=(0,t.useRef)(null);return(0,t.useEffect)(()=>{let a,t=e.current;if(!t)return;let l=t.getContext("2d");if(!l)return;let i=0;function s(){t&&(t.width=t.offsetWidth,t.height=t.offsetHeight)}return s(),window.addEventListener("resize",s),!function e(){if(!t||!l)return;let{width:s,height:n}=t;l.clearRect(0,0,s,n);let r=n/28,p=.012*i;for(let e=0;e<28;e++){let a=e*r,t=Math.min(1,(i-4*e)/60);if(t<=0)continue;let n=.06+.02*Math.sin(p+.4*e);l.strokeStyle=`rgba(56,191,255,${n*t})`,l.lineWidth=1,l.beginPath();for(let t=0;t<s;t+=2){let i=a+1.5*Math.sin(.04*t+p+e);0===t?l.moveTo(t,i):l.lineTo(t,i)}l.stroke()}let o=(.4*Math.sin(.7*p)+.5)*s,c=Math.min(27,Math.floor(i/4))*r;l.beginPath(),l.arc(o,c,3,0,2*Math.PI),l.fillStyle="rgba(56,191,255,0.7)",l.fill();let d=l.createRadialGradient(o,c,0,o,c,20);d.addColorStop(0,"rgba(56,191,255,0.15)"),d.addColorStop(1,"transparent"),l.fillStyle=d,l.beginPath(),l.arc(o,c,20,0,2*Math.PI),l.fill(),++i>192&&(i=0),a=requestAnimationFrame(e)}(),()=>{cancelAnimationFrame(a),window.removeEventListener("resize",s)}},[]),(0,a.jsx)("canvas",{ref:e,style:{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.6,pointerEvents:"none"}})}e.s(["default",0,function(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("style",{children:`
        /* ── BLUE THEME OVERRIDES ── */
        .pl-hero, .pl-section, .pl-inner, .pl-email-cta,
        .pl-svc, .pl-mat, .pl-step, .pl-spec, .pl-detail,
        .pl-eyebrow, .pl-sec-label, .pl-btn-primary, .pl-mailto,
        .pl-svc-icon, .pl-mat-name, .pl-mat-prop, .pl-svc-tag,
        .pl-hero-badge, .pl-email-label, .pl-email-addr,
        .pl-template-line .key, .pl-detail-dot,
        .pl-step-num, .pl-step::after, .pl-spec-label {
          --pl-accent:       #38bfff;
          --pl-accent-dim:   rgba(56,191,255,0.3);
          --pl-accent-faint: rgba(56,191,255,0.07);
        }
        .pl-hero {
          position: relative; z-index: 1; min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: flex-start; justify-content: center;
          padding: clamp(100px,15vw,160px) clamp(24px,6vw,80px) 80px;
          overflow: hidden;
        }
        .pl-eyebrow {
          font-family: var(--mono); font-size: 10px; color: var(--pl-accent);
          letter-spacing: 5px; margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px;
        }
        .pl-eyebrow::before { content:''; width:32px; height:1px; background:var(--pl-accent); }
        .pl-hero-title {
          font-family: var(--display);
          font-size: clamp(2.8rem, 9vw, 8rem);
          font-weight: 900; color: #fff; line-height: 0.92;
          letter-spacing: -2px; margin-bottom: 28px; position: relative; z-index: 1;
        }
        .pl-hero-title .outline {
          color: transparent; -webkit-text-stroke: 2px rgba(56,191,255,0.5);
        }
        .pl-hero-sub {
          font-family: var(--prose); font-size: clamp(14px,2vw,17px);
          color: #aaa; line-height: 1.8;
          max-width: 480px; margin-bottom: 48px; position: relative; z-index: 1;
        }
        .pl-ctas { display: flex; gap: 12px; flex-wrap: wrap; position: relative; z-index: 1; }
        .pl-btn-primary {
          font-family: var(--mono); font-size: 11px; letter-spacing: 3px;
          padding: 14px 32px; background: var(--pl-accent);
          color: #fff; border: none; cursor: pointer;
          transition: all 0.2s; text-decoration: none; display: inline-block;
        }
        .pl-btn-primary:hover { background: #0099e6; box-shadow: 0 0 24px rgba(56,191,255,0.4); }
        .pl-btn-ghost {
          font-family: var(--mono); font-size: 11px; letter-spacing: 3px;
          padding: 14px 32px; background: transparent;
          color: var(--text); border: 1px solid #2a2a2a;
          transition: all 0.2s; text-decoration: none; display: inline-block;
        }
        .pl-btn-ghost:hover { border-color: var(--pl-accent); color: var(--pl-accent); }
        .pl-hero-badge {
          position: absolute; z-index: 1;
          top: clamp(100px,18vw,160px); right: clamp(24px,6vw,80px);
          font-family: var(--mono); font-size: 10px; color: var(--pl-accent);
          letter-spacing: 3px; text-align: right;
          border: 1px solid var(--pl-accent-dim); padding: 12px 16px;
          background: var(--pl-accent-faint);
        }
        .pl-hero-badge span { display: block; font-family: var(--display); font-size: 18px; font-weight: 900; color: #fff; margin-top: 6px; letter-spacing: 2px; }

        .pl-section { position: relative; z-index: 1; border-top: 1px solid #111; }
        .pl-section.surface { background: #0d0d0d; }
        .pl-inner { max-width: 1100px; margin: 0 auto; padding: 100px clamp(24px,6vw,80px); }
        .pl-sec-label {
          font-family: var(--mono); font-size: 11px; color: var(--pl-accent);
          letter-spacing: 5px; margin-bottom: 24px;
          display: flex; align-items: center; gap: 14px;
        }
        .pl-sec-label::after { content:''; flex:1; height:1px; background:linear-gradient(90deg,var(--pl-accent-dim),transparent); }
        .pl-sec-title {
          font-family: var(--display); font-size: clamp(1.8rem,5vw,3.5rem);
          font-weight: 900; color: #fff; letter-spacing: -0.5px;
          line-height: 1; margin-bottom: 60px;
        }

        /* SERVICES */
        .pl-services {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(260px,100%), 1fr));
          gap: 1px; background: #111; border: 1px solid #111;
        }
        .pl-svc {
          background: #060606; padding: 40px 32px;
          position: relative; transition: background 0.25s; overflow: hidden;
        }
        .pl-svc::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,var(--pl-accent),transparent);
          transform:scaleX(0); transform-origin:left; transition:transform 0.3s;
        }
        .pl-svc:hover { background: rgba(56,191,255,0.04); }
        .pl-svc:hover::before { transform: scaleX(1); }
        .pl-svc-icon { font-family:var(--mono); font-size:28px; color:var(--pl-accent); margin-bottom:20px; display:block; text-shadow:0 0 16px rgba(56,191,255,0.4); }
        .pl-svc-name { font-family:var(--display); font-size:14px; font-weight:700; color:#fff; letter-spacing:2px; margin-bottom:14px; }
        .pl-svc-desc { font-family:var(--prose); font-size:14px; color:#a0a0a0; line-height:1.8; }
        .pl-svc-tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:20px; }
        .pl-svc-tag { font-family:var(--mono); font-size:9px; letter-spacing:1.5px; padding:4px 10px; border:1px solid #2a2a2a; color:#888; }

        /* PROCESS */
        .pl-process { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); border:1px solid #1a1a1a; }
        .pl-step { padding:36px 28px; border-right:1px solid #1a1a1a; position:relative; }
        .pl-step:last-child { border-right:none; }
        .pl-step::after { content:'→'; position:absolute; right:-12px; top:50%; transform:translateY(-50%); font-family:var(--mono); font-size:14px; color:var(--pl-accent-dim); z-index:2; }
        .pl-step:last-child::after { display:none; }
        .pl-step-num { font-family:var(--mono); font-size:10px; color:var(--pl-accent); letter-spacing:3px; margin-bottom:16px; }
        .pl-step-title { font-family:var(--display); font-size:14px; font-weight:700; color:#fff; letter-spacing:2px; margin-bottom:12px; }
        .pl-step-desc { font-family:var(--prose); font-size:13px; color:#a0a0a0; line-height:1.75; }

        /* MATERIALS */
        .pl-materials { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr)); gap:12px; }
        .pl-mat { border:1px solid #1a1a1a; padding:24px 20px; transition:all 0.2s; position:relative; }
        .pl-mat::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--pl-accent-dim),transparent); opacity:0; transition:opacity 0.2s; }
        .pl-mat:hover { border-color:var(--pl-accent-dim); background:var(--pl-accent-faint); }
        .pl-mat:hover::before { opacity:1; }
        .pl-mat-name { font-family:var(--display); font-size:12px; font-weight:700; color:var(--pl-accent); letter-spacing:2px; margin-bottom:8px; }
        .pl-mat-desc { font-family:var(--prose); font-size:13px; color:#a0a0a0; line-height:1.7; }
        .pl-mat-props { margin-top:14px; display:flex; flex-wrap:wrap; gap:5px; }
        .pl-mat-prop { font-family:var(--mono); font-size:9px; letter-spacing:1px; padding:3px 8px; background:var(--pl-accent-faint); border:1px solid var(--pl-accent-dim); color:rgba(56,191,255,0.6); }

        /* SPECS */
        .pl-specs { display:grid; grid-template-columns:1fr 1fr; border:1px solid #1a1a1a; max-width:700px; }
        .pl-spec { display:flex; justify-content:space-between; align-items:center; padding:16px 24px; border-bottom:1px solid #111; border-right:1px solid #111; gap:16px; flex-wrap:wrap; }
        .pl-spec:nth-child(even) { border-right:none; }
        .pl-spec:nth-last-child(-n+2) { border-bottom:none; }
        .pl-spec-label { font-family:var(--mono); font-size:10px; color:#777; letter-spacing:2px; }
        .pl-spec-val   { font-family:var(--mono); font-size:11px; color:#e0e0e0; letter-spacing:1px; text-align:right; }

        /* CONTACT */
        .pl-contact-wrap {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
        }
        .pl-contact-p { font-family:var(--prose); font-size:15px; color:#aaa; line-height:1.85; margin-bottom:32px; }
        .pl-contact-details { display:flex; flex-direction:column; gap:16px; }
        .pl-detail { display:flex; align-items:flex-start; gap:14px; font-family:var(--mono); font-size:11px; color:#999; letter-spacing:1px; }
        .pl-detail-dot { width:6px; height:6px; border-radius:50%; background:var(--pl-accent); flex-shrink:0; margin-top:4px; }

        /* Email CTA */
        .pl-email-cta {
          border: 1px solid var(--pl-accent-dim);
          background: var(--pl-accent-faint);
          padding: 40px; position: relative;
        }
        .pl-email-cta::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,var(--pl-accent),transparent);
        }
        .pl-email-label { font-family:var(--mono); font-size:11px; color:#38bfff; letter-spacing:4px; margin-bottom:16px; }
        .pl-email-addr {
          font-family:var(--display); font-size:clamp(14px,2.5vw,22px); font-weight:900;
          color:#fff; letter-spacing:2px; margin-bottom:20px; word-break:break-all;
        }
        .pl-email-sub { font-family:var(--prose); font-size:13px; color:#aaa; line-height:1.7; margin-bottom:28px; }
        .pl-email-template {
          background: #0a0a0a; border: 1px solid #222;
          padding: 20px 24px; margin-bottom: 28px;
        }
        .pl-email-template-label { font-family:var(--mono); font-size:9px; color:var(--text-dim); letter-spacing:3px; margin-bottom:12px; }
        .pl-template-line { font-family:var(--mono); font-size:11px; color:#888; line-height:2.2; letter-spacing:0.5px; }
        .pl-template-line .key { color:var(--pl-accent); }
        .pl-mailto {
          display:inline-flex; align-items:center; gap:10px;
          font-family:var(--mono); font-size:11px; letter-spacing:3px;
          padding:14px 28px; background:var(--pl-accent);
          color:#fff; text-decoration:none; transition:all 0.2s;
        }
        .pl-mailto:hover { background:#0099e6; box-shadow:0 0 24px rgba(56,191,255,0.4); }

        /* MOBILE */
        @media (max-width: 768px) {
          .pl-hero-badge { display:none; }
          .pl-contact-wrap { grid-template-columns:1fr; gap:40px; }
          .pl-process { grid-template-columns:1fr; }
          .pl-step { border-right:none; border-bottom:1px solid #1a1a1a; }
          .pl-step::after { content:'↓'; right:auto; left:50%; top:auto; bottom:-14px; transform:translateX(-50%); }
          .pl-step:last-child::after { display:none; }
          .pl-specs { grid-template-columns:1fr; }
          .pl-spec { border-right:none; }
          .pl-spec:nth-last-child(-n+2) { border-bottom:1px solid #111; }
          .pl-spec:last-child { border-bottom:none; }
        }
      `}),(0,a.jsx)(l.default,{}),(0,a.jsxs)("section",{className:"pl-hero",children:[(0,a.jsx)(p,{}),(0,a.jsx)("div",{className:"pl-eyebrow",children:"// BAMBU LAB A1 · PRECISION FDM PRINTING"}),(0,a.jsxs)("h1",{className:"pl-hero-title",children:["WE PRINT",(0,a.jsx)("br",{}),"WHAT YOU",(0,a.jsx)("br",{}),(0,a.jsx)("span",{className:"outline",children:"IMAGINE."})]}),(0,a.jsx)("p",{className:"pl-hero-sub",children:"Custom 3D printing for prototypes, mechanical parts, miniatures, cosplay props, and everything in between. Powered by the Bambu Lab A1 with multi-colour AMS Lite support."}),(0,a.jsxs)("div",{className:"pl-ctas",children:[(0,a.jsx)("a",{href:"#contact",className:"pl-btn-primary",children:"GET A QUOTE"}),(0,a.jsx)("a",{href:"#services",className:"pl-btn-ghost",children:"VIEW SERVICES"})]}),(0,a.jsxs)("div",{className:"pl-hero-badge",children:["POWERED BY",(0,a.jsx)("span",{children:"BAMBU A1"})]})]}),(0,a.jsx)("section",{id:"services",className:"pl-section",children:(0,a.jsxs)("div",{className:"pl-inner",children:[(0,a.jsx)("div",{className:"pl-sec-label",children:"// WHAT WE DO"}),(0,a.jsx)("h2",{className:"pl-sec-title",children:"SERVICES"}),(0,a.jsx)("div",{className:"pl-services",children:i.map(e=>(0,a.jsxs)("div",{className:"pl-svc",children:[(0,a.jsx)("span",{className:"pl-svc-icon",children:e.icon}),(0,a.jsx)("div",{className:"pl-svc-name",children:e.name}),(0,a.jsx)("p",{className:"pl-svc-desc",children:e.desc}),(0,a.jsx)("div",{className:"pl-svc-tags",children:e.tags.map(e=>(0,a.jsx)("span",{className:"pl-svc-tag",children:e},e))})]},e.name))})]})}),(0,a.jsx)("section",{id:"process",className:"pl-section surface",children:(0,a.jsxs)("div",{className:"pl-inner",children:[(0,a.jsx)("div",{className:"pl-sec-label",children:"// HOW IT WORKS"}),(0,a.jsx)("h2",{className:"pl-sec-title",children:"PROCESS"}),(0,a.jsx)("div",{className:"pl-process",children:r.map(e=>(0,a.jsxs)("div",{className:"pl-step",children:[(0,a.jsx)("div",{className:"pl-step-num",children:e.num}),(0,a.jsx)("div",{className:"pl-step-title",children:e.title}),(0,a.jsx)("p",{className:"pl-step-desc",children:e.desc})]},e.num))})]})}),(0,a.jsx)("section",{id:"materials",className:"pl-section",children:(0,a.jsxs)("div",{className:"pl-inner",children:[(0,a.jsx)("div",{className:"pl-sec-label",children:"// WHAT WE PRINT WITH"}),(0,a.jsx)("h2",{className:"pl-sec-title",children:"MATERIALS"}),(0,a.jsx)("div",{className:"pl-materials",children:s.map(e=>(0,a.jsxs)("div",{className:"pl-mat",children:[(0,a.jsx)("div",{className:"pl-mat-name",children:e.name}),(0,a.jsx)("p",{className:"pl-mat-desc",children:e.desc}),(0,a.jsx)("div",{className:"pl-mat-props",children:e.props.map(e=>(0,a.jsx)("span",{className:"pl-mat-prop",children:e},e))})]},e.name))})]})}),(0,a.jsx)("section",{id:"specs",className:"pl-section surface",children:(0,a.jsxs)("div",{className:"pl-inner",children:[(0,a.jsx)("div",{className:"pl-sec-label",children:"// MACHINE CAPABILITIES"}),(0,a.jsx)("h2",{className:"pl-sec-title",children:"BUILD SPECS"}),(0,a.jsx)("div",{className:"pl-specs",children:n.map(([e,t])=>(0,a.jsxs)("div",{className:"pl-spec",children:[(0,a.jsx)("span",{className:"pl-spec-label",children:e}),(0,a.jsx)("span",{className:"pl-spec-val",children:t})]},e))})]})}),(0,a.jsx)("section",{id:"contact",className:"pl-section",children:(0,a.jsxs)("div",{className:"pl-inner",children:[(0,a.jsx)("div",{className:"pl-sec-label",children:"// GET IN TOUCH"}),(0,a.jsx)("h2",{className:"pl-sec-title",children:"REQUEST A QUOTE"}),(0,a.jsxs)("div",{className:"pl-contact-wrap",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("p",{className:"pl-contact-p",children:"Send us an email with your project details and we will get back with a quote within 24 hours. Include your file if you have one — no file yet, no problem, just describe what you need."}),(0,a.jsx)("div",{className:"pl-contact-details",children:["Quotes returned within 24 hours","No minimum order quantity","File review and printability check included","Pickup or shipping available","Bulk order discounts available","Up to 4-colour prints with AMS Lite"].map(e=>(0,a.jsxs)("div",{className:"pl-detail",children:[(0,a.jsx)("div",{className:"pl-detail-dot"}),e]},e))})]}),(0,a.jsxs)("div",{className:"pl-email-cta",children:[(0,a.jsx)("div",{className:"pl-email-label",children:"// CONTACT"}),(0,a.jsx)("div",{className:"pl-email-addr",children:"masked@maskedhelp.com"}),(0,a.jsx)("p",{className:"pl-email-sub",children:"Click the button below to open your email client with a pre-filled subject line — or just copy the address and send from anywhere."}),(0,a.jsxs)("div",{className:"pl-email-template",children:[(0,a.jsx)("div",{className:"pl-email-template-label",children:"// INCLUDE IN YOUR EMAIL"}),(0,a.jsxs)("div",{className:"pl-template-line",children:[(0,a.jsx)("span",{className:"key",children:"SUBJECT:"})," 3D Print Quote — [brief description]"]}),(0,a.jsxs)("div",{className:"pl-template-line",children:[(0,a.jsx)("span",{className:"key",children:"SERVICE:"})," Custom Print / Prototype / Cosplay / etc."]}),(0,a.jsxs)("div",{className:"pl-template-line",children:[(0,a.jsx)("span",{className:"key",children:"MATERIAL:"})," PLA / PETG / ABS / ASA / unsure"]}),(0,a.jsxs)("div",{className:"pl-template-line",children:[(0,a.jsx)("span",{className:"key",children:"COLOUR:"})," Your preferred colour(s)"]}),(0,a.jsxs)("div",{className:"pl-template-line",children:[(0,a.jsx)("span",{className:"key",children:"QUANTITY:"})," How many pieces"]}),(0,a.jsxs)("div",{className:"pl-template-line",children:[(0,a.jsx)("span",{className:"key",children:"FILE:"})," Attach STL / OBJ / STEP or describe"]})]}),(0,a.jsx)("a",{href:"mailto:masked@maskedhelp.com?subject=3D%20Print%20Quote%20%E2%80%94%20&body=SERVICE%3A%20%0AMATERIAL%3A%20%0AQUANTITY%3A%20%0ADESCRIPTION%3A%20%0A%0AFILE%20ATTACHED%20OR%20LINK%3A%20",className:"pl-mailto",children:"✉ OPEN EMAIL CLIENT →"})]})]})]})})]})}])}]);