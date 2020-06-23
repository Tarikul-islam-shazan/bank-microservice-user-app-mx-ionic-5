import { Component, OnInit } from '@angular/core';
import { ContactType } from '@app/p2p/models';
import { Router } from '@angular/router';

@Component({
  selector: 'mbc-payee-registration-type',
  templateUrl: './payee-registration-type.page.html',
  styleUrls: ['./payee-registration-type.page.scss']
})
export class PayeeRegistrationTypePage implements OnInit {
  payeeType = 'meed';
  payeeTypes = ContactType;
  constructor(private router: Router) {}

  ngOnInit() {}

  continue() {
    switch (this.payeeType) {
      case this.payeeTypes.Meed:
        break;
      case this.payeeTypes.Invex:
        this.router.navigateByUrl('/p2p/invex-payee-registration');
        break;
      case this.payeeTypes.Other:
        this.router.navigateByUrl('/p2p/other-bank-payee-registration');
        break;
    }
  }
}
