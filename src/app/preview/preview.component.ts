import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { MarkdownPipe, LanguagePipe } from 'ngx-markdown';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [MarkdownComponent, MarkdownPipe, CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent {
  userContent = '';
  constructor(
    private http: HttpClient,
    private markdownService: MarkdownService
  ) {}

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
