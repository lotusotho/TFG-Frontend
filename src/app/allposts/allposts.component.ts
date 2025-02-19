import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service.js';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-allposts',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './allposts.component.html',
  styleUrl: './allposts.component.css',
})
export class AllpostsComponent implements OnInit {
  allPostsData: any = '';
  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.contentService.getAllPosts().subscribe({
      next: (response: any) => {
        this.allPostsData = response.data.sort(
          (a: any, b: any) =>
            new Date(b.date_updated).getTime() -
            new Date(a.date_updated).getTime()
        );
      },
      error: (error: any) => {
        console.log('Error getting all posts', error);
      },
    });
  }
}
