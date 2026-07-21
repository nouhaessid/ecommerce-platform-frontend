import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EcommerceStore } from '../ecommerce-store';

export const authGuard: CanActivateFn = () => {
  const store = inject(EcommerceStore);
  const router = inject(Router);

  if (store.user()) {
    return true;
  }

  return router.createUrlTree(['/products/all']);
};
