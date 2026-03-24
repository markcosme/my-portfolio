import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ScrollReveal } from "./scrollreveal";

const CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dfco0tldt";
const FOLDER = "ron-portfolio";
const CACHE_KEY = "cloudinary_ron-portfolio";

const COLORS = [
  "#1a6fa8",
  "#2a7a4e",
  "#d4420a",
  "#6c5aee",
  "#c9952a",
  "#a84a1a",
  "#7a2a4e",
  "#2a5a7a",
];

/* ─── Build correct Cloudinary URL from public_id ─── */
function buildUrl(publicId) {
  // public_id may or may not include folder prefix
  // Always build a full URL from scratch
  const cleanId = publicId.startsWith(FOLDER + "/")
    ? publicId
    : `${FOLDER}/${publicId}`;
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${cleanId}`;
}

/* ─── Fetch from Cloudinary (network-first, localStorage fallback) ───────────
   Uses tag-based list: /image/list/TAG.json
   Requires TWO things in Cloudinary dashboard:
   1. Settings → Security → "Resource list" must be UNCHECKED (allowed)
   2. Images must be uploaded with a tag (AdminPanel now adds tag automatically)
   New uploads will work immediately. Re-upload old images to add the tag.    */
async function fetchFromCloudinary() {
  // TAG-based list endpoint — images must have the tag "ron-portfolio"
  const url = `https://res.cloudinary.com/${CLOUD}/image/list/${FOLDER}.json`;
  const res = await fetch(url + "?_=" + Date.now());
  if (!res.ok) throw new Error(`Cloudinary list failed: ${res.status}`);
  const data = await res.json();
  return (data.resources || []).map((img) => {
    const pid = img.public_id.startsWith(FOLDER + "/")
      ? img.public_id
      : `${FOLDER}/${img.public_id}`;
    return {
      ...img,
      public_id: pid,
      secure_url: buildUrl(pid),
      created_at: img.created_at || img.uploaded_at || new Date().toISOString(),
      bytes: img.bytes || 0,
      width: img.width || 0,
      height: img.height || 0,
    };
  });
}

function saveCache(images) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(images));
  } catch {}
}
function readCache() {
  try {
    const c = localStorage.getItem(CACHE_KEY);
    return c ? JSON.parse(c) : [];
  } catch {
    return [];
  }
}

function getMeta(img) {
  let meta = img._meta || {};
  if (!Object.keys(meta).length) {
    try {
      const hit = readCache().find((c) => c.public_id === img.public_id);
      if (hit?._meta) meta = hit._meta;
    } catch {}
  }
  return meta;
}

function resourceToProject(img, idx) {
  const meta = getMeta(img);
  // Fix secure_url in case it came from cache without proper domain
  const secure_url =
    img.secure_url && img.secure_url.startsWith("http")
      ? img.secure_url
      : buildUrl(img.public_id);

  return {
    id: `up_${img.public_id}`,
    cat: meta.category || "Other",
    title: (() => {
      if (meta.title) return meta.title;
      const raw = img.public_id.split("/").pop().replace(/[-_]/g, " ");
      // Hide raw Cloudinary numeric IDs (e.g. "1000014176") — show nothing instead
      return /^\d+$/.test(raw.replace(/ /g, "")) ? "" : raw;
    })(),
    subtitle: meta.subtitle || "",
    desc: meta.desc || "",
    tags: Array.isArray(meta.tags)
      ? meta.tags
      : meta.tags
        ? String(meta.tags)
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    color: COLORS[idx % COLORS.length],
    image: secure_url,
    client: meta.client || "",
    public_id: img.public_id,
    created_at: img.created_at,
  };
}

/* ─── Group projects by title ─── */
function groupProjects(projects) {
  const map = new Map();
  projects.forEach((p) => {
    const key = p.title.trim().toLowerCase();
    if (!map.has(key)) {
      map.set(key, { ...p, images: [p.image] });
    } else {
      map.get(key).images.push(p.image);
    }
  });
  return Array.from(map.values());
}

