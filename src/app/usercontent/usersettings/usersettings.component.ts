import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service.js';
import { AuthService } from '../../services/auth.service.js';
import { Router } from '@angular/router';
import { NotificationtoastComponent } from '../../notificationtoast/notificationtoast.component.js';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-usersettings',
  standalone: true,
  imports: [NotificationtoastComponent, NgIf],
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.css',
})
export class UsersettingsComponent implements OnInit {
  userContent: any;
  username = '';
  notificationType: string | null = null;

  constructor(
    private authService: AuthService,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.getUsernameByToken();
    this.getUserContent();
  }

  getUsernameByToken() {
    const headers = this.authService.getAuthHeaders();
    this.contentService
      .getUsernameByToken({ headers, withCredentials: true })
      .subscribe({
        next: (response: any) => {
          this.username = response.username as string;
          this.getUserContent();
        },
        error: (error) => {
          console.error('Error fetching secure data:', error);
        },
      });
  }

  getUserContent() {
    const headers = this.authService.getAuthHeaders();
    this.contentService
      .getUserContent(this.username, { headers, withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log('Response from server:', response);
          this.userContent = response.data[0];
          console.log('Converted Markdown:', this.userContent.md_content);
        },
        error: (error) => {
          console.error('Error fetching secure data:', error);
        },
      });
  }

  deletePost() {
    const postid = this.userContent.ID;
    const headers = this.authService.getAuthHeaders();

    if (postid === undefined) {
      this.notificationType = 'blogNotFound';
      return;
    }

    this.contentService
      .deletePost(postid, { headers, withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.notificationType = 'blogDelete';
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
