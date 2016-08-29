import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import 'rxjs/add/operator/toPromise';
import { Plan } from '../strategic-plan/plan';
import { Step } from '../step/step';

@Injectable()
export class StrategicPlanService {
  private apiEndpoint = '/api/plans';

  constructor(private http: Http, private router: Router, private authService: AuthService) { }

  getPlans() {
    const headers = this.getStandardHeaders();
    // body because: https://www.reddit.com/r/Angular2/comments/4x0mxt/rc5_error_when_using_http_service/
    return this.http.get(this.apiEndpoint, { headers: headers, body: ''})
               .toPromise()
               .then(response => {
                 console.log(response);
                 return response.json() as Plan[];
               }).catch(this.handleError.bind(this));
  }

  getPlan(id: string) {
    const headers = this.getStandardHeaders();

    return this.http.get(this.apiEndpoint + '/' + id, { headers: headers, body: ''})
               .toPromise()
               .then(response => {
                 return response.json() as Plan;
               }).catch(this.handleError.bind(this));
  }

  createPlan() {
    const plan = new Plan('Untitled');
    const headers = this.getStandardHeaders();

    return this.http.post(this.apiEndpoint, null, { headers: headers, body: plan })
               .toPromise()
               .then(response => {
                 return response.json() as Plan;
               }).catch(this.handleError.bind(this));
  }

  updatePlan(plan: Plan) {
    const headers = this.getStandardHeaders();

    return this.http.patch(this.apiEndpoint + '/' + plan.id, null, { headers: headers, body: plan})
               .toPromise()
               .then(response => {
                 return response.json() as Plan;
               }).catch(this.handleError.bind(this));
  }

  deletePlan(plan: Plan) {
    const headers = this.getStandardHeaders();

    return this.http.delete(this.apiEndpoint + '/' + plan.id, { headers: headers, body: ''})
               .toPromise()
               .then(response => {
                 return response.json() as Plan;
               }).catch(this.handleError.bind(this));
  }

  createStep(step: Step) {
    const headers = this.getStandardHeaders();

    return this.http.post(this.apiEndpoint + '/' + step.planId + '/steps/', null, { headers: headers, body: step})
               .toPromise()
               .then(response => {
                 return response.json() as Step;
               }).catch(this.handleError.bind(this));
  }

  updateStep(step: Step) {
    const headers = this.getStandardHeaders();

    return this.http.patch(this.apiEndpoint + '/' + step.planId + '/steps/' + step.id, null, { headers: headers, body: step})
               .toPromise()
               .then(response => {
                 return response.json() as Step;
               }).catch(this.handleError.bind(this));
  }

  deleteStep(step: Step) {
    const headers = this.getStandardHeaders();

    return this.http.delete(this.apiEndpoint + '/' + step.planId + '/steps/' + step.id, { headers: headers, body: ''})
               .toPromise()
               .then(response => {
                 return response.json() as Step;
               }).catch(this.handleError.bind(this));
  }

  private getStandardHeaders() {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return headers;
  }

  private handleError(error: any) {
    if (error.status === 401) {
      this.authService.logout();
      this.router.navigate(['/login']);
    } else {
      console.error('An error occurred', error);
    }

    return Promise.reject(error.message || error);
  }
}
