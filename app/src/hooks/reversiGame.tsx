import { useState, useEffect } from "react";

export type DiscKind = "black" | "white" | undefined;

export type ReversiGameType = {
  board: DiscKind[][];
  currentPlayer: DiscKind;
  makeMove: (row: number, col: number) => boolean;
  checkMakeable: (row: number, col: number) => boolean;
  reset: () => void;
  debug: () => void;
};

export const useReversiGame = (): ReversiGameType => {
  const initialBoard = [...Array(8)].map(() =>
    Array(8).fill(undefined as DiscKind),
  );

  initialBoard[3][3] = "white";
  initialBoard[4][4] = "white";
  initialBoard[3][4] = "black";
  initialBoard[4][3] = "black";

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<DiscKind>("black");
  const [winner, setWinner] = useState<DiscKind | "draw">(undefined);
  const [passCount, setPassCount] = useState(0);

  const discCount = (): [number, number] => {
    let blackCount = 0;
    let whiteCount = 0;
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell === "black") {
          blackCount++;
        } else if (cell === "white") {
          whiteCount++;
        }
      });
    });
    return [blackCount, whiteCount];
  };

  const checkWinner = () => {
    const [blackCount, whiteCount] = discCount();
    if (blackCount + whiteCount === 64) {
      if (blackCount > whiteCount) {
        setWinner("black");
      } else if (blackCount < whiteCount) {
        setWinner("white");
      } else {
        setWinner(undefined);
      }
    }
  };

  // 石を置けるかどうかの判定
  const checkMakeable = (row: number, col: number): boolean => {
    if (board[row][col] != undefined) {
      return false;
    }
    // 8方向に対して石をひっくり返せるかどうかを判定
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let makeable = false;
    directions.forEach(([dx, dy]) => {
      let x = row + dx;
      let y = col + dy;
      let canReverse = false;
      while (0 <= x && x < 8 && 0 <= y && y < 8) {
        if (board[x][y] === undefined) {
          break;
        }
        if (board[x][y] === currentPlayer) {
          if (canReverse) {
            makeable = true;
          }
          break;
        }
        canReverse = true;
        x += dx;
        y += dy;
      }
    });
    return makeable;
  };

  const checkMakeableAll = (): boolean => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (checkMakeable(i, j)) {
          return true;
        }
      }
    }
    return false;
  };

  // 石をひっくり返す処理
  const reverse = (row: number, col: number) => {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    directions.forEach(([dx, dy]) => {
      let x = row + dx;
      let y = col + dy;
      let canReverse = false;
      while (0 <= x && x < 8 && 0 <= y && y < 8) {
        if (board[x][y] === undefined) {
          break;
        }
        if (board[x][y] === currentPlayer) {
          if (canReverse) {
            let nx = row + dx;
            let ny = col + dy;
            while (nx !== x || ny !== y) {
              board[nx][ny] = currentPlayer;
              nx += dx;
              ny += dy;
            }
          }
          break;
        }
        canReverse = true;
        x += dx;
        y += dy;
      }
    });
    return board;
  };

  const makeMove = (row: number, col: number): boolean => {
    if (board[row][col] != undefined) {
      return false;
    }
    if (!checkMakeable(row, col)) {
      return false;
    }
    board[row][col] = currentPlayer;
    reverse(row, col);
    setBoard(board);
    setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
    return true;
  };

  const reset = () => {
    setBoard(initialBoard);
    setCurrentPlayer("black");
    setWinner(undefined);
    setPassCount(0);
  };

  // パスの動作を確認するためのboardを生成
  const setPassBoard = () => {
    const initialBoard = [...Array(8)].map(() =>
      Array(8).fill(undefined as DiscKind),
    );
    initialBoard[3][3] = "black";
    initialBoard[4][4] = "white";
    initialBoard[3][4] = "black";
    initialBoard[4][3] = "black";

    initialBoard[3][2] = "black";
    initialBoard[4][5] = "white";
    initialBoard[4][6] = "white";

    initialBoard[5][5] = "white";

    initialBoard[6][3] = "black";

    initialBoard[6][4] = "black";
    initialBoard[6][5] = "black";
    initialBoard[6][6] = "black";
    initialBoard[6][6] = "black";
    initialBoard[6][7] = "black";

    initialBoard[7][7] = "white";
    setBoard(initialBoard);
  };

  // boardが変化したときの処理
  useEffect(() => {
    if (!checkMakeableAll()) {
      if (passCount === 1) {
        setWinner("draw");
      }
      setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
      setPassCount(passCount + 1);
    } else {
      setPassCount(0);
    }
    checkWinner();
  }, [discCount(), passCount]);

  useEffect(() => {
    switch (winner) {
      case "black":
        alert("黒の勝ちです");
        break;
      case "white":
        alert("白の勝ちです");
        break;
      case "draw":
        alert("引き分けです");
        break;
    }
    reset();
  }, [winner]);

  return {
    board,
    currentPlayer,
    makeMove,
    checkMakeable,
    reset,
    debug: () => {
      setPassBoard();
    },
  };
};