/* ─── Lightbox ─── */
function Lightbox({ images, initialIndex = 0, title, onClose }) {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, images.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        background: "rgba(0,0,0,0.97)",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        gap: "1rem",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: 10,
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#fff",
          fontSize: "1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        ✕
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {current + 1} / {images.length}
        </div>
      )}

      {/* Main image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: "min(92vw,1100px)",
          maxHeight: "75vh",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 40px 120px rgba(0,0,0,0.9)",
        }}
      >
        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrent((c) => (c - 1 + images.length) % images.length);
              }}
              style={{
                position: "absolute",
                left: "0.6rem",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: "1.1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrent((c) => (c + 1) % images.length);
              }}
              style={{
                position: "absolute",
                right: "0.6rem",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff",
                fontSize: "1.1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ›
            </button>
          </>
        )}

        {/* Caption */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            padding: "2rem 1.5rem 1rem",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88), transparent)",
            color: "#fff",
            fontFamily: "'Coolvetica','DM Sans',sans-serif",
            fontSize: "1.1rem",
            letterSpacing: "0.08em",
          }}
        >
          {title}
          {images.length > 1 && (
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.65rem",
                opacity: 0.5,
                marginLeft: "0.8rem",
                letterSpacing: "0.12em",
              }}
            >
              ← → to navigate
            </span>
          )}
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              opacity: 0.4,
              marginTop: "0.2rem",
            }}
          >
            ESC OR CLICK OUTSIDE TO CLOSE
          </div>
        </div>

        <img
          src={images[current]}
          alt={title}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "75vh",
            objectFit: "contain",
            background: "#111",
          }}
        />
      </motion.div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            maxWidth: "min(92vw,1100px)",
            padding: "0.25rem",
            scrollbarWidth: "none",
          }}
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              onClick={() => setCurrent(i)}
              whileHover={{ scale: 1.06 }}
              style={{
                flexShrink: 0,
                width: 64,
                height: 48,
                borderRadius: "6px",
                overflow: "hidden",
                cursor: "pointer",
                border: `2px solid ${i === current ? "var(--gold, #c9952a)" : "rgba(255,255,255,0.12)"}`,
                opacity: i === current ? 1 : 0.55,
                transition: "opacity 0.2s, border-color 0.2s",
              }}
            >
              <img
                src={img}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─── Project Card — grouped hero + thumbnail strip ─── */
