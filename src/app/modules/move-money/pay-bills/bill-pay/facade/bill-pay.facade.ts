import { Injectable } from '@angular/core';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { IBillPayee, IBiller, BillerCategory } from '@app/core/models/dto/member';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class BillPayFacade {
  searchBillersResult: IBiller[];
  myBillAccounts: IBillPayee[];
  constructor(private payBillService: PayBillService, private router: Router) {}

  searchBillers(billerName: string): void {
    if (billerName) {
      this.searchBillersResult = this.searchBillersResult.filter(
        biller => biller.name.toLowerCase().indexOf(billerName.toLowerCase()) > -1
      );
    } else {
      this.searchBillersResult = [];
    }
  }
  getBillers(billerName: string): void {
    this.payBillService
      .searchBillers(BillerCategory.Utility, billerName)
      .subscribe(billers => (this.searchBillersResult = billers));
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
