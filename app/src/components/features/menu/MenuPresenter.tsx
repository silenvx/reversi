import { GoGear } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { LiaQuestionSolid } from "react-icons/lia";
import { TfiReload } from "react-icons/tfi";

import SkillToggleButton from "@/components/features/board/ui/skillToggle";
import { Hint } from "@/components/features/hint/Hint";
import { MenuModal } from "@/components/features/menu/MenuModal";
import { Disc } from "@/domains/reversi/const";
import { ReversiGameType } from "@/hooks/reversiGame";

type MenuPresenterProps = {
  reversiGame: ReversiGameType;
  handleClickSetting: () => void;
  handleClickClose: () => void;
  modalOpenSetting: boolean;
  modalOpenHint: boolean;
  handleClickHint: () => void;
  handleClickCloseHint: () => void;
};

export function MenuPresenter({
  reversiGame,
  handleClickSetting,
  handleClickClose,
  modalOpenSetting,
  modalOpenHint,
  handleClickHint,
  handleClickCloseHint,
}: MenuPresenterProps) {
  return (
    <>
      <div className="flex h-full flex-col justify-center gap-2 text-4xl text-orange-400/80">
        <IoHomeOutline />
        <button type="button" aria-label="Home" onClick={handleClickHint}>
          <LiaQuestionSolid />
        </button>
        <button type="button" aria-label="Setting" onClick={handleClickSetting}>
          <GoGear />
        </button>
        <TfiReload />
      </div>
      {modalOpenSetting && (
        <MenuModal handleClickClose={handleClickClose}>
          <button
            className="rounded border border-black p-2"
            type="button"
            onClick={reversiGame.reset}
          >
            Reset
          </button>
          <SkillToggleButton user={Disc.white} skillName="highlight" />
          <SkillToggleButton user={Disc.black} skillName="highlight" />
        </MenuModal>
      )}
      {modalOpenHint && <Hint handleClickCloseHint={handleClickCloseHint} />}
    </>
  );
}
