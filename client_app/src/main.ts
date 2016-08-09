import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

if (process.env.ENV === 'build') {
  enableProdMode();
}

bootstrap(AppComponent, [
  // Dependencies go here!
  APP_ROUTER_PROVIDERS,
  {provide: LocationStrategy, useClass: HashLocationStrategy}
]).catch(err => console.error(err));
