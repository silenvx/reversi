import { createContext, useContext } from "react";

import { DiscType } from "@/domains/reversi/const";
import { SkillCard } from "@/domains/reversi/skillcard";
import { useHands } from "@/hooks/hand";

/**
 * ユーザーの手札のコンテキストInterface
 *
 * @interface HandContextType
 * @typedef {HandContextType}
 */
export interface HandContextType {
  blackHands: SkillCard[];
  whiteHands: SkillCard[];
  drawCardForPlayer: (player: DiscType, score: number) => void;
  discardCard: (player: DiscType, cardId: string) => void;
  addCard: (player: DiscType, card: SkillCard) => void;
}

const HandContext = createContext<HandContextType | undefined>(undefined);

export function HandProvider({ children }: { children: React.ReactNode }) {
  const hands = useHands();
  return <HandContext.Provider value={hands}>{children}</HandContext.Provider>;
}

export const useHandContext = (): HandContextType => {
  const context = useContext(HandContext);
  if (context == null) {
    throw new Error("useHandContext must be used within a HandProvider");
  }
  return context;
};
