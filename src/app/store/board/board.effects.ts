import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, tap, withLatestFrom, filter, delay } from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as BoardActions from './board.actions';
import { getMoves, getCardsVisibility, getFoundPairs } from './board.selectors';

import { getBaseID } from 'src/app/shared/utils';
import { BoardService } from 'src/app/shared/board.service';
import { LastGameStateKeys } from 'src/app/shared/models';

@Injectable()
export class BoardEffects {
  private timerRef: number;

  constructor(
    private router: Router,
    private store: Store<{}>,
    private actions$: Actions,
    private boardService: BoardService,
  ) {}

  @Effect()
  generateDeck$: Observable<Action> = this.actions$.pipe(
    ofType<BoardActions.GenerateDeck>(BoardActions.GENERATE_DECK),
    mergeMap(({ deckSize }) =>
      this.boardService.getDeck(deckSize).pipe(
        tap((deck) => {
          this.router.navigate(['/board']);
          window.localStorage.setItem(LastGameStateKeys.CardState, JSON.stringify(deck));
          window.localStorage.setItem(LastGameStateKeys.DeckSize, JSON.stringify(deckSize));
        }),
        delay(500),
        map((deck) => new BoardActions.SetDeck(deck)),
        catchError((_) => of({} as Action)),
      ),
    ),
  );

  @Effect({ dispatch: false })
  compareCards$: Observable<Action | any> = this.actions$.pipe(
    ofType<BoardActions.SetCardVisibility>(BoardActions.SET_CARD_VISIBILITY),
    withLatestFrom(this.store.pipe(select(getMoves)), this.store.pipe(select(getCardsVisibility))),
    tap(([, moves]) =>
      window.localStorage.setItem(LastGameStateKeys.MovesTaken, JSON.stringify(moves)),
    ),
    tap(
      (_) =>
        this.timerRef &&
        ((this.timerRef = null), this.store.dispatch(new BoardActions.SetCardVisibility({}))),
    ),
    filter(
      ([, , cards]) =>
        !!Object.values(cards).length && !((Object.values(cards).length % 2) as number),
    ),
    map(([, moves, cards]) => Object.keys(cards).filter((c) => moves.slice(-2).includes(c))),
    tap(([x, y]) =>
      getBaseID(x) === getBaseID(y)
        ? this.store.dispatch(new BoardActions.SetNewPair([getBaseID(x)]))
        : (this.timerRef = window.setTimeout(
            () => this.store.dispatch(new BoardActions.SetCardVisibility({})),
            1000,
          )),
    ),
  );

  @Effect({ dispatch: false })
  resetGame$: Observable<Action> = this.actions$.pipe(
    ofType<BoardActions.NewGame>(BoardActions.NEW_GAME),
    tap((_) => this.router.navigate(['/board/start'])),
  );

  @Effect({ dispatch: false })
  victory$: Observable<Action> = this.actions$.pipe(
    ofType<BoardActions.Victory>(BoardActions.VICTORY),
    tap((_) => this.store.dispatch(new BoardActions.SetCanContinueLastGame(false))),
    tap((_) => this.router.navigate(['/board/leaderboard'], { queryParams: { victory: '!' } })),
    tap((_) => window.localStorage.clear()),
  );

  @Effect({ dispatch: false })
  savePairs$: Observable<Action | any> = this.actions$.pipe(
    ofType<BoardActions.SetNewPair>(BoardActions.SET_NEW_PAIR),
    withLatestFrom(this.store.pipe(select(getFoundPairs))),
    tap(([, pairs]) =>
      window.localStorage.setItem(LastGameStateKeys.PairsFound, JSON.stringify(pairs)),
    ),
  );
}
