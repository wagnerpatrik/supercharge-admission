// tslint:disable:interface-over-type-literal

export type Card = {
  id: string;
  imgSource: string;
};

export type CardVisibilityState = { [id: string]: boolean };

export type LeaderboardEntry = {
  name: string;
  config: { deckSize: number; moves: number };
};

export type LastGameState = {
  gameState: Card[];
  pairsFound: string[];
  deckSize: number;
  moves: string[];
};
