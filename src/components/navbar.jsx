import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const links = ["home", "about", "projects", "skills", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          zIndex: 100,
          padding: "1.4rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(12,11,9,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
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
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "1.6rem",
            letterSpacing: "0.12em",
            color: "var(--gold)",
          }}
        ></motion.div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
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
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  transition: "color 0.3s",
                  cursor: "none",
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
              >
                {link}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
