import { Component } from '@angular/core';
import { SendGiftCardFacade } from '../facade/send-gift-card.facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IinputOption, InputFormatType } from '@app/shared/directives/mask-input.directive';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';
import { IMeedModalContent, ModalService } from '@app/shared/services/modal.service';
import { DropdownModalComponent } from '@app/shared/components/dropdown-modal';

@Component({
  selector: 'mbc-send-gift-card',
  templateUrl: './send-gift-card.page.html',
  styleUrls: ['./send-gift-card.page.scss']
})
export class SendGiftCardPage {
  giftCardForm: FormGroup;
  regExPattern = null;
  emailFormatMask: IinputOption;

  constructor(private formBuilder: FormBuilder, public facade: SendGiftCardFacade, private modalService: ModalService) {
    this.regExPattern = REG_EX_PATTERNS;
    this.giftCardForm = this.formBuilder.group({
      provider: ['', [Validators.required]],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(this.regExPattern.EMAIL)
        ])
      ],
      amount: ['']
    });

    this.emailFormatMask = {
      type: InputFormatType.EMAIL_ADDRESS_FORMAT
    };
  }

  selectGiftCardVendor(giftCardVendor) {
    this.giftCardForm.controls.provider.setValue(giftCardVendor.name);
    this.facade.allGiftCardVendors = [];
  }

  giftCardAmountSelectionModal(): void {
    const componentProps: IMeedModalContent = {
      data: this.facade.giftCardAmounts,
      onDidDismiss: (res: any) => {
        const { data } = res;
        if (data) {
          this.giftCardForm.controls.amount.setValue(data.text);
        }
      }
    };
    this.modalService.openModal(DropdownModalComponent, componentProps);
  }

  enableBuyGiftCard(): boolean {
    return this.giftCardForm.controls.amount.value !== '';
  }
}
