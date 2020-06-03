import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Card } from './models';
import { TECHNOLOGIES, CARDS_PATH, EXTENSION } from './constants';
import { compose } from './utils';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private createDeck = compose(
    this.shuffle,
    this.doubleDeck,
    this.generateCards
  );

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

  public getDeck(deckSize: number): Observable<Card[]> {
    return of(this.createDeck(deckSize));
  }
}
