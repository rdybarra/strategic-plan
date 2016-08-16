import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Plan } from '../strategic-plan/plan';
import { Step } from '../step/step';

@Injectable()
export class StrategicPlanService {
  private apiEndpoint = '/api/plans';

  constructor(private http: Http) { }

  getPlans() {
    return this.http.get(this.apiEndpoint)
               .toPromise()
               .then(response => {
                 return response.json() as Plan[];
               })
               .catch(this.handleError);
  }

  getPlan(id: string) {
    return this.http.get(this.apiEndpoint + '/' + id)
               .toPromise()
               .then(response => {
                 return response.json() as Plan;
               });
  }

  updateStep(step: Step) {
    return this.http.patch(this.apiEndpoint + '/' + step.planId + '/steps/' + step.id, step)
               .toPromise()
               .then(response => {
                 return response.json() as Step;
               });
  }

  deleteStep(step: Step) {
    return this.http.delete(this.apiEndpoint + '/' + step.planId + '/steps/' + step.id)
               .toPromise()
               .then(response => {
                 return response.json() as Step;
               });
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
