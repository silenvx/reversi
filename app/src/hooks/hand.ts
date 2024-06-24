import { useCallback, useState } from "react";

import { DiscType, Disc } from "@/domains/reversi/const";
import { SkillCard } from "@/domains/reversi/skillcard";
import { useDeckContext } from "@/hooks/deckContext";
import { ReversiGameType } from "@/hooks/reversiGame";

/**
 * ユーザーの手札を管理するフック
 *
 * @returns {{ blackHands: any; whiteHands: any; drawCardForPlayer: any; playCard: any; }}
 */
export const useHands = () => {
  const { drawCard } = useDeckContext();
  const [blackHands, setBlackHands] = useState<SkillCard[]>([]);
  const [whiteHands, setWhiteHands] = useState<SkillCard[]>([]);

  /**
   * ユーザーがカードを山札から引き、手札に加える
   * @param {DiscType} player ユーザー
   * @param {number} adv ユーザーの優勢度
   * @type {*}
   */
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

  /**
   * ユーザーがカードをプレイする
   * @param {DiscType} player ユーザー
   * @param {SkillCard} selectedCard 選択されたカード
   * @param {ReversiGameType} game ゲームboard
   * @type {*}
   */
  const playCard = useCallback(
    (player: DiscType, selectedCard: SkillCard, game: ReversiGameType) => {
      if (selectedCard.execute(game)) {
        if (player === Disc.black) {
          setBlackHands((prev) => prev.filter((c) => c.id !== selectedCard.id));
        } else {
          setWhiteHands((prev) => prev.filter((c) => c.id !== selectedCard.id));
        }
      }
    },
    [],
  );

  return { blackHands, whiteHands, drawCardForPlayer, playCard };
};
