'use client';
import React, {
  useEffect,
  useRef,
  useState
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../../globals.css";

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  label: string;
  title: React.ReactNode;
  description: string;
  words: string[];
}

interface FeatureSectionProps {
  feature: Feature;
  index: number;
}

const sections: Feature[] = [
  {
    label: "SYSTEM_OVERVIEW",
    title: (
      <>
        HARDWARE MEETS
        <br />
        SOFTWARE
      </>
    ),
    description:
      "A programmable macro keypad paired with a powerful desktop configurator. Customize every key, create layers, assign macros and manage profiles in real time.",
    words: [
      "17 KEYS",
      "5 LAYERS",
      "MACROS",
      "PROFILES",
      "ENCODER",
      "CONFIGURATOR",
      "FIRMWARE",
      "CUSTOMIZATION"
    ]
  },
  {
    label: "FEATURE_01",
    title: (
      <>
        MULTI-LAYER
        <br />
        WORKFLOWS
      </>
    ),
    description:
      "Create multiple key layouts and instantly switch between task-specific configurations.",
    words: [
      "LAYERS",
      "PROFILES",
      "WORKFLOWS",
      "SWITCHING",
      "PRODUCTIVITY",
      "CUSTOMIZATION"
    ]
  },
  {
    label: "FEATURE_02",
    title: (
      <>
        MACRO
        <br />
        AUTOMATION
      </>
    ),
    description:
      "Assign complex sequences to a single key and automate repetitive actions.",
    words: [
      "MACROS",
      "SEQUENCES",
      "AUTOMATION",
      "HOTKEYS",
      "PRODUCTIVITY",
      "SHORTCUTS"
    ]
  },
  {
    label: "FEATURE_03",
    title: (
      <>
        ROTARY
        <br />
        ENCODER
      </>
    ),
    description:
      "Control volume, zoom, timeline scrubbing and application-specific actions.",
    words: [
      "VOLUME",
      "ZOOM",
      "SCRUB",
      "MEDIA",
      "CONTROL",
      "ROTATION"
    ]
  },
  {
    label: "FEATURE_04",
    title: (
      <>
        APPLICATION
        <br />
        PROFILES
      </>
    ),
    description:
      "Store dedicated layouts for Blender, VS Code, Photoshop and media software.",
    words: [
      "BLENDER",
      "VSCODE",
      "PHOTOSHOP",
      "SPOTIFY",
      "OBS",
      "PRESETS"
    ]
  },
  {
    label: "FEATURE_05",
    title: (
      <>
        REAL-TIME
        <br />
        CONFIGURATION
      </>
    ),
    description:
      "Apply changes instantly without reflashing firmware or restarting devices.",
    words: [
      "LIVE",
      "REALTIME",
      "CONFIG",
      "KEYMAPS",
      "UPDATE",
      "SYNC"
    ]
  },
  {
    label: "FEATURE_06",
    title: (
      <>
        FIRMWARE
        <br />
        MANAGEMENT
      </>
    ),
    description:
      "Backup, restore and update device firmware directly from the configurator.",
    words: [
      "BACKUP",
      "RESTORE",
      "FLASH",
      "DEVICE",
      "FIRMWARE",
      "MANAGEMENT"
    ]
  }
];

function Hero(): React.JSX.Element {
  return (
    <section
      className="
      hero-section
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        relative
      "
    >
      <div
        className="
          max-w-[1500px]
          mx-auto
          grid
          grid-cols-2
          items-center
          gap-24
          px-16
        "
      >

        {/* LEFT SIDE */}
        <div className="max-w-[650px]">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-10 h-[2px] bg-red-500" />

            <span
              className="
                font-terminal
                text-red-500
                uppercase
                tracking-[0.35em]
                text-sm
              "
            >
              PROJECT_V1.0 // INITIALIZED
            </span>

          </div>

          <h1
            className="
              font-cyber
              uppercase
              crt
              text-white
              leading-[0.9]
              tracking-tight
              text-5xl
              md:text-6xl
              lg:text-[4.5rem]
              cyber-title
            "
          >
            NUMPAD
            <br />
            CONTROLLER
          </h1>

          <p
            className="
              font-terminal
              text-gray-400
              mt-10
              text-xl
              leading-relaxed
              max-w-xl
            "
          >
            A programmable macro keypad featuring
            multi-layer support, encoder controls,
            custom profiles, firmware management
            and real-time software configuration.
          </p>
          <br />
          <br />

        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center items-center">

          <div
            className="
              absolute
              inset-0
              bg-red-600
              blur-[220px]
              opacity-20
              rounded-full
            "
          />

          <img
            src="/numpad.png.jpeg"
            alt="Numpad Configurator"
            className="hero-image"
          />

        </div>

      </div>
    </section>
  );
}

