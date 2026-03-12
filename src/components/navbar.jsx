import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";

const links = ["home", "about", "experience", "projects", "skills", "contact"];

export default function Navbar({ theme, toggleTheme, onAdminOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rmClicks, setRmClicks] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ── Navbar bg adapts to light/dark theme ── */
  const navBg =
    scrolled || menuOpen
      ? theme === "dark"
        ? "rgba(10,10,8,0.97)"
        : "rgba(250,250,248,0.97)"
      : "transparent";

  const mobileMenuBg =
    theme === "dark" ? "rgba(10,10,8,0.98)" : "rgba(250,250,248,0.98)";

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "1.1rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: navBg,
          backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          onClick={() => {
            const next = rmClicks + 1;
            setRmClicks(next);
            if (next >= 3) {
              setRmClicks(0);
              onAdminOpen?.();
            } else {
              clearTimeout(window._rmTimer);
              window._rmTimer = setTimeout(() => setRmClicks(0), 1500);
            }
          }}
          style={{
            fontFamily: "'Coolvetica','DM Sans',sans-serif",
            fontSize: "1.65rem",
            letterSpacing: "0.08em",
            color: "var(--gold)",
            fontWeight: 400,
            zIndex: 1001,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          RM{rmClicks === 1 ? "·" : rmClicks === 2 ? "··" : ""}
        </motion.div>

        {/* Desktop nav */}
        <div
          className="nav-desktop"
          style={{ display: "flex", gap: "2.4rem", alignItems: "center" }}
        >
          {links.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i + 0.3 }}
            >
              <Link
                to={l}
                smooth
                duration={700}
                offset={-70}
                data-cursor-hover
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "var(--fs-xs)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-sub)",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--text-sub)")}
              >
                {l}
              </Link>
            </motion.div>
          ))}

          {/* Theme toggle */}
          <motion.button
            className="theme-btn"
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            title="Toggle theme"
          >
            {theme === "dark" ? "☀" : "☾"}
          </motion.button>
        </div>

        {/* Mobile: theme + hamburger */}
        <div
          className="nav-hamburger"
          style={{ display: "none", alignItems: "center", gap: "0.7rem" }}
        >
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="menu"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              padding: "4px",
              zIndex: 1001,
            }}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: "var(--gold)",
                borderRadius: 2,
                transformOrigin: "center",
              }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              style={{
                display: "block",
                width: 18,
                height: 2,
                background: "var(--gold)",
                borderRadius: 2,
              }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: "var(--gold)",
                borderRadius: 2,
                transformOrigin: "center",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 3rem) 1.8rem)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(150% at calc(100% - 3rem) 1.8rem)",
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 3rem) 1.8rem)",
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: mobileMenuBg,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.3rem",
              backdropFilter: "blur(20px)",
            }}
          >
            {links.map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07 + i * 0.07 }}
              >
                <Link
                  to={l}
                  smooth
                  duration={700}
                  offset={-70}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Coolvetica','DM Sans',sans-serif",
                    fontSize: "clamp(2.2rem,9vw,3.5rem)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--text-sub)",
                    display: "block",
                    textAlign: "center",
                    padding: "0.2rem 0",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "var(--text-sub)")
                  }
                >
                  {l}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                position: "absolute",
                bottom: "3rem",
                width: 32,
                height: 2,
                background: "var(--gold)",
                borderRadius: 2,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
