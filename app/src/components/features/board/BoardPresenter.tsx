import { CellPresenter } from "@/components/features/board/ui/CellPresenter";
import { DiscKind } from "@/hooks/reversiGame";

type BoardPresenterProps = {
  board: DiscKind[][];
  handleClick: (row: number, col: number) => void;
};

export const BoardPresenter = ({ board, handleClick }: BoardPresenterProps) => {
  return (
    <div>
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <CellPresenter
              key={j}
              onClick={() => handleClick(i, j)}
              disc={board[i][j]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
