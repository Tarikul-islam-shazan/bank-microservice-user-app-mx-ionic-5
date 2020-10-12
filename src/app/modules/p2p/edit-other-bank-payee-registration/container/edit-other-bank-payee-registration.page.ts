import { Component, OnInit } from '@angular/core';
import { DropdownOption } from '@app/signup/models/signup';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DropdownModalComponent } from '@app/shared';
import { ModalController } from '@ionic/angular';
import { otherBankPayeeIdentifiers, IdentityType, IContact, ContactType } from '@app/p2p/models';
import { EditOtherBankPayeeRegistrationFacade } from '../facade';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  routingParam: ParamMap;
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private facade: EditOtherBankPayeeRegistrationFacade,
    private route: ActivatedRoute
  ) {}

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
    this.route.paramMap.subscribe(params => {
      this.routingParam = params;
      this.getBankList(params.get('bankCode'));
      const data = otherBankPayeeIdentifiers;
      this.contactId = params.get('_id');
      for (const payeeType of data) {
        if (payeeType.value === params.get('identityType')) {
          this.payeeIdentifier = payeeType;
          this.initialForm.patchValue({
            alias: params.get('alias'),
            identityTypeName: this.payeeIdentifier.text
          });
          this.initFormByIdentifier(this.routingParam);
          return;
        }
      }
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

  initFormByIdentifier(params) {
    switch (this.payeeIdentifier.value) {
      case IdentityType.Company:
        this.initCompanyForm();
        this.companyForm.patchValue({
          identityNumber: params.get('identityNumber'),
          companyName: params.get('companyName'),
          bankName: params.get('bankName'),
          email: params.get('email')
        });
        this.companyForm.controls.identityNumber.disable();
        this.companyForm.controls.companyName.disable();
        this.companyForm.controls.bankName.disable();
        break;
      case IdentityType.Clabe:
      case IdentityType.DebitCard:
        this.initClabeDebitCardForm();
        this.clabeDebitCardForm.patchValue({
          identityNumber: params.get('identityNumber'),
          bankName: params.get('bankName'),
          firstName: params.get('firstName'),
          secondName: params.get('secondName'),
          paternalLastName: params.get('paternalLastName'),
          maternalLastName: params.get('maternalLastName'),
          email: params.get('email'),
          phone: params.get('phone'),
          rfc: params.get('rfc')
        });
        this.companyForm.controls.identityNumber.disable();
        this.companyForm.controls.bankName.disable();
        this.companyForm.controls.firstName.disable();
        this.companyForm.controls.secondName.disable();
        this.companyForm.controls.paternalLastName.disable();
        this.companyForm.controls.maternalLastName.disable();
        break;
      case IdentityType.Mobile:
        this.initMobileForm();
        this.mobileForm.patchValue({
          identityNumber: params.get('identityNumber'),
          bankName: params.get('bankName'),
          firstName: params.get('firstName'),
          secondName: params.get('secondName'),
          paternalLastName: params.get('paternalLastName'),
          maternalLastName: params.get('maternalLastName'),
          email: params.get('email'),
          rfc: params.get('rfc')
        });
        this.mobileForm.controls.identityNumber.disable();
        this.mobileForm.controls.bankName.disable();
        this.mobileForm.controls.firstName.disable();
        this.mobileForm.controls.secondName.disable();
        this.mobileForm.controls.paternalLastName.disable();
        this.mobileForm.controls.maternalLastName.disable();
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
        this.companyForm.value.companyName = this.routingParam.get('companyName').trim();
        Object.assign(contact, this.companyForm.value);
        break;
      case IdentityType.Clabe:
      case IdentityType.DebitCard:
        this.clabeDebitCardForm.value.identityNumber = this.routingParam.get('identityNumber');
        this.clabeDebitCardForm.value.firstName = this.routingParam.get('firstName').trim();
        this.clabeDebitCardForm.value.secondName = this.routingParam.get('secondName').trim();
        this.clabeDebitCardForm.value.paternalLastName = this.routingParam.get('paternalLastName').trim();
        this.clabeDebitCardForm.value.maternalLastName = this.routingParam.get('maternalLastName').trim();
        Object.assign(contact, this.clabeDebitCardForm.value);
        break;
      case IdentityType.Mobile:
        this.mobileForm.value.identityNumber = this.routingParam.get('identityNumber');
        this.mobileForm.value.firstName = this.routingParam.get('firstName').trim();
        this.mobileForm.value.secondName = this.routingParam.get('secondName').trim();
        this.mobileForm.value.paternalLastName = this.routingParam.get('paternalLastName').trim();
        this.mobileForm.value.maternalLastName = this.routingParam.get('maternalLastName').trim();
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
    contact._id = this.contactId;
    this.facade.next(contact);
  }
}
