import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { NotificationtoastComponent } from '../../notificationtoast/notificationtoast.component';

@Component({
  selector: 'app-verifyaccount',
  standalone: true,
  imports: [NgIf, NotificationtoastComponent],
  templateUrl: './verifyaccount.component.html',
  styleUrls: ['./verifyaccount.component.css'],
})
export class VerifyaccountComponent implements OnInit {
  token: string = '';
  verificationSuccess: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
  }

  verifyAccount(): void {
    if (this.token) {
      this.authService.verifyEmail(this.token).subscribe({
        next: (response) => {
          console.log('Verification successful', response);
          this.verificationSuccess = true;
          this.authService.logout();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          console.error('Verification failed', error);
          this.verificationSuccess = false;
        },
      });
    }
  }
}
