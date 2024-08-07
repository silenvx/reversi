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
    [skillName: SkillStateType]: boolean;
  };
};

export type SkillContextType = {
  skills: SkillState;
  toggleSkill: (
    user: Exclude<DiscType, undefined>,
    skillName: SkillStateType,
  ) => void;
  resetSkills: () => void;
};

const SkillContext = createContext<SkillContextType>({
  skills: {},
  toggleSkill: () => {},
  resetSkills: () => {},
});

export function SkillProvider({ children }: { children: ReactNode }) {
  const [skills, setSkills] = useState<SkillState>({
    [Disc.black]: {},
    [Disc.white]: {},
  });

  const toggleSkill = useCallback(
    (user: Exclude<DiscType, undefined>, skillName: SkillStateType) => {
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

  const resetSkills = () => {
    setSkills({
      [Disc.black]: {},
      [Disc.white]: {},
    });
  };
  return useMemo(
    () => (
      <SkillContext.Provider value={{ skills, toggleSkill, resetSkills }}>
        {children}
      </SkillContext.Provider>
    ),
    [skills, toggleSkill, resetSkills],
  );
}

export const useSkills = () => {
  const context = useContext(SkillContext);
  return context;
};
