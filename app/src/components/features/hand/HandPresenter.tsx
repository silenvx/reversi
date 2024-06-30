import { CardContainer } from "@/components/features/card/CardContainer";
import { DiscType } from "@/domains/reversi/const";
import { SkillCard } from "@/domains/reversi/skillcard";
import { ReversiGameType } from "@/hooks/reversiGame";

type HandPresenterProps = {
  reversiGame: ReversiGameType;
  player: DiscType;
  hands: SkillCard[];
  drawCardForPlayer: (player: DiscType, adv: number) => void;
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
  drawCardForPlayer,
  playCard,
}: HandPresenterProps) {
  return (
    <>
      {/* TODO: ドローする仕組みができるまで一旦ここにドローボタンを置く */}
      <button
        className="text-white"
        type="button"
        // TODO: ここの50は仮の値
        onClick={() => drawCardForPlayer(player, 50)}
      >
        Draw
      </button>
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
    </>
  );
}
