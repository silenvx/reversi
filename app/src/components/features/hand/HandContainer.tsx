import { HandPresenter } from "@/components/features/hand/HandPresenter";
import { Disc, DiscType } from "@/domains/reversi/const";
import { ExecuteSkillCard } from "@/domains/reversi/skillExecutor";
import { SkillCard } from "@/domains/reversi/skillcard";
import { useHandContext } from "@/hooks/handContext";
import { ReversiGameType } from "@/hooks/reversiGame";
import { useSkills } from "@/hooks/reversiSkill";

type HandContainerProps = {
  reversiGame: ReversiGameType;
  player: DiscType;
};

export function HandContainer({ reversiGame, player }: HandContainerProps) {
  const handsContext = useHandContext();
  const skills = useSkills();
  const playCardWithExecutor = (
    currentplayer: DiscType,
    card: SkillCard,
    game: ReversiGameType,
  ) => {
    if (currentplayer !== game.currentPlayer) {
      return;
    }
    if (ExecuteSkillCard(card.id, game, handsContext, skills)) {
      handsContext.discardCard(player, card.id);
    }
  };

  const hands =
    player === Disc.black ? handsContext.blackHands : handsContext.whiteHands;
  return (
    <HandPresenter
      reversiGame={reversiGame}
      player={player}
      hands={hands}
      playCard={playCardWithExecutor}
    />
  );
}
