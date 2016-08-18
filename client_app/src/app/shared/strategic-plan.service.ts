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

  createPlan() {
    const plan = new Plan('Untitled');

    return this.http.post(this.apiEndpoint, plan)
               .toPromise()
               .then(response => {
                 return response.json() as Plan;
               });
  }

  updatePlan(plan: Plan) {
    return this.http.patch(this.apiEndpoint + '/' + plan.id, plan)
               .toPromise()
               .then(response => {
                 return response.json() as Plan;
               });
  }

  deletePlan(plan: Plan) {
    return this.http.delete(this.apiEndpoint + '/' + plan.id)
               .toPromise()
               .then(response => {
                 return response.json() as Plan;
               });
  }

  createStep(step: Step) {
    return this.http.post(this.apiEndpoint + '/' + step.planId + '/steps/', step)
               .toPromise()
               .then(response => {
                 return response.json() as Step;
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
