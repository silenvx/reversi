import { PlayerBoardEvaluation } from "@/domains/reversi/const";

// スコア差をもとにグラデーションのクラスを決定する
const gaugeStyle = (value: PlayerBoardEvaluation) => {
  const { black: blackScore, white: whiteScore } = value;

  // 黒と白のスコア差を計算
  const scoreDifference = blackScore - whiteScore;

  // スコア差を-50から50の範囲に正規化
  const normalizedDifference = Math.max(-50, Math.min(50, scoreDifference));

  // グラデーションの基点を計算
  const viaPercentage = 100 - (50 + normalizedDifference);

  return {
    background: `linear-gradient(to bottom, #ef4444 0%, #a855f7 ${viaPercentage}%, #3b82f6 100%)`,
  };
};

type GaugePresenterProps = {
  value: PlayerBoardEvaluation;
};

export function GaugePresenter({ value }: GaugePresenterProps) {
  // 縦のバーを表示する
  // tailwindの計算が動的にはうまく動かないのでstyleを直接指定
  return <div className="h-96 w-6 rounded-full" style={gaugeStyle(value)} />;
}
