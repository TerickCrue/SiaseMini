import { Route } from "@angular/router";

export default [
    {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full'
    },
    {
        path: 'calendar',
        loadComponent: () => import('./calendar/calendar.component').then((c) => c.CalendarComponent),
    },
    {
        path: 'history',
        loadComponent: () => import('./history/history.component').then((c) => c.HistoryComponent),
    },
    {
        path: '**',
        redirectTo: 'calendar',
        pathMatch: 'full'
    },
] as Route[];