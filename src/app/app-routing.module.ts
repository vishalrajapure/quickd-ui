import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
    //canActivate: [UserGurad]
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
