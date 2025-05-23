import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { API_URL } from '../../contants.js';
import { AuthService } from '../services/auth.service.js';

@Injectable({
  providedIn: 'root',
})
export class VerifiedGuard implements CanActivate {
  API_URL = API_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate() {
    let isVerified = this.authService.getIsVerifiedFromToken();

    if (isVerified) {
      return true;
    } else {
      this.router.navigate(['/not-verified']);
      return false;
    }
  }
}
