import { Route, Routes } from '@angular/router';
import { AccessComponent } from './access/access.component';
import { LoginComponent } from './login/login.component';

export default [
    {
        path: '',
        component: AccessComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
] as Route[];