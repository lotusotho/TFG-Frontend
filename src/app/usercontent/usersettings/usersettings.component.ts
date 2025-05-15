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
  username: string = '';
  notificationType: string | null = null;
  showModal: boolean = false;
  showModalUserDelete: boolean = false;

  constructor(
    private authService: AuthService,
    private contentService: ContentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsernameByToken();
    this.getUserContent();
  }

  getUsernameByToken() {
    this.username = this.contentService.getUsernameFromToken();
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
    this.showModal = true;
  }

  confirmDelete() {
    const postid = this.userContent.ID;
    const headers = this.authService.getAuthHeaders();

    if (!postid) {
      this.notificationType = 'blogNotFound';
      this.showModal = false;
      return;
    }

    this.contentService
      .deletePost(postid, { headers, withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.notificationType = 'blogDelete';
          this.showModal = false;
        },
        error: (error) => {
          console.error(error);
          this.showModal = false;
        },
      });
  }

  cancelDelete() {
    this.showModal = false;
  }

  deleteUser() {
    this.showModalUserDelete = true;
  }

  confirmDeleteUser() {
    const username = this.username;
    const headers = this.authService.getAuthHeaders();

    if (!username) {
      this.notificationType = 'userNotFound';
      this.showModalUserDelete = false;
      return;
    }

    this.authService
      .deleteUser(username, { headers, withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.notificationType = 'userDelete';
          this.showModalUserDelete = false;

          setTimeout(() => {
            localStorage.removeItem('authToken');
            this.router.navigate(['/home']);
          }, 3000);
        },
        error: (error) => {
          console.error(error);
          this.showModalUserDelete = false;
        },
      });
  }

  cancelDeleteUser() {
    this.showModalUserDelete = false;
  }
}
