import { Component } from '@angular/core';
import { ContentService } from '../services/content.service.js';
import { MarkdownModule } from 'ngx-markdown';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-userblog',
  standalone: true,
  imports: [MarkdownModule, RouterLink],
  templateUrl: './userblog.component.html',
  styleUrl: './userblog.component.css',
})
export class UserblogComponent {
  constructor(private contentService: ContentService) {}

  userContent: string = '';

  getUserContent() {
    this.contentService.getUserContent().subscribe({
      next: (response: any) => {
        console.log('Response from server:', response);
        this.userContent = response.content.md_content;
        console.log('Converted Markdown:', this.userContent);
      },
      error: (error) => {
        console.error('Error fetching secure data:', error);
      },
    });
  }
}
