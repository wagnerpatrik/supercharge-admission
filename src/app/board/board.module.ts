import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';

import { BoardComponent } from './board.component';
import { CardComponent } from '../card/card.component';

@NgModule({
  declarations: [BoardComponent, CardComponent],
  imports: [CommonModule, BoardRoutingModule],
})
export class BoardModule {}
