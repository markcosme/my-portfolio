import { motion } from "framer-motion";
import { ScrollReveal, ScrollStagger, staggerItem } from "./scrollreveal";

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

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "8rem 3rem 6rem",
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
          width: 600,
          height: 600,
          background: "radial-gradient(circle, #c9952a0d, transparent 65%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 900,
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
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              letterSpacing: "0.04em",
              lineHeight: 1,
              marginBottom: "1.5rem",
            }}
          >
            Let's Work
            <br />
            <span style={{ color: "var(--gold)" }}>Together.</span>
          </h2>
          <p
            style={{
              color: "var(--muted)",
              maxWidth: 500,
              margin: "0 auto 4rem",
              lineHeight: 1.8,
              fontSize: "0.95rem",
            }}
          >
            Big or small projects — two things I always promise: designs you'll
            love, and a stress-free relationship.
          </p>
        </ScrollReveal>

        {/* Contact cards */}
        <ScrollStagger
          delay={0.15}
          stagger={0.12}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.2rem",
            marginBottom: "4rem",
          }}
        >
          {contacts.map((c) => (
            <motion.a
              key={c.label}
              href={c.href || undefined}
              variants={staggerItem}
              whileHover={{
                y: -6,
                borderColor: "var(--gold)",
                boxShadow: "0 12px 40px rgba(201,149,42,0.12)",
              }}
              transition={{ duration: 0.25 }}
              style={{
                display: "block",
                padding: "2rem 1.5rem",
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                textDecoration: "none",
                cursor: c.href ? "none" : "default",
                transition:
                  "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
              }}
            >
              <div style={{ fontSize: "1.6rem", marginBottom: "0.8rem" }}>
                {c.icon}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "0.4rem",
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "var(--white)",
                  wordBreak: "break-all",
                }}
              >
                {c.value}
              </div>
            </motion.a>
          ))}
        </ScrollStagger>

        {/* Footer */}
        <ScrollReveal direction="up" delay={0.4}>
          <div
            style={{
              marginTop: "6rem",
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
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "1.5rem",
                letterSpacing: "0.1em",
                color: "var(--gold)",
              }}
            >
              Ron Medina
            </div>
            <div style={{ color: "var(--muted)", fontSize: "0.75rem" }}>
              © 2026 Ron Medina · All Rights Reserved
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
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
