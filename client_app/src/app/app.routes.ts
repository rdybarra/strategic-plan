import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { StrategicPlanComponent } from './strategic-plan/strategic-plan.component';

export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'plan', component: StrategicPlanComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
