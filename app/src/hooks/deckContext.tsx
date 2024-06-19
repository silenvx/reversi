import { ReactNode, createContext, useContext, useMemo } from "react";

import { SkillCard } from "@/domains/reversi/skillcard";
import { useDeck } from "@/hooks/deck";

interface DeckContextType {
  deck: SkillCard[];
  cards: SkillCard[];
  drawCard: (adv: number) => SkillCard | null;
}

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export function DeckProvider({ children }: { children: ReactNode }) {
  const { cards, drawCard } = useDeck();
  const value = useMemo(
    () => ({ deck: cards, cards, drawCard }),
    [cards, drawCard],
  );
  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>;
}

export const useDeckContext = (): DeckContextType => {
  const context = useContext(DeckContext);
  if (context == null) {
    throw new Error("useDeckContext must be used within a DeckProvider");
  }
  return context;
};
