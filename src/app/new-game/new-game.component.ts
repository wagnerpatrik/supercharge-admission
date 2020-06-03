import { Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import { GenerateDeck } from '../store/board/board.actions';
import { DEFAULT_DECK_SIZE } from '../shared/constants';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],
})
export class NewGameComponent {
  public gameForm: FormGroup;

  public get deckSize(): AbstractControl {
    return this.gameForm.get('deckSize');
  }

  constructor(private fb: FormBuilder, private store: Store<{}>) {
    this.gameForm = this.fb.group({
      deckSize: [
        '',
        [Validators.required, Validators.min(3), Validators.max(10), Validators.pattern(/[0-9]/)],
      ],
    });
  }

  public onSubmit = ({ value: { deckSize }, valid }: FormGroup) =>
    valid && this.store.dispatch(new GenerateDeck(parseInt(deckSize, 10) || DEFAULT_DECK_SIZE));
}
