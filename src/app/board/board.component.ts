import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Card } from '../shared/models';
import { BoardService } from '../shared/board.service';
import { DEFAULT_DECK_SIZE } from '../shared/constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  public deck$: Observable<Card[]>;

  constructor(private boardService: BoardService) {}

  public ngOnInit(): void {
    this.deck$ = this.boardService.getDeck(10 || DEFAULT_DECK_SIZE);
  }
}
