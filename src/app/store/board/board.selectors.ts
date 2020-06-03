import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from './board.state';

const getBoardState = createFeatureSelector<BoardState>('board');

export const getDeck = createSelector(getBoardState, ({ deck }) => deck);
export const getMoves = createSelector(getBoardState, ({ moves }) => moves);
export const isLoading = createSelector(getBoardState, ({ loading }) => loading);
export const getDeckSize = createSelector(getBoardState, ({ deckSize }) => deckSize);
export const getFoundPairs = createSelector(getBoardState, ({ foundPairs }) => foundPairs);
export const getCardsVisibility = createSelector(
  getBoardState,
  ({ cardsVisibility }) => cardsVisibility,
);

export const isCardFound = (id: string) =>
  createSelector(getBoardState, ({ foundPairs }) => foundPairs.includes(id));

export const getCardVisibility = (id: string) =>
  createSelector(getBoardState, ({ cardsVisibility }) => cardsVisibility[id]);
