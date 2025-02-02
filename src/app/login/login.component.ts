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
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    console.log('Form submitted');
    if (this.loginForm.valid) {
      console.log('Form is valid');
      const formData = {
        ...this.loginForm.value,
      };
      this.authService.login({
        username: this.loginForm.value['username'],
        password: this.loginForm.value['password'],
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
