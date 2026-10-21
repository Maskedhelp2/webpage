"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PAGE_MARKUP = String.raw`<section class="hero-intro" id="home">
  <div class="wrap">
    <div class="hero-copy">
      <div class="tag">AI-powered autonomous drone surveying // 2026</div>
      <h1>AEROCADASTRA<span></span></h1>
      <p class="sub">Aerial land survey and resurvey for rural agricultural India. One carrier. Two child drones. One unified workflow.</p>
    </div>
  </div>
</section>

<section class="flight-showcase" aria-label="Interactive full-screen 3D aircraft showcase">
  <div class="flight-vignette"></div>
  <div class="hero-scene" aria-label="Interactive 3D AeroCadastra aircraft">
    <canvas id="plane-canvas" tabindex="0" aria-label="Drag to rotate the 3D aircraft. Use arrow keys to change its view."></canvas>
    <div class="flight-reticle" aria-hidden="true"><span></span><i></i><b></b></div>
    <div class="flight-status" aria-hidden="true"><span class="status-dot"></span><span>FLIGHT SYSTEMS</span><strong id="flight-phase">INITIALIZING</strong></div>
    <div class="hero-instruction">Drag to explore · Scroll to discover</div>
    <div class="hero-hud"><div><div class="hud-line"></div><span>Carrier platform</span><strong>AC / 01</strong></div><div><div class="hud-line"></div><span>Fleet architecture</span><strong>1 + 2 UAVs</strong></div></div>
  </div>
  <div class="flight-caption"><span>01 / AEROCADASTRA</span><span>PRECISION IN MOTION</span></div>
  <a class="hero-scroll" href="#systems">Scroll to explore</a>
</section>

<section id="systems" class="hero-systems" style="padding-top:120px">
  <div class="wrap">
    <div class="stage">
      <div class="box">
        <span class="lbl"><span>// The mothership</span><span>Schematic / not to scale</span></span>
        <div class="bp">
        <svg viewBox="0 0 900 470" role="img" aria-label="Schematic of the AeroCadastra carrier with five interactive markers">
          <line class="thin" x1="450" y1="20" x2="450" y2="450" stroke-dasharray="4 6"/>
          <rect class="scan" x="40" y="10" width="820" height="2"/>
          <!-- wings -->
          <path class="air" d="M432 170 L70 215 Q58 230 66 246 L432 232 Z"/>
          <path class="air" d="M468 170 L830 215 Q842 230 834 246 L468 232 Z"/>
          <!-- tail -->
          <path class="air" d="M442 388 L330 414 L336 428 L442 412 Z"/>
          <path class="air" d="M458 388 L570 414 L564 428 L458 412 Z"/>
          <!-- fuselage -->
          <path class="air" d="M450 36 C470 66 476 140 470 262 L460 408 L440 408 L430 262 C424 140 430 66 450 36 Z"/>
          <!-- lens, antenna, compute -->
          <circle class="thin" cx="450" cy="110" r="9"/><circle class="thin" cx="450" cy="110" r="3"/>
          <circle class="thin" cx="450" cy="200" r="7"/><line class="thin" x1="443" y1="200" x2="457" y2="200"/><line class="thin" x1="450" y1="193" x2="450" y2="207"/>
          <rect class="thin" x="438" y="308" width="24" height="26"/>
          <!-- child drones -->
          <g id="cl"><line class="thin" x1="238" y1="245" x2="272" y2="279"/><line class="thin" x1="272" y1="245" x2="238" y2="279"/><ellipse class="air" cx="255" cy="262" rx="12" ry="7"/>
            <circle class="rot" cx="238" cy="245" r="10"/><circle class="rot" cx="272" cy="245" r="10"/><circle class="rot" cx="238" cy="279" r="10"/><circle class="rot" cx="272" cy="279" r="10"/></g>
          <g><line class="thin" x1="628" y1="245" x2="662" y2="279"/><line class="thin" x1="662" y1="245" x2="628" y2="279"/><ellipse class="air" cx="645" cy="262" rx="12" ry="7"/>
            <circle class="rot" cx="628" cy="245" r="10"/><circle class="rot" cx="662" cy="245" r="10"/><circle class="rot" cx="628" cy="279" r="10"/><circle class="rot" cx="662" cy="279" r="10"/></g>

          <!-- markers -->
          <g class="hs on" data-k="airframe" tabindex="0" role="button" aria-label="Airframe"><circle class="p" cx="140" cy="223" r="8"/><circle class="d" cx="140" cy="223" r="8"/><text x="140" y="262" text-anchor="middle">01 Airframe</text></g>
          <g class="hs" data-k="payload" tabindex="0" role="button" aria-label="Imaging payload"><circle class="p" cx="450" cy="110" r="8"/><circle class="d" cx="450" cy="110" r="8"/><text x="474" y="115">02 Imaging payload</text></g>
          <g class="hs" data-k="gnss" tabindex="0" role="button" aria-label="Positioning"><circle class="p" cx="450" cy="200" r="8"/><circle class="d" cx="450" cy="200" r="8"/><text x="474" y="187">03 RTK / GNSS</text></g>
          <g class="hs" data-k="child" tabindex="0" role="button" aria-label="Child drone"><circle class="p" cx="255" cy="262" r="8"/><circle class="d" cx="255" cy="262" r="8"/><text x="255" y="312" text-anchor="middle">04 Child drone</text></g>
          <g class="hs" data-k="child" tabindex="0" role="button" aria-label="Child drone"><circle class="p" cx="645" cy="262" r="8"/><circle class="d" cx="645" cy="262" r="8"/><text x="645" y="312" text-anchor="middle">04 Child drone</text></g>
          <g class="hs" data-k="link" tabindex="0" role="button" aria-label="Data link"><circle class="p" cx="450" cy="321" r="8"/><circle class="d" cx="450" cy="321" r="8"/><text x="474" y="326">05 Data link</text></g>
        </svg>
        </div>
      </div>

      <div class="box list">
        <span class="lbl"><span>// Systems</span><span>Tap a marker</span></span>
        <div class="item on" data-k="airframe"><button class="hd"><i>01</i>Fixed-wing airframe</button><div class="bd"><p>The carrier is a fixed-wing aerial platform built to cover large agricultural areas efficiently in a single survey.</p><div class="chips"><span>Fixed-wing</span><span>Large-area coverage</span></div></div></div>
        <div class="item" data-k="payload"><button class="hd"><i>02</i>Imaging payload</button><div class="bd"><p>Captures high-resolution aerial imagery. AI and computer vision then pick out land features and areas that need field verification.</p><div class="chips"><span>High-res imagery</span><span>AI analysis</span></div></div></div>
        <div class="item" data-k="gnss"><button class="hd"><i>03</i>RTK / GNSS positioning</button><div class="bd"><p>Precise geo-referencing ties every image to exact coordinates, so it can be compared against existing land records.</p><div class="chips"><span>RTK</span><span>DGPS</span><span>GNSS</span></div></div></div>
        <div class="item" data-k="child"><button class="hd"><i>04</i>Child drones</button><div class="bd"><p>Two autonomous child drones complement the carrier with extra aerial perspectives, positioning data, telemetry and video feeds.</p><div class="chips"><span>2 child drones</span><span>Telemetry</span><span>Video feed</span></div></div></div>
        <div class="item" data-k="link"><button class="hd"><i>05</i>Data link</button><div class="bd"><p>Fleet telemetry and imagery stream to the ground station, where AI detection and GIS cadastral mapping turn them into survey results.</p><div class="chips"><span>Telemetry</span><span>Ground station</span><span>GIS</span></div></div></div>
      </div>
    </div>
  </div>
