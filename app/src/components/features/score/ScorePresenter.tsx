import { Disc, DiscType } from "@/domains/reversi/const";

const colorClass = (player: DiscType, isPlaying: boolean) => {
  if (player === Disc.black) {
    return `text-red-500 ${isPlaying ? "bg-red-200/20 border-red-500/100 shadow-red-200 shadow-sm" : "bg-red-200/10 border-red-500/50"}`;
  }
  return `text-blue-500 ${isPlaying ? "bg-blue-200/20 border-blue-500/100 shadow-blue-200 shadow-sm" : "bg-blue-200/10 border-blue-500/50"}`;
};

type ScoreContainerProps = {
  score: number;
  player: DiscType;
  isPlaying: boolean;
};

export function ScorePresenter({
  score,
  player,
  isPlaying,
}: ScoreContainerProps) {
  return (
    <div
      className={`mx-auto flex aspect-square h-full w-auto items-center justify-center rounded-full border-4 text-5xl shadow-lg backdrop-blur-lg ${colorClass(player, isPlaying)}`}
    >
      {score}
    </div>
  );
}
