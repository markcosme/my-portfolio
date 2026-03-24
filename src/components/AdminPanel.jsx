import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CV = "'Coolvetica','DM Sans',sans-serif";
const DM = "'DM Sans',sans-serif";

const CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dfco0tldt";
const APIKEY = process.env.REACT_APP_CLOUDINARY_API_KEY || "586869122654753";
const SECRET =
  process.env.REACT_APP_CLOUDINARY_API_SECRET || "5DittUP40fYW4ypEL3tMZLJU5wU";
const PRESET =
  process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "ron_portfolio_unsigned";
const FOLDER = "ron-portfolio";

/* ── Admin credentials (override via .env, then restart dev server) ── */
const ADMIN_USER = process.env.REACT_APP_ADMIN_USERNAME || "marklouie";
const ADMIN_PASS = process.env.REACT_APP_ADMIN_PASSWORD || "marklouie2026";

/* ══════════════════════════════════════════
   EXPERIENCE STORAGE KEY + DEFAULTS
══════════════════════════════════════════ */
const EXP_KEY = "ron-portfolio-experience";

const DEFAULT_JOBS = [
  {
    id: "exp1",
    role: "Intern — Digital Marketing & Graphic Design",
    company: "P&S Clothing",
    type: "Internship",
    period: "Jan 2022 – Feb 2022",
    duration: "2 mos",
    location: "Philippines",
    desc: "Assisted in digital marketing and social media management including posting updates, product photos, and basic graphic design. Edited images and created visual content using Adobe Photoshop. Managed inventory and sales data using Microsoft Excel and other digital tools.",
    skills: [
      "Adobe Photoshop",
      "Social Media Management",
      "Graphic Design",
      "Microsoft Excel",
      "Digital Marketing",
      "Content Creation",
    ],
    current: false,
  },
  {
    id: "exp2",
    role: "Capstone Developer — SchedSync",
    company: "Pampanga State University Porac",
    type: "Academic Project",
    period: "Mar 2025 – Nov 2025",
    duration: "9 mos",
    location: "Porac, Pampanga, PH",
    desc: "Developed SchedSync — a web-based automated scheduling system generating smart, seamless, and conflict-free class timetables. Built using PHP, HTML, CSS, Bootstrap, and JavaScript. Implemented conflict detection and validation to prevent overlapping subjects, rooms, and faculty assignments.",
    skills: [
      "PHP",
      "HTML/CSS",
      "Bootstrap",
      "JavaScript",
      "Database Design",
      "UI/UX",
      "Algorithm Design",
    ],
    current: true,
  },
];

function loadExperience() {
  try {
    const s = localStorage.getItem(EXP_KEY);
    return s ? JSON.parse(s) : DEFAULT_JOBS;
  } catch {
    return DEFAULT_JOBS;
  }
}

