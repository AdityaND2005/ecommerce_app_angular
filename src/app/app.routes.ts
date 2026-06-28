import { Routes } from '@angular/router';
import { HomeComponent } from './components/features/home/home.component';

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
        loadComponent: () => import("./components/features/cart/cart.component").then((m) => m.CartComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import("./components/features/cart/cart.component").then((m) => m.CartComponent)
    },
    {
        path: 'category/:name',
        loadComponent: () => import('./components/layout/category/category.component').then(m => m.CategoryComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
