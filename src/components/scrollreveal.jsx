import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

/* ═══════════════════════════════════════════════
   CORE: ScrollReveal — cinematic entrance effects
═══════════════════════════════════════════════ */
export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 80,
  duration = 1.0,
  style = {},
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  if (direction === "glitch") {
    return (
      <GlitchReveal ref={ref} inView={inView} delay={delay} style={style}>
        {children}
      </GlitchReveal>
    );
  }

  if (direction === "split") {
    return (
      <SplitReveal ref={ref} inView={inView} delay={delay} style={style}>
        {children}
      </SplitReveal>
    );
  }

  if (direction === "flip") {
    return (
      <FlipReveal ref={ref} inView={inView} delay={delay} style={style}>
        {children}
      </FlipReveal>
    );
  }

  if (direction === "cinematic") {
    return (
      <CinematicReveal ref={ref} inView={inView} delay={delay} style={style}>
        {children}
      </CinematicReveal>
    );
  }

  if (direction === "shatter") {
    return (
      <ShatterReveal ref={ref} inView={inView} delay={delay} style={style}>
        {children}
      </ShatterReveal>
    );
  }

  const hidden = {
    opacity: 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    scale: direction === "scale" ? 0.75 : 0.97,
    rotateX: direction === "up" || direction === "down" ? 15 : 0,
    rotateY: direction === "left" || direction === "right" ? 10 : 0,
    filter: "blur(10px)",
  };

  const show = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden, show }}
      style={{ perspective: 1200, ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   CINEMATIC REVEAL — dramatic zoom + fade + rotate
═══════════════════════════════════════════════ */
function CinematicReveal({ children, inView, delay, style }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.6,
        rotateX: 25,
        rotateY: -15,
        y: 120,
        filter: "blur(20px) brightness(0.5)",
      }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              y: 0,
              filter: "blur(0px) brightness(1)",
            }
          : {
              opacity: 0,
              scale: 0.6,
              rotateX: 25,
              rotateY: -15,
              y: 120,
              filter: "blur(20px) brightness(0.5)",
            }
      }
      transition={{
        duration: 1.4,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: 1400, transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   SHATTER REVEAL — pieces fly in from random positions
═══════════════════════════════════════════════ */
function ShatterReveal({ children, inView, delay, style }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 1.3,
        rotateZ: -5,
        filter: "blur(15px) contrast(1.5)",
        clipPath: "polygon(10% 0%, 90% 5%, 95% 90%, 5% 85%)",
      }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: 1,
              rotateZ: 0,
              filter: "blur(0px) contrast(1)",
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }
          : {
              opacity: 0,
              scale: 1.3,
              rotateZ: -5,
              filter: "blur(15px) contrast(1.5)",
              clipPath: "polygon(10% 0%, 90% 5%, 95% 90%, 5% 85%)",
            }
      }
      transition={{
        duration: 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   GLITCH REVEAL
═══════════════════════════════════════════════ */
function GlitchReveal({ children, inView, delay, style }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setPhase(1), delay * 1000),
      setTimeout(() => setPhase(2), delay * 1000 + 60),
      setTimeout(() => setPhase(3), delay * 1000 + 120),
      setTimeout(() => setPhase(4), delay * 1000 + 200),
      setTimeout(() => setPhase(5), delay * 1000 + 320),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView, delay]);

  const glitchFrames = [
    {
      opacity: 0,
      transform: "translate(-6px, 2px) skewX(-4deg) scaleY(1.02)",
      filter: "blur(6px) hue-rotate(0deg)",
    },
    {
      opacity: 0.35,
      transform: "translate(8px, -3px) skewX(5deg) scaleY(0.98)",
      filter: "hue-rotate(120deg) blur(3px) saturate(3)",
    },
    {
      opacity: 0.65,
      transform: "translate(-4px, 1px) skewX(-2deg)",
      filter: "hue-rotate(240deg) blur(1px)",
    },
    {
      opacity: 0.9,
      transform: "translate(1px, 0) skewX(0.5deg)",
      filter: "saturate(1.5) blur(0.5px)",
    },
    { opacity: 1, transform: "translate(0, 0)", filter: "none" },
  ];

  const frame = glitchFrames[Math.min(phase, 4)];

  return (
    <div
      style={{
        transition: phase < 4 ? "all 0.04s steps(1)" : "all 0.3s ease",
        ...frame,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SPLIT REVEAL
═══════════════════════════════════════════════ */
function SplitReveal({ children, inView, delay, style }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      <motion.div
        initial={{ y: 0 }}
        animate={inView ? { y: "-101%" } : { y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background:
            "linear-gradient(135deg, var(--gold), rgba(201,149,42,0.6))",
          transformOrigin: "top",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={
          inView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 30, filter: "blur(8px)" }
        }
        transition={{ duration: 0.6, delay: delay + 0.45 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FLIP REVEAL
═══════════════════════════════════════════════ */
function FlipReveal({ children, inView, delay, style }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        rotateX: 90,
        transformOrigin: "top",
        scale: 0.85,
        filter: "blur(8px)",
      }}
      animate={
        inView
          ? { opacity: 1, rotateX: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, rotateX: 90, scale: 0.85, filter: "blur(8px)" }
      }
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200, ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   STAGGER
═══════════════════════════════════════════════ */
export function ScrollStagger({
  children,
  delay = 0,
  stagger = 0.1,
  style = {},
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(6px)",
    scale: 0.94,
    rotateX: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════════
   PARALLAX
═══════════════════════════════════════════════ */
export function Parallax({ children, speed = 0.3, style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-speed * 120}px`, `${speed * 120}px`],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3],
  );
  const smooth = useSpring(y, { stiffness: 60, damping: 20 });

  return (
    <motion.div ref={ref} style={{ y: smooth, opacity, ...style }}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAGNETIC
═══════════════════════════════════════════════ */
export function Magnetic({ children, strength = 0.3, style = {} }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 16 }}
      style={{ display: "inline-block", ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   TYPEWRITER
═══════════════════════════════════════════════ */
export function Typewriter({
  text,
  delay = 0,
  speed = 0.04,
  style = {},
  cursorColor = "var(--gold)",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed * 1000);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, text, delay, speed]);

  return (
    <span ref={ref} style={style}>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ color: cursorColor, marginLeft: 1 }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   COUNT UP
═══════════════════════════════════════════════ */
export function CountUp({ value, suffix = "", delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(value);
    const duration = 1800;
    const stepTime = Math.max(Math.floor(duration / end), 16);
    const timer = setTimeout(() => {
      const counter = setInterval(() => {
        start += Math.ceil(end / (duration / stepTime));
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else setCount(start);
      }, stepTime);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  return (
    <span ref={ref} style={style}>
      {count}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   REVEAL LINE
═══════════════════════════════════════════════ */
export function RevealLine({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} style={{ overflow: "hidden", ...style }}>
      <motion.div
        initial={{ y: "120%", rotateX: 40, opacity: 0 }}
        animate={
          inView
            ? { y: "0%", rotateX: 0, opacity: 1 }
            : { y: "120%", rotateX: 40, opacity: 0 }
        }
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 600 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCROLL PROGRESS — horizontal bar at top
═══════════════════════════════════════════════ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(to right, #c9952a, #e8c547)",
        transformOrigin: "0%",
        scaleX,
        zIndex: 9999,
      }}
    />
  );
}
