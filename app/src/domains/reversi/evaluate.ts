import { DiscType, Disc } from "@/domains/reversi/const";
import { weightedBoard } from "@/domains/reversi/const";
import { reverse, checkMakeable } from "@/domains/reversi/compute";
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
  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === currentPlayer) {
        score += weightedBoard[rowIndex][colIndex];
      } else if (cell !== Disc.empty) {
        score -= weightedBoard[rowIndex][colIndex];
      }
    });
  });
  return score;
};

/**
 * すべての置けるマスに対する評価変動を計算する
 * @param {DiscType[][]} board リバーシの盤面
 * @param {DiscType} currentPlayer 現在のプレイヤー
 * @returns {Array<{row: number, col: number, value: number}>} 各マスの評価変動
 */
export const calculateMoveValues = (
  board: DiscType[][],
  currentPlayer: DiscType,
): Array<{ row: number; col: number; value: number }> => {
  const moveValues: Array<{ row: number; col: number; value: number }> = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (checkMakeable({ board, row, col, currentPlayer })) {
        const newBoard = reverse({ board, row, col, currentPlayer });
        const value = evaluateBoard(newBoard, currentPlayer);
        moveValues.push({ row, col, value });
      }
    }
  }

  return moveValues;
};
