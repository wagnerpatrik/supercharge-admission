import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { isLoading, getDeck } from '../store/board/board.selectors';

import { Card } from '../shared/models';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  public deck$: Observable<Card[]>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store<{}>, private router: Router) {}

  public ngOnInit(): void {
    const { store, router } = this;

    this.isLoading$ = store.pipe(select(isLoading));

    this.deck$ = store.pipe(
      select(getDeck),
      tap(({ length }) => !length && router.navigateByUrl(`board/start`)),
    );
  }
}
