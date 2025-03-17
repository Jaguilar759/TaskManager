import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home-tasks/home-tasks.component').then(m => m.HomeTasksComponent)
  }
];
