import { BoardPresenter } from "@/components/features/board/BoardPresenter";
import { DiscType } from "@/domains/reversi/const";
import { ReversiGameType } from "@/hooks/reversiGame";
import { useSkills } from "@/hooks/reversiSkill";

type BoardContainerProps = {
  reversiGame: ReversiGameType;
};

export function BoardContainer({ reversiGame }: BoardContainerProps) {
  const handleClick = (row: number, col: number) => {
    reversiGame.makeMove(row, col);
  };
  const { skills } = useSkills();
  return (
    <BoardPresenter
      reversiGame={reversiGame}
      isHighlightActive={
        skills[reversiGame.currentPlayer as Exclude<DiscType, undefined>]
          .highlight
      }
      handleClick={handleClick}
    />
  );
}
