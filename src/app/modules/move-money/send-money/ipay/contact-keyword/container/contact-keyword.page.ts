import { Component, OnInit } from '@angular/core';
import { ContactKeywordFacade as Facade } from '@app/move-money/send-money/ipay/contact-keyword/facade/facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'contact-keyword',
  templateUrl: './contact-keyword.page.html',
  styleUrls: ['./contact-keyword.page.scss']
})
export class ContactKeywordPage implements OnInit {
  contactKeywordForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public facade: Facade) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.contactKeywordForm = this.formBuilder.group({
      sharedSecret: ['', Validators.required],
      confirmsharedSecret: ['', Validators.required]
    });
  }
}
