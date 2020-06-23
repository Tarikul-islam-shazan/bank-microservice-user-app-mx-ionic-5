import { Component, OnInit } from '@angular/core';
import { DropdownOption } from '@app/signup/models/signup';

@Component({
  selector: 'mbc-invex-payee-registration',
  templateUrl: './invex-payee-registration.page.html',
  styleUrls: ['./invex-payee-registration.page.scss']
})
export class InvexPayeeRegistrationPage implements OnInit {
  alias: string;
  payeeIdentifier: DropdownOption;
  constructor() {}
  ngOnInit() {}

  next() {}
}
