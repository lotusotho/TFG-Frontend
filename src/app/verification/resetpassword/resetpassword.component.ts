import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { NotificationtoastComponent } from '../../notificationtoast/notificationtoast.component.js';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, NotificationtoastComponent],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent {
  resetPasswordForm: FormGroup;
  token: string;
  notificationType: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.token = this.route.snapshot.queryParams['token'];
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { newPassword, confirmPassword } = this.resetPasswordForm.value;
      if (newPassword !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      this.authService.resetPassword(this.token, newPassword).subscribe({
        next: (response) => {
          console.log('Password reset successful', response);
          this.notificationType = 'changed';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2 * 1000);
        },
        error: (error) => {
          console.error('Password reset failed', error);
        },
      });
    }
  }
}
