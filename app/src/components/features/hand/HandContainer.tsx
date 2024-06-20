import { HandPresenter } from "@/components/features/hand/HandPresenter";
import { DiscType } from "@/domains/reversi/const";

type HandContainerProps = {
  player: DiscType;
};

export function HandContainer({ player }: HandContainerProps) {
  return <HandPresenter player={player} />;
}
