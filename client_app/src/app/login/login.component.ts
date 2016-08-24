import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string;
  password: string;
  message: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe((result) => {
      this.router.navigate(['/plans']);
    }, (error) => {
      if (error.status === 400) {
        this.message = 'You must provide an email address and a password.';
      } else {
        if (error.status === 401) {
          this.message = 'The email address/password combo does not work.';
        }
      }
    });
  }
}