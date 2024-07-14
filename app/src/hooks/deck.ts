import { useState, useCallback } from "react";

import { SkillCard, defaultSkillCards } from "@/domains/reversi/skillcard";

// スキルの実装はいったん適当
const cardlist: SkillCard[] = defaultSkillCards;
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

  const resetDeck = () => setCards(cardlist);
  return { cards, drawCard, resetDeck };
};
