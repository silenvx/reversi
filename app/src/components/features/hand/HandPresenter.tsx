import { CardContainer } from "@/components/features/card/CardContainer";
import { DiscType } from "@/domains/reversi/const";
import { SkillCard } from "@/domains/reversi/skillcard";
import { ReversiGameType } from "@/hooks/reversiGame";

type HandPresenterProps = {
  reversiGame: ReversiGameType;
  player: DiscType;
  hands: SkillCard[];
  playCard: (
    player: DiscType,
    cardId: SkillCard,
    game: ReversiGameType,
  ) => void;
};

export function HandPresenter({
  reversiGame,
  player,
  hands,
  playCard,
}: HandPresenterProps) {
  return (
    <div className="flex w-full justify-between">
      {hands.map((hand) => (
        <CardContainer
          key={hand.id}
          reversiGame={reversiGame}
          player={player}
          hand={hand}
          playCard={playCard}
        />
      ))}
    </div>
  );
}
