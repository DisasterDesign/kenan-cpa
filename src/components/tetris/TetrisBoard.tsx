"use client";

import type { GameState } from "@/lib/tetris-types";
import { getBlocks } from "@/lib/tetris-pieces";
import { PIECE_COLORS } from "@/lib/tetris-pieces";
import TetrisBlock from "./TetrisBlock";

const COLS = 5;
const ROWS = 3;

interface TetrisBoardProps {
  gameState: GameState;
}

export default function TetrisBoard({ gameState }: TetrisBoardProps) {
  const offsetX = -(COLS - 1) / 2;
  const offsetY = -(ROWS - 1) / 2;

  const toWorldPos = (row: number, col: number): [number, number, number] => [
    col + offsetX,
    (ROWS - 1 - row) + offsetY,
    0,
  ];

  return (
    <group>
      {/* Placed blocks */}
      {gameState.board.map((row, r) =>
        row.map((cell, c) =>
          cell.filled ? (
            <TetrisBlock
              key={`board-${r}-${c}`}
              position={toWorldPos(r, c)}
              color={cell.color}
              isClearing={cell.clearing}
            />
          ) : null
        )
      )}

      {/* Ghost piece */}
      {gameState.activePiece && gameState.phase === "dropping" && (
        <>
          {getBlocks(gameState.activePiece.type, gameState.activePiece.rotation).map(
            (block, i) => {
              const r = block.row + gameState.ghostRow;
              const c = block.col + gameState.activePiece!.position.col;
              if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return null;
              return (
                <TetrisBlock
                  key={`ghost-${i}`}
                  position={toWorldPos(r, c)}
                  color={PIECE_COLORS[gameState.activePiece!.type]}
                  isGhost
                />
              );
            }
          )}
        </>
      )}

      {/* Active piece */}
      {gameState.activePiece && gameState.phase === "dropping" && (
        <>
          {getBlocks(gameState.activePiece.type, gameState.activePiece.rotation).map(
            (block, i) => {
              const r = block.row + gameState.activePiece!.position.row;
              const c = block.col + gameState.activePiece!.position.col;
              if (r < 0 || c < 0 || c >= COLS) return null;
              return (
                <TetrisBlock
                  key={`active-${i}`}
                  position={toWorldPos(r, c)}
                  color={PIECE_COLORS[gameState.activePiece!.type]}
                />
              );
            }
          )}
        </>
      )}
    </group>
  );
}
