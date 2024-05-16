import { GamePresenter } from "@/components/features/game/GamePresenter";
import { useReversiGame } from "@/hooks/reversiGame";

export const GameContainer = () => {
  const { board, currentPlayer, winner, makeMove } = useReversiGame();
  console.log(board);
  return (
    <GamePresenter
      board={board}
      currentPlayer={currentPlayer}
      winner={winner}
      makeMove={makeMove}
    />
  );
};
