import { BoardPresenter } from "@/components/features/board/BoardPresenter";
import { DiscKind, ReversiGameType } from "@/hooks/reversiGame";

type BoardContainerProps = {
  reversiGame: ReversiGameType;
};

export const BoardContainer = ({ reversiGame }: BoardContainerProps) => {
  const handleClick = (row: number, col: number) => {
    reversiGame.makeMove(row, col);
  };

  return <BoardPresenter reversiGame={reversiGame} handleClick={handleClick} />;
};
