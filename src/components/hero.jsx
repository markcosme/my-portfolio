import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CountUp, Magnetic } from "./scrollreveal";
import ronPhoto from "../assets/ron-profile.png";

const roles = ["Developer.", "Strategist."];

export default function Hero() {
  const wordRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = wordRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      el.style.filter = "blur(6px)";
      setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % roles.length;
        el.textContent = roles[indexRef.current];
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        el.style.filter = "blur(0px)";
      }, 380);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home" style={{ background: "#0a0a08", color: "#f5f0e8" }}>
      {/* ══════════════════════════════════════════
          SECTION 1 — EDITORIAL HERO BANNER
      ══════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0",
        }}
      >
        {/* ── Dark-to-black background ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, #111008 0%, #0a0a08 50%, #080806 100%)",
            zIndex: 0,
          }}
        />

        {/* Shape 1 — large diagonal slash */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            right: "-5%",
            top: "-10%",
            width: "55%",
            height: "130%",
            background:
              "linear-gradient(135deg, rgba(201,149,42,0.22) 0%, rgba(180,130,30,0.12) 30%, transparent 65%)",
            transform: "skewX(-12deg)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Shape 2 — secondary gold layer */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            right: "5%",
            top: "5%",
            width: "40%",
            height: "110%",
            background:
              "linear-gradient(140deg, rgba(201,149,42,0.15) 0%, rgba(160,110,20,0.08) 40%, transparent 70%)",
            transform: "skewX(-16deg)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Shape 3 — thin accent slash */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            right: "28%",
            top: 0,
            width: "2px",
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent, rgba(201,149,42,0.6) 30%, rgba(201,149,42,0.3) 70%, transparent)",
            transform: "skewX(-12deg)",
            transformOrigin: "top",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Shape 4 — warm glow */}
        <motion.div
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            right: "0%",
            top: "0%",
            width: "50%",
            height: "100%",
            background:
              "radial-gradient(ellipse at 80% 40%, rgba(201,149,42,0.1) 0%, transparent 60%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── Content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "0 5rem",
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            textAlign: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(5rem, 16vw, 15rem)",
                lineHeight: 0.9,
                letterSpacing: "0.01em",
                color: "#f5f0e8",
                margin: "0 0 1.2rem 0",
              }}
            >
              Simplicity.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)",
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.45)",
              margin: 0,
            }}
          >
            Pure.&nbsp;&nbsp;Precise.&nbsp;&nbsp;Purposeful.
          </motion.p>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.9rem",
            fontSize: "0.55rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "'DM Sans', sans-serif",
            zIndex: 1,
          }}
        >
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 1,
              height: 34,
              background:
                "linear-gradient(to bottom, var(--gold), transparent)",
            }}
          />
          Scroll
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — "I'm Ron Medina" INTRO
      ══════════════════════════════════════════ */}
      <section
        style={{
          padding: "7rem 5rem",
          background: "#f5f0e8",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            gap: "5rem",
          }}
        >
          {/* Circular photo with gold warm bg */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "relative",
              width: "clamp(200px, 22vw, 300px)",
              height: "clamp(200px, 22vw, 300px)",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 40% 35%, #e8a820, #c47d10 60%, #8a5a08)",
                boxShadow: "0 20px 60px rgba(201,149,42,0.35)",
              }}
            />
            <img
              src={ronPhoto}
              alt="Ron Medina"
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                height: "108%",
                width: "auto",
                objectFit: "contain",
                objectPosition: "bottom",
                borderRadius: "50% 50% 0 0",
              }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                letterSpacing: "0.04em",
                color: "#0a0a08",
                margin: "0 0 1.2rem 0",
                lineHeight: 1,
              }}
            >
              I'm Ron Medina
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                color: "rgba(10,10,8,0.55)",
                lineHeight: 1.85,
                maxWidth: 500,
                margin: "0 0 2.5rem 0",
              }}
            >
              I'm a creative and technically skilled professional with a passion
              for blending design, technology, and strategy. I bring together
              artistic vision and analytical thinking to create purposeful,
              efficient, and visually engaging work. I believe simplicity and
              clarity drive the best results — whether in design, systems, or
              collaboration.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Magnetic strength={0.2}>
                <motion.a
                  href="#projects"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 40px rgba(201,149,42,0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.85rem 2rem",
                    background: "#c9952a",
                    color: "#0a0a08",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                    cursor: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  View My Work ↗
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <motion.a
                  href="#contact"
                  whileHover={{ borderColor: "#0a0a08", color: "#0a0a08" }}
                  style={{
                    display: "inline-block",
                    padding: "0.85rem 2rem",
                    border: "1px solid rgba(10,10,8,0.2)",
                    color: "rgba(10,10,8,0.45)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                    cursor: "none",
                    transition: "all 0.3s",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Get In Touch
                </motion.a>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            maxWidth: 1100,
            margin: "5rem auto 0",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(10,10,8,0.1)",
            display: "flex",
            gap: "4rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { num: "10", suffix: "+", label: "Years Experience" },
            { num: "50", suffix: "+", label: "Projects Completed" },
            { num: "3", suffix: "", label: "Core Roles" },
          ].map(({ num, suffix, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "3.5rem",
                  color: "#c9952a",
                  lineHeight: 1,
                  letterSpacing: "0.03em",
                }}
              >
                <CountUp value={num} suffix={suffix} delay={0.5} />
              </div>
              <div
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(10,10,8,0.4)",
                  marginTop: "0.3rem",
                  fontFamily: "'DM Sans', sans-serif",
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
