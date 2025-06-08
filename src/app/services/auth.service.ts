import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { API_URL } from '../../contants.js';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from './content.service.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private API_URL = API_URL;
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  public getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      });
    } else {
      return new HttpHeaders();
    }
  }

  register(formData: any): Observable<any> {
    return this.httpClient.post(`${API_URL}/register`, formData);
  }

  login(credentials: { username: string; password: string }) {
    return this.httpClient
      .post<{ authToken: string }>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.authToken) {
            localStorage.setItem('authToken', response.authToken);
            this.isLoggedIn.next(true);
          }
        })
      );
  }

  logout() {
    this.httpClient
      .post(`${this.API_URL}/logout`, {
        headers: this.getAuthHeaders(),
      })
      .subscribe({
        next: (response: any) => {
          console.log(response.message as string);
          localStorage.removeItem('authToken');
          this.isLoggedIn.next(false);
        },
        error: (error) => {
          console.error('Error fetching logout data:', error);
        },
      });
  }

  checkLogin() {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp > now) {
          this.isLoggedIn.next(true);
        } else {
          this.logout();
        }
      } catch (error) {
        console.error('Invalid token:', error);
        this.logout();
      }
    } else {
      this.isLoggedIn.next(false);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getIsVerifiedFromToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.isverified;
    } catch (error) {
      console.error('Error decoding token', error);
      return false;
    }
  }

  sendVerificationEmail(formData: any): Observable<any> {
    return this.httpClient.post(
      `${this.API_URL}/send-verification-email`,
      formData
    );
  }

  sendPasswordResetEmail(email: string): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/send-password-reset-email`, {
      email,
    });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/reset-password`, {
      token,
      newPassword,
    });
  }

  verifyEmail(token: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/verify-email`, {
      params: { token },
    });
  }

  deleteUser(
    userid: string,
    options?: {
      headers: HttpHeaders;
      withCredentials: boolean;
    }
  ): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/user`, {
      ...options,
    });
  }
}
