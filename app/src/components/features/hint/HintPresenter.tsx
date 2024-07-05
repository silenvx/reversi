import { MenuModal } from "@/components/features/menu/MenuModal";

type HintPresenterProps = {
  handleClickClose: () => void;
};

export function HintPresenter({ handleClickClose }: HintPresenterProps) {
  const neonText = {
    color: "#FFFFFF",
    textShadow:
      "0 0 5px #ff8c00, 0 0 10px #ff8c00, 0 0 20px #ff8c00, 0 0 40px #ff8c00",
  };

  const neonButton = {
    color: "#FFFFFF",
    backgroundColor: "#000000",
    textShadow:
      "0 0 5px #ff8c00, 0 0 10px #ff8c00, 0 0 20px #ff8c00, 0 0 40px #ff8c00",
    border: "2px solid #ff8c00",
  };

  return (
    <MenuModal handleClickClose={handleClickClose}>
      <div
        className="hint-box rounded border bg-black p-4 shadow-lg"
        style={neonText}
      >
        <h1 className="hint-title mb-4 text-xl" style={neonText}>
          ヒント
        </h1>
        <p style={neonText}>各スキルカードの効果は以下のとおりです。</p>
        <ul className="hint-list my-4 list-disc pl-5">
          <li style={neonText}>リバース：1手前に</li>
          <li style={neonText}>ランダム：相手のターンにランダムにコマを置く</li>
        </ul>
        <button
          className="hint-close-button rounded p-2"
          onClick={handleClickClose}
          style={neonButton}
          type="button"
        >
          <p style={neonText}>×</p>
        </button>
      </div>
    </MenuModal>
  );
}
