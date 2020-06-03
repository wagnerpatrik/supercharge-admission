import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private boardService: BoardService, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    const { boardService, route } = this;

    this.deck$ = boardService.getDeck(route.snapshot.queryParams.deckSize || DEFAULT_DECK_SIZE);
  }
}
