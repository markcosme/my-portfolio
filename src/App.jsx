import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Experience from "./components/experience";
import Projects from "./components/projects";
import Skills from "./components/skills";
import Contact from "./components/contact";
import AdminPanel from "./components/AdminPanel";
import "./index.css";

export default function App() {
  /* ── theme ── */
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  /* ── admin panel ── */
  const [adminOpen, setAdminOpen] = useState(false);

  /* ── canvas cursor ── */
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const lag = useRef({ x: -200, y: -200 });
  const raf = useRef(null);
  const hovRef = useRef(false);
  const clkRef = useRef(false);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const ease = hovRef.current ? 0.25 : 0.12;
    lag.current.x += (mouse.current.x - lag.current.x) * ease;
    lag.current.y += (mouse.current.y - lag.current.y) * ease;

    const mx = mouse.current.x * dpr,
      my = mouse.current.y * dpr;
    const lx = lag.current.x * dpr,
      ly = lag.current.y * dpr;
    const C =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "#FFFFFF"
        : "#000000";

    /* Minimal dot and tracking ring */
    ctx.fillStyle = C;
    ctx.beginPath();
    ctx.arc(mx, my, (clkRef.current ? 2 : 3) * dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = C;
    ctx.lineWidth = dpr;
    ctx.globalAlpha = hovRef.current ? 0.9 : 0.45;
    ctx.beginPath();
    ctx.arc(lx, ly, (hovRef.current ? 19 : 14) * dpr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    /* speed trail */
    const sp = Math.hypot(
      mouse.current.x - lag.current.x,
      mouse.current.y - lag.current.y,
    );
    if (sp > 5) {
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(lx, ly);
      ctx.strokeStyle = `${C}${Math.round(Math.min(sp / 100, 0.22) * 255)
        .toString(16)
        .padStart(2, "0")}`;
      ctx.lineWidth = dpr;
      ctx.shadowBlur = 0;
      ctx.stroke();
    }
    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      const dpr = window.devicePixelRatio || 1;
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      c.style.width = window.innerWidth + "px";
      c.style.height = window.innerHeight + "px";
    };
    const mm = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const md = () => {
      clkRef.current = true;
    };
    const mu = () => {
      clkRef.current = false;
    };
    const bind = () => {
      document
        .querySelectorAll("a,button,input,textarea,[role='button']")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => {
            hovRef.current = true;
          });
          el.addEventListener("mouseleave", () => {
            hovRef.current = false;
          });
        });
    };
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", mm);
    window.addEventListener("mousedown", md);
    window.addEventListener("mouseup", mu);
    resize();
    bind();
    raf.current = requestAnimationFrame(animate);
    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", mu);
      cancelAnimationFrame(raf.current);
      obs.disconnect();
    };
  }, [animate]);

  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }
        @media (max-width: 768px) {
          #custom-cursor-canvas { display: none; }
          * { cursor: auto !important; }
        }
      `}</style>
      <canvas
        id="custom-cursor-canvas"
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 999999,
        }}
      />
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onAdminOpen={() => setAdminOpen(true)}
      />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact onAdminOpen={() => setAdminOpen(true)} />
      </main>

      <AnimatePresence>
        {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
