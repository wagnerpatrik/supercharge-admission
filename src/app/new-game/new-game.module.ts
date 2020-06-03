import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NewGameRoutingModule } from './new-game-routing.module';

import { NewGameComponent } from './new-game.component';

@NgModule({
  declarations: [NewGameComponent],
  imports: [CommonModule, NewGameRoutingModule, ReactiveFormsModule],
})
export class NewGameModule {}
