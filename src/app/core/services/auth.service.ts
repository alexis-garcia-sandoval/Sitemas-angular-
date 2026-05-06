import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user.model';

const MOCK_USER: User = {
  id: '1',
  name: 'Alexis García',
  email: 'usuario@banco.com',
  token: 'mock-jwt-token-12345',
};

const MOCK_CREDENTIALS = {
  email: 'usuario@banco.com',
  password: 'banco123',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  login(email: string, password: string): Observable<User> {
    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      localStorage.setItem(this.TOKEN_KEY, MOCK_USER.token);
      return of(MOCK_USER);
    }
    return throwError(() => new Error('Correo o contraseña incorrectos'));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
