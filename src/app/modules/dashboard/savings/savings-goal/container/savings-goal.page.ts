import { Component } from '@angular/core';
import { SavingGoalFacade } from '../facade';
@Component({
  selector: 'saving-goal',
  templateUrl: './savings-goal.page.html',
  styleUrls: ['./savings-goal.page.scss']
})
export class SavingsGoalPage {
  constructor(public savingGoalFacade: SavingGoalFacade) {
    this.savingGoalFacade.initialize();
  }
}
