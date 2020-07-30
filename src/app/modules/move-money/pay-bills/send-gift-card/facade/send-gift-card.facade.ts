import { Injectable } from '@angular/core';
import { IBiller, IBillPayee } from '@app/core/models/dto/member';
import { Router } from '@angular/router';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { IMeedModalContent, ModalService } from '@app/shared/services/modal.service';
import { SuccessModalPage } from '@app/shared/components/success-modal/container/success-modal.page';
import { IDropdownOption } from '@app/core';

@Injectable()
export class SendGiftCardFacade {
  showCardVendorForm = true;

  allGiftCardVendors: IBiller[] = [
    { name: 'Amazon Gift Card' },
    { name: 'Ebay Gift Card' },
    { name: 'Walmart Gift Card' },
    { name: 'Google Play Gift Card' }
  ];
  giftCardVendors: IBiller[] = [];
  searching: boolean;

  giftCardAmounts: IDropdownOption[];

  constructor(private payBillService: PayBillService, private modalService: ModalService, private router: Router) {}

  searchGiftCardVendors(searchQuery: string): void {
    this.giftCardVendors = this.allGiftCardVendors.filter(
      giftCardVendors => giftCardVendors.name.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    );
    if (this.giftCardVendors.length > 0 && searchQuery !== '') {
      this.searching = true;
    } else {
      this.searching = false;
    }
  }

  onClickNext() {
    this.showCardVendorForm = !this.showCardVendorForm;
    this.giftCardAmounts = [
      {
        text: '$500.00',
        value: '500'
      },
      {
        text: '$1000.00',
        value: '1000'
      },
      {
        text: '$1500.00',
        value: '1500'
      }
    ];
  }

  onClickBuyGiftCard() {
    this.openSuccessModal();
  }

  onClickCancel() {
    this.showCardVendorForm = !this.showCardVendorForm;
  }

  private openSuccessModal() {
    const componentPropsSuccess: IMeedModalContent = {
      contents: [
        {
          title: 'move-money-module.pay-bills.send-gift-card.success-modal.title',
          details: [
            'move-money-module.pay-bills.send-gift-card.success-modal.date-text',
            'move-money-module.pay-bills.send-gift-card.success-modal.ref-text'
          ],
          values: {
            giftCard: 'Amazon Gift Card',
            date: Date.now().toString(),
            refId: '12345678910'
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
        this.showCardVendorForm = true;
      }
    };
    this.modalService.openModal(SuccessModalPage, componentPropsSuccess);
  }
}
