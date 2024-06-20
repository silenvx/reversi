import { useState } from "react";

import { MenuPresenter } from "@/components/features/menu/MenuPresenter";
import { ReversiGameType } from "@/hooks/reversiGame";

type MenuContainerProps = {
  reversiGame: ReversiGameType;
};

export function MenuContainer({ reversiGame }: MenuContainerProps) {
  const [modalOpenSetting, setModalOpenSetting] = useState(false);

  const handleClickSetting = () => {
    setModalOpenSetting(true);
  };

  const handleClickClose = () => {
    setModalOpenSetting(false);
  };

  return (
    <MenuPresenter
      reversiGame={reversiGame}
      handleClickSetting={handleClickSetting}
      handleClickClose={handleClickClose}
      modalOpenSetting={modalOpenSetting}
    />
  );
}
