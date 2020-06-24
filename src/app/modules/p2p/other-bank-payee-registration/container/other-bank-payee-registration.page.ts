import { Component, OnInit } from '@angular/core';
import { DropdownOption } from '@app/signup/models/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownModalComponent } from '@app/shared';
import { ModalController } from '@ionic/angular';
import { otherBankPayeeIdentifiers, IdentityType, IOtherContact, ContactType } from '@app/p2p/models';
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
      alias: ['', Validators.required],
      identityTypeName: ['', Validators.required],
      contactType: 'other'
    });
  }

  initCompanyForm() {
    this.companyForm = this.formBuilder.group({
      identityNumber: ['', Validators.required],
      companyName: ['', Validators.required],
      bankName: ['', Validators.required],
      email: ['']
    });
  }

  initClabeDebitCardForm() {
    this.clabeDebitCardForm = this.formBuilder.group({
      identityNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: [''],
      paternalLastName: ['', Validators.required],
      maternalLastName: [''],
      email: [''],
      phone: [''],
      rfc: ['']
    });
  }

  initMobileForm() {
    this.mobileForm = this.formBuilder.group({
      identityNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      firstName: ['', Validators.required],
      secondName: [''],
      paternalLastName: ['', Validators.required],
      maternalLastName: [''],
      email: [''],
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

  createOtherContactObject(): IOtherContact {
    const contact: any = {
      alias: this.initialForm.value.alias,
      contactType: ContactType.Other,
      identityType: this.payeeIdentifier.value,
      bankCode: this.selectedBank.value
    };
    switch (this.payeeIdentifier.value) {
      case IdentityType.Company:
        Object.assign(contact, this.companyForm.value);
        break;
      case IdentityType.Clabe:
      case IdentityType.DebitCard:
        Object.assign(contact, this.clabeDebitCardForm.value);
        break;
      case IdentityType.Mobile:
        Object.assign(contact, this.mobileForm.value);
        break;
    }
    delete contact.bankName;

    return contact;
  }

  next() {
    const contact: IOtherContact = this.createOtherContactObject();
    this.facade.next(contact);
  }
}
