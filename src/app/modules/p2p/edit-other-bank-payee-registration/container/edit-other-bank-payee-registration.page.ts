import { Component, OnInit } from '@angular/core';
import { DropdownOption } from '@app/signup/models/signup';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { otherBankPayeeIdentifiers, IdentityType, IContact, ContactType } from '@app/p2p/models';
import { EditOtherBankPayeeRegistrationFacade } from '../facade';

@Component({
  selector: 'mbc-edit-other-bank-payee-registration',
  templateUrl: './edit-other-bank-payee-registration.page.html',
  styleUrls: ['./edit-other-bank-payee-registration.page.scss']
})
export class EditOtherBankPayeeRegistrationPage implements OnInit {
  identityTypes = IdentityType;
  payeeIdentifier: DropdownOption;
  initialForm: FormGroup;
  companyForm: FormGroup;
  clabeDebitCardForm: FormGroup;
  banks: DropdownOption[] = [];
  selectedBank: DropdownOption;
  mobileForm: FormGroup;
  contactId: string;
  bankCode: string;
  payee: any;
  constructor(private formBuilder: FormBuilder, private facade: EditOtherBankPayeeRegistrationFacade) {}

  ngOnInit() {
    this.initInitialForm();
    this.getPayee();
  }

  getBankList(bankCode) {
    this.facade.getBanks().subscribe(banks => {
      this.banks = banks.bankList;
      for (const bank of this.banks) {
        if (bank.value === bankCode) {
          this.selectedBank = bank;
          this.patchBankNameFormValue();
        }
      }
    });
  }

  getPayee() {
    this.payee = window.history.state;
    this.getBankList(this.payee.bankCode);
    const data = otherBankPayeeIdentifiers;
    this.contactId = this.payee._id;
    for (const payeeType of data) {
      if (payeeType.value === this.payee.identityType) {
        this.payeeIdentifier = payeeType;
        this.initialForm.patchValue({
          alias: this.payee.alias,
          identityTypeName: this.payeeIdentifier.text
        });
        this.initFormByIdentifier();
        return;
      }
    }
  }

  initInitialForm() {
    this.initialForm = this.formBuilder.group({
      alias: ['', [Validators.required]],
      identityTypeName: ['', Validators.required],
      contactType: ContactType.Other
    });
  }

  initCompanyForm() {
    this.companyForm = this.formBuilder.group({
      identityNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      companyName: ['', [Validators.required]],
      bankName: ['', Validators.required],
      email: ['', Validators.email]
    });
  }

  initClabeDebitCardForm() {
    this.clabeDebitCardForm = this.formBuilder.group({
      identityNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      bankName: ['', Validators.required],
      firstName: ['', [Validators.required]],
      secondName: [''],
      paternalLastName: ['', [Validators.required]],
      maternalLastName: [''],
      email: ['', Validators.email],
      phone: ['', Validators.pattern('[0-9]*')],
      rfc: ['']
    });
  }

  initMobileForm() {
    this.mobileForm = this.formBuilder.group({
      identityNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      bankName: ['', Validators.required],
      firstName: ['', [Validators.required]],
      secondName: ['', Validators.pattern('^[A-Za-z][A-Za-z0-9]*$')],
      paternalLastName: ['', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z0-9]*$')]],
      maternalLastName: ['', Validators.pattern('^[A-Za-z][A-Za-z0-9]*$')],
      email: ['', Validators.email],
      rfc: ['']
    });
  }

  initFormByIdentifier() {
    switch (this.payeeIdentifier.value) {
      case IdentityType.Company:
        this.initCompanyForm();
        this.companyForm.patchValue({
          identityNumber: this.payee.identityNumber,
          companyName: this.payee.companyName,
          bankName: this.payee.bankName,
          email: this.payee.email
        });
        this.companyForm.controls.identityNumber.disable();
        this.companyForm.controls.companyName.disable();
        this.companyForm.controls.bankName.disable();
        if (this.payee.contactType === ContactType.Meed) {
          this.companyForm.controls.email.disable();
        }
        break;
      case IdentityType.Clabe:
      case IdentityType.DebitCard:
        this.initClabeDebitCardForm();
        this.clabeDebitCardForm.patchValue({
          identityNumber: this.payee.identityNumber,
          bankName: this.payee.bankName,
          firstName: this.payee.firstName,
          secondName: this.payee.secondName,
          paternalLastName: this.payee.paternalLastName,
          maternalLastName: this.payee.maternalLastName,
          email: this.payee.email,
          phone: this.payee.phone,
          rfc: this.payee.rfc
        });
        this.clabeDebitCardForm.controls.identityNumber.disable();
        this.clabeDebitCardForm.controls.bankName.disable();
        this.clabeDebitCardForm.controls.firstName.disable();
        this.clabeDebitCardForm.controls.secondName.disable();
        this.clabeDebitCardForm.controls.paternalLastName.disable();
        this.clabeDebitCardForm.controls.maternalLastName.disable();
        if (this.payee.contactType === ContactType.Meed) {
          this.clabeDebitCardForm.controls.email.disable();
        }
        break;
      case IdentityType.Mobile:
        this.initMobileForm();
        this.mobileForm.patchValue({
          identityNumber: this.payee.identityNumber,
          bankName: this.payee.bankName,
          firstName: this.payee.firstName,
          secondName: this.payee.secondName,
          paternalLastName: this.payee.paternalLastName,
          maternalLastName: this.payee.maternalLastName,
          email: this.payee.email,
          rfc: this.payee.rfc
        });
        this.mobileForm.controls.identityNumber.disable();
        this.mobileForm.controls.bankName.disable();
        this.mobileForm.controls.firstName.disable();
        this.mobileForm.controls.secondName.disable();
        this.mobileForm.controls.paternalLastName.disable();
        this.mobileForm.controls.maternalLastName.disable();
        if (this.payee.contactType === ContactType.Meed) {
          this.mobileForm.controls.email.disable();
        }
        break;
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
        this.companyForm.value.companyName = this.payee.companyName.trim();
        Object.assign(contact, this.companyForm.value);
        break;
      case IdentityType.Clabe:
      case IdentityType.DebitCard:
        this.clabeDebitCardForm.value.identityNumber = this.payee.identityNumber;
        this.clabeDebitCardForm.value.firstName = this.payee.firstName.trim();
        this.clabeDebitCardForm.value.secondName = this.payee.secondName.trim();
        this.clabeDebitCardForm.value.paternalLastName = this.payee.paternalLastName.trim();
        this.clabeDebitCardForm.value.maternalLastName = this.payee.maternalLastName.trim();
        Object.assign(contact, this.clabeDebitCardForm.value);
        break;
      case IdentityType.Mobile:
        this.mobileForm.value.identityNumber = this.payee.identityNumber;
        this.mobileForm.value.firstName = this.payee.firstName.trim();
        this.mobileForm.value.secondName = this.payee.secondName.trim();
        this.mobileForm.value.paternalLastName = this.payee.paternalLastName.trim();
        this.mobileForm.value.maternalLastName = this.payee.maternalLastName.trim();
        Object.assign(contact, this.mobileForm.value);
        break;
    }
    delete contact.bankName;

    return contact;
  }

  next() {
    const contact: IContact = this.createOtherContactObject();
    contact._id = this.contactId;
    this.facade.next(contact);
  }
}
