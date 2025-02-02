import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { API_URL } from '../../contants.js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient
  ) {}

  private API_URL = API_URL;
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  register(formData: any): Observable<any> {
    return this.httpClient.post(`${API_URL}/register`, formData);
  }

  login(credentials: { username: string; password: string }) {
    return this.httpClient
      .post<{ authToken: string }>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.authToken) {
            this.cookieService.set('authToken', response.authToken, {
              expires: 1 / 24,
              domain: 'blog.mapach.es',
              path: '/',
              secure: true,
            });
            this.isLoggedIn.next(true);
          }
        })
      );
  }

  logout() {
    this.httpClient
      .get(`${this.API_URL}/logout`, { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log(response.message as string);
          this.cookieService.delete('authToken');
          this.isLoggedIn.next(false);
        },
        error: (error) => {
          console.error('Error fetching logout data:', error);
        },
      });
  }

  checkLogin() {
    const authToken = this.cookieService.get('authToken');
    if (authToken) {
      this.isLoggedIn.next(true);
    } else {
      this.isLoggedIn.next(false);
    }
  }
}
