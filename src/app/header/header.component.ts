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
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service.js';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // TODO: Arreglar esto
    if (isPlatformBrowser(this.platformId)) {
      this.authService.checkLogin();
    }

    this.authService.isLoggedIn$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  logOut() {
    this.authService.logout();
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
