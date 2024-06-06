import { GameContainer } from "@/components/features/game/GameContainer";
import { SkillProvider } from "@/hooks/reversiSkill";

export function Top()
{
  return(
    <SkillProvider>
      <GameContainer />
    </SkillProvider>
  );
}
