import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Page 1',
    loadComponent: () => import('./pages/page-one/page-one.component').then(m => m.PageOneComponent),
  },
  {
    path: 'page-two',
    title: 'Page 2',
    loadComponent: () => import('./pages/page-two/page-two.component').then(m => m.PageTwoComponent),
  },
  {
    path: 'page-three',
    title: 'Page 3',
    loadComponent: () => import('./pages/page-three/page-three.component').then(m => m.PageThreeComponent),
  },
  {
    path: 'test-playground',
    title: 'Test Playground',
    loadComponent: () => import('./pages/test-playground/test-playground.component').then(m => m.TestPlaygroundComponent),
  },
  { path: '**', redirectTo: '' }
];
