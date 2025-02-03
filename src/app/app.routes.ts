import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component.js';
import { HomeComponent } from './home/home.component.js';
import { SignupComponent } from './signup/signup.component.js';
import { LoginComponent } from './login/login.component.js';
import { DashboardComponent } from './dashboard/dashboard.component.js';
import { MdinfoComponent } from './mdinfo/mdinfo.component.js';
import { FooterComponent } from './footer/footer.component.js';
import { AuthGuard } from './guards/auth.guard.js';
import { UserblogComponent } from './userblog/userblog.component.js';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
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
        canActivate: [AuthGuard],
      },
      {
        path: 'userblog',
        component: UserblogComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'mdinfo',
        component: MdinfoComponent,
      },
    ],
  },
  {
    path: '',
    component: FooterComponent,
    outlet: 'FooterOutlet',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
