import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownOption } from '@app/core';
import { IBiller } from '@app/core/models/dto/member';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';
import { IinputOption, InputFormatType } from '@app/shared';
import { GiftCardFacade } from '../facade/gift-card.facade';

@Component({
  selector: 'mbc-gift-card',
  templateUrl: './gift-card.page.html',
  styleUrls: ['./gift-card.page.scss']
})
export class GiftCardPage implements OnInit {
  emailFormatMask: IinputOption;
  phoneNumberInput: IinputOption;
  phoneNumberLength = 10;
  buyGiftCardForm: FormGroup;
  isNextPage = false;
  constructor(public facade: GiftCardFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.facade.updatedAccountSummary();
    this.facade.searchGiftCardVendorsInit();
    this.emailFormatMask = {
      type: InputFormatType.EMAIL_ADDRESS_FORMAT
    };
    this.phoneNumberInput = {
      type: InputFormatType.ONLY_NUMBER,
      maxLength: this.phoneNumberLength
    };
    this.buyGiftCardForm = this.formBuilder.group({
      vendorName: [''],
      biller: [0, Validators.required],
      email: [
        '',
        [
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(50),
            Validators.pattern(REG_EX_PATTERNS.EMAIL)
          ])
        ]
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      amountText: [''],
      amount: [0]
    });
  }
  ionViewWillEnter() {
    this.togglePage(false);
  }
  searchVendors(value): void {
    this.facade.isGiftCardVendorSeleted = false;
    if (value) {
      this.facade.searchVendors$.next(value);
    } else {
      this.facade.searching = false;
      this.facade.billers = [];
    }
  }

  selectGiftCardVendor(giftCardVendor: IBiller): void {
    this.facade.updateGiftCardVendorSelection(giftCardVendor);
    this.buyGiftCardForm.patchValue({ biller: giftCardVendor.id, vendorName: giftCardVendor.name });
  }

  getAmountCssClass(): string {
    return this.buyGiftCardForm.value.amount ? 'amount' : 'white-input';
  }

  openAmountOptionsModal(): void {
    this.facade.openAvailableAmountsModal(data => {
      this.buyGiftCardForm.patchValue({ amountText: data.text, amount: data.value });
    });
  }

  gotoNext(): void {
    this.togglePage(true);
  }
  processGiftCardSend(): void {
    const { biller, amount, email, phoneNumber } = this.buyGiftCardForm.getRawValue();
    this.facade.buyGiftCard({ biller, amount, email, phoneNumber });
  }

  cancelGiftCardSend(): void {
    this.togglePage(false);
  }

  togglePage(isNextPage: boolean): void {
    this.isNextPage = isNextPage;
    if (this.isNextPage) {
      this.buyGiftCardForm.get('vendorName').disable();
      this.buyGiftCardForm.get('email').disable();
      this.buyGiftCardForm.get('phoneNumber').disable();
    } else {
      this.facade.billers = [];
      this.facade.updateGiftCardVendorSelection(null);
      this.buyGiftCardForm.enable();
      this.buyGiftCardForm.reset();
    }
  }
}
