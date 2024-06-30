// コマの定数
export const Disc = {
  black: "black", // 赤
  white: "white", // 青
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

export const SkillState = {
  Highlight: "highlight",
};

export type SkillStateType = (typeof SkillState)[keyof typeof SkillState];
