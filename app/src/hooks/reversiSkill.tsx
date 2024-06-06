import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { DiscType, Disc } from '@/domains/reversi/const';

type SkillState = {
  [user: Exclude<DiscType, undefined>]: {
    [skillName: string]: boolean;
  };
};

type SkillContextType = {
  skills: SkillState;
  toggleSkill: (user: Exclude<DiscType, undefined>, skillName: string) => void;
};

const SkillContext = createContext<SkillContextType>({ skills: {}, toggleSkill: () => {} });

export const SkillProvider = ({ children }: { children: ReactNode }) => {
  const [skills, setSkills] = useState<SkillState>({
    [Disc.black]: {},
    [Disc.white]: {}
  });

  const toggleSkill = useCallback((user: Exclude<DiscType, undefined>, skillName: string) => {
    setSkills((prevSkills) => ({
      ...prevSkills,
      [user]: {
        ...prevSkills[user],
        [skillName]: !prevSkills[user]?.[skillName],
      },
    }));
  }, []);
  return (
    <SkillContext.Provider value={{ skills, toggleSkill }}>
      {children}
    </SkillContext.Provider>
  
  );

};

export const useSkills = () => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error('useSkills must be used within a SkillProvider');
  }
  return context;
};
