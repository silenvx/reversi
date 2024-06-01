import { BoardContainer } from "@/components/features/board/BoardContainer";
import { Disc, ReversiGameType } from "@/hooks/reversiGame";

type GamePresenterProps = {
  reversiGame: ReversiGameType;
};

export function GamePresenter({ reversiGame }: GamePresenterProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <p className="text-4xl font-bold">
          Player: {reversiGame.currentPlayer}
          <br />
          black:{" "}
          {
            reversiGame.board.flat().filter((disc) => disc === Disc.black)
              .length
          }
          <br />
          white:{" "}
          {
            reversiGame.board.flat().filter((disc) => disc === Disc.white)
              .length
          }
        </p>
        <BoardContainer reversiGame={reversiGame} />
        <button
          className="border border-black rounded p-2"
          type="button"
          onClick={reversiGame.reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
