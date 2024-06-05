import { useState, useEffect } from "react";

import { configReversi } from "@/config/reversi";
import {
  checkMakeable,
  checkMakeableAll,
  checkWinner,
  createBoard,
  discCount,
  reverse,
} from "@/domains/reversi/compute";
import { DiscType, Disc, Winner, WinnerType } from "@/domains/reversi/const";

export type ReversiGameType = {
  board: DiscType[][];
  currentPlayer: DiscType;
  makeMove: (row: number, col: number) => boolean;
  checkMakeable: (row: number, col: number) => boolean;
  reset: () => void;
};

/**
 * リバーシゲームのカスタムフック
 * @returns {ReversiGameType} リバーシゲームのカスタムフック
 * */
export const useReversiGame = (): ReversiGameType => {
  const initialBoard = createBoard({
    boardX: configReversi.boardX,
    boardY: configReversi.boardY,
  });

  // 初期配置
  initialBoard[3][3] = Disc.white;
  initialBoard[4][4] = Disc.white;
  initialBoard[3][4] = Disc.black;
  initialBoard[4][3] = Disc.black;

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<DiscType>(Disc.black);
  const [winner, setWinner] = useState<WinnerType | undefined>(undefined);
  const [passCount, setPassCount] = useState(0);

  /**
   * 石を置く
   * @param row 置く行
   * @param col 置く列
   * @returns 石を置けたかどうか
   */
  const makeMove = (row: number, col: number): boolean => {
    if (board[row][col] !== undefined) {
      return false;
    }
    if (
      !checkMakeable({
        board,
        row,
        col,
        currentPlayer,
      })
    ) {
      return false;
    }
    const newBoard = reverse({ board, row, col, currentPlayer });
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === Disc.black ? Disc.white : Disc.black);
    return true;
  };

  /**
   * リセット
   */
  const reset = () => {
    setBoard(initialBoard);
    setCurrentPlayer(Disc.black);
    setWinner(undefined);
    setPassCount(0);
  };

  // boardが変化したときの処理
  useEffect(() => {
    if (
      !checkMakeableAll({
        board,
        currentPlayer,
      })
    ) {
      if (passCount === 1) {
        setWinner(Winner.draw);
      }
      setCurrentPlayer(currentPlayer === Disc.black ? Disc.white : Disc.black);
      setPassCount(passCount + 1);
    } else {
      setPassCount(0);
    }
    const newWinner = checkWinner(board);
    setWinner(newWinner);
  }, [discCount(board), passCount]);

  // 勝者が変化したときの処理
  useEffect(() => {
    switch (winner) {
      case Winner.black:
        // eslint-disable-next-line no-alert
        alert("黒の勝ちです");
        break;
      case Winner.white:
        // eslint-disable-next-line no-alert
        alert("白の勝ちです");
        break;
      case Winner.draw:
        // eslint-disable-next-line no-alert
        alert("引き分けです");
        break;
      default:
        break;
    }
    reset();
  }, [winner]);

  const checkMakeableWrapper = (row: number, col: number) =>
    checkMakeable({
      board,
      row,
      col,
      currentPlayer,
    });

  return {
    board,
    currentPlayer,
    makeMove,
    checkMakeable: checkMakeableWrapper,
    reset,
  };
};
