import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app/app.module';

declare var __ENV__: any;
if (__ENV__ === 'build') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
