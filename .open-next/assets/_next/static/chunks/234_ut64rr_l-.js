(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,85330,e=>{"use strict";var a=e.i(43476),s=e.i(71645),i=e.i(89970),r=e.i(83495);i.default.registerPlugin(r.ScrollTrigger);let t=[{label:"SYSTEM_OVERVIEW",title:(0,a.jsxs)(a.Fragment,{children:["HARDWARE MEETS",(0,a.jsx)("br",{}),"SOFTWARE"]}),description:"A programmable macro keypad paired with a powerful desktop configurator. Customize every key, create layers, assign macros and manage profiles in real time.",words:["17 KEYS","5 LAYERS","MACROS","PROFILES","ENCODER","CONFIGURATOR","FIRMWARE","CUSTOMIZATION"]},{label:"FEATURE_01",title:(0,a.jsxs)(a.Fragment,{children:["MULTI-LAYER",(0,a.jsx)("br",{}),"WORKFLOWS"]}),description:"Create multiple key layouts and instantly switch between task-specific configurations.",words:["LAYERS","PROFILES","WORKFLOWS","SWITCHING","PRODUCTIVITY","CUSTOMIZATION"]},{label:"FEATURE_02",title:(0,a.jsxs)(a.Fragment,{children:["MACRO",(0,a.jsx)("br",{}),"AUTOMATION"]}),description:"Assign complex sequences to a single key and automate repetitive actions.",words:["MACROS","SEQUENCES","AUTOMATION","HOTKEYS","PRODUCTIVITY","SHORTCUTS"]},{label:"FEATURE_03",title:(0,a.jsxs)(a.Fragment,{children:["ROTARY",(0,a.jsx)("br",{}),"ENCODER"]}),description:"Control volume, zoom, timeline scrubbing and application-specific actions.",words:["VOLUME","ZOOM","SCRUB","MEDIA","CONTROL","ROTATION"]},{label:"FEATURE_04",title:(0,a.jsxs)(a.Fragment,{children:["APPLICATION",(0,a.jsx)("br",{}),"PROFILES"]}),description:"Store dedicated layouts for Blender, VS Code, Photoshop and media software.",words:["BLENDER","VSCODE","PHOTOSHOP","SPOTIFY","OBS","PRESETS"]},{label:"FEATURE_05",title:(0,a.jsxs)(a.Fragment,{children:["REAL-TIME",(0,a.jsx)("br",{}),"CONFIGURATION"]}),description:"Apply changes instantly without reflashing firmware or restarting devices.",words:["LIVE","REALTIME","CONFIG","KEYMAPS","UPDATE","SYNC"]},{label:"FEATURE_06",title:(0,a.jsxs)(a.Fragment,{children:["FIRMWARE",(0,a.jsx)("br",{}),"MANAGEMENT"]}),description:"Backup, restore and update device firmware directly from the configurator.",words:["BACKUP","RESTORE","FLASH","DEVICE","FIRMWARE","MANAGEMENT"]}];function n(){return(0,a.jsx)("section",{className:"   hero-section   min-h-screen   flex   items-center   justify-center   overflow-hidden   relative   ",children:(0,a.jsxs)("div",{className:"   max-w-[1500px]   mx-auto   grid   grid-cols-2   items-center   gap-24   px-16   ",children:[(0,a.jsxs)("div",{className:"max-w-[650px]",children:[(0,a.jsxs)("div",{className:"flex items-center gap-4 mb-8",children:[(0,a.jsx)("div",{className:"w-10 h-[2px] bg-red-500"}),(0,a.jsx)("span",{className:"   font-terminal   text-red-500   uppercase   tracking-[0.35em]   text-sm   ",children:"PROJECT_V1.0 // INITIALIZED"})]}),(0,a.jsxs)("h1",{className:"   font-cyber   uppercase   crt   text-white   leading-[0.9]   tracking-tight   text-5xl   md:text-6xl   lg:text-[4.5rem]   cyber-title   ",children:["NUMPAD",(0,a.jsx)("br",{}),"CONTROLLER"]}),(0,a.jsx)("p",{className:"   font-terminal   text-gray-400   mt-10   text-xl   leading-relaxed   max-w-xl   ",children:"A programmable macro keypad featuring multi-layer support, encoder controls, custom profiles, firmware management and real-time software configuration."}),(0,a.jsx)("br",{}),(0,a.jsx)("br",{})]}),(0,a.jsxs)("div",{className:"relative flex justify-center items-center",children:[(0,a.jsx)("div",{className:"   absolute   inset-0   bg-red-600   blur-[220px]   opacity-20   rounded-full   "}),(0,a.jsx)("img",{src:"/numpad.png.jpeg",alt:"Numpad Configurator",className:"hero-image"})]})]})})}function l(e){let{feature:r,index:t}=e,n=(0,s.useRef)(null),[l,o]=(0,s.useState)(0);return(0,s.useEffect)(()=>{let e=n.current;if(!e)return;let a=e.querySelector(".feature-title"),s=e.querySelector(".feature-description"),r=e.querySelector(".feature-label");i.default.fromTo([r,a,s],{opacity:0,y:80},{opacity:1,y:0,stagger:.15,duration:1.2,ease:"power3.out",scrollTrigger:{trigger:e,start:"top 70%"}}),e.querySelectorAll(".spiral-word").forEach((e,a)=>{i.default.to(e,{rotation:a%2?8:-8,y:a%2?-30:30,duration:4+a,repeat:-1,yoyo:!0,ease:"sine.inOut"})})},[]),(0,s.useEffect)(()=>{let e=setInterval(()=>{o(e=>(e+1)%r.words.length)},1800);return()=>clearInterval(e)},[r.words.length]),(0,a.jsxs)("section",{id:0===t?"system":void 0,ref:n,className:`feature-section ${0===t?"overview-section":""}`,children:[(0,a.jsx)("div",{className:"feature-glow"}),(0,a.jsx)("div",{className:"bg-word",children:"NUMPAD"}),(0,a.jsx)("div",{className:"spiral-container",children:r.words.map((e,s)=>{let i=2*Math.PI/r.words.length*s,t=430*Math.cos(i),n=430*Math.sin(i),o=l===s;return(0,a.jsx)("div",{className:`
                spiral-word
                ${o?"active":"inactive"}
              `,style:{left:`${t}px`,top:`${n}px`,transform:"translate(-50%, -50%)",scale:o?1.35:1},children:e},e)})}),(0,a.jsxs)("div",{className:"feature-center",children:[(0,a.jsx)("div",{className:"feature-label font-terminal",children:r.label}),(0,a.jsx)("h2",{className:"   feature-title   font-cyber   transition-all   duration-500   ",children:r.title}),(0,a.jsxs)("div",{className:"feature-description font-terminal",children:[(0,a.jsx)("p",{children:r.description}),0===t&&(0,a.jsxs)("div",{className:"overview-stats",children:[(0,a.jsxs)("div",{className:"overview-card",children:[(0,a.jsx)("h3",{children:"17"}),(0,a.jsx)("span",{children:"CUSTOMISABLE KEYS"})]}),(0,a.jsxs)("div",{className:"overview-card",children:[(0,a.jsx)("h3",{children:"5"}),(0,a.jsx)("span",{children:"PROFILES INTERCHANGEABLE"})]}),(0,a.jsxs)("div",{className:"overview-card",children:[(0,a.jsx)("h3",{children:"10"}),(0,a.jsx)("span",{children:"CUSTOMIZABLE MACROS"})]})]}),(0,a.jsx)("span",{className:"   block   mt-8   text-red-500   uppercase   tracking-[0.4em]   ",children:r.words[l]})]})]})]})}function o(){return(0,s.useEffect)(()=>{let e=document.querySelector(".scroll-progress");e&&i.default.to(e,{scaleX:1,ease:"none",scrollTrigger:{scrub:!0,start:"top top",end:"bottom bottom"}})},[]),(0,a.jsxs)("div",{id:"configurator",className:"dualwave-page",children:[(0,a.jsx)("div",{className:"dualwave-grid"}),(0,a.jsx)("div",{className:"dualwave-vignette"}),(0,a.jsx)("div",{className:"scroll-progress"}),(0,a.jsx)("div",{className:"scroll-hint",children:"Scroll To Explore"}),(0,a.jsxs)("div",{className:"text-center pt-40 pb-20",children:[(0,a.jsx)("p",{className:"feature-label",children:"SOFTWARE EXPERIENCE"}),(0,a.jsx)("h2",{className:"feature-title font-cyber crt cyber-title",children:"CONFIGURATOR"}),(0,a.jsx)("p",{className:"feature-description",children:"Explore layers, macros, encoder controls, firmware management and profile workflows."})]}),t.map((e,s)=>(0,a.jsx)(l,{feature:e,index:s},s))]})}e.s(["default",0,function(){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n,{}),(0,a.jsx)(o,{}),(0,a.jsxs)("section",{className:"project-footer",children:[(0,a.jsx)("h2",{className:"project-footer-title",children:"OPEN SOURCE. OPEN TO QUESTIONS."}),(0,a.jsxs)("div",{className:"project-footer-buttons",children:[(0,a.jsx)("a",{href:"https://github.com/Maskedhelp2/desk-helper",target:"_blank",rel:"noopener noreferrer",className:"project-footer-btn",children:"GITHUB REPO →"}),(0,a.jsx)("a",{href:"/Numpad_Project_Report.pdf",target:"_blank",rel:"noopener noreferrer",className:"project-footer-btn",children:"PROJECT REPORT →"}),(0,a.jsx)("a",{href:"mailto:masked@maskedhelp.com",className:"project-footer-btn",children:"EMAIL US →"})]})]})]})}])},75181,e=>{"use strict";var a=e.i(43476),s=e.i(71645);e.s(["default",0,function(){return(0,s.useEffect)(()=>{document.title="Low-Cost 2D-to-3D LiDAR Mapping // MaskedHelp";let e=document.createElement("link");e.rel="preconnect",e.href="https://fonts.googleapis.com",document.head.appendChild(e);let a=document.createElement("link");function s(e,a,s){let i=document.createElement("canvas");i.width=i.height=e;let r=i.getContext("2d"),t=r.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);return t.addColorStop(0,a),t.addColorStop(.22,a),t.addColorStop(.55,s),t.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=t,r.fillRect(0,0,e,e),i}function i(e,a,s){let i=Math.random()*Math.PI*2,r=Math.sqrt(Math.random())*s;return{x:e+Math.cos(i)*r,y:a+Math.sin(i)*r}}return a.rel="stylesheet",a.href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700;800&display=swap",document.head.appendChild(a),!function(){let e,a,r,t,n=document.getElementById("top"),l=document.getElementById("scanCanvas"),o=l.getContext("2d"),c=[],d=null,p=[],x=[],m=[],h=[],f=0;function g(){let s,t,g,v,u,j,y,b,N,w,E,R,A,T,O,I,S,C,k;r=Math.min(window.devicePixelRatio||1,2),e=n.clientWidth,a=n.clientHeight,l.width=e*r,l.height=a*r,l.style.width=e+"px",l.style.height=a+"px",o.setTransform(r,0,0,r,0,0),s=.94*Math.min(e/320,a/640),t=(e-320*s)/2,g=(a-640*s)/2,u=(v=(e,a)=>({x:t+e*s,y:g+a*s}))(160,62),j=v(160,108),y=v(160,318),b=v(108,140),N=v(212,140),w=v(82,248),E=v(238,248),R=v(64,350),A=v(256,350),T=v(132,322),O=v(188,322),I=v(122,460),S=v(198,460),C=v(112,596),k=v(208,596),c=[{x1:j.x,y1:j.y,x2:y.x,y2:y.y,r:50*s,w:"torso"},{x1:b.x,y1:b.y,x2:w.x,y2:w.y,r:17*s},{x1:w.x,y1:w.y,x2:R.x,y2:R.y,r:13*s},{x1:N.x,y1:N.y,x2:E.x,y2:E.y,r:17*s},{x1:E.x,y1:E.y,x2:A.x,y2:A.y,r:13*s},{x1:T.x,y1:T.y,x2:I.x,y2:I.y,r:24*s},{x1:I.x,y1:I.y,x2:C.x,y2:C.y,r:17*s},{x1:O.x,y1:O.y,x2:S.x,y2:S.y,r:24*s},{x1:S.x,y1:S.y,x2:k.x,y2:k.y,r:17*s}],d={cx:u.x,cy:u.y,r:36*s},p=[{cx:v(80,610).x,cy:v(80,610).y,r:26*s},{cx:v(250,605).x,cy:v(250,605).y,r:30*s},{cx:v(160,615).x,cy:v(160,615).y,r:20*s}],function(){x=[];let s=c.map(e=>(Math.hypot(e.x2-e.x1,e.y2-e.y1)+1)*e.r),r=s.reduce((e,a)=>e+a,0);for(let e=0;e<1500;e++){let e=Math.random()*r,a=0;for(;e>s[a]&&a<s.length-1;)e-=s[a],a++;let i=c[a],t=function(e,a,s,i,r){let t=Math.random(),n=Math.random()*Math.PI*2,l=Math.sqrt(Math.random())*r;return{x:e+(s-e)*t+Math.cos(n)*l,y:a+(i-a)*t+Math.sin(n)*l}}(i.x1,i.y1,i.x2,i.y2,i.r);x.push({bx:t.x,by:t.y,phase:Math.random()*Math.PI*2,kind:"body"})}for(let e=0;e<220;e++){let e=i(d.cx,d.cy,d.r);x.push({bx:e.x,by:e.y,phase:Math.random()*Math.PI*2,kind:"body"})}for(let e=0;e<110;e++){let e=p[Math.floor(Math.random()*p.length)],a=i(e.cx,e.cy,e.r);x.push({bx:a.x,by:a.y,phase:Math.random()*Math.PI*2,kind:"debris"})}f=x.length;let t=.94*Math.min(e/320,a/640);m=function(e,a){let s=[];for(let i=0;i<e.length;i++){let r=[];for(let s=0;s<e.length;s++){if(i===s)continue;let t=e[i].x-e[s].x,n=e[i].y-e[s].y,l=Math.sqrt(t*t+n*n);l<a&&r.push({j:s,d:l})}r.sort((e,a)=>e.d-a.d);for(let e=0;e<Math.min(3,r.length);e++){let a=r[e].j;a>i&&s.push([i,a])}}return s}(x.map(e=>({x:e.bx,y:e.by})),22*t);let n=x.map((e,a)=>({i:a,y:e.by+(Math.random()-.5)*40}));n.sort((e,a)=>a.y-e.y),h=Array(f),n.forEach((e,a)=>{h[e.i]=a})}()}g(),window.addEventListener("resize",()=>{clearTimeout(t),t=setTimeout(g,200)});let v=s(20,"rgba(230,250,255,1)","rgba(130,225,255,0.95)"),u=s(20,"rgba(160,210,230,0.85)","rgba(60,130,160,0.65)"),j=performance.now();requestAnimationFrame(function s(i){requestAnimationFrame(s);let r=(i-j)/1e3,t=r%5.5,n,l=1;t<3.4?n=t/3.4:t<5?n=1:(n=1,l=1-(t-3.4-1.6)/.5);let c=(1-Math.pow(1-n,2))*f;o.clearRect(0,0,e,a);let d=x.map(e=>({x:e.bx+.8*Math.sin(.8*r+e.phase),y:e.by+.8*Math.cos(.7*r+1.3*e.phase)}));function p(e){let a=c-h[e];return a<=0?0:Math.min(1,a/14)*l}o.globalCompositeOperation="lighter",o.lineWidth=1,m.forEach(([e,a])=>{let s=p(e),i=p(a);s<=0||i<=0||(o.strokeStyle="rgba(80,180,210,"+.32*Math.min(s,i)+")",o.beginPath(),o.moveTo(d[e].x,d[e].y),o.lineTo(d[a].x,d[a].y),o.stroke())}),x.forEach((e,a)=>{let s=p(a);if(s<=0)return;let i="debris"===e.kind?u:v,r=("debris"===e.kind?1.4:1.7)*(.5+.5*s);o.globalAlpha=s,o.drawImage(i,d[a].x-r,d[a].y-r,2*r,2*r)}),o.globalAlpha=1,o.globalCompositeOperation="source-over"})}(),()=>{document.head.removeChild(e),document.head.removeChild(a)}},[]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("style",{children:`

  :root{
    --black:#05080b;
    --panel:rgba(16,22,28,0.55);
    --panel-border:rgba(61,219,255,0.16);
    --cyan:#3ddbff;
    --cyan-dim:#0ea5c8;
    --blue-deep:#08283a;
    --white:#eef6fa;
    --muted:#7f93a0;
    --muted-dim:#4d5d66;
    --mono:'JetBrains Mono', monospace;
    --sans:'Inter', sans-serif;
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{
    background:var(--black);
    color:var(--white);
    font-family:var(--sans);
    overflow-x:hidden;
    -webkit-font-smoothing:antialiased;
  }
  ::selection{background:var(--cyan);color:#000;}

  .grain{
    position:fixed; inset:0; pointer-events:none; z-index:999;
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    opacity:0.5;
  }

  .scanlines{
    position:fixed; inset:0; pointer-events:none; z-index:998;
    background:repeating-linear-gradient(0deg, rgba(61,219,255,0.018) 0px, rgba(61,219,255,0.018) 1px, transparent 1px, transparent 3px);
  }

  /* ---------- NAV ---------- */
  nav{
    position:fixed; top:0; left:0; right:0; z-index:200;
    display:flex; align-items:center; justify-content:space-between;
    padding:22px 5%;
    background:linear-gradient(to bottom, rgba(5,8,11,0.9), transparent);
    backdrop-filter:blur(6px);
  }
  .logo{
    font-family:var(--mono); font-weight:800; font-size:15px; letter-spacing:2px;
    display:flex; align-items:center; gap:10px;
  }
  .logo .dot{width:8px;height:8px;border-radius:50%;background:var(--cyan);box-shadow:0 0 12px var(--cyan);animation:pulse 2s infinite;}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.35;}}
  .navlinks{display:flex;gap:36px;font-family:var(--mono);font-size:11px;letter-spacing:1.5px;color:var(--muted);}
  .navlinks a{color:var(--muted);text-decoration:none;transition:color .25s;}
  .navlinks a:hover{color:var(--cyan);}
  .navtag{font-family:var(--mono);font-size:11px;color:var(--muted-dim);letter-spacing:1.5px;}
  @media (max-width:860px){.navlinks{display:none;}}

  /* ---------- HERO ---------- */
  .hero{
    position:relative; height:100vh; min-height:680px;
    display:flex; flex-direction:column; justify-content:center;
    padding:0 5%;
    border-bottom:1px solid var(--panel-border);
  }
  #scanCanvas{position:absolute;inset:0;width:100%;height:100%;z-index:0;}
  .hero-overlay{position:relative;z-index:2;pointer-events:none;}
  .hero-eyebrow{
    font-family:var(--mono); font-size:12px; letter-spacing:3px; color:var(--cyan);
    display:flex; align-items:center; gap:10px; margin-bottom:26px;
  }
  .hero-eyebrow .bar{width:28px;height:1px;background:var(--cyan);}
  h1.hero-title{
    font-family:var(--mono); font-weight:800;
    font-size:clamp(2.4rem, 7vw, 6.2rem);
    line-height:0.98; letter-spacing:-1px;
    text-transform:uppercase;
    max-width:1100px;
  }
  h1.hero-title .accent{color:var(--cyan); text-shadow:0 0 26px rgba(61,219,255,0.55);}
  .hero-sub{
    margin-top:26px; max-width:620px; font-size:16px; line-height:1.7; color:var(--muted);
  }
  .hero-meta{
    margin-top:48px; display:flex; gap:50px; flex-wrap:wrap;
  }
  .hero-meta .item{font-family:var(--mono);}
  .hero-meta .num{font-size:28px;font-weight:800;color:var(--cyan);}
  .hero-meta .label{font-size:10px;color:var(--muted);letter-spacing:1.5px;margin-top:4px;}
  .scroll-cue{
    position:absolute; bottom:32px; left:5%; z-index:2;
    font-family:var(--mono); font-size:10px; color:var(--muted-dim); letter-spacing:2px;
    display:flex; align-items:center; gap:10px;
  }
  .scroll-cue::after{content:'';width:1px;height:34px;background:linear-gradient(to bottom, var(--cyan), transparent);animation:scrolldown 1.8s infinite;}
  @keyframes scrolldown{0%{opacity:0;}50%{opacity:1;}100%{opacity:0;}}

  /* ---------- SECTION SHELL ---------- */
  section{position:relative; padding:130px 5%; }
  .section-head{margin-bottom:64px; max-width:760px;}
  .eyebrow{
    font-family:var(--mono); font-size:12px; color:var(--cyan); letter-spacing:3px;
    display:flex; align-items:center; gap:12px; margin-bottom:18px;
  }
  .eyebrow .num{color:var(--muted-dim);}
  .eyebrow .line{flex:0 0 20px;height:1px;background:var(--cyan);}
  h2{
    font-family:var(--mono); font-weight:800; text-transform:uppercase;
    font-size:clamp(1.7rem,3.4vw,2.8rem); letter-spacing:-0.5px; line-height:1.1;
  }
  .section-desc{margin-top:18px;color:var(--muted);font-size:15.5px;line-height:1.75;max-width:640px;}
  .divider{height:1px;background:linear-gradient(to right, var(--panel-border), transparent);}

  /* glass card */
  .card{
    background:var(--panel); border:1px solid var(--panel-border); border-radius:4px;
    backdrop-filter:blur(14px);
    padding:28px;
    transition:border-color .3s, transform .3s;
  }
  .card:hover{border-color:rgba(61,219,255,0.45); transform:translateY(-3px);}

  /* ---------- ABOUT ---------- */
  .about-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:60px;align-items:start;}
  .about-text p{color:var(--muted); line-height:1.85; font-size:15.5px; margin-bottom:18px;}
  .about-text strong{color:var(--white);font-weight:600;}
  .objectives{display:flex;flex-direction:column;gap:14px;}
  .objectives .obj{
    display:flex; gap:14px; align-items:flex-start; font-size:14px; color:var(--white);
    font-family:var(--mono); padding-bottom:14px; border-bottom:1px solid var(--panel-border);
  }
  .objectives .obj:last-child{border-bottom:none;}
  .objectives .idx{color:var(--cyan); font-weight:700;flex:0 0 28px;}
  @media (max-width:900px){.about-grid{grid-template-columns:1fr;}}

  /* ---------- HARDWARE ---------- */
  .hw-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;}
  .hw-card .hw-tag{font-family:var(--mono);font-size:10px;color:var(--cyan-dim);letter-spacing:2px;}
  .hw-card h3{font-family:var(--mono);font-size:17px;margin:10px 0 8px;font-weight:700;}
  .hw-card p{font-size:13.5px;color:var(--muted);line-height:1.6;}

  /* ---------- ARCHITECTURE ---------- */
  .arch-wrap{display:flex;gap:50px;align-items:center;flex-wrap:wrap;}
  .pipeline{display:flex;flex-direction:column;gap:0;flex:1 1 380px;min-width:300px;}
  .pipe-node{
    font-family:var(--mono); font-size:13px; padding:16px 20px; border:1px solid var(--panel-border);
    background:var(--panel); border-radius:4px; display:flex; align-items:center; justify-content:space-between;
  }
  .pipe-node .n{color:var(--cyan);}
  .pipe-arrow{align-self:center; color:var(--cyan-dim); font-size:18px; padding:6px 0; font-family:var(--mono);}
  .esp-box{
    flex:1 1 260px; border:1px dashed var(--panel-border); border-radius:4px; padding:24px; background:rgba(14,165,200,0.04);
  }
  .esp-box .tag{font-family:var(--mono);font-size:11px;color:var(--cyan);letter-spacing:2px;margin-bottom:14px;}
  .esp-box ul{list-style:none;display:flex;flex-direction:column;gap:10px;}
  .esp-box li{font-family:var(--mono);font-size:13px;color:var(--muted);}
  .esp-box li::before{content:'› ';color:var(--cyan);}

  /* ---------- AI ---------- */
  .ai-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:50px;}
  .ai-stat{text-align:left;}
  .ai-stat .v{font-family:var(--mono);font-weight:800;font-size:32px;color:var(--cyan);}
  .ai-stat .l{font-family:var(--mono);font-size:10.5px;color:var(--muted);letter-spacing:1.5px;margin-top:6px;}
  .classes-row{display:flex;gap:14px;flex-wrap:wrap;}
  .class-chip{font-family:var(--mono);font-size:12px;border:1px solid var(--cyan-dim);color:var(--cyan);padding:8px 18px;border-radius:30px;letter-spacing:1px;}
  @media (max-width:760px){.ai-grid{grid-template-columns:repeat(2,1fr);}}

  /* ---------- RESULTS ---------- */
  .results-tabs{display:flex;gap:10px;margin-bottom:30px;flex-wrap:wrap;}
  .tab-btn{
    font-family:var(--mono); font-size:12px; letter-spacing:1.5px; color:var(--muted);
    background:transparent; border:1px solid var(--panel-border); padding:10px 20px; border-radius:30px;
    cursor:pointer; transition:all .25s;
  }
  .tab-btn.active{color:var(--black); background:var(--cyan); border-color:var(--cyan);}
  table{width:100%; border-collapse:collapse; font-family:var(--mono); font-size:13px;}
  table th,table td{text-align:left; padding:14px 16px; border-bottom:1px solid var(--panel-border);}
  table th{color:var(--cyan); font-size:11px; letter-spacing:1.5px; text-transform:uppercase;}
  table td{color:var(--muted);}
  table td.metric{color:var(--white);}
  .results-table{display:none;}
  .results-table.active{display:block;}
  .bar-cell{position:relative;}
  .bar-fill{height:4px;background:linear-gradient(to right, var(--cyan-dim), var(--cyan)); border-radius:2px; margin-top:6px;}

  /* ---------- TECH STACK ---------- */
  .stack-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
  .stack-col .tag{font-family:var(--mono);font-size:11px;color:var(--cyan);letter-spacing:2px;margin-bottom:18px;display:block;}
  .stack-col ul{list-style:none;display:flex;flex-direction:column;gap:12px;}
  .stack-col li{font-family:var(--mono);font-size:14px;color:var(--white);padding-bottom:12px;border-bottom:1px solid var(--panel-border);}
  @media (max-width:760px){.stack-grid{grid-template-columns:1fr;}}

  /* ---------- TEAM ---------- */
  .team-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;}
  .team-card{text-align:left;}
  .avatar{
    width:46px;height:46px;border:1px solid var(--cyan-dim); border-radius:50%;
    display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-weight:700;color:var(--cyan);
    margin-bottom:16px;
  }
  .team-card h3{font-family:var(--mono);font-size:15px;margin-bottom:6px;}
  .team-card .role{font-size:12px;color:var(--cyan-dim);font-family:var(--mono);letter-spacing:1px;}

  /* ---------- FUTURE ---------- */
  .future-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;}
  .future-item{font-family:var(--mono);font-size:13.5px;color:var(--muted);padding:18px;border-left:2px solid var(--cyan-dim);background:rgba(61,219,255,0.03);}

  /* ---------- FOOTER ---------- */
