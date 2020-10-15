import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { invexPayeeIdentifiers, ContactType } from '@app/p2p/models';
import { EditInvexPayeeRegistrationFacade } from '../facade/edit-invex-payee-registration.facade';
import { DropdownOption } from '@app/signup/models/signup';

@Component({
  selector: 'mbc-edit-invex-payee-registration',
  templateUrl: './edit-invex-payee-registration.page.html',
  styleUrls: ['./edit-invex-payee-registration.page.scss']
})
export class EditInvexPayeeRegistrationPage implements OnInit {
  contactForm: FormGroup;
  contactId: string;
  bankCode: string;
  options: DropdownOption[];
  payee: any;
  editButtonEnable = true;

  constructor(private facade: EditInvexPayeeRegistrationFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      alias: ['', [Validators.required, this.noWhitespaceValidator]],
      identityName: ['', Validators.required],
      identityType: ['', Validators.required],
      identityNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      bank: ['', [Validators.required]],
      email: ['', Validators.email],
      phone: ['', Validators.pattern('[0-9]*')],
      contactType: [ContactType.Invex, Validators.required]
    });
    this.getPayee();
  }

  getPayee() {
    this.payee = window.history.state;
    const data = invexPayeeIdentifiers;
    let payeeIdentityName;
    for (const payeeType of data) {
      if (payeeType.value === this.payee.identityType) {
        payeeIdentityName = payeeType.text;
        this.contactForm.patchValue({
          alias: this.payee.alias,
          identityName: payeeIdentityName,
          identityType: this.payee.identityType,
          identityNumber: this.payee.identityNumber,
          bank: this.payee.contactType,
          email: this.payee.email,
          phone: this.payee.phone,
          contactType: this.payee.contactType
        });
        this.disbleFormFiled();
        return;
      }
    }
  }

  disbleFormFiled() {
    this.contactForm.controls.identityNumber.disable();
    this.contactForm.controls.bank.disable();
    if (this.payee.contactType === ContactType.Domestic) {
      this.contactForm.controls.email.disable();
    }
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
    this.contactForm.value.alias = this.contactForm.value.alias.trim();
    const contact: any = {};
    Object.assign(contact, this.contactForm.value);
    delete contact.identityName;
    contact._id = this.payee._id;
    contact.bankCode = this.payee.bankCode;
    contact.identityNumber = this.payee.identityNumber;
    this.facade.next(contact);
  }
}
