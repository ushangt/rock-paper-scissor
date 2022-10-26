import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { CHOICE, GameStateAtom, PlayerStateAtom } from "./state/atoms";
import { cloneDeep } from "lodash";
import { useCalculateWinnerAndUpdateScores } from "./hooks";

type PlayerScreenProps = {
  idx: number;
};

export const PlayerScreen: React.FC<PlayerScreenProps> = ({ idx }) => {
  const players = useRecoilValue(PlayerStateAtom);
  const player = React.useMemo(() => players[idx], [players, idx]);
  const [gameState, setGameState] = useRecoilState(GameStateAtom);

  const onClickButton = React.useCallback(
    (option: CHOICE) => {
      const newState = cloneDeep(gameState);
      newState.selection[idx] = option;
      setGameState(newState);
    },
    [gameState, idx, setGameState]
  );

  // If both players have made their selection calculate winner and increment scores
  const calculateWinner = useCalculateWinnerAndUpdateScores();
  React.useEffect(() => {
    if (gameState.selection.length === 2) {
      calculateWinner();
    }
  }, [calculateWinner, gameState.selection.length]);

  /**
   * Disable player 2 selection until player 1 has selected
   */
  const buttonsDisabled = React.useMemo(
    () => idx === 1 && !gameState.selection[0],
    [gameState.selection, idx]
  );

  return (
    <Container>
      <h2>
        {player.playerName} - {gameState.scores[idx]}
      </h2>
      <Row className="m-2">
        <Button
          onClick={() => onClickButton(CHOICE.ROCK)}
          disabled={buttonsDisabled}
        >
          Rock
        </Button>
      </Row>
      <Row className="m-2">
        <Button
          onClick={() => onClickButton(CHOICE.PAPER)}
          disabled={buttonsDisabled}
        >
          Paper
        </Button>
      </Row>
      <Row className="m-2">
        <Button
          onClick={() => onClickButton(CHOICE.SCISSOR)}
          disabled={buttonsDisabled}
        >
          Scissor
        </Button>
      </Row>
      {gameState.selection[idx]}
    </Container>
  );
};
