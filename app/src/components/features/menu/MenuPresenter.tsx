import { GoGear } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { LiaQuestionSolid } from "react-icons/lia";
import { TfiReload } from "react-icons/tfi";

import SkillToggleButton from "@/components/features/board/ui/skillToggle";
import { HintPresenter } from "@/components/features/hint/HintPresenter";
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
          <div className="flex h-auto max-h-screen w-full cursor-default flex-col gap-5 rounded-md bg-white p-10 shadow-md">
            <button
              className="rounded border border-black p-2"
              type="button"
              onClick={reversiGame.reset}
            >
              Reset
            </button>
            <SkillToggleButton user={Disc.white} skillName="highlight" />
            <SkillToggleButton user={Disc.black} skillName="highlight" />
          </div>
        </MenuModal>
      )}
      {modalOpenHint && (
        <HintPresenter handleClickClose={handleClickCloseHint} />
      )}
    </>
  );
}
