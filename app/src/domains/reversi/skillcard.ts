import { ReversiGameType } from "@/hooks/reversiGame";

/**
 * スキルカード
 *
 * @export
 * @interface SkillCard
 * @typedef {SkillCard}
 * @property {string} name スキルカードの名前
 * @property {string} description スキルカードの効果説明文
 * @property {number} id スキルカードのID(使うかは不明)
 * @property {number} effect スキルカードの影響度合い
 * @property {(game: ReversiGameType) => void} execute スキルカードの効果を実行する関数
 */
export interface SkillCard {
  name: string;
  description: string;
  id: number;
  effect: number;
  execute: (game: ReversiGameType) => void;
}
