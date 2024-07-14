import { ReactNode, createContext, useContext, useMemo } from "react";

import { SkillCard } from "@/domains/reversi/skillcard";
import { useDeck } from "@/hooks/deck";

/**
 * 山札のコンテキスト
 *
 * @interface DeckContextType
 * @typedef {DeckContextType}
 */
interface DeckContextType {
  deck: SkillCard[];
  drawCard: (adv: number) => SkillCard | null;
  resetDeck: () => void;
}

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export function DeckProvider({ children }: { children: ReactNode }) {
  const { cards, drawCard, resetDeck } = useDeck();
  const value = useMemo(
    () => ({ deck: cards, drawCard, resetDeck }),
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
