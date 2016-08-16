import { Component, OnInit } from '@angular/core';

import { Plan } from '../strategic-plan/plan';
import { StrategicPlanService } from '../shared/strategic-plan.service';

@Component({
  selector: 'sp-list',
  templateUrl: './strategic-plan-list.component.html'
})
export class StrategicPlanListComponent implements OnInit {
  plans: Plan[];

  constructor(private strategicPlanService: StrategicPlanService) { }

  getPlans() {
    return this.plans;
  }

  ngOnInit() {
    this.strategicPlanService.getPlans().then(plans => {
      this.plans = plans;
    });
  }
}
