import { Action } from '@ngrx/store';
import { Card } from 'src/app/shared/models';

export const ADD_TO_MOVES = '[BOARD] ADD_TO_MOVES';
export const SET_NEW_PAIR = '[BOARD] SET_NEW_PAIR';
export const GENERATE_DECK = '[BOARD] GENERATE_DECK';
export const SET_DECK = '[BOARD] SET_DECK';
export const SET_DECK_SIZE = '[BOARD] SET_DECK_SIZE';
export const SET_CARD_VISIBILITY = '[BOARD] SET_CARD_VISIBILITY';
export const NEW_GAME = '[BOARD] NEW_GAME';
export const VICTORY = '[BOARD] VICTORY';
export const SET_CAN_CONTINUE_LAST_GAME = '[BOARD] SET_CAN_CONTINUE_LAST_GAME';

export class AddToMoves implements Action {
  readonly type = ADD_TO_MOVES;
  constructor(public id: string[]) {}
}

export class SetNewPair implements Action {
  readonly type = SET_NEW_PAIR;
  constructor(public id: string[]) {}
}

export class GenerateDeck implements Action {
  readonly type = GENERATE_DECK;
  constructor(public deckSize: number) {}
}

export class SetDeck implements Action {
  readonly type = SET_DECK;
  constructor(public deck: Card[]) {}
}

export class SetDeckSize implements Action {
  readonly type = SET_DECK_SIZE;
  constructor(public deckSize: number) {}
}

export class SetCardVisibility implements Action {
  readonly type = SET_CARD_VISIBILITY;
  constructor(public cardVisibility: { [id: string]: boolean }) {}
}

export class NewGame implements Action {
  readonly type = NEW_GAME;
}

export class Victory implements Action {
  readonly type = VICTORY;
}

export class SetCanContinueLastGame implements Action {
  readonly type = SET_CAN_CONTINUE_LAST_GAME;
  constructor(public canContinue: boolean) {}
}

export type All =
  | AddToMoves
  | SetNewPair
  | GenerateDeck
  | SetDeck
  | SetDeckSize
  | NewGame
  | Victory
  | SetCardVisibility
  | SetCanContinueLastGame;
