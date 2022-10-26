import React from "react";
import { Starter } from "./Starter";
import { Container } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { IsGameOnStateAtom } from "./state/atoms";
import { Game } from "./Game";

export const AppContainer: React.FC = () => {
  const isGameOn = useRecoilValue(IsGameOnStateAtom);
  return (
    <Container>
      {!isGameOn && <Starter />}
      {isGameOn && <Game />}
    </Container>
  );
};
