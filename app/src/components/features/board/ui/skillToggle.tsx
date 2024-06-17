import { DiscType } from "@/domains/reversi/const";
import { useSkills } from "@/hooks/reversiSkill";

function SkillToggleButton({
  user,
  skillName,
}: {
  user: Exclude<DiscType, undefined>;
  skillName: string;
}) {
  const { toggleSkill } = useSkills();

  return (
    <button
      type="button" // Add the type attribute
      onClick={() => toggleSkill(user, skillName)}
      className="border border-black rounded p-2"
    >
      Toggle {skillName} for {user}
    </button>
  );
}

export default SkillToggleButton;
