import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const ROUTES: Routes = [
  {
    path: 'board',
    loadChildren: () => import('./board/board.module').then(({ BoardModule }) => BoardModule),
  },
  { path: '**', redirectTo: 'board/start' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
