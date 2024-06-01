import { GamePresenter } from "@/components/features/game/GamePresenter";
import { useReversiGame } from "@/hooks/reversiGame";

export function GameContainer() {
  const reversiGame = useReversiGame();
  return <GamePresenter reversiGame={reversiGame} />;
}
