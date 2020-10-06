import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, PatternValidator, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DropdownModalComponent } from '@app/shared';
import { invexPayeeIdentifiers, ContactType } from '@app/p2p/models';
import { EditInvexPayeeRegistrationFacade } from '../facade/edit-invex-payee-registration.facade';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private facade: EditInvexPayeeRegistrationFacade,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.initForm();
    this.getPayee();
  }

  getPayee() {
    this.route.paramMap.subscribe(params => {
      const data = invexPayeeIdentifiers;
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
          return;
        }
      }
    });
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
  }

  async openIdentifierModal(): Promise<any> {
    const modal = await this.modalCtrl.create({
      component: DropdownModalComponent,
      componentProps: { data: invexPayeeIdentifiers }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.contactForm.controls.identityName.patchValue(data.text);
      this.contactForm.controls.identityType.patchValue(data.value);
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
    contact._id = this.contactId;
    contact.bankCode = this.bankCode;
    this.facade.next(contact);
  }
}
