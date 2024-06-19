import { useState, useCallback } from "react";

import { SkillCard } from "@/domains/reversi/skillcard";

const cardlist: SkillCard[] = [
  {
    name: "test",
    description: "test",
    id: 1,
    effect: 1,
    execute: (game) => {
      game.makeMove(1, 1);
    },
  },
];

export const useDeck = () => {
  const [cards, setCards] = useState<SkillCard[]>(cardlist);
  const drawCard = useCallback(
    (adv: number): SkillCard | null => {
      if (cards.length === 0) {
        return null;
      }
      // TODO:ここは優勢劣勢によってカードの引き方を変える
      const card = cards[adv];
      setCards(cards.filter((c) => c.id !== card.id));
      return card;
    },
    [cards],
  );
  return { cards, drawCard };
};
