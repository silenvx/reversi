import { useState, useEffect } from "react";

import { PlayerBoardEvaluation } from "@/domains/reversi/const";

// スコア差をもとにグラデーションのクラスを決定する
const gaugeStyle = (value: PlayerBoardEvaluation, isSmallScreen: boolean) => {
  const { black: blackScore, white: whiteScore } = value;

  // 黒と白のスコア差を計算
  const scoreDifference = blackScore - whiteScore;

  // スコア差を-50から50の範囲に正規化
  const normalizedDifference = Math.max(-50, Math.min(50, scoreDifference));

  // グラデーションの基点を計算
  const viaPercentage = 100 - (50 + normalizedDifference);
  const gradientDirection = isSmallScreen ? "to left" : "to bottom";

  return {
    background: `linear-gradient(${gradientDirection}, #ef4444 0%, #a855f7 ${viaPercentage}%, #3b82f6 100%)`,
  };
};

type GaugePresenterProps = {
  value: PlayerBoardEvaluation;
};

export function GaugePresenter({ value }: GaugePresenterProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.matchMedia("(max-width: 640px)").matches,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.matchMedia("(max-width: 640px)").matches);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 縦のバーを表示する
  // tailwindの計算が動的にはうまく動かないのでstyleを直接指定
  return (
    <div
      className="h-6 w-full rounded-full sm:h-full sm:w-6"
      style={gaugeStyle(value, isSmallScreen)}
    />
  );
}
