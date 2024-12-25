import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { marked, Marked } from 'marked';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [MarkdownComponent],
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
          const tokensDB = JSON.parse(response.content.text_content);
          this.userContent = this.convertJsonToMarkdown(tokensDB);
          console.log('Converted Markdown:', this.userContent); // Verificar el contenido convertido
        },
        error: (error) => {
          console.error('Error fetching secure data:', error);
        },
      });
  }

  convertJsonToMarkdown(tokens: any): string {
    return marked.parser(tokens);
  }
}
