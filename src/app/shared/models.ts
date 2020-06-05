// tslint:disable:interface-over-type-literal

export type Card = {
  id: string;
  imgSource: string;
};

export type CardVisibilityState = {
  [id: string]: boolean
};

export type LeaderboardEntry = {
  name: string;
  config: { deckSize: number; moves: number };
};

export type LastGameState = {
  cardState: Card[];
  pairsFound: string[];
  deckSize: number;
  moves: string[];
};

export enum LastGameStateKeys {
  PairsFound = 'pairs',
  DeckSize = 'deckSize',
  CardState = 'cardState',
  MovesTaken = 'moves',
}
