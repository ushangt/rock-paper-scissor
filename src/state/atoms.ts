import { atom } from "recoil";

export enum CHOICE {
  ROCK = "Rock",
  PAPER = "Paper",
  SCISSOR = "Scissor",
}

export type Player = {
  playerName: string;
  isComputer: boolean;
};

export const PlayerStateAtom = atom<Player[]>({
  key: "PlayerStateAtom",
  default: [],
});

export const IsGameOnStateAtom = atom<boolean>({
  key: "IsGameOnStateAtom",
  default: false,
});

export type GameState = {
  selection: CHOICE[];
  scores: number[];
};

const GameStateDefault = {
  selection: [],
  scores: [0, 0],
};

export const GameStateAtom = atom<GameState>({
  key: "GameStateAtom",
  default: GameStateDefault,
});

export const GameMessageAtom = atom<string>({
  key: "GameMessageAtom",
  default: "Make a selection",
});
