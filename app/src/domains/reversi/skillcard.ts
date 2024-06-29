/**
 * スキルカード
 *
 * @export
 * @interface SkillCard
 * @typedef {SkillCard}
 * @property {string} name スキルカードの名前
 * @property {string} description スキルカードの効果説明文
 * @property {string} id スキルカードのID
 * @property {number} effect スキルカードの影響度合い
 * @property {(game: ReversiGameType) => void} execute スキルカードの効果を実行する関数
 */
export interface SkillCard {
  name: string;
  description: string;
  id: string;
  effect: number;
}

export const defaultSkillCards: SkillCard[] = [
  {
    name: "相手のカードを1枚捨てる",
    description: "相手の手札を1枚捨てる",
    id: "discardOpponentCard",
    effect: 1,
  },
  {
    name: "リセット",
    description: "ゲームをリセットする",
    id: "Reset",
    effect: 1,
  },
  {
    name: "ランダムに置く",
    description: "ランダムな場所に石を置く",
    id: "makeRamdom",
    effect: 1,
  },
  {
    name: "タイムリープ",
    description: "1ターン前に戻る",
    id: "timeLeap",
    effect: 1,
  },
  {
    name: "相手のカードを1枚奪う",
    description: "相手の手札を1枚奪う",
    id: "stealOpponentCard",
    effect: 1,
  },
  {
    name: "ライトアップ",
    description: "石を置ける場所を表示する",
    id: "lightup",
    effect: 1,
  },
];
