import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { CategoryApiService } from './api/category-api.service';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:categoryName',
    renderMode: RenderMode.Prerender,
    

    getPrerenderParams: async () => {
      const categoryApiService = inject(CategoryApiService);

      const categories = await firstValueFrom(
        categoryApiService.getCategories()
      );

      return categories.map(category => ({
        categoryName: category.name
      }));
    }
  },

  {
    path: 'wishlist',
    renderMode: RenderMode.Client
  },
  {
    path: 'cart',
    renderMode: RenderMode.Client
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Client
  },
  {
    path: 'order-success',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
