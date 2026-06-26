import { Routes } from '@angular/router';
import { HomeComponent } from './components/features/home/home.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'cart',
        loadComponent: () => import("./components/features/cart/cart.component").then((m) => m.CartComponent)
    },
    {
        path:'profile',
        loadComponent: () => import("./components/features/cart/cart.component").then((m) => m.CartComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
