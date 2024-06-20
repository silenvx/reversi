import { CardPresenter } from "@/components/features/card/CardPresenter";
import { DiscType } from "@/domains/reversi/const";

type CardContainerProps = {
  player: DiscType;
};

export function CardContainer({ player }: CardContainerProps) {
  return <CardPresenter player={player} />;
}
