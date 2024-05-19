import { GamePresenter } from "@/components/features/game/GamePresenter";
import { useReversiGame } from "@/hooks/reversiGame";

export const GameContainer = () => {
  const reversiGame = useReversiGame();
  return <GamePresenter reversiGame={reversiGame} />;
};
