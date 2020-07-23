import { Injectable } from '@angular/core';
import { IBiller, IBillPayee } from '@app/core/models/dto/member';
import { Router } from '@angular/router';
import { PayBillService } from '@app/core/services/pay-bill.service';

@Injectable()
export class TopUpMobileFacade {
  allTopUpProviders: IBiller[] = [
    { name: 'Telcel' },
    { name: 'AT&T' },
    { name: 'Movistar' },
    { name: 'Virgin Mobile' }
  ];
  topUpProviders: IBiller[] = [];
  myTopUpAccounts: IBillPayee[] = [{ accountNumber: '555 525 5555' }, { accountNumber: '533 333 2222' }];
  searching: boolean;
  constructor(private payBillService: PayBillService, private router: Router) {}
  searchTopUpProviders(searchQuery: string) {
    this.searching = true;
    this.topUpProviders = this.allTopUpProviders.filter(
      topUpprovider => topUpprovider.name.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1
    );
    this.searching = false;
  }

  goToTopUpMobile(billAccount: IBillPayee) {
    this.payBillService.billPayee = billAccount;
    this.router.navigate(['/move-money/pay-bills/bill-payment']);
  }

  adTopUpMobile(billAccount: IBillPayee): void {}
  deleteTopUpAccount(billAccount: IBillPayee): void {}
}
