import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  loadUserData(userId: number) {
    return this.http.get(`${API_URL}users/${userId}`);
  }

  updateUserData(payload: any, userId: number) {
    return this.http.put(`${API_URL}users/${userId}`, payload);
  }
}
