import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
    {
        path:'', pathMatch:'full', redirectTo:'products/all'
    },
    {
        path:'products', pathMatch:'full', redirectTo:'products/all'
    },
    {
        path: 'products/:category', loadComponent:() => import('./pages/products-grid/products-grid')
    },
    {
        path: 'product/:productId', loadComponent:() => import('./pages/view-product-details/view-product-details')
    },
    {
        path: 'wishlist', loadComponent:() => import('./pages/my-wishlist/my-wishlist')
    },
    {
        path: 'cart', loadComponent:() => import('./pages/view-cart/view-cart')
    },
    {
        path: 'checkout', 
        loadComponent: () => import('./pages/checkout/checkout'),
        canActivate: [authGuard]
    },
    {
        path: 'order-success', 
        loadComponent: () => import('./pages/order-success/order-success'),
        canActivate: [authGuard]
    }
];
