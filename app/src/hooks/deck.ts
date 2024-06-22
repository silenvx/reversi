import { useState, useCallback } from "react";

import { SkillCard } from "@/domains/reversi/skillcard";

// スキルの実装はいったん適当
const cardlist: SkillCard[] = [
  {
    name: "ゲームリセット",
    description: "ゲームをリセットします。",
    id: 1,
    effect: 60,
    execute: (game) => {
      game.reset();
    },
  },
  {
    name: "ランダム配置",
    description: "ランダムに配置します",
    id: 2,
    effect: 20,
    execute: (game) => {
      for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          if (game.makeMove(i, j)) {
            return;
          }
        }
      }
    },
  },
];

/**
 * 山札のカスタムフック
 * @param cards 山札のカード
 * @function drawCard カードを山札から引く関数
 * @returns {{ cards: any; drawCard: any; }}
 */
export const useDeck = () => {
  const [cards, setCards] = useState<SkillCard[]>(cardlist);

  /**
   * カードを引く
   * @param {number} adv 引くユーザーの優勢度
   * @type {SkillCard | null} カード or null(山札がない場合)
   */
  const drawCard = useCallback(
    (adv: number): SkillCard | null => {
      if (cards.length === 0) {
        return null;
      }

      // TODO : もうちょっと優劣によるカードの選択を考える
      let cardcandidates = cards;
      if (adv < 0) {
        cardcandidates = cards.filter((c) => c.effect < 50);
      } else {
        cardcandidates = cards.filter((c) => c.effect >= 50);
      }

      if (cardcandidates.length === 0) {
        cardcandidates = cards;
      }
      const drawedCard =
        cardcandidates[Math.floor(Math.random() * cardcandidates.length)];
      setCards(cards.filter((c) => c.id !== drawedCard.id));
      return drawedCard;
    },
    [cards],
  );
  return { cards, drawCard };
};
