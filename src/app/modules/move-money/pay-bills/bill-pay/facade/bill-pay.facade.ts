import { Injectable } from '@angular/core';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { IBillPayee, IBiller, BillerCategory } from '@app/core/models/dto/member';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable()
export class BillPayFacade {
  billers: IBiller[] = [];
  myBillAccounts: IBillPayee[];
  searchBillers$ = new Subject<string>();
  searching: boolean;
  constructor(private payBillService: PayBillService, private router: Router) {}

  searchBillersInit(): void {
    this.searchBillers$
      .pipe(
        tap(() => (this.searching = true)),
        switchMap(billerName => this.payBillService.searchBillers(BillerCategory.Utility, billerName)),
        tap(() => (this.searching = false))
      )
      .subscribe(billers => {
        this.billers = billers;
      });
  }

  getMyBillAccoutns(): void {
    this.payBillService
      .getBillAccounts(BillerCategory.Utility)
      .subscribe(billAccounts => (this.myBillAccounts = billAccounts));
  }

  addPayee(biller: IBiller) {
    this.payBillService.biller = biller;
    this.router.navigate(['/move-money/pay-bills/add-payee']);
  }

  goToBillPayment(billAccount: IBillPayee) {
    this.payBillService.billPayee = billAccount;
    this.router.navigate(['/move-money/pay-bills/bill-payment']);
  }

  /**
   *
   * @summary A function to delete my bill Account
   * @param {IBillPayee} billAccount
   * @memberof BillPayFacade
   */
  deleteBillAccount(billAccount: IBillPayee): void {}

  /**
   *
   * @summary A function to edit My bill Account
   * @param {IBillPayee} billAccount
   * @memberof BillPayFacade
   */
  editBillAccount(billAccount: IBillPayee): void {
    this.payBillService.billPayee = billAccount;
    this.router.navigate(['/move-money/pay-bills/edit-payee']);
  }
}
