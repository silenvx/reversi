// コマの定数
export const Disc = {
  black: "black",
  white: "white",
  empty: undefined,
};
export type DiscType = (typeof Disc)[keyof typeof Disc];

// 勝ち負けの定数
export const Winner = {
  black: "black",
  white: "white",
  draw: "draw",
  undefined,
};
export type WinnerType = (typeof Winner)[keyof typeof Winner];

// 重みづけオセロボード
export const weightedBoard: number[][] = [
  [30, -12, 0, -1, -1, 0, -12, 30],
  [-12, -15, -3, -3, -3, -3, -15, -12],
  [0, -3, 0, -1, -1, 0, -3, 0],
  [-1, 3, -1, -1, -1, -1, -3, -1],
  [-1, 3, -1, -1, -1, -1, -3, -1],
  [0, -3, 0, -1, -1, 0, -3, 0],
  [-12, -15, -3, -3, -3, -3, -15, -12],
  [30, -12, 0, -1, -1, 0, -12, 30],
];
