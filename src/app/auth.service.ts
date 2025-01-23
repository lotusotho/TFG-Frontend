import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  login() {
    if (this.cookieService.get('authToken')) {
      this.isLoggedIn.next(true);
    }
  }

  logout() {
    this.cookieService.delete('authToken');
    this.isLoggedIn.next(false);
  }
}
