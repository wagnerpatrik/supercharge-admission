import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeaderboardState } from './leaderboard.state';

const getLeaderboardState = createFeatureSelector<LeaderboardState>('leaderboard');
