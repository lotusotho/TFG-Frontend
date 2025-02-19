import { Component, Inject, Input, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-notificationtoast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificationtoast.component.html',
  styleUrls: ['./notificationtoast.component.css'],
})
export class NotificationtoastComponent implements AfterViewInit {
  @Input() notificationType: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const deleteButtons = document.querySelectorAll('.notification .delete');
      deleteButtons.forEach((deleteButton) => {
        const notificationEl = deleteButton.parentNode;
        deleteButton.addEventListener('click', () => {
          if (notificationEl && notificationEl.parentNode) {
            notificationEl.parentNode.removeChild(notificationEl);
          }
        });
      });

      const notifications = document.querySelectorAll('.notification');
      notifications.forEach((notification) => {
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 3000);
      });
    }
  }
}
