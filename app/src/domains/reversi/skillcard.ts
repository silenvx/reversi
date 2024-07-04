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

/**
 * スキルID
 *
 * @type {{ discardOpponentCard: string; Reset: string; makeRandom: string; timeLeap: string; stealOpponentCard: string; lightup: string; }}
 */
export const SkillID = {
  discardOpponentCard: "discardOpponentCard",
  reset: "reset",
  makeRandom: "makeRandom",
  timeLeap: "timeLeap",
  stealOpponentCard: "stealOpponentCard",
  lightup: "lightUp",
};

/**
 * スキルIDの型
 *
 * @export
 * @typedef {SkillIDType}
 */
export type SkillIDType = (typeof SkillID)[keyof typeof SkillID];
export interface SkillCard {
  name: string;
  description: string;
  id: SkillIDType;
  effect: number;
}

/**
 * デフォルトのスキルカード
 */
export const defaultSkillCards: SkillCard[] = [
  {
    name: "相手のカードを1枚捨てる",
    description: "相手の手札を1枚捨てる",
    id: SkillID.discardOpponentCard,
    effect: 1,
  },
  {
    name: "リセット",
    description: "ゲームをリセットする",
    id: SkillID.reset,
    effect: 1,
  },
  {
    name: "ランダムに置く",
    description: "ランダムな場所に石を置く",
    id: SkillID.makeRandom,
    effect: 1,
  },
  {
    name: "タイムリープ",
    description: "1ターン前に戻る",
    id: SkillID.timeLeap,
    effect: 1,
  },
  {
    name: "相手のカードを1枚奪う",
    description: "相手の手札を1枚奪う",
    id: SkillID.stealOpponentCard,
    effect: 1,
  },
  {
    name: "ライトアップ",
    description: "石を置ける場所を表示する",
    id: SkillID.lightup,
    effect: 1,
  },
];
