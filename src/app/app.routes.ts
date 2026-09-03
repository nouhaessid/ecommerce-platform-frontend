import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';


export const routes: Routes = [
    {
        path:'', pathMatch:'full', redirectTo:'products/all'
    },
    {
        path:'products', pathMatch:'full', redirectTo:'products/all'
    },
    {
        path: 'products/:categoryName', loadComponent:() => import('./pages/products-grid/products-grid')
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
    },
    {
      path: 'profile',
      loadComponent: () => import('./pages/profile/profile')
    },
    {
        path: 'admin',
        canActivate: [adminGuard],
        loadComponent: () => import('./admin/admin-layout/admin-layout'),
        children: [
            {
                path:'', pathMatch:'full', redirectTo:'products'
            },
            {
                path:'products',
                loadComponent: () => import('./admin/pages/admin-products/admin-products') 
            },
            {
                path:'orders',
                loadComponent: () => import('./admin/pages/admin-orders/admin-orders') 
            }
        ]
    }
];
