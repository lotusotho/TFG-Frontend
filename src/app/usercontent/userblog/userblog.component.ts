import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { MarkdownModule } from 'ngx-markdown';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-userblog',
  standalone: true,
  imports: [MarkdownModule, DatePipe, NgIf],
  templateUrl: './userblog.component.html',
  styleUrl: './userblog.component.css',
})
export class UserblogComponent implements OnInit {
  userContent: any = '';
  username: string = '';
  isLoading: boolean = true;

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
            this.userContent = response.data[0];
            this.isLoading = false;
          },
          (error) => {
            console.error('Error fetching user content:', error);
            this.isLoading = false;
          }
        );
      } else {
        this.isLoading = false;
      }
    });
  }
}
