import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { DashboardRoutingModule } from '@app/dashboard/dashboard-routing.module';
import { CheckingPage } from '@app/dashboard/checking/container/checking.page';
import { SavingsTransactionsPage } from '@app/dashboard/savings/savings-transactions/container';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { SHARED_DASHBOARD_COMPONENTS } from '@app/dashboard/components';
import { SAV_FACADE_SERVICE } from '@app/dashboard/savings/savings-transactions/facade';
import { HOME_FACADE_SERVICE } from './home/facade';
import { HomePage } from './home/container';
import { SavingsGoalPage } from './savings/savings-goal/container/savings-goal.page';
import { SAVING_GOAL_FACADE_SERVICE } from './savings/savings-goal/facade';
import { SAVINGS_GOAL_SERVICE } from './services';
import { LineOfCreditPage } from './line-of-credit/container';
import { TransactionDetailsPage } from './transaction-details/container';
import { TRANSACTION_DETAILS_FACADE_SERVICE } from '@app/dashboard/transaction-details/facade';

export const SHARED_PAGE_COMPONENTS: any[] = [
  HomePage,
  CheckingPage,
  LineOfCreditPage,
  SavingsTransactionsPage,
  SavingsGoalPage,
  TransactionDetailsPage
];

@NgModule({
  imports: [SharedModule, DashboardRoutingModule, RoundProgressModule],
  declarations: [SHARED_DASHBOARD_COMPONENTS, SHARED_PAGE_COMPONENTS],
  providers: [
    ...SAVINGS_GOAL_SERVICE,
    ...HOME_FACADE_SERVICE,
    ...SAV_FACADE_SERVICE,
    ...SAVING_GOAL_FACADE_SERVICE,
    ...TRANSACTION_DETAILS_FACADE_SERVICE
  ]
})
export class DashboardModule {}
