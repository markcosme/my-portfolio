import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ScrollReveal } from "./scrollreveal";

const CV = "'Coolvetica','DM Sans',sans-serif";
const DM = "'DM Sans',sans-serif";
const EXP_KEY = "ron-portfolio-experience";

/* Default data — matches AdminPanel DEFAULT_JOBS schema:
   { id, role, company, type, period, duration, location, desc, skills[], current } */
const DEFAULT_JOBS = [
  {
    id: "exp1",
    role: "Senior Graphic Designer",
    company: "Skills Unlimited Digital Printing Services",
    type: "Freelance",
    period: "Dec 2025 – Present",
    duration: "4 mos",
    location: "Philippines · Remote",
    desc: "Led end-to-end design production for large- and small-format digital printing projects, including banners, stickers, DTF, sublimation, signage, packaging, and marketing collaterals. Prepared press-ready files with accurate color profiles, bleed, trapping, and imposition while managing pre-press workflows to ensure production efficiency and minimal material waste. Coordinated with production teams and clients to deliver on-time, production-feasible designs, supervised print quality control to maintain high standards, and mentored junior designers on workflow and print best practices.",
    skills: [
      "Corporate Branding",
      "Branding & Identity",
      "Print Production",
      "Pre-press",
      "Color Management",
      "DTF/Sublimation",
      "Project Coordination",
    ],
    current: true,
  },
  {
    id: "exp2",
    role: "Graphic Designer",
    company: "The Brandit Agency",
    type: "Full-time",
    period: "Nov 2024 – Oct 2025",
    duration: "1 yr",
    location: "Florida, United States · Remote",
    desc: "Design impactful brand identities and marketing materials that clearly convey the client's message and maintain consistency across all platforms. Collaborate with clients and teams to meet project goals and deadlines while staying current with design trends to ensure high-quality, creative outcomes.",
    skills: [
      "Corporate Branding",
      "Branding & Identity",
      "Brand Strategy",
      "Marketing Materials",
      "Client Collaboration",
      "Design Trends",
    ],
    current: false,
  },
  {
    id: "exp3",
    role: "Web Designer",
    company: "3LC Corporation",
    type: "Freelance",
    period: "Jun 2020 – Nov 2024",
    duration: "4 yrs 6 mos",
    location: "Remote",
    desc: "Designed and maintained conversion-focused e-commerce websites for a drop shipping business, ensuring strong user experience, mobile responsiveness, and brand consistency. Managed product listings, pricing updates, and inventory synchronization while developing customized landing pages and promotional campaigns. Integrated payment gateways, order tracking systems, and third-party applications to streamline checkout and fulfillment processes. Monitored website analytics, applied basic SEO strategies, and optimized site performance to improve traffic, customer engagement, and overall conversion rates.",
    skills: [
      "Corporate Branding",
      "Graphic Design",
      "E-commerce",
      "UI/UX",
      "SEO",
      "Landing Pages",
    ],
    current: false,
  },
  {
    id: "exp4",
    role: "Graphic Designer",
    company: "Skills Unlimited Digital Printing Services",
    type: "Full-time",
    period: "Jan 2015 – May 2020",
    duration: "5 yrs 5 mos",
    location: "Philippines · On-site",
    desc: "Designed and prepared print-ready artwork for banners, tarpaulins, flyers, stickers, and apparel (DTF/sublimation), ensuring high-quality and production-ready outputs. Converted client-provided files into accurate production formats and supported pre-press processes, including file checking, resizing, imposition, and RIP software preparation. Coordinated with senior designers and production staff to maintain print accuracy and on-time delivery, while assisting walk-in clients with layout revisions and quick-turnaround print requirements.",
    skills: [
      "Corporate Branding",
      "Branding & Identity",
      "Print Design",
      "Pre-press",
      "Apparel Design",
      "Client Service",
    ],
    current: false,
  },
  {
    id: "exp5",
    role: "Information Technology Manager",
    company: "Holy Trinity School",
    type: "Full-time",
    period: "Jun 2013 – Oct 2014",
    duration: "1 yr 5 mos",
    location: "Philippines · On-site",
    desc: "Oversaw the school's IT infrastructure, including networks, servers, computer labs, and internet systems, while administering the Management Information System (MIS) for enrollment, grading, attendance, billing, and academic records. Led digital transformation initiatives by streamlining workflows, automating processes, and integrating technology across academic and administrative departments. Provided technical support and troubleshooting for faculty, staff, and students, implemented data security and backup protocols, and developed analytical reporting tools to support data-driven decision-making and optimize institutional performance.",
    skills: [
      "Technology Management",
      "Project Management",
      "IT Infrastructure",
      "MIS Administration",
      "Digital Transformation",
    ],
    current: false,
  },
];

function loadExperiences() {
  try {
    const s = localStorage.getItem(EXP_KEY);
    return s ? JSON.parse(s) : DEFAULT_JOBS;
  } catch {
    return DEFAULT_JOBS;
  }
}

const typeColor = {
  "Full-time": "#1a6fa8",
  Freelance: "#c9952a",
  "Part-time": "#2a7a4e",
  Contract: "#6c5aee",
  Internship: "#d4420a",
  "Self-employed": "#a84a1a",
};

