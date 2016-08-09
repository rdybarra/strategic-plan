export class Step {
  id: number;
  name: string;
  description: {};
  completed: boolean;

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