/* ══════════════════════════════════════════
   CLOUDINARY UTILS
══════════════════════════════════════════ */
async function sha1(str) {
  const buf = await crypto.subtle.digest(
    "SHA-1",
    new TextEncoder().encode(str),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/* Build correct URL from public_id — always include cloud and full path */
function buildUrl(publicId) {
  const cleanId = publicId.startsWith(FOLDER + "/")
    ? publicId
    : `${FOLDER}/${publicId}`;
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${cleanId}`;
}

async function uploadToCloudinary(file, folder) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", PRESET);
  fd.append("folder", folder);
  fd.append("tags", folder); // tag with folder name so /image/list/TAG.json works
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
    { method: "POST", body: fd },
  );
  if (!res.ok) {
    const errBody = await res.text();
    let msg = errBody;
    try {
      msg = JSON.parse(errBody)?.error?.message || errBody;
    } catch {}
    console.error("Cloudinary upload error:", msg);
    throw new Error(msg);
  }
  const data = await res.json();

  // Normalize: ensure public_id has folder prefix, fix secure_url
  const pid = data.public_id.startsWith(folder + "/")
    ? data.public_id
    : `${folder}/${data.public_id}`;

  return {
    ...data,
    public_id: pid,
    secure_url: buildUrl(pid),
  };
}

async function deleteFromCloudinary(publicId) {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = await sha1(
    `public_id=${publicId}&timestamp=${timestamp}${SECRET}`,
  );
  const fd = new FormData();
  fd.append("public_id", publicId);
  fd.append("api_key", APIKEY);
  fd.append("timestamp", timestamp);
  fd.append("signature", signature);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/image/destroy`,
    { method: "POST", body: fd },
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ── Image cache (localStorage) ── */
const CACHE_KEY = "cloudinary_ron-portfolio";
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

function fetchCloudinaryImages() {
  // Normalize cached items so URLs are always correct
  return readCache().map((img) => {
    const pid = img.public_id.startsWith(FOLDER + "/")
      ? img.public_id
      : `${FOLDER}/${img.public_id}`;
    return {
      ...img,
      public_id: pid,
      secure_url: buildUrl(pid),
    };
  });
}

/* ── Shared input style ── */
const inp = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "var(--bg)",
  border: "1px solid var(--border)",
  borderRadius: "6px",
  color: "var(--text)",
  fontFamily: DM,
  fontSize: "0.85rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

/* ══════════════════════════════════════════
   LOGIN FORM
══════════════════════════════════════════ */
function LoginForm({ onLogin }) {
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);
  const handle = (e) => {
    e.preventDefault();
    if (user === ADMIN_USER && pw === ADMIN_PASS) {
      onLogin();
    } else {
      setErr("Incorrect username or password.");
      setTimeout(() => setErr(""), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        maxWidth: 400,
        margin: "0 auto",
        padding: "3rem 2rem",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "1px solid var(--gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.2rem",
          fontSize: "1.4rem",
        }}
      >
        🔐
      </div>
      <div
        style={{
          fontFamily: CV,
          fontSize: "2rem",
          color: "var(--gold)",
          marginBottom: "0.3rem",
        }}
      >
        Admin Access
      </div>
      <div
        style={{
          fontFamily: DM,
          fontSize: "0.82rem",
          color: "var(--text-sub)",
          marginBottom: "2rem",
        }}
      >
        Sign in to manage your portfolio
      </div>
      <form
        onSubmit={handle}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.9rem",
          textAlign: "left",
        }}
      >
        {[
          ["Username", "text", user, setUser, "username"],
          [
            "Password",
            show ? "text" : "password",
            pw,
            setPw,
            "current-password",
          ],
        ].map(([label, type, val, setter, ac], i) => (
          <div key={label}>
            <label
              style={{
                display: "block",
                fontFamily: DM,
                fontSize: "0.62rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--text-sub)",
                marginBottom: "0.35rem",
              }}
            >
              {label}
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={type}
                value={val}
                autoComplete={ac}
                onChange={(e) => setter(e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
                style={{
                  ...inp,
                  paddingRight: i === 1 ? "2.8rem" : "1rem",
                  borderColor: err ? "#e55" : "var(--border)",
                }}
                onFocus={(e) =>
                  !err && (e.target.style.borderColor = "var(--gold)")
                }
                onBlur={(e) =>
                  !err && (e.target.style.borderColor = "var(--border)")
                }
              />
              {i === 1 && (
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--text-sub)",
                    fontSize: "1rem",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {show ? "🙈" : "👁"}
                </button>
              )}
            </div>
          </div>
        ))}
        <AnimatePresence>
          {err && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: DM,
                fontSize: "0.75rem",
                color: "#e55",
                background: "rgba(229,85,85,0.08)",
                border: "1px solid rgba(229,85,85,0.2)",
                borderRadius: "5px",
                padding: "0.5rem 0.75rem",
              }}
            >
              {err}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: "0.3rem",
            padding: "0.9rem",
            background: "var(--gold)",
            color: "#0a0a08",
            border: "none",
            borderRadius: "6px",
            fontFamily: DM,
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Sign In
        </motion.button>
      </form>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   IMAGE CARD (Projects tab)
══════════════════════════════════════════ */
function ImageCard({ img, onDelete }) {
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteFromCloudinary(img.public_id);
      onDelete(img.public_id);
    } catch (e) {
      alert("Delete failed: " + e.message);
      setDeleting(false);
    }
  };

  const copyURL = () => {
    navigator.clipboard.writeText(img.secure_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const name = img.public_id.split("/").pop().replace(/_/g, " ");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      style={{
        border: "1px solid var(--border)",
        borderRadius: "10px",
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          position: "relative",
          paddingBottom: "65%",
          background: "#111",
        }}
      >
        <img
          src={img.secure_url}
          alt={name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div style={{ padding: "0.85rem 1rem" }}>
        <div
          style={{
            fontFamily: DM,
            fontSize: "0.75rem",
            color: "var(--text)",
            fontWeight: 600,
            marginBottom: "0.2rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontFamily: DM,
            fontSize: "0.6rem",
            color: "var(--text-sub)",
            marginBottom: "0.75rem",
          }}
        >
          {img.width}×{img.height} · {Math.round(img.bytes / 1024)} KB
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <motion.button
            onClick={copyURL}
            whileHover={{ borderColor: "var(--gold)", color: "var(--gold)" }}
            style={{
              flex: 1,
              padding: "0.4rem 0",
              background: "transparent",
              border: `1px solid ${copied ? "var(--gold)" : "var(--border)"}`,
              borderRadius: "4px",
              color: copied ? "var(--gold)" : "var(--text-sub)",
              fontFamily: DM,
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {copied ? "✓ Copied!" : "Copy URL"}
          </motion.button>
          {!confirm ? (
            <motion.button
              onClick={() => setConfirm(true)}
              whileHover={{ borderColor: "#e55", color: "#e55" }}
              style={{
                padding: "0.4rem 0.8rem",
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text-sub)",
                fontFamily: DM,
                fontSize: "0.6rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              🗑
            </motion.button>
          ) : (
            <motion.button
              onClick={handleDelete}
              disabled={deleting}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              style={{
                padding: "0.4rem 0.8rem",
                background: "#e55",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                fontFamily: DM,
                fontWeight: 700,
                fontSize: "0.6rem",
                cursor: deleting ? "not-allowed" : "pointer",
                opacity: deleting ? 0.6 : 1,
              }}
            >
              {deleting ? "..." : "Confirm"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   UPLOAD ZONE (Projects tab)
══════════════════════════════════════════ */
function UploadZone({ onUploaded, onError }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [queue, setQueue] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({});
  const CATS = [
    "Branding",
    "UI/UX",
    "Social Media",
    "Print",
    "Photography",
    "Other",
  ];

  const addFiles = (fileList) => {
    const items = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        file: f,
        preview: URL.createObjectURL(f),
        title: "",
        subtitle: "",
        client: "",
        desc: "",
        category: "Branding",
        tags: "",
      }));
    setQueue((prev) => [...prev, ...items]);
  };

  const updateField = (i, field, val) =>
    setQueue((prev) =>
      prev.map((item, idx) => (idx === i ? { ...item, [field]: val } : item)),
    );
  const removeItem = (i) =>
    setQueue((prev) => prev.filter((_, idx) => idx !== i));

  const uploadAll = async () => {
    if (!queue.length) return;
    setUploading(true);
    const results = [];
    for (let i = 0; i < queue.length; i++) {
      setProgress((p) => ({ ...p, [i]: "uploading" }));
      try {
        const res = await uploadToCloudinary(queue[i].file, FOLDER);
        // res.public_id is already normalized with folder prefix from uploadToCloudinary
        results.push({
          ...res,
          _meta: {
            title: queue[i].title || queue[i].file.name.replace(/\.[^.]+$/, ""),
            subtitle: queue[i].subtitle,
            client: queue[i].client,
            desc: queue[i].desc,
            category: queue[i].category,
            tags: queue[i].tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          },
        });
        setProgress((p) => ({ ...p, [i]: "done" }));
      } catch (uploadErr) {
        const errMsg = uploadErr?.message || "Upload failed";
        console.error("Cloudinary upload error:", errMsg);
        setProgress((p) => ({ ...p, [i]: "error" }));
        if (onError) onError(errMsg);
      }
    }
    setUploading(false);
    setQueue([]);
    setProgress({});
    onUploaded(results);
  };

  const statusColor = (s) =>
    s === "done"
      ? "#4caf50"
      : s === "error"
        ? "#e55"
        : s === "uploading"
          ? "var(--gold)"
          : "var(--text-sub)";
  const statusLabel = (s) =>
    s === "done"
      ? "✓ Uploaded"
      : s === "error"
        ? "✕ Failed"
        : s === "uploading"
          ? "Uploading…"
          : "Ready";

  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => !uploading && inputRef.current?.click()}
        animate={{ borderColor: dragging ? "var(--gold)" : "var(--border)" }}
        style={{
          border: "2px dashed var(--border)",
          borderRadius: "10px",
          padding: "2rem",
          textAlign: "center",
          cursor: uploading ? "not-allowed" : "pointer",
          background: dragging ? "rgba(201,149,42,0.04)" : "transparent",
          transition: "background 0.3s",
          marginBottom: queue.length ? "1.5rem" : 0,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => addFiles(e.target.files)}
        />
        <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>📁</div>
        <div
          style={{
            fontFamily: DM,
            fontSize: "0.9rem",
            color: "var(--text)",
            fontWeight: 600,
          }}
        >
          {queue.length
            ? "Drop more images or click to add"
            : "Drop images here or click to browse"}
        </div>
        <div
          style={{
            fontFamily: DM,
            fontSize: "0.75rem",
            color: "var(--text-sub)",
            marginTop: "0.3rem",
          }}
        >
          PNG, JPG, WEBP — uploads to{" "}
          <span style={{ color: "var(--gold)" }}>ron-portfolio</span> on
          Cloudinary
        </div>
      </motion.div>

      <AnimatePresence>
        {queue.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            style={{
              border: "1px solid var(--border)",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "1rem",
              background: "var(--surface)",
            }}
          >
            {/* File header row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr auto",
                gap: "1rem",
                alignItems: "center",
                padding: "0.9rem 1rem",
                borderBottom: "1px solid var(--border)",
                background: "var(--bg)",
              }}
            >
              <img
                src={item.preview}
                alt=""
                style={{
                  width: 80,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: DM,
                    fontSize: "0.8rem",
                    color: "var(--text)",
                    fontWeight: 600,
                    marginBottom: "0.1rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.file.name}
                </div>
                <div
                  style={{
                    fontFamily: DM,
                    fontSize: "0.65rem",
                    color: statusColor(progress[i]),
                  }}
                >
                  {Math.round(item.file.size / 1024)} KB ·{" "}
                  {statusLabel(progress[i])}
                </div>
              </div>
              {!uploading && (
                <button
                  onClick={() => removeItem(i)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-sub)",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    padding: "0.2rem 0.4rem",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
            {/* Fields */}
            <div
              style={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 160px",
                  gap: "0.75rem",
                }}
              >
                {[
                  ["Project Title *", "text", "e.g. Brand Guidelines", "title"],
                  ["", "select", "", "category"],
                ].map(([label, type, ph, field], fi) => (
                  <div key={fi}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: DM,
                        fontSize: "0.65rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--text-sub)",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {label || "Category"}
                    </label>
                    {type === "select" ? (
                      <select
                        value={item.category}
                        disabled={uploading}
                        onChange={(e) =>
                          updateField(i, "category", e.target.value)
                        }
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--gold)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "var(--border)")
                        }
                        style={{ ...inp, cursor: "pointer" }}
                      >
                        {CATS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        placeholder={ph}
                        value={item.title}
                        disabled={uploading}
                        onChange={(e) =>
                          updateField(i, "title", e.target.value)
                        }
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--gold)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "var(--border)")
                        }
                        style={inp}
                      />
                    )}
                  </div>
                ))}
              </div>
              {[
                [
                  "Subtitle / Type",
                  "text",
                  "e.g. Logo · Typography · Colors",
                  "subtitle",
                ],
                ["Client / Credit", "text", "e.g. Mission+ · SVP", "client"],
              ].map(([label, , ph, field]) => (
                <div key={field}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: DM,
                      fontSize: "0.65rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-sub)",
                      marginBottom: "0.35rem",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    type="text"
                    placeholder={ph}
                    value={item[field]}
                    disabled={uploading}
                    onChange={(e) => updateField(i, field, e.target.value)}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--gold)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                    style={inp}
                  />
                </div>
              ))}
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: DM,
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--text-sub)",
                    marginBottom: "0.35rem",
                  }}
                >
                  Description
                </label>
                <textarea
                  placeholder="Describe this project…"
                  value={item.desc}
                  disabled={uploading}
                  rows={3}
                  onChange={(e) => updateField(i, "desc", e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  style={{ ...inp, resize: "vertical", minHeight: 80 }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: DM,
                    fontSize: "0.65rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--text-sub)",
                    marginBottom: "0.35rem",
                  }}
                >
                  Tags{" "}
                  <span
                    style={{
                      textTransform: "none",
                      letterSpacing: 0,
                      opacity: 0.6,
                    }}
                  >
                    (comma separated)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Print, Mockup, Apparel"
                  value={item.tags}
                  disabled={uploading}
                  onChange={(e) => updateField(i, "tags", e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  style={inp}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {queue.length > 0 && (
        <motion.button
          onClick={uploadAll}
          disabled={uploading}
          whileHover={!uploading ? { scale: 1.02 } : {}}
          whileTap={!uploading ? { scale: 0.97 } : {}}
          style={{
            width: "100%",
            padding: "0.95rem",
            background: uploading ? "var(--border)" : "var(--gold)",
            color: uploading ? "var(--text-sub)" : "#0a0a08",
            border: "none",
            borderRadius: "8px",
            fontFamily: DM,
            fontWeight: 700,
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: uploading ? "not-allowed" : "pointer",
            transition: "all 0.3s",
          }}
        >
          {uploading
            ? "Uploading…"
            : `Upload ${queue.length} Image${queue.length > 1 ? "s" : ""} to Cloudinary ↗`}
        </motion.button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   EXPERIENCE MANAGER (Experience tab)
══════════════════════════════════════════ */
const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Freelance",
  "Contract",
  "Internship",
  "Self-employed",
];

const EMPTY_JOB = {
  id: "",
  role: "",
  company: "",
  type: "Full-time",
  period: "",
  duration: "",
  location: "",
  desc: "",
  skills: "",
  current: false,
};

function ExperienceManager({ showToast }) {
  const [jobs, setJobs] = useState(loadExperience);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_JOB);
  const [delConfirm, setDelConfirm] = useState(null);

  const saveJobs = (updated) => {
    try {
      localStorage.setItem(EXP_KEY, JSON.stringify(updated));
    } catch {}
    setJobs(updated);
    setTimeout(() => window.dispatchEvent(new Event("storage")), 0);
  };

  const openNew = () => {
    setForm({ ...EMPTY_JOB, id: "exp_" + Date.now() });
    setEditing("new");
  };
  const openEdit = (job) => {
    setForm({
      ...job,
      skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills,
    });
    setEditing(job.id);
  };
  const cancelEdit = () => {
    setEditing(null);
    setForm(EMPTY_JOB);
  };

  const saveForm = () => {
    if (!form.role.trim() || !form.company.trim()) {
      showToast("⚠ Role and Company are required.");
      return;
    }
    const job = {
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    let updated;
    if (editing === "new") {
      updated = [job, ...jobs];
    } else {
      updated = jobs.map((j) => (j.id === editing ? job : j));
    }
    saveJobs(updated);
    showToast("✓ Experience saved!");
    cancelEdit();
  };

  const deleteJob = (id) => {
    saveJobs(jobs.filter((j) => j.id !== id));
    setDelConfirm(null);
    showToast("✓ Entry deleted.");
  };

  const moveUp = (i) => {
    if (i === 0) return;
    const a = [...jobs];
    [a[i - 1], a[i]] = [a[i], a[i - 1]];
    saveJobs(a);
  };
  const moveDown = (i) => {
    if (i === jobs.length - 1) return;
    const a = [...jobs];
    [a[i], a[i + 1]] = [a[i + 1], a[i]];
    saveJobs(a);
  };

  const resetToDefault = () => {
    saveJobs(DEFAULT_JOBS);
    showToast("✓ Reset to defaults.");
  };

  const F = (field, label, ph, opts = {}) => (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: DM,
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text-sub)",
          marginBottom: "0.35rem",
        }}
      >
        {label}
      </label>
      {opts.textarea ? (
        <textarea
          value={form[field]}
          rows={4}
          placeholder={ph}
          onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
          onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          style={{ ...inp, resize: "vertical", minHeight: 90 }}
        />
      ) : opts.select ? (
        <select
          value={form[field]}
          onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
          onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          style={{ ...inp, cursor: "pointer" }}
        >
          {opts.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={form[field]}
          placeholder={ph}
          onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
          onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          style={inp}
        />
      )}
    </div>
  );

  if (editing !== null) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            marginBottom: "1.5rem",
          }}
        >
          <button
            onClick={cancelEdit}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--text-sub)",
              fontFamily: DM,
              fontSize: "0.72rem",
              padding: "0.4rem 0.9rem",
              borderRadius: "5px",
              cursor: "pointer",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            ← Back
          </button>
          <div
            style={{ fontFamily: CV, fontSize: "1.3rem", color: "var(--gold)" }}
          >
            {editing === "new" ? "Add New Experience" : "Edit Experience"}
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.85rem",
            }}
          >
            {F("role", "Job Title *", "e.g. Senior Graphic Designer")}
            {F("company", "Company *", "e.g. The Brandit Agency")}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0.85rem",
            }}
          >
            {F("type", "Employment Type", "", {
              select: true,
              options: EMPLOYMENT_TYPES,
            })}
            {F("period", "Period", "e.g. Dec 2025 – Present")}
            {F("duration", "Duration", "e.g. 4 mos")}
          </div>
          {F("location", "Location", "e.g. Philippines · Remote")}
          {F(
            "desc",
            "Description",
            "Describe your responsibilities and achievements…",
            { textarea: true },
          )}
          {F(
            "skills",
            "Skills",
            "e.g. Branding, Illustrator, Typography (comma separated)",
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.75rem 1rem",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
            }}
          >
            <input
              type="checkbox"
              id="cur"
              checked={form.current}
              onChange={(e) =>
                setForm((f) => ({ ...f, current: e.target.checked }))
              }
              style={{
                width: 16,
                height: 16,
                accentColor: "var(--gold)",
                cursor: "pointer",
              }}
            />
            <label
              htmlFor="cur"
              style={{
                fontFamily: DM,
                fontSize: "0.83rem",
                color: "var(--text)",
                cursor: "pointer",
              }}
            >
              This is my{" "}
              <strong style={{ color: "var(--gold)" }}>current</strong> position
            </label>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
            <motion.button
              onClick={saveForm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: 1,
                padding: "0.9rem",
                background: "var(--gold)",
                color: "#0a0a08",
                border: "none",
                borderRadius: "6px",
                fontFamily: DM,
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {editing === "new" ? "Add to Timeline +" : "Save Changes ✓"}
            </motion.button>
            <button
              onClick={cancelEdit}
              style={{
                padding: "0.9rem 1.5rem",
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                color: "var(--text-sub)",
                fontFamily: DM,
                fontSize: "0.83rem",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "0.6rem",
        }}
      >
        <div
          style={{
            fontFamily: DM,
            fontSize: "0.78rem",
            color: "var(--text-sub)",
          }}
        >
          {jobs.length} experience entr{jobs.length === 1 ? "y" : "ies"} · drag
          to reorder or use arrows
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={resetToDefault}
            style={{
              padding: "0.45rem 0.9rem",
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "5px",
              color: "var(--text-sub)",
              fontFamily: DM,
              fontSize: "0.68rem",
              cursor: "pointer",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Reset
          </button>
          <motion.button
            onClick={openNew}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "0.45rem 1.1rem",
              background: "var(--gold)",
              color: "#0a0a08",
              border: "none",
              borderRadius: "5px",
              fontFamily: DM,
              fontWeight: 700,
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            + Add Experience
          </motion.button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <AnimatePresence>
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              style={{
                padding: "1rem 1.2rem",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                  paddingTop: "0.1rem",
                }}
              >
                <button
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  style={{
                    background: "none",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    color: i === 0 ? "var(--border)" : "var(--text-sub)",
                    width: 24,
                    height: 24,
                    cursor: i === 0 ? "default" : "pointer",
                    fontSize: "0.7rem",
                  }}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveDown(i)}
                  disabled={i === jobs.length - 1}
                  style={{
                    background: "none",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    color:
                      i === jobs.length - 1
                        ? "var(--border)"
                        : "var(--text-sub)",
                    width: 24,
                    height: 24,
                    cursor: i === jobs.length - 1 ? "default" : "pointer",
                    fontSize: "0.7rem",
                  }}
                >
                  ↓
                </button>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    marginBottom: "0.2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: DM,
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: "var(--text)",
                    }}
                  >
                    {job.role}
                  </span>
                  {job.current && (
                    <span
                      style={{
                        fontFamily: DM,
                        fontSize: "0.55rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        background: "var(--gold)",
                        color: "#0a0a08",
                        padding: "0.15rem 0.55rem",
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
                    fontSize: "0.78rem",
                    color: "var(--gold)",
                  }}
                >
                  {job.company}{" "}
                  <span style={{ color: "var(--text-sub)", fontWeight: 400 }}>
                    · {job.type}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: DM,
                    fontSize: "0.7rem",
                    color: "var(--text-sub)",
                    marginTop: "0.15rem",
                  }}
                >
                  {job.period} · {job.duration}
                  {job.location ? ` · ${job.location}` : ""}
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                <button
                  onClick={() => openEdit(job)}
                  style={{
                    padding: "0.35rem 0.8rem",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    color: "var(--text-sub)",
                    fontFamily: DM,
                    fontSize: "0.65rem",
                    cursor: "pointer",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Edit
                </button>
                {delConfirm === job.id ? (
                  <button
                    onClick={() => deleteJob(job.id)}
                    style={{
                      padding: "0.35rem 0.8rem",
                      background: "#e55",
                      border: "none",
                      borderRadius: "4px",
                      color: "#fff",
                      fontFamily: DM,
                      fontWeight: 700,
                      fontSize: "0.65rem",
                      cursor: "pointer",
                    }}
                  >
                    Confirm
                  </button>
                ) : (
                  <button
                    onClick={() => setDelConfirm(job.id)}
                    style={{
                      padding: "0.35rem 0.6rem",
                      background: "transparent",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      color: "var(--text-sub)",
                      fontFamily: DM,
                      fontSize: "0.65rem",
                      cursor: "pointer",
                    }}
                  >
                    🗑
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {jobs.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "3rem",
              border: "1px solid var(--border)",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "0.6rem" }}>💼</div>
            <div
              style={{
                fontFamily: DM,
                color: "var(--text-sub)",
                fontSize: "0.85rem",
              }}
            >
              No entries yet — click "Add Experience" to start.
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   MAIN ADMIN PANEL
══════════════════════════════════════════ */
export default function AdminPanel({ onClose }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState("projects");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }, []);

  const loadImages = useCallback(() => {
    setLoading(true);
    const imgs = fetchCloudinaryImages();
    setImages(imgs);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loggedIn) loadImages();
  }, [loggedIn, loadImages]);

  const handleUploaded = (results) => {
    if (!results.length) return;
    setImages((prev) => {
      const updated = [...prev, ...results];
      saveCache(updated);
      return updated;
    });
    setTimeout(() => window.dispatchEvent(new Event("storage")), 300);
    showToast(
      `✓ ${results.length} image${results.length > 1 ? "s" : ""} uploaded!`,
    );
  };

  const handleDeleted = (publicId) => {
    setImages((prev) => {
      const updated = prev.filter((i) => i.public_id !== publicId);
      saveCache(updated);
      return updated;
    });
    setTimeout(() => window.dispatchEvent(new Event("storage")), 0);
    showToast("✓ Image deleted.");
  };

  const filtered = images.filter((img) =>
    img.public_id.toLowerCase().includes(search.toLowerCase()),
  );

  const TABS = [
    { id: "projects", label: "🖼 Projects" },
    { id: "experience", label: "💼 Experience" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5000,
        background: "rgba(0,0,0,0.87)",
        backdropFilter: "blur(12px)",
        overflowY: "auto",
        padding: "2rem 1rem",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "var(--bg)",
          borderRadius: "16px",
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.4rem 2rem",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: CV,
                fontSize: "1.7rem",
                color: "var(--gold)",
                fontWeight: 400,
              }}
            >
              Portfolio Manager
            </div>
            <div
              style={{
                fontFamily: DM,
                fontSize: "0.7rem",
                color: "var(--text-sub)",
                marginTop: "0.1rem",
              }}
            >
              {tab === "projects"
                ? `Cloudinary · ron-portfolio · ${images.length} image${images.length !== 1 ? "s" : ""}`
                : "Manage your work experience timeline"}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            {loggedIn && tab === "projects" && (
              <motion.button
                onClick={loadImages}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "0.45rem 0.9rem",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  color: "var(--text-sub)",
                  fontFamily: DM,
                  fontSize: "0.7rem",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                ↻ Refresh
              </motion.button>
            )}
            {loggedIn && (
              <motion.button
                onClick={() => setLoggedIn(false)}
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: "0.45rem 0.9rem",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  color: "var(--text-sub)",
                  fontFamily: DM,
                  fontSize: "0.7rem",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Logout
              </motion.button>
            )}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                color: "var(--text-sub)",
                fontFamily: DM,
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        {loggedIn && (
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid var(--border)",
              background: "var(--surface)",
              padding: "0 2rem",
            }}
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: "0.85rem 1.2rem",
                  background: "none",
                  border: "none",
                  borderBottom: `2px solid ${tab === t.id ? "var(--gold)" : "transparent"}`,
                  color: tab === t.id ? "var(--gold)" : "var(--text-sub)",
                  fontFamily: DM,
                  fontSize: "0.78rem",
                  fontWeight: tab === t.id ? 700 : 400,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  marginBottom: "-1px",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div style={{ padding: "2rem" }}>
          {!loggedIn ? (
            <LoginForm onLogin={() => setLoggedIn(true)} />
          ) : tab === "experience" ? (
            <ExperienceManager showToast={showToast} />
          ) : (
            <>
              <UploadZone
                onUploaded={handleUploaded}
                onError={(msg) => showToast("✕ " + msg.slice(0, 60))}
              />

              <div
                style={{
                  padding: "0.9rem 1.1rem",
                  marginBottom: "1.8rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontFamily: DM,
                    fontWeight: 700,
                    fontSize: "0.65rem",
                    color: "var(--gold)",
                    marginBottom: "0.35rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  How to use
                </div>
                <div
                  style={{
                    fontFamily: DM,
                    fontSize: "0.78rem",
                    color: "var(--text-sub)",
                    lineHeight: 1.75,
                  }}
                >
                  Upload images with the{" "}
                  <strong style={{ color: "var(--text)" }}>
                    same Project Title
                  </strong>{" "}
                  to group them into one card on the portfolio. Each title
                  becomes a single project with a thumbnail strip and gallery
                  lightbox.
                </div>
              </div>

              {images.length > 0 && (
                <div style={{ marginBottom: "1.2rem" }}>
                  <input
                    type="text"
                    placeholder="Search uploaded images…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      ...inp,
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  />
                </div>
              )}

              {loading ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    fontFamily: DM,
                    color: "var(--text-sub)",
                    fontSize: "0.85rem",
                  }}
                >
                  Loading images…
                </div>
              ) : filtered.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3rem",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ fontSize: "2.2rem", marginBottom: "0.7rem" }}>
                    🖼
                  </div>
                  <div
                    style={{
                      fontFamily: DM,
                      color: "var(--text-sub)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {search
                      ? "No images match your search."
                      : "No images yet — upload your first one above!"}
                  </div>
                </div>
              ) : (
                <motion.div
                  layout
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(190px,1fr))",
                    gap: "1rem",
                  }}
                >
                  <AnimatePresence mode="popLayout">
                    {filtered.map((img) => (
                      <ImageCard
                        key={img.public_id}
                        img={img}
                        onDelete={handleDeleted}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: "fixed",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--gold)",
              color: "#0a0a08",
              fontFamily: DM,
              fontWeight: 700,
              fontSize: "0.85rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "99px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
              zIndex: 6000,
              whiteSpace: "nowrap",
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
