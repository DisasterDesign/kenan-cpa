export type PieceType = "I" | "O" | "T" | "S" | "Z" | "J" | "L";

export interface Position {
  row: number;
  col: number;
}

export interface BoardCell {
  filled: boolean;
  color: string;
  clearing: boolean;
}

export interface ActivePiece {
  type: PieceType;
  rotation: number;
  position: Position;
}

export interface GameState {
  board: BoardCell[][];
  activePiece: ActivePiece | null;
  ghostRow: number;
  clearedRows: number[];
  phase: "dropping" | "clearing" | "spawning";
}
