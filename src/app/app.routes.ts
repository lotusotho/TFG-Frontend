import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component.js';
import { HomeComponent } from './home/home.component.js';
import { SignupComponent } from './signup/signup.component.js';
import { LoginComponent } from './login/login.component.js';
import { DashboardComponent } from './dashboard/dashboard.component.js';
import { PreviewComponent } from './preview/preview.component.js';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'preview',
        component: PreviewComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
