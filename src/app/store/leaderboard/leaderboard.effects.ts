import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, tap, withLatestFrom } from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { DB_URL, SECRET_KEY } from 'src/app/shared/constants';
import { LeaderboardEntry } from 'src/app/shared/models';

import * as LeaderboardActions from './leaderboard.actions';
import { getDeckSize, getMoves } from '../board/board.selectors';
import { getUser, getLeaderboard } from './leaderboard.selectors';

@Injectable()
export class LeaderboardEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<{}>
  ) {}

  @Effect()
  fetchLeaderboard$: Observable<Action> = this.actions$.pipe(
    ofType<LeaderboardActions.FetchLeaderboard>(LeaderboardActions.FETCH_LEADERBOARD),
    mergeMap((_) =>
      this.http.get(DB_URL, { headers: new HttpHeaders({ 'secret-key': SECRET_KEY }) }).pipe(
        map(
          ({ leaderboard }: { leaderboard: LeaderboardEntry[] }) =>
            new LeaderboardActions.FetchLeaderboardSuccess(leaderboard),
        ),
        catchError((error) => of(new LeaderboardActions.FetchLeaderboardError(error))),
      ),
    ),
  );

  @Effect()
  updateLeaderboard$: Observable<Action> = this.actions$.pipe(
    ofType<LeaderboardActions.UpdateLeaderboard>(LeaderboardActions.UPDATE_LEADERBOARD),
    withLatestFrom(
      this.store.pipe(select(getDeckSize)),
      this.store.pipe(select(getMoves)),
      this.store.pipe(select(getUser)),
      this.store.pipe(select(getLeaderboard)),
    ),
    map(([, deckSize, { length: moves }, name, board]) => ({
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
    mergeMap(([payload, headers]: [string, HttpHeaders]) =>
      this.http.put(DB_URL, payload, { headers }).pipe(
        map(
          ({ data: { leaderboard } }: { data: { leaderboard: LeaderboardEntry[] } }) =>
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
