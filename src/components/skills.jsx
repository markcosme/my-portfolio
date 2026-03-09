import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Parallax, Magnetic } from "./scrollreveal";

const DM = "'DM Sans',sans-serif";
const CV = "'Coolvetica','DM Sans',sans-serif";

const tools = [
  {
    name: "Photoshop",
    color: "#31A8FF",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg",
  },
  {
    name: "Illustrator",
    color: "#FF9A00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg",
  },
  {
    name: "InDesign",
    color: "#FF3366",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/indesign/indesign-plain.svg",
  },
  {
    name: "After Effects",
    color: "#9999FF",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg",
  },
  {
    name: "Premiere Pro",
    color: "#ea77ff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg",
  },
  {
    name: "Adobe XD",
    color: "#FF61F6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-plain.svg",
  },
  {
    name: "Lightroom",
    color: "#31A8FF",
    icon: "https://cdn.simpleicons.org/adobelightroom/31A8FF",
  },
  {
    name: "Audition",
    color: "#00E4BB",
    icon: "https://cdn.simpleicons.org/adobeaudition/00E4BB",
  },
  {
    name: "Acrobat",
    color: "#EC1C24",
    icon: "https://cdn.simpleicons.org/adobeacrobatreader/EC1C24",
  },
  {
    name: "Figma",
    color: "#F24E1E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  },
  {
    name: "Canva",
    color: "#00C4CC",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
  },
  {
    name: "HTML/CSS",
    color: "#E34F26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    color: "#61DAFB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Google Workspace",
    color: "#4285F4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg",
  },
];

function ToolChip({ tool, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 18 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.045,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.06,
        borderColor: tool.color,
        boxShadow: `0 6px 26px ${tool.color}33`,
        y: -3,
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "0.5rem 1rem 0.5rem 0.5rem",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        background: "var(--surface)",
        transition: "border-color 0.3s, box-shadow 0.3s",
        userSelect: "none",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "7px",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          padding: "4px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
        }}
      >
        <img
          src={tool.icon}
          alt={tool.name}
          width={22}
          height={22}
          style={{
            display: "block",
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.style.background = tool.color;
            e.target.parentNode.innerHTML = `<span style="font-size:0.75rem;font-weight:800;color:#fff">${tool.name[0]}</span>`;
          }}
        />
      </div>
      <span
        style={{
          fontFamily: DM,
          fontSize: "var(--fs-sm)",
          letterSpacing: "0.04em",
          color: "var(--text)",
          whiteSpace: "nowrap",
        }}
      >
        {tool.name}
      </span>
    </motion.div>
  );
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: "var(--pad-section)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Parallax
        speed={0.2}
        style={{
          position: "absolute",
          bottom: "-2rem",
          left: "1rem",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontFamily: CV,
            fontSize: "clamp(5rem,15vw,13rem)",
            color: "rgba(201,149,42,0.03)",
            lineHeight: 1,
          }}
        >
          SKILLS
        </div>
      </Parallax>

      <div
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Reveal delay={0}>
          <div className="section-label">Expertise</div>
          <h2
            style={{
              fontFamily: CV,
              fontSize: "var(--fs-h1)",
              letterSpacing: "0.04em",
              marginBottom: "3.5rem",
              color: "var(--gold)",
              fontWeight: 400,
            }}
          >
            Tools I Work With
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              justifyContent: "center",
            }}
          >
            {tools.map((t, i) => (
              <Magnetic key={t.name} strength={0.2}>
                <ToolChip tool={t} index={i} />
              </Magnetic>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