</section>

<section id="about">
  <div class="wrap">
    <div class="tag">// About the plane</div>
    <h2>Mapping the land, <em>faster</em></h2>
    <div class="cols">
      <div class="about">
        <p class="lead"><strong>AeroCadastra</strong> is a technology-driven aerial land survey and resurvey solution designed to modernize the mapping and management of rural agricultural land in India.</p>
        <div class="feat">
          <div><i>01</i>Drone-based aerial surveying</div>
          <div><i>02</i>RTK / DGPS / GNSS positioning</div>
          <div><i>03</i>AI-assisted image analysis</div>
          <div><i>04</i>GIS-enabled cadastral mapping</div>
          <div><i>05</i>Geo-referenced land information</div>
          <div class="all"><span>All combined into <b>one unified workflow</b></span></div>
        </div>
        <div class="blk"><h3><i>//</i> The platform</h3>
          <p>AeroCadastra uses a fixed-wing aerial platform to efficiently capture high-resolution imagery over large agricultural areas. Autonomous child drones can complement the main platform by providing additional aerial perspectives, positioning data, telemetry, and video feeds.</p></div>
        <div class="blk"><h3><i>//</i> From imagery to maps</h3>
          <p>The captured imagery can then be processed using AI and computer-vision techniques to identify relevant land features and areas requiring verification. With precise geo-referencing, this information can support the creation and updating of digital cadastral maps and comparison against existing land records.</p></div>
        <div class="blk"><h3><i>//</i> Connected land records</h3>
          <p>The proposed solution further integrates these records into a unified digital land-information workflow:</p>
          <div class="chips"><span>Record of Rights (RoR)</span><span>Mutation records</span><span>Registration data</span><span>Survey maps</span><span>Ownership history</span><span>Precise geo-coordinates</span></div>
          <p style="margin-top:14px">This enables discrepancies between recorded and observed land conditions to be identified and sent for field verification.</p></div>
        <div class="callout"><h3>The objective</h3>
          <p>To create a scalable, evidence-based system that can make rural land surveying <strong>faster, more accurate, transparent, and suitable for digital land administration</strong>, while also providing a foundation for agricultural planning and future precision-agriculture applications.</p></div>
        <div class="scale"><span><b>1</b> carrier</span><u>+</u><span><b>2</b> child drones</span><u>&rarr;</u><span>larger coordinated fleets</span></div>
        <p class="note">The architecture is intentionally scalable: the initial prototype uses one carrier and two child drones, with a planned progression toward larger coordinated aerial fleets after the core system is validated.</p>
      </div>
      <div>
        <div class="tag">// Milestones</div>
        <!-- Statuses are editable: class "done", "" (in progress) or "next". Add dates inside the span if you want them. -->
        <ul class="mile">
          <li class="done"><b>Concept <em>Done</em></b><span>System architecture defined: one fixed-wing carrier and two autonomous child drones.</span></li>
          <li class="done"><b>Prototype airframe <em>Done</em></b><span>Carrier airframe built and tested hands-on in the lab.</span></li>
          <li class="done"><b>AI person detection <em>Done</em></b><span>Lab-trained YOLO model detecting people in aerial footage.</span></li>
          <li><b>Ground station <em>In progress</em></b><span>Desktop app for fleet telemetry, aerial imagery, AI detection and GIS land analysis.</span></li>
          <li class="next"><b>Land records integration <em>Next</em></b><span>Linking RoR, mutation records and survey maps to precise geo-coordinates.</span></li>
          <li class="next"><b>Field validation <em>Next</em></b><span>Survey real agricultural land and compare observations with recorded data.</span></li>
          <li class="next"><b>Fleet scale-up <em>Next</em></b><span>Move from one carrier and two child drones to larger coordinated fleets.</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="center">
  <div class="wrap">
    <div class="tag">// In action</div>
    <h2>Video of the <em>working</em></h2>
    <div class="box work">
      <span class="lbl"><span>// System demo</span></span>
      <video controls preload="metadata" playsinline>
        <!-- Add your demo video here, e.g. <source src="/videos/aerocadastra-demo.mp4" type="video/mp4" /> -->
      </video>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="partner">
      <div class="logo-box"><img src="" alt="ekAgracit"></div>
      <div>
        <div class="tag">// Partnered with</div>
        <h2>Ek<em>Agracit</em></h2>
        <p>ekAgracit Technologies is building a next-generation digital ecosystem: one unified gateway for AI, cyber security, cloud, digital operations and workforce intelligence.</p>
        <p>Guided by the belief that focus is the only way forward, ekAgracit is our partner on AeroCadastra.</p>
        <div class="chips"><span>AI</span><span>Cyber security</span><span>Cloud</span><span>Digital operations</span><span>Workforce intelligence</span></div>
        <a class="btn" href="https://ekagracit.com/coming-soon" target="_blank" rel="noopener">Visit Ekagracit</a>
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="tag">// The crew</div>
    <h2>Team <em>members</em></h2>
    <!-- Tech chips are a best guess from each role: correct them to what each person actually used. -->
    <div class="grid">
      <a class="member" href="https://maskedhelp.com/friends/karthik"><span class="lead">Team lead</span>
        <div class="mh"><div class="av">K</div><div><b>Karthik</b><small>Full stack / AI / Robotics</small></div></div>
        <p>Leads the project and ties the stack together: ground station, AI pipeline and hardware integration.</p>
        <div class="chips"><span>Tauri</span><span>React</span><span>TypeScript</span><span>Python</span><span>System integration</span></div></a>
      <a class="member" href="https://maskedhelp.com/friends/aahana">
        <div class="mh"><div class="av">A</div><div><b>Aahana</b><small>Software</small></div></div>
        <p>Ground station front end: fleet telemetry views, map display and GIS land analysis.</p>
        <div class="chips"><span>React</span><span>TypeScript</span><span>Vite</span><span>Tailwind CSS</span><span>Zustand</span><span>GeoPandas</span><span>Shapely</span></div></a>
      <a class="member" href="https://maskedhelp.com/friends/vidushi">
        <div class="mh"><div class="av">V</div><div><b>Vidushi</b><small>Software</small></div></div>
        <p>AI pipeline: aerial person detection and tracking on drone imagery.</p>
        <div class="chips"><span>Python</span><span>PyTorch</span><span>OpenCV</span><span>YOLO</span><span>ByteTrack</span></div></a>
      <a class="member" href="https://maskedhelp.com/friends/rohan">
        <div class="mh"><div class="av">R</div><div><b>Rohan</b><small>Electronics</small></div></div>
        <p>Onboard electronics: positioning, telemetry link, power and wiring for the carrier and child drones.</p>
        <div class="chips"><span>RTK / GNSS</span><span>Telemetry</span><span>Flight controller</span><span>Power systems</span></div></a>
      <a class="member" href="https://maskedhelp.com/friends/alisha">
        <div class="mh"><div class="av">A</div><div><b>Alisha</b><small>3D modelling</small></div></div>
        <p>Carrier airframe design and CAD models.</p>
        <div class="chips"><span>CAD modelling</span><span>Airframe design</span><span>3D printing</span></div></a>
      <a class="member" href="https://maskedhelp.com/friends/ayush">
        <div class="mh"><div class="av">A</div><div><b>Ayush</b><small>3D modelling</small></div></div>
        <p>Child drone design, mounts and printable parts.</p>
        <div class="chips"><span>CAD modelling</span><span>Child drone design</span><span>3D printing</span></div></a>
    </div>
  </div>
