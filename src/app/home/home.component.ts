import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  secureData = '';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getSecureData();
  }

  getSecureData() {
    this.http
      .get('http://localhost:3000/secure', { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          this.secureData = response.message as string;
        },
        error: (error) => {
          console.error('Error fetching secure data:', error);
        },
      });
  }
}
