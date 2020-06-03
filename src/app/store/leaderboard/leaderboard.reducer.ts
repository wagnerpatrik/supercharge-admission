import { LeaderboardState } from './leaderboard.state';
import * as LeaderboardActions from './leaderboard.actions';

export type Action = LeaderboardActions.All;

const initialState: LeaderboardState = {
  leaderboard: [],
  error: null,
  loading: false,
  user: null,
};

export function LeaderboardReducer(state = initialState, action: Action): LeaderboardState {
  switch (action.type) {
    case LeaderboardActions.SET_USER: {
      return { ...state, user: action.user };
    }

    case LeaderboardActions.FETCH_LEADERBOARD: {
      return { ...state, loading: true, error: null };
    }

    case LeaderboardActions.FETCH_LEADERBOARD_SUCCESS: {
      return { ...state, leaderboard: [...action.leaderboard], loading: false };
    }

    case LeaderboardActions.FETCH_LEADERBOARD_ERROR: {
      return { ...state, loading: false, error: { ...action.error } };
    }

    case LeaderboardActions.UPDATE_LEADERBOARD: {
      return { ...state, loading: true, error: null };
    }

    case LeaderboardActions.UPDATE_LEADERBOARD_SUCCESS: {
      return { ...state, loading: false, leaderboard: [...action.leaderboard] };
    }

    case LeaderboardActions.UPDATE_LEADERBOARD_ERROR: {
      return { ...state, loading: false, error: { ...action.error } };
    }

    default:
      return state;
  }
}
