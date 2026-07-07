import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from '../constants';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  token = signal<string>('');
  isLoggedIn$ = computed(() => this.token() ? true : false);

  signup(data: any) {
    const payload = {
      email: data.email,
      username: data.username,
      password: data.password,
      name: {
        firstname: data.firstname,
        lastname: data.lastname
      },
      phone: data.phone,
      address: {
        city: 'N/A',
        street: 'N/A',
        number: 0,
        zipcode: '00000',
        geolocation: { lat: '0', long: '0' }
      }
    };
    return this.http.post(`${API_URL}users`, payload);
  }

  login(data: any) {
    return  this.http.post(`${API_URL}auth/login`, data);
  }

  logout() {
    localStorage.clear();
    this.token.set('');
    this.router.navigate(['/'])
  }

  getUserId() {
    return jwtDecode(this.token())?.sub ?? null;
  }
}
