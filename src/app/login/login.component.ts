import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service.js';
import { usernameRegex } from '../../utils/validatorsRegex.js';
import { NotificationtoastComponent } from '../notificationtoast/notificationtoast.component.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    NotificationtoastComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  notificationType: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15),
          Validators.pattern(usernameRegex),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    console.log('Form submitted');
    if (this.loginForm.valid) {
      console.log('Form is valid');
      this.authService
        .login({
          username: this.loginForm.value['username'].toLowerCase().trim(),
          password: this.loginForm.value['password'].toLowerCase().trim(),
        })
        .subscribe({
          next: (response) => {
            console.log('Login successful', response);
            this.notificationType = 'login';
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);
          },
          error: (error) => {
            console.error('Login failed', error);
            if (error.status === 401) {
              this.notificationType = 'loginError';
            }
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
