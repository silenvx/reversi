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
  execute: (game: ReversiGameType) => boolean;
}

export function createInitialSkillCard(): SkillCard[] {
  return [
    {
      name: "タイムリープ",
      description: "前の自身の手番からやり直せます",
      id: 1,
      effect: 60,
      execute: (game): boolean => game.revertMove(2),
    },
    {
      name: "ランダム配置",
      description: "ランダムに配置します",
      id: 2,
      effect: 20,
      execute: (game): boolean => {
        for (let i = 0; i < 8; i += 1) {
          for (let j = 0; j < 8; j += 1) {
            if (game.makeMove(i, j)) {
              return true;
            }
          }
        }
        return false;
      },
    },
    {
      name: "Reset",
      description: "リセットします",
      id: 3,
      effect: 100,
      execute: (game): boolean => {
        game.reset();
        return true;
      },
    },
  ];
}
