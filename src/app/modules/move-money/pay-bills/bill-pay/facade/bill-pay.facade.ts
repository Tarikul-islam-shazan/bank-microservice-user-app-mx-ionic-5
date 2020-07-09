import { Injectable } from '@angular/core';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { IBillPayee, IBiller, BillerCategory } from '@app/core/models/dto/member';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class BillPayFacade {
  billers: IBiller[] = [];
  myBillAccounts: IBillPayee[];
  searchBillers$ = new Subject<string>();
  searching: boolean;
  constructor(
    private payBillService: PayBillService,
    private router: Router,
    public alertController: AlertController,
    private translate: TranslateService
  ) {}

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
  deleteBillAccount(billAccount: IBillPayee): void {
    const name = billAccount.biller.name;
    this.translate
      .get(
        [
          'move-money-module.pay-bills.bill-pay.delete-alert.header',
          'move-money-module.pay-bills.bill-pay.delete-alert.message',
          'move-money-module.pay-bills.bill-pay.delete-alert.btn-cancel',
          'move-money-module.pay-bills.bill-pay.delete-alert.btn-confirm'
        ],
        { name }
      )
      .subscribe(messages => {
        this.presentAlertConfirmToDelete(messages, billAccount._id);
      });
  }

  async presentAlertConfirmToDelete(messages: string[], billAccountId: string) {
    const alert = await this.alertController.create({
      cssClass: 'delete-bill-account-alert',
      header: messages['move-money-module.pay-bills.bill-pay.delete-alert.header'],
      message: messages['move-money-module.pay-bills.bill-pay.delete-alert.message'],
      buttons: [
        {
          text: messages['move-money-module.pay-bills.bill-pay.delete-alert.btn-cancel'],
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: messages['move-money-module.pay-bills.bill-pay.delete-alert.btn-confirm'],
          handler: () => {
            this.payBillService.deletePayee(billAccountId).subscribe(() => {
              this.getMyBillAccoutns();
            });
          }
        }
      ]
    });

    await alert.present();
  }

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
