import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailComponent } from './pages/detail/detail.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LogoutGuard } from './core/guards/logout/logout.guard';
import { PreventDashboardReturnGuard } from './core/guards/prevent-dashboard-return/prevent-dashboard-return.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [PreventDashboardReturnGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:year/:month/:day',
    component: DetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'logout',
    component: LoginComponent,
    canActivate: [LogoutGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}