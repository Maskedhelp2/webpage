'use client'

import { useEffect, useRef } from 'react'

const TRIGGERS: Record<string, () => void> = {
  'kinginyellow': fireKingInYellow,
  'd3rlord3':     fireD3rLord3,
  'wop':          fireWOP,
}

function removeOverlay(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.style.opacity = '0'
    setTimeout(() => el.remove(), 500) // Fade out before removing
  }
  document.body.style.overflow = ''
}

function removeAllOverlays() {
  document.querySelectorAll<HTMLElement>('[id^="egg-"]').forEach((overlay) => {
    removeOverlay(overlay.id)
  })
}

function createOverlay(id: string): HTMLDivElement {
  document.getElementById(id)?.remove()
  const el = document.createElement('div')
  el.id = id
  el.style.cssText = `position:fixed;inset:0;z-index:999999;pointer-events:all;opacity:0;transition:opacity 0.5s ease-in;`
  document.body.appendChild(el)
  
  // Force reflow to trigger transition
  void el.offsetWidth
  el.style.opacity = '1'
  document.body.style.overflow = 'hidden'
  return el
}

// ─────────────────────────────────────────────────────────────────
// 1. KING IN YELLOW
// The layout is now perfectly responsive using auto-margins.
// Nerves are now organic, branching, squiggly veins wrapping inward.
// ─────────────────────────────────────────────────────────────────
function fireKingInYellow() {
  const overlay = createOverlay('egg-kiy')
  
  overlay.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.id === 'kiy-dismiss') {
      removeOverlay('egg-kiy')
      return
    }
    // Jump scare snap mechanic
    overlay.classList.add('jump-snap')
    setTimeout(() => overlay.classList.remove('jump-snap'), 150)
  })

  // 13 eyes, heavily scattered.
  const EYES = [
    { c:'xl', top:'50%', left:'50%', tx:-50, ty:-50, rot:0,   z:20, bd:35000, blur:0,    op:1,    zalgoed: true  },
    { c:'lg', top:'12%', left:'78%', tx:0,   ty:0,   rot:25,  z:12 },
    { c:'lg', top:'75%', left:'18%', tx:0,   ty:0,   rot:-35, z:13 },
    { c:'lg', top:'82%', left:'85%', tx:0,   ty:0,   rot:55,  z:14 },
    { c:'md', top:'10%', left:'12%', tx:0,   ty:0,   rot:-15, z:11 },
    { c:'md', top:'35%', left:'5%',  tx:0,   ty:0,   rot:-45, z:9  },
    { c:'md', top:'55%', left:'92%', tx:0,   ty:0,   rot:38,  z:10 },
    { c:'md', top:'22%', left:'45%', tx:0,   ty:0,   rot:8,   z:15 },
    { c:'sm', top:'92%', left:'45%', tx:-50, ty:0,   rot:-5,  z:8  },
    { c:'xs', top:'82%', left:'12%', tx:0,   ty:0,   rot:135, z:5,  bd:7100,  blur:1.5,  op:0.5,  zalgoed: false },
  ]

  const eyeHTML = EYES.map((e, i) => {
    // Procedurally generated organic nerves (branching fractal patterns from edges)
    const numVeins = e.c === 'xl' ? 18 : e.c === 'lg' ? 12 : 8;
    const vessels = Array.from({length: numVeins}, (_, vi) => {
      const baseAng = (360 / numVeins) * vi;
      const ang = baseAng + (Math.random() * 40 - 20); // Randomize angle slightly
      const len = 15 + Math.random() * 25; // Length inward (15% to 40%)
      const thick = e.c === 'xl' ? (Math.random() > 0.5 ? 2 : 1) : 1;
      const delay = Math.random() * 3;
      
      // Randomly spawn branches on the nerves to make them look biological
      const branch1 = Math.random() > 0.3 ? `<div class="kiy-vein-branch" style="--br: -${15+Math.random()*25}deg; --bh: ${40+Math.random()*40}%;"></div>` : '';
      const branch2 = Math.random() > 0.3 ? `<div class="kiy-vein-branch" style="--br: ${15+Math.random()*25}deg; --bh: ${40+Math.random()*40}%;"></div>` : '';

      return `
      <div class="kiy-vein-root" style="transform: rotate(${ang}deg); --vt:${thick}px; --vl:${len}%; --vd:${delay}s;">
        ${branch1}
        ${branch2}
      </div>`;
    }).join('')
    
    const tears = e.c==='xl' ? [0,35,65].map((l,ti) => `<div class="kiy-tear" style="--td:${3.4+ti*0.8}s;--tdd:${ti*0.7}s;left:${l}%"></div>`).join('') :
                  e.c==='lg' ? `<div class="kiy-tear" style="--td:${4+i*0.3}s;--tdd:${i*0.2}s"></div>` : ''
    
    // The main center eye has a much longer blink delay
    const isCenter = e.c === 'xl';

    return `<div class="kiy-eye-unit kiy-eye-${e.c}" data-idx="${i}"
      style="top:${e.top};left:${e.left};transform:translate(${e.tx}%,${e.ty}%) rotate(${e.rot}deg);z-index:${e.z};
             --bd:${isCenter ? 35000 : 2000 + Math.random()*5000}ms; --bld:${Math.random()*5}s;
             --fd:${6+Math.random()*4}s; --fdd:${Math.random()*2}s; --fy:${6+Math.random()*6}px;
             --td:${5+Math.random()*3}s; --tdd:${Math.random()*2}s; --tx:${(Math.random()-0.5)*4}px; --ty:${(Math.random()-0.5)*3}px">
      <div class="kiy-glow"></div>
      <div class="kiy-swell"></div>
      <div class="kiy-eye-shape">
        ${vessels}
        <div class="kiy-iris"></div>
        <div class="kiy-pupil"></div>
        <div class="kiy-gloss"></div>
        <div class="kiy-lid-top"></div>
        <div class="kiy-lid-bot"></div>
      </div>
    </div>`
  }).join('\n')

  overlay.innerHTML = `
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
    ${eyeHTML}
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
  `

  const eyes   = overlay.querySelectorAll('.kiy-eye-unit')
  const flash  = overlay.querySelector('#kiy-flash') as HTMLElement
  const subTxt = overlay.querySelector('#kiy-subliminal-text') as HTMLElement
  const timer  = overlay.querySelector('#kiy-timer') as HTMLElement

  let lastMx = window.innerWidth / 2
  let lastMy = window.innerHeight / 2
  let mouseSpeed = 0

  overlay.addEventListener('mousemove', (e) => {
    const mx = e.clientX, my = e.clientY
    
    // Calculate speed for pupil dilation (fast = constrict, slow = dilate)
    const distMoved = Math.hypot(mx - lastMx, my - lastMy)
    mouseSpeed = mouseSpeed * 0.8 + distMoved * 0.2 // Smoothing
    let dilation = 1 - Math.min(mouseSpeed / 50, 0.6) // Constricts down to 0.4 scale
    if (dilation < 0.3) dilation = 0.3

    eyes.forEach(eye => {
      const el   = eye as HTMLElement
      const rect = el.getBoundingClientRect()
      const ex   = rect.left + rect.width / 2
      const ey   = rect.top  + rect.height / 2
      
      const ang  = Math.atan2(my - ey, mx - ex)
      // Limit pupil translation so it doesn't leave the eye boundary entirely
      const dist = Math.min(rect.width * 0.18, Math.hypot(mx - ex, my - ey) / 10)
      
      el.style.setProperty('--px', `${Math.cos(ang) * dist}px`)
      el.style.setProperty('--py', `${Math.sin(ang) * dist}px`)
      el.style.setProperty('--dil', `${dilation}`)
    })

    lastMx = mx
    lastMy = my
  })

  // Idle dilation (if mouse stops, pupils dilate wide)
  const idleInterval = setInterval(() => {
    mouseSpeed *= 0.5
    if (mouseSpeed < 1) {
      eyes.forEach(eye => (eye as HTMLElement).style.setProperty('--dil', '1.2'))
    }
  }, 100)

  // Timer
  const start = Date.now()
  const timerInterval = setInterval(() => {
    const s = Math.floor((Date.now() - start) / 1000)
    const mm = String(Math.floor(s / 60)).padStart(2,'0')
    const ss = String(s % 60).padStart(2,'0')
    timer.textContent = `[ EXPOSURE TIME: ${mm}:${ss} — DO NOT BLINK ]`
  }, 1000)

  // Aggressive Subliminals
  const SUBLIMINALS = [
    "I AM IN YOUR WALLS", "DO NOT LOOK BEHIND YOU", "THEY ARE HATCHING", 
    "YOU CANNOT WAKE UP", "CARCOSA", "SUBMIT", "IT SEES YOU", "FLESH"
  ]
  const flashInterval = setInterval(() => {
    if (Math.random() > 0.6) {
      subTxt.textContent = SUBLIMINALS[Math.floor(Math.random() * SUBLIMINALS.length)]
      flash.classList.add('fire')
      setTimeout(() => flash.classList.remove('fire'), 200)
    }
  }, 2500)

  // Cleanup
  const obs = new MutationObserver(() => {
    if (!document.body.contains(overlay)) {
      clearInterval(timerInterval)
      clearInterval(flashInterval)
      clearInterval(idleInterval)
      obs.disconnect()
    }
  })
  obs.observe(document.body, { childList: true })
}