/* ── Single card ── */
function ExpCard({ job, index, isLast }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const color = typeColor[job.type] || "#c9952a";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        display: "grid",
        gridTemplateColumns: "48px 1fr",
        gap: "0 1.5rem",
      }}
    >
      {/* Timeline column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{
            delay: index * 0.07 + 0.2,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            flexShrink: 0,
            marginTop: "0.38rem",
            background: job.current ? color : "var(--surface)",
            border: `2px solid ${color}`,
            boxShadow: job.current ? `0 0 16px ${color}aa` : "none",
            position: "relative",
            zIndex: 1,
          }}
        />
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{
              delay: index * 0.07 + 0.35,
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              flex: 1,
              width: 1,
              marginTop: "0.3rem",
              background:
                "linear-gradient(to bottom, var(--border) 80%, transparent)",
              transformOrigin: "top",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : "2.8rem" }}>
        {/* Clickable header */}
        <div
          onClick={() => setExpanded((e) => !e)}
          style={{ cursor: "pointer" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: DM,
                    fontWeight: 800,
                    fontSize: "clamp(0.95rem,2vw,1.1rem)",
                    color: "var(--text)",
                    lineHeight: 1.2,
                  }}
                >
                  {job.role}
                </span>
                {job.current && (
                  <span
                    style={{
                      fontFamily: DM,
                      fontSize: "0.55rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      background: "var(--gold)",
                      color: "#0a0a08",
                      padding: "0.15rem 0.6rem",
                      borderRadius: "99px",
                      fontWeight: 700,
                    }}
                  >
                    Current
                  </span>
                )}
              </div>
              <div
                style={{
                  fontFamily: DM,
                  fontSize: "0.82rem",
                  color: color,
                  fontWeight: 600,
                  marginTop: "0.2rem",
                }}
              >
                {job.company}
                <span style={{ color: "var(--text-sub)", fontWeight: 400 }}>
                  {" "}
                  · {job.type}
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: DM,
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  color: job.current ? color : "var(--text-sub)",
                  fontWeight: job.current ? 700 : 400,
                }}
              >
                {job.period}
              </div>
              <div
                style={{
                  fontFamily: DM,
                  fontSize: "0.65rem",
                  color: "var(--text-sub)",
                  marginTop: "0.1rem",
                }}
              >
                {job.duration}
                {job.location ? ` · ${job.location}` : ""}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              marginTop: "0.55rem",
              fontFamily: DM,
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: color,
              opacity: 0.8,
            }}
          >
            {expanded ? "Show less ↑" : "View details ↓"}
          </div>
        </div>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="body"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  paddingTop: "0.9rem",
                  borderTop: `1px solid ${color}22`,
                  marginTop: "0.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: DM,
                    fontSize: "0.82rem",
                    color: "var(--text-sub)",
                    lineHeight: 1.85,
                    marginBottom: "1rem",
                  }}
                >
                  {job.desc}
                </p>
                {job.skills?.length > 0 && (
                  <div
                    style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
                  >
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontFamily: DM,
                          fontSize: "0.62rem",
                          letterSpacing: "0.08em",
                          color: color,
                          background: color + "12",
                          border: `1px solid ${color}30`,
                          padding: "0.2rem 0.65rem",
                          borderRadius: "2px",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Main section ── */
export default function Experience() {
  const [jobs, setJobs] = useState(() => loadExperiences());

  /* live sync when AdminPanel saves */
  useEffect(() => {
    const sync = () => setJobs(loadExperiences());
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <section
      id="experience"
      style={{
        padding: "var(--pad-section)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          top: "3rem",
          right: "2rem",
          fontFamily: CV,
          fontSize: "clamp(5rem,16vw,14rem)",
          color: "#ffffff03",
          letterSpacing: "0.05em",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        EXP
      </div>

      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <ScrollReveal direction="up" delay={0}>
          <div className="section-label" style={{ fontFamily: DM }}>
            Career
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "3.5rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2
              style={{
                fontFamily: CV,
                fontSize: "clamp(2.5rem,5vw,4rem)",
                letterSpacing: "0.04em",
              }}
            >
              Experience
            </h2>

            {/* Stats pill */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                alignItems: "center",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "0.7rem 1.4rem",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: CV,
                    fontSize: "1.6rem",
                    color: "var(--gold)",
                    lineHeight: 1,
                  }}
                >
                  10+
                </div>
                <div
                  style={{
                    fontFamily: DM,
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-sub)",
                    marginTop: "0.2rem",
                  }}
                >
                  Years
                </div>
              </div>
              <div
                style={{ width: 1, height: 32, background: "var(--border)" }}
              />
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: CV,
                    fontSize: "1.6rem",
                    color: "var(--gold)",
                    lineHeight: 1,
                  }}
                >
                  {jobs.length}
                </div>
                <div
                  style={{
                    fontFamily: DM,
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-sub)",
                    marginTop: "0.2rem",
                  }}
                >
                  Roles
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {jobs.map((job, i) => (
            <ExpCard
              key={job.id}
              job={job}
              index={i}
              isLast={i === jobs.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
