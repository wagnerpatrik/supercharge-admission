import { Card, CardVisibilityState } from 'src/app/shared/models';

export interface BoardState {
  deck: Card[];
  moves: string[];
  deckSize: number;
  loading: boolean;
  foundPairs: string[];
  canContinueLastGame: boolean;
  cardsVisibility: CardVisibilityState;
}
