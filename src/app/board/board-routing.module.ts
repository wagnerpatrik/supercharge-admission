import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from './board.component';

const ROUTES: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [
      {
        path: 'start',
        loadChildren: () =>
          import('../new-game/new-game.module').then(({ NewGameModule }) => NewGameModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
