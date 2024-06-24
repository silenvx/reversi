const gaugeClass = (value: number) => {
  let validValue = value;
  if (value < 0) validValue = 0;
  if (value > 100) validValue = 100;

  // TODO: きれいに表示できる数式を考える
  const fromPercentage = validValue;
  const viaPercentage = validValue;
  const toPercentage = validValue;

  return `from-${fromPercentage}% via-${viaPercentage}% to-${toPercentage}%`;
};

type GaugePresenterProps = {
  value: number;
};

export function GaugePresenter({ value }: GaugePresenterProps) {
  // 縦のバーを表示する
  return (
    <div
      className={`h-96 w-6 rounded-full bg-gradient-to-b from-red-500 via-purple-500 to-blue-500 ${gaugeClass(value)}`}
    />
  );
}