footer{
  padding:60px 5% 40px;
  border-top:1px solid var(--panel-border);
}

.footer-top{
    display:flex;
    grid-template-columns:420px 1fr;
    align-items:center;
    gap:60px;
    margin-bottom:50px;
}

.footer-cta{
    min-width:420px;
}

.footer-cta h2{
    max-width:420px;
    line-height:1;
}

.footer-links{
    display:flex;
    gap:15px;
    flex-wrap:nowrap;
}

.footer-links a{
    width:220px;
    height:64px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
    font-family:var(--mono);
    font-size:15px;
    border:1px solid var(--panel-border);
    border-radius:20px;
    text-decoration:none;
}

.footer-links a:hover{
  border-color:var(--cyan);
  color:var(--cyan);
}

.footer-bottom{
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap;
  gap:12px;
  font-family:var(--mono);
  font-size:11px;
  color:var(--muted-dim);
  letter-spacing:1px;
}

@media (max-width:600px){
  section{
    padding:90px 6%;
  }

  .hw-grid,
  .team-grid{
    grid-template-columns:1fr;
  }

  .footer-links{
    flex-direction:column;
  }

  .footer-links a{
    width:100%;
    max-width:260px;
  }
}

      `}),(0,a.jsx)("div",{className:"grain"}),(0,a.jsx)("div",{className:"scanlines"}),(0,a.jsxs)("header",{className:"hero",id:"top",children:[(0,a.jsx)("canvas",{id:"scanCanvas"}),(0,a.jsxs)("div",{className:"hero-overlay",children:[(0,a.jsxs)("div",{className:"hero-eyebrow",children:[(0,a.jsx)("span",{className:"bar"}),"LIDAR · IMU · AI · 3D RECONSTRUCTION"]}),(0,a.jsxs)("h1",{className:"hero-title",children:["TURNING A ",(0,a.jsx)("span",{className:"accent",children:"2D LIDAR"}),(0,a.jsx)("br",{}),"INTO A 3D SCANNER"]}),(0,a.jsx)("p",{className:"hero-sub",children:"A servo motor and an IMU give a cheap 2D LiDAR a third dimension — tilting it through space, tracking every angle, and stitching the slices into a full 3D point cloud, at a fraction of the cost of commercial sensors."}),(0,a.jsxs)("div",{className:"hero-meta",children:[(0,a.jsxs)("div",{className:"item",children:[(0,a.jsx)("div",{className:"num",children:"2D → 3D"}),(0,a.jsx)("div",{className:"label",children:"SENSOR CONVERSION"})]}),(0,a.jsxs)("div",{className:"item",children:[(0,a.jsx)("div",{className:"num",children:"80"}),(0,a.jsx)("div",{className:"label",children:"TRAINING EPOCHS"})]}),(0,a.jsxs)("div",{className:"item",children:[(0,a.jsx)("div",{className:"num",children:"~$120"}),(0,a.jsx)("div",{className:"label",children:"EST. HARDWARE COST"})]})]})]}),(0,a.jsx)("div",{className:"scroll-cue",children:"SCROLL TO EXPLORE"})]}),(0,a.jsxs)("section",{id:"about",children:[(0,a.jsxs)("div",{className:"section-head",children:[(0,a.jsxs)("div",{className:"eyebrow",children:[(0,a.jsx)("span",{className:"num",children:"01"}),(0,a.jsx)("span",{className:"line"}),"ABOUT THE PROJECT"]}),(0,a.jsx)("h2",{children:"Giving a 2D sensor a third dimension"})]}),(0,a.jsxs)("div",{className:"about-grid",children:[(0,a.jsxs)("div",{className:"about-text",children:[(0,a.jsxs)("p",{children:["Most affordable LiDAR units only see in 2D — a single flat slice of the world, with no sense of height. Commercial sensors that scan in full 3D cost thousands of dollars, putting real-time 3D mapping out of reach for students, hobbyists, and small robotics teams. ",(0,a.jsx)("strong",{children:"We set out to close that gap"})," using parts that together cost a fraction of a single commercial sensor."]}),(0,a.jsxs)("p",{children:["The core idea: take a cheap 2D LiDAR and physically ",(0,a.jsx)("strong",{children:"tilt it with a servo motor"})," while continuously scanning. An IMU tracks the exact angle of every tilt, so each 2D scan line can be placed correctly in 3D space. Stack enough of these oriented slices together, and a full ",(0,a.jsx)("strong",{children:"3D point cloud"})," emerges from a sensor that was never designed to produce one."]}),(0,a.jsxs)("p",{children:["That point cloud is then fed into our own custom-built AI model, trained on the ",(0,a.jsx)("strong",{children:"JackRabbot Dataset and Benchmark (JRDB)"}),", to detect and classify objects in the scanned environment — turning raw geometry into scene understanding. One application we're particularly drawn to is disaster response, where a low-cost 3D map of a space can help before anyone walks in — but the same pipeline applies to indoor mapping, robotics, and general 3D reconstruction."]})]}),(0,a.jsxs)("div",{className:"objectives",children:[(0,a.jsxs)("div",{className:"obj",children:[(0,a.jsx)("span",{className:"idx",children:"01"}),"Convert a low-cost 2D LiDAR into a 3D scanner"]}),(0,a.jsxs)("div",{className:"obj",children:[(0,a.jsx)("span",{className:"idx",children:"02"}),"Use a servo + IMU to track orientation per scan line"]}),(0,a.jsxs)("div",{className:"obj",children:[(0,a.jsx)("span",{className:"idx",children:"03"}),"Reconstruct a full 3D point cloud from stacked slices"]}),(0,a.jsxs)("div",{className:"obj",children:[(0,a.jsx)("span",{className:"idx",children:"04"}),"Integrate AI-based object detection on the point cloud"]}),(0,a.jsxs)("div",{className:"obj",children:[(0,a.jsx)("span",{className:"idx",children:"05"}),"Visualize point cloud data in real time"]}),(0,a.jsxs)("div",{className:"obj",children:[(0,a.jsx)("span",{className:"idx",children:"06"}),"Provide an affordable alternative to commercial 3D systems"]})]})]})]}),(0,a.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,a.jsxs)("section",{id:"hardware",children:[(0,a.jsxs)("div",{className:"section-head",children:[(0,a.jsxs)("div",{className:"eyebrow",children:[(0,a.jsx)("span",{className:"num",children:"02"}),(0,a.jsx)("span",{className:"line"}),"HARDWARE COMPONENTS"]}),(0,a.jsx)("h2",{children:"Four parts, one scanner"}),(0,a.jsx)("p",{className:"section-desc",children:"Every component was chosen to keep the bill of materials low without sacrificing the orientation accuracy the 2D-to-3D conversion depends on."})]}),(0,a.jsxs)("div",{className:"hw-grid",children:[(0,a.jsxs)("div",{className:"card hw-card",children:[(0,a.jsx)("div",{className:"hw-tag",children:"SENSOR"}),(0,a.jsx)("h3",{children:"YDLIDAR X2"}),(0,a.jsx)("p",{children:"2D LiDAR providing the raw range scans that get stacked into a 3D point cloud."})]}),(0,a.jsxs)("div",{className:"card hw-card",children:[(0,a.jsx)("div",{className:"hw-tag",children:"COMPUTE"}),(0,a.jsx)("h3",{children:"Raspberry Pi 5"}),(0,a.jsx)("p",{children:"Runs point cloud generation and hands data off to the AI detection pipeline."})]}),(0,a.jsxs)("div",{className:"card hw-card",children:[(0,a.jsx)("div",{className:"hw-tag",children:"CONTROLLER"}),(0,a.jsx)("h3",{children:"ESP32"}),(0,a.jsx)("p",{children:"Drives the tilt sweep and synchronizes orientation data in real time."})]}),(0,a.jsxs)("div",{className:"card hw-card",children:[(0,a.jsx)("div",{className:"hw-tag",children:"DISPLAY"}),(0,a.jsx)("h3",{children:'SmartElex 5" TFT LCD'}),(0,a.jsx)("p",{children:"Capacitive touch display for on-device control and live point cloud feedback."})]})]})]}),(0,a.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,a.jsxs)("section",{id:"architecture",children:[(0,a.jsxs)("div",{className:"section-head",children:[(0,a.jsxs)("div",{className:"eyebrow",children:[(0,a.jsx)("span",{className:"num",children:"03"}),(0,a.jsx)("span",{className:"line"}),"SYSTEM ARCHITECTURE"]}),(0,a.jsx)("h2",{children:"From raw scan to detected object"})]}),(0,a.jsxs)("div",{className:"arch-wrap",children:[(0,a.jsxs)("div",{className:"pipeline",children:[(0,a.jsxs)("div",{className:"pipe-node",children:[(0,a.jsx)("span",{children:"LiDAR X2"}),(0,a.jsx)("span",{className:"n",children:"01"})]}),(0,a.jsx)("div",{className:"pipe-arrow",children:"↓"}),(0,a.jsxs)("div",{className:"pipe-node",children:[(0,a.jsx)("span",{children:"Raspberry Pi 5"}),(0,a.jsx)("span",{className:"n",children:"02"})]}),(0,a.jsx)("div",{className:"pipe-arrow",children:"↓"}),(0,a.jsxs)("div",{className:"pipe-node",children:[(0,a.jsx)("span",{children:"Point Cloud Generation"}),(0,a.jsx)("span",{className:"n",children:"03"})]}),(0,a.jsx)("div",{className:"pipe-arrow",children:"↓"}),(0,a.jsxs)("div",{className:"pipe-node",children:[(0,a.jsx)("span",{children:"AI Detection Model"}),(0,a.jsx)("span",{className:"n",children:"04"})]}),(0,a.jsx)("div",{className:"pipe-arrow",children:"↓"}),(0,a.jsxs)("div",{className:"pipe-node",children:[(0,a.jsx)("span",{children:"3D Visualization"}),(0,a.jsx)("span",{className:"n",children:"05"})]})]}),(0,a.jsxs)("div",{className:"esp-box",children:[(0,a.jsx)("div",{className:"tag",children:"ESP32 CONTROLS"}),(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:"Servo movement (tilt sweep)"}),(0,a.jsx)("li",{children:"IMU angle reading"}),(0,a.jsx)("li",{children:"Synchronizing each scan slice with its orientation"})]})]})]})]}),(0,a.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,a.jsxs)("section",{id:"ai",children:[(0,a.jsxs)("div",{className:"section-head",children:[(0,a.jsxs)("div",{className:"eyebrow",children:[(0,a.jsx)("span",{className:"num",children:"04"}),(0,a.jsx)("span",{className:"line"}),"AI INTEGRATION"]}),(0,a.jsx)("h2",{children:"Modified RPEA model, trained on JRDB"}),(0,a.jsx)("p",{className:"section-desc",children:"The generated point cloud is passed through a modified version of the Residual Path Network with Efficient Attention (RPEA) detection model with a multi-branch detection head to specialize in occlusion patterns and distance bands in order to better detect humans in 3D space — no camera required, which also helps in low-light or visually cluttered environments."})]}),(0,a.jsxs)("div",{className:"ai-grid",children:[(0,a.jsxs)("div",{className:"ai-stat",children:[(0,a.jsx)("div",{className:"v",children:"Modified RPEA"}),(0,a.jsx)("div",{className:"l",children:"MODEL ARCHITECTURE"})]}),(0,a.jsxs)("div",{className:"ai-stat",children:[(0,a.jsx)("div",{className:"v",children:"JRDB"}),(0,a.jsx)("div",{className:"l",children:"TRAINING DATASET"})]}),(0,a.jsxs)("div",{className:"ai-stat",children:[(0,a.jsx)("div",{className:"v",children:"80"}),(0,a.jsx)("div",{className:"l",children:"EPOCHS TRAINED"})]}),(0,a.jsxs)("div",{className:"ai-stat",children:[(0,a.jsx)("div",{className:"v",children:"PyTorch"}),(0,a.jsx)("div",{className:"l",children:"FRAMEWORK"})]})]}),(0,a.jsx)("div",{className:"classes-row",children:(0,a.jsx)("span",{className:"class-chip",children:"HUMAN"})})]}),(0,a.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,a.jsxs)("section",{id:"stack",children:[(0,a.jsxs)("div",{className:"section-head",children:[(0,a.jsxs)("div",{className:"eyebrow",children:[(0,a.jsx)("span",{className:"num",children:"05"}),(0,a.jsx)("span",{className:"line"}),"TECHNOLOGY STACK"]}),(0,a.jsx)("h2",{children:"What runs underneath"})]}),(0,a.jsxs)("div",{className:"stack-grid",children:[(0,a.jsxs)("div",{className:"stack-col",children:[(0,a.jsx)("span",{className:"tag",children:"AI / ML"}),(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:"Python"}),(0,a.jsx)("li",{children:"PyTorch"}),(0,a.jsx)("li",{children:"Modified RPEA"}),(0,a.jsx)("li",{children:"JRDB Dataset"})]})]}),(0,a.jsxs)("div",{className:"stack-col",children:[(0,a.jsx)("span",{className:"tag",children:"HARDWARE"}),(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:"Raspberry Pi 5"}),(0,a.jsx)("li",{children:"ESP32"}),(0,a.jsx)("li",{children:'SmartElex 5" TFT LCD'}),(0,a.jsx)("li",{children:"YDLIDAR X2"})]})]}),(0,a.jsxs)("div",{className:"stack-col",children:[(0,a.jsx)("span",{className:"tag",children:"VISUALIZATION"}),(0,a.jsxs)("ul",{children:[(0,a.jsx)("li",{children:"Open3D"}),(0,a.jsx)("li",{children:"Point Cloud Rendering"})]})]})]})]}),(0,a.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,a.jsxs)("section",{id:"team",children:[(0,a.jsxs)("div",{className:"section-head",children:[(0,a.jsxs)("div",{className:"eyebrow",children:[(0,a.jsx)("span",{className:"num",children:"06"}),(0,a.jsx)("span",{className:"line"}),"TEAM"]}),(0,a.jsx)("h2",{children:"Who built it"})]}),(0,a.jsxs)("div",{className:"team-grid",children:[(0,a.jsxs)("div",{className:"card team-card",children:[(0,a.jsx)("div",{className:"avatar",children:"AH"}),(0,a.jsx)("h3",{children:"Aahana Hajariwala"}),(0,a.jsx)("div",{className:"role",children:"FRONTEND DEVELOPER"})]}),(0,a.jsxs)("div",{className:"card team-card",children:[(0,a.jsx)("div",{className:"avatar",children:"KK"}),(0,a.jsx)("h3",{children:"Karthik Kumar"}),(0,a.jsx)("div",{className:"role",children:"FIRMWARE ENGINEER"})]}),(0,a.jsxs)("div",{className:"card team-card",children:[(0,a.jsx)("div",{className:"avatar",children:"RB"}),(0,a.jsx)("h3",{children:"Rohan Alex Basil"}),(0,a.jsx)("div",{className:"role",children:"BACKEND DEVELOPER"})]}),(0,a.jsxs)("div",{className:"card team-card",children:[(0,a.jsx)("div",{className:"avatar",children:"ST"}),(0,a.jsx)("h3",{children:"Sparsh Tyagi"}),(0,a.jsx)("div",{className:"role",children:"HARDWARE DESIGNER"})]})]})]}),(0,a.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,a.jsxs)("section",{id:"future",children:[(0,a.jsxs)("div",{className:"section-head",children:[(0,a.jsxs)("div",{className:"eyebrow",children:[(0,a.jsx)("span",{className:"num",children:"07"}),(0,a.jsx)("span",{className:"line"}),"FUTURE SCOPE"]}),(0,a.jsx)("h2",{children:"Where this goes next"})]}),(0,a.jsxs)("div",{className:"future-list",children:[(0,a.jsx)("div",{className:"future-item",children:"Real-time autonomous navigation"}),(0,a.jsx)("div",{className:"future-item",children:"Indoor 3D mapping"}),(0,a.jsx)("div",{className:"future-item",children:"Robotics and obstacle avoidance"}),(0,a.jsx)("div",{className:"future-item",children:"Search-and-rescue applications"}),(0,a.jsx)("div",{className:"future-item",children:"Smart city monitoring"}),(0,a.jsx)("div",{className:"future-item",children:"Security and surveillance"}),(0,a.jsx)("div",{className:"future-item",children:"Enhanced object classification"})]})]}),(0,a.jsxs)("footer",{id:"contact",children:[(0,a.jsxs)("div",{className:"footer-top",children:[(0,a.jsxs)("div",{className:"footer-cta",children:[(0,a.jsxs)("div",{className:"eyebrow",children:[(0,a.jsx)("span",{className:"num",children:"08"}),(0,a.jsx)("span",{className:"line"}),"CONTACT"]}),(0,a.jsx)("h2",{children:"Open source. Open to questions."})]}),(0,a.jsxs)("div",{className:"footer-links",children:[(0,a.jsx)("a",{href:"https://github.com/Maskedhelp2/Space-visualiser.git",target:"_blank",rel:"noopener noreferrer",children:"GITHUB REPO →"}),(0,a.jsx)("a",{href:"#",children:"PROJECT REPORT →"}),(0,a.jsx)("a",{href:"mailto:masked@maskedhelp.com",children:"EMAIL US →"})]})]}),(0,a.jsxs)("div",{className:"footer-bottom",children:[(0,a.jsx)("span",{children:"LOW-COST 2D-TO-3D LIDAR MAPPING"}),(0,a.jsx)("span",{children:"// 2026"})]})]})]})}])}]);