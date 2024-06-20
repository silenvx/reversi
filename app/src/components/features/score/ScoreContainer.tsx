import { ScorePresenter } from "@/components/features/score/ScorePresenter";
import { DiscType } from "@/domains/reversi/const";

type ScoreContainerProps = {
  player: DiscType;
};

export function ScoreContainer({ player }: ScoreContainerProps) {
  return <ScorePresenter player={player} />;
}
