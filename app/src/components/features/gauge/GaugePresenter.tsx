import { PlayerBoradEvaluation } from "@/domains/reversi/const";

// スコア差をもとにグラデーションのクラスを決定する
const gaugeClass = (value: PlayerBoradEvaluation) => {
  const { black: blackScore, white: whiteScore } = value;

  // 黒と白のスコア差を計算
  const scoreDifference = blackScore - whiteScore;

  // スコア差を-50から50の範囲に正規化
  const normalizedDifference = Math.max(-50, Math.min(50, scoreDifference));

  // グラデーションの基点を計算
  const viaPercentage = 50 + normalizedDifference;
  const fromPercentage = Math.max(0, viaPercentage - 5);
  const toPercentage = Math.min(100, viaPercentage + 5);

  return `from-${fromPercentage}% via-${viaPercentage}% to-${toPercentage}%`;
};

type GaugePresenterProps = {
  value: PlayerBoradEvaluation;
};

export function GaugePresenter({ value }: GaugePresenterProps) {
  // 縦のバーを表示する
  return (
    <div
      className={`h-96 w-6 rounded-full bg-gradient-to-b from-red-500 via-purple-500 to-blue-500 ${gaugeClass(value)}`}
    />
  );
}
