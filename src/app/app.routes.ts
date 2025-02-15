import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BankerListComponent } from './pages/banker-list/banker-list.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { LoanApplicationListComponent } from './pages/loan-application-list/loan-application-list.component';
import { NewLoginFormComponent } from './pages/new-loan-form/new-login-form.component';
import { NewLoanFormComponent } from './pages/new-loan-form/new-loan-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path:'login',
    component:LoginComponent
  },

  {
    path:'bankerList',
    component:BankerListComponent
  },

  {
    path:'customerlist',
    component:CustomerListComponent
  },

  {
    path:'application-list',
    component: LoanApplicationListComponent
  },

  {
    path:'new-loan',
    component: NewLoanFormComponent
  },
];
