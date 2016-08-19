import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from '../strategic-plan/plan';
import { StrategicPlanService } from '../shared/strategic-plan.service';

@Component({
  selector: 'sp-list',
  templateUrl: './strategic-plan-list.component.html',
  styleUrls: ['./strategic-plan-list.component.scss']
})
export class StrategicPlanListComponent implements OnInit {
  plans: Plan[];

  constructor(private strategicPlanService: StrategicPlanService, private router: Router) { }

  getPlans() {
    return this.plans;
  }

  onCreate() {
    this.strategicPlanService.createPlan().then((plan) => {
      this.router.navigateByUrl('/plans/' + plan.id);
    });
  }

  onDelete(plan: Plan) {
    if (confirm('Are you sure you want to delete this plan?')) {
      this.strategicPlanService.deletePlan(plan).then(() => {
        this.loadPlans();
      });
    }
  }

  ngOnInit() {
    this.loadPlans();
  }

  private loadPlans() {
    this.strategicPlanService.getPlans().then(plans => {
      this.plans = plans;
    });
  }
}
