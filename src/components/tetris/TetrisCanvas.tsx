"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { TetrisEngine } from "@/lib/tetris-engine";
import type { GameState } from "@/lib/tetris-types";
import TetrisScene from "./TetrisScene";

export default function TetrisCanvas() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<TetrisEngine | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const engine = new TetrisEngine();
    engineRef.current = engine;

    const unsubscribe = engine.subscribe(setGameState);

    // Start auto-play loop
    intervalRef.current = setInterval(() => engine.tick(), 400);

    // Pause when off-screen
    const container = containerRef.current;
    if (container) {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (!intervalRef.current) {
              intervalRef.current = setInterval(() => engine.tick(), 400);
            }
          } else {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
          }
        },
        { threshold: 0 }
      );
      io.observe(container);

      return () => {
        io.disconnect();
        unsubscribe();
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    return () => {
      unsubscribe();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 1, 18], fov: 55 }}
        gl={{ alpha: true, antialias: true, powerPreference: "default" }}
        shadows
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {gameState && <TetrisScene gameState={gameState} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
