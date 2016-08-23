export class StepDetailItem {
  name: string;
  value: string;
  label: string;
  order: number;

  constructor(name, value, order) {
    this.name = name;
    this.value = value;
    this.order = order;

    switch (this.name) {
      case 'description':
        this.label = '<i class="fa fa-play" aria-hidden="true"></i> I will...';
        break;
      case 'due':
        this.label = '<i class="fa fa-calendar" aria-hidden="true"></i> When is this due?';
        break;
      case 'motivation':
        this.label = '<i class="fa fa-smile-o" aria-hidden="true"></i> What motivates me to work on this?';
        break;
      case 'demotivation':
        this.label = '<i class="fa fa-frown-o" aria-hidden="true"></i> What frustrates me about working on this?';
        break;
      case 'threats':
        this.label = '<i class="fa fa-bolt" aria-hidden="true"></i> What threats can hinder this?';
        break;
      case 'strengths':
        this.label = `<i class="fa fa-thumbs-up" aria-hidden="true"></i>
          How will I use my strengths and motivation to overcome challenges?'`;
        break;
      case 'success':
        this.label = '<i class="fa fa-trophy" aria-hidden="true"></i> I&rsquo;ll know when I&rsquo;m done when...';
        break;
    }
  }
}
