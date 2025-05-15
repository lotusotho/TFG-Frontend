import { isPlatformBrowser, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service.js';
import { NotificationtoastComponent } from '../notificationtoast/notificationtoast.component.js';
import { ContentService } from '../services/content.service.js';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf, NotificationtoastComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  notificationType: string | null = null;
  username = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private authService: AuthService,
    private contentService: ContentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.checkLogin();
      this.getUsernameByToken();
    }

    this.authService.isLoggedIn$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  getUsernameByToken() {
    return this.contentService.getUsernameFromToken();
  }

  logOut() {
    this.authService.logout();
    this.notificationType = 'logout';
    this.router.navigate(['/home']);
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
