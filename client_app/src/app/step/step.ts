export class Step {
  id: string;
  name: string;
  description: {};
  completed: boolean;

  constructor(public planId: string, public order: number) {
    this.name = '';
    this.description = {
      description: '',
      due: '',
      motivation: '',
      demotivation: '',
      threats: '',
      strengths: '',
      success: ''
    };
    this.completed = false;
  }
}
