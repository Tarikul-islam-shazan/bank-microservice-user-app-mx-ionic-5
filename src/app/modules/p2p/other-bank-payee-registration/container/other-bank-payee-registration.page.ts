import { Component, OnInit } from '@angular/core';
import { DropdownOption } from '@app/signup/models/signup';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DropdownModalComponent } from '@app/shared';
import { ModalController } from '@ionic/angular';
import { otherBankPayeeIdentifiers, IdentityType, IContact, ContactType } from '@app/p2p/models';
import { OtherBankPayeeRegistrationFacade } from '../facade';

@Component({
  selector: 'mbc-other-bank-payee-registration',
  templateUrl: './other-bank-payee-registration.page.html',
  styleUrls: ['./other-bank-payee-registration.page.scss']
})
export class OtherBankPayeeRegistrationPage implements OnInit {
  identityTypes = IdentityType;
  payeeIdentifier: DropdownOption;
  initialForm: FormGroup;
  companyForm: FormGroup;
  clabeDebitCardForm: FormGroup;
  banks: DropdownOption[] = [];
  selectedBank: DropdownOption;
  mobileForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private facade: OtherBankPayeeRegistrationFacade
  ) {}

  ngOnInit() {
    this.initInitialForm();
    this.getBankList();
  }

  getBankList() {
    this.facade.getBanks().subscribe(banks => {
      this.banks = banks.bankList;
    });
  }

  initInitialForm() {
    this.initialForm = this.formBuilder.group({
      alias: ['', [Validators.required, this.noWhitespaceValidator]],
      identityTypeName: ['', Validators.required],
      contactType: ContactType.Other
    });
  }

  initCompanyForm() {
    this.companyForm = this.formBuilder.group({
      identityNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      companyName: ['', [Validators.required, this.noWhitespaceValidator]],
      bankName: ['', Validators.required],
      email: ['', Validators.email]
    });
  }

  initClabeDebitCardForm() {
    this.clabeDebitCardForm = this.formBuilder.group({
      identityNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      bankName: ['', Validators.required],
      firstName: ['', [Validators.required, this.noWhitespaceValidator]],
      secondName: ['', this.noWhitespaceValidator],
      paternalLastName: ['', [Validators.required, this.noWhitespaceValidator]],
      maternalLastName: ['', this.noWhitespaceValidator],
      email: ['', Validators.email],
      phone: ['', Validators.pattern('[0-9]*')],
      rfc: ['']
    });
  }

  initMobileForm() {
    this.mobileForm = this.formBuilder.group({
      identityNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      bankName: ['', Validators.required],
      firstName: ['', [Validators.required, this.noWhitespaceValidator]],
      secondName: ['', this.noWhitespaceValidator],
      paternalLastName: ['', [Validators.required, this.noWhitespaceValidator]],
      maternalLastName: ['', this.noWhitespaceValidator],
      email: ['', Validators.email],
      rfc: ['']
    });
  }

  initFormByIdentifier() {
    switch (this.payeeIdentifier.value) {
      case IdentityType.Company:
        this.initCompanyForm();
        break;
      case IdentityType.Clabe:
      case IdentityType.DebitCard:
        this.initClabeDebitCardForm();
        break;
      case IdentityType.Mobile:
        this.initMobileForm();
        break;
    }
  }

  async openIdentifierModal(): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: DropdownModalComponent,
      componentProps: { data: otherBankPayeeIdentifiers }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.payeeIdentifier = data;
      this.initialForm.controls.identityTypeName.patchValue(this.payeeIdentifier.text);
      this.initFormByIdentifier();
    }
  }

  async openBankListModal(): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: DropdownModalComponent,
      componentProps: { data: this.banks }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.selectedBank = data;
      this.patchBankNameFormValue();
    }
  }

  patchBankNameFormValue() {
    switch (this.payeeIdentifier.value) {
      case IdentityType.Company:
        this.companyForm.controls.bankName.patchValue(this.selectedBank.text);
        break;
      case IdentityType.Clabe:
      case IdentityType.DebitCard:
        this.clabeDebitCardForm.controls.bankName.patchValue(this.selectedBank.text);
        break;
      case IdentityType.Mobile:
        this.mobileForm.controls.bankName.patchValue(this.selectedBank.text);
        break;
    }
  }

  checkButtonDisable() {
    if (this.payeeIdentifier) {
      switch (this.payeeIdentifier.value) {
        case IdentityType.Company:
          return this.companyForm.invalid;
        case IdentityType.Clabe:
        case IdentityType.DebitCard:
          return this.clabeDebitCardForm.invalid;
        case IdentityType.Mobile:
          return this.mobileForm.invalid;
      }
    } else {
      return true;
    }
  }

  createOtherContactObject(): IContact {
    const contact: any = {
      alias: this.initialForm.value.alias.trim(),
      contactType: ContactType.Other,
      identityType: this.payeeIdentifier.value,
      bankCode: this.selectedBank.value
    };
    switch (this.payeeIdentifier.value) {
      case IdentityType.Company:
        this.companyForm.value.companyName = this.companyForm.value.companyName.trim();
        Object.assign(contact, this.companyForm.value);
        break;
      case IdentityType.Clabe:
      case IdentityType.DebitCard:
        this.clabeDebitCardForm.value.firstName = this.clabeDebitCardForm.value.firstName.trim();
        this.clabeDebitCardForm.value.secondName = this.clabeDebitCardForm.value.secondName.trim();
        this.clabeDebitCardForm.value.paternalLastName = this.clabeDebitCardForm.value.paternalLastName.trim();
        this.clabeDebitCardForm.value.maternalLastName = this.clabeDebitCardForm.value.maternalLastName.trim();
        Object.assign(contact, this.clabeDebitCardForm.value);
        break;
      case IdentityType.Mobile:
        this.mobileForm.value.firstName = this.mobileForm.value.firstName.trim();
        this.mobileForm.value.secondName = this.mobileForm.value.secondName.trim();
        this.mobileForm.value.paternalLastName = this.mobileForm.value.paternalLastName.trim();
        this.mobileForm.value.maternalLastName = this.mobileForm.value.maternalLastName.trim();
        Object.assign(contact, this.mobileForm.value);
        break;
    }
    delete contact.bankName;

    return contact;
  }

  noWhitespaceValidator(control: FormControl) {
    if (control.value) {
      const isWhitespace = control.value.trim().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { whitespace: true };
    } else {
      return null;
    }
  }

  next() {
    const contact: IContact = this.createOtherContactObject();
    this.facade.next(contact);
  }
}
