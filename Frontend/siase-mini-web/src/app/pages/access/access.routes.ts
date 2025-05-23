import { Route, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export default [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    },
] as Route[];