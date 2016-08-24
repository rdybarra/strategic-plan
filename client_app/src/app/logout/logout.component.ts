import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'sp-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent {
  // @Input() loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.logout();
  }
}
