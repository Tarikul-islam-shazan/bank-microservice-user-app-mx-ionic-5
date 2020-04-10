import { Injectable } from '@angular/core';
import { TransactionDetailsService } from '@app/dashboard/services/transaction-details.service';
import { Observable } from 'rxjs';
import { IAccount, ITransaction } from '@app/core/models/dto/account';

@Injectable()
export class TransactionDetailsFacade {
  constructor(private transactionDetailsService: TransactionDetailsService) {}

  account: IAccount = this.transactionDetailsService.getAccount();

  transaction: ITransaction = this.transactionDetailsService.getTransaction();
}
