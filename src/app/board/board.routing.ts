import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from './board.component';
import { BoardService } from './board.service';

const routes: Routes = [
  { path: 'board', component: BoardComponent }
];

export const appRoutingProviders: any[] = [
  BoardService
];

export const routing = RouterModule.forChild(routes);