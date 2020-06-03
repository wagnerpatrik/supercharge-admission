import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { BoardReducer } from './store/board/board.reducer';
import { BoardEffects } from './store/board/board.effects';
import { LeaderboardReducer } from './store/leaderboard/leaderboard.reducer';
import { LeaderboardEffects } from './store/leaderboard/leaderboard.effects';

const REDUCERS = { board: BoardReducer, leaderboard: LeaderboardReducer };
const EFFECTS = [BoardEffects, LeaderboardEffects];

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(REDUCERS),
    EffectsModule.forRoot(EFFECTS),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
