import { Injectable } from '@angular/core';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { IBillPayee, IBiller, BillerCategory, IBillPayment } from '@app/core/models/dto/member';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { IDropdownOption } from '@app/core/models/static-data';
import { DropdownModalComponent, IMeedModalContent, ModalService, SuccessModalPage } from '@app/shared';
import * as moment from 'moment';
import { AccountService, AccountType } from '@app/core';

@Injectable()
export class GiftCardFacade {
  billers: IBiller[] = [];
  searchVendors$ = new Subject<string>();
  searching: boolean;
  selectedGiftCardVendor: IBiller;
  isGiftCardVendorSeleted: boolean;
  availableGiftCardAmountsOptions: IDropdownOption[] = [];
  constructor(
    private payBillService: PayBillService,
    private router: Router,
    public alertController: AlertController,
    private currencyPipe: CurrencyPipe,
    private modalService: ModalService,
    private accountService: AccountService
  ) {}

  searchGiftCardVendorsInit(): void {
    this.searchVendors$
      .pipe(
        tap(() => (this.searching = true)),
        switchMap(billerName => this.payBillService.searchBillers(BillerCategory.Giftcard, billerName)),
        tap(() => (this.searching = false))
      )
      .subscribe(billers => {
        this.billers = billers;
      });
  }
  updatedAccountSummary() {
    this.accountService.fetchAccountSummary().subscribe();
  }
  updateGiftCardVendorSelection(giftCardVendor: IBiller): void {
    this.selectedGiftCardVendor = giftCardVendor;
    this.initAvailableDropDownAmountOptions();
  }

  isAmountExistFund(amount: number): boolean {
    const checkingSummary = this.accountService.getAccountSummary(AccountType.DDA);
    return checkingSummary && checkingSummary.availableBalance < amount ? true : false;
  }

  initAvailableDropDownAmountOptions(): void {
    this.availableGiftCardAmountsOptions = [];
    if (this.selectedGiftCardVendor) {
      this.isGiftCardVendorSeleted = true;
      const { availableGiftCardAmounts } = this.selectedGiftCardVendor;
      if (availableGiftCardAmounts && availableGiftCardAmounts.length > 0) {
        availableGiftCardAmounts
          .sort((a, b) => parseFloat(a) - parseFloat(b))
          .forEach((amount: string) => {
            const text = this.currencyPipe.transform(parseFloat(amount)).toString();
            this.availableGiftCardAmountsOptions.push({ text, value: amount });
          });
      }
    } else {
      this.isGiftCardVendorSeleted = false;
    }
  }

  buyGiftCard(giftCardDetails: IBillPayment): void {
    giftCardDetails.currency = this.selectedGiftCardVendor.currency;
    this.payBillService.giftCardPurchase(giftCardDetails).subscribe((res: any) => {
      this.openSuccessModal(res.referenceId);
    });
  }

  openAvailableAmountsModal(callback: (data) => void): void {
    this.modalService.openModal(
      DropdownModalComponent,
      {
        data: this.availableGiftCardAmountsOptions
      },
      (resp: any) => {
        const { data } = resp;
        if (data) {
          callback(data);
        }
      }
    );
  }

  openSuccessModal(referenceId: string): void {
    const componentPropsSuccess: IMeedModalContent = {
      contents: [
        {
          title: 'move-money-module.pay-bills.gift-card.success-modal.title',
          details: [
            'move-money-module.pay-bills.gift-card.success-modal.date-text',
            'move-money-module.pay-bills.gift-card.success-modal.ref-text'
          ],
          values: {
            giftCardVendorName: this.selectedGiftCardVendor.name,
            date: moment().format('MMMM d, YYYY'),
            refId: referenceId
          }
        }
      ],
      actionButtons: [
        {
          text: 'move-money-module.pay-bills.gift-card.success-modal.done-button',
          cssClass: 'white-button',
          handler: () => this.modalService.close()
        }
      ],
      onDidDismiss: () => {
        this.router.navigate(['/move-money/pay-bills'], { replaceUrl: true });
      }
    };
    this.modalService.openModal(SuccessModalPage, componentPropsSuccess);
  }
}
