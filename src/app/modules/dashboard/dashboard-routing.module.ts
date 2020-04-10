import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGES } from '@app/core';
import { CheckingPage } from '@app/dashboard/checking/container/checking.page';
import { HomePage } from './home/container';
import { SavingsTransactionsPage } from './savings/savings-transactions/container/savings-transactions.page';
import { SavingsGoalPage } from './savings/savings-goal/container/savings-goal.page';
import { LineOfCreditPage } from './line-of-credit/container';
import { TransactionDetailsPage } from './transaction-details/container';

const routes: Routes = [
  {
    path: '',
    data: { title: PAGES.DASHBOARD.NAME },
    component: HomePage
  },
  {
    path: 'checking-history',
    data: { title: PAGES.CHECKING.NAME },
    component: CheckingPage
  },
  {
    path: 'savings-transactions',
    data: { title: PAGES.SAVING_TRANSACTIONS.NAME },
    component: SavingsTransactionsPage
  },
  {
    path: 'loc-history',
    data: { title: PAGES.LINE_OF_CREDIT.NAME },
    component: LineOfCreditPage
  },
  {
    path: 'saving-goal',
    data: { title: PAGES.SAVING_GOAL.NAME },
    component: SavingsGoalPage
  },
  {
    path: 'transaction-details',
    data: { title: PAGES.SAVING_GOAL.NAME },
    component: TransactionDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
