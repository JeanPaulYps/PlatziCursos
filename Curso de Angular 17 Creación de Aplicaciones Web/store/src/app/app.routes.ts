import { Routes } from '@angular/router';
import { AboutComponent } from './domains/info/pages/about/about.component';
import { NotFoundComponent } from '@/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@/shared/components/layout/layout.component';
import { ProductDetailComponent } from '@/products/pages/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>  import('@/products/pages/list/list.component'),
      },
      {
        path: 'about',
        loadComponent: () => import('@/info/pages/about/about.component').then(chunk => chunk.AboutComponent),
      },
      {
        path: 'product/:id',
        loadComponent: () => import('@/products/pages/product-detail/product-detail.component').then(chunk => chunk.ProductDetailComponent),
      }
    ],
  },
  {
    path: '**',
    loadComponent: () => import('@/info/pages/not-found/not-found.component').then(chunk => chunk.NotFoundComponent),
  },
];
