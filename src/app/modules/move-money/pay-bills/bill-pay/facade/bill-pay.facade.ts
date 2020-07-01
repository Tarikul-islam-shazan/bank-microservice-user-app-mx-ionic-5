import { Injectable } from '@angular/core';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { IBillPayee, IBiller } from '@app/core/models/dto/member';
import { Router } from '@angular/router';

@Injectable()
export class BillPayFacade {
  staticBiller: IBiller[] = [
    { name: 'Agua De Cancun' },
    { name: 'Blue Telecom' },
    { name: 'Cablemas' },
    { name: 'Fomento Metroploitano de Monterry -Formerrey' },
    { name: 'GAS Natural Mexico' }
  ];
  searchBillersResult: IBiller[];
  constructor(private payBillService: PayBillService, private router: Router) {}

  searchBillers(billerName: string): void {
    if (billerName) {
      this.searchBillersResult = this.staticBiller.filter(
        biller => biller.name.toLowerCase().indexOf(billerName.toLowerCase()) > -1
      );
    } else {
      this.searchBillersResult = [];
    }
  }

  getMyBillAccoutns(): IBillPayee[] {
    return [
      { name: 'Agua De Cancun' },
      { name: 'Blue Telecom' },
      { name: 'Cablemas' },
      { name: 'Fomento Metroploitano de Monterry -Formerrey' },
      { name: 'GAS Natural Mexico' }
    ];
  }

  addPayee(biller: IBiller) {
    this.payBillService.biller = biller;
    this.router.navigate(['/move-money/pay-bills/add-payee']);
  }

  goToBillPayment(billAccount: IBillPayee) {
    this.payBillService.billPayee = billAccount;
    this.router.navigate(['/move-money/pay-bills/bill-payment']);
  }
}
