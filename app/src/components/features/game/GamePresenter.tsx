import { BoardContainer } from "@/components/features/board/BoardContainer";
import { GaugeContainer } from "@/components/features/gauge/GaugeContainer";
import { MenuContainer } from "@/components/features/menu/MenuContainer";
import { PlayerInformationContainer } from "@/components/features/playerInformation/PlayerInformationContainer";
import { Disc } from "@/domains/reversi/const";
import { ReversiGameType } from "@/hooks/reversiGame";

type GamePresenterProps = {
  reversiGame: ReversiGameType;
};

export function GamePresenter({ reversiGame }: GamePresenterProps) {
  return (
    <div className="flex h-screen justify-center bg-indigo-950 p-8">
      <div className="flex flex-col justify-between">
        <PlayerInformationContainer player={Disc.white} />
        <div className="flex gap-4">
          <MenuContainer reversiGame={reversiGame} />
          <BoardContainer reversiGame={reversiGame} />
          <GaugeContainer value={50} />
        </div>
        <PlayerInformationContainer player={Disc.black} />
      </div>
    </div>
  );
}
