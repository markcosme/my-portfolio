import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal, ScrollStagger, staggerItem } from "./scrollreveal";

const DM = "'DM Sans',sans-serif";
const CV = "'Coolvetica','DM Sans',sans-serif";

const contacts = [
  {
    label: "Phone",
    value: "+63 951 977 6912",
    icon: "📞",
    href: "tel:+639519776912",
  },
  {
    label: "Email",
    value: "ronaldramirezmedina@gmail.com",
    icon: "✉",
    href: "mailto:ronaldramirezmedina@gmail.com",
  },
  { label: "Location", value: "Porac, Pampanga, PH", icon: "📍", href: null },
];

export default function Contact({ onAdminOpen }) {
  const [clicks, setClicks] = useState(0);

  /* Triple-click on copyright text reveals admin */
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
      {/* Glow */}
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
            Big or small projects — two things I always promise: designs you'll
            love, and a stress-free relationship.
          </p>
        </ScrollReveal>

        <ScrollStagger
          delay={0.15}
          stagger={0.1}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
            gap: "1.1rem",
            marginBottom: "3.5rem",
          }}
          className="contact-grid"
        >
          {contacts.map((c) => (
            <motion.a
              key={c.label}
              href={c.href || undefined}
              variants={staggerItem}
              whileHover={{
                y: -5,
                borderColor: "var(--gold)",
                boxShadow: "0 12px 36px rgba(201,149,42,0.12)",
              }}
              transition={{ duration: 0.25 }}
              data-cursor-hover
              style={{
                display: "block",
                padding: "1.8rem 1.4rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                textDecoration: "none",
                transition:
                  "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.7rem" }}>
                {c.icon}
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
                  fontSize: "var(--fs-sm)",
                  color: "var(--text)",
                  wordBreak: "break-all",
                }}
              >
                {c.value}
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
              Ron Medina
            </div>

            {/* Triple-click this to open Admin Panel */}
            <div
              onClick={handleCopyClick}
              title=""
              style={{
                fontFamily: DM,
                color: "var(--text-sub)",
                fontSize: "var(--fs-xs)",
                cursor: "default",
                userSelect: "none",
                transition: "color 0.2s",
              }}
            >
              © 2026 Ron Medina · All Rights Reserved
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
