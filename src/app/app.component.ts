import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { SetUser } from './store/leaderboard/leaderboard.actions';
import { BoardService } from './shared/board.service';


@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [''],
})
export class AppComponent {
  constructor(private store: Store<{}>, private boardService: BoardService) {
    this.checkForUser();
    this.boardService.shouldLoadPrevGame();
  }

  private checkForUser(): void {
    const user = window.localStorage.getItem('user');
    return user ? this.store.dispatch(new SetUser(user)) : null;
  }
}
