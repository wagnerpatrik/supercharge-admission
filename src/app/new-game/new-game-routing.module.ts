import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewGameComponent } from './new-game.component';

const ROUTES: Routes = [{ path: '', component: NewGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class NewGameRoutingModule {}
