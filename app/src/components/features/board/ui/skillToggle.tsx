import { DiscType } from "@/domains/reversi/const";
import { useSkills } from "@/hooks/reversiSkill";

const SkillToggleButton = ({
  user,
  skillName,
}: {
  user: Exclude<DiscType, undefined>;
  skillName: string;
}) => {
  const { toggleSkill } = useSkills();

  return (
    <button
      onClick={() => toggleSkill(user, skillName)}
      className="border border-black rounded p-2"
    >
      Toggle {skillName} for {user}
    </button>
  );
};

export default SkillToggleButton;
