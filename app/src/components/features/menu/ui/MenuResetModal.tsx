import { MenuModal } from "@/components/features/menu/MenuModal";

type ModalMenuResetProps = {
  handleClickClose: () => void;
  handleClickReset: () => void;
};

export function ModalMenuReset({
  handleClickClose,
  handleClickReset,
}: ModalMenuResetProps) {
  const neonTextShadow = {
    textShadow:
      "0 0 5px #ff8c00, 0 0 10px #ff8c00, 0 0 20px #ff8c00, 0 0 40px #ff8c00",
  };

  return (
    <MenuModal handleClickClose={handleClickClose}>
      <div
        className="flex flex-col gap-4 rounded border bg-black p-4 text-white shadow-lg"
        style={neonTextShadow}
      >
        <h1 className="text-xl" style={neonTextShadow}>
          リセット
        </h1>
        <p>リセットしますか？</p>
        <div className="flex gap-2">
          <button
            className="rounded border border-white border-opacity-50 p-2 hover:border-opacity-100"
            onClick={handleClickClose}
            type="button"
          >
            <p style={neonTextShadow}>キャンセル</p>
          </button>
          <button
            className="rounded border border-orange-500 border-opacity-50 p-2 hover:border-opacity-100"
            onClick={handleClickReset}
            type="button"
          >
            <p style={neonTextShadow}>リセットする</p>
          </button>
        </div>
      </div>
    </MenuModal>
  );
}
