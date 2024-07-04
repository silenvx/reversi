import { GaugePresenter } from "@/components/features/gauge/GaugePresenter";
import { PlayerBoardEvaluation } from "@/domains/reversi/const";

type GaugeContainerProps = {
  value: PlayerBoardEvaluation;
};

export function GaugeContainer({ value }: GaugeContainerProps) {
  return <GaugePresenter value={value} />;
}
