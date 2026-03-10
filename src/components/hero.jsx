import { motion } from "framer-motion";
import { CountUp, Magnetic } from "./scrollreveal";
import ronPhoto from "../assets/Ron-Profile.png";

const CV = "'Coolvetica','DM Sans',sans-serif";
const DM = "'DM Sans',sans-serif";

export default function Hero() {
  return (
    <div id="home">
      {/* ══ SECTION 1 — EDITORIAL BANNER ══ */}
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "var(--hero-s1-bg, #08080a)",
          transition: "background 0.4s ease",
        }}
      >
        {/* Breathing glow */}
        <motion.div
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(201,149,42,0.1), transparent 70%)",
          }}
        />

        {/* Edge vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, var(--hero-s1-vignette, rgba(3,3,3,0.8)) 100%)",
          }}
        />

        {/* Gold shimmer line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.0, duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1px",
            transformOrigin: "center",
            pointerEvents: "none",
            background:
              "linear-gradient(to right, transparent 0%, rgba(201,149,42,0.12) 25%, rgba(201,149,42,0.28) 50%, rgba(201,149,42,0.12) 75%, transparent 100%)",
          }}
        />

        {/* Grain texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "300px 300px",
          }}
        />

        {/* Text content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 clamp(1.5rem,5vw,5rem)",
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* Portfolio label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontFamily: DM,
              fontSize: "var(--fs-xs)",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--hero-s1-muted, rgba(245,240,232,0.22))",
              marginBottom: "2rem",
            }}
          >
          </motion.div>

          {/* SIMPLICITY */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              style={{
                fontFamily: CV,
                fontSize: "var(--fs-hero)",
                lineHeight: 0.9,
                letterSpacing: "0.01em",
                color: "var(--hero-s1-text, #f5f0e8)",
                margin: "0 0 1.1rem",
                fontWeight: 400,
                transition: "color 0.4s ease",
              }}
            >
              Simplicity
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            style={{
              fontFamily: DM,
              fontSize: "clamp(0.75rem,1.4vw,1rem)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--hero-s1-sub, rgba(245,240,232,0.4))",
              margin: 0,
              transition: "color 0.4s ease",
            }}
          >
            Pure. &nbsp;&nbsp; Precise.&nbsp;&nbsp; Purposeful.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{
            position: "absolute",
            bottom: "2.2rem",
            left: "clamp(1.5rem,5vw,5rem)",
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            fontSize: "var(--fs-xs)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--hero-s1-muted, rgba(255,255,255,0.18))",
            fontFamily: DM,
            zIndex: 2,
          }}
        >
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 1,
              height: 30,
              background:
                "linear-gradient(to bottom, var(--gold), transparent)",
            }}
          />
          Scroll
        </motion.div>

        {/* Coordinates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{
            position: "absolute",
            bottom: "2.2rem",
            right: "clamp(1.5rem,5vw,5rem)",
            fontSize: "var(--fs-xs)",
            letterSpacing: "0.18em",
            color: "var(--hero-s1-muted, rgba(245,240,232,0.12))",
            fontFamily: DM,
            zIndex: 2,
          }}
        >
        </motion.div>
      </section>

      {/* ══ SECTION 2 — INTRO ══ */}
      <section
        style={{
          padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,5vw,5rem)",
          background: "var(--bg2)",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid var(--border)",
        }}
      >
        {/* Watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "-2rem",
            right: "-1rem",
            fontFamily: CV,
            fontSize: "clamp(7rem,20vw,18rem)",
            color: "rgba(201,149,42,0.04)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "0.02em",
          }}
        >
          RM
        </div>

        <div
          className="hero-intro"
          style={{
            maxWidth: "var(--max-w)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            gap: "clamp(2rem,5vw,5rem)",
          }}
        >
          {/* Photo */}
          <motion.div
            className="hero-ron"
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              width: "clamp(220px,26vw,340px)",
              height: "clamp(220px,26vw,340px)",
              flexShrink: 0,
              overflow: "hidden",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "12px",
                background:
                  "radial-gradient(circle at 40% 35%, #e8a820, #c47d10 60%, #8a5a08)",
                boxShadow: "0 24px 70px rgba(201,149,42,0.4)",
              }}
            />
            <img
              src={ronPhoto}
              alt="Ron Medina"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 30%",
                borderRadius: "12px",
              }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                fontFamily: DM,
                fontSize: "var(--fs-xs)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--text-sub)",
                marginBottom: "0.7rem",
              }}
            >
              — Based in Pampanga, PH
            </div>
            <h2
              style={{
                fontFamily: CV,
                fontSize: "var(--fs-h1)",
                letterSpacing: "0.04em",
                color: "var(--text)",
                margin: "0 0 1.1rem",
                lineHeight: 1.05,
                fontWeight: 400,
              }}
            >
              I'm Ron Medina
            </h2>
            <p
              style={{
                fontFamily: DM,
                fontSize: "var(--fs-body)",
                color: "var(--text-sub)",
                lineHeight: 1.85,
                maxWidth: 480,
                margin: "0 0 2.2rem",
              }}
            >
              A multi-disciplinary creative — crafting purposeful brand
              identities, clean digital experiences, and the systems that run
              them. 10+ years turning ideas into work that matters.
            </p>
            <div style={{ display: "flex", gap: "0.9rem", flexWrap: "wrap" }}>
              <Magnetic strength={0.2}>
                <motion.a
                  href="#projects"
                  data-cursor-hover
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 36px rgba(201,149,42,0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.85rem 2rem",
                    background: "var(--gold)",
                    color: "#0a0a08",
                    fontWeight: 700,
                    fontSize: "var(--fs-xs)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                    fontFamily: DM,
                    transition: "box-shadow 0.3s",
                  }}
                >
                  View My Work ↗
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <motion.a
                  href="#contact"
                  data-cursor-hover
                  whileHover={{
                    borderColor: "var(--text)",
                    color: "var(--text)",
                  }}
                  style={{
                    display: "inline-block",
                    padding: "0.85rem 2rem",
                    border: "1px solid var(--border)",
                    color: "var(--text-sub)",
                    fontSize: "var(--fs-xs)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                    transition: "all 0.3s",
                    fontFamily: DM,
                  }}
                >
                  Get In Touch
                </motion.a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            maxWidth: "var(--max-w)",
            margin: "4.5rem auto 0",
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            gap: "4rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "10", suf: "+", label: "Years Experience" },
            { num: "50", suf: "+", label: "Projects Completed" },
            { num: "3", suf: "", label: "Core Roles" },
          ].map(({ num, suf, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: CV,
                  fontSize: "clamp(2.5rem,5vw,3.8rem)",
                  color: "var(--gold)",
                  lineHeight: 1,
                  letterSpacing: "0.03em",
                  fontWeight: 400,
                }}
              >
                <CountUp value={num} suffix={suf} delay={0.5} />
              </div>
              <div
                style={{
                  fontFamily: DM,
                  fontSize: "var(--fs-xs)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-sub)",
                  marginTop: "0.3rem",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
