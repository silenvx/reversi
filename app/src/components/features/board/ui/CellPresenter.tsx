import { DiscKind } from "@/hooks/reversiGame";

type CellPresenterProps = {
  onClick: () => void;
  disc: DiscKind;
};

export const CellPresenter = ({ onClick, disc }: CellPresenterProps) => {
  const viewDisc = (disc: DiscKind) => {
    switch (disc) {
      case "black":
        return "bg-black";
      case "white":
        return "bg-white";
      default:
        return "";
    }
  };

  return (
    <div
      className="border border-black w-20 h-20 bg-green-800 flex items-center justify-center"
      onClick={onClick}
    >
      <div className={`rounded-full w-16 h-16 ${viewDisc(disc)}`}></div>
    </div>
  );
};
