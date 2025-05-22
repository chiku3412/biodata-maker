import { Routes } from '@angular/router';

export const PageRoutes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home.component').then((m) => m.HomeComponent),
    },
    {
        path: 'preview',
        loadComponent: () => import('./preview-data/preview-data.component').then((m) => m.PreviewDataComponent),
    }
];
