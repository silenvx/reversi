import { HandContainer } from "@/components/features/hand/HandContainer";
import { ScoreContainer } from "@/components/features/score/ScoreContainer";
import { Disc, DiscType } from "@/domains/reversi/const";
import { ReversiGameType } from "@/hooks/reversiGame";

type PlayerInformationPresenterProps = {
  reversiGame: ReversiGameType;
  player: DiscType;
};

export function PlayerInformationPresenter({
  reversiGame,
  player,
}: PlayerInformationPresenterProps) {
  const rotateClass = player === Disc.black ? "rotate-180" : "";

  return (
    <div className={`flex flex-row gap-10 ${rotateClass}`}>
      <ScoreContainer reversiGame={reversiGame} player={player} />
      <HandContainer reversiGame={reversiGame} player={player} />
    </div>
  );
}
