import { Routes, RouterModule }   from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { StrategicPlanComponent } from './strategic-plan/strategic-plan.component';
import { StrategicPlanListComponent } from './strategic-plan-list/strategic-plan-list.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'plans/:id', component: StrategicPlanComponent },
  { path: 'plans', component: StrategicPlanListComponent }
];

// Why do we need providers for routing?
export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