function FeatureSection(props: FeatureSectionProps) {

  const { feature, index } = props;

  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [activeWord, setActiveWord] =
    useState(0);

  useEffect(() => {

    const section = sectionRef.current;

    if (!section) return;

    const title =
      section.querySelector<HTMLElement>(
        ".feature-title"
      );

    const desc =
      section.querySelector<HTMLElement>(
        ".feature-description"
      );

    const label =
      section.querySelector<HTMLElement>(
        ".feature-label"
      );

    gsap.fromTo(
      [label, title, desc],
      {
        opacity: 0,
        y: 80
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%"
        }
      }
    );

    const words =
      section.querySelectorAll<HTMLElement>(
        ".spiral-word"
      );

    words.forEach((word, i) => {

      gsap.to(word, {
        rotation: i % 2 ? 8 : -8,
        y: i % 2 ? -30 : 30,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    });

  }, []);

  useEffect(() => {

    const interval = setInterval(() => {

      setActiveWord(prev =>
        (prev + 1) % feature.words.length
      );

    }, 1800);

    return () => clearInterval(interval);

  }, [feature.words.length]);

  return (
    <section
      id={index === 0 ? "system" : undefined}
      ref={sectionRef}
      className={`feature-section ${
        index === 0 ? "overview-section" : ""
      }`}
    >

      <div className="feature-glow" />

      <div className="bg-word">
        NUMPAD
      </div>

      {/* Spiral Words */}

      <div className="spiral-container">

        {feature.words.map((word, i) => {

          const angle =
            ((Math.PI * 2) /
              feature.words.length) * i;

          const radius = 430;

          const x =
            Math.cos(angle) * radius;

          const y =
            Math.sin(angle) * radius;

          const active =
            activeWord === i;

          return (
            <div
              key={word}
              className={`
                spiral-word
                ${
                  active
                    ? "active"
                    : "inactive"
                }
              `}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%)`,
                scale: active ? 1.35 : 1,
              }}
            >
              {word}
            </div>
          );

        })}

      </div>

      {/* Main Content */}

      <div className="feature-center">

        <div className="feature-label font-terminal">
          {feature.label}
        </div>

        <h2
          className="
            feature-title
            font-cyber
            transition-all
            duration-500
          "
        >
          {feature.title}
        </h2>

        <div className="feature-description font-terminal">

          <p>{feature.description}</p>

          {index === 0 && (
            <div className="overview-stats">

              <div className="overview-card">
                <h3>17</h3>
                <span>CUSTOMISABLE KEYS</span>
              </div>

              <div className="overview-card">
                <h3>5</h3>
                <span>PROFILES INTERCHANGEABLE</span>
              </div>

              <div className="overview-card">
                <h3>10</h3>
                <span>CUSTOMIZABLE MACROS</span>
              </div>

            </div>
          )}

          <span
            className="
              block
              mt-8
              text-red-500
              uppercase
              tracking-[0.4em]
            "
          >
            {feature.words[activeWord]}
          </span>

        </div>

      </div>

    </section>
  );
}

function DualWave() {

  useEffect(() => {

    const progress =
      document.querySelector<HTMLElement>(
        ".scroll-progress"
      );

    if (!progress) return;

    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        scrub: true,
        start: "top top",
        end: "bottom bottom"
      }
    });

  }, []);

  return (
    <div
      id="configurator"
      className="dualwave-page">

      <div className="dualwave-grid" />

      <div className="dualwave-vignette" />

      <div className="scroll-progress" />

      <div className="scroll-hint">
        Scroll To Explore
      </div>

      <div className="text-center pt-40 pb-20">

        <p className="feature-label">
          SOFTWARE EXPERIENCE
        </p>

        <h2 className="feature-title font-cyber crt cyber-title">
          CONFIGURATOR
        </h2>

        <p className="feature-description">
          Explore layers, macros, encoder controls,
          firmware management and profile workflows.
        </p>

      </div>

      {sections.map((feature, index) => (
        <FeatureSection
          key={index}
          feature={feature}
          index={index}
        />
      ))}

    </div>
  );
}

export default function Page() {
  return (
    <>
      <Hero />
      <DualWave />
    </>
  );
}