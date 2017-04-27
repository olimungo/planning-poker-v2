import { Routes, RouterModule } from '@angular/router';
import { TotoComponent } from './toto/toto.component';

const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' },
  { path: 'toto', component: TotoComponent }
];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(routes);
