import { Disc, DiscType, SkillState } from "@/domains/reversi/const";
import { SkillID, SkillIDType } from "@/domains/reversi/skillcard";
import { HandContextType } from "@/hooks/handContext";
import { ReversiGameType } from "@/hooks/reversiGame";
import { SkillContextType } from "@/hooks/reversiSkill";

/**
 * 相手の手札を1枚捨てる
 *
 * @param {ReversiGameType} game
 * @param {HandContextType} hand 手札のコンテキスト
 * @returns {boolean} 成功したかどうか
 */
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

/**
 * ゲームをリセットする
 *
 * @param {ReversiGameType} game
 * @returns {boolean} 成功したかどうか
 */
const reset = (game: ReversiGameType): boolean => {
  game.reset();
  return true;
};

/**
 * ランダムな場所に石を置く
 *
 * @param {ReversiGameType} game
 * @returns {boolean} 成功したかどうか
 */
const makeRandom = (game: ReversiGameType): boolean => {
  let row = 0;
  let col = 0;
  do {
    row = Math.floor(Math.random() * 8);
    col = Math.floor(Math.random() * 8);
  } while (!game.makeMove(row, col));

  return true;
};

const timeLeap = (game: ReversiGameType): boolean => game.revertMove(2);

/**
 * 相手の手札を1枚奪う
 *
 * @param {ReversiGameType} game
 * @param {HandContextType} hand 手札のコンテキスト
 * @returns {boolean} 成功したかどうか
 */
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
    SkillState.Highlight,
  );
  return true;
};

// create key-value pair of skill id and its executor function

/**
 * スキルIDに対応するスキルカードの効果を実行する
 *
 * @export
 * @param {SkillIDType} skillId
 * @param {ReversiGameType} game
 * @param {HandContextType} handContext
 * @param {SkillContextType} skills
 * @returns {boolean}
 */
export function ExecuteSkillCard(
  skillId: SkillIDType,
  game: ReversiGameType,
  handContext: HandContextType,
  skills: SkillContextType,
): boolean {
  switch (skillId) {
    case SkillID.discardOpponentCard:
      return discardOpponentCard(game, handContext);
    case SkillID.Reset:
      return reset(game);
    case SkillID.makeRandom:
      return makeRandom(game);
    case SkillID.timeLeap:
      return timeLeap(game);
    case SkillID.stealOpponentCard:
      return stealSkillCard(game, handContext);
    case SkillID.lightup:
      return lightup(game, skills);
    default:
      return false;
  }
}
