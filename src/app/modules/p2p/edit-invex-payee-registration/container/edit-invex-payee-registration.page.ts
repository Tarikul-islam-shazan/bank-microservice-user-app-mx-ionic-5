import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { invexPayeeIdentifiers, ContactType } from '@app/p2p/models';
import { EditInvexPayeeRegistrationFacade } from '../facade/edit-invex-payee-registration.facade';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  routingParam: ParamMap;
  editButtonEnable = true;

  constructor(
    private facade: EditInvexPayeeRegistrationFacade,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

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
    this.route.paramMap.subscribe(params => {
      const data = invexPayeeIdentifiers;
      this.routingParam = params;
      this.contactId = params.get('_id');
      this.bankCode = params.get('bankCode');
      let payeeIdentityName;
      for (const payeeType of data) {
        if (payeeType.value === params.get('identityType')) {
          payeeIdentityName = payeeType.text;
          this.contactForm.patchValue({
            alias: params.get('alias'),
            identityName: payeeIdentityName,
            identityType: params.get('identityType'),
            identityNumber: params.get('identityNumber'),
            bank: params.get('contactType'),
            email: params.get('email'),
            phone: params.get('phone'),
            contactType: params.get('contactType')
          });
          this.disbleFormFiled();
          return;
        }
      }
    });
  }

  disbleFormFiled() {
    this.contactForm.controls.identityNumber.disable();
    this.contactForm.controls.bank.disable();
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
    contact._id = this.routingParam.get('_id');
    contact.bankCode = this.routingParam.get('bankCode');
    contact.identityNumber = this.routingParam.get('identityNumber');
    this.facade.next(contact);
  }
}
