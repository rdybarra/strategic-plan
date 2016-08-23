import { StepDetailItem } from './step-detail-item';

export class Step {
  id: string;
  name: string;
  description: StepDetailItem[];
  completed: boolean;

  constructor(public planId: string, public order: number) {
    this.name = '';
    this.description = [
      new StepDetailItem('description', '', 0),
      new StepDetailItem('due', '', 1),
      new StepDetailItem('motivation', '', 2),
      new StepDetailItem('demotivation', '', 3),
      new StepDetailItem('threats', '', 4),
      new StepDetailItem('strengths', '', 5),
      new StepDetailItem('success', '', 6)
    ];
    this.completed = false;
  }
}
