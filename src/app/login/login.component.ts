import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service.js';
import { usernameRegex } from '../../utils/validatorsRegex.js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
          },
          error: (error) => {
            console.error('Login failed', error);
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
