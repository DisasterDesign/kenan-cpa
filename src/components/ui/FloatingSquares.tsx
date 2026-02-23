"use client";

import { useRef, useEffect, useCallback } from "react";

const SPACING = 44;
const BASE_RADIUS = 1.2;
const GLOW_RADIUS = 3;
const INFLUENCE = 150;
const BASE_COLOR = [212, 197, 169] as const; // #D4C5A9
const GLOW_COLOR = [197, 165, 114] as const; // #C5A572
const BASE_ALPHA = 0.12;
const GLOW_ALPHA = 0.5;

export default function FloatingSquares() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cols = Math.ceil(w / SPACING) + 1;
    const rows = Math.ceil(h / SPACING) + 1;
    const offsetX = (w - (cols - 1) * SPACING) / 2;
    const offsetY = (h - (rows - 1) * SPACING) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offsetX + c * SPACING;
        const y = offsetY + r * SPACING;

        const dx = x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = Math.max(0, 1 - dist / INFLUENCE);

        const radius = BASE_RADIUS + (GLOW_RADIUS - BASE_RADIUS) * t;
        const alpha = BASE_ALPHA + (GLOW_ALPHA - BASE_ALPHA) * t;

        const cr = BASE_COLOR[0] + (GLOW_COLOR[0] - BASE_COLOR[0]) * t;
        const cg = BASE_COLOR[1] + (GLOW_COLOR[1] - BASE_COLOR[1]) * t;
        const cb = BASE_COLOR[2] + (GLOW_COLOR[2] - BASE_COLOR[2]) * t;

        ctx.beginPath();
        ctx.arc(x * dpr, y * dpr, radius * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alpha})`;
        ctx.fill();
      }
    }

    raf.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
