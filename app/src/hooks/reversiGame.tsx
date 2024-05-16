import { useState, useEffect } from "react";

export type DiscKind = "black" | "white" | undefined;

export const useReversiGame = () => {
  const initialBoard = [...Array(8)].map(() =>
    Array(8).fill(undefined as DiscKind),
  );

  initialBoard[3][3] = "white";
  initialBoard[4][4] = "white";
  initialBoard[3][4] = "black";
  initialBoard[4][3] = "black";

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<DiscKind>("black");
  const [winner, setWinner] = useState<DiscKind>(undefined);

  const checkWinner = () => {
    // 勝者の判定ロジックをここに追加
  };

  const checkMakeable = (row: number, col: number): boolean => {
    // 石を置けるかどうかの判定ロジックをここに追加
    return true;
  };

  const makeMove = (row: number, col: number): boolean => {
    if (board[row][col] != undefined) {
      return false;
    }
    if (!checkMakeable(row, col)) {
      return false;
    }
    board[row][col] = currentPlayer;
    setBoard(board);
    setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
    return true;
  };

  useEffect(() => {
    checkWinner();
  }, [board]);

  return { board, currentPlayer, winner, makeMove };
};
