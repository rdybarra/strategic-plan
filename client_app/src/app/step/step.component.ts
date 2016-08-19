import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Step } from './step';
import { StepDetailItem } from './step-detail-item';
import { StrategicPlanService } from '../shared/strategic-plan.service';

@Component({
  selector: 'sp-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  @Input() step: Step;
  @Output() onDeleteStep = new EventEmitter<Step>();
  open: boolean;
  editing: boolean;
  stepDetailItems: StepDetailItem[];

  constructor(private strategicPlanService: StrategicPlanService) {
    this.open = false;
    this.editing = false;
    this.stepDetailItems = [];
  }

  ngOnInit() {
    for (let item in this.step.description) {
      if (this.step.description.hasOwnProperty(item)) {
        this.stepDetailItems.push(new StepDetailItem(item));
      }
    }
  }

  onOpen() {
    let body = document.getElementsByTagName('body').item(0);
    body.style.overflow = 'hidden';

    this.open = true;
  }

  onClose() {
    let body = document.getElementsByTagName('body').item(0);
    body.style.overflow = 'auto';

    this.open = false;
  }

  onEdit() {
    this.editing = true;
  }

  onSave() {
    this.editing = false;

    return this.step.id ? this.saveUpdatedStep() : this.saveNewStep();
  }

  onDelete(step: Step) {
    if (confirm('Are you sure you want to delete this step?')) {
      this.strategicPlanService.deleteStep(this.step).then(step => {
        this.onDeleteStep.emit(step);
        this.onClose();
      });
    }
  }

  onComplete() {
    this.step.completed = true;
    this.onSave();
    this.onClose();
  }

  onIncomplete() {
    this.step.completed = false;
    this.onSave();
    this.onClose();
  }

  private saveUpdatedStep() {
    return this.strategicPlanService.updateStep(this.step).then(step => {
      this.step = step;
    });
  }

  private saveNewStep() {
    console.log(JSON.stringify(this.step));
    return this.strategicPlanService.createStep(this.step).then(step => {
      this.step = step;
    });
  }
}
