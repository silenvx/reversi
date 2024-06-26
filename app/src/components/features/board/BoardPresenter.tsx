import { CellPresenter } from "@/components/features/board/ui/CellPresenter";
import { ReversiGameType } from "@/hooks/reversiGame";

type BoardPresenterProps = {
  reversiGame: ReversiGameType;
  isHighlightActive: boolean;
  handleClick: (row: number, col: number) => void;
};

export function BoardPresenter({
  reversiGame,
  isHighlightActive,
  handleClick,
}: BoardPresenterProps) {
  return (
    <div>
      <div className="grid w-96 grid-cols-8 grid-rows-8">
        {reversiGame.board.map((row, i) =>
          row.map((_, j) => (
            <CellPresenter
              key={String(`board-${i}-${j}`)}
              disc={reversiGame.board[i][j]}
              isMakeable={reversiGame.checkMakeable(i, j)}
              isHighlight={reversiGame.checkMakeable(i, j) && isHighlightActive}
              onClick={() => handleClick(i, j)}
            />
          )),
        )}
      </div>
    </div>
  );
}
