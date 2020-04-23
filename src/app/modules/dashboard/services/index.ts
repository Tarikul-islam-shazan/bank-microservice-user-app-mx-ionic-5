import { SavingGoalService } from './saving-goal.service';
import { TransactionDetailsService } from './transaction-details.service';
import { InterestRateService } from './interest-rate.service';

export const DASHBOARD_SHARED_SERVICES: any[] = [SavingGoalService, TransactionDetailsService, InterestRateService];

export * from './saving-goal.service';
export * from './transaction-details.service';
