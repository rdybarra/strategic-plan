import { Step } from '../step/step';

export class Plan {
  id: string;
  name: string;
  steps: Step[];

  constructor(name: string) {
    this.name = name;
  }
}
