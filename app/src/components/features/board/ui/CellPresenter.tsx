import { DiscKind, ReversiGameType } from "@/hooks/reversiGame";

type CellPresenterProps = {
  reversiGame: ReversiGameType;
  disc: DiscKind;
  isMakeable: boolean;
  onClick: () => void;
};

export const CellPresenter = ({
  reversiGame,
  disc,
  isMakeable,
  onClick,
}: CellPresenterProps) => {
  const viewDisc = (disc: DiscKind, i: number) => {
    switch (disc) {
      case "black":
        return "bg-black";
      case "white":
        return "bg-white";
      default:
        return "";
    }
  };

  const discClass = viewDisc(disc, 1);
  const hoverClass = isMakeable
    ? `hover:bg-gray-500 hover:opacity-50 cursor-pointer`
    : "";

  return (
    <div
      className="border border-black w-20 h-20 bg-green-800 flex items-center justify-center"
      onClick={onClick}
    >
      <div
        className={`rounded-full w-16 h-16 ${discClass} ${hoverClass}`}
      ></div>
    </div>
  );
};
