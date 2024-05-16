import { BoardContainer } from "@/components/features/board/BoardContainer";
import { DiscKind } from "@/hooks/reversiGame";

type GamePresenterProps = {
  board: DiscKind[][];
  currentPlayer: DiscKind;
  winner: DiscKind;
  makeMove: (row: number, col: number) => void;
};

export const GamePresenter = ({
  board,
  currentPlayer,
  winner,
  makeMove,
}: GamePresenterProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">Reversi</h1>
        <BoardContainer board={board} makeMove={makeMove} />
      </div>
    </div>
  );
};
