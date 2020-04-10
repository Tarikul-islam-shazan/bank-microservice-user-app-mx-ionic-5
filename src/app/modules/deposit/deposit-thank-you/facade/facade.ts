import { Injectable } from '@angular/core';
import { SignUpService } from '@app/core';
import { IPayStandTransactionInfo } from '@app/deposit/paystand/models';

@Injectable()
export class DepositThankYouFacade {
  constructor(private signUpService: SignUpService) {}

  getPayStandTransactionInfo(): IPayStandTransactionInfo {
    return this.signUpService.payStandTransactionInfo;
  }
}
