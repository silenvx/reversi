import { HandContainer } from "@/components/features/hand/HandContainer";
import { ScoreContainer } from "@/components/features/score/ScoreContainer";
import { DiscType } from "@/domains/reversi/const";

type PlayerInformationPresenterProps = {
  player: DiscType;
};

export function PlayerInformationPresenter({
  player,
}: PlayerInformationPresenterProps) {
  return (
    <div className="flex flex-row gap-10">
      <ScoreContainer player={player} />
      <HandContainer player={player} />
    </div>
  );
}
