import { Disc, DiscType } from "@/domains/reversi/const";

const colorClass = (player: DiscType) => {
  if (player === Disc.black) {
    return "bg-red-200/10 border-red-500/50 text-red-500";
  }
  return "bg-blue-200/10 border-blue-500/50 text-blue-500";
};

type ScoreContainerProps = {
  score: number;
  player: DiscType;
};

export function ScorePresenter({ score, player }: ScoreContainerProps) {
  return (
    <div>
      <div
        className={`mx-auto flex h-52 w-52 items-center justify-center rounded-full border-4 text-5xl shadow-lg backdrop-blur-lg ${colorClass(player)}`}
      >
        {score}
      </div>
    </div>
  );
}
