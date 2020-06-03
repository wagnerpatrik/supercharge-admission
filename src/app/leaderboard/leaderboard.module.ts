import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderboardRoutingModule } from './leaderboard-routing.module';
import { SpinnerModule } from '../shared/spinner/spinner.module';

import { LeaderboardComponent } from './leaderboard.component';

@NgModule({
  declarations: [LeaderboardComponent],
  imports: [CommonModule, LeaderboardRoutingModule, SpinnerModule],
})
export class LeaderboardModule {}
