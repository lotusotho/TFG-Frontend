import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
      this.http.post('http://localhost:3000/login', formData).subscribe({
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
