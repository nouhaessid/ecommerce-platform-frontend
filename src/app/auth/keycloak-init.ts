import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Keycloak from 'keycloak-js';
import { CustomerApiService } from '../api/customer-api.service';
import { EcommerceStore } from '../ecommerce-store';

export async function initializeKeycloak() {
  const platformId = inject(PLATFORM_ID);
  const keycloak = inject(Keycloak);
  const customerApi = inject(CustomerApiService);
  const store = inject(EcommerceStore);

  if (!isPlatformBrowser(platformId)) {
    return;
  }

  const authenticated = await keycloak.init({
    onLoad: 'check-sso',
    checkLoginIframe: false
  });

  if (authenticated) {
    customerApi.createCustomerIfNotExists().subscribe({
      next: (customerId) => {
        store.setCustomerId(customerId);
      },
      error: (error) => {
        console.error('Could not initialize customer:', error);
      }
    });
  }
}