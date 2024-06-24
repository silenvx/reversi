import { PlayerInformationPresenter } from "@/components/features/playerInformation/PlayerInformationPresenter";
import { DiscType } from "@/domains/reversi/const";
import { ReversiGameType } from "@/hooks/reversiGame";

type PlayerInformationContainerProps = {
  reversiGame: ReversiGameType;
  player: DiscType;
};

export function PlayerInformationContainer({
  reversiGame,
  player,
}: PlayerInformationContainerProps) {
  return (
    <PlayerInformationPresenter reversiGame={reversiGame} player={player} />
  );
}
