import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service.js';
import { DatePipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-allposts',
  standalone: true,
  imports: [NgFor, DatePipe, FormsModule],
  templateUrl: './allposts.component.html',
  styleUrl: './allposts.component.css',
})
export class AllpostsComponent implements OnInit {
  allPostsData: any[] = [];
  filteredPosts: any[] = [];
  searchQuery: string = '';

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
        this.filteredPosts = this.allPostsData;
      },
      error: (error: any) => {
        console.log('Error getting all posts', error);
      },
    });
  }

  filterPosts(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredPosts = this.allPostsData;
    } else {
      this.filteredPosts = this.allPostsData.filter((post: any) =>
        post.user.username
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
