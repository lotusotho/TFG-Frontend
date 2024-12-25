import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MarkdownModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  username = '';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsernameByToken();
  }

  getUsernameByToken() {
    this.http
      .get('http://localhost:3000/tokenusername', { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          this.username = response.username as string;
        },
        error: (error) => {
          console.error('Error fetching secure data:', error);
        },
      });
  }
}
