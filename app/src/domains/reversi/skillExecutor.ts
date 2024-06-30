import { Disc, DiscType } from "@/domains/reversi/const";
import { HandContextType } from "@/hooks/handContext";
import { ReversiGameType } from "@/hooks/reversiGame";
import { SkillContextType } from "@/hooks/reversiSkill";

const discardOpponentCard = (
  game: ReversiGameType,
  hand: HandContextType,
): boolean => {
  const opponentHands =
    game.currentPlayer === Disc.black ? hand.whiteHands : hand.blackHands;
  if (opponentHands.length === 0) {
    return false;
  }
  const card = opponentHands[Math.floor(Math.random() * opponentHands.length)];
  hand.discardCard(
    game.currentPlayer === Disc.black ? Disc.white : Disc.black,
    card.id,
  );
  return true;
};

const reset = (game: ReversiGameType): boolean => {
  game.reset();
  return true;
};

const makeRamdom = (game: ReversiGameType): boolean => {
  let row = 0;
  let col = 0;
  do {
    row = Math.floor(Math.random() * 8);
    col = Math.floor(Math.random() * 8);
  } while (!game.makeMove(row, col));

  return true;
};

const timeLeap = (game: ReversiGameType): boolean => game.revertMove(2);

const stealSkillCard = (
  game: ReversiGameType,
  hand: HandContextType,
): boolean => {
  const opponentHands =
    game.currentPlayer === Disc.black ? hand.whiteHands : hand.blackHands;
  if (opponentHands.length === 0) {
    return false;
  }
  const card = opponentHands[Math.floor(Math.random() * opponentHands.length)];
  const oppeonent = game.currentPlayer === Disc.black ? Disc.white : Disc.black;
  hand.discardCard(oppeonent, card.id);
  hand.addCard(game.currentPlayer, card);
  return true;
};

const lightup = (game: ReversiGameType, skills: SkillContextType): boolean => {
  skills.toggleSkill(
    game.currentPlayer as Exclude<DiscType, undefined>,
    "highlight",
  );
  return true;
};

// create key-value pair of skill id and its executor function

export function ExecuteSkillCard(
  skillId: string,
  game: ReversiGameType,
  handContext: HandContextType,
  skills: SkillContextType,
): boolean {
  switch (skillId) {
    case "discardOpponentCard":
      return discardOpponentCard(game, handContext);
    case "Reset":
      return reset(game);
    case "makeRamdom":
      return makeRamdom(game);
    case "timeLeap":
      return timeLeap(game);
    case "stealOpponentCard":
      return stealSkillCard(game, handContext);
    case "lightup":
      return lightup(game, skills);
    default:
      return false;
  }
}
