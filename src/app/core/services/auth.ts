import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/auth.model';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);

  login(credentials: any): Observable<LoginResponse> {
    return this.apiService.post<LoginResponse>('/auth/login', credentials);
  }
}
