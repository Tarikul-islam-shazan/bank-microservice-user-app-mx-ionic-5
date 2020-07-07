import { Component, OnInit } from '@angular/core';
import { InvexPayeeRegistrationFacade } from '../facade';
import { FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DropdownModalComponent } from '@app/shared';
import { invexPayeeIdentifiers, ContactType } from '@app/p2p/models';

@Component({
  selector: 'mbc-invex-payee-registration',
  templateUrl: './invex-payee-registration.page.html',
  styleUrls: ['./invex-payee-registration.page.scss']
})
export class InvexPayeeRegistrationPage implements OnInit {
  contactForm: FormGroup;
  constructor(
    private facade: InvexPayeeRegistrationFacade,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {}
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      alias: ['', Validators.required],
      identityName: ['', Validators.required],
      identityType: ['', Validators.required],
      identityNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
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

  next() {
    const contact: any = {};
    Object.assign(contact, this.contactForm.value);
    delete contact.identityName;
    this.facade.next(contact);
  }
}
