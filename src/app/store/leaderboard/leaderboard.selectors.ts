import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeaderboardState } from './leaderboard.state';

const getLeaderboardState = createFeatureSelector<LeaderboardState>('leaderboard');

export const getUser = createSelector(getLeaderboardState, ({ user }) => user);
export const getError = createSelector(getLeaderboardState, ({ error }) => !!error);
export const getLeaderboard = createSelector(getLeaderboardState, ({ leaderboard }) => leaderboard);
export const isLoading = createSelector(getLeaderboardState, ({ loading }) => loading);
