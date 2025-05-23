import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'access',
    pathMatch: 'full',
  },
  {
    path: 'access',
    loadChildren: () => import('./pages/access/access.routes').then(m => m.default),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.routes').then(m => m.default),
  },
  {
    path: '**',
    redirectTo: 'access',
    pathMatch: 'full',
  },
];
