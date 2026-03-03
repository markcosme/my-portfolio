import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import svpBrandImg from "../assets/svp-brand-guidelines.png";
import svpPrintImg from "../assets/svp-brand-presentations.png";
import socialPostersImg from "../assets/social-media-posters.png";
import uiuxImg from "../assets/uiux-designs.png";
import { ScrollReveal } from "./scrollreveal";

const categories = ["All", "UI/UX", "Branding", "Social Media"];

const projects = [
  {
    id: 4,
    cat: "Branding",
    title: "SVP Brand Guidelines",
    subtitle: "Logo / Typography / Swatches",
    desc: "Full brand identity for Southern Veterinary Partners — logo usage rules, typography system, primary/accent color swatches, digital combinations, and print-ready files.",
    tags: ["Brand", "Typography", "Identity", "Print"],
    color: "#1a6fa8",
    image: svpBrandImg,
    featured: true,
    documentStyle: true,
    enterEffect: "flipY",
  },
  {
    id: 5,
    cat: "Branding",
    title: "Brand Presentations & Print Ready Files",
    subtitle: "Merchandise / Apparel / Print Collateral",
    desc: "T-shirts, sticker sheets, brochures, hats, koozie wraps, banners, and apparel mockups — all print-ready files for brand campaigns.",
    tags: ["Print", "Merch", "Apparel", "Mockup", "Collateral"],
    color: "#2a7a4e",
    image: svpPrintImg,
    documentStyle: true,
    client: "Mission+ · SVP",
    enterEffect: "riseUp",
  },
  {
    id: 6,
    cat: "Social Media",
    title: "Social Media Posters",
    subtitle: "Black Friday · Porac · Consumer Week · Aero · Travel · Repair",
    desc: "High-impact social media posters spanning product ads, tourism campaigns, event promotions, personal branding, and lifestyle photography composites.",
    tags: [
      "Photoshop",
      "Illustrator",
      "Social Ads",
      "Typography",
      "Compositing",
    ],
    color: "#d4420a",
    image: socialPostersImg,
    documentStyle: true,
    client: "Multiple Clients · Freelance Projects",
    enterEffect: "zoomFade",
  },
  {
    id: 1,
    cat: "UI/UX",
    title: "UI/UX Designs",
    subtitle: "Mobile Auth · Dashboard · Sign In / Create Account",
    desc: "A collection of mobile-first UI/UX screens — Login, Sign Up, Forgot Password, light/dark dashboard navigation, and multi-step account creation with OTP verification. Designed in Figma with clean, accessible layouts.",
    tags: ["Figma", "Mobile UI", "Dashboard", "Auth Flow", "UX"],
    color: "#6c5aee",
    image: uiuxImg,
    documentStyle: true,
    client: "Figma · Personal & Client Projects",
    enterEffect: "slideLeft",
  },
];

