import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'sp-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  email: string;
  password: string;
  confirmPassword: string;
  message: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Your passwords do not match.';
      return;
    }

    this.authService.signup(this.email, this.password).subscribe((result) => {
      this.router.navigate(['/plans']);
    }, (error) => {
      if (error.status === 400) {
        this.message = 'You must provide an email address and a password.';
      }
    });
  }
}
