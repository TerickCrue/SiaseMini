import { Route, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export default [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
] as Route[];
