import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Projects from "./components/projects";
import Skills from "./components/skills";
import Contact from "./components/contact";
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
    const C = "#C9952A";

    /* diamond dot */
    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = C;
    const d = (clkRef.current ? 2 : 4) * dpr;
    ctx.fillRect(-d / 2, -d / 2, d, d);
    ctx.restore();

    /* brackets */
    const off = (clkRef.current ? 4 : hovRef.current ? 2 : 8) * dpr;
    const len = (hovRef.current ? 8 : 4) * dpr;
    ctx.strokeStyle = C;
    ctx.lineWidth = 1.5 * dpr;
    ctx.shadowBlur = hovRef.current ? 10 : 0;
    ctx.shadowColor = C;
    [0, Math.PI / 2, Math.PI, -Math.PI / 2].forEach((r) => {
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(r);
      ctx.beginPath();
      ctx.moveTo(off + len, off);
      ctx.lineTo(off, off);
      ctx.lineTo(off, off + len);
      ctx.stroke();
      ctx.restore();
    });

    /* speed trail */
    const sp = Math.hypot(
      mouse.current.x - lag.current.x,
      mouse.current.y - lag.current.y,
    );
    if (sp > 5) {
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(lx, ly);
      ctx.strokeStyle = `rgba(201,149,42,${Math.min(sp / 100, 0.3)})`;
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
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
