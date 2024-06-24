import { HandPresenter } from "@/components/features/hand/HandPresenter";
import { Disc, DiscType } from "@/domains/reversi/const";
import { useHandContext } from "@/hooks/handContext";
import { ReversiGameType } from "@/hooks/reversiGame";

type HandContainerProps = {
  reversiGame: ReversiGameType;
  player: DiscType;
};

export function HandContainer({ reversiGame, player }: HandContainerProps) {
  const { blackHands, whiteHands, drawCardForPlayer, playCard } =
    useHandContext();

  const hands = player === Disc.black ? blackHands : whiteHands;
  return (
    <HandPresenter
      reversiGame={reversiGame}
      player={player}
      hands={hands}
      drawCardForPlayer={drawCardForPlayer}
      playCard={playCard}
    />
  );
}
