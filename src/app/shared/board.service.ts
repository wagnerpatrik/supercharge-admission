import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { Card, LastGameState, LastGameStateKeys } from './models';
import { TECHNOLOGIES, CARDS_PATH, EXTENSION } from './constants';
import { compose } from './utils';

import {
  SetDeck,
  SetNewPair,
  SetDeckSize,
  SetCanContinueLastGame,
  AddToMoves,
} from '../store/board/board.actions';
import { FetchLeaderboard } from '../store/leaderboard/leaderboard.actions';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private createDeck = compose(
    this.shuffle,
    this.doubleDeck,
    this.generateCards
  );

  constructor(private store: Store<{}>) {}

  private generateCards(deckSize: number): Card[] {
    return TECHNOLOGIES.slice(0, deckSize).map(
      (tech, i) => ({ id: `${i}`, imgSource: `${CARDS_PATH}${tech}${EXTENSION}` } as Card),
    );
  }

  private doubleDeck(deck: Card[]): Card[] {
    return [
      ...deck.map(({ id, imgSource }) => ({ id: `${id}x`, imgSource })),
      ...deck.map(({ id, imgSource }) => ({ id: `${id}y`, imgSource })),
    ];
  }

  private shuffle(deck: Card[]): Card[] {
    return deck
      .map((card) => [Math.random(), card])
      .sort(([x]: [number], [y]: [number]) => x - y)
      .map(([, card]: [number, Card]) => card);
  }

  private loadPrevGame({ cardState, pairsFound, deckSize, moves }: LastGameState): void {
    this.store.dispatch(new SetDeck(cardState));
    this.store.dispatch(new AddToMoves(moves));
    this.store.dispatch(new FetchLeaderboard());
    this.store.dispatch(new SetDeckSize(deckSize));
    this.store.dispatch(new SetNewPair(pairsFound));
    this.store.dispatch(new SetCanContinueLastGame(true));
  }

  public shouldLoadPrevGame(): void {
    const [pairsFound, deckSize, cardState, moves] = Object.values(LastGameStateKeys).map(
      (key) => JSON.parse(window.localStorage.getItem(key)),
    );

    return (
      pairsFound &&
      pairsFound.length < deckSize &&
      this.loadPrevGame({ cardState, pairsFound, deckSize, moves })
    );
  }

  public getDeck(deckSize: number): Observable<Card[]> {
    return of(this.createDeck(deckSize));
  }
}
