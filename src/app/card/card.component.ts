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
    const { card: { id }, store } = this;
    const isFound$ = store.pipe(select(isCardFound(getBaseID(id))));

    this.isCardFlipped$ = store.pipe(
      select(getCardVisibility(id)),
      withLatestFrom(isFound$),
      map(([isFlipped, isFound]) =>
        isFound ? true : isFlipped === undefined ? false : isFlipped,
      ),
    );
  }

  public flipCard({ id }: Card): void {
    this.store.dispatch(new AddToMoves([id]));
    this.store.dispatch(new SetCardVisibility({ [id]: true }));
  }
}
