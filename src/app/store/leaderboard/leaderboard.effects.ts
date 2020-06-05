import { ApiService } from './../../shared/api.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {
  mergeMap,
  map,
  catchError,
  tap,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { SECRET_KEY } from 'src/app/shared/constants';
import { LeaderboardEntry } from 'src/app/shared/models';

import * as LeaderboardActions from './leaderboard.actions';
import { getDeckSize, getMoves } from '../board/board.selectors';
import { getUser, getLeaderboard } from './leaderboard.selectors';

@Injectable()
export class LeaderboardEffects {
  constructor(
    private store: Store<{}>,
    private actions$: Actions,
    private apiService: ApiService,
  ) {}

  @Effect()
  fetchLeaderboard$: Observable<Action> = this.actions$.pipe(
    ofType<LeaderboardActions.FetchLeaderboard>(LeaderboardActions.FETCH_LEADERBOARD),
    mergeMap((_) =>
      this.apiService.fetchLeaderboard$().pipe(
        map((leaderboard) => new LeaderboardActions.FetchLeaderboardSuccess(leaderboard)),
        catchError((error) => of(new LeaderboardActions.FetchLeaderboardError(error))),
      ),
    ),
  );

  @Effect()
  updateLeaderboard$: Observable<Action | any> = this.actions$.pipe(
    ofType<LeaderboardActions.UpdateLeaderboard>(LeaderboardActions.UPDATE_LEADERBOARD),
    withLatestFrom(this.store.pipe(select(getLeaderboard))),
    switchMap(([, board]) => (!board.length ? this.apiService.fetchLeaderboard$() : of(board))),
    withLatestFrom(
      this.store.pipe(select(getDeckSize)),
      this.store.pipe(select(getMoves)),
      this.store.pipe(select(getUser)),
    ),
    map(([board, deckSize, { length: moves }, name]) => ({
      leaderboard: [...board, { name, config: { deckSize, moves } }],
    })),
    map((payload) => [
      JSON.stringify(payload),
      new HttpHeaders({
        versioning: 'false',
        'secret-key': SECRET_KEY,
        'Content-Type': 'application/json',
      }),
    ]),
    mergeMap((payload: [string, HttpHeaders]) =>
      this.apiService.updateLeaderboard$(payload).pipe(
        map(
          (leaderboard: LeaderboardEntry[]) =>
            new LeaderboardActions.UpdateLeaderboardSuccess(leaderboard),
        ),
        catchError((error) => of(new LeaderboardActions.UpdateLeaderboardError(error))),
      ),
    ),
  );

  @Effect({ dispatch: false })
  saveUser$: Observable<LeaderboardActions.SetUser> = this.actions$.pipe(
    ofType<LeaderboardActions.SetUser>(LeaderboardActions.SET_USER),
    tap(({ user }) => window.localStorage.setItem('user', user)),
  );
}
