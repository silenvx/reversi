import { CardPresenter } from "@/components/features/card/CardPresenter";
import { DiscType } from "@/domains/reversi/const";
import { SkillCard } from "@/domains/reversi/skillcard";
import { ReversiGameType } from "@/hooks/reversiGame";

type CardContainerProps = {
  reversiGame: ReversiGameType;
  player: DiscType;
  hand: SkillCard;
  playCard: (
    player: DiscType,
    cardId: SkillCard,
    game: ReversiGameType,
  ) => void;
};

export function CardContainer({
  reversiGame,
  player,
  hand,
  playCard,
}: CardContainerProps) {
  return (
    <CardPresenter
      reversiGame={reversiGame}
      player={player}
      hand={hand}
      playCard={playCard}
    />
  );
}
