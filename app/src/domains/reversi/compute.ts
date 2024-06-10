import { configReversi } from "@/config/reversi";
import { DiscType, Disc, WinnerType, Winner } from "@/domains/reversi/const";

// 調べるマスの方向
export const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

type CreateBoardProps = {
  boardX: number;
  boardY: number;
};

/**
 * 新しい盤面を作成する
 * @param {CreateBoardProps} props
 * @param {number} props.boardX 盤面のx方向の大きさ
 * @param {number} props.boardY 盤面のy方向の大きさ
 * @returns {DiscType[][]} 新しい盤面
 */
export const createBoard = ({
  boardX,
  boardY,
}: CreateBoardProps = configReversi): DiscType[][] =>
  [...Array(boardX)].map(() => Array(boardY).fill(Disc.empty as DiscType));

/**
 * 盤面をコピーする
 * @param {DiscType[][]} board リバーシの盤面
 * @returns {DiscType[][]} 新しい盤面
 */
export const copyBoard = (board: DiscType[][]): DiscType[][] =>
  board.map((row) => [...row]);

/**
 * 盤面のコマの数を数える
 * @param {DiscType[][]} board リバーシの盤面
 * @returns {[number, number]} [blackCount, whiteCount] 黒と白のコマの数
 */
export const discCount = (board: DiscType[][]): [number, number] => {
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

/**
 * 勝者を判定する
 * @param {DiscType[][]} board リバーシの盤面
 * @returns {WinnerType} 勝者
 */
export const checkWinner = (board: DiscType[][]): WinnerType => {
  const [blackCount, whiteCount] = discCount(board);
  if (blackCount + whiteCount !== configReversi.boardX * configReversi.boardY) {
    return undefined;
  }
  if (blackCount > whiteCount) {
    return Winner.black;
  }
  if (blackCount < whiteCount) {
    return Winner.white;
  }
  if (blackCount === whiteCount) {
    return Winner.draw;
  }
  return undefined;
};

type CheckMakeableProps = {
  board: DiscType[][];
  row: number;
  col: number;
  currentPlayer: DiscType;
};

/**
 * 石を置けるかどうかの判定
 * @param {CheckMakeableProps} props
 * @param {DiscType[][]} props.board リバーシの盤面
 * @param {number} props.row 置く行
 * @param {number} props.col 置く列
 * @param {DiscType} props.currentPlayer 現在のプレイヤー
 * @returns {boolean} 石を置けるかどうか
 * */
export const checkMakeable = ({
  board,
  row,
  col,
  currentPlayer,
}: CheckMakeableProps): boolean => {
  if (board[row][col] !== Disc.empty) {
    return false;
  }
  // 8方向に対して石をひっくり返せるかどうかを判定
  let makeable = false;
  directions.forEach(([dx, dy]) => {
    let x = row + dx;
    let y = col + dy;
    let canReverse = false;
    while (
      x >= 0 &&
      x < configReversi.boardX &&
      y >= 0 &&
      y < configReversi.boardY
    ) {
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

type CheckMakeableAllProps = {
  board: DiscType[][];
  currentPlayer: DiscType;
};

/**
 * どこかに石を置けるかどうかの判定
 * @param {CheckMakeableAllProps} props
 * @param {DiscType[][]} props.board リバーシの盤面
 * @param {DiscType} props.currentPlayer 現在のプレイヤー
 * @returns {boolean} 石を置けるかどうか
 */
export const checkMakeableAll = ({
  board,
  currentPlayer,
}: CheckMakeableAllProps): boolean => {
  for (let i = 0; i < configReversi.boardX; i += 1) {
    for (let j = 0; j < configReversi.boardY; j += 1) {
      if (
        checkMakeable({
          board,
          row: i,
          col: j,
          currentPlayer,
        })
      ) {
        return true;
      }
    }
  }
  return false;
};

type ReverseProps = {
  board: DiscType[][];
  row: number;
  col: number;
  currentPlayer: DiscType;
};

/**
 * 石をひっくり返す処理
 * @param {ReverseProps} props
 * @param {DiscType[][]} props.board リバーシの盤面
 * @param {number} props.row 置く行
 * @param {number} props.col 置く列
 * @param {DiscType} props.currentPlayer 現在のプレイヤー
 * @returns {DiscType[][]} 新しい盤面
 */
export const reverse = ({
  board,
  row,
  col,
  currentPlayer,
}: ReverseProps): DiscType[][] => {
  const newBoard = copyBoard(board);
  newBoard[row][col] = currentPlayer;

  directions.forEach(([dx, dy]) => {
    let x = row + dx;
    let y = col + dy;
    let canReverse = false;
    while (
      x >= 0 &&
      x < configReversi.boardX &&
      y >= 0 &&
      y < configReversi.boardY
    ) {
      if (board[x][y] === Disc.empty) {
        break;
      }
      if (board[x][y] === currentPlayer) {
        if (canReverse) {
          let nx = row + dx;
          let ny = col + dy;
          while (nx !== x || ny !== y) {
            newBoard[nx][ny] = currentPlayer;
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
  return newBoard;
};
