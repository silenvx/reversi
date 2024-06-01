import { CellPresenter } from "@/components/features/board/ui/CellPresenter";
import { Disc, ReversiGameType } from "@/hooks/reversiGame";

type BoardPresenterProps = {
  reversiGame: ReversiGameType;
  handleClick: (row: number, col: number) => void;
};

export const BoardPresenter = ({
  reversiGame,
  handleClick,
}: BoardPresenterProps) => {
  return (
    <div>
      <div className="flex">
        <div className="w-20 h-20"></div>
        {[...Array(reversiGame.board[0].length).keys()].map((i) => (
          <div key={i} className="w-20 h-20 flex items-center justify-center">
            <div>{String.fromCharCode("A".charCodeAt(0) + i)}</div>
          </div>
        ))}
      </div>
      {reversiGame.board.map((row, i) => (
        <div key={i} className="flex">
          <div className="w-20 h-20 flex items-center justify-center">
            <div>{i + 1}</div>
          </div>
          {row.map((_, j) => (
            <CellPresenter
              key={j}
              reversiGame={reversiGame}
              disc={reversiGame.board[i][j]}
              isMakeable={reversiGame.checkMakeable(i, j)}
              onClick={() => handleClick(i, j)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
