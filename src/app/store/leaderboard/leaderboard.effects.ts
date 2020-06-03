import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class LeaderboardEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  fetchLeaderboard$: Observable<Action> = this.actions$.pipe();
}
