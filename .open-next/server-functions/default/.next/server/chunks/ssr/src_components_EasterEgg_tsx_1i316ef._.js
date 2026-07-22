module.exports=[68750,a=>{"use strict";var b=a.i(72131);let c={kinginyellow:function(){let a=e("egg-kiy");a.addEventListener("click",b=>{"kiy-dismiss"===b.target.id?d("egg-kiy"):(a.classList.add("jump-snap"),setTimeout(()=>a.classList.remove("jump-snap"),150))});let b=[{c:"xl",top:"50%",left:"50%",tx:-50,ty:-50,rot:0,z:20,bd:35e3,blur:0,op:1,zalgoed:!0},{c:"lg",top:"12%",left:"78%",tx:0,ty:0,rot:25,z:12},{c:"lg",top:"75%",left:"18%",tx:0,ty:0,rot:-35,z:13},{c:"lg",top:"82%",left:"85%",tx:0,ty:0,rot:55,z:14},{c:"md",top:"10%",left:"12%",tx:0,ty:0,rot:-15,z:11},{c:"md",top:"35%",left:"5%",tx:0,ty:0,rot:-45,z:9},{c:"md",top:"55%",left:"92%",tx:0,ty:0,rot:38,z:10},{c:"md",top:"22%",left:"45%",tx:0,ty:0,rot:8,z:15},{c:"sm",top:"92%",left:"45%",tx:-50,ty:0,rot:-5,z:8},{c:"xs",top:"82%",left:"12%",tx:0,ty:0,rot:135,z:5,bd:7100,blur:1.5,op:.5,zalgoed:!1}].map((a,b)=>{let c="xl"===a.c?18:"lg"===a.c?12:8,d=Array.from({length:c},(b,d)=>{let e=360/c*d+(40*Math.random()-20),f=15+25*Math.random(),g="xl"===a.c&&Math.random()>.5?2:1,h=3*Math.random(),i=Math.random()>.3?`<div class="kiy-vein-branch" style="--br: -${15+25*Math.random()}deg; --bh: ${40+40*Math.random()}%;"></div>`:"",j=Math.random()>.3?`<div class="kiy-vein-branch" style="--br: ${15+25*Math.random()}deg; --bh: ${40+40*Math.random()}%;"></div>`:"";return`
      <div class="kiy-vein-root" style="transform: rotate(${e}deg); --vt:${g}px; --vl:${f}%; --vd:${h}s;">
        ${i}
        ${j}
      </div>`}).join("");"xl"===a.c?[0,35,65].map((a,b)=>`<div class="kiy-tear" style="--td:${3.4+.8*b}s;--tdd:${.7*b}s;left:${a}%"></div>`).join(""):a.c;let e="xl"===a.c;return`<div class="kiy-eye-unit kiy-eye-${a.c}" data-idx="${b}"
      style="top:${a.top};left:${a.left};transform:translate(${a.tx}%,${a.ty}%) rotate(${a.rot}deg);z-index:${a.z};
             --bd:${e?35e3:2e3+5e3*Math.random()}ms; --bld:${5*Math.random()}s;
             --fd:${6+4*Math.random()}s; --fdd:${2*Math.random()}s; --fy:${6+6*Math.random()}px;
             --td:${5+3*Math.random()}s; --tdd:${2*Math.random()}s; --tx:${(Math.random()-.5)*4}px; --ty:${(Math.random()-.5)*3}px">
      <div class="kiy-glow"></div>
      <div class="kiy-swell"></div>
      <div class="kiy-eye-shape">
        ${d}
        <div class="kiy-iris"></div>
        <div class="kiy-pupil"></div>
        <div class="kiy-gloss"></div>
        <div class="kiy-lid-top"></div>
        <div class="kiy-lid-bot"></div>
      </div>
    </div>`}).join("\n");a.innerHTML=`
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
    ${b}
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
  `;let c=a.querySelectorAll(".kiy-eye-unit"),f=a.querySelector("#kiy-flash"),g=a.querySelector("#kiy-subliminal-text"),h=a.querySelector("#kiy-timer"),i=window.innerWidth/2,j=window.innerHeight/2,k=0;a.addEventListener("mousemove",a=>{let b=a.clientX,d=a.clientY,e=1-Math.min((k=.8*k+.2*Math.hypot(b-i,d-j))/50,.6);e<.3&&(e=.3),c.forEach(a=>{let c=a.getBoundingClientRect(),f=c.left+c.width/2,g=c.top+c.height/2,h=Math.atan2(d-g,b-f),i=Math.min(.18*c.width,Math.hypot(b-f,d-g)/10);a.style.setProperty("--px",`${Math.cos(h)*i}px`),a.style.setProperty("--py",`${Math.sin(h)*i}px`),a.style.setProperty("--dil",`${e}`)}),i=b,j=d});let l=setInterval(()=>{(k*=.5)<1&&c.forEach(a=>a.style.setProperty("--dil","1.2"))},100),m=Date.now(),n=setInterval(()=>{let a=Math.floor((Date.now()-m)/1e3),b=String(Math.floor(a/60)).padStart(2,"0"),c=String(a%60).padStart(2,"0");h.textContent=`[ EXPOSURE TIME: ${b}:${c} — DO NOT BLINK ]`},1e3),o=["I AM IN YOUR WALLS","DO NOT LOOK BEHIND YOU","THEY ARE HATCHING","YOU CANNOT WAKE UP","CARCOSA","SUBMIT","IT SEES YOU","FLESH"],p=setInterval(()=>{Math.random()>.6&&(g.textContent=o[Math.floor(Math.random()*o.length)],f.classList.add("fire"),setTimeout(()=>f.classList.remove("fire"),200))},2500),q=new MutationObserver(()=>{document.body.contains(a)||(clearInterval(n),clearInterval(p),clearInterval(l),q.disconnect())});q.observe(document.body,{childList:!0})},d3rlord3:function(){let a=e("egg-d3r");a.innerHTML=`
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
  `;let b=a.querySelector("#d3r-body"),c=a.querySelector("#d3r-wrap"),f=a.querySelector("#d3r-dismiss"),g=a.querySelector("#d3r-cursor");f.addEventListener("click",()=>d("egg-d3r"));let h=[{type:"text",str:"> INITIATING SECURE CONNECTION...",cls:"meta"},{type:"newline"},{type:"pause",ms:500},{type:"text",str:"> AUTHENTICATING... USER: D3RLORD3",cls:"meta"},{type:"newline"},{type:"pause",ms:300},{type:"text",str:"> FRAGMENT 1/12 ........ [102:14:08] d3rlord3_raw_pt1.mp4",cls:"meta"},{type:"newline"},{type:"text",str:"> LOADING exploration_notes_FINAL.pdf",cls:"meta"},{type:"newline"},{type:"pause",ms:800},{type:"newline"},{type:"text",str:'D3rlord3: "The moss grows in spirals. Not from the centre outward... inward."',speed:20},{type:"newline"},{type:"pause",ms:600},{type:"text",str:'D3rlord3: "I stopped walking. The footsteps behind me didn\'t."',speed:25},{type:"newline"},{type:"pause",ms:1e3},{type:"newline"},{type:"text",str:"> WARNING: FILE CORRUPTION DETECTED IN SECTOR 0x4A",cls:"highlight"},{type:"newline"},{type:"pause",ms:400},{type:"text",str:'D3rlord3: "It\'s reading what I type before I send it. Real time."',speed:15},{type:"newline"},{type:"pause",ms:800},{type:"text",str:'D3rlord3: "Set a chunk-load trap at coords 1,247 / -882. It stepped around it."',speed:20},{type:"newline"},{type:"pause",ms:1200},{type:"newline"},{type:"text",str:'D3rlord3: "Got it. Good poem. Cipher stacking is cowardly."',speed:30},{type:"newline"},{type:"pause",ms:500},{type:"text",str:'D3rlord3: "Moving to the golden gates."',speed:30},{type:"newline"},{type:"pause",ms:1500},{type:"newline"},{type:"text",str:"> APPROACHING SECTOR: THE GOLDEN GATES",cls:"highlight",speed:40},{type:"newline"},{type:"pause",ms:2e3},{type:"breach"},{type:"text",str:"!!! COGNITOHAZARD BREACH — KNOWLEDGE TRANSFER INITIATED !!!",cls:"hazard-text",speed:10},{type:"newline"},{type:"pause",ms:200},{type:"text",str:"EXPOSURE: 15 SECONDS. FULL PAST/PRESENT/FUTURE TRANSFER.",cls:"hazard-text",speed:10},{type:"newline"},{type:"pause",ms:200},{type:"text",str:"H E  I S  L O O K I N G  B A C K",cls:"hazard-text",speed:50},{type:"newline"},{type:"pause",ms:400},{type:"text",str:"THEY TOOK HIS EYES. THEY GAVE HIM DIFFERENT ONES.",cls:"hazard-text",speed:15},{type:"newline"},{type:"pause",ms:300},{type:"text",str:"D3RLORD3: \"don't you know you're destroying your own mind too?\"",cls:"hazard-text",speed:10},{type:"newline"}],i="̖̗̘̙̜̝̞̟̠̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎͓͔͕͖̍̎̄̅̿̑̆̐͒͗̾͆͊͋͌̃̂̌͐̀́̋̏̒̓̔͗̕͘ͅ",j=["H̸E̷ ̷C̴O̶M̶E̴S̴","S̶E̴E̴","C̷A̴R̷C̸O̷S̴A̵","B̴L̸E̴E̴D̸","V̷O̴I̵D̴"],k=0,l=null,m=!1;function n(a){(l=document.createElement("div")).className="d3r-line "+(a||""),b.insertBefore(l,g)}n(),setTimeout(function d(){if(!document.body.contains(a))return;if(k>=h.length){m&&function b(){if(!document.body.contains(a))return;let d=document.createElement("div");d.className="zalgo-text";let e=c.getBoundingClientRect(),f=Math.random()*window.innerWidth-e.left,g=Math.random()*window.innerHeight-e.top;d.style.left=`${f}px`,d.style.top=`${g}px`,d.style.transform=`rotate(${(Math.random()-.5)*40}deg)`;let h=j[Math.floor(Math.random()*j.length)],k="";for(let a=0;a<h.length;a++){k+=h[a];let b=Math.floor(10*Math.random());for(let a=0;a<b;a++)k+=i[Math.floor(Math.random()*i.length)]}d.textContent=k,c.appendChild(d),setTimeout(b,50+100*Math.random())}();return}let e=h[k++];if("pause"===e.type)setTimeout(d,e.ms);else if("newline"===e.type)n(),d();else if("breach"===e.type)m=!0,c.classList.add("breach"),f.textContent="[ FATAL SYSTEM ERROR — NO ESCAPE ]",d();else if("text"===e.type){l?e.cls&&(l.className="d3r-line "+e.cls):n(e.cls);let c=e.str,f=e.speed??20,g=0;!function e(){document.body.contains(a)&&(g<c.length?(l.textContent+=c[g++],b.scrollTop=b.scrollHeight,setTimeout(e,f)):d())}()}else if("backspace"===e.type){let b=e.count,c=e.speed??30;!function e(){document.body.contains(a)&&(b>0&&l&&l.textContent.length>0?(l.textContent=l.textContent.slice(0,-1),b--,setTimeout(e,c)):d())}()}},1e3)},wop:function(){let a=e("egg-wop"),b=`192.168.${Math.floor(254*Math.random())+1}.${Math.floor(254*Math.random())+1}`;a.innerHTML=`
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
            <span class="alt">TARGET: ${b}</span>
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
  `,a.querySelector("#wop-ts").textContent=new Date().toISOString().split("T")[1].split(".")[0]+" UTC";let c=a.querySelector("#wop-card");c.addEventListener("mouseenter",()=>a.classList.add("revealed")),c.addEventListener("mouseleave",()=>a.classList.remove("revealed")),a.querySelector("#wop-dismiss").addEventListener("click",()=>d("egg-wop"))}};function d(a){let b=document.getElementById(a);b&&(b.style.opacity="0",setTimeout(()=>b.remove(),500)),document.body.style.overflow=""}function e(a){document.getElementById(a)?.remove();let b=document.createElement("div");return b.id=a,b.style.cssText="position:fixed;inset:0;z-index:999999;pointer-events:all;opacity:0;transition:opacity 0.5s ease-in;",document.body.appendChild(b),b.offsetWidth,b.style.opacity="1",document.body.style.overflow="hidden",b}a.s(["default",0,function(){let a=(0,b.useRef)(""),e=(0,b.useRef)(null);return(0,b.useEffect)(()=>{let b=Math.max(...Object.keys(c).map(a=>a.length));function f(f){if("Escape"===f.key){document.querySelectorAll('[id^="egg-"]').forEach(a=>{d(a.id)}),a.current="",e.current&&clearTimeout(e.current);return}let g=f.target.tagName;if("INPUT"!==g&&"TEXTAREA"!==g&&!f.target.isContentEditable&&1===f.key.length){for(let[d,g]of(a.current=(a.current+f.key.toLowerCase()).slice(-b),e.current&&clearTimeout(e.current),e.current=setTimeout(()=>{a.current=""},2e3),Object.entries(c)))if(a.current.endsWith(d)){a.current="",g();break}}}return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[]),null}])}];

//# sourceMappingURL=src_components_EasterEgg_tsx_1i316ef._.js.map