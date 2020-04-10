import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger, PAGES, RegistrationFeeRequest, RegistrationFeePaymentType } from '@app/core';
import { PaystandService } from '@app/deposit/paystand/services';
import { DepositMoneyPayStandFacade } from '../facade';
const log = new Logger('PaystandPage');

/**
 * Issue: GMA-4333
 * Details:  Added paystand disclaimer text
 * Date: February 24, 2020
 * Developer: Raihan <raihanuzzaman@bs-23.net>
 */

@Component({
  selector: 'app-paystand',
  templateUrl: './paystand.page.html',
  styleUrls: ['./paystand.page.scss']
})
export class PaystandPage implements OnInit {
  moveMoneyOption: any;
  registrationFeeRequest: RegistrationFeeRequest;
  viewport: any = null;
  navBarTitle: string;
  constructor(private paystandService: PaystandService, private facade: DepositMoneyPayStandFacade) {}

  ngOnInit() {
    this.getRegistrationFeeRequest();
    this.getRegistrationFeePaymentType();
  }

  getRegistrationFeePaymentType() {
    this.navBarTitle =
      this.facade.getRegistrationFeePaymentType() === RegistrationFeePaymentType.DEBITCARD
        ? 'deposit.paystand-page.credit-title'
        : 'deposit.paystand-page.echeck-title';
  }

  getRegistrationFeeRequest() {
    this.registrationFeeRequest = this.facade.getRegistrationFeeRequest();
    this.paystandService.viewFunds =
      this.registrationFeeRequest.paymentMethod === RegistrationFeePaymentType.DEBITCARD ? 'card' : 'echeck';
  }

  ionViewDidEnter() {
    this.facade.initPayStandService();
  }

  ionViewDidLeave() {
    this.facade.payStandViewportReset();
  }
}
