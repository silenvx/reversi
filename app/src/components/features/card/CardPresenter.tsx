import { Disc, DiscType } from "@/domains/reversi/const";

const colorClass = (player: DiscType) => {
  if (player === Disc.black) {
    return "bg-red-200/10 border-red-500/50 hover:shadow-red-300 duration-300";
  }
  return "bg-blue-200/10 border-blue-500/50 hover:shadow-blue-300 duration-300";
};

type CardPresenterProps = {
  player: DiscType;
};

export function CardPresenter({ player }: CardPresenterProps) {
  return (
    <div
      className={`aspect-[1/1.618] h-full rounded-md border-2 shadow-lg backdrop-blur-lg ${colorClass(player)}`}
    />
  );
}
