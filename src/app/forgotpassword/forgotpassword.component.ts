import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';
import { emailRegex } from '../../utils/validatorsRegex.js';
import { NotificationtoastComponent } from '../notificationtoast/notificationtoast.component.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NotificationtoastComponent],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  forgotPasswordForm: FormGroup;
  notificationType: string | null = null;
  emailSent: boolean | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value['email'].toLowerCase().trim();
      this.authService.sendPasswordResetEmail(email).subscribe({
        next: (response) => {
          console.log('Password reset email sent', response);
          this.emailSent = true;
          this.notificationType = 'passwordRecoverySuccess';

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          console.error('Failed to send password reset email', error);
          this.emailSent = false;
        },
      });
    }
  }
}
