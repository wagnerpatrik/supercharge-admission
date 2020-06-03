import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as LeaderboardActions from './leaderboard.actions';

import { DB_URL, SECRET_KEY } from 'src/app/shared/constants';
import { LeaderboardEntry } from 'src/app/shared/models';

@Injectable()
export class LeaderboardEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

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

  @Effect({ dispatch: false })
  saveUser$: Observable<LeaderboardActions.SetUser> = this.actions$.pipe(
    ofType<LeaderboardActions.SetUser>(LeaderboardActions.SET_USER),
    tap(({ user }) => window.localStorage.setItem('user', user)),
  );
}
