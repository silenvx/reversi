import { GameContainer } from "@/components/features/game/GameContainer";
import { DeckProvider } from "@/hooks/deckContext";
import { HandProvider } from "@/hooks/handContext";
import { SkillProvider } from "@/hooks/reversiSkill";

export function Top() {
  return (
    <SkillProvider>
      <DeckProvider>
        <HandProvider>
          <GameContainer />
        </HandProvider>
      </DeckProvider>
    </SkillProvider>
  );
}
