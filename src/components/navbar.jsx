import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";

const links = ["home", "about", "projects", "skills", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "1.4rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            scrolled || menuOpen ? "rgba(12,11,9,0.97)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid #2a2518"
            : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "1.6rem",
            letterSpacing: "0.12em",
            color: "var(--gold)",
            zIndex: 1001,
          }}
        >
          RM.
        </motion.div>

        {/* Desktop links */}
        <div
          className="nav-desktop"
          style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}
        >
          {links.map((link, i) => (
            <motion.div
              key={link}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <Link
                to={link}
                smooth
                duration={700}
                offset={-70}
                data-cursor-hover
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  transition: "color 0.3s",
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
              >
                {link}
              </Link>
            </motion.div>
          ))}
          <motion.a
            href="mailto:ronaldramirezmedina@gmail.com"
            whileHover={{
              scale: 1.03,
              backgroundColor: "var(--gold)",
              color: "#000",
            }}
            data-cursor-hover
            style={{
              padding: "0.5rem 1.4rem",
              border: "1px solid var(--gold)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--gold)",
              borderRadius: "2px",
              transition: "all 0.3s",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Hire Me
          </motion.a>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "5px",
            background: "none",
            border: "none",
            padding: "4px",
            zIndex: 1001,
            cursor: "pointer",
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
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)",
            }}
            animate={{
              opacity: 1,
              clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)",
            }}
            exit={{
              opacity: 0,
              clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)",
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="nav-mobile-menu"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: "rgba(10,10,8,0.98)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              backdropFilter: "blur(20px)",
            }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={link}
                  smooth
                  duration={700}
                  offset={-70}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(2.5rem, 10vw, 4rem)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    display: "block",
                    textAlign: "center",
                    padding: "0.3rem 0",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
                >
                  {link}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              style={{ marginTop: "2rem" }}
            >
              <a
                href="mailto:ronaldramirezmedina@gmail.com"
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "0.8rem 2.5rem",
                  border: "1px solid var(--gold)",
                  color: "var(--gold)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  display: "inline-block",
                }}
              >
                Hire Me
              </a>
            </motion.div>

            {/* Decorative gold line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                position: "absolute",
                bottom: "3rem",
                width: 40,
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
