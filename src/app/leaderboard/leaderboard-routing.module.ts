import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderboardComponent } from './leaderboard.component';

const ROUTES: Routes = [{ path: '', component: LeaderboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class LeaderboardRoutingModule {}
