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
