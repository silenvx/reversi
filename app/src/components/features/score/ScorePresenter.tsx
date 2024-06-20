import { Disc, DiscType } from "@/domains/reversi/const";

const colorClass = (player: DiscType) => {
  if (player === Disc.black) {
    return "bg-red-200/10 border-red-500/50";
  }
  return "bg-blue-200/10 border-blue-500/50";
};

type ScoreContainerProps = {
  player: DiscType;
};

export function ScorePresenter({ player }: ScoreContainerProps) {
  return (
    <div
      className={`rounded-full border-4 p-14 shadow-lg backdrop-blur-lg ${colorClass(player)}`}
    >
      <span className="text-5xl">30</span>
    </div>
  );
}
