import { isPlatformBrowser, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkAuthToken();
    }
  }

  checkAuthToken() {
    const authToken = this.cookieService.get('authToken');
    if (authToken) {
      console.log('Auth token exists:', authToken);
      this.isAuthenticated = true;
    } else {
      console.log('No auth token found');
      this.isAuthenticated = false;
    }
  }

  logOut() {
    this.cookieService.delete('authToken');
    window.location.reload();
  }

  @ViewChild('navLogo') navLogo!: ElementRef;
  @ViewChild('navBurger') navBurger!: ElementRef;
  @ViewChild('navMenu') navMenu!: ElementRef;

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  toggleLogo() {
    this.navBurger.nativeElement.classList.remove('is-active');
    this.navMenu.nativeElement.classList.remove('is-active');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!isPlatformBrowser(this.platformId)) return;
  }
}
