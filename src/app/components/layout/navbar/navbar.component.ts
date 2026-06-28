import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../../features/login/login.component';
import { AuthService } from '../../../services/auth.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenubarModule,
    InputTextModule, ButtonModule, AvatarModule, MenuModule,
    BadgeModule, InputGroupAddonModule, InputGroupModule, RouterModule, LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private document = inject(DOCUMENT);
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  isLoggedIn = this.authService.isLoggedIn$;
  isDarkMode = signal<boolean>(false);
  navItems = signal<MenuItem[]>([]);
  userMenuItems = signal<MenuItem[]>([]);
  showLoginDialog: boolean = false;
  categories!: string[];

  ngOnInit() {
    this.productService.getCategories().subscribe((res) => {
      this.categories = res;
      this.navItems.set([
        {
          label: 'Home',
          routerLink: ['/home']
        },
        {
          label: 'Categories',
          badge: res.length.toString(),
          items: res.map(category => ({
            label: category.replace(
              /\w\S*/g,
              word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ),
            routerLink: ['/category', this.productService.generateSlug(category)]
          }))
        }
      ]);
    })

    this.userMenuItems.set([
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: ['/profile']
      },
      { separator: true },
      {
        label: 'Cart',
        icon: 'pi pi-shopping-cart',
        badge: '2',
        routerLink: ['/cart']
      },
      { separator: true },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ]);
  }

  openLogin() {
    this.showLoginDialog = true;
  }

  logout() {
    this.authService.logout();
  }

  toggleTheme() {
    this.isDarkMode.update(mode => !mode);
    if (this.isDarkMode()) {
      this.document.documentElement.classList.add('dark');
    } else {
      this.document.documentElement.classList.remove('dark');
    }
  }
}
