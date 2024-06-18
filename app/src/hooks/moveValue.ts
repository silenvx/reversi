import { useState, useEffect } from "react";

import { DiscType } from "@/domains/reversi/const";
import { calculateMoveValues } from "@/domains/reversi/evaluate";

type UseMoveValuesProps = {
  board: DiscType[][];
  currentPlayer: DiscType;
};

export const useMoveValues = ({ board, currentPlayer }: UseMoveValuesProps) => {
  const [moveValues, setMoveValues] = useState<
    Array<{ row: number; col: number; value: number }>
  >([]);

  useEffect(() => {
    const values = calculateMoveValues(board, currentPlayer);
    setMoveValues(values);
  }, [board, currentPlayer]);

  return {
    moveValues,
  };
};