/* ─────────────────── Lightbox ─────────────────── */
function Lightbox({ img, title, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(0,0,0,0.94)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backdropFilter: "blur(16px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.82, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "94vw",
          maxHeight: "92vh",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 60px 160px rgba(0,0,0,0.9)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          data-cursor-hover
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 10,
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.75)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ✕
        </motion.button>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            padding: "2.5rem 1.8rem 1.4rem",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92), transparent)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.3rem",
            letterSpacing: "0.1em",
            color: "#fff",
          }}
        >
          {title}
          <div
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "'DM Sans', sans-serif",
              marginTop: "0.2rem",
            }}
          >
            CLICK OUTSIDE TO CLOSE
          </div>
        </div>
        <img
          src={img}
          alt={title}
          style={{
            display: "block",
            maxWidth: "94vw",
            maxHeight: "90vh",
            objectFit: "contain",
            imageRendering: "-webkit-optimize-contrast",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── Per-card entrance effects ─────────────────── */
const enterEffects = {
  slideLeft: {
    hidden: {
      opacity: 0,
      x: -110,
      rotateZ: -2.5,
      filter: "blur(10px)",
      scale: 0.96,
    },
    show: { opacity: 1, x: 0, rotateZ: 0, filter: "blur(0px)", scale: 1 },
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
  flipY: {
    hidden: { opacity: 0, rotateY: 180, scale: 0.86, filter: "blur(14px)" },
    show: { opacity: 1, rotateY: 360, scale: 1, filter: "blur(0px)" },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
  riseUp: {
    hidden: {
      opacity: 0,
      y: 90,
      rotateX: 26,
      filter: "blur(8px)",
      scale: 0.94,
    },
    show: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", scale: 1 },
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
  },
  zoomFade: {
    hidden: { opacity: 0, scale: 0.68, filter: "blur(22px) brightness(1.5)" },
    show: { opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" },
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─────────────────── Entrance Wrapper ─────────────────── */
function EnterReveal({ children, effect = "flipY", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const fx = enterEffects[effect] || enterEffects.flipY;

  return (
    <motion.div
      ref={ref}
      initial={fx.hidden}
      animate={inView ? fx.show : fx.hidden}
      transition={{ ...fx.transition, delay }}
      style={{ perspective: 1400, gridColumn: "1 / -1" }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────── Document-Style Card ─────────────────── */
function DocumentCard({ p, i }) {
  const [lightbox, setLightbox] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <EnterReveal effect={p.enterEffect || "flipY"} delay={i * 0.06}>
        <motion.div
          layout
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            border: `1px solid ${hovered ? p.color + "55" : "#2a2518"}`,
            background: "var(--card-bg)",
            boxShadow: hovered
              ? `0 20px 80px ${p.color}22`
              : "0 4px 30px rgba(0,0,0,0.3)",
            transition: "border-color 0.35s, box-shadow 0.35s",
          }}
        >
          {/* Document header bar */}
          <div
            style={{
              background: "#f8f8f6",
              padding: "1.4rem 2rem 1.2rem",
              borderBottom: "1px solid #e8e4dc",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  color: "#1a1a1a",
                  letterSpacing: "-0.01em",
                }}
              >
                {p.title}
                {p.subtitle && (
                  <>
                    <span style={{ color: "#999", fontWeight: 400 }}> — </span>
                    <span
                      style={{
                        fontWeight: 400,
                        color: "#555",
                        fontSize: "0.9em",
                      }}
                    >
                      {p.subtitle}
                    </span>
                  </>
                )}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  color: "#888",
                  marginTop: "0.2rem",
                  letterSpacing: "0.08em",
                }}
              >
                {p.client || "Client Project"}
              </div>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: p.color,
                  background: p.color + "12",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "2px",
                  border: `1px solid ${p.color}30`,
                }}
              >
                {p.cat}
              </span>
              <motion.button
                onClick={() => setLightbox(true)}
                whileHover={{ background: p.color, color: "#fff" }}
                data-cursor-hover
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: p.color,
                  background: "transparent",
                  border: `1px solid ${p.color}55`,
                  padding: "0.3rem 1rem",
                  borderRadius: "2px",
                  transition: "all 0.25s",
                }}
              >
                View Full ↗
              </motion.button>
            </div>
          </div>

          {/* Integrated image + info layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 280px",
              minHeight: 320,
            }}
          >
            {/* Image panel */}
            <div
              onClick={() => setLightbox(true)}
              data-cursor-hover
              style={{
                background: "#ededeb",
                padding: "1.5rem 2rem 0",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ y: hovered ? -6 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "#fff",
                  borderRadius: "8px 8px 0 0",
                  overflow: "hidden",
                  boxShadow:
                    "0 -4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    display: "block",
                    width: "100%",
                    maxHeight:
                      p.cat === "Social Media"
                        ? "420px"
                        : p.cat === "UI/UX"
                          ? "380px"
                          : "300px",
                    objectFit: "cover",
                    objectPosition: "top center",
                    background: "#fff",
                    imageRendering: "-webkit-optimize-contrast",
                  }}
                />
              </motion.div>
            </div>

            {/* Info sidebar */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0.82 }}
              transition={{ duration: 0.35 }}
              style={{
                borderLeft: "1px solid #e8e4dc",
                background: "#fafaf8",
                padding: "2rem 1.6rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.2rem",
              }}
            >
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1 + 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  width: 2,
                  height: 40,
                  background: `linear-gradient(to bottom, ${p.color}, transparent)`,
                  transformOrigin: "top",
                  marginBottom: "0.5rem",
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: p.color,
                    marginBottom: "0.5rem",
                  }}
                >
                  About
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.78rem",
                    color: "#555",
                    lineHeight: 1.75,
                  }}
                >
                  {p.desc.slice(0, 100)}…
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#aaa",
                    marginBottom: "0.2rem",
                  }}
                >
                  Tools
                </div>
                {p.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.08em",
                      color: "#666",
                      border: "1px solid #e0ddd8",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "2px",
                      background: "#fff",
                      width: "fit-content",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer row */}
          <div
            style={{
              background: "#f8f8f6",
              padding: "0.85rem 2rem",
              borderTop: "1px solid #e8e4dc",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {p.tags.slice(3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  color: "#888",
                  border: "1px solid #ddd",
                  padding: "0.2rem 0.65rem",
                  borderRadius: "2px",
                  background: "#fff",
                }}
              >
                {tag}
              </span>
            ))}
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                marginLeft: "auto",
                fontSize: "0.68rem",
                color: p.color,
                letterSpacing: "0.1em",
                opacity: 0.7,
              }}
            >
              {p.client || "Client Project"}
            </div>
          </div>
        </motion.div>
      </EnterReveal>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            img={p.image}
            title={p.title}
            onClose={() => setLightbox(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────── Standard Card ─────────────────── */
function ProjectCard({ p, i }) {
  const [lightbox, setLightbox] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (p.documentStyle) return <DocumentCard p={p} i={i} />;

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          duration: 0.45,
          delay: i * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -7 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "var(--card-bg)",
          border: `1px solid ${hovered ? p.color + "88" : "var(--border)"}`,
          borderRadius: "8px",
          overflow: "hidden",
          transition: "border-color 0.3s, box-shadow 0.3s",
          boxShadow: hovered ? `0 16px 60px ${p.color}28` : "none",
        }}
      >
        <div
          style={{
            height: 3,
            background: `linear-gradient(to right, ${p.color}, ${p.color}88)`,
          }}
        />
        <div style={{ padding: "1.8rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: p.color + "22",
                border: `1px solid ${p.color}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
              }}
            >
              {p.cat === "UI/UX" ? "🖥" : p.cat === "Branding" ? "✦" : "📱"}
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: p.color,
                background: p.color + "18",
                padding: "0.25rem 0.7rem",
                borderRadius: "2px",
              }}
            >
              {p.cat}
            </span>
          </div>
          <h3
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
              fontSize: "1.05rem",
              marginBottom: "0.65rem",
            }}
          >
            {p.title}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "var(--muted)",
              fontSize: "0.83rem",
              lineHeight: 1.8,
              marginBottom: "1.3rem",
            }}
          >
            {p.desc}
          </p>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {p.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                  border: "1px solid var(--border)",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "2px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            img={p.image}
            title={p.title}
            onClose={() => setLightbox(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────── Main Section ─────────────────── */
export default function Projects() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <section
      id="projects"
      style={{
        padding: "8rem 3rem",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "3rem",
          right: "2rem",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(5rem, 16vw, 14rem)",
          color: "#ffffff03",
          letterSpacing: "0.05em",
          userSelect: "none",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        WORK
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <ScrollReveal direction="up" delay={0}>
          <div
            className="section-label"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Selected Work
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "3rem",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "0.04em",
              }}
            >
              My Projects
            </h2>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActive(cat)}
                  whileTap={{ scale: 0.96 }}
                  data-cursor-hover
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    padding: "0.45rem 1.1rem",
                    border: `1px solid ${active === cat ? "var(--gold)" : "var(--border)"}`,
                    background: active === cat ? "var(--gold)" : "transparent",
                    color: active === cat ? "#000" : "var(--muted)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                    transition: "all 0.25s",
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} p={p} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
