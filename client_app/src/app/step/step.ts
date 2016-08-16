export class Step {
  id: string;
  name: string;
  description: {};
  completed: boolean;

  constructor(public planId: string) {
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
