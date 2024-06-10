import { configReversi } from "@/config/reversi";
import {
  checkMakeable,
  checkMakeableAll,
  checkWinner,
  copyBoard,
  createBoard,
  discCount,
  reverse,
} from "@/domains/reversi/compute";
import { Disc, Winner } from "@/domains/reversi/const";

describe("createBoard", () => {
  it("boardXとboardYの2次元配列が生成される", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });
    expect(board.length).toBe(8);
    expect(board[0].length).toBe(8);
  });
});

describe("copyBoard", () => {
  it("盤面がディープコピーされる", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });
    const copiedBoard = copyBoard(board);
    expect(board).toEqual(copiedBoard);
    expect(board).not.toBe(copiedBoard);
  });
});

describe("discCount", () => {
  it("盤面のコマの数を返す", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });
    board[0][0] = Disc.black;
    board[0][1] = Disc.black;
    board[0][4] = Disc.black;
    board[2][3] = Disc.black;

    board[0][2] = Disc.white;
    board[0][3] = Disc.white;
    board[3][3] = Disc.white;
    board[4][3] = Disc.white;
    board[6][3] = Disc.white;
    const [blackCount, whiteCount] = discCount(board);
    expect(blackCount).toBe(4);
    expect(whiteCount).toBe(5);
  });
});

describe("checkWinner", () => {
  it("黒の勝ち", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });

    for (let i = 0; i < configReversi.boardX; i += 1) {
      for (let j = 0; j < configReversi.boardY; j += 1) {
        board[i][j] = Disc.black;
      }
    }
    const winner = checkWinner(board);
    expect(winner).toBe(Winner.black);
  });

  it("白の勝ち", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });

    for (let i = 0; i < configReversi.boardX; i += 1) {
      for (let j = 0; j < configReversi.boardY; j += 1) {
        board[i][j] = Disc.white;
      }
    }
    const winner = checkWinner(board);
    expect(winner).toBe(Winner.white);
  });

  it("引き分け", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });

    for (let i = 0; i < configReversi.boardX; i += 1) {
      for (let j = 0; j < configReversi.boardY; j += 1) {
        board[i][j] = i % 2 === 0 ? Disc.black : Disc.white;
      }
    }
    const winner = checkWinner(board);
    expect(winner).toBe(Winner.draw);
  });

  it("まだ置いていない場所がある", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });

    for (let i = 0; i < configReversi.boardX; i += 1) {
      for (let j = 0; j < configReversi.boardY; j += 1) {
        board[i][j] = i % 2 === 0 ? Disc.black : Disc.white;
      }
    }
    board[0][0] = Disc.empty;
    const winner = checkWinner(board);
    expect(winner).toBe(undefined);
  });
});

describe("checkMakeable", () => {
  it("置ける場所を指定する", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });
    board[3][3] = Disc.white;
    board[4][4] = Disc.white;
    board[3][4] = Disc.black;
    board[4][3] = Disc.black;
    const result = checkMakeable({
      board,
      row: 2,
      col: 3,
      currentPlayer: Disc.black,
    });
    expect(result).toBe(true);
  });

  it("置けない場所を指定する", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });
    board[3][3] = Disc.white;
    board[4][4] = Disc.white;
    board[3][4] = Disc.black;
    board[4][3] = Disc.black;
    const result = checkMakeable({
      board,
      row: 0,
      col: 0,
      currentPlayer: Disc.black,
    });
    expect(result).toBe(false);
  });

  it("すでにコマが置かれている場所を指定する", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });
    board[3][3] = Disc.white;
    board[4][4] = Disc.white;
    board[3][4] = Disc.black;
    board[4][3] = Disc.black;
    const result = checkMakeable({
      board,
      row: 3,
      col: 3,
      currentPlayer: Disc.black,
    });
    expect(result).toBe(false);
  });
});

describe("checkMakeableAll", () => {
  it("すべての場所を確認する", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });
    board[3][3] = Disc.white;
    board[4][4] = Disc.white;
    board[3][4] = Disc.black;
    board[4][3] = Disc.black;
    const result = checkMakeableAll({
      board,
      currentPlayer: Disc.black,
    });
    expect(result).toBe(true);
  });

  it("置ける場所がない", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });
    board[3][3] = Disc.black;
    board[4][4] = Disc.black;
    board[3][4] = Disc.black;
    board[4][3] = Disc.black;
    const result = checkMakeableAll({
      board,
      currentPlayer: Disc.black,
    });
    expect(result).toBe(false);
  });
});

describe("reverse", () => {
  it("石をひっくり返す", () => {
    const board = createBoard({ boardX: 8, boardY: 8 });
    board[3][3] = Disc.white;
    board[4][4] = Disc.white;
    board[3][4] = Disc.black;
    board[4][3] = Disc.black;
    const newBoard = reverse({
      board,
      row: 2,
      col: 3,
      currentPlayer: Disc.black,
    });
    expect(newBoard[2][3]).toBe(Disc.black);
    expect(newBoard[3][3]).toBe(Disc.black);
    expect(newBoard[4][3]).toBe(Disc.black);
    expect(newBoard[3][4]).toBe(Disc.black);
    expect(newBoard[4][4]).toBe(Disc.white);
  });
});
