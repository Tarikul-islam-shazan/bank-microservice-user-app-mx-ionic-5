import { Injectable } from '@angular/core';
import { IBiller, IBillPayee, BillerCategory } from '@app/core/models/dto/member';
import { Router } from '@angular/router';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class TopUpMobileFacade {
  searchTopUpProviders$ = new Subject<string>();
  topUpProviders: IBiller[] = [];
  myTopUpAccounts: IBillPayee[] = [];
  searching: boolean;
  constructor(
    private payBillService: PayBillService,
    private router: Router,
    public alertController: AlertController,
    private translate: TranslateService
  ) {}
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

  /**
   * @summary A function to delete TopUp bill Account
   *
   * @param {IBillPayee} billAccount
   * @memberof TopUpMobileFacade
   */
  deleteTopUpAccount(billAccount: IBillPayee): void {
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
              this.getTopUpBillAccoutns();
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
