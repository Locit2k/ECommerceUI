import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/main-layout/main-layout').then(c => c.MainLayout),
        children: [
            { path: '', redirectTo: 'products', pathMatch: 'full' },
            {
                path: 'products',
                loadComponent: () => import('./features/product/product-list/product-list').then(c => c.ProductList)
            },
            {
                path: 'cart',
                loadComponent: () => import('./features/cart/cart-view/cart-view').then(c => c.CartView)
            },
            {
                path: 'user',
                canActivate: [authGuard],
                loadComponent: () => import('./features/user/profile/profile').then(c => c.Profile)
            },
            {
                path: 'orders',
                canActivate: [authGuard],
                loadComponent: () => import('./features/order/order-list/order-list').then(c => c.OrderList)
            }
        ]
    },
    {
        path: 'auth/login',
        loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
    },
    {
        path: 'auth/register',
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
    },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadComponent: () => import('./layout/admin-layout/admin-layout').then(c => c.AdminLayout),
        children: [
            {
                path: '',
                loadComponent: () => import('./features/dashboard/admin-dashboard/admin-dashboard').then(c => c.AdminDashboard)
            }
        ]
    },
    { path: '**', redirectTo: 'products' }
];
