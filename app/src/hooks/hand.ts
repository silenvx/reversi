import { useCallback, useState } from "react";

import { DiscType, Disc } from "@/domains/reversi/const";
import { SkillCard } from "@/domains/reversi/skillcard";
import { useDeckContext } from "@/hooks/deckContext";
import { ReversiGameType } from "@/hooks/reversiGame";

export const useHands = () => {
  const { drawCard } = useDeckContext();
  const [blackHands, setBlackHands] = useState<SkillCard[]>([]);
  const [whiteHands, setWhiteHands] = useState<SkillCard[]>([]);

  const drawCardForPlayer = useCallback(
    (player: DiscType, adv: number) => {
      const card = drawCard(adv);
      if (card == null) {
        return;
      }
      if (player === Disc.black) {
        setBlackHands([...blackHands, card]);
      } else {
        setWhiteHands([...whiteHands, card]);
      }
    },
    [drawCard],
  );

  const playCard = useCallback(
    (player: DiscType, selectedCard: SkillCard, game: ReversiGameType) => {
      selectedCard.execute(game);
      const card = player === Disc.black ? blackHands : whiteHands;
      const newHands = card.filter((c) => c.id !== selectedCard.id);
      if (player === Disc.black) {
        setBlackHands(newHands);
      } else {
        setWhiteHands(newHands);
      }
    },
    [],
  );
  return { blackHands, whiteHands, drawCardForPlayer, playCard };
};
