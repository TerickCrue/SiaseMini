import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'access',
    pathMatch: 'full',
  },
  {
    path: 'access',
    loadChildren: () => import('./pages/access/access.routes'),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.routes'),
  },
];
