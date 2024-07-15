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
        <div className="h-[15%] sm:h-1/5">
          <PlayerInformationContainer
            reversiGame={reversiGame}
            player={Disc.black}
          />
        </div>
        <div className="flex h-[70%] w-full sm:h-3/5">
          <div className="flex h-full w-full flex-grow flex-col justify-center gap-4 p-[5%] sm:flex-row">
            <MenuContainer reversiGame={reversiGame} />
            <BoardContainer reversiGame={reversiGame} />
            <GaugeContainer value={reversiGame.boardEvaluatedScore} />
          </div>
        </div>
        <div className="h-[15%] sm:h-1/5">
          <PlayerInformationContainer
            reversiGame={reversiGame}
            player={Disc.white}
          />
        </div>
      </div>
    </div>
  );
}
