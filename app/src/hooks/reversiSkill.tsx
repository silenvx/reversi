import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

import { DiscType, Disc, SkillStateType } from "@/domains/reversi/const";

type SkillState = {
  [user: Exclude<DiscType, undefined>]: {
    [skillName: string]: boolean;
  };
};

export type SkillContextType = {
  skills: SkillState;
  toggleSkill: (
    user: Exclude<DiscType, undefined>,
    skillName: SkillStateType,
  ) => void;
};

const SkillContext = createContext<SkillContextType>({
  skills: {},
  toggleSkill: () => {},
});

export function SkillProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<SkillState>({
    [Disc.black]: {},
    [Disc.white]: {},
  });

  const toggleSkill = useCallback(
    (user: Exclude<DiscType, undefined>, skillName: string) => {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [user]: {
          ...prevSkills[user],
          [skillName]: !prevSkills[user]?.[skillName],
        },
      }));
    },
    [],
  );
  return useMemo(
    () => (
      <SkillContext.Provider value={{ skills, toggleSkill }}>
        {children}
      </SkillContext.Provider>
    ),
    [skills, toggleSkill],
  );
}

export const useSkills = () => {
  const context = useContext(SkillContext);
  return context;
};
