import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  @ViewChild('navLogo') navLogo!: ElementRef;
  @ViewChild('navBurger') navBurger!: ElementRef;
  @ViewChild('navMenu') navMenu!: ElementRef;
  @ViewChild('navDropdown') navDropdown!: ElementRef;

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  toggleLogo() {
    this.navBurger.nativeElement.classList.remove('is-active');
    this.navMenu.nativeElement.classList.remove('is-active');
  }

  toggleDropdown() {
    this.navDropdown.nativeElement.classList.toggle('is-active');
    this.navBurger.nativeElement.classList.remove('is-active');
    this.navMenu.nativeElement.classList.remove('is-active');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const targetElement = event.target as HTMLElement;

    const isClickInsideDropdown =
      this.navDropdown.nativeElement.contains(targetElement);

    if (!isClickInsideDropdown) {
      this.navDropdown.nativeElement.classList.remove('is-active');
    }
  }
}
