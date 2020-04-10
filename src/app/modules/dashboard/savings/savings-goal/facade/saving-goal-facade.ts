import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { AccountService } from '@app/core/services/account.service';
import { IAccount, AccountType } from '@app/core/models/dto/account';
import { SavingGoalService, SavingsGoalState } from '@app/dashboard/services/saving-goal.service';
import { ISavingsGoal } from '@app/dashboard/models';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Injectable()
export class SavingGoalFacade {
  savingsGoalState: Partial<SavingsGoalState>;

  constructor(
    private savingGoalService: SavingGoalService,
    private accountService: AccountService,
    private navCtrl: NavController,
    private analytics: AnalyticsService
  ) {}

  initialize() {
    this.savingsGoalState = this.savingGoalService.getSavingGoalState();
  }

  updateAmount(flag: number) {
    if (flag === 1) {
      this.savingsGoalState.savingsGoal.targetAmount += 10;
    } else if (flag === 2 && this.savingsGoalState.savingsGoal.targetAmount > 10) {
      this.savingsGoalState.savingsGoal.targetAmount -= 10;
    }
  }

  updateYear(flag: number) {
    if (flag === 1) {
      this.savingsGoalState.savingsGoal.yearOfSaving++;
    } else if (flag === 2 && this.savingsGoalState.savingsGoal.yearOfSaving > 1) {
      this.savingsGoalState.savingsGoal.yearOfSaving--;
    }
    this.savingsGoalState.savingsGoal.endDate = moment()
      .add(this.getYear(), 'years')
      .toDate();
  }

  getYear(): number {
    return moment().year() + this.savingsGoalState.savingsGoal.yearOfSaving;
  }

  addSavingGoal() {
    this.savingGoalService.postSavingGoal(this.savingsGoalState.savingsGoal).subscribe((response: ISavingsGoal) => {
      this.analytics.logEvent(AnalyticsEventTypes.SavingsGoalCreated, {
        'goal-amount': this.savingsGoalState.savingsGoal.targetAmount,
        'goal-years': this.savingsGoalState.savingsGoal.yearOfSaving
      });
      this.goBackSavingPage();
    });
  }

  editSavingGoal() {
    this.savingGoalService.updateSavingGoal(this.savingsGoalState.savingsGoal).subscribe((response: ISavingsGoal) => {
      this.analytics.logEvent(AnalyticsEventTypes.SavingsGoalUpdated, {
        'goal-amount': this.savingsGoalState.savingsGoal.targetAmount,
        'goal-years': this.savingsGoalState.savingsGoal.yearOfSaving
      });
      this.goBackSavingPage();
    });
  }

  checkIsDisable(): boolean {
    return !(
      this.savingsGoalState.savingsGoal.name &&
      this.savingsGoalState.savingsGoal.yearOfSaving &&
      this.savingsGoalState.savingsGoal.targetAmount >= 10
    );
  }

  deleteSavingGoal() {
    this.savingGoalService
      .deleteSavingGoal(this.savingsGoalState.savingsGoal._id)
      .subscribe((response: ISavingsGoal) => {
        this.analytics.logEvent(AnalyticsEventTypes.SavingsGoalDeleted);
        this.goBackSavingPage();
      });
  }

  goBackSavingPage() {
    this.navCtrl.pop();
  }

  calculatePNR(): number {
    const accounts = this.accountService.getCachedAccountSummary() as IAccount[];
    const ssaAccount = accounts.find((account: IAccount) => account.accountType === AccountType.SSA);
    let rate = this.savingGoalService.getSavingRate();
    let projectedAmount = 0;
    if (!this.savingsGoalState.savingsGoal.targetAmount) {
      this.savingsGoalState.savingsGoal.targetAmount = 100;
    }
    const noOfMonth = 12;
    rate = rate / 100 ? rate / 100 : 0;
    const interest = rate / noOfMonth;
    for (let i = 1; i <= this.savingsGoalState.savingsGoal.yearOfSaving; i++) {
      const tension = noOfMonth * i;
      projectedAmount =
        ssaAccount.currentBalance * Math.pow(1 + interest, tension) +
        this.savingsGoalState.savingsGoal.targetAmount * ((Math.pow(1 + interest, tension) - 1) / interest);
    }
    return projectedAmount;
  }
}
