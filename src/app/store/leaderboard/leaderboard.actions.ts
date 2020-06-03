import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LeaderboardEntry } from 'src/app/shared/models';

export const FETCH_LEADERBOARD = '[LEADERBOARD] FETCH_LEADERBOARD';
export const FETCH_LEADERBOARD_SUCCESS = '[LEADERBOARD] FETCH_LEADERBOARD_SUCCESS';
export const FETCH_LEADERBOARD_ERROR = '[LEADERBOARD] FETCH_LEADERBOARD_ERROR';

export const UPDATE_LEADERBOARD = '[LEADERBOARD] UPDATE_LEADERBOARD';
export const UPDATE_LEADERBOARD_SUCCESS = '[LEADERBOARD] UPDATE_LEADERBOARD_SUCCESS';
export const UPDATE_LEADERBOARD_ERROR = '[LEADERBOARD] UPDATE_LEADERBOARD_ERROR';

export const SET_USER = '[LEADERBOARD] SET_USER';

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public user: string) {}
}

export class FetchLeaderboard implements Action {
  readonly type = FETCH_LEADERBOARD;
}
export class FetchLeaderboardSuccess implements Action {
  readonly type = FETCH_LEADERBOARD_SUCCESS;
  constructor(public leaderboard: LeaderboardEntry[]) {}
}
export class FetchLeaderboardError implements Action {
  readonly type = FETCH_LEADERBOARD_ERROR;
  constructor(public error: HttpErrorResponse) {}
}

export class UpdateLeaderboard implements Action {
  readonly type = UPDATE_LEADERBOARD;
}
export class UpdateLeaderboardSuccess implements Action {
  readonly type = UPDATE_LEADERBOARD_SUCCESS;
  constructor(public leaderboard: LeaderboardEntry[]) {}
}
export class UpdateLeaderboardError implements Action {
  readonly type = UPDATE_LEADERBOARD_ERROR;
  constructor(public error: HttpErrorResponse) {}
}

export type All =
  | SetUser
  | FetchLeaderboard
  | FetchLeaderboardSuccess
  | FetchLeaderboardError
  | UpdateLeaderboard
  | UpdateLeaderboardSuccess
  | UpdateLeaderboardError;