// ─────────────────────────────────────────────────────────────────
// 2. D3RLORD3
// The terminal types naturally with hesitations and backspaces.
// When the hazard hits, the terminal breaks its CSS boundaries.
// ─────────────────────────────────────────────────────────────────
function fireD3rLord3() {
  const overlay = createOverlay('egg-d3r')
  overlay.innerHTML = `
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
  `

  const body    = overlay.querySelector('#d3r-body') as HTMLDivElement
  const wrap    = overlay.querySelector('#d3r-wrap') as HTMLDivElement
  const dismiss = overlay.querySelector('#d3r-dismiss') as HTMLDivElement
  const cursor  = overlay.querySelector('#d3r-cursor') as HTMLSpanElement

  dismiss.addEventListener('click', () => removeOverlay('egg-d3r'))

  // Advanced typing script with backspaces and varying speeds
  type Action = 
    | { type: 'text', str: string, speed?: number, cls?: string }
    | { type: 'backspace', count: number, speed?: number }
    | { type: 'pause', ms: number }
    | { type: 'breach' }
    | { type: 'newline' }

  const SCRIPT: Action[] = [
    { type: 'text', str: '> INITIATING SECURE CONNECTION...', cls: 'meta' }, { type: 'newline' }, { type: 'pause', ms: 500 },
    { type: 'text', str: '> AUTHENTICATING... USER: D3RLORD3', cls: 'meta' }, { type: 'newline' }, { type: 'pause', ms: 300 },
    { type: 'text', str: '> FRAGMENT 1/12 ........ [102:14:08] d3rlord3_raw_pt1.mp4', cls: 'meta' }, { type: 'newline' },
    { type: 'text', str: '> LOADING exploration_notes_FINAL.pdf', cls: 'meta' }, { type: 'newline' }, { type: 'pause', ms: 800 },
    { type: 'newline' },
    { type: 'text', str: 'D3rlord3: "The moss grows in spirals. Not from the centre outward... inward."', speed: 20 }, { type: 'newline' }, { type: 'pause', ms: 600 },
    { type: 'text', str: 'D3rlord3: "I stopped walking. The footsteps behind me didn\'t."', speed: 25 }, { type: 'newline' }, { type: 'pause', ms: 1000 },
    { type: 'newline' },
    { type: 'text', str: '> WARNING: FILE CORRUPTION DETECTED IN SECTOR 0x4A', cls: 'highlight' }, { type: 'newline' }, { type: 'pause', ms: 400 },
    { type: 'text', str: 'D3rlord3: "It\'s reading what I type before I send it. Real time."', speed: 15 }, { type: 'newline' }, { type: 'pause', ms: 800 },
    { type: 'text', str: 'D3rlord3: "Set a chunk-load trap at coords 1,247 / -882. It stepped around it."', speed: 20 }, { type: 'newline' }, { type: 'pause', ms: 1200 },
    { type: 'newline' },
    { type: 'text', str: 'D3rlord3: "Got it. Good poem. Cipher stacking is cowardly."', speed: 30 }, { type: 'newline' }, { type: 'pause', ms: 500 },
    { type: 'text', str: 'D3rlord3: "Moving to the golden gates."', speed: 30 }, { type: 'newline' }, { type: 'pause', ms: 1500 },
    { type: 'newline' },
    { type: 'text', str: '> APPROACHING SECTOR: THE GOLDEN GATES', cls: 'highlight', speed: 40 }, { type: 'newline' }, { type: 'pause', ms: 2000 },
    
    // The Breach Sequence
    { type: 'breach' },
    { type: 'text', str: '!!! COGNITOHAZARD BREACH — KNOWLEDGE TRANSFER INITIATED !!!', cls: 'hazard-text', speed: 10 }, { type: 'newline' }, { type: 'pause', ms: 200 },
    { type: 'text', str: 'EXPOSURE: 15 SECONDS. FULL PAST/PRESENT/FUTURE TRANSFER.', cls: 'hazard-text', speed: 10 }, { type: 'newline' }, { type: 'pause', ms: 200 },
    { type: 'text', str: 'H E  I S  L O O K I N G  B A C K', cls: 'hazard-text', speed: 50 }, { type: 'newline' }, { type: 'pause', ms: 400 },
    { type: 'text', str: 'THEY TOOK HIS EYES. THEY GAVE HIM DIFFERENT ONES.', cls: 'hazard-text', speed: 15 }, { type: 'newline' }, { type: 'pause', ms: 300 },
    { type: 'text', str: 'D3RLORD3: "don\'t you know you\'re destroying your own mind too?"', cls: 'hazard-text', speed: 10 }, { type: 'newline' },
  ]

  const ZALGO_CHARS = "̖̗̘̙̜̝̞̟̠̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎͓͔͕͖̍̎̄̅̿̑̆̐͒͗̾͆͊͋͌̃̂̌͐̀́̋̏̒̓̔͗̕͘ͅ"
  const ZALGO_WORDS = ["H̸E̷ ̷C̴O̶M̶E̴S̴", "S̶E̴E̴", "C̷A̴R̷C̸O̷S̴A̵", "B̴L̸E̴E̴D̸", "V̷O̴I̵D̴"]

  let sIdx = 0
  let currentLine: HTMLDivElement | null = null
  let isBreached = false

  function appendLine(cls?: string) {
    currentLine = document.createElement('div')
    currentLine.className = 'd3r-line ' + (cls || '')
    body.insertBefore(currentLine, cursor)
  }

  function processAction() {
    if (!document.body.contains(overlay)) return

    if (sIdx >= SCRIPT.length) {
      if (isBreached) spawnZalgo()
      return
    }

    const action = SCRIPT[sIdx++]

    if (action.type === 'pause') {
      setTimeout(processAction, action.ms)
    } 
    else if (action.type === 'newline') {
      appendLine()
      processAction()
    }
    else if (action.type === 'breach') {
      isBreached = true
      wrap.classList.add('breach')
      dismiss.textContent = '[ FATAL SYSTEM ERROR — NO ESCAPE ]'
      processAction()
    }
    else if (action.type === 'text') {
      if (!currentLine) appendLine(action.cls)
      else if (action.cls) currentLine.className = 'd3r-line ' + action.cls

      const str = action.str
      const speed = action.speed ?? 20
      let charIdx = 0
      function typeChar() {
        if (!document.body.contains(overlay)) return
        if (charIdx < str.length) {
          currentLine!.textContent += str[charIdx++]
          body.scrollTop = body.scrollHeight
          setTimeout(typeChar, speed)
        } else {
          processAction()
        }
      }
      typeChar()
    }
    else if (action.type === 'backspace') {
      let count = action.count
      const speed = action.speed ?? 30
      function doBackspace() {
        if (!document.body.contains(overlay)) return
        if (count > 0 && currentLine && currentLine.textContent!.length > 0) {
          currentLine.textContent = currentLine.textContent!.slice(0, -1)
          count--
          setTimeout(doBackspace, speed)
        } else {
          processAction()
        }
      }
      doBackspace()
    }
  }

  // Spawn Zalgo text that physically breaks out of the container bounds
  function spawnZalgo() {
    if (!document.body.contains(overlay)) return
    
    const zalgoEl = document.createElement('div')
    zalgoEl.className = 'zalgo-text'
    
    // Position randomly across the ENTIRE viewport relative to the wrap
    const rect = wrap.getBoundingClientRect()
    const x = (Math.random() * window.innerWidth) - rect.left
    const y = (Math.random() * window.innerHeight) - rect.top
    
    zalgoEl.style.left = `${x}px`
    zalgoEl.style.top = `${y}px`
    zalgoEl.style.transform = `rotate(${(Math.random()-0.5)*40}deg)`
    
    const baseWord = ZALGO_WORDS[Math.floor(Math.random() * ZALGO_WORDS.length)]
    let corrupted = ''
    for (let i=0; i<baseWord.length; i++) {
      corrupted += baseWord[i]
      const gl = Math.floor(Math.random()*10)
      for(let j=0; j<gl; j++) corrupted += ZALGO_CHARS[Math.floor(Math.random()*ZALGO_CHARS.length)]
    }
    zalgoEl.textContent = corrupted
    
    wrap.appendChild(zalgoEl)
    
    // Rapid spawning
    setTimeout(spawnZalgo, 50 + Math.random() * 100)
  }

  appendLine()
  setTimeout(processAction, 1000)
}

