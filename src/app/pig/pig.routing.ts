import { Routes, RouterModule } from '@angular/router';

import { PigComponent } from './pig.component';
import { PigService } from './pig.service';

const routes: Routes = [
  { path: 'pig/:boardKey/:pigKey', component: PigComponent },
  { path: 'pig/:boardKey', component: PigComponent }
];

export const appRoutingProviders: any[] = [
  PigService
];

export const routing = RouterModule.forChild(routes);