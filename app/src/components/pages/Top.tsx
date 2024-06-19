import { GameContainer } from "@/components/features/game/GameContainer";
import { DeckProvider } from "@/hooks/deckContext";
import { SkillProvider } from "@/hooks/reversiSkill";

export function Top() {
  return (
    <SkillProvider>
      <DeckProvider>
        <GameContainer />
      </DeckProvider>
    </SkillProvider>
  );
}
