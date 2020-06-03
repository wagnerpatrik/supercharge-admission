import { Action } from '@ngrx/store';

export const FETCH_LEADERBOARD = '[LEADERBOARD] FETCH_LEADERBOARD';

export class FetchLeaderboard implements Action {
  readonly type = FETCH_LEADERBOARD;
}

export type All = FetchLeaderboard;
