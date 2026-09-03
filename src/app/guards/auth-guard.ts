import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EcommerceStore } from '../ecommerce-store';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = () => {
  
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/products/all']);
};
