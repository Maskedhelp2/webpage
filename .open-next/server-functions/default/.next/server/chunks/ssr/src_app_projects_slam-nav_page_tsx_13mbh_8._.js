module.exports=[89035,a=>{"use strict";var b=a.i(87924),c=a.i(72131);a.s(["default",0,function(){return(0,c.useEffect)(()=>{document.title="Low-Cost 2D-to-3D LiDAR Mapping // MaskedHelp";let a=document.createElement("link");a.rel="preconnect",a.href="https://fonts.googleapis.com",document.head.appendChild(a);let b=document.createElement("link");function c(a,b,c){let d=document.createElement("canvas");d.width=d.height=a;let e=d.getContext("2d"),f=e.createRadialGradient(a/2,a/2,0,a/2,a/2,a/2);return f.addColorStop(0,b),f.addColorStop(.22,b),f.addColorStop(.55,c),f.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=f,e.fillRect(0,0,a,a),d}function d(a,b,c){let d=Math.random()*Math.PI*2,e=Math.sqrt(Math.random())*c;return{x:a+Math.cos(d)*e,y:b+Math.sin(d)*e}}return b.rel="stylesheet",b.href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700;800&display=swap",document.head.appendChild(b),!function(){let a,b,e,f,g=document.getElementById("top"),h=document.getElementById("scanCanvas"),i=h.getContext("2d"),j=[],k=null,l=[],m=[],n=[],o=[],p=0;function q(){let c,f,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G;e=Math.min(window.devicePixelRatio||1,2),a=g.clientWidth,b=g.clientHeight,h.width=a*e,h.height=b*e,h.style.width=a+"px",h.style.height=b+"px",i.setTransform(e,0,0,e,0,0),c=.94*Math.min(a/320,b/640),f=(a-320*c)/2,q=(b-640*c)/2,s=(r=(a,b)=>({x:f+a*c,y:q+b*c}))(160,62),t=r(160,108),u=r(160,318),v=r(108,140),w=r(212,140),x=r(82,248),y=r(238,248),z=r(64,350),A=r(256,350),B=r(132,322),C=r(188,322),D=r(122,460),E=r(198,460),F=r(112,596),G=r(208,596),j=[{x1:t.x,y1:t.y,x2:u.x,y2:u.y,r:50*c,w:"torso"},{x1:v.x,y1:v.y,x2:x.x,y2:x.y,r:17*c},{x1:x.x,y1:x.y,x2:z.x,y2:z.y,r:13*c},{x1:w.x,y1:w.y,x2:y.x,y2:y.y,r:17*c},{x1:y.x,y1:y.y,x2:A.x,y2:A.y,r:13*c},{x1:B.x,y1:B.y,x2:D.x,y2:D.y,r:24*c},{x1:D.x,y1:D.y,x2:F.x,y2:F.y,r:17*c},{x1:C.x,y1:C.y,x2:E.x,y2:E.y,r:24*c},{x1:E.x,y1:E.y,x2:G.x,y2:G.y,r:17*c}],k={cx:s.x,cy:s.y,r:36*c},l=[{cx:r(80,610).x,cy:r(80,610).y,r:26*c},{cx:r(250,605).x,cy:r(250,605).y,r:30*c},{cx:r(160,615).x,cy:r(160,615).y,r:20*c}],function(){m=[];let c=j.map(a=>(Math.hypot(a.x2-a.x1,a.y2-a.y1)+1)*a.r),e=c.reduce((a,b)=>a+b,0);for(let a=0;a<1500;a++){let a=Math.random()*e,b=0;for(;a>c[b]&&b<c.length-1;)a-=c[b],b++;let d=j[b],f=function(a,b,c,d,e){let f=Math.random(),g=Math.random()*Math.PI*2,h=Math.sqrt(Math.random())*e;return{x:a+(c-a)*f+Math.cos(g)*h,y:b+(d-b)*f+Math.sin(g)*h}}(d.x1,d.y1,d.x2,d.y2,d.r);m.push({bx:f.x,by:f.y,phase:Math.random()*Math.PI*2,kind:"body"})}for(let a=0;a<220;a++){let a=d(k.cx,k.cy,k.r);m.push({bx:a.x,by:a.y,phase:Math.random()*Math.PI*2,kind:"body"})}for(let a=0;a<110;a++){let a=l[Math.floor(Math.random()*l.length)],b=d(a.cx,a.cy,a.r);m.push({bx:b.x,by:b.y,phase:Math.random()*Math.PI*2,kind:"debris"})}p=m.length;let f=.94*Math.min(a/320,b/640);n=function(a,b){let c=[];for(let d=0;d<a.length;d++){let e=[];for(let c=0;c<a.length;c++){if(d===c)continue;let f=a[d].x-a[c].x,g=a[d].y-a[c].y,h=Math.sqrt(f*f+g*g);h<b&&e.push({j:c,d:h})}e.sort((a,b)=>a.d-b.d);for(let a=0;a<Math.min(3,e.length);a++){let b=e[a].j;b>d&&c.push([d,b])}}return c}(m.map(a=>({x:a.bx,y:a.by})),22*f);let g=m.map((a,b)=>({i:b,y:a.by+(Math.random()-.5)*40}));g.sort((a,b)=>b.y-a.y),o=Array(p),g.forEach((a,b)=>{o[a.i]=b})}()}q(),window.addEventListener("resize",()=>{clearTimeout(f),f=setTimeout(q,200)});let r=c(20,"rgba(230,250,255,1)","rgba(130,225,255,0.95)"),s=c(20,"rgba(160,210,230,0.85)","rgba(60,130,160,0.65)"),t=performance.now();requestAnimationFrame(function c(d){requestAnimationFrame(c);let e=(d-t)/1e3,f=e%5.5,g,h=1;f<3.4?g=f/3.4:f<5?g=1:(g=1,h=1-(f-3.4-1.6)/.5);let j=(1-Math.pow(1-g,2))*p;i.clearRect(0,0,a,b);let k=m.map(a=>({x:a.bx+.8*Math.sin(.8*e+a.phase),y:a.by+.8*Math.cos(.7*e+1.3*a.phase)}));function l(a){let b=j-o[a];return b<=0?0:Math.min(1,b/14)*h}i.globalCompositeOperation="lighter",i.lineWidth=1,n.forEach(([a,b])=>{let c=l(a),d=l(b);c<=0||d<=0||(i.strokeStyle="rgba(80,180,210,"+.32*Math.min(c,d)+")",i.beginPath(),i.moveTo(k[a].x,k[a].y),i.lineTo(k[b].x,k[b].y),i.stroke())}),m.forEach((a,b)=>{let c=l(b);if(c<=0)return;let d="debris"===a.kind?s:r,e=("debris"===a.kind?1.4:1.7)*(.5+.5*c);i.globalAlpha=c,i.drawImage(d,k[b].x-e,k[b].y-e,2*e,2*e)}),i.globalAlpha=1,i.globalCompositeOperation="source-over"})}(),()=>{document.head.removeChild(a),document.head.removeChild(b)}},[]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`

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

      `}),(0,b.jsx)("div",{className:"grain"}),(0,b.jsx)("div",{className:"scanlines"}),(0,b.jsxs)("header",{className:"hero",id:"top",children:[(0,b.jsx)("canvas",{id:"scanCanvas"}),(0,b.jsxs)("div",{className:"hero-overlay",children:[(0,b.jsxs)("div",{className:"hero-eyebrow",children:[(0,b.jsx)("span",{className:"bar"}),"LIDAR · IMU · AI · 3D RECONSTRUCTION"]}),(0,b.jsxs)("h1",{className:"hero-title",children:["TURNING A ",(0,b.jsx)("span",{className:"accent",children:"2D LIDAR"}),(0,b.jsx)("br",{}),"INTO A 3D SCANNER"]}),(0,b.jsx)("p",{className:"hero-sub",children:"A servo motor and an IMU give a cheap 2D LiDAR a third dimension — tilting it through space, tracking every angle, and stitching the slices into a full 3D point cloud, at a fraction of the cost of commercial sensors."}),(0,b.jsxs)("div",{className:"hero-meta",children:[(0,b.jsxs)("div",{className:"item",children:[(0,b.jsx)("div",{className:"num",children:"2D → 3D"}),(0,b.jsx)("div",{className:"label",children:"SENSOR CONVERSION"})]}),(0,b.jsxs)("div",{className:"item",children:[(0,b.jsx)("div",{className:"num",children:"80"}),(0,b.jsx)("div",{className:"label",children:"TRAINING EPOCHS"})]}),(0,b.jsxs)("div",{className:"item",children:[(0,b.jsx)("div",{className:"num",children:"~$120"}),(0,b.jsx)("div",{className:"label",children:"EST. HARDWARE COST"})]})]})]}),(0,b.jsx)("div",{className:"scroll-cue",children:"SCROLL TO EXPLORE"})]}),(0,b.jsxs)("section",{id:"about",children:[(0,b.jsxs)("div",{className:"section-head",children:[(0,b.jsxs)("div",{className:"eyebrow",children:[(0,b.jsx)("span",{className:"num",children:"01"}),(0,b.jsx)("span",{className:"line"}),"ABOUT THE PROJECT"]}),(0,b.jsx)("h2",{children:"Giving a 2D sensor a third dimension"})]}),(0,b.jsxs)("div",{className:"about-grid",children:[(0,b.jsxs)("div",{className:"about-text",children:[(0,b.jsxs)("p",{children:["Most affordable LiDAR units only see in 2D — a single flat slice of the world, with no sense of height. Commercial sensors that scan in full 3D cost thousands of dollars, putting real-time 3D mapping out of reach for students, hobbyists, and small robotics teams. ",(0,b.jsx)("strong",{children:"We set out to close that gap"})," using parts that together cost a fraction of a single commercial sensor."]}),(0,b.jsxs)("p",{children:["The core idea: take a cheap 2D LiDAR and physically ",(0,b.jsx)("strong",{children:"tilt it with a servo motor"})," while continuously scanning. An IMU tracks the exact angle of every tilt, so each 2D scan line can be placed correctly in 3D space. Stack enough of these oriented slices together, and a full ",(0,b.jsx)("strong",{children:"3D point cloud"})," emerges from a sensor that was never designed to produce one."]}),(0,b.jsxs)("p",{children:["That point cloud is then fed into our own custom-built AI model, trained on the ",(0,b.jsx)("strong",{children:"JackRabbot Dataset and Benchmark (JRDB)"}),", to detect and classify objects in the scanned environment — turning raw geometry into scene understanding. One application we're particularly drawn to is disaster response, where a low-cost 3D map of a space can help before anyone walks in — but the same pipeline applies to indoor mapping, robotics, and general 3D reconstruction."]})]}),(0,b.jsxs)("div",{className:"objectives",children:[(0,b.jsxs)("div",{className:"obj",children:[(0,b.jsx)("span",{className:"idx",children:"01"}),"Convert a low-cost 2D LiDAR into a 3D scanner"]}),(0,b.jsxs)("div",{className:"obj",children:[(0,b.jsx)("span",{className:"idx",children:"02"}),"Use a servo + IMU to track orientation per scan line"]}),(0,b.jsxs)("div",{className:"obj",children:[(0,b.jsx)("span",{className:"idx",children:"03"}),"Reconstruct a full 3D point cloud from stacked slices"]}),(0,b.jsxs)("div",{className:"obj",children:[(0,b.jsx)("span",{className:"idx",children:"04"}),"Integrate AI-based object detection on the point cloud"]}),(0,b.jsxs)("div",{className:"obj",children:[(0,b.jsx)("span",{className:"idx",children:"05"}),"Visualize point cloud data in real time"]}),(0,b.jsxs)("div",{className:"obj",children:[(0,b.jsx)("span",{className:"idx",children:"06"}),"Provide an affordable alternative to commercial 3D systems"]})]})]})]}),(0,b.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,b.jsxs)("section",{id:"hardware",children:[(0,b.jsxs)("div",{className:"section-head",children:[(0,b.jsxs)("div",{className:"eyebrow",children:[(0,b.jsx)("span",{className:"num",children:"02"}),(0,b.jsx)("span",{className:"line"}),"HARDWARE COMPONENTS"]}),(0,b.jsx)("h2",{children:"Four parts, one scanner"}),(0,b.jsx)("p",{className:"section-desc",children:"Every component was chosen to keep the bill of materials low without sacrificing the orientation accuracy the 2D-to-3D conversion depends on."})]}),(0,b.jsxs)("div",{className:"hw-grid",children:[(0,b.jsxs)("div",{className:"card hw-card",children:[(0,b.jsx)("div",{className:"hw-tag",children:"SENSOR"}),(0,b.jsx)("h3",{children:"YDLIDAR X2"}),(0,b.jsx)("p",{children:"2D LiDAR providing the raw range scans that get stacked into a 3D point cloud."})]}),(0,b.jsxs)("div",{className:"card hw-card",children:[(0,b.jsx)("div",{className:"hw-tag",children:"COMPUTE"}),(0,b.jsx)("h3",{children:"Raspberry Pi 5"}),(0,b.jsx)("p",{children:"Runs point cloud generation and hands data off to the AI detection pipeline."})]}),(0,b.jsxs)("div",{className:"card hw-card",children:[(0,b.jsx)("div",{className:"hw-tag",children:"CONTROLLER"}),(0,b.jsx)("h3",{children:"ESP32"}),(0,b.jsx)("p",{children:"Drives the tilt sweep and synchronizes orientation data in real time."})]}),(0,b.jsxs)("div",{className:"card hw-card",children:[(0,b.jsx)("div",{className:"hw-tag",children:"DISPLAY"}),(0,b.jsx)("h3",{children:'SmartElex 5" TFT LCD'}),(0,b.jsx)("p",{children:"Capacitive touch display for on-device control and live point cloud feedback."})]})]})]}),(0,b.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,b.jsxs)("section",{id:"architecture",children:[(0,b.jsxs)("div",{className:"section-head",children:[(0,b.jsxs)("div",{className:"eyebrow",children:[(0,b.jsx)("span",{className:"num",children:"03"}),(0,b.jsx)("span",{className:"line"}),"SYSTEM ARCHITECTURE"]}),(0,b.jsx)("h2",{children:"From raw scan to detected object"})]}),(0,b.jsxs)("div",{className:"arch-wrap",children:[(0,b.jsxs)("div",{className:"pipeline",children:[(0,b.jsxs)("div",{className:"pipe-node",children:[(0,b.jsx)("span",{children:"LiDAR X2"}),(0,b.jsx)("span",{className:"n",children:"01"})]}),(0,b.jsx)("div",{className:"pipe-arrow",children:"↓"}),(0,b.jsxs)("div",{className:"pipe-node",children:[(0,b.jsx)("span",{children:"Raspberry Pi 5"}),(0,b.jsx)("span",{className:"n",children:"02"})]}),(0,b.jsx)("div",{className:"pipe-arrow",children:"↓"}),(0,b.jsxs)("div",{className:"pipe-node",children:[(0,b.jsx)("span",{children:"Point Cloud Generation"}),(0,b.jsx)("span",{className:"n",children:"03"})]}),(0,b.jsx)("div",{className:"pipe-arrow",children:"↓"}),(0,b.jsxs)("div",{className:"pipe-node",children:[(0,b.jsx)("span",{children:"AI Detection Model"}),(0,b.jsx)("span",{className:"n",children:"04"})]}),(0,b.jsx)("div",{className:"pipe-arrow",children:"↓"}),(0,b.jsxs)("div",{className:"pipe-node",children:[(0,b.jsx)("span",{children:"3D Visualization"}),(0,b.jsx)("span",{className:"n",children:"05"})]})]}),(0,b.jsxs)("div",{className:"esp-box",children:[(0,b.jsx)("div",{className:"tag",children:"ESP32 CONTROLS"}),(0,b.jsxs)("ul",{children:[(0,b.jsx)("li",{children:"Servo movement (tilt sweep)"}),(0,b.jsx)("li",{children:"IMU angle reading"}),(0,b.jsx)("li",{children:"Synchronizing each scan slice with its orientation"})]})]})]})]}),(0,b.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,b.jsxs)("section",{id:"ai",children:[(0,b.jsxs)("div",{className:"section-head",children:[(0,b.jsxs)("div",{className:"eyebrow",children:[(0,b.jsx)("span",{className:"num",children:"04"}),(0,b.jsx)("span",{className:"line"}),"AI INTEGRATION"]}),(0,b.jsx)("h2",{children:"Modified RPEA model, trained on JRDB"}),(0,b.jsx)("p",{className:"section-desc",children:"The generated point cloud is passed through a modified version of the Residual Path Network with Efficient Attention (RPEA) detection model with a multi-branch detection head to specialize in occlusion patterns and distance bands in order to better detect humans in 3D space — no camera required, which also helps in low-light or visually cluttered environments."})]}),(0,b.jsxs)("div",{className:"ai-grid",children:[(0,b.jsxs)("div",{className:"ai-stat",children:[(0,b.jsx)("div",{className:"v",children:"Modified RPEA"}),(0,b.jsx)("div",{className:"l",children:"MODEL ARCHITECTURE"})]}),(0,b.jsxs)("div",{className:"ai-stat",children:[(0,b.jsx)("div",{className:"v",children:"JRDB"}),(0,b.jsx)("div",{className:"l",children:"TRAINING DATASET"})]}),(0,b.jsxs)("div",{className:"ai-stat",children:[(0,b.jsx)("div",{className:"v",children:"80"}),(0,b.jsx)("div",{className:"l",children:"EPOCHS TRAINED"})]}),(0,b.jsxs)("div",{className:"ai-stat",children:[(0,b.jsx)("div",{className:"v",children:"PyTorch"}),(0,b.jsx)("div",{className:"l",children:"FRAMEWORK"})]})]}),(0,b.jsx)("div",{className:"classes-row",children:(0,b.jsx)("span",{className:"class-chip",children:"HUMAN"})})]}),(0,b.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,b.jsxs)("section",{id:"stack",children:[(0,b.jsxs)("div",{className:"section-head",children:[(0,b.jsxs)("div",{className:"eyebrow",children:[(0,b.jsx)("span",{className:"num",children:"05"}),(0,b.jsx)("span",{className:"line"}),"TECHNOLOGY STACK"]}),(0,b.jsx)("h2",{children:"What runs underneath"})]}),(0,b.jsxs)("div",{className:"stack-grid",children:[(0,b.jsxs)("div",{className:"stack-col",children:[(0,b.jsx)("span",{className:"tag",children:"AI / ML"}),(0,b.jsxs)("ul",{children:[(0,b.jsx)("li",{children:"Python"}),(0,b.jsx)("li",{children:"PyTorch"}),(0,b.jsx)("li",{children:"Modified RPEA"}),(0,b.jsx)("li",{children:"JRDB Dataset"})]})]}),(0,b.jsxs)("div",{className:"stack-col",children:[(0,b.jsx)("span",{className:"tag",children:"HARDWARE"}),(0,b.jsxs)("ul",{children:[(0,b.jsx)("li",{children:"Raspberry Pi 5"}),(0,b.jsx)("li",{children:"ESP32"}),(0,b.jsx)("li",{children:'SmartElex 5" TFT LCD'}),(0,b.jsx)("li",{children:"YDLIDAR X2"})]})]}),(0,b.jsxs)("div",{className:"stack-col",children:[(0,b.jsx)("span",{className:"tag",children:"VISUALIZATION"}),(0,b.jsxs)("ul",{children:[(0,b.jsx)("li",{children:"Open3D"}),(0,b.jsx)("li",{children:"Point Cloud Rendering"})]})]})]})]}),(0,b.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,b.jsxs)("section",{id:"team",children:[(0,b.jsxs)("div",{className:"section-head",children:[(0,b.jsxs)("div",{className:"eyebrow",children:[(0,b.jsx)("span",{className:"num",children:"06"}),(0,b.jsx)("span",{className:"line"}),"TEAM"]}),(0,b.jsx)("h2",{children:"Who built it"})]}),(0,b.jsxs)("div",{className:"team-grid",children:[(0,b.jsxs)("div",{className:"card team-card",children:[(0,b.jsx)("div",{className:"avatar",children:"AH"}),(0,b.jsx)("h3",{children:"Aahana Hajariwala"}),(0,b.jsx)("div",{className:"role",children:"FRONTEND DEVELOPER"})]}),(0,b.jsxs)("div",{className:"card team-card",children:[(0,b.jsx)("div",{className:"avatar",children:"KK"}),(0,b.jsx)("h3",{children:"Karthik Kumar"}),(0,b.jsx)("div",{className:"role",children:"FIRMWARE ENGINEER"})]}),(0,b.jsxs)("div",{className:"card team-card",children:[(0,b.jsx)("div",{className:"avatar",children:"RB"}),(0,b.jsx)("h3",{children:"Rohan Alex Basil"}),(0,b.jsx)("div",{className:"role",children:"BACKEND DEVELOPER"})]}),(0,b.jsxs)("div",{className:"card team-card",children:[(0,b.jsx)("div",{className:"avatar",children:"ST"}),(0,b.jsx)("h3",{children:"Sparsh Tyagi"}),(0,b.jsx)("div",{className:"role",children:"HARDWARE DESIGNER"})]})]})]}),(0,b.jsx)("div",{className:"divider",style:{margin:"0 5%"}}),(0,b.jsxs)("section",{id:"future",children:[(0,b.jsxs)("div",{className:"section-head",children:[(0,b.jsxs)("div",{className:"eyebrow",children:[(0,b.jsx)("span",{className:"num",children:"07"}),(0,b.jsx)("span",{className:"line"}),"FUTURE SCOPE"]}),(0,b.jsx)("h2",{children:"Where this goes next"})]}),(0,b.jsxs)("div",{className:"future-list",children:[(0,b.jsx)("div",{className:"future-item",children:"Real-time autonomous navigation"}),(0,b.jsx)("div",{className:"future-item",children:"Indoor 3D mapping"}),(0,b.jsx)("div",{className:"future-item",children:"Robotics and obstacle avoidance"}),(0,b.jsx)("div",{className:"future-item",children:"Search-and-rescue applications"}),(0,b.jsx)("div",{className:"future-item",children:"Smart city monitoring"}),(0,b.jsx)("div",{className:"future-item",children:"Security and surveillance"}),(0,b.jsx)("div",{className:"future-item",children:"Enhanced object classification"})]})]}),(0,b.jsxs)("footer",{id:"contact",children:[(0,b.jsxs)("div",{className:"footer-top",children:[(0,b.jsxs)("div",{className:"footer-cta",children:[(0,b.jsxs)("div",{className:"eyebrow",children:[(0,b.jsx)("span",{className:"num",children:"08"}),(0,b.jsx)("span",{className:"line"}),"CONTACT"]}),(0,b.jsx)("h2",{children:"Open source. Open to questions."})]}),(0,b.jsxs)("div",{className:"footer-links",children:[(0,b.jsx)("a",{href:"https://github.com/Maskedhelp2/Space-visualiser.git",target:"_blank",rel:"noopener noreferrer",children:"GITHUB REPO →"}),(0,b.jsx)("a",{href:"#",children:"PROJECT REPORT →"}),(0,b.jsx)("a",{href:"mailto:masked@maskedhelp.com",children:"EMAIL US →"})]})]}),(0,b.jsxs)("div",{className:"footer-bottom",children:[(0,b.jsx)("span",{children:"LOW-COST 2D-TO-3D LIDAR MAPPING"}),(0,b.jsx)("span",{children:"// 2026"})]})]})]})}])}];

//# sourceMappingURL=src_app_projects_slam-nav_page_tsx_13mbh_8._.js.map