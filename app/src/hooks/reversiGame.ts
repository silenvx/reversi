import { useState, useEffect, useCallback } from "react";

import { configReversi } from "@/config/reversi";
import {
  checkMakeable,
  checkMakeableAll,
  checkWinner,
  createBoard,
  discCount,
  reverse,
} from "@/domains/reversi/compute";
import {
  DiscType,
  Disc,
  Winner,
  WinnerType,
  MoveScore,
  PlayerBoardEvaluation,
} from "@/domains/reversi/const";
import { evaluateBoard, calculateMoveScores } from "@/domains/reversi/evaluate";
import { useHandContext } from "@/hooks/handContext";
import { useSkills } from "@/hooks/reversiSkill";

export type ReversiGameType = {
  board: DiscType[][];
  currentPlayer: DiscType;
  winner: WinnerType;
  makeMove: (row: number, col: number) => boolean;
  checkMakeable: (row: number, col: number) => boolean;
  getScore: (disc: DiscType) => number;
  reset: () => void;
  hardReset: () => void;
  hint: () => void;
  isVisible: boolean;
  revertMove: (count?: number) => boolean;
  moveScores: Array<MoveScore>;
  boardEvaluatedScore: PlayerBoardEvaluation;
};

/**
 * リバーシのカスタムフック
 * @returns {ReversiGameType} リバーシのカスタムフック
 * */
export const useReversiGame = (): ReversiGameType => {
  const initialBoard = createBoard({
    boardX: configReversi.boardX,
    boardY: configReversi.boardY,
  });

  // 初期配置
  initialBoard[3][3] = Disc.white;
  initialBoard[4][4] = Disc.white;
  initialBoard[3][4] = Disc.black;
  initialBoard[4][3] = Disc.black;

  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<DiscType>(Disc.black);
  const [winner, setWinner] = useState<WinnerType | undefined>(undefined);
  const [passCount, setPassCount] = useState(0);
  const [boardHistory, setBoardHistory] = useState<DiscType[][][]>([
    initialBoard,
  ]);
  const [moveScores, setMoveScores] = useState<Array<MoveScore>>([]);
  const [boardEvaluatedScore, setBoardEvaluatedScore] =
    useState<PlayerBoardEvaluation>({
      black: 0,
      white: 0,
    });

  const { resetCard } = useHandContext();
  const { resetSkills } = useSkills();

  /**
   * 石を置く
   * @param {number} row 置く行
   * @param {number} col 置く列
   * @returns {boolean} 石を置けたかどうか
   */
  const makeMove = (row: number, col: number): boolean => {
    if (board[row][col] !== undefined) {
      return false;
    }
    if (
      !checkMakeable({
        board,
        row,
        col,
        currentPlayer,
      })
    ) {
      return false;
    }
    setBoardHistory([...boardHistory, board]);
    const newBoard = reverse({ board, row, col, currentPlayer });
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === Disc.black ? Disc.white : Disc.black);
    return true;
  };

  const revertMove = (count: number = 1): boolean => {
    if (boardHistory.length <= count) {
      return false;
    }
    const newBoard = boardHistory.slice(0, -count);
    setBoard(newBoard[newBoard.length - 1]);
    setBoardHistory(newBoard);
    if (count % 2 === 1) {
      setCurrentPlayer(currentPlayer === Disc.black ? Disc.white : Disc.black);
    }
    return true;
  };

  /**
   * リセット
   */
  const reset = () => {
    setBoard(initialBoard);
    setBoardHistory([initialBoard]);
    setCurrentPlayer(Disc.black);
    setWinner(undefined);
    setPassCount(0);
  };

  const hardReset = () => {
    reset();
    resetCard();
    resetSkills();
  };

  // boardが変化したときの処理
  useEffect(() => {
    if (
      !checkMakeableAll({
        board,
        currentPlayer,
      })
    ) {
      if (passCount === 1) {
        setWinner(Winner.draw);
      }
      setCurrentPlayer(currentPlayer === Disc.black ? Disc.white : Disc.black);
      setPassCount(passCount + 1);
    } else {
      setPassCount(0);
    }
    const newWinner = checkWinner(board);
    setWinner(newWinner);
  }, [discCount(board), passCount]);

  /**
   * 現在のboardとcurrentPlayerで石を置けるかどうかの判定
   * @param row 置く行
   * @param col 置く列
   * @returns
   */
  const checkMakeableWrapper = (row: number, col: number) =>
    checkMakeable({
      board,
      row,
      col,
      currentPlayer,
    });
  /*
  ヒント画面の表示を制御するためのフック
   */
  // useStateフックを使って、要素の可視性を制御
  const [isVisible, setIsVisible] = useState(false);

  // ボタンがクリックされたときに呼び出される関数
  const hint = () => {
    setIsVisible(!isVisible);
  };

  const getScore = (disc: DiscType) => {
    const [blackCount, whiteCount] = discCount(board);
    if (disc === Disc.black) {
      return blackCount;
    }
    return whiteCount;
  };

  // board と currentPlayer が変更されない限り同じ関数を返すメモ化された calculateMoveScores 関数
  const memorizedCalculateMoveScores = useCallback(
    () => calculateMoveScores(board, currentPlayer),
    [board, currentPlayer],
  );

  // メモ化された関数が変更されたときに新たな盤面スコアがセットされる
  useEffect(() => {
    const scores = memorizedCalculateMoveScores();
    setMoveScores(scores);
  }, [memorizedCalculateMoveScores]);

  // 盤面が変化した際に、評価値をセットする
  useEffect(() => {
    setBoardEvaluatedScore({
      white: evaluateBoard(board, Disc.white),
      black: evaluateBoard(board, Disc.black),
    });
  }, [currentPlayer]);

  return {
    board,
    currentPlayer,
    winner,
    makeMove,
    checkMakeable: checkMakeableWrapper,
    getScore,
    reset,
    hardReset,
    hint,
    isVisible,
    revertMove,
    moveScores,
    boardEvaluatedScore,
  };
};
