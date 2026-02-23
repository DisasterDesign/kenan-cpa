import type { BoardCell, GameState, ActivePiece, PieceType, Position } from "./tetris-types";
import { PIECE_COLORS, getBlocks } from "./tetris-pieces";

const ROWS = 3;
const COLS = 5;
// Pre-designed choreography based on Figma tiling.
// 5 pieces fill the entire 5×4 board, then all rows clear at once.
// Drop order is designed for gravity (bottom pieces first).
const CHOREOGRAPHY: { type: PieceType; rotation: number; col: number }[] = [
  { type: "L", rotation: 1, col: 0 },  // blue L on left (rows 1-3)
  { type: "T", rotation: 2, col: 2 },  // blue T-down bottom-right (rows 2-3)
  { type: "O", rotation: 0, col: 1 },  // orange O center (rows 1-2)
  { type: "T", rotation: 3, col: 3 },  // blue T-left top-right (rows 0-2)
  { type: "I", rotation: 0, col: 0 },  // blue I horizontal top (row 0)
];

function createEmptyBoard(): BoardCell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      filled: false,
      color: "",
      clearing: false,
    }))
  );
}

export class TetrisEngine {
  private board: BoardCell[][];
  private activePiece: ActivePiece | null = null;
  private phase: "dropping" | "clearing" | "spawning" = "spawning";
  private clearedRows: number[] = [];
  private listeners: Set<(state: GameState) => void> = new Set();
  private choreographyIndex = 0;

  constructor() {
    this.board = createEmptyBoard();
    this.spawnPiece();
  }

  private spawnPiece(): void {
    // Loop choreography — reset board when starting over
    if (this.choreographyIndex >= CHOREOGRAPHY.length) {
      this.board = createEmptyBoard();
      this.choreographyIndex = 0;
      this.notify();
    }

    const move = CHOREOGRAPHY[this.choreographyIndex];
    this.choreographyIndex++;

    const { type, rotation, col } = move;
    const startRow = -this.getPieceHeight(type, rotation);

    this.activePiece = {
      type,
      rotation,
      position: { row: startRow, col },
    };

    this.phase = "dropping";
    this.notify();
  }

  private getPieceHeight(type: PieceType, rotation: number): number {
    const blocks = getBlocks(type, rotation);
    return Math.max(...blocks.map((b) => b.row)) + 1;
  }

  private getAbsoluteBlocks(piece: ActivePiece): Position[] {
    return getBlocks(piece.type, piece.rotation).map((b) => ({
      row: b.row + piece.position.row,
      col: b.col + piece.position.col,
    }));
  }

  private canPlace(type: PieceType, rotation: number, pos: Position): boolean {
    const blocks = getBlocks(type, rotation);
    for (const b of blocks) {
      const r = b.row + pos.row;
      const c = b.col + pos.col;
      if (c < 0 || c >= COLS) return false;
      if (r >= ROWS) return false;
      if (r >= 0 && this.board[r][c].filled) return false;
    }
    return true;
  }

  private getGhostRow(): number {
    if (!this.activePiece) return 0;
    const { type, rotation, position } = this.activePiece;
    let ghostRow = position.row;
    while (this.canPlace(type, rotation, { row: ghostRow + 1, col: position.col })) {
      ghostRow++;
    }
    return ghostRow;
  }

  private lockPiece(): void {
    if (!this.activePiece) return;
    const blocks = this.getAbsoluteBlocks(this.activePiece);
    const color = PIECE_COLORS[this.activePiece.type];

    for (const b of blocks) {
      if (b.row >= 0 && b.row < ROWS && b.col >= 0 && b.col < COLS) {
        this.board[b.row][b.col] = { filled: true, color, clearing: false };
      }
    }

    this.activePiece = null;
    this.checkAndClearRows();
  }

  private checkAndClearRows(): void {
    const fullRows: number[] = [];
    for (let r = 0; r < ROWS; r++) {
      if (this.board[r].every((cell) => cell.filled)) {
        fullRows.push(r);
      }
    }

    if (fullRows.length > 0) {
      this.clearedRows = fullRows;
      this.phase = "clearing";

      // Mark rows as clearing
      for (const r of fullRows) {
        for (let c = 0; c < COLS; c++) {
          this.board[r][c].clearing = true;
        }
      }
      this.notify();

      // After animation delay, remove rows and continue
      setTimeout(() => {
        this.removeRows(fullRows);
        this.clearedRows = [];
        this.phase = "spawning";
        this.spawnPiece();
      }, 500);
    } else {
      this.phase = "spawning";
      this.spawnPiece();
    }
  }

  private removeRows(rows: number[]): void {
    const sorted = [...rows].sort((a, b) => b - a);
    for (const r of sorted) {
      this.board.splice(r, 1);
    }
    for (let i = 0; i < sorted.length; i++) {
      this.board.unshift(
        Array.from({ length: COLS }, () => ({
          filled: false,
          color: "",
          clearing: false,
        }))
      );
    }
  }

  tick(): void {
    if (this.phase !== "dropping" || !this.activePiece) return;

    const { type, rotation, position } = this.activePiece;
    if (this.canPlace(type, rotation, { row: position.row + 1, col: position.col })) {
      this.activePiece.position.row++;
      this.notify();
    } else {
      this.lockPiece();
    }
  }

  getState(): GameState {
    return {
      board: this.board.map((row) => row.map((cell) => ({ ...cell }))),
      activePiece: this.activePiece ? { ...this.activePiece, position: { ...this.activePiece.position } } : null,
      ghostRow: this.getGhostRow(),
      clearedRows: [...this.clearedRows],
      phase: this.phase,
    };
  }

  subscribe(fn: (state: GameState) => void): () => void {
    this.listeners.add(fn);
    fn(this.getState());
    return () => this.listeners.delete(fn);
  }

  private notify(): void {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  reset(): void {
    this.board = createEmptyBoard();
    this.activePiece = null;
    this.clearedRows = [];
    this.choreographyIndex = 0;
    this.phase = "spawning";
    this.spawnPiece();
  }
}
