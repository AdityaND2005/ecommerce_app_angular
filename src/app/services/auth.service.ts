import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  token = signal<string>('');
  isLoggedIn$ = computed(() => this.token() ? true : false);

  login(data: any) {
    return  this.http.post(`${API_URL}auth/login`, data);
  }
  logout() {
    localStorage.clear();
    this.token.set('');
    this.router.navigate(['/'])
  }
}
