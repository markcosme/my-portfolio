import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Parallax, Magnetic } from "./scrollreveal";

const DM = "'DM Sans',sans-serif";
const CV = "'Coolvetica','DM Sans',sans-serif";

const tools = [
  /* ── Languages ── */
  {
    name: "HTML",
    color: "#E34F26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    color: "#1572B6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    color: "#F7DF1E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "PHP",
    color: "#777BB4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  },
  {
    name: "Java",
    color: "#ED8B00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  {
    name: "SQL",
    color: "#4479A1",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  },
  /* ── Frameworks ── */
  {
    name: "ReactJS",
    color: "#61DAFB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    color: "#339933",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express.js",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  },
  {
    name: "Angular",
    color: "#DD0031",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg",
  },
  /* ── Tools & IDEs ── */
  {
    name: "VS Code",
    color: "#007ACC",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  },
  {
    name: "Figma",
    color: "#F24E1E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  },
  {
    name: "Photoshop",
    color: "#31A8FF",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg",
  },
  {
    name: "Canva",
    color: "#00C4CC",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
  },
  {
    name: "Illustrator",
    color: "#FF9A00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg",
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
    name: "CapCut",
    color: "#000000",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/CapCut_logo.svg/512px-CapCut_logo.svg.png",
  },
  {
    name: "Google Workspace",
    color: "#4285F4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg",
  },
  {
    name: "Bootstrap",
    color: "#7952B3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
  },
];

/* Skill category pills */
const softSkills = [
  "Problem-solving",
  "Attention to Detail",
  "Time Management",
  "Teamwork",
  "Effective Communication",
  "Self-Discipline",
  "Fast Learner",
  "Adaptable",
];

const techAreas = [
  "Programming Fundamentals",
  "Full Stack Web Development",
  "Database Management",
  "Basic Networking",
  "Graphic Design",
  "Troubleshooting",
  "Digital Tools & Office Productivity",
  "Video Editing",
];

function ToolChip({ tool, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 18 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.04,
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
          background: tool.name === "Express.js" ? "#1a1a1a" : "#ffffff",
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

        {/* Tool chips grid */}
        <Reveal delay={0.1}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              justifyContent: "center",
              marginBottom: "3rem",
            }}
          >
            {tools.map((t, i) => (
              <Magnetic key={t.name} strength={0.2}>
                <ToolChip tool={t} index={i} />
              </Magnetic>
            ))}
          </div>
        </Reveal>

        {/* Technical expertise areas */}
        <Reveal delay={0.15}>
          <div
            style={{
              fontFamily: CV,
              fontSize: "var(--fs-h3)",
              color: "var(--text)",
              marginBottom: "1.2rem",
              fontWeight: 400,
              letterSpacing: "0.03em",
            }}
          >
            Technical Expertise
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "3rem",
            }}
          >
            {techAreas.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{
                  borderColor: "var(--gold)",
                  color: "var(--gold)",
                }}
                style={{
                  fontFamily: DM,
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  color: "var(--text-sub)",
                  border: "1px solid var(--border)",
                  padding: "0.35rem 0.9rem",
                  borderRadius: "4px",
                  background: "var(--surface)",
                  transition: "all 0.25s",
                  cursor: "default",
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Reveal>

        {/* Soft skills */}
        <Reveal delay={0.2}>
          <div
            style={{
              fontFamily: CV,
              fontSize: "var(--fs-h3)",
              color: "var(--text)",
              marginBottom: "1.2rem",
              fontWeight: 400,
              letterSpacing: "0.03em",
            }}
          >
            Soft Skills
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {softSkills.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{
                  borderColor: "var(--gold)",
                  color: "var(--gold)",
                }}
                style={{
                  fontFamily: DM,
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  color: "var(--text-sub)",
                  border: "1px solid var(--border)",
                  padding: "0.35rem 0.9rem",
                  borderRadius: "4px",
                  background: "var(--surface)",
                  transition: "all 0.25s",
                  cursor: "default",
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
