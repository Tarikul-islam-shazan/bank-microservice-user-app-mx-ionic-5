import { Component, OnInit } from '@angular/core';
import { ContactType } from '@app/p2p/models';
import { PayeeRegistrationTypeFacade } from '../facade';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mbc-payee-registration-type',
  templateUrl: './payee-registration-type.page.html',
  styleUrls: ['./payee-registration-type.page.scss']
})
export class PayeeRegistrationTypePage implements OnInit {
  payeeTo: string;
  payeeType: string;
  payeeTypes = ContactType;
  isMeedMember = false;
  constructor(private route: ActivatedRoute, private facade: PayeeRegistrationTypeFacade) {}

  ngOnInit() {
    this.getPayeeTo();
  }

  getPayeeTo() {
    this.route.paramMap.subscribe(params => {
      this.payeeTo = params.get('to');
      const isEmail = this.facade.isEmail(this.payeeTo);
      if (isEmail) {
        this.facade.verifyMeedMember(this.payeeTo).subscribe(resp => {
          if (resp.length > 0) {
            this.isMeedMember = true;
            this.payeeType = ContactType.Meed;
          }
        });
      }
    });
  }

  continue() {
    this.facade.continue({ payeeTo: this.payeeTo, payeeType: this.payeeType });
  }
}
