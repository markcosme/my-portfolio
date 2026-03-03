import { motion } from "framer-motion";
import {
  ScrollReveal,
  ScrollStagger,
  staggerItem,
  RevealLine,
  Parallax,
} from "./scrollreveal";

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "8rem 3rem",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Parallax bg word */}
      <Parallax
        speed={0.15}
        style={{
          position: "absolute",
          top: "2rem",
          left: "1rem",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(6rem, 20vw, 18rem)",
            color: "#ffffff04",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          ABOUT
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
        {/* Section label */}
        <ScrollReveal direction="split" delay={0}>
          <div className="section-label">About Me</div>
        </ScrollReveal>

        {/* ── Two-column grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* ═══ LEFT — Simplicity headline + Education below ═══ */}
          <div>
            {/* Headline */}
            <div style={{ marginBottom: "2.5rem" }}>
              <RevealLine delay={0.1}>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    lineHeight: 1.05,
                    letterSpacing: "0.04em",
                  }}
                >
                  Simplicity.{" "}
                  <span style={{ color: "var(--gold)" }}>Pure.</span>
                </h2>
              </RevealLine>
              <RevealLine delay={0.22}>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    lineHeight: 1.05,
                    letterSpacing: "0.04em",
                    color: "transparent",
                    WebkitTextStroke: "1px var(--white)",
                  }}
                >
                  Precise. Purposeful.
                </h2>
              </RevealLine>
            </div>

            {/* Education — directly below headline */}
            <ScrollReveal direction="right" delay={0.3}>
              <motion.div
                whileHover={{
                  borderColor: "var(--gold)",
                  boxShadow: "0 0 40px rgba(201,149,42,0.08)",
                }}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "2rem",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "1.6rem",
                    color: "var(--gold)",
                    marginBottom: "1rem",
                  }}
                >
                  Education
                </div>
                <ScrollStagger delay={0} stagger={0.12}>
                  {[
                    [
                      "Masters in Information Technology",
                      "Systems Plus College Foundation",
                      "Jun 2021 – Dec 2022",
                    ],
                    [
                      "Bachelor of Information Technology",
                      "Holy Angel University",
                      "Jun 2008 – Apr 2013",
                    ],
                  ].map(([deg, school, yr]) => (
                    <motion.div
                      key={deg}
                      variants={staggerItem}
                      whileHover={{ x: 5 }}
                      style={{ marginBottom: "1rem", cursor: "none" }}
                    >
                      <div style={{ fontWeight: 500, fontSize: "0.85rem" }}>
                        {deg}
                      </div>
                      <div
                        style={{ color: "var(--gold)", fontSize: "0.75rem" }}
                      >
                        {school}
                      </div>
                      <div
                        style={{ color: "var(--muted)", fontSize: "0.72rem" }}
                      >
                        {yr}
                      </div>
                    </motion.div>
                  ))}
                </ScrollStagger>
              </motion.div>
            </ScrollReveal>
          </div>

          {/* ═══ RIGHT — Promise headline + cards + Work Exp below ═══ */}
          <div>
            {/* "Big or small projects" promise headline */}
            <ScrollReveal direction="up" delay={0.15}>
              <h3
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                  letterSpacing: "0.03em",
                  lineHeight: 1.1,
                  color: "var(--white)",
                  marginBottom: "1.8rem",
                }}
              >
                Big or small projects,
                <br />
                Two things I always promise.{" "}
                <span style={{ fontSize: "0.75em" }}>🙏</span>
              </h3>
            </ScrollReveal>

            {/* Promise cards — below the headline */}
            <ScrollStagger
              delay={0.25}
              stagger={0.14}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.2rem",
                marginBottom: "2.5rem",
              }}
            >
              {[
                [
                  "Designs you'll love",
                  "I love creating new things — making sure you're happy with the results, because great teamwork always brings ideas to life.",
                ],
                [
                  "Stress-free relationship",
                  "What drives me is finding solutions and staying focused on the goal. No stress, no drama — just results that help your business move forward.",
                ],
              ].map(([title, desc]) => (
                <motion.div
                  key={title}
                  variants={staggerItem}
                  whileHover={{
                    borderColor: "var(--gold)",
                    y: -5,
                    boxShadow: "0 8px 30px rgba(201,149,42,0.1)",
                  }}
                  style={{
                    padding: "1.5rem",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    background: "var(--card-bg)",
                    transition: "all 0.3s",
                  }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                      width: 28,
                      height: 2,
                      background: "var(--gold)",
                      marginBottom: "0.8rem",
                      transformOrigin: "left",
                    }}
                  />
                  <div
                    style={{
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.8rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {desc}
                  </div>
                </motion.div>
              ))}
            </ScrollStagger>

            {/* Work Experience — below promise cards */}
            <ScrollReveal direction="flip" delay={0.4}>
              <motion.div
                whileHover={{
                  borderColor: "var(--gold)",
                  boxShadow: "0 0 40px rgba(201,149,42,0.08)",
                }}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "2.5rem",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: "2.2rem",
                    color: "var(--gold)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Work Experience
                </div>
                <ScrollStagger delay={0} stagger={0.09}>
                  {[
                    [
                      "Graphic Designer / Project Manager",
                      "The Brandit Agency",
                      "Nov 2024 – Oct 2025",
                    ],
                    [
                      "Program Coordinator / MIS / IT Instructor",
                      "Pampanga State University",
                      "Jun 2015 – Oct 2024",
                    ],
                    [
                      "Customer Service Rep",
                      "T-Mobile Startek Philippines",
                      "Sep 2014 – Jun 2015",
                    ],
                    [
                      "Technical Support Rep",
                      "Sutherland Global Services",
                      "May 2013 – Sep 2014",
                    ],
                  ].map(([role, company, period]) => (
                    <motion.div
                      key={role}
                      variants={staggerItem}
                      whileHover={{ x: 8 }}
                      style={{
                        borderLeft: "2px solid var(--border)",
                        paddingLeft: "1rem",
                        marginBottom: "1.2rem",
                        transition: "border-color 0.3s",
                        cursor: "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderLeftColor = "var(--gold)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderLeftColor =
                          "var(--border)")
                      }
                    >
                      <div
                        style={{
                          fontWeight: 500,
                          fontSize: "0.85rem",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {role}
                      </div>
                      <div
                        style={{
                          color: "var(--gold)",
                          fontSize: "0.75rem",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {company}
                      </div>
                      <div
                        style={{
                          color: "var(--muted)",
                          fontSize: "0.72rem",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {period}
                      </div>
                    </motion.div>
                  ))}
                </ScrollStagger>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
