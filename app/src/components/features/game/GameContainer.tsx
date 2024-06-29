import { useEffect } from "react";

import { GamePresenter } from "@/components/features/game/GamePresenter";
import { DiscType, Winner } from "@/domains/reversi/const";
import { ExecuteSkillCard } from "@/domains/reversi/skillExecutor";
import { SkillCard } from "@/domains/reversi/skillcard";
import { useHandContext } from "@/hooks/handContext";
import { ReversiGameType, useReversiGame } from "@/hooks/reversiGame";
import { useSkills } from "@/hooks/reversiSkill";

export function GameContainer() {
  const reversiGame = useReversiGame();
  const handContext = useHandContext();
  const reversiSkill = useSkills();

  const playCardWithExecutor = (
    player: DiscType,
    card: SkillCard,
    game: ReversiGameType,
  ) => {
    if (ExecuteSkillCard(card.id, game, handContext, reversiSkill)) {
      handContext.discardCard(player, card.id);
    }
  };

  // 勝者が決まったらアラートを表示してリセット
  useEffect(() => {
    switch (reversiGame.winner) {
      case Winner.black:
        // eslint-disable-next-line no-alert
        alert("黒の勝ちです");
        break;
      case Winner.white:
        // eslint-disable-next-line no-alert
        alert("白の勝ちです");
        break;
      case Winner.draw:
        // eslint-disable-next-line no-alert
        alert("引き分けです");
        break;
      default:
        break;
    }
    reversiGame.reset();
  }, [reversiGame.winner]);

  return (
    <GamePresenter
      reversiGame={reversiGame}
      whiteHands={handContext.whiteHands}
      blackHands={handContext.blackHands}
      drawCardForPlayer={handContext.drawCardForPlayer}
      playCard={playCardWithExecutor}
    />
  );
}
