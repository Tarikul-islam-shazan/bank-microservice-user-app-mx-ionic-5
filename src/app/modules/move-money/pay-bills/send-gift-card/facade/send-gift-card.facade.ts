import { Injectable } from '@angular/core';
import { IBiller, IGiftCardPayee, BillerCategory } from '@app/core/models/dto/member';
import { Router } from '@angular/router';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { IMeedModalContent, ModalService } from '@app/shared/services/modal.service';
import { SuccessModalPage } from '@app/shared/components/success-modal/container/success-modal.page';
import { IDropdownOption } from '@app/core';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

@Injectable()
export class SendGiftCardFacade {
  showCardVendorInput = true;
  giftCardVendorName = '';
  searching: boolean;
  giftCardVendors: IBiller[] = [];
  selectedGiftCardVendor: IBiller;
  email: string;
  amountText = '';
  amount: number;
  giftCardAmounts: IDropdownOption[];

  constructor(
    private payBillService: PayBillService,
    private modalService: ModalService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.giftCardAmounts = [];
    this.email = '';
    this.amount = 0.0;
  }

  searchGiftCardVendors(searchQuery: string): void {
    if (searchQuery !== '') {
      this.payBillService
        .searchBillers(BillerCategory.Giftcard, searchQuery)
        .subscribe((giftCardVendors: IBiller[]) => {
          this.giftCardVendors = giftCardVendors;
          if (this.giftCardVendors.length > 0 && searchQuery !== '') {
            this.searching = true;
          } else {
            this.searching = false;
          }
        });
    } else {
      this.searching = false;
      this.giftCardVendors = [];
    }
  }

  selectGiftCardVendor(giftCardVendor: IBiller) {
    this.searching = false;
    this.giftCardVendors = [];

    this.giftCardVendorName = giftCardVendor.name;
    this.selectedGiftCardVendor = giftCardVendor;

    this.giftCardAmounts = [];
    if (this.selectedGiftCardVendor.availableGiftCardAmounts) {
      this.selectedGiftCardVendor.availableGiftCardAmounts.forEach(amount => {
        const amountText = this.translate.instant('move-money-module.pay-bills.send-gift-card.gift-card-amount', {
          amount
        });
        this.giftCardAmounts.push({ text: amountText, value: amount });
      });
    }
  }

  onClickNext() {
    this.showCardVendorInput = !this.showCardVendorInput;
  }

  onClickBuyGiftCard(): void {
    const giftCardPayee: IGiftCardPayee = {
      giftCardId: this.selectedGiftCardVendor.id,
      email: this.email,
      amount: this.amount
    };
    this.payBillService.giftCardPurchase(giftCardPayee).subscribe((res: any) => {
      this.openSuccessModal(res.referenceId);
    });
  }

  onClickCancel() {
    this.amountText = '';
    this.amount = 0.0;
    this.showCardVendorInput = !this.showCardVendorInput;
  }

  enableNextButton(): boolean {
    if (REG_EX_PATTERNS.EMAIL.test(this.email.trim()) && this.searchGiftCardVendors !== null) {
      return false;
    } else {
      return true;
    }
  }

  resetData() {
    this.giftCardVendorName = '';
    this.email = '';
    this.amountText = '';
    this.amount = 0;
    this.showCardVendorInput = true;
  }

  private openSuccessModal(referenceId: string) {
    const componentPropsSuccess: IMeedModalContent = {
      contents: [
        {
          title: 'move-money-module.pay-bills.send-gift-card.success-modal.title',
          details: [
            'move-money-module.pay-bills.send-gift-card.success-modal.date-text',
            'move-money-module.pay-bills.send-gift-card.success-modal.ref-text'
          ],
          values: {
            giftCard: this.selectedGiftCardVendor.name,
            date: moment().format('MMMM d, YYYY'),
            refId: referenceId
          }
        }
      ],
      actionButtons: [
        {
          text: 'move-money-module.pay-bills.send-gift-card.success-modal.done-button',
          cssClass: 'white-button',
          handler: () => this.modalService.close()
        }
      ],
      onDidDismiss: () => {
        // this.analyticsService.logEvent(AnalyticsEventTypes.PasswordChanged);
        this.router.navigate(['/move-money/pay-bills'], { replaceUrl: true });
      }
    };
    this.modalService.openModal(SuccessModalPage, componentPropsSuccess);
  }
}
