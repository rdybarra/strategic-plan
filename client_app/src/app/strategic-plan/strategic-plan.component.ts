import { Component, OnInit } from '@angular/core';
import { StepComponent } from '../step/step.component';
import { Step } from '../step/step';
import { STEPS } from '../step/mock-steps';
import { PLAN } from './mock-plan';

@Component({
  selector: 'my-home',
  templateUrl: './strategic-plan.component.html',
  styleUrls: ['./strategic-plan.component.scss'],
  directives: [StepComponent]
})
export class StrategicPlanComponent implements OnInit {
  public steps = STEPS;
  plan = PLAN;
  editing: boolean;

  onEdit() {
    this.editing = true;
  }

  onSave() {
    this.editing = false;
  }

  onAddStep(index: number) {
    let step = new Step();
    this.steps.splice(index + 1, 0, step);
  }

  onDeleteStep(step: Step) {
    let index = this.steps.findIndex(function(localStep) {
      return localStep.id === step.id;
    });

    this.steps.splice(index, 1);
  }

  ngOnInit() {
    console.log('Hello strategic plan');
  }
}
