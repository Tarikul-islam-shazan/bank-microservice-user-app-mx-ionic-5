import { Component, OnDestroy } from '@angular/core';
import { SendGiftCardFacade } from '../facade/send-gift-card.facade';
import { IinputOption, InputFormatType } from '@app/shared/directives/mask-input.directive';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';
import { IMeedModalContent, ModalService } from '@app/shared/services/modal.service';
import { DropdownModalComponent } from '@app/shared/components/dropdown-modal';
import { IBiller } from '@app/core';

@Component({
  selector: 'mbc-send-gift-card',
  templateUrl: './send-gift-card.page.html',
  styleUrls: ['./send-gift-card.page.scss']
})
export class SendGiftCardPage implements OnDestroy {
  regExPattern = null;
  emailFormatMask: IinputOption;
  giftCardVendorName = '';

  constructor(public facade: SendGiftCardFacade, private modalService: ModalService) {
    this.regExPattern = REG_EX_PATTERNS;
    this.emailFormatMask = {
      type: InputFormatType.EMAIL_ADDRESS_FORMAT
    };
  }

  giftCardAmountSelectionModal(): void {
    const componentProps: IMeedModalContent = {
      data: this.facade.giftCardAmounts,
      onDidDismiss: (res: any) => {
        const { data } = res;
        if (data) {
          this.facade.amountText = data.text;
          this.facade.amount = data.value;
        }
      }
    };
    this.modalService.openModal(DropdownModalComponent, componentProps);
  }

  ngOnDestroy() {
    this.facade.resetData();
  }
}
