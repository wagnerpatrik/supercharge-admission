import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DEFAULT_DECK_SIZE } from '../shared/constants';
import { getRandomName } from '../shared/utils';

import { GenerateDeck } from '../store/board/board.actions';
import { getUser } from '../store/leaderboard/leaderboard.selectors';
import { SetUser } from '../store/leaderboard/leaderboard.actions';
import { getCanContinue } from '../store/board/board.selectors';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],
})
export class NewGameComponent implements OnInit {
  public gameForm: FormGroup;
  public user$: Observable<string>;
  public canContinueLastGame$: Observable<boolean>;

  public get deckSize(): AbstractControl {
    return this.gameForm.get('deckSize');
  }

  constructor(private fb: FormBuilder, private store: Store<{}>, private router: Router) {
    this.gameForm = this.fb.group({
      deckSize: [
        '',
        [Validators.required, Validators.min(3), Validators.max(10), Validators.pattern(/[0-9]/)],
      ],
      userName: ['', []],
    });
  }

  public ngOnInit(): void {
    [this.user$, this.canContinueLastGame$] = this.initialiseStreams();
  }

  private initialiseStreams = (): [Observable<string>, Observable<boolean>] => [
    this.store.pipe(
      select(getUser),
      tap((userName) => !!userName && this.gameForm.patchValue({ userName })),
    ),
    this.store.pipe(select(getCanContinue)),
  ]

  public navigate(url: string): void {
    this.router.navigate([url]);
  }

  public onSubmit({ value: { deckSize, userName } }: FormGroup): void {
    this.store.dispatch(new SetUser(userName || getRandomName()));
    this.store.dispatch(new GenerateDeck(parseInt(deckSize, 10) || DEFAULT_DECK_SIZE));
  }
}
