import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { FetchLeaderboard } from 'src/app/store/leaderboard/leaderboard.actions';
import { getLeaderboard, isLoading, getError } from 'src/app/store/leaderboard/leaderboard.selectors';
import { LeaderboardEntry } from '../shared/models';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  public victorious: boolean;
  public hasError$: Observable<boolean>;
  public isLoading$: Observable<boolean>;
  public leaderboard$: Observable<LeaderboardEntry[]>;

  constructor(
    private router: Router,
    private store: Store<{}>,
    private activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new FetchLeaderboard());
    [this.leaderboard$, this.isLoading$, this.hasError$] = this.initialiseStreams();
    this.victorious =
      !!this.activatedRoute.snapshot.queryParams.victory &&
      (setTimeout(() => (this.victorious = false), 3000), true);
  }

  private initialiseStreams = (): [
    Observable<LeaderboardEntry[]>,
    Observable<boolean>,
    Observable<boolean>,
  ] => [
    this.store.pipe(
      select(getLeaderboard),
      filter((entries) => !!entries.length),
      map((entries) =>
        [...entries]
          .sort(({ config: cx }, { config: cy }) => cx.moves / cx.deckSize - cy.moves / cy.deckSize)
          .slice(0, 15),
      ),
    ),
    this.store.pipe(select(isLoading)),
    this.store.pipe(select(getError)),
  ]

  public navigateToStartScreen(): void {
    this.router.navigate(['/board/start']);
  }
}
