import { ReversiGameType } from "@/hooks/reversiGame";

export interface SkillCard {
  name: string;
  description: string;
  id: number;
  effect: number;
  execute: (game: ReversiGameType) => void;
}
