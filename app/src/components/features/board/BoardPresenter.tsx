import { CellPresenter } from "@/components/features/board/ui/CellPresenter";
import { ReversiGameType } from "@/hooks/reversiGame";

type BoardPresenterProps = {
  reversiGame: ReversiGameType;
  handleClick: (row: number, col: number) => void;
};

export function BoardPresenter({
  reversiGame,
  handleClick,
}: BoardPresenterProps) {
  return (
    <div>
      <div className="flex">
        {/* 左上の隙間 */}
        <div className="w-20 h-20 flex items-center justify-center" />
        {[...Array(reversiGame.board[0].length).keys()].map((i) => (
          <div key={i} className="w-20 h-20 flex items-center justify-center">
            <div>{String.fromCharCode("A".charCodeAt(0) + i)}</div>
          </div>
        ))}
      </div>
      {reversiGame.board.map((row, i) => (
        <div key={String(`board-${i}`)} className="flex">
          <div className="w-20 h-20 flex items-center justify-center">
            <div>{i + 1}</div>
          </div>
          {row.map((_, j) => (
            <CellPresenter
              key={String(`board-${i}-${j}`)}
              disc={reversiGame.board[i][j]}
              isMakeable={reversiGame.checkMakeable(i, j)}
              onClick={() => handleClick(i, j)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
