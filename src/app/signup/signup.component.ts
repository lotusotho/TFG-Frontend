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

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/m
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = {
        ...this.signupForm.value,
        type: 1,
      };

      this.authService.register(formData).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
        },
        error: (error) => {
          console.error('Signup failed', error);
        },
      });
    }
  }
}
