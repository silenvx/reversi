import { useState, useEffect } from "react";

export const Disc = {
  black: "black",
  white: "white",
  empty: undefined,
};
export type DiscType = (typeof Disc)[keyof typeof Disc];

export const Winner = {
  black: "black",
  white: "white",
  draw: "draw",
};
export type WinnerType = (typeof Winner)[keyof typeof Winner];

export type ReversiGameType = {
  board: DiscType[][];
  currentPlayer: DiscType;
  makeMove: (row: number, col: number) => boolean;
  checkMakeable: (row: number, col: number) => boolean;
  reset: () => void;
};

export const useReversiGame = (): ReversiGameType => {
  // 盤面の大きさ
  const boardX = 8;
  const boardY = 8;

  // 調べるマスの方向
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

  const initialBoard: DiscType[][] = [...Array(boardX)].map(() =>
    Array(boardY).fill(Disc.empty as DiscType),
  );

  initialBoard[3][3] = Disc.white;
  initialBoard[4][4] = Disc.white;
  initialBoard[3][4] = Disc.black;
  initialBoard[4][3] = Disc.black;

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<DiscType>(Disc.black);
  const [winner, setWinner] = useState<WinnerType | undefined>(undefined);
  const [passCount, setPassCount] = useState(0);

  const discCount = (): [number, number] => {
    let blackCount = 0;
    let whiteCount = 0;
    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell === Disc.black) {
          blackCount += 1;
        } else if (cell === Disc.white) {
          whiteCount += 1;
        }
      });
    });
    return [blackCount, whiteCount];
  };

  const checkWinner = () => {
    const [blackCount, whiteCount] = discCount();
    if (blackCount + whiteCount === boardX * boardY) {
      if (blackCount > whiteCount) {
        setWinner(Winner.black);
      } else if (blackCount < whiteCount) {
        setWinner(Winner.white);
      } else {
        setWinner(undefined);
      }
    }
  };

  // 石を置けるかどうかの判定
  const checkMakeable = (row: number, col: number): boolean => {
    if (board[row][col] !== Disc.empty) {
      return false;
    }
    // 8方向に対して石をひっくり返せるかどうかを判定
    let makeable = false;
    directions.forEach(([dx, dy]) => {
      let x = row + dx;
      let y = col + dy;
      let canReverse = false;
      while (x >= 0 && x < boardX && y >= 0 && y < boardY) {
        if (board[x][y] === Disc.empty) {
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
    for (let i = 0; i < boardX; i += 1) {
      for (let j = 0; j < boardY; j += 1) {
        if (checkMakeable(i, j)) {
          return true;
        }
      }
    }
    return false;
  };

  // 石をひっくり返す処理
  const reverse = (row: number, col: number) => {
    directions.forEach(([dx, dy]) => {
      let x = row + dx;
      let y = col + dy;
      let canReverse = false;
      while (x >= 0 && x < boardX && y >= 0 && y < boardY) {
        if (board[x][y] === Disc.empty) {
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
    if (board[row][col] !== undefined) {
      return false;
    }
    if (!checkMakeable(row, col)) {
      return false;
    }
    board[row][col] = currentPlayer;
    reverse(row, col);
    setBoard(board);
    setCurrentPlayer(currentPlayer === Disc.black ? Disc.white : Disc.black);
    return true;
  };

  const reset = () => {
    setBoard(initialBoard);
    setCurrentPlayer(Disc.black);
    setWinner(undefined);
    setPassCount(0);
  };

  // boardが変化したときの処理
  useEffect(() => {
    if (!checkMakeableAll()) {
      if (passCount === 1) {
        setWinner(Winner.draw);
      }
      setCurrentPlayer(currentPlayer === Disc.black ? Disc.white : Disc.black);
      setPassCount(passCount + 1);
    } else {
      setPassCount(0);
    }
    checkWinner();
  }, [discCount(), passCount]);

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

  return {
    board,
    currentPlayer,
    makeMove,
    checkMakeable,
    reset,
  };
};
