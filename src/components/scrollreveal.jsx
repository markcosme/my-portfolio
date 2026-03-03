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
   direction: "up" | "down" | "left" | "right" | 
              "scale" | "fade" | "glitch" | "split" | "flip"
═══════════════════════════════════════════════ */
export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  distance = 60,
  duration = 0.8,
  style = {},
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  /* Glitch effect — flickers in with noise */
  if (direction === "glitch") {
    return (
      <GlitchReveal ref={ref} inView={inView} delay={delay} style={style}>
        {children}
      </GlitchReveal>
    );
  }

  /* Split — word splits open from center */
  if (direction === "split") {
    return (
      <SplitReveal ref={ref} inView={inView} delay={delay} style={style}>
        {children}
      </SplitReveal>
    );
  }

  /* Flip — 3D card flip */
  if (direction === "flip") {
    return (
      <FlipReveal ref={ref} inView={inView} delay={delay} style={style}>
        {children}
      </FlipReveal>
    );
  }

  const hidden = {
    opacity: 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    scale: direction === "scale" ? 0.85 : 1,
    rotateX: direction === "up" || direction === "down" ? 12 : 0,
    filter: "blur(6px)",
  };

  const show = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotateX: 0,
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
      style={{ perspective: 800, ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   GLITCH REVEAL — flickers in with RGB splits
═══════════════════════════════════════════════ */
function GlitchReveal({ children, inView, delay, style }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setPhase(1), delay * 1000),
      setTimeout(() => setPhase(2), delay * 1000 + 80),
      setTimeout(() => setPhase(3), delay * 1000 + 160),
      setTimeout(() => setPhase(4), delay * 1000 + 240),
      setTimeout(() => setPhase(5), delay * 1000 + 380),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView, delay]);

  const glitchFrames = [
    {
      opacity: 0,
      transform: "translate(-4px, 0) skewX(-2deg)",
      filter: "blur(4px)",
    },
    {
      opacity: 0.4,
      transform: "translate(6px, -2px) skewX(3deg)",
      filter: "hue-rotate(90deg) blur(2px)",
    },
    {
      opacity: 0.7,
      transform: "translate(-3px, 1px) skewX(-1deg)",
      filter: "hue-rotate(180deg)",
    },
    { opacity: 0.9, transform: "translate(2px, 0)", filter: "saturate(2)" },
    { opacity: 1, transform: "translate(0, 0)", filter: "none" },
  ];

  const frame = glitchFrames[Math.min(phase, 4)];

  return (
    <div
      style={{
        transition: phase < 4 ? "all 0.06s steps(1)" : "all 0.25s ease",
        ...frame,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SPLIT REVEAL — curtain opens from center
═══════════════════════════════════════════════ */
function SplitReveal({ children, inView, delay, style }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      <motion.div
        initial={{ y: 0 }}
        animate={inView ? { y: "-101%" } : { y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "var(--gold)",
          transformOrigin: "top",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FLIP REVEAL — 3D perspective flip
═══════════════════════════════════════════════ */
function FlipReveal({ children, inView, delay, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 90, transformOrigin: "top", scale: 0.9 }}
      animate={
        inView
          ? { opacity: 1, rotateX: 0, scale: 1 }
          : { opacity: 0, rotateX: 90, scale: 0.9 }
      }
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000, ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   STAGGER — fires children one by one
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

/** Stagger item — slides up with blur */
export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(4px)",
    scale: 0.96,
    rotateX: 8,
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════════
   PARALLAX — element moves at different scroll speed
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
    [`${-speed * 100}px`, `${speed * 100}px`],
  );
  const smooth = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <motion.div ref={ref} style={{ y: smooth, ...style }}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAGNETIC — element follows cursor magnetically
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
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ display: "inline-block", ...style }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   TYPEWRITER — types text character by character
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
   COUNT UP — animates a number from 0 to value
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
   REVEAL LINE — horizontal wipe reveal
═══════════════════════════════════════════════ */
export function RevealLine({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} style={{ overflow: "hidden", ...style }}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
