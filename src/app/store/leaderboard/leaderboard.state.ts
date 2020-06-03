import { LeaderboardEntry } from 'src/app/shared/models';
import { HttpErrorResponse } from '@angular/common/http';

export interface LeaderboardState {
  leaderboard: LeaderboardEntry[];
  error: HttpErrorResponse;
  loading: boolean;
  user: string;
}