</section>`;
const PAGE_CSS = String.raw`
:root{--bg:#0a0a0a;--panel:#0f0f0f;--line:#222;--red:#b53a2d;--red2:#d4483a;--text:#e8e8e8;--dim:#7d7d7d;--blue:#63aaf8;
 --display:'Orbitron','Arial Black',sans-serif;--mono:'Share Tech Mono','Courier New',monospace}
*{box-sizing:border-box;margin:0;padding:0}
/* Offset the page below the site-wide fixed/sticky header so the hero title is never obscured. */
.aerocadastra-page{padding-top:108px}
@media(max-width:700px){.aerocadastra-page{padding-top:76px}}
html{scroll-behavior:smooth}
.aerocadastra-page{background:var(--bg);color:var(--text);font-family:var(--mono);font-size:14px;line-height:1.85;letter-spacing:.06em;
 background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:72px 72px}
a{color:inherit;text-decoration:none}
.wrap{max-width:1400px;margin:0 auto;padding:0 56px}
@media(max-width:700px){.wrap{padding:0 20px}}

header{position:sticky;top:0;z-index:20;background:rgba(10,10,10,.95);backdrop-filter:blur(8px);border-bottom:1px solid var(--red)}
.nav{display:flex;align-items:center;justify-content:space-between;gap:20px;height:82px}
.brand{display:flex;align-items:center;gap:12px;font-family:var(--display);font-weight:900;font-size:1.05rem;letter-spacing:.14em}
.brand img{height:36px;width:36px;object-fit:cover;box-shadow:0 0 20px rgba(181,58,45,.45)}
.brand b{color:var(--red2)}
nav ul{display:flex;gap:34px;list-style:none}
nav a{font-size:11px;letter-spacing:.28em;color:var(--dim);text-transform:uppercase;padding:6px 0;border-bottom:2px solid transparent;transition:.2s}
nav a:hover,nav a.on{color:#fff;border-color:var(--red)}
.btn{display:inline-block;background:var(--red);color:#fff;font-size:11px;letter-spacing:.24em;text-transform:uppercase;padding:11px 20px;transition:.2s}
.btn:hover{background:var(--red2)}
@media(max-width:900px){nav ul{display:none}}

section{padding:72px 0}
.tag{display:flex;align-items:center;gap:14px;color:var(--red2);font-size:12px;letter-spacing:.34em;text-transform:uppercase;margin-bottom:16px}
.tag::before{content:"";width:40px;height:1px;background:var(--red)}
h2{font-family:var(--display);font-weight:900;font-size:clamp(1.3rem,2.6vw,2rem);letter-spacing:.08em;text-transform:uppercase;margin-bottom:24px;line-height:1.2}
h2 em{font-style:normal;color:var(--red2)}
p{color:#a9a9a9;margin-bottom:16px}
p strong{color:#fff;font-weight:400}

/* Premium intro + full-screen cinematic aircraft stage */
.hero-intro{padding:18px 0 0;position:relative;overflow:hidden;background:#090909}
.hero-intro::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:72px 72px;pointer-events:none}
.hero-intro .wrap{position:relative;z-index:1}
.hero-copy{max-width:1100px}
.hero-intro h1{font-family:var(--display);font-weight:900;font-size:clamp(1.8rem,6.4vw,5rem);line-height:1.05;letter-spacing:.04em;text-transform:uppercase;margin-bottom:12px;background:repeating-linear-gradient(0deg,#fff 0 3px,#cfcfcf 3px 5px);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero-intro h1 span{display:inline-block;width:.8em;height:.14em;background:var(--red);margin-left:.1em;vertical-align:baseline}
.hero-intro .tag{font-size:10px}
.hero-intro .sub{max-width:720px;font-size:14px;line-height:1.65;color:#aaa;margin:2px 0 0}
.flight-showcase{height:88svh;min-height:600px;max-height:1000px;position:relative;isolation:isolate;overflow:hidden;background:radial-gradient(ellipse at 50% 44%,#28211e 0%,#121110 34%,#080808 76%)}
.flight-showcase::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(181,58,45,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(181,58,45,.055) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(transparent,#000 18%,#000 78%,transparent);z-index:0;pointer-events:none}
.flight-vignette{position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse at center,transparent 28%,rgba(0,0,0,.24) 70%,rgba(0,0,0,.7) 100%),linear-gradient(180deg,#090909 0%,transparent 14%,transparent 78%,#090909 100%)}
.hero-scene{position:absolute;inset:0;z-index:2;overflow:hidden;pointer-events:auto}
.flight-reticle{position:absolute;left:50%;top:46%;width:min(48vw,520px);aspect-ratio:1;border:1px solid rgba(181,58,45,.15);border-radius:50%;transform:translate(-50%,-50%) scale(.82);opacity:0;pointer-events:none;z-index:2;animation:reticle-reveal 1.2s ease-out 1.1s forwards}
.flight-reticle::before,.flight-reticle::after{content:"";position:absolute;background:rgba(181,58,45,.35)}
.flight-reticle::before{left:50%;top:-12px;height:calc(100% + 24px);width:1px}
.flight-reticle::after{top:50%;left:-12px;width:calc(100% + 24px);height:1px}
.flight-reticle span{position:absolute;inset:12%;border:1px dashed rgba(220,205,196,.12);border-radius:50%;animation:reticle-spin 32s linear infinite}
.flight-reticle i,.flight-reticle b{position:absolute;width:8px;height:8px;border:1px solid var(--red2);border-radius:50%;left:50%;top:-4px;transform:translateX(-50%);background:#090909}
.flight-reticle b{top:auto;bottom:-4px}
.flight-status{position:absolute;left:clamp(22px,5vw,80px);top:clamp(22px,5vh,52px);z-index:4;display:grid;grid-template-columns:10px auto;column-gap:9px;row-gap:5px;color:#938983;font-size:8px;letter-spacing:.2em;pointer-events:none}
.flight-status .status-dot{width:6px;height:6px;margin-top:2px;border-radius:50%;background:var(--red2);box-shadow:0 0 12px rgba(220,80,58,.7);animation:status-pulse 1.8s ease-in-out infinite}
.flight-status strong{grid-column:2;color:#e7ded8;font-size:9px;font-weight:500;letter-spacing:.16em}
@keyframes reticle-reveal{to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
@keyframes reticle-spin{to{transform:rotate(360deg)}}
@keyframes status-pulse{50%{opacity:.4;box-shadow:0 0 3px rgba(220,80,58,.25)}}
#plane-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;outline:none;touch-action:pan-y;cursor:grab}
#plane-canvas:active{cursor:grabbing}
.hero-hud{position:absolute;z-index:4;right:clamp(22px,5vw,80px);bottom:clamp(72px,10vh,110px);display:flex;gap:32px;align-items:flex-end;color:#b8b0aa;font-size:9px;letter-spacing:.2em;text-transform:uppercase;pointer-events:none}
.hero-hud strong{display:block;font-family:var(--display);font-size:19px;color:#f1eeeb;letter-spacing:.04em;font-weight:700;margin-top:4px}
.hero-hud .hud-line{width:54px;height:1px;background:var(--red2);margin-bottom:10px}
.hero-instruction{position:absolute;z-index:4;right:clamp(20px,4vw,64px);top:45%;z-index:3;writing-mode:vertical-rl;color:#aaa09a;font-size:9px;letter-spacing:.22em;text-transform:uppercase;pointer-events:none}
.flight-caption{position:absolute;z-index:3;left:clamp(22px,5vw,80px);right:clamp(22px,5vw,80px);bottom:32px;display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.16);padding-top:14px;color:#938983;font-size:9px;letter-spacing:.25em;text-transform:uppercase;pointer-events:none}
.hero-scroll{position:absolute;left:clamp(22px,5vw,80px);bottom:88px;z-index:4;font-size:9px;color:#c1b9b3;letter-spacing:.22em;text-transform:uppercase;display:flex;gap:12px;align-items:center}
.hero-scroll::before{content:"";width:38px;height:1px;background:var(--red2)}
@media(max-width:700px){.hero-intro{padding:24px 0 0}.hero-intro .sub{font-size:12px}.flight-showcase{height:88svh;min-height:560px}.hero-instruction{display:none}.hero-hud{right:20px;bottom:74px;gap:16px}.hero-hud strong{font-size:14px}.hero-scroll{left:20px;bottom:112px;font-size:8px}.flight-caption{left:20px;right:20px;bottom:22px;font-size:8px;letter-spacing:.16em}.flight-reticle{width:74vw;top:43%}.flight-status{left:20px;top:22px;font-size:7px}.flight-status strong{font-size:8px}} 
@media(prefers-reduced-motion:reduce){.flight-reticle,.flight-reticle span,.flight-status .status-dot{animation:none!important}.flight-reticle{opacity:.65;transform:translate(-50%,-50%) scale(1)}}
@media(prefers-reduced-motion:reduce){.flight-showcase *{scroll-behavior:auto!important}}

.box{border:1px solid var(--line);background:var(--panel);position:relative}
.box::before{content:"";position:absolute;top:-1px;left:-1px;width:24px;height:24px;border-top:2px solid var(--red);border-left:2px solid var(--red);z-index:2;pointer-events:none}
.lbl{display:flex;justify-content:space-between;font-size:10px;letter-spacing:.3em;color:var(--dim);padding:11px 16px;border-bottom:1px solid var(--line);text-transform:uppercase}
.stage{display:grid;grid-template-columns:1.5fr 1fr;gap:20px}
@media(max-width:960px){.stage{grid-template-columns:1fr}}

/* schematic */
.bp{background:radial-gradient(circle at 50% 45%,#161616,#0c0c0c);background-image:linear-gradient(rgba(181,58,45,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(181,58,45,.07) 1px,transparent 1px);background-size:30px 30px}
.bp svg{display:block;width:100%;height:auto}
.air{fill:#121212;stroke:var(--red);stroke-width:1.6;stroke-linejoin:round}
.thin{fill:none;stroke:#555;stroke-width:1}
.rot{fill:rgba(181,58,45,.08);stroke:var(--red);stroke-width:1}
svg text{font-family:var(--mono);font-size:12.5px;letter-spacing:.18em;fill:#7d7d7d;text-transform:uppercase}
.hs{cursor:pointer;outline:none}
.hs .d{fill:var(--red);stroke:#0a0a0a;stroke-width:2}
.hs .p{fill:none;stroke:var(--red2);stroke-width:1.5;transform-box:fill-box;transform-origin:center;animation:ping 2s infinite}
.hs.on .d{fill:#fff}
.hs.on text{fill:#fff}
@keyframes ping{from{transform:scale(1);opacity:.9}to{transform:scale(2.6);opacity:0}}
.scan{fill:none;stroke:var(--red);stroke-width:1;opacity:.5;animation:scan 5s linear infinite}
@keyframes scan{from{transform:translateY(0)}to{transform:translateY(430px)}}

/* detail panel */
.list{display:flex;flex-direction:column}
.item{border-bottom:1px solid var(--line)}
.item:last-child{border-bottom:0}
.hd{display:flex;gap:14px;align-items:center;width:100%;background:none;border:0;color:var(--dim);font:inherit;font-size:11px;letter-spacing:.26em;text-transform:uppercase;padding:13px 16px;cursor:pointer;text-align:left}
.hd i{font-style:normal;color:var(--red2)}
.item.on .hd{color:#fff}
.bd{padding:0 16px 16px 44px}
.js .bd{display:none}.js .item.on .bd{display:block}
.bd p{font-size:13px;margin-bottom:10px}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chips span{border:1px solid #333;color:#bdbdbd;font-size:10px;letter-spacing:.18em;padding:3px 8px;text-transform:uppercase}

/* about + milestones */
.cols{display:grid;grid-template-columns:1.2fr 1fr;gap:56px}
@media(max-width:960px){.cols{grid-template-columns:1fr}}
.mile{list-style:none;border-left:1px solid var(--red);padding-left:24px}
.mile li{position:relative;margin-bottom:20px}
.mile li::before{content:"";position:absolute;left:-28px;top:7px;width:7px;height:7px;background:var(--red)}
.mile li.next::before{background:var(--bg);border:1px solid var(--red)}
.mile b{display:block;font-weight:400;color:#fff;font-size:12px;letter-spacing:.2em;text-transform:uppercase}
.mile em{font-style:normal;font-size:10px;letter-spacing:.22em;border:1px solid var(--red);color:var(--red2);padding:1px 7px;margin-left:8px;vertical-align:1px}
.mile .done em{background:var(--red);color:#fff}
.mile .next em{border-color:#444;color:var(--dim)}
.mile span{display:block;color:#9a9a9a;font-size:13px;line-height:1.7;margin-top:2px}

.work{max-width:900px;text-align:left}
.about p{max-width:640px}
.lead{font-size:16px;line-height:1.8;color:#e4e4e4!important;border-left:2px solid var(--red);padding-left:18px;margin-bottom:22px}
.feat{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:10px;margin-bottom:34px}
.feat div{border:1px solid var(--line);background:var(--panel);padding:12px 14px;font-size:12px;letter-spacing:.1em;line-height:1.5;color:#cfcfcf}
.feat i{display:block;font-style:normal;color:var(--red2);font-size:10px;letter-spacing:.28em;margin-bottom:4px}
.feat .all{border-color:var(--red);color:#9a9a9a;display:flex;align-items:center}
.feat .all b{font-weight:400;color:#fff}
.blk{margin-bottom:26px}
.blk h3,.callout h3{font-family:var(--mono);font-weight:400;font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#fff;margin-bottom:10px}
.blk h3 i{font-style:normal;color:var(--red2);margin-right:6px}
.callout{border:1px solid var(--red);background:linear-gradient(135deg,rgba(181,58,45,.12),transparent 70%);padding:22px 24px;margin:34px 0 22px}
.callout h3{color:var(--red2)}
.callout p{color:#cfcfcf;margin:0}
.callout strong{color:#fff}
.scale{display:flex;flex-wrap:wrap;align-items:center;gap:12px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#cfcfcf;margin-bottom:14px}
.scale span{border:1px solid #333;padding:6px 12px}
.scale b{font-family:var(--display);color:var(--red2);font-size:1rem;margin-right:6px}
.scale u{text-decoration:none;color:var(--red2)}
.note{font-size:12px!important;color:#7d7d7d!important}
.center{text-align:center}
.center .tag{justify-content:center}
.center .tag::after{content:"";width:40px;height:1px;background:var(--red)}
.work{margin:0 auto}

video{display:block;width:100%;background:#000}

.partner{border:1px solid rgba(99,170,248,.35);background:linear-gradient(135deg,rgba(99,170,248,.08),transparent 60%);padding:40px;display:grid;grid-template-columns:220px 1fr;gap:40px;align-items:center}
@media(max-width:800px){.partner{grid-template-columns:1fr;padding:24px}}
.partner .tag{color:var(--blue)}.partner .tag::before{background:var(--blue)}
.logo-box{background:#fff;padding:16px;display:flex;align-items:center}
.logo-box img{width:100%;display:block}
.partner h2 em{color:var(--blue)}
.partner .chips{margin:4px 0 22px}.partner .chips span{border-color:rgba(99,170,248,.45);color:#cfe3fb}
.partner .btn{background:var(--blue);color:#06121f}.partner .btn:hover{background:#8bc0fa}

/* team */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:16px}
.member{border:1px solid var(--line);background:var(--panel);padding:22px;transition:.2s;display:block;position:relative}
.member:hover{border-color:var(--red);transform:translateY(-3px)}
.mh{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.av{flex:none;width:46px;height:46px;background:var(--red);display:grid;place-items:center;font-family:var(--display);font-weight:900;font-size:1.1rem}
.member b{display:block;font-family:var(--display);font-weight:700;font-size:.85rem;letter-spacing:.12em;text-transform:uppercase;line-height:1.3}
.member small{color:var(--red2);font-size:10px;letter-spacing:.24em;text-transform:uppercase}
.lead{position:absolute;top:14px;right:14px;background:var(--red);color:#fff;font-size:9px;letter-spacing:.24em;padding:2px 8px;text-transform:uppercase}
.member p{font-size:12.5px;line-height:1.7;margin-bottom:12px;color:#9a9a9a}

footer{border-top:1px solid var(--line);padding:32px 0;color:var(--dim);font-size:10px;letter-spacing:.25em;text-transform:uppercase;text-align:center}
`;

export default function AeroCadastraPage() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const canvas = host.querySelector<HTMLCanvasElement>("#plane-canvas");
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 15, 38);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.45, 11.8);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    scene.add(new THREE.HemisphereLight(0xe9e4df, 0x211310, 2.1));
    const key = new THREE.DirectionalLight(0xffffff, 3.4); key.position.set(4, 7, 8); scene.add(key);
    const rim = new THREE.DirectionalLight(0xc74737, 3.2); rim.position.set(-6, 2, -5); scene.add(rim);

    const plane = new THREE.Group(); scene.add(plane);
    const paint = new THREE.MeshStandardMaterial({ color: 0xb8b9b7, metalness: 0.72, roughness: 0.28 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x202326, metalness: 0.65, roughness: 0.34 });
    const red = new THREE.MeshStandardMaterial({ color: 0xb53a2d, metalness: 0.35, roughness: 0.3 });
    const glass = new THREE.MeshStandardMaterial({ color: 0x171f25, metalness: 0.7, roughness: 0.15 });
    const part = (geo: THREE.BufferGeometry, mat: THREE.Material, pos: [number, number, number], rot?: [number, number, number]) => {
      const mesh = new THREE.Mesh(geo, mat); mesh.position.set(...pos); if (rot) mesh.rotation.set(...rot); plane.add(mesh); return mesh;
    };
    part(new THREE.CapsuleGeometry(0.22, 3.65, 6, 12), paint, [0, 0, 0], [Math.PI / 2, 0, 0]);
    part(new THREE.ConeGeometry(0.22, 0.8, 12), paint, [0, 0, 2.15], [-Math.PI / 2, 0, 0]);
    part(new THREE.SphereGeometry(0.225, 18, 12), glass, [0, 0.08, 1.48]).scale.set(1, 0.7, 1.1);
    function wing(span: number, chord: number, z: number, y: number, material: THREE.Material) {
      const shape = new THREE.Shape(); shape.moveTo(-span / 2, -chord * 0.34); shape.lineTo(span * 0.36, -chord * 0.34); shape.lineTo(span / 2, chord * 0.18); shape.lineTo(span * 0.48, chord * 0.34); shape.lineTo(-span * 0.42, chord * 0.34); shape.lineTo(-span / 2, -chord * 0.34);
      const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.075, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.035, bevelThickness: 0.035 });
      const mesh = new THREE.Mesh(geometry, material); mesh.rotation.x = Math.PI / 2; mesh.position.set(0, y, z); plane.add(mesh);
    }
    wing(6.4, 1.3, 0.1, 0.02, paint); wing(2.5, 0.65, -1.8, 0, dark);
    part(new THREE.BoxGeometry(0.22, 0.28, 1.25), red, [0, 0.18, -1.85]);
    for (const side of [-1, 1]) {
      const pod = new THREE.Group(); pod.position.set(side * 1.55, -0.22, 0.1); plane.add(pod);
      pod.add(new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.52), dark));
      for (const [x, z] of [[-0.34, -0.38], [0.34, -0.38], [-0.34, 0.38], [0.34, 0.38]] as [number, number][]) {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.48), paint); arm.position.set(x, 0, z * 0.45); arm.rotation.y = x * z * 0.45; pod.add(arm);
        const rotor = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.025, 24), red); rotor.position.set(x * 1.25, 0.06, z * 1.25); pod.add(rotor);
      }
    }
    const ring = new THREE.Mesh(new THREE.TorusGeometry(4.25, 0.008, 8, 160), new THREE.MeshBasicMaterial({ color: 0x8b342a, transparent: true, opacity: 0.65 })); ring.rotation.x = Math.PI / 2.7; ring.position.y = -1.45; scene.add(ring);
    const grid = new THREE.GridHelper(30, 50, 0x49241f, 0x29201e); grid.position.y = -2.2; (grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = 0.28; scene.add(grid);

    const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xd94a36, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const landingPulse = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.76, 64), pulseMaterial);
    landingPulse.rotation.x = -Math.PI / 2; landingPulse.position.y = -1.95; scene.add(landingPulse);
    const landingGlow = new THREE.PointLight(0xc74737, 0, 5); landingGlow.position.set(0, -1.35, 0); scene.add(landingGlow);

    let targetX = -0.13, targetY = 0.48, rotX = -0.13, rotY = -1.0, dragging = false, px = 0, py = 0;
    const start = performance.now();
    const onDown = (e: PointerEvent) => { dragging = true; px = e.clientX; py = e.clientY; canvas.setPointerCapture(e.pointerId); };
    const onMove = (e: PointerEvent) => { if (!dragging) return; targetY += (e.clientX - px) * 0.009; targetX += (e.clientY - py) * 0.006; targetX = Math.max(-0.8, Math.min(0.8, targetX)); px = e.clientX; py = e.clientY; };
    const onUp = () => { dragging = false; };
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") targetY -= 0.15; if (e.key === "ArrowRight") targetY += 0.15; if (e.key === "ArrowUp") targetX -= 0.1; if (e.key === "ArrowDown") targetX += 0.1; };
    canvas.addEventListener("pointerdown", onDown); canvas.addEventListener("pointermove", onMove); canvas.addEventListener("pointerup", onUp); canvas.addEventListener("pointercancel", onUp); canvas.addEventListener("keydown", onKey);
    const resize = () => { const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return; camera.aspect = w / h; camera.position.z = window.innerWidth < 700 ? 13.8 : 11.8; camera.position.y = window.innerWidth < 700 ? 0.25 : 0.45; camera.updateProjectionMatrix(); renderer.setSize(w, h, false); };
    const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
    let frame = 0;
    const animate = (now: number) => {
      frame = requestAnimationFrame(animate);
      const t = (now - start) / 1000;
      // Three distinct phases: enter from outside, complete a full screen-wide orbit,
      // then make one clean move into the centre. No easing toward the centre during orbit.
      const entryDuration = 0.72;
      const orbitDuration = 5.4;
      const settleDuration = 1.45;
      const orbitStart = entryDuration;
      const orbitEnd = orbitStart + orbitDuration;
      const approach = Math.max(0, Math.min(t / entryDuration, 1));
      const approachEase = approach * approach * (3 - 2 * approach);
      const orbitProgress = Math.max(0, Math.min((t - orbitStart) / orbitDuration, 1));
      const settleProgress = Math.max(0, Math.min((t - orbitEnd) / settleDuration, 1));
      const settleEase = 1 - Math.pow(1 - settleProgress, 3);
      const halfHeight = camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
      const halfWidth = halfHeight * camera.aspect;
      // Keep the whole loop inside the visible frame while making it span almost its full width and height.
      const radiusX = Math.max(2.8, halfWidth * 0.60);
      const radiusY = Math.max(1.45, halfHeight * 0.48);
      const startAngle = Math.PI;
      const angle = startAngle + orbitProgress * Math.PI * 2;
      const entryX = -halfWidth * 1.4 + (-radiusX + halfWidth * 1.4) * approachEase;
      const entryY = 0;
      const entryZ = -3.5 * (1 - approachEase);
      const orbitX = Math.cos(angle) * radiusX;
      const orbitY = Math.sin(angle) * radiusY;
      const orbitZ = Math.sin(angle * 1.0) * 1.25;
      const isEntering = t < entryDuration;
      const isOrbiting = t >= orbitStart && t < orbitEnd;
      const isSettling = t >= orbitEnd && t < orbitEnd + settleDuration;
      if (isEntering) {
        plane.position.set(entryX, entryY, entryZ);
      } else if (isOrbiting) {
        // Pure ellipse for the entire orbit: never drift or ease toward centre mid-loop.
        plane.position.set(orbitX, orbitY, orbitZ);
      } else {
        // Hold the orbit's final point, then travel directly to the centre only after the full loop.
        const endX = Math.cos(startAngle + Math.PI * 2) * radiusX;
        const endY = Math.sin(startAngle + Math.PI * 2) * radiusY;
        const endZ = Math.sin((startAngle + Math.PI * 2)) * 1.25;
        plane.position.set(endX * (1 - settleEase), endY * (1 - settleEase), endZ * (1 - settleEase));
      }
      const entryScale = 0.38 + 0.48 * approachEase;
      const orbitScale = 0.78 + 0.1 * (0.5 + 0.5 * Math.sin(angle + Math.PI / 2));
      const settleScale = 0.86 * (1 - settleEase) + 1.0 * settleEase;
      plane.scale.setScalar(isEntering ? entryScale : isOrbiting ? orbitScale : settleScale);
      const bank = isOrbiting ? -Math.cos(angle) * 0.38 : isEntering ? -0.08 * (1 - approachEase) : 0;
      // Enter with the aircraft’s right side presented to the camera; the model’s local +Z nose axis uses +PI/2 here.
      const orbitYaw = isOrbiting ? targetY + Math.cos(angle) * 0.32 : isEntering ? Math.PI / 2 : targetY;
      const orbitPitch = isOrbiting ? targetX + Math.sin(angle) * 0.12 : targetX;
      plane.rotation.x += (orbitPitch - plane.rotation.x) * 0.075;
      plane.rotation.y += (orbitYaw - plane.rotation.y) * 0.075;
      plane.rotation.z += (bank - plane.rotation.z) * 0.085;
      // No smoke or flight trail: keep the aircraft silhouette crisp during the entire animation.
      const landingAge = Math.max(0, t - orbitEnd);
      const pulseProgress = Math.min(landingAge / 1.25, 1);
      landingPulse.scale.setScalar(0.5 + pulseProgress * 4.8);
      pulseMaterial.opacity = isSettling ? 0.24 * (1 - pulseProgress) : 0;
      landingGlow.intensity = isSettling ? 1.8 * Math.sin(Math.PI * pulseProgress) : 0;
      // Small visual telemetry state follows the same entrance/orbit/landing sequence.
      const phase = host.querySelector<HTMLElement>("#flight-phase");
      if (phase) {
        const nextPhase = isEntering ? "FLIGHT INITIATED" : isOrbiting ? "ORBIT IN PROGRESS" : isSettling ? "LOCKING POSITION" : "SYSTEMS NOMINAL";
        if (phase.textContent !== nextPhase) phase.textContent = nextPhase;
      }
      // Finished pose: quiet showroom presence with only a restrained hover.
      if (t > orbitEnd + settleDuration && !dragging) plane.position.y += Math.sin(t * 0.8) * 0.0009;
      ring.rotation.z += 0.0015;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);

    const show = (key: string) => {
      host.querySelectorAll<HTMLElement>(".hs, .item").forEach(el => el.classList.toggle("on", el.dataset.k === key));
    };
    const markers = Array.from(host.querySelectorAll<HTMLElement>(".hs"));
    const items = Array.from(host.querySelectorAll<HTMLElement>(".item"));
    const markerHandlers = markers.map(el => { const fn = () => show(el.dataset.k || "airframe"); el.addEventListener("click", fn); el.addEventListener("mouseenter", fn); el.addEventListener("focus", fn); return [el, fn] as const; });
    const itemHandlers = items.map(el => { const button = el.querySelector<HTMLElement>(".hd"); const fn = () => show(el.dataset.k || "airframe"); button?.addEventListener("click", fn); return [button, fn] as const; });
    show("airframe");

    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); renderer.dispose();
      landingPulse.geometry.dispose(); pulseMaterial.dispose();
      canvas.removeEventListener("pointerdown", onDown); canvas.removeEventListener("pointermove", onMove); canvas.removeEventListener("pointerup", onUp); canvas.removeEventListener("pointercancel", onUp); canvas.removeEventListener("keydown", onKey);
      markerHandlers.forEach(([el, fn]) => { el.removeEventListener("click", fn); el.removeEventListener("mouseenter", fn); el.removeEventListener("focus", fn); });
      itemHandlers.forEach(([el, fn]) => el?.removeEventListener("click", fn));
      scene.traverse(obj => { if (obj instanceof THREE.Mesh) { obj.geometry.dispose(); const materials = Array.isArray(obj.material) ? obj.material : [obj.material]; materials.forEach(m => m.dispose()); } });
    };
  }, []);

  return (
    <div className="aerocadastra-page" ref={hostRef}>
      <style>{PAGE_CSS}</style>
      <div dangerouslySetInnerHTML={{ __html: PAGE_MARKUP }} />
    </div>
  );
}
