import { Injectable } from '@angular/core';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { IBillPayee } from '@app/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BillPayFacade {
  constructor(private payBillService: PayBillService, private router: Router) {}

  getPayeeList(): Observable<IBillPayee[]> {
    return this.payBillService.getPayeeList();
  }

  addPayee() {
    this.payBillService.billPayee = {};
    this.router.navigate(['/move-money/pay-bills/add-payee']);
  }

  goToBillPayment(payee: IBillPayee) {
    this.payBillService.billPayee = payee;
    this.router.navigate(['/move-money/pay-bills/bill-payment']);
  }
}
