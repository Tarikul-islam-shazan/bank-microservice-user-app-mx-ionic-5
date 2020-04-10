import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactModifyFacade as Facade } from '@app/move-money/send-money/contact-modify/facade/facade';
@Component({
  selector: 'contact-modify-page',
  templateUrl: './contact-modify.page.html',
  styleUrls: ['./contact-modify.page.scss']
})
export class ContactModifyPage implements OnInit {
  contactModifyForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public facade: Facade) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.contactModifyForm = this.formBuilder.group({
      email: [this.facade.email, Validators.required]
    });
  }
}
