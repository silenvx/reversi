import { GaugePresenter } from "@/components/features/gauge/GaugePresenter";

type GaugeContainerProps = {
  value: number;
};

export function GaugeContainer({ value }: GaugeContainerProps) {
  return <GaugePresenter value={value} />;
}
