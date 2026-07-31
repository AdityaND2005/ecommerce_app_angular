import { Routes } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'signup',
        loadComponent: () => import("./components/features/signup/signup.component").then((m) => m.SignupComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import("./components/features/cart/cart.component").then((m) => m.CartComponent),
        canActivate:[authGuard]
    },
    {
        path: 'wishlist',
        loadComponent: () => import("./components/features/wishlist/wishlist.component").then((m) => m.WishlistComponent),
        canActivate:[authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import("./components/features/profile-update/profile-update.component").then((m) => m.ProfileUpdateComponent),
        canActivate:[authGuard]
    },
    {
        path: 'category/:name',
        loadComponent: () => import('./components/layout/category/category.component').then(m => m.CategoryComponent)
    },
    {
        path: 'product/:id',
        loadComponent: () => import('./components/features/product/product.component').then(m => m.ProductComponent)
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
