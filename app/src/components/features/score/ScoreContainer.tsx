import { ScorePresenter } from "@/components/features/score/ScorePresenter";
import { DiscType } from "@/domains/reversi/const";
import { ReversiGameType } from "@/hooks/reversiGame";

type ScoreContainerProps = {
  reversiGame: ReversiGameType;
  player: DiscType;
};

export function ScoreContainer({ reversiGame, player }: ScoreContainerProps) {
  return (
    <ScorePresenter score={reversiGame.getScore(player)} player={player} />
  );
}
