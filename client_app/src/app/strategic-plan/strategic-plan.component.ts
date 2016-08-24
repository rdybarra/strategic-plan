import { Component, OnInit } from '@angular/core';
import { StepComponent } from '../step/step.component';
import { Step } from '../step/step';

import { ActivatedRoute, Params } from '@angular/router';

import { Plan } from './plan';
import { StrategicPlanService } from '../shared/strategic-plan.service';

@Component({
  selector: 'sp-plan',
  templateUrl: './strategic-plan.component.html',
  styleUrls: ['./strategic-plan.component.scss'],
  directives: [StepComponent]
})
export class StrategicPlanComponent implements OnInit {
  private steps = [];
  private plan: Plan;
  editing: boolean;

  constructor(private strategicPlanService: StrategicPlanService, private route: ActivatedRoute) { }

  onEdit() {
    this.editing = true;
  }

  onSave() {
    this.editing = false;
    this.strategicPlanService.updatePlan(this.plan);
  }

  onAddStep(index: number) {
    let step = new Step(this.plan.id, index + 1);
    this.steps.splice(index + 1, 0, step);
  }

  onDeleteStep(step: Step) {
    let index = this.steps.findIndex(function(localStep) {
      return localStep.id === step.id;
    });

    this.steps.splice(index, 1);
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = params['id'];
        this.strategicPlanService.getPlan(id).then(plan => {
          this.plan = plan;
          this.steps = plan.steps;
        });
      }
    });
  }
}
