import { BoardContainer } from "@/components/features/board/BoardContainer";
import { Disc, DiscType } from "@/domains/reversi/const";
import { SkillCard } from "@/domains/reversi/skillcard";
import { ReversiGameType } from "@/hooks/reversiGame";

type GamePresenterProps = {
  reversiGame: ReversiGameType;
  blackHands: SkillCard[];
  whiteHands: SkillCard[];
  drawCardForPlayer: (player: DiscType, adv: number) => void;
  playCard: (
    player: DiscType,
    cardId: SkillCard,
    game: ReversiGameType,
  ) => void;
};

export function GamePresenter({
  reversiGame,
  blackHands,
  whiteHands,
  drawCardForPlayer,
  playCard,
}: GamePresenterProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <p className="text-4xl font-bold">
          Player: {reversiGame.currentPlayer}
          <br />
          black:{" "}
          {
            reversiGame.board.flat().filter((disc) => disc === Disc.black)
              .length
          }
          <br />
          white:{" "}
          {
            reversiGame.board.flat().filter((disc) => disc === Disc.white)
              .length
          }
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {blackHands.map((card) => (
            <button
              type="button"
              disabled={reversiGame.currentPlayer !== Disc.black}
              onClick={() => playCard(Disc.black, card, reversiGame)}
              key={card.id}
              className="border border-black rounded p-2"
            >
              {card.name}
            </button>
          ))}
        </div>
        <p>Blackの手札</p>
        <BoardContainer reversiGame={reversiGame} />
        <div className="flex gap-2">
          {whiteHands.map((card) => (
            <button
              disabled={reversiGame.currentPlayer !== Disc.white}
              key={card.id}
              type="button"
              className="border border-black rounded p-2"
              onClick={() => playCard(Disc.white, card, reversiGame)}
            >
              {card.name}
            </button>
          ))}
        </div>
        <p>Whiteの手札</p>
        <button
          className="border border-black rounded p-2"
          type="button"
          onClick={reversiGame.reset}
        >
          Reset
        </button>
        <button
          type="button"
          // TODO:仮で1を渡している。本来は優劣に関する情報を渡す
          onClick={() => drawCardForPlayer(reversiGame.currentPlayer, 1)}
        >
          Draw(マスを踏んだ時にカードを引くけどいったんボタンでひかせる)
        </button>
      </div>
    </div>
  );
}
