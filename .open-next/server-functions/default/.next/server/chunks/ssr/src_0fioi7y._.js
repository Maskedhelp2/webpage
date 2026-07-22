module.exports=[97188,a=>{"use strict";a.s(["team",0,[{slug:"abhiroop",name:"ABHIROOP CHATTERJEE",firstName:"ABHIROOP",lastName:"CHATTERJEE",role:"CONTRIBUTOR // MASKEDHELP",eyebrow:"FRIENDS // CONTRIBUTOR",bio:"Abhiroop is a contributor and collaborator within the MaskedHelp circle, studying at Amity University. Bringing a sharp eye for detail and a passion for building things that actually work, Abhiroop is an integral part of the crew.",skills:["DEVELOPMENT","PROBLEM SOLVING","COLLABORATION","AMITY UNIVERSITY"],funFact:"The kind of person who finds the bug everyone else missed — and then fixes it before anyone notices it was there.",accent:"#f59e0b",accentGlow:"rgba(245,158,11,0.35)",accentFaint:"rgba(245,158,11,0.07)",accentDim:"rgba(245,158,11,0.3)",resumeFile:"/resumes/abhiroop.pdf",photo:"/team/abhiroop.jpg"},{slug:"aahana",name:"AAHANA HAJARIWALA",firstName:"AAHANA",lastName:"HAJARIWALA",role:"CO-DEVELOPER // DESK HELPER",eyebrow:"FRIENDS // DESK HELPER PROJECT",bio:"Aahana is a developer and collaborator on the Desk Helper project, contributing to the firmware and desktop configurator application. Studying at Amity University with a keen interest in embedded systems, hardware-software integration, and building tools that bridge the physical and digital worlds.",skills:["EMBEDDED SYSTEMS","FIRMWARE","REACT","HARDWARE DESIGN","QMK","TAURI"],funFact:"Believes the best interfaces are the ones you never have to think about — which is exactly what inspired joining the Desk Helper project.",accent:"#ff69b4",accentGlow:"rgba(255,105,180,0.35)",accentFaint:"rgba(255,105,180,0.07)",accentDim:"rgba(255,105,180,0.3)",github:"https://github.com/aahana100306",githubHandle:"aahana100306",linkedin:"https://www.linkedin.com/in/aahana-hajariwala-27a9373b3/",resumeFile:"/resumes/aahana.pdf",photo:"/team/aahana.jpg"},{slug:"rohan",name:"ROHAN ALEX BASIL",firstName:"ROHAN",lastName:"ALEX BASIL",role:"CO-DEVELOPER // DESK HELPER",eyebrow:"FRIENDS // DESK HELPER PROJECT",bio:"Rohan is a developer and core contributor on the Desk Helper project, working on the HID communication protocol and desktop application backend. Studying at Amity University with interests in systems programming, Rust, and low-level hardware communication.",skills:["RUST","SYSTEMS PROGRAMMING","HID PROTOCOL","C/C++","TYPESCRIPT","BACKEND"],funFact:"Wrote the entire Raw HID communication layer in Rust and somehow enjoyed every second of debugging firmware-to-desktop packet drops at 2am.",accent:"#00897b",accentGlow:"rgba(0,137,123,0.35)",accentFaint:"rgba(0,137,123,0.07)",accentDim:"rgba(0,137,123,0.3)",github:"https://github.com/typist355",githubHandle:"typist355",linkedin:"https://www.linkedin.com/in/rohan-basil-76a3953b8/",resumeFile:"/resumes/rohan.pdf",photo:"/team/rohan.jpg"},{slug:"sparsh",name:"SPARSH TYAGI",firstName:"SPARSH",lastName:"TYAGI",role:"CO-DEVELOPER // DESK HELPER",eyebrow:"FRIENDS // DESK HELPER PROJECT",bio:"Sparsh is a contributor on the Desk Helper project, focused on UI/UX and the React configurator frontend. Studying at Amity University with an interest in design systems, frontend engineering, and making complex hardware feel approachable through good software.",skills:["REACT","TYPESCRIPT","UI/UX","TAILWIND","FRONTEND","FIGMA"],funFact:"Spends more time debating button border-radius than most people spend on entire projects. The pixels are always worth it.",accent:"#a78bfa",accentGlow:"rgba(167,139,250,0.35)",accentFaint:"rgba(167,139,250,0.07)",accentDim:"rgba(167,139,250,0.3)",resumeFile:"/resumes/sparsh.pdf",photo:"/team/sparsh.jpg"}]])},16138,43442,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(97188);let e={ACTIVE:"#00d2d2",COMPLETE:"#e63329",RESEARCH:"#a78bfa"};a.s(["default",0,function({project:a}){let f=e[a.status],g=d.team.filter(b=>a.team.some(a=>a.toLowerCase().includes(b.firstName.toLowerCase())||b.name.toLowerCase().includes(a.toLowerCase())));return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:`
        .proj-card {
          border: 1px solid rgba(230,51,41,0.2);
          background: rgba(230,51,41,0.04);
          padding: 32px;
          position: relative;
          transition: border-color 0.25s, background 0.25s, box-shadow 0.25s;
        }
        .proj-card:hover {
          border-color: rgba(230,51,41,0.45);
          background: rgba(230,51,41,0.07);
          box-shadow: 0 0 40px rgba(230,51,41,0.08);
        }
        .proj-card:hover .proj-top-line { opacity: 1; }

        .proj-top-line {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(230,51,41,0.6), transparent);
          opacity: 0.4; transition: opacity 0.25s;
        }

        .proj-view-btn {
          font-family: var(--mono); font-size: 11px;
          color: var(--accent); letter-spacing: 2px;
          border: 1px solid rgba(230,51,41,0.35);
          background: rgba(230,51,41,0.06);
          padding: 10px 20px;
          display: inline-flex; align-items: center; gap: 8px;
          text-decoration: none; transition: all 0.2s;
        }
        .proj-view-btn:hover {
          background: rgba(230,51,41,0.14);
          box-shadow: 0 0 16px rgba(230,51,41,0.25);
          gap: 12px;
        }

        .proj-github-btn-${a.slug} {
          font-family: var(--mono); font-size: 11px;
          color: var(--text-dim); letter-spacing: 2px;
          border: 1px solid #2a2a2a;
          padding: 10px 20px;
          display: inline-flex; align-items: center; gap: 8px;
          text-decoration: none; transition: all 0.2s;
        }
        .proj-github-btn-${a.slug}:hover {
          color: var(--accent); border-color: var(--accent);
        }

        .friend-chip {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px 6px 8px;
          border: 1px solid #2a2a2a;
          text-decoration: none; transition: all 0.2s;
        }
        .friend-chip:hover { border-color: var(--accent); }
        .friend-chip:hover .friend-chip-name { color: var(--accent); }
        .friend-avatar {
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--display); font-size: 10px; font-weight: 900;
          flex-shrink: 0;
        }
        .friend-chip-name {
          font-family: var(--mono); font-size: 10px;
          color: var(--text-dim); letter-spacing: 1px;
          transition: color 0.2s;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .proj-card { padding: 20px 16px; }
          .proj-card-actions { flex-direction: column !important; }
          .proj-card-actions a { width: 100%; justify-content: center; }
        }
      `}),(0,b.jsxs)("div",{className:"proj-card",children:[(0,b.jsx)("div",{className:"proj-top-line"}),(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px",flexWrap:"wrap",gap:"8px"},children:[(0,b.jsx)("div",{style:{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--text-dim)",letterSpacing:"3px"},children:a.year}),(0,b.jsx)("span",{style:{fontFamily:"var(--mono)",fontSize:"10px",padding:"4px 10px",letterSpacing:"2px",border:`1px solid ${f}33`,color:f,background:`${f}11`},children:a.status})]}),(0,b.jsx)("h3",{style:{fontFamily:"var(--display)",fontSize:"clamp(18px, 3vw, 22px)",fontWeight:900,color:"#fff",letterSpacing:"1px",marginBottom:"4px"},children:a.name}),(0,b.jsx)("p",{style:{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--accent)",letterSpacing:"3px",marginBottom:"16px"},children:a.subtitle}),(0,b.jsx)("p",{style:{fontFamily:"var(--prose)",fontSize:"14px",color:"var(--text)",lineHeight:1.75,marginBottom:"20px"},children:a.description}),(0,b.jsx)("div",{style:{borderLeft:"2px solid var(--accent)",paddingLeft:"14px",marginBottom:"20px"},children:(0,b.jsx)("p",{style:{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--text-dim)",letterSpacing:"1px",lineHeight:1.6},children:a.highlight})}),(0,b.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"24px"},children:a.stack.map(a=>(0,b.jsx)("span",{style:{fontFamily:"var(--mono)",fontSize:"10px",padding:"4px 10px",border:"1px solid rgba(230,51,41,0.2)",color:"var(--accent)",background:"rgba(230,51,41,0.06)"},children:a},a))}),g.length>0&&(0,b.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,b.jsxs)("div",{style:{fontFamily:"var(--mono)",fontSize:"10px",color:"var(--accent)",letterSpacing:"3px",marginBottom:"10px",display:"flex",alignItems:"center",gap:"10px"},children:["// FRIENDS ON THIS",(0,b.jsx)("span",{style:{flex:1,height:"1px",background:"linear-gradient(90deg, rgba(230,51,41,0.3), transparent)"}})]}),(0,b.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:g.map(a=>(0,b.jsxs)(c.default,{href:`/friends/${a.slug}`,className:"friend-chip",children:[(0,b.jsx)("div",{className:"friend-avatar",style:{background:a.accentFaint,border:`1px solid ${a.accentDim}`,color:a.accent},children:a.firstName[0]}),(0,b.jsxs)("span",{className:"friend-chip-name",children:[a.firstName," ",a.lastName]})]},a.slug))})]}),(0,b.jsxs)("div",{className:"proj-card-actions",style:{display:"flex",gap:"10px",flexWrap:"wrap"},children:[(0,b.jsx)(c.default,{href:`/projects/${a.slug}`,className:"proj-view-btn",children:"VIEW PROJECT →"}),a.github&&(0,b.jsx)("a",{href:a.github,target:"_blank",rel:"noopener noreferrer",className:`proj-github-btn-${a.slug}`,children:"⌥ GITHUB"})]})]})]})}],16138),a.s(["projects",0,[{slug:"desk-helper",name:"DESK HELPER",subtitle:"PROGRAMMABLE MACRO PAD",year:"2024–2025",status:"COMPLETE",description:"A fully programmable RP2040-powered macro pad with dynamic key remapping, 5 onboard profiles, and a cross-platform Tauri + React configurator.",longDescription:"Engineered a fully programmable RP2040-powered macro pad with dynamic key remapping, 5 onboard profiles, and a macro engine — all stored in EEPROM without reflashing. Built a cross-platform Tauri + React desktop configurator (Windows / Linux / macOS) for live keymap editing, OLED image uploads, and one-click UF2 firmware flashing. Implemented a custom Raw HID communication protocol over USB between QMK firmware and the Rust/HIDAPI backend.",stack:["QMK FIRMWARE","RUST","TAURI 2","REACT","TYPESCRIPT","ZUSTAND","RP2040"],github:"https://github.com/Maskedhelp2/desk-helper",team:["Karthik Kumar","Aahana Hajariwala","Rohan Alex Basil","Sparsh Tyagi"],highlight:"Raw HID over USB — firmware talks directly to desktop without drivers."},{slug:"slam-nav",name:"SLAM NAV SYSTEM",subtitle:"AUTONOMOUS 2D/3D LIDAR FUSION",year:"2025",status:"RESEARCH",description:"Real-time SLAM pipeline using 2D LiDAR with a custom-built 3D module for full volumetric point-cloud generation in unknown environments.",longDescription:"Designed and implemented a real-time SLAM (Simultaneous Localization and Mapping) pipeline using 2D LiDAR sensors, enabling a mobile robot to autonomously map and navigate unknown environments. Extended the system with a custom-fabricated 3D LiDAR module — achieved full volumetric point-cloud generation by mechanically rotating a 2D sensor and fusing scan data across axes. Integrated ROS2, pose-graph optimization, and sensor-fusion algorithms to achieve sub-centimetre mapping accuracy in dynamic indoor environments.",stack:["ROS2","PYTHON","C++","PCL","SLAM TOOLBOX","RPLIDAR"],team:["Karthik Kumar"],highlight:"Sub-centimetre mapping accuracy using a DIY 3D LiDAR built from a rotating 2D sensor."},{slug:"aria",name:"ARIA",subtitle:"AI WASTE SEGREGATION ROBOT",year:"2025",status:"RESEARCH",description:"End-to-end autonomous waste segregation combining a 6-DOF robotic arm with real-time YOLO-based computer vision for multi-class classification.",longDescription:"Developed an end-to-end autonomous waste segregation system combining a 6-DOF robotic manipulator with a real-time computer vision pipeline for multi-class waste classification. Trained a custom YOLO-based object detection model to identify and classify waste categories (plastic, metal, organic, paper) with >90% accuracy under varied lighting conditions. Implemented inverse kinematics for precise pick-and-place operations, enabling the robotic arm to grip irregularly shaped objects and deposit them into the correct segregation bin.",stack:["PYTHON","PYTORCH","OPENCV","ROS2","ARDUINO","YOLO","SERVO CONTROL"],team:["Karthik Kumar"],highlight:">90% classification accuracy across 4 waste categories with custom-trained YOLO."}]],43442)},53524,a=>{"use strict";var b=a.i(87924),c=a.i(20238),d=a.i(16138),e=a.i(43442);a.s(["default",0,function(){return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(c.default,{}),(0,b.jsxs)("main",{style:{position:"relative",zIndex:1,maxWidth:"960px",margin:"0 auto",padding:"120px 40px 80px"},children:[(0,b.jsxs)("div",{style:{fontFamily:"var(--mono)",fontSize:"11px",color:"var(--accent)",letterSpacing:"4px",marginBottom:"20px",display:"flex",alignItems:"center",gap:"12px"},children:[(0,b.jsx)("span",{style:{width:"24px",height:"1px",background:"var(--accent)",display:"block"}}),"MASKEDHELP // PROJECTS"]}),(0,b.jsxs)("h1",{style:{fontFamily:"var(--display)",fontSize:"clamp(32px, 6vw, 64px)",fontWeight:900,color:"#fff",lineHeight:1,marginBottom:"16px",letterSpacing:"-0.5px"},children:["WHAT WE ",(0,b.jsx)("span",{style:{color:"var(--accent)"},children:"BUILD"})]}),(0,b.jsx)("p",{style:{fontFamily:"var(--prose)",fontSize:"15px",color:"var(--text)",lineHeight:1.75,maxWidth:"560px",marginBottom:"60px"},children:"Hardware that ships. Software that works. Research that pushes forward."}),(0,b.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:e.projects.map(a=>(0,b.jsx)(d.default,{project:a},a.slug))})]})]})}])}];

//# sourceMappingURL=src_0fioi7y._.js.map