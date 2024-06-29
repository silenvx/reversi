import { useCallback, useState } from "react";

import { DiscType, Disc } from "@/domains/reversi/const";
import { SkillCard } from "@/domains/reversi/skillcard";
import { useDeckContext } from "@/hooks/deckContext";

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
   * @param {number} score ユーザーの優勢度
   * @type {*}
   */
  const drawCardForPlayer = useCallback(
    (player: DiscType, score: number) => {
      const card = drawCard(score);
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
  const discardCard = useCallback(
    (player: DiscType, cardId: string) => {
      if (player === Disc.black) {
        setBlackHands((prev) => prev.filter((card) => card.id !== cardId));
      } else {
        setWhiteHands((prev) => prev.filter((card) => card.id !== cardId));
      }
    },
    [blackHands, whiteHands],
  );

  const addCard = useCallback(
    (player: DiscType, card: SkillCard) => {
      if (player === Disc.black) {
        setBlackHands([...blackHands, card]);
      } else {
        setWhiteHands([...whiteHands, card]);
      }
    },
    [blackHands, whiteHands],
  );

  /**
   * ユーザーがカードをプレイする
   * @param {DiscType} player ユーザー
   * @param {SkillCard} selectedCard 選択されたカード
   * @param {ReversiGameType} game ゲームboard
   * @type {*}
   */

  return { blackHands, whiteHands, drawCardForPlayer, discardCard, addCard };
};
