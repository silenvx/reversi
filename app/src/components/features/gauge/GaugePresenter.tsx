import { PlayerBoradEvaluation } from "@/domains/reversi/const";

const gaugeClass = (value: PlayerBoradEvaluation) => {
  const { black: blackScore, white: whiteScore } = value;

  return `from-${10}% via-${50}% to-${60}%`;
};

type GaugePresenterProps = {
  value: PlayerBoradEvaluation;
};

export function GaugePresenter({ value }: GaugePresenterProps) {
  // 縦のバーを表示する
  return (
    <div
      className={`h-96 w-6 rounded-full bg-gradient-to-b from-red-500 via-purple-500 to-blue-500 transition-all duration-500 ${gaugeClass(value)}`}
    />
  );
}
