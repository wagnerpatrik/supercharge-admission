import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { SpinnerModule } from '../shared/spinner/spinner.module';

import { BoardComponent } from './board.component';
import { CardComponent } from '../card/card.component';

@NgModule({
  declarations: [BoardComponent, CardComponent],
  imports: [CommonModule, BoardRoutingModule, SpinnerModule],
})
export class BoardModule {}
