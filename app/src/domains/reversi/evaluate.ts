import { reverse, checkMakeable } from "@/domains/reversi/compute";
import {
  DiscType,
  Disc,
  weightedBoard,
  MoveScore,
} from "@/domains/reversi/const";

/**
 * 盤面を評価する
 * @param {DiscType[][]} board リバーシの盤面
 * @param {DiscType} currentPlayer 現在のプレイヤー
 * @returns {number} 盤面の評価値
 */
export const evaluateBoard = (
  board: DiscType[][],
  currentPlayer: DiscType,
): number => {
  let score = 0;

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      if (board[row][col] === currentPlayer) {
        score += weightedBoard[row][col];
      } else if (board[row][col] !== Disc.empty) {
        score -= weightedBoard[row][col];
      }
    }
  }

  return score;
};

/**
 * すべての置けるマスに対する評価変動を計算する
 * @param {DiscType[][]} board リバーシの盤面
 * @param {DiscType} currentPlayer 現在のプレイヤー
 * @returns {Array<{row: number, col: number, score: number}>} 各マスの評価変動
 */
export const calculateMoveScores = (
  board: DiscType[][],
  currentPlayer: DiscType,
): MoveScore[] => {
  const moveScores: MoveScore[] = [];

  for (let row = 0; row < board.length; row += 1) {
    for (let col = 0; col < board[row].length; col += 1) {
      if (checkMakeable({ board, row, col, currentPlayer })) {
        const newBoard = reverse({ board, row, col, currentPlayer });
        const score = evaluateBoard(newBoard, currentPlayer);
        moveScores.push({ row, col, score });
      }
    }
  }

  return moveScores;
};
