import React from "react";
import { Card, Button } from "react-bootstrap";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IsGameOnStateAtom, Player, PlayerStateAtom } from "./state/atoms";

export const Starter: React.FC = () => {
  const [players, setPlayers] = useRecoilState(PlayerStateAtom);
  const setGameOn = useSetRecoilState(IsGameOnStateAtom);
  /**
   * Set the card title based on player count
   */
  const cardTitle = React.useMemo(() => {
    if (players.length === 0) {
      return "Enter Player 1 Name";
    } else {
      return "Enter Player 2 Name";
    }
  }, [players]);

  const [enteredText, setEnteredText] = React.useState("");
  const [playComputer, setPlayComputer] = React.useState(false);

  /**
   * We will only display computer in the second player option
   */
  const shouldShowComputerButton = React.useMemo(
    () => players.length === 1,
    [players]
  );

  /**
   * Callback called on hitting save player button
   */
  const savePlayer = React.useCallback(() => {
    //Create a new player object and save it
    const newPlayer: Player = {
      isComputer: playComputer,
      playerName: enteredText,
    };
    setPlayers([...players, newPlayer]);
    // Reset text-box to empty
    setEnteredText("");
  }, [enteredText, playComputer, players, setPlayers]);

  /**
   * Set the button text based on player count
   */
  const buttonText = React.useMemo(() => {
    if (players.length === 0) {
      return "Save & Enter Next";
    } else {
      return "Start Game";
    }
  }, [players]);

  // If we have 2 players already it's time to start the game
  React.useEffect(() => {
    if (players.length === 2) {
      setGameOn(true);
    }
  }, [players, setGameOn]);

  return (
    <Card className="mt-5 d-flex align-items-center justify-content-center">
      <Card.Body>
        <Card.Title>{cardTitle}</Card.Title>
        <Card.Text>
          <input
            type="text"
            onChange={(e) => setEnteredText(e.target.value)}
            value={enteredText}
          />
        </Card.Text>
        {shouldShowComputerButton && (
          <div className="m-2">
            <input
              type="checkbox"
              checked={playComputer}
              onChange={() => setPlayComputer(!playComputer)}
            />{" "}
            Play against computer
          </div>
        )}
        <Button variant="primary" onClick={savePlayer}>
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
};
