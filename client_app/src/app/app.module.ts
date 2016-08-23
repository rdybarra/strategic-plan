import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { StrategicPlanComponent } from './strategic-plan/strategic-plan.component';
import { StrategicPlanListComponent } from './strategic-plan-list/strategic-plan-list.component';
import { StrategicPlanService } from './shared/strategic-plan.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      AboutComponent,
      StrategicPlanComponent,
      StrategicPlanListComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      routing,
      HttpModule
    ],
    providers: [
      appRoutingProviders,
      StrategicPlanService,
      AuthGuard,
      AuthService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
