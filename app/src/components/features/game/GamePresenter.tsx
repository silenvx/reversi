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
      <div className="flex w-full flex-col justify-between">
        <PlayerInformationContainer
          reversiGame={reversiGame}
          player={Disc.black}
        />
        <div className="flex w-full justify-center gap-4">
          <MenuContainer reversiGame={reversiGame} />
          <BoardContainer reversiGame={reversiGame} />
          {/* TODO: GaugeContainerのvalueは仮の値 */}
          <GaugeContainer value={50} />
        </div>
        <PlayerInformationContainer
          reversiGame={reversiGame}
          player={Disc.white}
        />
      </div>
    </div>
  );
}
