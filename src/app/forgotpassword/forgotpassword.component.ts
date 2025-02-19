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

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  forgotPasswordForm: FormGroup;
  emailSent: boolean | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
        },
        error: (error) => {
          console.error('Failed to send password reset email', error);
          this.emailSent = false;
        },
      });
    }
  }
}