function ProjectCard({ p, i }) {
  const [lightbox, setLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [activeThumb, setActiveThumb] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  const hasMultiple = p.images && p.images.length > 1;
  const displayImage = (p.images && p.images[activeThumb]) || p.image;

  const openLightbox = (idx = 0) => {
    setLightboxIndex(idx);
    setLightbox(true);
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.65,
          delay: i * 0.05,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          border: `1px solid ${hovered ? p.color + "66" : "var(--border)"}`,
          background: "var(--surface)",
          boxShadow: hovered
            ? `0 20px 70px ${p.color}20`
            : "0 2px 16px rgba(0,0,0,0.18)",
          transition: "border-color 0.3s, box-shadow 0.3s",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Hero image ── */}
        <div
          onClick={() => openLightbox(activeThumb)}
          style={{
            position: "relative",
            aspectRatio: "16/10",
            background: "#1a1a1a",
            cursor: "pointer",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <AnimatePresence mode="crossfade">
            <motion.img
              key={displayImage}
              src={displayImage}
              alt={p.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                transform: hovered ? "scale(1.04)" : "scale(1)",
                transition: "transform 0.5s ease",
              }}
            />
          </AnimatePresence>

          {/* Hover overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#fff",
                padding: "0.5rem 1.1rem",
                border: "1px solid rgba(255,255,255,0.5)",
                borderRadius: "4px",
              }}
            >
              {hasMultiple ? `View All ${p.images.length} ↗` : "View Full ↗"}
            </div>
          </motion.div>

          {/* Category badge */}
          <div
            style={{
              position: "absolute",
              top: "0.75rem",
              left: "0.75rem",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#fff",
              background: p.color,
              padding: "0.2rem 0.65rem",
              borderRadius: "3px",
              fontWeight: 700,
            }}
          >
            {p.cat}
          </div>

          {/* Multi-image count badge */}
          {hasMultiple && (
            <div
              style={{
                position: "absolute",
                top: "0.75rem",
                right: "0.75rem",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.12em",
                color: "#fff",
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "0.2rem 0.6rem",
                borderRadius: "3px",
                fontWeight: 600,
              }}
            >
              ⊞ {p.images.length}
            </div>
          )}
        </div>

        {/* ── Thumbnail strip (only if multiple images) ── */}
        {hasMultiple && (
          <div
            style={{
              display: "flex",
              gap: "0.35rem",
              padding: "0.7rem 1rem 0",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {p.images.map((img, idx) => (
              <motion.div
                key={idx}
                onClick={() => {
                  setActiveThumb(idx);
                }}
                onDoubleClick={() => openLightbox(idx)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }}
                title={
                  idx === activeThumb
                    ? "Double-click to open"
                    : "Click to preview"
                }
                style={{
                  flexShrink: 0,
                  width: 52,
                  height: 40,
                  borderRadius: "5px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: `2px solid ${idx === activeThumb ? p.color : "var(--border)"}`,
                  opacity: idx === activeThumb ? 1 : 0.55,
                  transition: "opacity 0.2s, border-color 0.2s",
                }}
              >
                <img
                  src={img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </motion.div>
            ))}
            <motion.div
              onClick={() => openLightbox(activeThumb)}
              whileHover={{ scale: 1.05, borderColor: p.color }}
              style={{
                flexShrink: 0,
                width: 52,
                height: 40,
                borderRadius: "5px",
                border: "1px dashed var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-sub)",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
                transition: "border-color 0.2s, color 0.2s",
              }}
            >
              ↗
            </motion.div>
          </div>
        )}

        {/* ── Info ── */}
        <div
          style={{
            padding: "1rem 1.3rem 1.2rem",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
          }}
        >
          <div>
            {p.title && (
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(0.95rem,1.8vw,1.1rem)",
                  color: "var(--text)",
                  lineHeight: 1.25,
                  marginBottom: "0.2rem",
                }}
              >
                {p.title}
              </div>
            )}
            {p.subtitle && (
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.75rem",
                  color: "var(--text-sub)",
                  lineHeight: 1.4,
                }}
              >
                {p.subtitle}
              </div>
            )}
          </div>

          {p.desc && (
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.78rem",
                color: "var(--text-sub)",
                lineHeight: 1.75,
                margin: 0,
                flex: 1,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {p.desc}
            </p>
          )}

          {p.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                flexWrap: "wrap",
                marginTop: "0.2rem",
              }}
            >
              {p.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                    color: p.color,
                    background: p.color + "14",
                    border: `1px solid ${p.color}30`,
                    padding: "0.15rem 0.55rem",
                    borderRadius: "3px",
                  }}
                >
                  {tag}
                </span>
              ))}
              {p.tags.length > 4 && (
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.62rem",
                    color: "var(--text-sub)",
                    padding: "0.15rem 0.4rem",
                  }}
                >
                  +{p.tags.length - 4}
                </span>
              )}
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "0.6rem",
              borderTop: "1px solid var(--border)",
              marginTop: "auto",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.68rem",
                color: "var(--text-sub)",
              }}
            >
              {p.client || "Mark Louie Cosme"}
            </span>
            <motion.button
              onClick={() => openLightbox(0)}
              whileHover={{ color: p.color }}
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-sub)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "color 0.2s",
                padding: 0,
              }}
            >
              {hasMultiple ? `View All (${p.images.length}) ↗` : "View ↗"}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={p.images || [p.image]}
            initialIndex={lightboxIndex}
            title={p.title}
            onClose={() => setLightbox(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Main Section ─── */
export default function Projects() {
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Try Cloudinary network fetch first (visible to ALL users/devices)
      const resources = await fetchFromCloudinary();
      const sorted = [...resources].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );
      // Merge with localStorage metadata (_meta: title, desc, tags, etc.)
      const prevCache = readCache();
      const merged = sorted.map((img) => {
        const hit = prevCache.find((c) => c.public_id === img.public_id);
        return hit ? { ...img, _meta: hit._meta || {} } : img;
      });
      saveCache(merged);
      const flat = merged.map((img, idx) => resourceToProject(img, idx));
      setProjects(groupProjects(flat));
    } catch (err) {
      // Cloudinary list failed — fall back to localStorage cache
      console.warn("Cloudinary fetch failed, using cache:", err.message);
      const cached = readCache();
      if (cached.length > 0) {
        const sorted = [...cached].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at),
        );
        const flat = sorted.map((img, idx) => resourceToProject(img, idx));
        setProjects(groupProjects(flat));
      } else {
        setError(
          "No projects yet — upload images via the Admin Panel to get started.",
        );
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const sync = () => fetchProjects();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, [fetchProjects]);

  /* UI/UX always last */
  const sortUIUXLast = (arr) => [
    ...arr.filter((p) => p.cat !== "UI/UX"),
    ...arr.filter((p) => p.cat === "UI/UX"),
  ];

  const filtered = sortUIUXLast(
    active === "All" ? projects : projects.filter((p) => p.cat === active),
  );
  const dynamicCats = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.cat))),
  ];

  return (
    <section
      id="projects"
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
          top: "3rem",
          right: "2rem",
          fontFamily: "'Coolvetica','DM Sans',sans-serif",
          fontSize: "clamp(5rem,16vw,14rem)",
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
            style={{ fontFamily: "'DM Sans',sans-serif" }}
          >
            Selected Work
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
              gap: "1.2rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Coolvetica','DM Sans',sans-serif",
                fontSize: "clamp(2.5rem,5vw,4rem)",
                letterSpacing: "0.04em",
              }}
            >
              My Projects
            </h2>

            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {!loading &&
                dynamicCats.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActive(cat)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      padding: "0.4rem 1rem",
                      border: `1px solid ${active === cat ? "var(--gold)" : "var(--border)"}`,
                      background:
                        active === cat ? "var(--gold)" : "transparent",
                      color: active === cat ? "#000" : "var(--muted)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      borderRadius: "4px",
                      transition: "all 0.2s",
                      cursor: "pointer",
                    }}
                  >
                    {cat}
                  </motion.button>
                ))}
              <motion.button
                onClick={fetchProjects}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                title="Refresh"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--text-sub)",
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                ↻
              </motion.button>
            </div>
          </div>
        </ScrollReveal>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
              style={{
                width: 32,
                height: 32,
                margin: "0 auto 1rem",
                border: "2px solid var(--border)",
                borderTop: "2px solid var(--gold)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.82rem",
                color: "var(--text-sub)",
                letterSpacing: "0.1em",
              }}
            >
              Loading projects…
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              border: "1px solid var(--border)",
              borderRadius: "12px",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>⚠️</div>
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.85rem",
                color: "var(--text-sub)",
                marginBottom: "1.2rem",
              }}
            >
              {error}
            </div>
            <motion.button
              onClick={fetchProjects}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'DM Sans',sans-serif",
                padding: "0.65rem 1.5rem",
                background: "var(--gold)",
                color: "#0a0a08",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Try Again
            </motion.button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              border: "1px solid var(--border)",
              borderRadius: "12px",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>🖼</div>
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.9rem",
                color: "var(--text-sub)",
              }}
            >
              No projects yet — upload your first one via the Admin Panel.
            </div>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <motion.div
            layout
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "1.4rem",
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} p={p} i={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
