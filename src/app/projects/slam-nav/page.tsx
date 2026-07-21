// @ts-nocheck
/* =====================================================================
   Converted 1:1 from index.html — same markup, same CSS, same canvas/JS
   logic, just hosted as a React component. No content was changed.
   ===================================================================== */

'use client'
import { useEffect } from 'react';

export default function LidarWorldMapper() {
  useEffect(() => {
    document.title = "Low-Cost 2D-to-3D LiDAR Mapping // MaskedHelp";

    // Google Fonts (same as the original <link> tags in <head>)
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(fontLink);

    // ---------------------------------------------------------------
    // Original inline <script> content, unchanged, run on mount
    // ---------------------------------------------------------------

    /* =====================================================================
       Dependency-free Canvas2D visuals. No Three.js, no CDN — this runs
       anywhere: this preview sandbox, VS Code Live Server, GitHub Pages,
       a plain file:// double-click. Both visuals below use the same
       "surface sampling + constellation lines" idea as
       github.com/Mamboleoo/SurfaceSampling, just implemented in 2D.
       ===================================================================== */

    // ---------- shared helpers ----------
    function makeGlowSprite(size, coreColor, edgeColor){
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(size/2,size/2,0,size/2,size/2,size/2);
      g.addColorStop(0, coreColor);
      g.addColorStop(0.22, coreColor);
      g.addColorStop(0.55, edgeColor);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0,0,size,size);
      return c;
    }

    // Sample a random point within a capsule (thick line segment) shape
    function sampleCapsule(x1,y1,x2,y2,r){
      const t = Math.random();
      const px = x1 + (x2-x1)*t;
      const py = y1 + (y2-y1)*t;
      const ang = Math.random()*Math.PI*2;
      const rad = Math.sqrt(Math.random())*r;
      return { x: px + Math.cos(ang)*rad, y: py + Math.sin(ang)*rad };
    }
    function sampleCircle(cx,cy,r){
      const ang = Math.random()*Math.PI*2;
      const rad = Math.sqrt(Math.random())*r;
      return { x: cx + Math.cos(ang)*rad, y: cy + Math.sin(ang)*rad };
    }

    // Build constellation edges (each point linked to its nearest few neighbours)
    function buildEdges(points, maxDist, maxLinks){
      const edges = [];
      for(let i=0;i<points.length;i++){
        const cands = [];
        for(let j=0;j<points.length;j++){
          if(i===j) continue;
          const dx = points[i].x-points[j].x, dy = points[i].y-points[j].y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if(d < maxDist) cands.push({j,d});
        }
        cands.sort((a,b)=>a.d-b.d);
        for(let k=0;k<Math.min(maxLinks, cands.length);k++){
          const j = cands[k].j;
          if(j > i) edges.push([i,j]);
        }
      }
      return edges;
    }


    /* =====================================================================
       HERO BACKGROUND — standing human figure, constellation point cloud,
       continuously assembling (points pop in + join with lines, hold, fade,
       repeat). Purely decorative — not a data demo, just a cool animation.
       ===================================================================== */
    (function(){
      const stage = document.getElementById('top');
      const canvas = document.getElementById('scanCanvas');
      const ctx = canvas.getContext('2d');
      let w,h,dpr;

      function resizeCanvasOnly(){
        dpr = Math.min(window.devicePixelRatio||1, 2);
        w = stage.clientWidth; h = stage.clientHeight;
        canvas.width = w*dpr; canvas.height = h*dpr;
        canvas.style.width = w+'px'; canvas.style.height = h+'px';
        ctx.setTransform(dpr,0,0,dpr,0,0);
      }

      // Design-space bones for a STANDING figure, facing forward, arms slightly
      // out from the body, legs apart. Coordinates scaled to fit the canvas.
      const DESIGN_W = 320, DESIGN_H = 640;
      let bones = [], headCircle = null, debris = [];

      function layout(){
        const scale = Math.min(w/DESIGN_W, h/DESIGN_H) * 0.94;
        const offX = (w - DESIGN_W*scale)/2;
        const offY = (h - DESIGN_H*scale)/2;
        const T = (x,y)=>({x: offX + x*scale, y: offY + y*scale});

        const head    = T(160, 62);
        const neck    = T(160, 108);
        const hips     = T(160, 318);
        const shoulderL = T(108, 140);
        const shoulderR = T(212, 140);
        const elbowL  = T(82, 248);
        const elbowR  = T(238, 248);
        const handL   = T(64, 350);
        const handR   = T(256, 350);
        const hipL    = T(132, 322);
        const hipR    = T(188, 322);
        const kneeL   = T(122, 460);
        const kneeR   = T(198, 460);
        const footL   = T(112, 596);
        const footR   = T(208, 596);

        bones = [
          {x1:neck.x,  y1:neck.y,  x2:hips.x, y2:hips.y,  r:50*scale, w:'torso'},
          {x1:shoulderL.x, y1:shoulderL.y, x2:elbowL.x, y2:elbowL.y, r:17*scale},
          {x1:elbowL.x, y1:elbowL.y, x2:handL.x, y2:handL.y, r:13*scale},
          {x1:shoulderR.x, y1:shoulderR.y, x2:elbowR.x, y2:elbowR.y, r:17*scale},
          {x1:elbowR.x, y1:elbowR.y, x2:handR.x, y2:handR.y, r:13*scale},
          {x1:hipL.x, y1:hipL.y, x2:kneeL.x, y2:kneeL.y, r:24*scale},
          {x1:kneeL.x, y1:kneeL.y, x2:footL.x, y2:footL.y, r:17*scale},
          {x1:hipR.x, y1:hipR.y, x2:kneeR.x, y2:kneeR.y, r:24*scale},
          {x1:kneeR.x, y1:kneeR.y, x2:footR.x, y2:footR.y, r:17*scale},
        ];
        headCircle = {cx: head.x, cy: head.y, r: 36*scale};

        // small rubble at the feet — context, not occlusion, so the figure stays clear
        debris = [
          {cx: T(80,610).x,  cy: T(80,610).y,  r: 26*scale},
          {cx: T(250,605).x, cy: T(250,605).y, r: 30*scale},
          {cx: T(160,615).x, cy: T(160,615).y, r: 20*scale},
        ];
      }

      const POINT_COUNT_BODY = 1500;
      const POINT_COUNT_HEAD = 220;
      const POINT_COUNT_DEBRIS = 110;
      let points = [];   // {bx,by,kind}
      let edges = [];     // [i,j]
      let order = [];      // reveal order -> step index per point
      let N = 0;

      function shuffleIdx(n){
        const a = Array.from({length:n}, (_,i)=>i);
        for(let i=a.length-1;i>0;i--){
          const j = Math.floor(Math.random()*(i+1));
          [a[i],a[j]] = [a[j],a[i]];
        }
        return a;
      }

      function buildPoints(){
        points = [];
        const weights = bones.map(b=>{
          const len = Math.hypot(b.x2-b.x1, b.y2-b.y1);
          return (len+1) * b.r;
        });
        const totalW = weights.reduce((a,b)=>a+b,0);

        for(let i=0;i<POINT_COUNT_BODY;i++){
          let r = Math.random()*totalW, idx=0;
          while(r > weights[idx] && idx < weights.length-1){ r -= weights[idx]; idx++; }
          const b = bones[idx];
          const p = sampleCapsule(b.x1,b.y1,b.x2,b.y2,b.r);
          points.push({bx:p.x, by:p.y, phase:Math.random()*Math.PI*2, kind:'body'});
        }
        for(let i=0;i<POINT_COUNT_HEAD;i++){
          const p = sampleCircle(headCircle.cx, headCircle.cy, headCircle.r);
          points.push({bx:p.x, by:p.y, phase:Math.random()*Math.PI*2, kind:'body'});
        }
        for(let i=0;i<POINT_COUNT_DEBRIS;i++){
          const d = debris[Math.floor(Math.random()*debris.length)];
          const p = sampleCircle(d.cx, d.cy, d.r);
          points.push({bx:p.x, by:p.y, phase:Math.random()*Math.PI*2, kind:'debris'});
        }

        N = points.length;
        const scaleRef = Math.min(w/DESIGN_W, h/DESIGN_H) * 0.94;
        edges = buildEdges(points.map(p=>({x:p.bx,y:p.by})), 22*scaleRef, 3);

        // reveal order: build roughly bottom-up (feet first, head last) with
        // shuffled noise inside bands, so it reads as "assembling a body" —
        // not pure random scatter.
        const banded = points.map((p,i)=>({i, y:p.by + (Math.random()-0.5)*40}));
        banded.sort((a,b)=>b.y-a.y); // bottom (larger y) first
        order = new Array(N);
        banded.forEach((o, step)=>{ order[o.i] = step; });
      }

      function rebuildLayout(){
        resizeCanvasOnly();
        layout();
        buildPoints();
      }
      rebuildLayout();

      let resizeTimer;
      window.addEventListener('resize', ()=>{
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(rebuildLayout, 200);
      });

      const bodySprite   = makeGlowSprite(20, 'rgba(230,250,255,1)', 'rgba(130,225,255,0.95)');
      const debrisSprite = makeGlowSprite(20, 'rgba(160,210,230,0.85)', 'rgba(60,130,160,0.65)');

      let started = true; // always visible in the hero, no need to wait for scroll

      // ---- continuous build cycle: reveal -> hold -> fade -> repeat ----
      const REVEAL_S = 3.4;
      const HOLD_S   = 1.6;
      const FADE_S   = 0.5;
      const CYCLE_S  = REVEAL_S + HOLD_S + FADE_S;

      let t0 = performance.now();
      function frame(now){
        requestAnimationFrame(frame);
        if(!started) return;
        const t = (now - t0)/1000;
        const phase = t % CYCLE_S;

        let revealFrac, fadeMul = 1;
        if(phase < REVEAL_S){
          revealFrac = phase / REVEAL_S;
        } else if(phase < REVEAL_S + HOLD_S){
          revealFrac = 1;
        } else {
          revealFrac = 1;
          fadeMul = 1 - (phase - REVEAL_S - HOLD_S) / FADE_S;
        }
        // ease the reveal so it feels like it's "racing" then settling
        const eased = 1 - Math.pow(1-revealFrac, 2);
        const revealCount = eased * N;


        ctx.clearRect(0,0,w,h);

        const pos = points.map(p=>({
          x: p.bx + Math.sin(t*0.8+p.phase)*0.8,
          y: p.by + Math.cos(t*0.7+p.phase*1.3)*0.8
        }));

        function visibility(i){
          const step = order[i];
          const d = revealCount - step;
          if(d <= 0) return 0;
          const v = Math.min(1, d/14); // quick pop-in fade per point
          return v * fadeMul;
        }

        ctx.globalCompositeOperation = 'lighter';

        // lines — only between two already-revealed points
        ctx.lineWidth = 1;
        edges.forEach(([i,j])=>{
          const vi = visibility(i), vj = visibility(j);
          if(vi<=0 || vj<=0) return;
          const a = Math.min(vi,vj)*0.32;
          ctx.strokeStyle = 'rgba(80,180,210,'+a+')';
          ctx.beginPath();
          ctx.moveTo(pos[i].x, pos[i].y);
          ctx.lineTo(pos[j].x, pos[j].y);
          ctx.stroke();
        });

        // points
        points.forEach((p,i)=>{
          const v = visibility(i);
          if(v<=0) return;
          const sprite = p.kind==='debris' ? debrisSprite : bodySprite;
          const size = (p.kind==='debris' ? 1.4 : 1.7) * (0.5 + 0.5*v);
          ctx.globalAlpha = v;
          ctx.drawImage(sprite, pos[i].x-size, pos[i].y-size, size*2, size*2);
        });
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      }
      requestAnimationFrame(frame);
    })();


    return () => {
      document.head.removeChild(preconnect);
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <>
      <style>{`

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

      `}</style>

      <div className="grain"></div>
      <div className="scanlines"></div>

      {/* ================= HERO ================= */}
      <header className="hero" id="top">
        <canvas id="scanCanvas"></canvas>
        <div className="hero-overlay">
          <div className="hero-eyebrow"><span className="bar"></span>LIDAR · IMU · AI · 3D RECONSTRUCTION</div>
          <h1 className="hero-title">TURNING A <span className="accent">2D LIDAR</span><br/>INTO A 3D SCANNER</h1>
          <p className="hero-sub">A servo motor and an IMU give a cheap 2D LiDAR a third dimension — tilting it through space, tracking every angle, and stitching the slices into a full 3D point cloud, at a fraction of the cost of commercial sensors.</p>
          <div className="hero-meta">
            <div className="item"><div className="num">2D → 3D</div><div className="label">SENSOR CONVERSION</div></div>
            <div className="item"><div className="num">80</div><div className="label">TRAINING EPOCHS</div></div>
            <div className="item"><div className="num">~$120</div><div className="label">EST. HARDWARE COST</div></div>
          </div>
        </div>
        <div className="scroll-cue">SCROLL TO EXPLORE</div>
      </header>

      {/* ================= ABOUT ================= */}
      <section id="about">
        <div className="section-head">
          <div className="eyebrow"><span className="num">01</span><span className="line"></span>ABOUT THE PROJECT</div>
          <h2>Giving a 2D sensor a third dimension</h2>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>Most affordable LiDAR units only see in 2D — a single flat slice of the world, with no sense of height. Commercial sensors that scan in full 3D cost thousands of dollars, putting real-time 3D mapping out of reach for students, hobbyists, and small robotics teams. <strong>We set out to close that gap</strong> using parts that together cost a fraction of a single commercial sensor.</p>
            <p>The core idea: take a cheap 2D LiDAR and physically <strong>tilt it with a servo motor</strong> while continuously scanning. An IMU tracks the exact angle of every tilt, so each 2D scan line can be placed correctly in 3D space. Stack enough of these oriented slices together, and a full <strong>3D point cloud</strong> emerges from a sensor that was never designed to produce one.</p>
            <p>That point cloud is then fed into our own custom-built AI model, trained on the <strong>JackRabbot Dataset and Benchmark (JRDB)</strong>, to detect and classify objects in the scanned environment — turning raw geometry into scene understanding. One application we're particularly drawn to is disaster response, where a low-cost 3D map of a space can help before anyone walks in — but the same pipeline applies to indoor mapping, robotics, and general 3D reconstruction.</p>
          </div>
          <div className="objectives">
            <div className="obj"><span className="idx">01</span>Convert a low-cost 2D LiDAR into a 3D scanner</div>
            <div className="obj"><span className="idx">02</span>Use a servo + IMU to track orientation per scan line</div>
            <div className="obj"><span className="idx">03</span>Reconstruct a full 3D point cloud from stacked slices</div>
            <div className="obj"><span className="idx">04</span>Integrate AI-based object detection on the point cloud</div>
            <div className="obj"><span className="idx">05</span>Visualize point cloud data in real time</div>
            <div className="obj"><span className="idx">06</span>Provide an affordable alternative to commercial 3D systems</div>
          </div>
        </div>
      </section>

      <div className="divider" style={{margin: '0 5%'}}></div>

      {/* ================= HARDWARE ================= */}
      <section id="hardware">
        <div className="section-head">
          <div className="eyebrow"><span className="num">02</span><span className="line"></span>HARDWARE COMPONENTS</div>
          <h2>Four parts, one scanner</h2>
          <p className="section-desc">Every component was chosen to keep the bill of materials low without sacrificing the orientation accuracy the 2D-to-3D conversion depends on.</p>
        </div>
        <div className="hw-grid">
          <div className="card hw-card"><div className="hw-tag">SENSOR</div><h3>YDLIDAR X2</h3><p>2D LiDAR providing the raw range scans that get stacked into a 3D point cloud.</p></div>
          <div className="card hw-card"><div className="hw-tag">COMPUTE</div><h3>Raspberry Pi 5</h3><p>Runs point cloud generation and hands data off to the AI detection pipeline.</p></div>
          <div className="card hw-card"><div className="hw-tag">CONTROLLER</div><h3>ESP32</h3><p>Drives the tilt sweep and synchronizes orientation data in real time.</p></div>
          <div className="card hw-card"><div className="hw-tag">DISPLAY</div><h3>SmartElex 5" TFT LCD</h3><p>Capacitive touch display for on-device control and live point cloud feedback.</p></div>
        </div>
      </section>

      <div className="divider" style={{margin: '0 5%'}}></div>

      {/* ================= ARCHITECTURE ================= */}
      <section id="architecture">
        <div className="section-head">
          <div className="eyebrow"><span className="num">03</span><span className="line"></span>SYSTEM ARCHITECTURE</div>
          <h2>From raw scan to detected object</h2>
        </div>
        <div className="arch-wrap">
          <div className="pipeline">
            <div className="pipe-node"><span>LiDAR X2</span><span className="n">01</span></div>
            <div className="pipe-arrow">↓</div>
            <div className="pipe-node"><span>Raspberry Pi 5</span><span className="n">02</span></div>
            <div className="pipe-arrow">↓</div>
            <div className="pipe-node"><span>Point Cloud Generation</span><span className="n">03</span></div>
            <div className="pipe-arrow">↓</div>
            <div className="pipe-node"><span>AI Detection Model</span><span className="n">04</span></div>
            <div className="pipe-arrow">↓</div>
            <div className="pipe-node"><span>3D Visualization</span><span className="n">05</span></div>
          </div>
          <div className="esp-box">
            <div className="tag">ESP32 CONTROLS</div>
            <ul>
              <li>Servo movement (tilt sweep)</li>
              <li>IMU angle reading</li>
              <li>Synchronizing each scan slice with its orientation</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="divider" style={{margin: '0 5%'}}></div>

      {/* ================= AI ================= */}
      <section id="ai">
        <div className="section-head">
          <div className="eyebrow"><span className="num">04</span><span className="line"></span>AI INTEGRATION</div>
          <h2>Modified RPEA model, trained on JRDB</h2>
          <p className="section-desc">The generated point cloud is passed through a modified version of the Residual Path Network with Efficient Attention (RPEA) detection model with a multi-branch detection head to specialize in occlusion patterns and distance bands in order to better detect humans in 3D space — no camera required, which also helps in low-light or visually cluttered environments.</p>
        </div>
        <div className="ai-grid">
          <div className="ai-stat"><div className="v">Modified RPEA</div><div className="l">MODEL ARCHITECTURE</div></div>
          <div className="ai-stat"><div className="v">JRDB</div><div className="l">TRAINING DATASET</div></div>
          <div className="ai-stat"><div className="v">80</div><div className="l">EPOCHS TRAINED</div></div>
          <div className="ai-stat"><div className="v">PyTorch</div><div className="l">FRAMEWORK</div></div>
        </div>
        <div className="classes-row">
          <span className="class-chip">HUMAN</span>
        </div>
      </section>

      <div className="divider" style={{margin: '0 5%'}}></div>

      {/* ================= TECH STACK ================= */}
      <section id="stack">
        <div className="section-head">
          <div className="eyebrow"><span className="num">05</span><span className="line"></span>TECHNOLOGY STACK</div>
          <h2>What runs underneath</h2>
        </div>
        <div className="stack-grid">
          <div className="stack-col">
            <span className="tag">AI / ML</span>
            <ul><li>Python</li><li>PyTorch</li><li>Modified RPEA</li><li>JRDB Dataset</li></ul>
          </div>
          <div className="stack-col">
            <span className="tag">HARDWARE</span>
            <ul><li>Raspberry Pi 5</li><li>ESP32</li><li>SmartElex 5" TFT LCD</li><li>YDLIDAR X2</li></ul>
          </div>
          <div className="stack-col">
            <span className="tag">VISUALIZATION</span>
            <ul><li>Open3D</li><li>Point Cloud Rendering</li></ul>
          </div>
        </div>
      </section>

      <div className="divider" style={{margin: '0 5%'}}></div>

      {/* ================= TEAM ================= */}
      <section id="team">
        <div className="section-head">
          <div className="eyebrow"><span className="num">06</span><span className="line"></span>TEAM</div>
          <h2>Who built it</h2>
        </div>
        <div className="team-grid">
          <div className="card team-card"><div className="avatar">AH</div><h3>Aahana Hajariwala</h3><div className="role">FRONTEND DEVELOPER</div></div>
          <div className="card team-card"><div className="avatar">KK</div><h3>Karthik Kumar</h3><div className="role">FIRMWARE ENGINEER</div></div>
          <div className="card team-card"><div className="avatar">RB</div><h3>Rohan Alex Basil</h3><div className="role">BACKEND DEVELOPER</div></div>
          <div className="card team-card"><div className="avatar">ST</div><h3>Sparsh Tyagi</h3><div className="role">HARDWARE DESIGNER</div></div>
        </div>
      </section>

      <div className="divider" style={{margin: '0 5%'}}></div>

      {/* ================= FUTURE SCOPE ================= */}
      <section id="future">
        <div className="section-head">
          <div className="eyebrow"><span className="num">07</span><span className="line"></span>FUTURE SCOPE</div>
          <h2>Where this goes next</h2>
        </div>
        <div className="future-list">
          <div className="future-item">Real-time autonomous navigation</div>
          <div className="future-item">Indoor 3D mapping</div>
          <div className="future-item">Robotics and obstacle avoidance</div>
          <div className="future-item">Search-and-rescue applications</div>
          <div className="future-item">Smart city monitoring</div>
          <div className="future-item">Security and surveillance</div>
          <div className="future-item">Enhanced object classification</div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="contact">
        <div className="footer-top">
          <div className="footer-cta">
            <div className="eyebrow"><span className="num">08</span><span className="line"></span>CONTACT</div>
            <h2>Open source. Open to questions.</h2>
          </div>
          <div className="footer-links">
            <a
              href="https://github.com/Maskedhelp2/Space-visualiser.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB REPO →
            </a>
            <a href="#">PROJECT REPORT →</a>
            <a href="mailto:masked@maskedhelp.com">EMAIL US →</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>LOW-COST 2D-TO-3D LIDAR MAPPING</span>
          <span>// 2026</span>
        </div>
      </footer>
    </>
  );
}