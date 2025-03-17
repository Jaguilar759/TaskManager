import { Routes } from '@angular/router';

import { HomeComponent, LoginComponent } from '@feature/index';
import { PageNotFoundComponent, PrincipalComponent } from '@core/components';
import { authGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [authGuard] },
      { path: 'tasks', loadChildren: () => import('./feature/tasks/tasks.routes').then(m => m.routes) }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '404', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/404' }
];
