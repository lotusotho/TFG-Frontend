import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notificationtoast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificationtoast.component.html',
  styleUrls: ['./notificationtoast.component.css'],
})
export class NotificationtoastComponent {
  @Input() notificationType: string = '';
}
