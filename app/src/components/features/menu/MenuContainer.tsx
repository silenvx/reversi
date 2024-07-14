import { useState } from "react";

import { MenuPresenter } from "@/components/features/menu/MenuPresenter";
import { useHandContext } from "@/hooks/handContext";
import { ReversiGameType } from "@/hooks/reversiGame";

type MenuContainerProps = {
  reversiGame: ReversiGameType;
};

export function MenuContainer({ reversiGame }: MenuContainerProps) {
  const { resetCard } = useHandContext();

  const [modalOpenSetting, setModalOpenSetting] = useState(false);
  const [modalOpenHint, setModalOpenHint] = useState(false);
  const [modalOpenReset, setModalOpenReset] = useState(false);

  const handleClickSetting = () => {
    setModalOpenSetting(true);
  };

  const handleClickCloseSetting = () => {
    setModalOpenSetting(false);
  };

  const handleClickHint = () => {
    setModalOpenHint(true);
  };

  const handleClickCloseHint = () => {
    setModalOpenHint(false);
  };

  const handleClickReset = () => {
    reversiGame.reset();
    resetCard();
    setModalOpenReset(false);
  };
  const handleClickOpenReset = () => {
    setModalOpenReset(true);
  };
  const handleClickCloseReset = () => {
    setModalOpenReset(false);
  };
  return (
    <MenuPresenter
      reversiGame={reversiGame}
      handleClickSetting={handleClickSetting}
      handleClickCloseSetting={handleClickCloseSetting}
      modalOpenSetting={modalOpenSetting}
      modalOpenHint={modalOpenHint}
      handleClickHint={handleClickHint}
      handleClickCloseHint={handleClickCloseHint}
      modalOpenReset={modalOpenReset}
      handleClickReset={handleClickReset}
      handleClickOpenReset={handleClickOpenReset}
      handleClickCloseReset={handleClickCloseReset}
    />
  );
}
