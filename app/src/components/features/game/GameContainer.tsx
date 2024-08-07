import { useEffect } from "react";

import { GamePresenter } from "@/components/features/game/GamePresenter";
import { Winner } from "@/domains/reversi/const";
import { useReversiGame } from "@/hooks/reversiGame";

export function GameContainer() {
  const reversiGame = useReversiGame();

  // 勝者が決まったらアラートを表示してリセット
  useEffect(() => {
    switch (reversiGame.winner) {
      case Winner.black:
        // eslint-disable-next-line no-alert
        alert("赤の勝ちです");
        break;
      case Winner.white:
        // eslint-disable-next-line no-alert
        alert("青の勝ちです");
        break;
      case Winner.draw:
        // eslint-disable-next-line no-alert
        alert("引き分けです");
        break;
      default:
        break;
    }
    reversiGame.hardReset();
  }, [reversiGame.winner]);

  return <GamePresenter reversiGame={reversiGame} />;
}
