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
            color: "rgba(255,255,255,0.03)",
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
            Aspiring full-stack developer <span style={{ color: "var(--gold)" }}>& technical specialist.</span>
          </h2>
        </ScrollReveal>

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
                I am an Information Technology professional and aspiring Full-Stack
                Web Developer with a foundation in web development, database
                management, programming, and software development. My project work
                includes building a web-based automated scheduling system with
                conflict detection and validation.
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
                I work with PHP, JavaScript, SQL, HTML5, CSS, and Bootstrap, with
                familiarity in React, Node.js, Express.js, and Angular. My production
                and marketing internships also strengthened my attention to detail,
                adaptability, communication, and commitment to continuous learning.
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
                The qualities behind
                <br />
                the work.
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
                  "Fast Learner",
                  "Quickly adapts to new tools, frameworks, and workflows — always ready to tackle unfamiliar challenges.",
                ],
                [
                  "Attention to Detail",
                  "Checks project requirements, design details, and production files carefully to deliver accurate, consistent results.",
                ],
                [
                  "Effective Communication",
                  "Coordinates with clients and production staff to clarify requirements and keep work moving toward deadlines.",
                ],
                [
                  "Time Management",
                  "Organizes tasks around project requirements and deadlines while balancing quality with efficient delivery.",
                ],
              ].map(([title, desc]) => (
                <motion.div
                  key={title}
                  variants={staggerItem}
                  whileHover={{
                    borderColor: "var(--gold)",
                    y: -4,
                    boxShadow: "0 8px 28px rgba(255,255,255,0.1)",
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
            {/* Work / Internship Experience */}
            <ScrollReveal direction="up" delay={0.2}>
              <motion.div
                whileHover={{
                  borderColor: "var(--gold)",
                  boxShadow: "0 0 36px rgba(255,255,255,0.08)",
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
                      "Intern",
                      "Skills Unlimited Digital Printing Services",
                      "Feb 2026 – Jul 2026",
                      "Prepared digital production materials and technical files to project specifications, including color settings, bleed, and layout. Coordinated with clients and production staff, conducted quality checks, and helped improve production workflows.",
                    ],
                    [
                      "Intern — Digital Marketing & Social Media",
                      "P&S Clothing",
                      "Jan 2022 – May 2022",
                      "Supported digital marketing and social media activities through content preparation, product photography, and basic graphic design. Edited images in Adobe Photoshop and managed inventory and sales data with Microsoft Excel and other digital tools.",
                    ],
                  ].map(([role, co, period, description]) => (
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
                      <div
                        style={{
                          fontFamily: DM,
                          color: "var(--text-sub)",
                          fontSize: "var(--fs-xs)",
                          lineHeight: 1.7,
                          marginTop: "0.4rem",
                        }}
                      >
                        {description}
                      </div>
                    </motion.div>
                  ))}
                </ScrollStagger>

                {/* Capstone */}
                <div
                  style={{
                    marginTop: "1.2rem",
                    paddingTop: "1.2rem",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: DM,
                      fontWeight: 700,
                      fontSize: "var(--fs-sm)",
                      color: "var(--text)",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Capstone Project
                  </div>
                  <div
                    style={{
                      fontFamily: DM,
                      color: "var(--gold)",
                      fontSize: "var(--fs-xs)",
                      fontWeight: 600,
                      marginBottom: "0.15rem",
                    }}
                  >
                    SchedSync — Smart, Seamless, Conflict-Free Timetables
                  </div>
                  <div
                    style={{
                      fontFamily: DM,
                      color: "var(--text-sub)",
                      fontSize: "var(--fs-xs)",
                      letterSpacing: "0.04em",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Mar 2025 – Nov 2025 · Pampanga State University – Porac
                  </div>
                  <div
                    style={{
                      fontFamily: DM,
                      color: "var(--text-sub)",
                      fontSize: "var(--fs-xs)",
                      lineHeight: 1.7,
                    }}
                  >
                    Developed a responsive web-based scheduler using PHP, HTML,
                    CSS, Bootstrap, and JavaScript. Implemented validation and
                    conflict detection to prevent overlapping subject, room, and
                    faculty assignments.
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>

            {/* Education */}
            <ScrollReveal direction="up" delay={0.35}>
              <motion.div
                whileHover={{
                  borderColor: "var(--gold)",
                  boxShadow: "0 0 36px rgba(255,255,255,0.08)",
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
                      "Bachelor of Science in Information Technology",
                      "Pampanga State University",
                      "August 2022 – September 2026",
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
