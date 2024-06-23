import { DiscType, Disc } from "@/domains/reversi/const";

const viewDisc = (disc: DiscType) => {
  switch (disc) {
    case Disc.black:
      return "bg-red-500/10 border-red-500/80 border-2 shadow shadow-red-500/50 backdrop-blur-sm";
    case Disc.white:
      return "bg-blue-500/10 border-blue-500/80 border-2 shadow shadow-blue-500/50 backdrop-blur-sm";
    default:
      return "";
  }
};

type CellPresenterProps = {
  disc: DiscType;
  isMakeable: boolean;
  isHighlight: boolean;
  onClick: () => void;
};

export function CellPresenter({
  disc,
  isMakeable,
  isHighlight,
  onClick,
}: CellPresenterProps) {
  const discClass = viewDisc(disc);
  const hoverClass = isMakeable
    ? `hover:bg-gray-500 hover:opacity-50 cursor-pointer`
    : "";
  const highlightClass = isHighlight
    ? "      border-4 border-yellow-300 border-opacity-50 shadow-[inset_0_0_5px_3px_rgba(255,215,0,0.9)]"
    : "";

  return (
    <div
      className={`flex aspect-[1/1] items-center justify-center border border-orange-500 bg-orange-500/5 shadow shadow-orange-500 backdrop-blur-sm ${highlightClass}`}
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex={0}
      role="button"
      aria-label="cell"
    >
      <div
        className={`h-full w-full rounded-full p-1 ${discClass} ${hoverClass}`}
      />
    </div>
  );
}
