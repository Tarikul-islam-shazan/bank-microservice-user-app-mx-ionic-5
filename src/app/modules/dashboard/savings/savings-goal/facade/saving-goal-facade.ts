import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { AccountService } from '@app/core/services/account.service';
import { IAccount, AccountType } from '@app/core/models/dto/account';
import { SavingGoalService, SavingsGoalState } from '@app/dashboard/services/saving-goal.service';
import { ISavingsGoal } from '@app/dashboard/models';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { IMeedModalContent, ModalService } from '@app/shared';
import { Router } from '@angular/router';
@Injectable()
export class SavingGoalFacade {
  savingsGoalState: Partial<SavingsGoalState>;

  constructor(
    private savingGoalService: SavingGoalService,
    private accountService: AccountService,
    private analytics: AnalyticsService,
    private readonly modalService: ModalService,
    private readonly router: Router
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
      .add(this.getYearOfSaving(), 'years')
      .toDate();
  }

  /**
   * This function return year of saving value
   * Issue: MR2-227
   * Details: Saving goal send wrong endDate to server
   * Developer: Utpaul<Utpal.Sarker@brainstation23.com>
   * Date: April 28, 2020
   * @returns {number}
   * @memberof SavingGoalFacade
   */
  getYearOfSaving(): number {
    return this.savingsGoalState.savingsGoal.yearOfSaving;
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
      this.closeModal(true);
    });
  }

  editSavingGoal() {
    this.savingGoalService.updateSavingGoal(this.savingsGoalState.savingsGoal).subscribe((response: ISavingsGoal) => {
      this.analytics.logEvent(AnalyticsEventTypes.SavingsGoalUpdated, {
        'goal-amount': this.savingsGoalState.savingsGoal.targetAmount,
        'goal-years': this.savingsGoalState.savingsGoal.yearOfSaving
      });
      this.closeModal(true);
    });
  }

  checkIsDisable(): boolean {
    return !(
      this.savingsGoalState.savingsGoal.name &&
      this.savingsGoalState.savingsGoal.yearOfSaving &&
      this.savingsGoalState.savingsGoal.targetAmount >= 10
    );
  }

  /**
   * @summary generates component props for openInfoModalComponent component.
   *
   * @private
   * @returns {IMeedModalContent}
   * @memberOf SavingGoalFacade
   */
  private generateDeleteConfirmationComponentProp(): IMeedModalContent {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: '',
          details: ['dashboard-module.savings-goal.modal.delete-goal-title']
        }
      ],
      actionButtons: [
        {
          text: 'dashboard-module.savings-goal.modal.yes-button',
          cssClass: 'white-button',
          handler: () => {
            this.closeModal();
            this.savingGoalService.deleteSavingGoal(this.savingsGoalState.savingsGoal._id).subscribe(() => {
              this.analytics.logEvent(AnalyticsEventTypes.SavingsGoalDeleted);
              this.closeModal(true);
            });
          }
        },
        {
          text: 'dashboard-module.savings-goal.modal.no-button',
          cssClass: 'grey-outline-button',
          handler: () => {
            this.closeModal();
          }
        }
      ]
    };

    return componentProps;
  }

  /**
   * @sumamry opens openInfoModalComponent modal.
   * deletes the goal if Yes chosen or
   * closes modal if No chosen.
   *
   * @private
   * @returns {void}
   * @memberOf SavingGoalFacade
   */
  private openGoalDeleteModal(): void {
    const componentProps = this.generateDeleteConfirmationComponentProp();
    this.modalService.openInfoModalComponent({ componentProps });
  }

  /**
   * @summary deletes goal
   *
   * @returns {void}
   * @memberOf SavingGoalFacade
   */
  deleteSavingGoal(): void {
    this.openGoalDeleteModal();
  }

  /**
   * @summary closes modal
   *
   * @returns {void}
   * @memberOf SavingGoalFacade
   */
  closeModal(dataChanged: boolean = false): void {
    this.modalService.close(dataChanged);
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
