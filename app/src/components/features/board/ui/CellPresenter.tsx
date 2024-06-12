import { DiscType, Disc } from "@/domains/reversi/const";

const viewDisc = (disc: DiscType) => {
  switch (disc) {
    case Disc.black:
      return "bg-black";
    case Disc.white:
      return "bg-white";
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
      className={`border border-black w-20 h-20 bg-green-800 flex items-center justify-center ${highlightClass}`}
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex={0}
      role="button"
      aria-label="cell"
    >
      <div className={`rounded-full w-16 h-16 ${discClass} ${hoverClass}`} />
    </div>
  );
}
