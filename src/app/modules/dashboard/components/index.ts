import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AccountsCardComponent } from './accounts-card';
import { AccountTransactionHeaderComponent } from './account-transaction-header';
import { AccountBalanceComponent } from './account-balance';
import { TransactionCardComponent } from '@app/dashboard/components/transaction-card';
import { TransactionSummaryComponent } from '@app/dashboard/components/transaction-summary';
import { SegmentContainerComponent } from './segment-container';
import { SavingsHistoryComponent } from './savings-history/savings-history.component';
import { SavingsTargetComponent } from './savings-target';
import { TransactionDetailsContentComponent } from './transaction-details-content';

export const SHARED_DASHBOARD_COMPONENTS: any[] = [
  AccountsCardComponent,
  AccountTransactionHeaderComponent,
  AccountBalanceComponent,
  TransactionCardComponent,
  TransactionSummaryComponent,
  SegmentContainerComponent,
  SavingsHistoryComponent,
  SavingsTargetComponent,
  TransactionDetailsContentComponent,
  AdvancedSearchComponent
];

export * from './accounts-card';
export * from './account-transaction-header';
export * from './account-balance';
export * from './transaction-card';
export * from './transaction-summary';
export * from './segment-container';
export * from './savings-history';
export * from './savings-target';
export * from './advanced-search';
