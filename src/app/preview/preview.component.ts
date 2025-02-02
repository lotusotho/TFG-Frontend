import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ContentService } from '../services/content.service.js';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, RouterLink, MarkdownModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
})
export class PreviewComponent {
  userContent: any;
  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.getUserContent();
  }

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
