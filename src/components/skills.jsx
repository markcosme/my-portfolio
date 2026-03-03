import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Parallax, Magnetic } from "./scrollreveal";

const skillGroups = [
  {
    category: "Design",
    skills: [
      { name: "Adobe Photoshop", level: 95 },
      { name: "Adobe Illustrator", level: 90 },
      { name: "Figma", level: 88 },
      { name: "Adobe InDesign", level: 80 },
      { name: "Canva", level: 92 },
    ],
  },
  {
    category: "Development",
    skills: [
      { name: "HTML / CSS", level: 85 },
      { name: "JavaScript", level: 72 },
      { name: "React JS", level: 68 },
      { name: "Python", level: 65 },
      { name: "MySQL / Databases", level: 78 },
    ],
  },
  {
    category: "Management & IT",
    skills: [
      { name: "Systems Management", level: 90 },
      { name: "Project Management", level: 88 },
      { name: "IT Infrastructure", level: 85 },
      { name: "Network Admin", level: 80 },
      { name: "IT Education", level: 92 },
    ],
  },
];

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
    name: "Figma",
    color: "#F24E1E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  },
  {
    name: "InDesign",
    color: "#FF3366",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/indesign/indesign-plain.svg",
  },
  {
    name: "Canva",
    color: "#00C4CC",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
  },
  {
    name: "React",
    color: "#61DAFB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
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
    name: "Python",
    color: "#3776AB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "MySQL",
    color: "#4479A1",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg",
  },
  {
    name: "WordPress",
    color: "#21759B",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg",
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
    name: "MS Office",
    color: "#D83B01",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg",
  },
  {
    name: "Google Workspace",
    color: "#4285F4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg",
  },
];

/* ── Animated skill bar ── */
function SkillBar({ name, level, delay }) {
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.4rem",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.82rem",
            color: "var(--white)",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--gold)",
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.1em",
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: 3,
          background: "var(--border)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            height: "100%",
            background:
              "linear-gradient(to right, var(--gold), var(--gold-light))",
            borderRadius: "2px",
          }}
        />
      </div>
    </div>
  );
}

/* ── Tool chip with logo ── */
function ToolChip({ tool, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.05,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.07,
        borderColor: tool.color,
        boxShadow: `0 6px 28px ${tool.color}33`,
        y: -3,
      }}
      data-cursor-hover
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.65rem",
        padding: "0.55rem 1.1rem 0.55rem 0.55rem",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        background: "var(--card-bg)",
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
            e.target.parentNode.innerHTML = `<span style="font-size:0.8rem;font-weight:800;color:#fff;line-height:1;font-family:'DM Sans',sans-serif">${tool.name[0]}</span>`;
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.78rem",
          letterSpacing: "0.05em",
          color: "var(--white)",
          whiteSpace: "nowrap",
          fontWeight: 400,
        }}
      >
        {tool.name}
      </span>
    </motion.div>
  );
}

/* ── Scroll-reveal wrapper ── */
function RevealOnScroll({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      scale: 0.96,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
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
        padding: "8rem 3rem",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Giant parallax bg word */}
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
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(5rem, 16vw, 14rem)",
            color: "#ffffff03",
            lineHeight: 1,
          }}
        >
          SKILLS
        </div>
      </Parallax>

      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <RevealOnScroll delay={0}>
          <div
            className="section-label"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Expertise
          </div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "0.04em",
              marginBottom: "4rem",
            }}
          >
            Skills & <span style={{ color: "var(--gold)" }}>Tools</span>
          </h2>
        </RevealOnScroll>

        {/* Skill bars grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "2.5rem",
            marginBottom: "5rem",
          }}
        >
          {skillGroups.map((group, gi) => (
            <RevealOnScroll
              key={group.category}
              delay={gi * 0.15}
              direction={gi === 0 ? "left" : gi === 1 ? "up" : "right"}
            >
              <motion.div
                whileHover={{
                  borderColor: "var(--gold)",
                  boxShadow: "0 0 30px rgba(201,149,42,0.1)",
                }}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "2rem",
                  transition: "border-color 0.3s, box-shadow 0.3s",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "1.2rem",
                    color: "var(--gold)",
                    letterSpacing: "0.1em",
                    marginBottom: "1.5rem",
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "0.8rem",
                  }}
                >
                  {group.category}
                </div>
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={gi * 0.1 + si * 0.08}
                  />
                ))}
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Tools with logos */}
        <RevealOnScroll delay={0.1}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Tools I Work With
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.65rem",
              justifyContent: "center",
            }}
          >
            {tools.map((tool, i) => (
              <Magnetic key={tool.name} strength={0.2}>
                <ToolChip tool={tool} index={i} />
              </Magnetic>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
