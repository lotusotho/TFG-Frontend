import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MarkdownModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  preserveWhitespaces: true,
})
export class HomeComponent {
  homeData = '';
  constructor(private http: HttpClient) {}
}
