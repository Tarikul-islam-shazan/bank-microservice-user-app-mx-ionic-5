import { Injectable } from '@angular/core';
import { AccountType, IAccount, Logger, ITransaction } from '@app/core';
import { AccountService } from '@app/core/services/account.service';
import {
  TransactionSummary,
  AccountTransaction,
  ISegmentContainer,
  ISavingsGoal,
  TabPage
} from '@app/dashboard/models';
import { Router } from '@angular/router';
import { SavingGoalService } from '@app/dashboard/services/saving-goal.service';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
const log = new Logger('SavingTransactionsFacade');
export interface ISavingAccount extends IAccount {
  fundsOnHold: number;
}
export interface ISavingTarget {
  monthly: number;
  weekly: number;
  daily: number;
}
export interface IEvent {
  eventName: string;
  params: string;
}
@Injectable()
export class SavingTransactionsFacade {
  transactions: AccountTransaction;
  transactionSummary: TransactionSummary[];
  listOfSavingGoal: ISavingsGoal[];
  monthlySavingTarget = 0;
  monthlyTotalSave = 0;
  progress = 0;
  savingTarget: ISavingTarget = {
    monthly: 0,
    weekly: 0,
    daily: 0
  };
  eventTarget: IEvent = {
    eventName: '',
    params: ''
  };
  segmentContainer: ISegmentContainer[] = [];
  selectedTab = 'tab-target';

  constructor(
    private accountService: AccountService,
    public savingGoalService: SavingGoalService,
    private router: Router,
    private analytics: AnalyticsService,
    private modalService: ModalService
  ) {}

  setAccountSummary() {
    this.transactionSummary = [
      {
        title: 'dashboard-module.ssa-transaction-page.balance-text',
        amount: this.savingAccount.currentBalance
      },
      {
        title: 'dashboard-module.ssa-transaction-page.funds-on-hold-text',
        amount: this.savingAccount.fundsOnHold
      },
      {
        title: 'dashboard-module.ssa-transaction-page.available-text',
        amount: this.savingAccount.availableBalance
      }
    ];
  }

  setSegmentContainer() {
    this.segmentContainer = [
      { reference: 'tab-target', name: 'dashboard-module.ssa-transaction-page.target-text' },
      { reference: 'tab-goal', name: 'dashboard-module.ssa-transaction-page.goal-setup-text' },
      { reference: 'tab-history', name: 'dashboard-module.ssa-transaction-page.history-text' }
    ];
  }

  modifyGoal(goal: ISavingsGoal) {
    this.savingGoalService.initializeSavingGoal(goal);
    this.router.navigate(['/home/saving-goal']);
  }

  goToSelectedPage() {
    if (this.selectedTab === TabPage.TargetTab) {
      this.analytics.logEvent(AnalyticsEventTypes.TransferStarted, { source: 'save-now' });
      this.router.navigate(['/move-money/internal-transfer']);
    } else if (this.selectedTab === TabPage.GoalTab) {
      this.analytics.logEvent(AnalyticsEventTypes.SavingsGoalStarted);
      this.savingGoalService.initializeSavingGoal();
      this.router.navigate(['/home/saving-goal']);
    }
  }

  setTransactions() {
    this.accountService.getTransactions(this.savingAccount.accountId).subscribe((transactions: AccountTransaction) => {
      this.transactions = transactions;
      this.loadGoals();
    });
  }

  calculateTotalMonthlySaving() {
    const currentDate = new Date();
    this.monthlyTotalSave = 0;
    this.transactions.postedTransactions.forEach((postedTransaction: ITransaction) => {
      const savingDate = new Date(postedTransaction.dateTime);
      if (savingDate.getMonth() === currentDate.getMonth() && savingDate.getFullYear() === currentDate.getFullYear()) {
        this.monthlyTotalSave += postedTransaction.amount;
      }
    });
  }

  /**
   * Summary: This function calculate Progress bar
   * Ticket: GMA-4728
   * Details: Savings: Progress percentage number should show up to 2 decimals.
   * Date: March 31, 2020
   * @memberof SavingTransactionsFacade
   */
  calculateProgress() {
    if (this.monthlySavingTarget > 0) {
      const savingProgress = Math.min((this.monthlyTotalSave * 100) / this.monthlySavingTarget, 100);
      this.progress = Number(savingProgress.toFixed(2));
    }
  }

  setSavingTargetData() {
    function daysInMonth() {
      const d = new Date();
      const y = d.getFullYear();
      const m = d.getMonth();
      return new Date(y, m + 1, 0).getDate() + 1;
    }
    if (this.monthlyTotalSave < this.monthlySavingTarget) {
      this.savingTarget.monthly = this.monthlySavingTarget - this.monthlyTotalSave;
      const remDays = daysInMonth() - new Date().getDate();
      this.savingTarget.daily = this.savingTarget.monthly / remDays;
      this.savingTarget.weekly = this.savingTarget.daily * (remDays < 7 ? remDays : 7);
      this.calculateProgress();
    } else {
      this.progress = 100;
    }
  }

  switchTab(tab: string) {
    this.selectedTab = tab;

    switch (tab) {
      case TabPage.TargetTab:
        this.eventTarget = {
          eventName: 'Savings-target',
          params: ''
        };
        break;
      case TabPage.GoalTab:
        this.eventTarget = {
          eventName: 'savings-goal-setup',
          params: ''
        };
        break;
      case TabPage.HistoryTab:
        break;
    }
  }

  loadGoals() {
    this.savingGoalService.fetchSavingGoal().subscribe((savingGoal: ISavingsGoal[]) => {
      this.monthlySavingTarget = 0;
      this.listOfSavingGoal = savingGoal;
      if (this.listOfSavingGoal) {
        this.listOfSavingGoal.forEach((value: ISavingsGoal) => {
          this.monthlySavingTarget += value.targetAmount;
        });
      }
      this.calculateTotalMonthlySaving();
      this.setSavingTargetData();
    });
  }

  loadSavingTransactions() {
    this.setSegmentContainer();
    this.setAccountSummary();
    this.setTransactions();
  }

  get savingAccount(): ISavingAccount {
    const accounts = this.accountService.getCachedAccountSummary() as IAccount[];
    const ssaAccount = accounts.find((account: IAccount) => account.accountType === AccountType.SSA);
    const fundsOnHold =
      (accounts.find((account: IAccount) => account.accountType === AccountType.LOC).balanceOwed * 133.34) / 100.0;
    return { ...ssaAccount, fundsOnHold };
  }

  get savingInterestRate(): number {
    return this.savingAccount.interestEarned;
  }

  async openInfoModal(event) {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'info-modal-module.saving-page.title',
          details: [
            'info-modal-module.saving-page.details.content1',
            'info-modal-module.saving-page.details.content2',
            'info-modal-module.saving-page.details.content3',
            'info-modal-module.saving-page.details.content4'
          ],
          values: { interestRate: this.savingInterestRate.toString() }
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
