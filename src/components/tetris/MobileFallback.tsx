"use client";

import { useEffect, useState } from "react";
import { PIECE_COLORS } from "@/lib/tetris-pieces";
import type { PieceType } from "@/lib/tetris-types";

const COLS = 5;
const ROWS = 3;

const COLORS = Object.values(PIECE_COLORS);

export default function MobileFallback() {
  const [grid, setGrid] = useState<(string | null)[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        // Add a random block at a random position
        const col = Math.floor(Math.random() * COLS);
        // Find lowest empty row in this column
        let targetRow = -1;
        for (let r = ROWS - 1; r >= 0; r--) {
          if (!next[r][col]) {
            targetRow = r;
            break;
          }
        }
        if (targetRow >= 0) {
          next[targetRow][col] = COLORS[step % COLORS.length];
        }

        // Check for full rows
        for (let r = ROWS - 1; r >= 0; r--) {
          if (next[r].every((c) => c !== null)) {
            next.splice(r, 1);
            next.unshift(Array(COLS).fill(null));
          }
        }

        step++;
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-30">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          width: "160px",
        }}
      >
        {grid.flat().map((color, i) => (
          <div
            key={i}
            className="aspect-square rounded-md transition-all duration-500"
            style={{
              background: color || "rgba(255,255,255,0.03)",
              border: color ? "none" : "1px solid rgba(255,255,255,0.05)",
              transform: color ? "scale(1)" : "scale(0.9)",
              opacity: color ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
