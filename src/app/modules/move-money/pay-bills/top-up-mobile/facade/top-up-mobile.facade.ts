import { Injectable } from '@angular/core';
import { IBiller, IBillPayee, BillerCategory } from '@app/core/models/dto/member';
import { Router } from '@angular/router';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class TopUpMobileFacade {
  searchTopUpProviders$ = new Subject<string>();
  topUpProviders: IBiller[] = [];
  myTopUpAccounts: IBillPayee[] = [];
  searching: boolean;
  constructor(private payBillService: PayBillService, private router: Router) {}
  searchTopUpProvidersInit(): void {
    this.searchTopUpProviders$
      .pipe(
        tap(() => (this.searching = true)),
        switchMap(providerName => this.payBillService.searchBillers(BillerCategory.Topup, providerName)),
        tap(() => (this.searching = false))
      )
      .subscribe(providers => {
        this.topUpProviders = providers;
      });
  }

  getTopUpBillAccoutns(): void {
    this.payBillService
      .getBillAccounts(BillerCategory.Topup)
      .subscribe(topUpAccounts => (this.myTopUpAccounts = topUpAccounts));
  }

  goToTopUpMobile(billAccount: IBillPayee) {
    this.payBillService.billPayee = billAccount;
    this.router.navigate(['/move-money/pay-bills/top-up-payment']);
  }
  adTopUpMobile(biller: IBiller): void {
    this.payBillService.biller = biller;
    this.router.navigate(['/move-money/pay-bills/add-top-up-payee']);
  }
  deleteTopUpAccount(billAccount: IBillPayee): void {}
}
