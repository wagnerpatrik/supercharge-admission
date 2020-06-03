import { Component, OnInit, Input } from '@angular/core';

import { Card } from '../shared/models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public card: Card;
  public isCardFlipped = false;

  constructor() { }
  public ngOnInit(): void {}
  public flipCard({ id }: Card) {}
}
