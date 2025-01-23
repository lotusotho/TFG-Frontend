import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, RouterLink, MarkdownModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent {
  userContent = '';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUserContent();
  }

  getUserContent() {
    this.http
      .get('http://localhost:3000/usercontent', { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log('Response from server:', response); // Verificar el contenido de la respuesta
          const mdDB = response.content.md_content;
          this.userContent = mdDB;
          console.log('Converted Markdown:', this.userContent); // Verificar el contenido convertido
        },
        error: (error) => {
          console.error('Error fetching secure data:', error);
        },
      });
  }
}
