import { PlayerInformationPresenter } from "@/components/features/playerInformation/PlayerInformationPresenter";
import { DiscType } from "@/domains/reversi/const";

type PlayerInformationContainerProps = {
  player: DiscType;
};

export function PlayerInformationContainer({
  player,
}: PlayerInformationContainerProps) {
  return <PlayerInformationPresenter player={player} />;
}
