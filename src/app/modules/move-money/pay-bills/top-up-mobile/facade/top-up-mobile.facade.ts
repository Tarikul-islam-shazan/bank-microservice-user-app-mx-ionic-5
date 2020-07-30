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
  myTopUpAccounts: IBillPayee[] = [
    {
      accountNumber: '555 525 5555',
      biller: {
        name: 'Telcel',
        available_topup_amounts: ['20.00', '50.00', '150.00', '300.00', '500.00', '100.00', '200.00', '30.00']
      }
    },
    {
      accountNumber: '533 333 2222',
      biller: {
        name: 'Movistar',
        available_topup_amounts: ['20.00', '50.00', '150.00', '300.00', '500.00', '100.00', '200.00', '30.00']
      }
    }
  ];
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
    this.router.navigate(['/move-money/pay-bills/top-up-payment']);
  }
  adTopUpMobile(biller: IBiller): void {
    this.payBillService.biller = biller;
    this.router.navigate(['/move-money/pay-bills/add-top-up-payee']);
  }
  deleteTopUpAccount(billAccount: IBillPayee): void {}
}
