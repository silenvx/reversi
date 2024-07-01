import { GaugePresenter } from "@/components/features/gauge/GaugePresenter";
import { PlayerBoradEvaluation } from "@/domains/reversi/const";

type GaugeContainerProps = {
  value: PlayerBoradEvaluation;
};

export function GaugeContainer({ value }: GaugeContainerProps) {
  return <GaugePresenter value={value} />;
}
