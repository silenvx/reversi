import { BoardPresenter } from "@/components/features/board/BoardPresenter";
import { DiscKind } from "@/hooks/reversiGame";

type BoardContainerProps = {
  board: DiscKind[][];
  makeMove: (row: number, col: number) => void;
};

export const BoardContainer = ({ board, makeMove }: BoardContainerProps) => {
  const handleClick = (row: number, col: number) => {
    makeMove(row, col);
  };

  return <BoardPresenter board={board} handleClick={handleClick} />;
};
