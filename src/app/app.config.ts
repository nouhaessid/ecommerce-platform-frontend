import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideKeycloak } from 'keycloak-angular';
import { initializeKeycloak } from './auth/keycloak-init';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(),withInterceptors([authInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions(), withInMemoryScrolling({scrollPositionRestoration: 'top'})),
    provideHotToastConfig({ style: { marginTop: '70px' }, stacking: 'depth', duration: 1000 }),
    provideClientHydration(withEventReplay()),
    provideKeycloak({
      config: {
        url: 'http://localhost:9098',
        realm: 'ecommerce',
        clientId: 'ecommerce-frontend'
      }
    }),
    provideAppInitializer(initializeKeycloak)
  ],
};
