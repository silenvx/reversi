import { CardContainer } from "@/components/features/card/CardContainer";
import { DiscType } from "@/domains/reversi/const";

type HandPresenterProps = {
  player: DiscType;
};

export function HandPresenter({ player }: HandPresenterProps) {
  return (
    <div className="flex w-full justify-between">
      <CardContainer player={player} />
      <CardContainer player={player} />
      <CardContainer player={player} />
      <CardContainer player={player} />
    </div>
  );
}
