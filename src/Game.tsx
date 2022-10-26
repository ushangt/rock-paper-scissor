import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PlayerScreen } from "./PlayerScreen";
import { useRecoilValue } from "recoil";
import { GameMessageAtom } from "./state/atoms";

export const Game: React.FC = () => {
  const gameMessage = useRecoilValue(GameMessageAtom);
  return (
    <Container>
      <h3> {gameMessage} </h3>
      <Row>
        <Col>
          <PlayerScreen idx={0} />
        </Col>
        <Col>
          <PlayerScreen idx={1} />
        </Col>
      </Row>
    </Container>
  );
};
