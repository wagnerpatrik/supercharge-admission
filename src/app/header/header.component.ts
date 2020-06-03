import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { NewGame, Victory } from '../store/board/board.actions';
import { getMoves, getFoundPairs, getDeckSize } from '../store/board/board.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public moves$: Observable<number>;
  public pairsFound$: Observable<number>;

  constructor(private store: Store<{}>) {}

  public ngOnInit(): void {
    [this.moves$, this.pairsFound$] = this.initialiseStream();
  }

  private initialiseStream = (): [Observable<number>, Observable<number>] => [
    this.store.pipe(
      select(getMoves),
      map(({ length }) => length),
    ),
    this.store.pipe(select(getFoundPairs)).pipe(
      withLatestFrom(this.store.pipe(select(getDeckSize))),
      tap(([pairs, deckSize]) => pairs.length === deckSize && this.store.dispatch(new Victory())),
      map(([pairs]) => pairs.length),
    ),
  ]

  public navigateToStartScreen(): void {
    this.store.dispatch(new NewGame());
  }
}
