module.exports=[12002,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(26304),e=a.i(81783);let f=[{idx:"01",type:"WORK",role:"RESEARCH INTERN",org:"AMEYA SONIC OPTEO SYSTEMS",orgUrl:"https://ameyasonicopteosystem.com",period:"2026 — PRESENT",year:"2026",mode:"ON-SITE",location:"INDIA",tags:["RESEARCH","SYSTEMS","ON-SITE"],description:"Contributing to R&D in advanced systems engineering at Ameya Sonic Opteo Systems. Working on applied technical projects within a specialised engineering environment.",skills:[]},{idx:"02",type:"WORK",role:"LEAD DEVELOPER INTERN",org:"INDCASTING.COM",orgUrl:"https://indcasting.com",period:"2025 — 2026",year:"2025",mode:"REMOTE",location:"INDIA",tags:["MANUFACTURING","REMOTE","CONTRACT"],description:"Gained hands-on exposure to industrial workflows at IndCasting.com, a platform in the casting and manufacturing industry. Contributed to technical development work.",skills:[]},{idx:"03",type:"WORK",role:"TECHNOLOGY INTERN",org:"KARVY INNOTECH LTD.",orgUrl:"https://www.linkedin.com/company/karvy-innotech-ltd/",period:"DEC 2025 — APR 2026",year:"2025",mode:"HYBRID",location:"INDIA",tags:["FINTECH","HYBRID","5 MONTHS"],description:"Worked as a technology intern at Karvy Innotech, one of India's leading financial technology firms. Contributed to internal tooling and software development.",skills:[]},{idx:"04",type:"EDUCATION",role:"B.TECH — ARTIFICIAL INTELLIGENCE",org:"AMITY UNIVERSITY, NOIDA",orgUrl:"https://www.linkedin.com/school/amity-university/",period:"SEP 2024 — SEP 2028",year:"2024",mode:"ON-CAMPUS",location:"NOIDA, INDIA",tags:["AI","COMPUTER SCIENCE","4 YEARS"],description:"Pursuing a Bachelor of Technology in Artificial Intelligence. Core subjects span machine learning, computer vision, NLP, robotics, embedded systems, and full-stack development.",skills:["MACHINE LEARNING","COMPUTER VISION","NLP","ROBOTICS","FULL-STACK"]}],g="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&";function h({item:a,index:e}){let[f,i]=(0,c.useState)(!1),j=(0,c.useRef)(null),k=(0,c.useRef)(null),{display:l,scramble:m}=function(a){let[b,d]=(0,c.useState)(a),e=(0,c.useRef)(0),f=(0,c.useRef)(0),h=(0,c.useCallback)(()=>{cancelAnimationFrame(e.current),f.current=0;let b=()=>{d(a.split("").map((a,b)=>" "===a||"."===a||"-"===a||"—"===a||b<f.current?a:g[Math.floor(Math.random()*g.length)]).join("")),f.current+=.09,f.current<a.length?e.current=requestAnimationFrame(b):d(a)};e.current=requestAnimationFrame(b)},[a]);return(0,c.useEffect)(()=>()=>cancelAnimationFrame(e.current),[]),{display:b,scramble:h}}(a.role);(0,c.useEffect)(()=>{let a=j.current;a&&(f?d.default.fromTo(a,{height:0,opacity:0},{height:"auto",opacity:1,duration:.55,ease:"power3.inOut"}):d.default.to(a,{height:0,opacity:0,duration:.4,ease:"power3.inOut"}))},[f]),(0,c.useEffect)(()=>{k.current&&d.default.fromTo(k.current,{x:-40,opacity:0},{x:0,opacity:1,duration:.7,ease:"power3.out",scrollTrigger:{trigger:k.current,start:"top 90%",toggleActions:"play none none none"},delay:.07*e})},[e]);let n="EDUCATION"===a.type;return(0,b.jsxs)("div",{ref:k,className:`row ${f?"row-open":""}`,style:{opacity:0},children:[(0,b.jsxs)("div",{className:"row-header",onClick:()=>i(a=>!a),onMouseEnter:m,children:[(0,b.jsx)("span",{className:"row-idx",children:a.idx}),(0,b.jsx)("span",{className:`row-type ${n?"row-type-edu":""}`,children:a.type}),(0,b.jsx)("span",{className:"row-role",children:f?a.role:l}),(0,b.jsx)("span",{className:"row-org",children:a.org}),(0,b.jsx)("span",{className:"row-year",children:a.year}),(0,b.jsx)("span",{className:`row-icon ${f?"row-icon-open":""}`,children:(0,b.jsxs)("svg",{width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:[(0,b.jsx)("line",{x1:"7",y1:"1",x2:"7",y2:"13",stroke:"currentColor",strokeWidth:"1.5",className:"row-plus-v"}),(0,b.jsx)("line",{x1:"1",y1:"7",x2:"13",y2:"7",stroke:"currentColor",strokeWidth:"1.5"})]})})]}),(0,b.jsx)("div",{ref:j,className:"row-body",style:{height:0,overflow:"hidden",opacity:0},children:(0,b.jsxs)("div",{className:"row-body-inner",children:[(0,b.jsxs)("div",{className:"row-meta",children:[(0,b.jsxs)("div",{className:"row-meta-block",children:[(0,b.jsx)("span",{className:"row-meta-label",children:"// PERIOD"}),(0,b.jsx)("span",{className:"row-meta-val",children:a.period})]}),(0,b.jsxs)("div",{className:"row-meta-block",children:[(0,b.jsx)("span",{className:"row-meta-label",children:"// MODE"}),(0,b.jsx)("span",{className:"row-meta-val",children:a.mode})]}),(0,b.jsxs)("div",{className:"row-meta-block",children:[(0,b.jsx)("span",{className:"row-meta-label",children:"// LOCATION"}),(0,b.jsx)("span",{className:"row-meta-val",children:a.location})]}),(0,b.jsx)("a",{href:a.orgUrl,target:"_blank",rel:"noopener noreferrer",className:"row-org-link",onClick:a=>a.stopPropagation(),children:"VIEW ORG ↗"})]}),(0,b.jsxs)("div",{className:"row-desc-col",children:[(0,b.jsx)("p",{className:"row-desc",children:a.description}),a.skills.length>0&&(0,b.jsx)("div",{className:"row-skills",children:a.skills.map(a=>(0,b.jsx)("span",{className:"row-skill",children:a},a))})]}),(0,b.jsx)("div",{className:"row-tags-col",children:a.tags.map(a=>(0,b.jsx)("span",{className:"row-tag",children:a},a))})]})})]})}function i({val:a}){let f=(0,c.useRef)(null),g=parseInt(a.replace(/\D/g,""))||0;return(0,c.useEffect)(()=>{if(!f.current||0===g)return;let b=f.current;e.ScrollTrigger.create({trigger:b,start:"top 90%",once:!0,onEnter:()=>{d.default.fromTo({v:0},{v:g},{duration:1.6,ease:"power2.out",onUpdate:function(){b.textContent=Math.round(this.targets()[0].v)+(a.includes("+")?"+":"")}})}})},[g,a]),(0,b.jsx)("span",{ref:f,children:a})}a.s(["default",0,function(){let g=(0,c.useRef)(null),j=(0,c.useRef)(null),k=(0,c.useRef)(null);d.default.registerPlugin(e.ScrollTrigger),(0,c.useEffect)(()=>{let b;return a.A(51278).then(({default:a})=>{(b=new a({lerp:.08,wheelMultiplier:1.2})).on("scroll",e.ScrollTrigger.update),d.default.ticker.add(a=>b.raf(1e3*a)),d.default.ticker.lagSmoothing(0)}),()=>b?.destroy()},[]),(0,c.useEffect)(()=>{if(!j.current)return;let a=j.current.querySelectorAll(".t-char");d.default.fromTo(a,{clipPath:"inset(0 0 100% 0)",y:20},{clipPath:"inset(0 0 0% 0)",y:0,duration:1,ease:"power4.out",stagger:.04,delay:.1})},[]),(0,c.useEffect)(()=>{if(!k.current)return;let a=k.current.querySelector(".mq-inner");a&&d.default.to(a,{xPercent:-50,duration:22,ease:"none",repeat:-1}),e.ScrollTrigger.create({trigger:k.current,start:"top 90%",onEnter:()=>d.default.to(k.current,{opacity:1,duration:.6})})},[]);let l="EXPERIENCE";return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
        /* ── PAGE ── */
        .xp-page {
          min-height: 100vh;
          padding: 140px 0 8rem;
          position: relative;
        }

        /* ── HERO ── */
        .xp-hero {
          padding: 0 2.5rem 3rem;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: end;
          gap: 2rem;
        }
        .xp-eyebrow {
          font-family: var(--mono);
          font-size: 12px;
          color: #55dff7;
          letter-spacing: 0.25em;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .xp-eyebrow::before {
          content: '';
          width: 24px; height: 1px;
          background: #e63329;
        }
        .xp-title {
          font-family: var(--display);
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 0.88;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
        }
        .t-char {
          display: inline-block;
          will-change: clip-path, transform;
        }
        .t-char-accent { color: #e63329; }

        /* Right — vertical stats */
        .xp-hero-stats {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid #1a1a1a;
          align-self: end;
          margin-bottom: 0.2rem;
        }
        .xp-stat {
          padding: 14px 24px;
          border-bottom: 1px solid #1a1a1a;
          position: relative;
        }
        .xp-stat:last-child { border-bottom: none; }
        .xp-stat::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: #e63329;
        }
        .xp-stat-n {
          font-family: var(--display);
          font-size: 1.6rem;
          font-weight: 900;
          color: #e63329;
          line-height: 1;
        }
        .xp-stat-l {
          font-family: var(--mono);
          font-size: 11px;
          color: #55dff7;
          letter-spacing: 0.18em;
          margin-top: 4px;
        }

        /* ── MARQUEE ── */
        .xp-mq {
          border-top: 1px solid #111;
          border-bottom: 1px solid #111;
          padding: 10px 0;
          overflow: hidden;
          opacity: 0;
          margin-bottom: 0;
        }
        .mq-inner {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .mq-text {
          font-family: var(--mono);
          font-size: 11px;
          color: #555;
          letter-spacing: 0.25em;
          white-space: nowrap;
          padding-right: 4rem;
        }
        .mq-text .mq-hl { color: #e63329; }

        /* ── TABLE HEADER ── */
        .xp-table-head {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 48px 100px 1fr 200px 60px 36px;
          gap: 0;
          padding: 10px 2.5rem;
          border-bottom: 1px solid #1a1a1a;
        }
        .xp-th {
          font-family: var(--mono);
          font-size: 11px;
          color: #55dff7;
          letter-spacing: 0.2em;
        }

        /* ── ROW ── */
        .row {
          max-width: 1200px;
          margin: 0 auto;
          border-bottom: 1px solid #141414;
          transition: border-color 0.2s;
        }
        .row:hover, .row.row-open {
          border-color: #252525;
        }

        .row-header {
          display: grid;
          grid-template-columns: 48px 100px 1fr 200px 60px 36px;
          gap: 0;
          align-items: center;
          padding: 30px 2.5rem;
          cursor: pointer;
          transition: background 0.2s;
          user-select: none;
        }
        .row-header:hover { background: rgba(255,255,255,0.02); }
        .row-open .row-header { background: rgba(230,51,41,0.03); }

        .row-idx {
          font-family: var(--mono);
          font-size: 13px;
          color: #55dff7;
          letter-spacing: 0.15em;
        }
        .row-open .row-idx { color: #e63329; }

        .row-type {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.12em;
          color: #55dff7;
          border: 1px solid rgba(124,58,237,0.35);
          padding: 4px 10px;
          width: fit-content;
          transition: all 0.2s;
        }
        .row-type-edu {
          color: #55dff7;
          border-color: rgba(124,58,237,0.35);
        }
        .row-open .row-type {
          color: #e63329;
          border-color: rgba(230,51,41,0.3);
        }

        .row-role {
          font-family: var(--display);
          font-size: clamp(0.9rem, 1.5vw, 1.15rem);
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.02em;
          transition: color 0.2s;
          padding-right: 1rem;
        }
        .row-header:hover .row-role,
        .row-open .row-role { color: #e63329; }

        .row-org {
          font-family: var(--mono);
          font-size: 13px;
          color: #55dff7;
          letter-spacing: 0.06em;
          padding-right: 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s;
        }
        .row-header:hover .row-org { color: #55dff7; }

        .row-year {
          font-family: var(--mono);
          font-size: 14px;
          color: #55dff7;
          letter-spacing: 0.1em;
        }
        .row-open .row-year { color: #55dff7; }

        .row-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #55dff7;
          transition: transform 0.4s ease, color 0.2s;
        }
        .row-icon-open {
          transform: rotate(45deg);
          color: #e63329;
        }
        .row-plus-v {
          transition: transform 0.4s ease;
          transform-origin: center;
        }
        .row-icon-open .row-plus-v {
          transform: rotate(90deg);
        }

        /* ── EXPANDED BODY ── */
        .row-body { overflow: hidden; }
        .row-body-inner {
          display: grid;
          grid-template-columns: 200px 1fr 160px;
          gap: 0;
          padding: 0 2.5rem 3rem calc(2.5rem + 48px + 100px);
          border-top: 1px solid #111;
        }

        .row-meta {
          padding: 1.5rem 1.5rem 0 0;
          border-right: 1px solid #111;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .row-meta-block { display: flex; flex-direction: column; gap: 3px; }
        .row-meta-label {
          font-family: var(--mono);
          font-size: 12px;
          color: #e63329;
          letter-spacing: 0.2em;
        }
        .row-meta-val {
          font-family: var(--mono);
          font-size: 14px;
          color: #fff;
          letter-spacing: 0.08em;
        }
        .row-org-link {
          font-family: var(--mono);
          font-size: 12px;
          color: #e63329;
          letter-spacing: 0.15em;
          text-decoration: none;
          margin-top: auto;
          padding-top: 0.5rem;
          transition: color 0.2s;
        }
        .row-org-link:hover { color: #fff; }

        .row-desc-col {
          padding: 1.5rem 2rem 0;
        }
        .row-desc {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          color: #e8e8e8;
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }
        .row-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .row-skill {
          font-family: var(--mono);
          font-size: 12px;
          color: #e63329;
          border: 1px solid rgba(230,51,41,0.25);
          background: rgba(230,51,41,0.04);
          padding: 5px 12px;
          letter-spacing: 0.1em;
        }

        .row-tags-col {
          padding: 1.5rem 0 0 1.5rem;
          border-left: 1px solid #111;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
        }
        .row-tag {
          font-family: var(--mono);
          font-size: 12px;
          color: #e63329;
          border: 1px solid rgba(230,51,41,0.25);
          padding: 5px 12px;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        /* ── FOOTER COUNT ── */
        .xp-foot {
          max-width: 1200px;
          margin: 3rem auto 0;
          padding: 1.5rem 2.5rem;
          border-top: 1px solid #111;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .xp-foot-label {
          font-family: var(--mono);
          font-size: 12px;
          color: #55dff7;
          letter-spacing: 0.2em;
        }
        .xp-foot-count {
          font-family: var(--display);
          font-size: 0.9rem;
          font-weight: 700;
          color: #55dff7;
          letter-spacing: 0.1em;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .xp-page { padding: 120px 0 5rem; }
          .xp-hero { grid-template-columns: 1fr; padding: 0 1rem 2rem; }
          .xp-hero-stats { flex-direction: row; }
          .xp-stat { flex: 1; }
          .xp-title { font-size: clamp(2.8rem, 14vw, 5rem); }
          .xp-table-head { display: none; }
          .row-header {
            grid-template-columns: 36px 1fr 50px 28px;
            padding: 16px 1rem;
          }
          .row-type { display: none; }
          .row-org  { display: none; }
          .row-body-inner {
            grid-template-columns: 1fr;
            padding: 0 1rem 1.5rem 1rem;
          }
          .row-meta { border-right: none; border-bottom: 1px solid #111; padding-bottom: 1rem; }
          .row-desc-col { padding: 1rem 0 0; }
          .row-tags-col { border-left: none; border-top: 1px solid #111; padding: 1rem 0 0; flex-direction: row; flex-wrap: wrap; }
          .xp-foot { padding: 1.5rem 1rem; }
        }
      `}),(0,b.jsxs)("div",{className:"xp-page",ref:g,children:[(0,b.jsxs)("div",{className:"xp-hero",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("p",{className:"xp-eyebrow",children:"MASKEDHELP // KARTHIK KUMAR // TIMELINE"}),(0,b.jsxs)("h1",{className:"xp-title",ref:j,children:[l.split("").map((a,c)=>(0,b.jsx)("span",{className:`t-char${c===l.length-1?" t-char-accent":""}`,children:a},c)),(0,b.jsx)("span",{className:"t-char t-char-accent",children:"_"})]})]}),(0,b.jsx)("div",{className:"xp-hero-stats",children:[{n:"3",l:"INTERNSHIPS"},{n:"5+",l:"MONTHS EXP"},{n:"2028",l:"GRADUATING"}].map(({n:a,l:c})=>(0,b.jsxs)("div",{className:"xp-stat",children:[(0,b.jsx)("div",{className:"xp-stat-n",children:(0,b.jsx)(i,{val:a})}),(0,b.jsx)("div",{className:"xp-stat-l",children:c})]},c))})]}),(0,b.jsx)("div",{className:"xp-mq",ref:k,children:(0,b.jsx)("div",{className:"mq-inner",children:[0,1].map(a=>(0,b.jsx)("div",{className:"mq-text",children:"WORK · EDUCATION · INTERNSHIPS · AMITY UNIVERSITY · KARVY INNOTECH · AMEYA SONIC · INDCASTING · AI · ROBOTICS · FULL STACK · ".split("·").map((a,c)=>(0,b.jsx)("span",{children:c%4==0?(0,b.jsxs)("span",{className:"mq-hl",children:[a.trim()," · "]}):`${a.trim()} \xb7 `},c))},a))})}),(0,b.jsxs)("div",{className:"xp-table-head",children:[(0,b.jsx)("span",{className:"xp-th",children:"#"}),(0,b.jsx)("span",{className:"xp-th",children:"TYPE"}),(0,b.jsx)("span",{className:"xp-th",children:"ROLE"}),(0,b.jsx)("span",{className:"xp-th",children:"ORGANISATION"}),(0,b.jsx)("span",{className:"xp-th",children:"YEAR"}),(0,b.jsx)("span",{className:"xp-th"})]}),f.map((a,c)=>(0,b.jsx)(h,{item:a,index:c},a.idx)),(0,b.jsxs)("div",{className:"xp-foot",children:[(0,b.jsx)("span",{className:"xp-foot-label",children:"// END OF TIMELINE"}),(0,b.jsxs)("span",{className:"xp-foot-count",children:[f.length," ENTRIES"]})]})]})]})}])}];

//# sourceMappingURL=src_app_experience_page_tsx_1f4tpxb._.js.map