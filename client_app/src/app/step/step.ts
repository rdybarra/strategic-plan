export class Step {
  id: string;
  name: string;
  description: {};
  completed: boolean;
  planId: string;

  constructor() {
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
