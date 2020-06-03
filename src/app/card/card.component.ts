import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { withLatestFrom, map } from 'rxjs/operators';

import { Card } from '../shared/models';
import { getBaseID } from '../shared/utils';

import { isCardFound, getCardVisibility } from '../store/board/board.selectors';
import { AddToMoves, SetCardVisibility } from '../store/board/board.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() public card: Card;
  public isCardFlipped$: Observable<boolean>;

  constructor(private store: Store<{}>) {}

  public ngOnInit(): void {
    const { card, store } = this;
    const isFound$ = store.pipe(select(isCardFound(getBaseID(card.id))));

    this.isCardFlipped$ = store.pipe(
      select(getCardVisibility(card.id)),
      withLatestFrom(isFound$),
      map(([isVisible, isGuessed]) =>
        isGuessed ? true : isVisible === undefined ? false : isVisible,
      ),
    );
  }

  public flipCard({ id }: Card): void {
    this.store.dispatch(new AddToMoves(id));
    this.store.dispatch(new SetCardVisibility({ [id]: true }));
  }
}
