import { SavingGoalService } from './saving-goal.service';
import { TransactionDetailsService } from './transaction-details.service';

export const SAVINGS_GOAL_SERVICE: any[] = [SavingGoalService, TransactionDetailsService];

export * from './saving-goal.service';
export * from './transaction-details.service';
