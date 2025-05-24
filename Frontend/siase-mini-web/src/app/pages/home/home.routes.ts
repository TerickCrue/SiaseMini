import { Route, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export default [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then((c) => c.DashboardComponent),
      },
      {
        path: 'careers',
        loadComponent: () => import('./careers/careers.component').then((c) => c.CareersComponent),
      },
      {
        path: 'schedules',
        loadComponent: () => import('./schedules/schedules.component').then((c) => c.SchedulesComponent),
      },
      {
        path: 'kardex',
        loadComponent: () => import('./kardex/kardex.component').then((c) => c.KardexComponent),
      },
      {
        path: 'grades',
        loadComponent: () => import('./grades/grades.component').then((c) => c.GradesComponent),
      },
      {
        path: 'afis',
        loadChildren: () => import('./afis/afis.routes')
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
] as Route[];
