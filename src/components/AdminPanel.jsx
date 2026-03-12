import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CV = "'Coolvetica','DM Sans',sans-serif";
const DM = "'DM Sans',sans-serif";

const CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const APIKEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
const SECRET = process.env.REACT_APP_CLOUDINARY_API_SECRET;
const FOLDER = "ron-portfolio";

/* ── sha1 via SubtleCrypto ── */
async function sha1(str) {
  const buf = await crypto.subtle.digest(
    "SHA-1",
    new TextEncoder().encode(str),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/* ── Upload ── */
async function uploadToCloudinary(file, folder) {
  const timestamp = Math.round(Date.now() / 1000);
  const paramStr = `folder=${folder}&timestamp=${timestamp}${SECRET}`;
  const signature = await sha1(paramStr);
  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", APIKEY);
  fd.append("timestamp", timestamp);
  fd.append("folder", folder);
  fd.append("signature", signature);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
    {
      method: "POST",
      body: fd,
    },
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ── Delete ── */
async function deleteFromCloudinary(publicId) {
  const timestamp = Math.round(Date.now() / 1000);
  const paramStr = `public_id=${publicId}&timestamp=${timestamp}${SECRET}`;
  const signature = await sha1(paramStr);
  const fd = new FormData();
  fd.append("public_id", publicId);
  fd.append("api_key", APIKEY);
  fd.append("timestamp", timestamp);
  fd.append("signature", signature);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD}/image/destroy`,
    {
      method: "POST",
      body: fd,
    },
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ── Fetch from localStorage cache ── */
function fetchCloudinaryImages(folder) {
  try {
    const cached = localStorage.getItem(`cloudinary_${folder}`);
    return cached ? JSON.parse(cached) : [];
  } catch {
    return [];
  }
}

/* ── Save to localStorage cache ── */
function cacheImages(folder, images) {
  try {
    localStorage.setItem(`cloudinary_${folder}`, JSON.stringify(images));
  } catch {}
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

/* ════════════════════════════════════════
   LOGIN FORM
════════════════════════════════════════ */
function LoginForm({ onLogin }) {
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);

  const USER = process.env.REACT_APP_ADMIN_USERNAME || "ronmedina";
  const PASS = process.env.REACT_APP_ADMIN_PASSWORD || "ronmedina2026";

  const handle = (e) => {
    e.preventDefault();
    if (user === USER && pw === PASS) {
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
        Sign in to manage your portfolio projects
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
            Username
          </label>
          <input
            type="text"
            value={user}
            autoComplete="username"
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter username"
            style={{ ...inp, borderColor: err ? "#e55" : "var(--border)" }}
            onFocus={(e) =>
              !err && (e.target.style.borderColor = "var(--gold)")
            }
            onBlur={(e) =>
              !err && (e.target.style.borderColor = "var(--border)")
            }
          />
        </div>

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
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={show ? "text" : "password"}
              value={pw}
              autoComplete="current-password"
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter password"
              style={{
                ...inp,
                paddingRight: "2.8rem",
                borderColor: err ? "#e55" : "var(--border)",
              }}
              onFocus={(e) =>
                !err && (e.target.style.borderColor = "var(--gold)")
              }
              onBlur={(e) =>
                !err && (e.target.style.borderColor = "var(--border)")
              }
            />
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
          </div>
        </div>

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

/* ════════════════════════════════════════
   IMAGE CARD
════════════════════════════════════════ */
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

/* ════════════════════════════════════════
   UPLOAD ZONE
════════════════════════════════════════ */
function UploadZone({ onUploaded }) {
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
    const arr = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    const items = arr.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      title: "",
      subtitle: "",
      desc: "",
      category: "Branding",
      tags: "",
    }));
    setQueue((prev) => [...prev, ...items]);
  };

  const updateField = (i, field, val) => {
    setQueue((prev) =>
      prev.map((item, idx) => (idx === i ? { ...item, [field]: val } : item)),
    );
  };

  const removeItem = (i) => {
    setQueue((prev) => prev.filter((_, idx) => idx !== i));
  };

  const uploadAll = async () => {
    if (!queue.length) return;
    setUploading(true);
    const results = [];
    for (let i = 0; i < queue.length; i++) {
      setProgress((p) => ({ ...p, [i]: "uploading" }));
      try {
        const res = await uploadToCloudinary(queue[i].file, FOLDER);
        results.push({
          ...res,
          _meta: {
            title: queue[i].title || queue[i].file.name.replace(/\.[^.]+$/, ""),
            subtitle: queue[i].subtitle,
            desc: queue[i].desc,
            category: queue[i].category,
            tags: queue[i].tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
          },
        });
        setProgress((p) => ({ ...p, [i]: "done" }));
      } catch (e) {
        setProgress((p) => ({ ...p, [i]: "error" }));
      }
    }
    setUploading(false);
    setQueue([]);
    setProgress({});
    onUploaded(results);
  };

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
                    color: "var(--text-sub)",
                  }}
                >
                  {Math.round(item.file.size / 1024)} KB ·{" "}
                  <span
                    style={{
                      color:
                        progress[i] === "done"
                          ? "#4caf50"
                          : progress[i] === "error"
                            ? "#e55"
                            : progress[i] === "uploading"
                              ? "var(--gold)"
                              : "var(--text-sub)",
                    }}
                  >
                    {progress[i] === "done"
                      ? "✓ Uploaded"
                      : progress[i] === "error"
                        ? "✕ Failed"
                        : progress[i] === "uploading"
                          ? "Uploading…"
                          : "Ready to upload"}
                  </span>
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
                    Project Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Brand Guidelines"
                    value={item.title}
                    disabled={uploading}
                    onChange={(e) => updateField(i, "title", e.target.value)}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--gold)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border)")
                    }
                    style={inp}
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
                    Category
                  </label>
                  <select
                    value={item.category}
                    disabled={uploading}
                    onChange={(e) => updateField(i, "category", e.target.value)}
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
                </div>
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
                  Subtitle / Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Logo · Typography · Colors"
                  value={item.subtitle}
                  disabled={uploading}
                  onChange={(e) => updateField(i, "subtitle", e.target.value)}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  style={inp}
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
                  Description
                </label>
                <textarea
                  placeholder="Describe this project — what it is, what you did, the outcome..."
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

/* ════════════════════════════════════════
   MAIN ADMIN PANEL
════════════════════════════════════════ */
export default function AdminPanel({ onClose }) {
  const [loggedIn, setLoggedIn] = useState(false);
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
    const imgs = fetchCloudinaryImages(FOLDER);
    setImages(imgs);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loggedIn) loadImages();
  }, [loggedIn, loadImages]);

  const handleUploaded = (results) => {
    const updated = [...results, ...images];
    setImages(updated);
    cacheImages(FOLDER, updated);
    showToast(
      `✓ ${results.length} image${results.length > 1 ? "s" : ""} uploaded!`,
    );
    window.dispatchEvent(new Event("storage"));
  };

  const handleDeleted = (publicId) => {
    const updated = images.filter((i) => i.public_id !== publicId);
    setImages(updated);
    cacheImages(FOLDER, updated);
    showToast("✓ Image deleted.");
    window.dispatchEvent(new Event("storage"));
  };

  const filtered = images.filter((img) =>
    img.public_id.toLowerCase().includes(search.toLowerCase()),
  );

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
          maxWidth: 860,
          margin: "0 auto",
          background: "var(--bg)",
          borderRadius: "16px",
          border: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* ── Header ── */}
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
              Project Manager
            </div>
            <div
              style={{
                fontFamily: DM,
                fontSize: "0.7rem",
                color: "var(--text-sub)",
                marginTop: "0.1rem",
              }}
            >
              Cloudinary · ron-portfolio · {images.length} image
              {images.length !== 1 ? "s" : ""}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            {loggedIn && (
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
                  transition: "all 0.2s",
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
                  transition: "all 0.2s",
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

        {/* ── Body ── */}
        <div style={{ padding: "2rem" }}>
          {!loggedIn ? (
            <LoginForm onLogin={() => setLoggedIn(true)} />
          ) : (
            <>
              <UploadZone onUploaded={handleUploaded} />

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
                  Upload an image → fill in its details → click{" "}
                  <strong style={{ color: "var(--text)" }}>
                    Upload to Cloudinary
                  </strong>{" "}
                  → click{" "}
                  <strong style={{ color: "var(--text)" }}>Copy URL</strong> on
                  the card below → paste the URL into{" "}
                  <code
                    style={{
                      color: "var(--gold)",
                      background: "var(--bg)",
                      padding: "0.1em 0.4em",
                      borderRadius: "3px",
                    }}
                  >
                    projects.jsx
                  </code>{" "}
                  as the{" "}
                  <code
                    style={{
                      color: "var(--gold)",
                      background: "var(--bg)",
                      padding: "0.1em 0.4em",
                      borderRadius: "3px",
                    }}
                  >
                    image:
                  </code>{" "}
                  value.
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
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(190px, 1fr))",
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
