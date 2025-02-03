import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SubdomainGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const subdomain = this.getSubdomain();
    if (this.isSpecialSubdomain(subdomain)) {
      this.router.navigate(['/userblog']);
      return false;
    } else if (!this.isKnownSubdomain(subdomain)) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

  private getSubdomain(): string {
    const host = window.location.hostname;
    const subdomain = host.split('.')[0];
    return subdomain;
  }

  private isSpecialSubdomain(subdomain: string): boolean {
    const specialSubdomains = ['lotusotho'];
    return specialSubdomains.includes(subdomain);
  }

  private isKnownSubdomain(subdomain: string): boolean {
    const knownSubdomains = ['blog'];
    return knownSubdomains.includes(subdomain);
  }
}
