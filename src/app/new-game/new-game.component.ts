import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],
})
export class NewGameComponent implements OnInit {
  public gameForm: FormGroup;

  public get deckSize(): AbstractControl {
    return this.gameForm.get('deckSize');
  }

  constructor(private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      deckSize: [
        '',
        [Validators.required, Validators.min(3), Validators.max(10), Validators.pattern(/[0-9]/)],
      ],
    });
  }

  public ngOnInit(): void {}
  public onSubmit(form: FormGroup) {}
}
