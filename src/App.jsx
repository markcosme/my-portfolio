import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Projects from "./components/projects";
import Skills from "./components/skills";
import Contact from "./components/contact";
import "./index.css";

export default function App() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const lagPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const hoveredRef = useRef(false);
  const clickedRef = useRef(false);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);
  useEffect(() => {
    clickedRef.current = clicked;
  }, [clicked]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dynamic easing: snaps faster when hovering
    const lerpFactor = hoveredRef.current ? 0.25 : 0.12;
    lagPos.current.x += (mouse.current.x - lagPos.current.x) * lerpFactor;
    lagPos.current.y += (mouse.current.y - lagPos.current.y) * lerpFactor;

    const mx = mouse.current.x * dpr;
    const my = mouse.current.y * dpr;
    const lx = lagPos.current.x * dpr;
    const ly = lagPos.current.y * dpr;

    const color = "#C9952A";
    const glowColor = "rgba(201, 149, 42, 0.5)";

    // 1. Central Precision Diamond
    ctx.save();
    ctx.translate(mx, my);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = color;
    const dotSize = clickedRef.current ? 2 : 4;
    ctx.fillRect(
      (-dotSize * dpr) / 2,
      (-dotSize * dpr) / 2,
      dotSize * dpr,
      dotSize * dpr,
    );
    ctx.restore();

    // 2. Crosshair Brackets
    const size = (hoveredRef.current ? 24 : 12) * dpr;
    const offset = (clickedRef.current ? 4 : hoveredRef.current ? 2 : 8) * dpr;
    const lineLen = (hoveredRef.current ? 8 : 4) * dpr;

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5 * dpr;
    ctx.shadowBlur = hoveredRef.current ? 10 : 0;
    ctx.shadowColor = color;

    const drawBracket = (x, y, rotation) => {
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(offset + lineLen, offset);
      ctx.lineTo(offset, offset);
      ctx.lineTo(offset, offset + lineLen);
      ctx.stroke();
      ctx.restore();
    };

    // Draw 4 corners
    drawBracket(lx, ly, 0); // Bottom Right
    drawBracket(lx, ly, Math.PI / 2); // Bottom Left
    drawBracket(lx, ly, Math.PI); // Top Left
    drawBracket(lx, ly, -Math.PI / 2); // Top Right

    // 3. Speed Lines (Badass subtle trail when moving fast)
    const dx = mouse.current.x - lagPos.current.x;
    const dy = mouse.current.y - lagPos.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 5) {
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(lx, ly);
      ctx.strokeStyle = `rgba(201, 149, 42, ${Math.min(speed / 100, 0.3)})`;
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
      canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const bindListeners = () => {
      document
        .querySelectorAll("a, button, input, textarea, [role='button']")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => setHovered(true));
          el.addEventListener("mouseleave", () => setHovered(false));
        });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    handleResize();
    bindListeners();
    rafRef.current = requestAnimationFrame(animate);

    const observer = new MutationObserver(bindListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
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

      <Navbar />
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
