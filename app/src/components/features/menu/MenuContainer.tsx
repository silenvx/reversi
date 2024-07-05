import { useState } from "react";

import { MenuPresenter } from "@/components/features/menu/MenuPresenter";
import { ReversiGameType } from "@/hooks/reversiGame";

type MenuContainerProps = {
  reversiGame: ReversiGameType;
};

export function MenuContainer({ reversiGame }: MenuContainerProps) {
  const [modalOpenSetting, setModalOpenSetting] = useState(false);
  const [modalOpenHint, setModalOpenHint] = useState(false);

  const handleClickSetting = () => {
    setModalOpenSetting(true);
  };

  const handleClickClose = () => {
    setModalOpenSetting(false);
  };

  const handleClickHint = () => {
    setModalOpenHint(true);
  };

  const handleClickCloseHint = () => {
    setModalOpenHint(false);
  };
  return (
    <MenuPresenter
      reversiGame={reversiGame}
      handleClickSetting={handleClickSetting}
      handleClickClose={handleClickClose}
      modalOpenSetting={modalOpenSetting}
      modalOpenHint={modalOpenHint}
      handleClickHint={handleClickHint}
      handleClickCloseHint={handleClickCloseHint}
    />
  );
}
