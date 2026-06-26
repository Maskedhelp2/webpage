export type TeamMember = {
  slug: string
  name: string
  firstName: string
  lastName: string
  role: string
  eyebrow: string
  bio: string
  skills: string[]
  funFact: string
  accent: string
  accentGlow: string
  accentFaint: string
  accentDim: string
  github?: string
  githubHandle?: string
  linkedin?: string
  resumeFile?: string
  photo?: string
}

export const team: TeamMember[] = [
  {
    slug: 'abhiroop',
    name: 'ABHIROOP CHATTERJEE',
    firstName: 'ABHIROOP',
    lastName: 'CHATTERJEE',
    role: 'CONTRIBUTOR // MASKEDHELP',
    eyebrow: 'FRIENDS // CONTRIBUTOR',
    bio: 'Abhiroop is a contributor and collaborator within the MaskedHelp circle, studying at Amity University. Bringing a sharp eye for detail and a passion for building things that actually work, Abhiroop is an integral part of the crew.',
    skills: ['DEVELOPMENT', 'PROBLEM SOLVING', 'COLLABORATION', 'AMITY UNIVERSITY'],
    funFact: 'The kind of person who finds the bug everyone else missed — and then fixes it before anyone notices it was there.',
    accent: '#f59e0b',
    accentGlow: 'rgba(245,158,11,0.35)',
    accentFaint: 'rgba(245,158,11,0.07)',
    accentDim: 'rgba(245,158,11,0.3)',
    resumeFile: '/resumes/abhiroop.pdf',
    photo: '/team/abhiroop.jpg',
  },
  {
    slug: 'aahana',
    name: 'AAHANA HAJARIWALA',
    firstName: 'AAHANA',
    lastName: 'HAJARIWALA',
    role: 'CO-DEVELOPER // DESK HELPER',
    eyebrow: 'FRIENDS // DESK HELPER PROJECT',
    bio: 'Aahana is a developer and collaborator on the Desk Helper project, contributing to the firmware and desktop configurator application. Studying at Amity University with a keen interest in embedded systems, hardware-software integration, and building tools that bridge the physical and digital worlds.',
    skills: ['EMBEDDED SYSTEMS', 'FIRMWARE', 'REACT', 'HARDWARE DESIGN', 'QMK', 'TAURI'],
    funFact: 'Believes the best interfaces are the ones you never have to think about — which is exactly what inspired joining the Desk Helper project.',
    accent: '#ff69b4',
    accentGlow: 'rgba(255,105,180,0.35)',
    accentFaint: 'rgba(255,105,180,0.07)',
    accentDim: 'rgba(255,105,180,0.3)',
    github: 'https://github.com/aahana100306',
    githubHandle: 'aahana100306',
    linkedin: 'https://www.linkedin.com/in/aahana-hajariwala-27a9373b3/',
    resumeFile: '/resumes/aahana.pdf',
    photo: '/team/aahana.jpg',
  },
  {
    slug: 'rohan',
    name: 'ROHAN ALEX BASIL',
    firstName: 'ROHAN',
    lastName: 'ALEX BASIL',
    role: 'CO-DEVELOPER // DESK HELPER',
    eyebrow: 'FRIENDS // DESK HELPER PROJECT',
    bio: 'Rohan is a developer and core contributor on the Desk Helper project, working on the HID communication protocol and desktop application backend. Studying at Amity University with interests in systems programming, Rust, and low-level hardware communication.',
    skills: ['RUST', 'SYSTEMS PROGRAMMING', 'HID PROTOCOL', 'C/C++', 'TYPESCRIPT', 'BACKEND'],
    funFact: 'Wrote the entire Raw HID communication layer in Rust and somehow enjoyed every second of debugging firmware-to-desktop packet drops at 2am.',
    accent: '#00897b',
    accentGlow: 'rgba(0,137,123,0.35)',
    accentFaint: 'rgba(0,137,123,0.07)',
    accentDim: 'rgba(0,137,123,0.3)',
    github: 'https://github.com/typist355',
    githubHandle: 'typist355',
    linkedin: 'https://www.linkedin.com/in/rohan-basil-76a3953b8/',
    resumeFile: '/resumes/rohan.pdf',
    photo: '/team/rohan.jpg',
  },
  {
    slug: 'sparsh',
    name: 'SPARSH TYAGI',
    firstName: 'SPARSH',
    lastName: 'TYAGI',
    role: 'CO-DEVELOPER // DESK HELPER',
    eyebrow: 'FRIENDS // DESK HELPER PROJECT',
    bio: 'Sparsh is a contributor on the Desk Helper project, focused on UI/UX and the React configurator frontend. Studying at Amity University with an interest in design systems, frontend engineering, and making complex hardware feel approachable through good software.',
    skills: ['REACT', 'TYPESCRIPT', 'UI/UX', 'TAILWIND', 'FRONTEND', 'FIGMA'],
    funFact: 'Spends more time debating button border-radius than most people spend on entire projects. The pixels are always worth it.',
    accent: '#a78bfa',
    accentGlow: 'rgba(167,139,250,0.35)',
    accentFaint: 'rgba(167,139,250,0.07)',
    accentDim: 'rgba(167,139,250,0.3)',
    resumeFile: '/resumes/sparsh.pdf',
    photo: '/team/sparsh.jpg',
  },
]