// ─────────────────────────────────────────────────────────────────
// 3. WOP — WORLD'S OPERATION
// Uses navigator data. Slowly tints screen red. 
// The dismiss button physically evades the cursor on hover.
// ─────────────────────────────────────────────────────────────────
function fireWOP() {
  const overlay = createOverlay('egg-wop')
  const fakeIP = `192.168.${Math.floor(Math.random()*254)+1}.${Math.floor(Math.random()*254)+1}`
  overlay.innerHTML = `
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
        <span class="base">CLEARANCE GRANTED · FIELD OPERATIVE · EYES ONLY</span>
        <span class="alt">TARGET ACQUIRED · SURVEILLANCE ACTIVE · NO EXIT</span>
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
            <span class="alt">TARGET: ${fakeIP}</span>
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
  `

  const ts = overlay.querySelector('#wop-ts') as HTMLElement
  ts.textContent = new Date().toISOString().split('T')[1].split('.')[0] + ' UTC'

  // The red compromised state only exists while the card is hovered.
  const wopCard = overlay.querySelector('#wop-card') as HTMLElement
  const reveal = () => overlay.classList.add('revealed')
  const conceal = () => overlay.classList.remove('revealed')
  wopCard.addEventListener('mouseenter', reveal)
  wopCard.addEventListener('mouseleave', conceal)

  overlay.querySelector('#wop-dismiss')!.addEventListener('click', () => removeOverlay('egg-wop'))
}

// ─────────────────────────────────────────────────────────────────
// LISTENER
// ─────────────────────────────────────────────────────────────────
export default function EasterEgg() {
  const bufferRef = useRef('')
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const maxLen = Math.max(...Object.keys(TRIGGERS).map(k => k.length))

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        removeAllOverlays()
        bufferRef.current = ''
        if (timerRef.current) clearTimeout(timerRef.current)
        return
      }

      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement).isContentEditable) return
      if (e.key.length !== 1) return

      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-maxLen)
      if (timerRef.current) clearTimeout(timerRef.current)
      
      timerRef.current = setTimeout(() => { bufferRef.current = '' }, 2000)

      for (const [trigger, fn] of Object.entries(TRIGGERS)) {
        if (bufferRef.current.endsWith(trigger)) {
          bufferRef.current = ''
          fn()
          break
        }
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return null
}
