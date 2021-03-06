import { Routes, RouterModule }   from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { StrategicPlanComponent } from './strategic-plan/strategic-plan.component';
import { StrategicPlanListComponent } from './strategic-plan-list/strategic-plan-list.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { StyleguideComponent } from './styleguide/styleguide.component';
import { AuthGuard } from './auth-guard.service';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'plans/:id', component: StrategicPlanComponent, canActivate: [AuthGuard]},
  { path: 'plans', component: StrategicPlanListComponent, canActivate: [AuthGuard]},
  { path: 'styleguide', component: StyleguideComponent}
];

// Why do we need providers for routing?
export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
