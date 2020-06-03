import { LeaderboardState } from './leaderboard.state';
import * as LeaderboardActions from './leaderboard.actions';

export type Action = LeaderboardActions.All;

const initialState: LeaderboardState = {};

export function LeaderboardReducer(state = initialState, action: Action): LeaderboardState {
  switch (action.type) {
    default:
      return state;
  }
}
