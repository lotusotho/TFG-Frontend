import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../services/content.service';
import { MarkdownModule } from 'ngx-markdown';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-userblog',
  standalone: true,
  imports: [MarkdownModule, DatePipe],
  templateUrl: './userblog.component.html',
  styleUrl: './userblog.component.css',
})
export class UserblogComponent implements OnInit {
  userContent: any = '';
  username: string = '';

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const blog = params['blog'];
      if (blog) {
        this.contentService.getUserContentQuery(blog).subscribe(
          (response: any) => {
            this.userContent = response.content;
          },
          (error) => {
            console.error('Error fetching user content:', error);
          }
        );
      }
    });
  }
}
