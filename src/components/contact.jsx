import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal, ScrollStagger, staggerItem } from "./scrollreveal";

const DM = "'DM Sans',sans-serif";
const CV = "'Coolvetica','DM Sans',sans-serif";

const contacts = [
  {
    label: "Phone",
    value: "+63 954 421 4173",
    icon: null,
    emoji: "📞",
    href: "tel:+639544214173",
    external: false,
  },
  {
    label: "Email",
    value: "cosmemarklouie19@gmail.com",
    icon: null,
    emoji: "✉",
    href: "mailto:cosmemarklouie19@gmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "Mark Louie P. Cosme",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg",
    emoji: null,
    href: "https://www.linkedin.com/in/mark-louie-p-cosme-3b07153a5/",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/marklouie",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    emoji: null,
    href: "https://github.com/marklouie",
    external: true,
  },
  {
    label: "Location",
    value: "Sinura, Porac, Pampanga, PH",
    icon: null,
    emoji: "📍",
    href: null,
    external: false,
  },
];

export default function Contact({ onAdminOpen }) {
  const [clicks, setClicks] = useState(0);

  const handleCopyClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 3) {
      setClicks(0);
      onAdminOpen?.();
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "var(--pad-section)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 560,
          height: 560,
          background:
            "radial-gradient(circle, rgba(201,149,42,0.06), transparent 65%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        <ScrollReveal direction="up" delay={0}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            Get In Touch
          </div>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={0.1}>
          <h2
            style={{
              fontFamily: CV,
              fontSize: "clamp(2.8rem,7vw,6rem)",
              letterSpacing: "0.04em",
              lineHeight: 1,
              marginBottom: "1.2rem",
              fontWeight: 400,
              color: "var(--text)",
            }}
          >
            Let's Work
            <br />
            <span style={{ color: "var(--gold)" }}>Together.</span>
          </h2>
          <p
            style={{
              fontFamily: DM,
              fontSize: "var(--fs-body)",
              color: "var(--text-sub)",
              maxWidth: 460,
              margin: "0 auto 3.5rem",
              lineHeight: 1.85,
            }}
          >
            Open for internship opportunities, collaborations, and freelance
            projects. Let's build something great together.
          </p>
        </ScrollReveal>

        <ScrollStagger
          delay={0.15}
          stagger={0.08}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))",
            gap: "1rem",
            marginBottom: "3.5rem",
          }}
          className="contact-grid"
        >
          {contacts.map((c) => (
            <motion.a
              key={c.label}
              href={c.href || undefined}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              variants={staggerItem}
              whileHover={{
                y: -5,
                borderColor: "var(--gold)",
                boxShadow: "0 12px 36px rgba(201,149,42,0.12)",
              }}
              transition={{ duration: 0.25 }}
              style={{
                display: "block",
                padding: "1.6rem 1.2rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                textDecoration: "none",
                transition:
                  "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                cursor: c.href ? "pointer" : "default",
              }}
            >
              {/* Icon — either SVG logo or emoji */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  margin: "0 auto 0.8rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {c.icon ? (
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      background: c.label === "GitHub" ? "#1a1a1a" : "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      padding: "5px",
                    }}
                  >
                    <img
                      src={c.icon}
                      alt={c.label}
                      width={26}
                      height={26}
                      style={{
                        display: "block",
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                        filter: c.label === "GitHub" ? "invert(1)" : "none",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                ) : (
                  <span style={{ fontSize: "1.6rem" }}>{c.emoji}</span>
                )}
              </div>
              <div
                style={{
                  fontFamily: DM,
                  fontSize: "var(--fs-xs)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.35rem",
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  fontFamily: DM,
                  fontSize: "0.78rem",
                  color: "var(--text)",
                  wordBreak: "break-all",
                  lineHeight: 1.4,
                }}
              >
                {c.value}
                {c.external && (
                  <span
                    style={{
                      marginLeft: "0.3em",
                      fontSize: "0.7em",
                      opacity: 0.5,
                    }}
                  >
                    ↗
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </ScrollStagger>

        <ScrollReveal direction="up" delay={0.4}>
          <div
            className="footer-row"
            style={{
              marginTop: "5rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div
              style={{
                fontFamily: CV,
                fontSize: "var(--fs-h3)",
                letterSpacing: "0.08em",
                color: "var(--gold)",
                fontWeight: 400,
              }}
            >
              Mark Louie Cosme
            </div>

            <div
              onClick={handleCopyClick}
              style={{
                fontFamily: DM,
                color: "var(--text-sub)",
                fontSize: "var(--fs-xs)",
                cursor: "default",
                userSelect: "none",
                transition: "color 0.2s",
              }}
            >
              © 2026 Mark Louie Cosme · All Rights Reserved
              {clicks > 0 && (
                <span
                  style={{
                    marginLeft: "0.5em",
                    fontSize: "0.55rem",
                    color: "var(--gold)",
                    opacity: 0.5,
                  }}
                >
                  {"·".repeat(clicks)}
                </span>
              )}
            </div>

            <div
              style={{
                fontFamily: DM,
                fontSize: "var(--fs-xs)",
                color: "var(--text-sub)",
                letterSpacing: "0.05em",
              }}
            >
              Porac, Pampanga, PH
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
