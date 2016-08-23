import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'sp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loggedIn: boolean;

  constructor(private authService: AuthService) {
    this.loggedIn = this.authService.isLoggedIn();
    authService.loginState.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }
}
