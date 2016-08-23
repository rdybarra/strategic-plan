import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  private loggedIn: boolean = false;
  private loginStateSource = new Subject<boolean>();
  loginState = this.loginStateSource.asObservable();

  constructor(private http: Http) {
    this.loggedIn = Boolean(localStorage.getItem('auth_token'));
  }

  signup(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('/account', JSON.stringify({ email, password }), { headers })
      .map(res => res.json())
      .map((res) => {
        if (res.auth_token) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
          this.loginStateSource.next(true);
          return true;
        }

        return false
      });
  }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post('/login', JSON.stringify({ email, password }), { headers })
      .map(res => res.json())
      .map((res) => {
        if (res.auth_token) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
          this.loginStateSource.next(true);
          return true;
        }

        return false
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this.loginStateSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
