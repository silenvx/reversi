import { Disc, DiscType } from "@/domains/reversi/const";
import { SkillCard } from "@/domains/reversi/skillcard";
import { ReversiGameType } from "@/hooks/reversiGame";

const colorClass = (player: DiscType) => {
  if (player === Disc.black) {
    return "bg-red-200/10 border-red-500/50 hover:shadow-red-300 duration-300";
  }
  return "bg-blue-200/10 border-blue-500/50 hover:shadow-blue-300 duration-300";
};

type CardPresenterProps = {
  reversiGame: ReversiGameType;
  player: DiscType;
  hand: SkillCard;
  playCard: (
    player: DiscType,
    cardId: SkillCard,
    game: ReversiGameType,
  ) => void;
};

export function CardPresenter({
  reversiGame,
  player,
  hand,
  playCard,
}: CardPresenterProps) {
  return (
    <div
      className={`aspect-[1/1.618] h-full rounded-md border-2 shadow-lg backdrop-blur-lg ${colorClass(player)}`}
      onClick={() => playCard(player, hand, reversiGame)}
      onKeyDown={() => playCard(player, hand, reversiGame)}
      tabIndex={0}
      role="button"
      aria-label="card"
    >
      {/* TODO: 仮で白文字を表示している */}
      <span className="text-white">{hand.name}</span>
    </div>
  );
}
