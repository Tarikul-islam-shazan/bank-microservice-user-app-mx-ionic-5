import { Component, OnInit } from '@angular/core';
import { ContactInfoFacade as Facade } from '@app/move-money/send-money/ipay/contact-info/facade/facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'contact-info',
  templateUrl: './contact-info.page.html',
  styleUrls: ['./contact-info.page.scss']
})
export class ContactInfoPage implements OnInit {
  contactInfoForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public facade: Facade) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.contactInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [null],
      phone: ['', Validators.required],
      email: [this.facade.email, Validators.required],
      sendInvitation: [false],
      name: ['']
    });
  }
  continue(): void {
    this.contactInfoForm.controls.name.patchValue(
      `${this.contactInfoForm.controls.firstName.value} ${this.contactInfoForm.controls.lastName.value}`
    );
    const { firstName: nickName, name, phone, email } = this.contactInfoForm.value;
    this.facade.continue({ nickName, name, phone, email });
  }
}
