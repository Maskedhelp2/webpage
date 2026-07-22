module.exports=[71306,(a,b,c)=>{b.exports=a.r(18622)},79847,a=>{a.n(a.i(3343))},9185,a=>{a.n(a.i(29432))},72842,a=>{a.n(a.i(75164))},54897,a=>{a.n(a.i(30106))},56157,a=>{a.n(a.i(18970))},94331,a=>{a.n(a.i(60644))},15988,a=>{a.n(a.i(56952))},25766,a=>{a.n(a.i(77341))},29725,a=>{a.n(a.i(94290))},90833,a=>{a.n(a.i(46994))},5785,a=>{a.n(a.i(90588))},74793,a=>{a.n(a.i(33169))},85826,a=>{a.n(a.i(37111))},21565,a=>{a.n(a.i(41763))},65911,a=>{a.n(a.i(8950))},25128,a=>{a.n(a.i(91562))},40781,a=>{a.n(a.i(49670))},69411,a=>{a.n(a.i(75700))},63081,a=>{a.n(a.i(276))},62837,a=>{a.n(a.i(40795))},34607,a=>{a.n(a.i(11614))},96338,a=>{a.n(a.i(21751))},50642,a=>{a.n(a.i(12213))},32242,a=>{a.n(a.i(22693))},88530,a=>{a.n(a.i(10531))},93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},8583,a=>{a.n(a.i(1082))},38534,a=>{a.n(a.i(98175))},70408,a=>{a.n(a.i(9095))},22922,a=>{a.n(a.i(96772))},78294,a=>{a.n(a.i(71717))},16625,a=>{a.n(a.i(85034))},88648,a=>{a.n(a.i(68113))},51914,a=>{a.n(a.i(66482))},25466,a=>{a.n(a.i(91505))},60582,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/projects/desk-helper/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/projects/desk-helper/page.tsx <module evaluation>","default")},91849,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/projects/desk-helper/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/projects/desk-helper/page.tsx","default")},15152,a=>{"use strict";a.i(60582);var b=a.i(91849);a.n(b)},4721,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/projects/slam-nav/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/projects/slam-nav/page.tsx <module evaluation>","default")},43612,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/src/app/projects/slam-nav/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/app/projects/slam-nav/page.tsx","default")},65891,a=>{"use strict";a.i(4721);var b=a.i(43612);a.n(b)},61578,a=>{"use strict";var b=a.i(7997);a.i(70396);var c=a.i(73727),d=a.i(95936),e=a.i(22777),f=a.i(95774);let g=[{slug:"desk-helper",name:"DESK HELPER",subtitle:"PROGRAMMABLE MACRO PAD",year:"2024–2025",status:"COMPLETE",description:"A fully programmable RP2040-powered macro pad with dynamic key remapping, 5 onboard profiles, and a cross-platform Tauri + React configurator.",longDescription:"Engineered a fully programmable RP2040-powered macro pad with dynamic key remapping, 5 onboard profiles, and a macro engine — all stored in EEPROM without reflashing. Built a cross-platform Tauri + React desktop configurator (Windows / Linux / macOS) for live keymap editing, OLED image uploads, and one-click UF2 firmware flashing. Implemented a custom Raw HID communication protocol over USB between QMK firmware and the Rust/HIDAPI backend.",stack:["QMK FIRMWARE","RUST","TAURI 2","REACT","TYPESCRIPT","ZUSTAND","RP2040"],github:"https://github.com/Maskedhelp2/desk-helper",team:["Karthik Kumar","Aahana Hajariwala","Rohan Alex Basil","Sparsh Tyagi"],highlight:"Raw HID over USB — firmware talks directly to desktop without drivers."},{slug:"slam-nav",name:"SLAM NAV SYSTEM",subtitle:"AUTONOMOUS 2D/3D LIDAR FUSION",year:"2025",status:"RESEARCH",description:"Real-time SLAM pipeline using 2D LiDAR with a custom-built 3D module for full volumetric point-cloud generation in unknown environments.",longDescription:"Designed and implemented a real-time SLAM (Simultaneous Localization and Mapping) pipeline using 2D LiDAR sensors, enabling a mobile robot to autonomously map and navigate unknown environments. Extended the system with a custom-fabricated 3D LiDAR module — achieved full volumetric point-cloud generation by mechanically rotating a 2D sensor and fusing scan data across axes. Integrated ROS2, pose-graph optimization, and sensor-fusion algorithms to achieve sub-centimetre mapping accuracy in dynamic indoor environments.",stack:["ROS2","PYTHON","C++","PCL","SLAM TOOLBOX","RPLIDAR"],team:["Karthik Kumar"],highlight:"Sub-centimetre mapping accuracy using a DIY 3D LiDAR built from a rotating 2D sensor."},{slug:"aria",name:"ARIA",subtitle:"AI WASTE SEGREGATION ROBOT",year:"2025",status:"RESEARCH",description:"End-to-end autonomous waste segregation combining a 6-DOF robotic arm with real-time YOLO-based computer vision for multi-class classification.",longDescription:"Developed an end-to-end autonomous waste segregation system combining a 6-DOF robotic manipulator with a real-time computer vision pipeline for multi-class waste classification. Trained a custom YOLO-based object detection model to identify and classify waste categories (plastic, metal, organic, paper) with >90% accuracy under varied lighting conditions. Implemented inverse kinematics for precise pick-and-place operations, enabling the robotic arm to grip irregularly shaped objects and deposit them into the correct segregation bin.",stack:["PYTHON","PYTORCH","OPENCV","ROS2","ARDUINO","YOLO","SERVO CONTROL"],team:["Karthik Kumar"],highlight:">90% classification accuracy across 4 waste categories with custom-trained YOLO."}];var h=a.i(39032),i=a.i(15152),j=a.i(65891);async function k(){return g.map(a=>({slug:a.slug}))}let l={ACTIVE:"#00d2d2",COMPLETE:"#e63329",RESEARCH:"#a78bfa"};a.s(["default",0,function({params:a}){let k=g.find(b=>b.slug===a.slug);if(k||(0,c.notFound)(),"desk-helper"===a.slug)return(0,b.jsx)(i.default,{});if("slam-nav"===a.slug)return(0,b.jsx)(j.default,{});let m=l[k.status],n=h.team.filter(a=>k.team.some(b=>b.toLowerCase().includes(a.firstName.toLowerCase())||a.name.toLowerCase().includes(b.toLowerCase())));return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
        .proj-detail-back {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 2px;
          text-decoration: none; display: inline-flex;
          align-items: center; gap: 8px; transition: color 0.2s;
          margin-bottom: 48px; display: inline-flex;
        }
        .proj-detail-back:hover { color: var(--accent); }

        .proj-stack-tag {
          font-family: var(--mono); font-size: 10px;
          padding: 6px 14px; letter-spacing: 1.5px;
          border: 1px solid rgba(230,51,41,0.25);
          color: var(--accent); background: rgba(230,51,41,0.06);
          transition: all 0.2s;
        }
        .proj-stack-tag:hover {
          background: rgba(230,51,41,0.14);
          box-shadow: 0 0 10px rgba(230,51,41,0.2);
        }

        .proj-github-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--mono); font-size: 12px;
          color: var(--accent); letter-spacing: 2px;
          border: 1px solid rgba(230,51,41,0.4);
          background: rgba(230,51,41,0.06);
          padding: 14px 28px; text-decoration: none;
          transition: all 0.2s;
        }
        .proj-github-btn:hover {
          background: rgba(230,51,41,0.14);
          box-shadow: 0 0 20px rgba(230,51,41,0.25);
        }

        .friend-chip {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 8px 16px 8px 10px;
          border: 1px solid #2a2a2a;
          text-decoration: none; transition: all 0.2s;
        }
        .friend-chip:hover { border-color: var(--accent); }
        .friend-chip:hover .fc-name { color: var(--accent); }
        .fc-avatar {
          width: 28px; height: 28px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--display); font-size: 11px; font-weight: 900;
        }
        .fc-name {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 1px;
          transition: color 0.2s;
        }

        .sec-label {
          font-family: var(--mono); font-size: 10px;
          color: var(--accent); letter-spacing: 4px;
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px;
        }
        .sec-label::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(230,51,41,0.3), transparent);
        }

        /* Mobile */
        @media (max-width: 768px) {
          .proj-detail-main { padding: 100px 16px 60px !important; }
          .proj-detail-title { font-size: clamp(1.8rem, 8vw, 3rem) !important; }
          .proj-meta-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}),(0,b.jsx)(e.default,{}),(0,b.jsxs)("main",{className:"proj-detail-main",style:{position:"relative",zIndex:1,maxWidth:"900px",margin:"0 auto",padding:"120px 40px 80px"},children:[(0,b.jsx)(d.default,{href:"/projects",className:"proj-detail-back",children:"← BACK TO PROJECTS"}),(0,b.jsxs)("div",{style:{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--accent)",letterSpacing:"4px",marginBottom:"16px",display:"flex",alignItems:"center",gap:"12px"},children:[(0,b.jsx)("span",{style:{width:"24px",height:"1px",background:"var(--accent)",display:"block"}}),k.subtitle]}),(0,b.jsx)("h1",{className:"proj-detail-title",style:{fontFamily:"var(--display)",fontSize:"clamp(2rem, 6vw, 5rem)",fontWeight:900,color:"#fff",lineHeight:.95,letterSpacing:"-0.5px",marginBottom:"24px"},children:k.name}),(0,b.jsx)("div",{className:"proj-meta-grid",style:{display:"grid",gridTemplateColumns:"repeat(3, auto)",gap:"0",marginBottom:"48px",border:"1px solid #1a1a1a",width:"fit-content"},children:[["YEAR",k.year],["STATUS",k.status],["TEAM",`${k.team.length} MEMBER${k.team.length>1?"S":""}`]].map(([a,c],d)=>(0,b.jsxs)("div",{style:{padding:"14px 24px",borderRight:d<2?"1px solid #1a1a1a":"none"},children:[(0,b.jsx)("div",{style:{fontFamily:"var(--mono)",fontSize:"9px",color:"var(--text-dim)",letterSpacing:"3px",marginBottom:"6px"},children:a}),(0,b.jsx)("div",{style:{fontFamily:"var(--mono)",fontSize:"12px",color:"STATUS"===a?m:"#fff",letterSpacing:"2px"},children:c})]},a))}),(0,b.jsxs)("div",{style:{paddingLeft:"20px",marginBottom:"48px",background:"rgba(230,51,41,0.03)",padding:"20px 20px 20px 20px",borderLeft:"2px solid var(--accent)",position:"relative"},children:[(0,b.jsx)("div",{style:{position:"absolute",top:0,left:0,right:0,height:"1px",background:"linear-gradient(90deg, var(--accent), transparent)"}}),(0,b.jsx)("div",{style:{fontFamily:"var(--mono)",fontSize:"9px",color:"var(--accent)",letterSpacing:"3px",marginBottom:"10px"},children:"// KEY HIGHLIGHT"}),(0,b.jsx)("p",{style:{fontFamily:"var(--mono)",fontSize:"13px",color:"#fff",letterSpacing:"1px",lineHeight:1.7},children:k.highlight})]}),(0,b.jsx)("div",{className:"sec-label",children:"// OVERVIEW"}),(0,b.jsx)("p",{style:{fontFamily:"var(--prose)",fontSize:"15px",color:"var(--text)",lineHeight:1.85,marginBottom:"48px"},children:k.longDescription}),(0,b.jsx)("div",{className:"sec-label",children:"// TECH STACK"}),(0,b.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"48px"},children:k.stack.map(a=>(0,b.jsx)("span",{className:"proj-stack-tag",children:a},a))}),n.length>0&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"sec-label",children:"// TEAM"}),(0,b.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"10px",marginBottom:"48px"},children:n.map(a=>(0,b.jsxs)(d.default,{href:`/friends/${a.slug}`,className:"friend-chip",children:[(0,b.jsx)("div",{className:"fc-avatar",style:{background:a.accentFaint,border:`1px solid ${a.accentDim}`,color:a.accent},children:a.firstName[0]}),(0,b.jsxs)("span",{className:"fc-name",children:[a.firstName," ",a.lastName]})]},a.slug))})]}),(0,b.jsxs)("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[k.github&&(0,b.jsx)("a",{href:k.github,target:"_blank",rel:"noopener noreferrer",className:"proj-github-btn",children:"⌥ VIEW ON GITHUB →"}),(0,b.jsx)(d.default,{href:"/projects",className:"proj-detail-back",style:{marginBottom:0,border:"1px solid #1a1a1a",padding:"14px 28px"},children:"← ALL PROJECTS"})]})]}),(0,b.jsx)(f.default,{})]})},"generateStaticParams",0,k],61578)},6415,a=>{a.n(a.i(61578))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1w64paj._.js.map