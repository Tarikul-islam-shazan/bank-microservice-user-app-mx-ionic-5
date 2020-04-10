import { Component, Input } from '@angular/core';

/**
 * Generated class for the StepCounterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'step-counter',
  templateUrl: 'step-counter.html',
  styleUrls: ['./step-counter.scss']
})
export class StepCounterComponent {
  text: string;
  @Input() step: any;
  @Input() stepNo: any;

  constructor() {}
}
