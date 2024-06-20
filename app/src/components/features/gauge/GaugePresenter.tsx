const gaugeClass = (value: number) => {
  if (value < 30) {
    return "from-red-500 to-purple-500";
  }
  if (value < 60) {
    return "from-red-500 via-purple-500 to-blue-500";
  }
  return "from-purple-500 to-blue-500";
};

type GaugePresenterProps = {
  value: number;
};

export function GaugePresenter({ value }: GaugePresenterProps) {
  // 縦のバーを表示する
  return (
    <div
      className={`h-96 w-6 rounded-full bg-gradient-to-b ${gaugeClass(value)}`}
    />
  );
}
