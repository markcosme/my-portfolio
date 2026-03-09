import { motion } from "framer-motion";
import {
  ScrollReveal,
  ScrollStagger,
  staggerItem,
  Parallax,
} from "./scrollreveal";

const CV = "'Coolvetica','DM Sans',sans-serif";
const DM = "'DM Sans',sans-serif";

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "var(--pad-section)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Bg word */}
      <Parallax
        speed={0.15}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontFamily: CV,
            fontSize: "clamp(5rem,18vw,16rem)",
            color: "rgba(201,149,42,0.03)",
            letterSpacing: "0.05em",
            lineHeight: 1,
          }}
        >
          ABOUT
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
        {/* Header */}
        <ScrollReveal direction="up" delay={0}>
          <div className="section-label">About Me</div>
          <h2
            style={{
              fontFamily: CV,
              fontSize: "var(--fs-h1)",
              letterSpacing: "0.04em",
              marginBottom: "3.5rem",
              fontWeight: 400,
              color: "var(--text)",
            }}
          >
            Who I <span style={{ color: "var(--gold)" }}>Am.</span>
          </h2>
        </ScrollReveal>

        {/* Grid */}
        <div
          className="about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem,5vw,5rem)",
            alignItems: "start",
          }}
        >
          {/* ── LEFT ── */}
          <div>
            <ScrollReveal direction="up" delay={0.15}>
              <p
                style={{
                  fontFamily: DM,
                  fontSize: "var(--fs-body)",
                  color: "var(--text-sub)",
                  lineHeight: 1.85,
                  marginBottom: "1.3rem",
                }}
              >
                I'm a creative and technically skilled professional with a
                passion for blending design, technology, and strategy — bringing
                artistic vision and analytical thinking to purposeful, efficient
                work.
              </p>
              <p
                style={{
                  fontFamily: DM,
                  fontSize: "var(--fs-body)",
                  color: "var(--text-sub)",
                  lineHeight: 1.85,
                  marginBottom: "2.2rem",
                }}
              >
                I believe simplicity and clarity drive the best results —
                whether in design, systems, or collaboration.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.35}>
              <h3
                style={{
                  fontFamily: CV,
                  fontSize: "var(--fs-h3)",
                  letterSpacing: "0.03em",
                  lineHeight: 1.25,
                  color: "var(--text)",
                  marginBottom: "1.3rem",
                  fontWeight: 400,
                }}
              >
                Big or small projects,
                <br />
                Two things I always promise.{" "}
                <span style={{ fontSize: "0.8em" }}>🙏</span>
              </h3>
            </ScrollReveal>

            <ScrollStagger
              delay={0.4}
              stagger={0.13}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
              className="promise-grid"
            >
              {[
                [
                  "Designs you'll love",
                  "Making sure you're happy with the results — because great teamwork always brings ideas to life.",
                ],
                [
                  "Stress-free relationship",
                  "No stress, no drama — just focused solutions and results that help your business move forward.",
                ],
              ].map(([title, desc]) => (
                <motion.div
                  key={title}
                  variants={staggerItem}
                  whileHover={{
                    borderColor: "var(--gold)",
                    y: -4,
                    boxShadow: "0 8px 28px rgba(201,149,42,0.1)",
                  }}
                  style={{
                    padding: "1.4rem",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    background: "var(--surface)",
                    transition: "all 0.3s",
                  }}
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                      width: 24,
                      height: 2,
                      background: "var(--gold)",
                      marginBottom: "0.8rem",
                      transformOrigin: "left",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: DM,
                      fontWeight: 600,
                      fontSize: "var(--fs-sm)",
                      marginBottom: "0.45rem",
                      color: "var(--text)",
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      fontFamily: DM,
                      fontSize: "var(--fs-sm)",
                      color: "var(--text-sub)",
                      lineHeight: 1.7,
                    }}
                  >
                    {desc}
                  </div>
                </motion.div>
              ))}
            </ScrollStagger>
          </div>

          {/* ── RIGHT ── */}
          <div>
            {/* Work Experience */}
            <ScrollReveal direction="up" delay={0.2}>
              <motion.div
                whileHover={{
                  borderColor: "var(--gold)",
                  boxShadow: "0 0 36px rgba(201,149,42,0.08)",
                }}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "2.2rem",
                  marginBottom: "1.8rem",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    fontFamily: CV,
                    fontSize: "var(--fs-h2)",
                    color: "var(--gold)",
                    marginBottom: "1.4rem",
                    fontWeight: 400,
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
                  ].map(([role, co, period]) => (
                    <motion.div
                      key={role}
                      variants={staggerItem}
                      whileHover={{ x: 6 }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderLeftColor = "var(--gold)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderLeftColor =
                          "var(--border)")
                      }
                      style={{
                        borderLeft: "2px solid var(--border)",
                        paddingLeft: "1rem",
                        marginBottom: "1.1rem",
                        transition: "border-color 0.3s",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: DM,
                          fontWeight: 600,
                          fontSize: "var(--fs-sm)",
                          marginBottom: "0.15rem",
                          color: "var(--text)",
                        }}
                      >
                        {role}
                      </div>
                      <div
                        style={{
                          fontFamily: DM,
                          color: "var(--gold)",
                          fontSize: "var(--fs-xs)",
                        }}
                      >
                        {co}
                      </div>
                      <div
                        style={{
                          fontFamily: DM,
                          color: "var(--text-sub)",
                          fontSize: "var(--fs-xs)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {period}
                      </div>
                    </motion.div>
                  ))}
                </ScrollStagger>
              </motion.div>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal direction="up" delay={0.35}>
              <motion.div
                whileHover={{
                  borderColor: "var(--gold)",
                  boxShadow: "0 0 36px rgba(201,149,42,0.08)",
                }}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "2rem",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    fontFamily: CV,
                    fontSize: "var(--fs-h3)",
                    color: "var(--gold)",
                    marginBottom: "1rem",
                    fontWeight: 400,
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
                      style={{ marginBottom: "1rem" }}
                    >
                      <div
                        style={{
                          fontFamily: DM,
                          fontWeight: 600,
                          fontSize: "var(--fs-sm)",
                          color: "var(--text)",
                        }}
                      >
                        {deg}
                      </div>
                      <div
                        style={{
                          fontFamily: DM,
                          color: "var(--gold)",
                          fontSize: "var(--fs-xs)",
                        }}
                      >
                        {school}
                      </div>
                      <div
                        style={{
                          fontFamily: DM,
                          color: "var(--text-sub)",
                          fontSize: "var(--fs-xs)",
                        }}
                      >
                        {yr}
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
