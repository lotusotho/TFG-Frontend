import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css'],
})
export class UserPageComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const subdomain = this.getSubdomain();
    this.fetchUserData(subdomain);
  }

  private getSubdomain(): string {
    const host = window.location.hostname;
    const subdomain = host.split('.')[0];
    return subdomain;
  }

  private fetchUserData(subdomain: string): void {
    this.user = { username: subdomain };
  }
}
