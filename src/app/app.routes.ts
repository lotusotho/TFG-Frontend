import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component.js';
import { HomeComponent } from './home/home.component.js';
import { SignupComponent } from './signup/signup.component.js';
import { LoginComponent } from './login/login.component.js';
import { DashboardComponent } from './usercontent/dashboard/dashboard.component.js';
import { MdinfoComponent } from './mdinfo/mdinfo.component.js';
import { FooterComponent } from './footer/footer.component.js';
import { AuthGuard } from './guards/auth.guard.js';
import { UserblogComponent } from './usercontent/userblog/userblog.component.js';
import { VerifyaccountComponent } from './verification/verifyaccount/verifyaccount.component.js';
import { ResetpasswordComponent } from './verification/resetpassword/resetpassword.component.js';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component.js';
import { AllpostsComponent } from './allposts/allposts.component.js';
import { NotverifiedComponent } from './notverified/notverified.component.js';
import { VerifiedGuard } from './guards/verified.guard.js';
import { UsersettingsComponent } from './usercontent/usersettings/usersettings.component.js';

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
        path: 'blogs',
        component: AllpostsComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard, VerifiedGuard],
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
        path: 'settings',
        component: UsersettingsComponent,
        canActivate: [AuthGuard, VerifiedGuard],
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
    path: 'verify-email',
    component: VerifyaccountComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotpasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetpasswordComponent,
  },
  {
    path: 'not-verified',
    component: NotverifiedComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
