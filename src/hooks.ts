// The rock paper scissor logic
import { cloneDeep } from "lodash";
import {
  CHOICE,
  GameMessageAtom,
  GameStateAtom,
  PlayerStateAtom,
} from "./state/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

/**
 * Hook that returns a function to calculate winner and update scores
 */
export const useCalculateWinnerAndUpdateScores = () => {
  const players = useRecoilValue(PlayerStateAtom);
  const [gameState, setGameState] = useRecoilState(GameStateAtom);
  const setGameMessage = useSetRecoilState(GameMessageAtom);
  return function () {
    const player1 = players[0].playerName;
    const player2 = players[1].playerName;
    const player1Selection = gameState.selection[0];
    const player2Selection = gameState.selection[1];
    const newState = cloneDeep(gameState);
    switch (player1Selection) {
      case CHOICE.ROCK:
        if (player2Selection === CHOICE.PAPER) {
          // Player 2 wins
          newState.scores[1] = newState.scores[1] + 1;
          setGameMessage(
            `${player2Selection} (${player2}) beats ${player1Selection} (${player1})`
          );
        } else if (player2Selection === CHOICE.SCISSOR) {
          // Player 1 wins
          newState.scores[0] = newState.scores[0] + 1;
          setGameMessage(
            `${player1Selection} (${player1}) beats ${player2Selection} (${player2})`
          );
        } else {
          setGameMessage(`${player1Selection} (${player1}) - ${player2Selection} (${player2}): No Result`);
        }
        break;
      case CHOICE.PAPER:
        if (player2Selection === CHOICE.ROCK) {
          // Player 1 wins
          newState.scores[0] = newState.scores[0] + 1;
          setGameMessage(
            `${player1Selection} (${player1}) beats ${player2Selection} (${player2})`
          );
        } else if (player2Selection === CHOICE.SCISSOR) {
          // Player 2 wins
          newState.scores[1] = newState.scores[1] + 1;
          setGameMessage(
            `${player2Selection} (${player2}) beats ${player1Selection} (${player1})`
          );
        } else {
          setGameMessage(`${player1Selection} (${player1}) - ${player2Selection} (${player2}): No Result`);
        }
        break;
      case CHOICE.SCISSOR:
        if (player2Selection === CHOICE.ROCK) {
          // Player 2 wins
          newState.scores[1] = newState.scores[1] + 1;
          setGameMessage(
            `${player2Selection} (${player2}) beats ${player1Selection} (${player1})`
          );
        } else if (player2Selection === CHOICE.PAPER) {
          // Player 1 wins
          newState.scores[0] = newState.scores[0] + 1;
          setGameMessage(
            `${player1Selection} (${player1}) beats ${player2Selection} (${player2})`
          );
        } else {
          setGameMessage(`${player1Selection} (${player1}) - ${player2Selection} (${player2}): No Result`);
        }
        break;
      default:
        setGameMessage(`${player1Selection} - ${player2Selection} : No Result`);
    }
    newState.selection = [];
    setGameState(newState);
  };
};
