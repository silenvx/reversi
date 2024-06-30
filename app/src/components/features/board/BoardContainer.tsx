import { BoardPresenter } from "@/components/features/board/BoardPresenter";
import { canDrawSkillCard } from "@/domains/reversi/compute";
import { DiscType } from "@/domains/reversi/const";
import { useHandContext } from "@/hooks/handContext";
import { ReversiGameType } from "@/hooks/reversiGame";
import { useSkills } from "@/hooks/reversiSkill";

type BoardContainerProps = {
  reversiGame: ReversiGameType;
};

export function BoardContainer({ reversiGame }: BoardContainerProps) {
  const { drawCardForPlayer } = useHandContext();
  const handleClick = (row: number, col: number) => {
    const isSuccessMake = reversiGame.makeMove(row, col);
    // TODO : 優勢度は仮置き
    if (isSuccessMake && canDrawSkillCard(-80)) {
      drawCardForPlayer(reversiGame.currentPlayer, -80);
    }
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
