import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { ApiService } from './shared';

// import '../style/app.scss';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'sp-app',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  // templateUrl: require('./app.component.html'),
  // styles: [require('./app.component.scss')]

})
export class AppComponent {
  constructor() {
  }
}
