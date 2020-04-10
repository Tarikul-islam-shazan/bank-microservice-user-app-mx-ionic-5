/**
 * * Issue: GMA-4474
 * * Issue Details: Add Payee: Need to implement confirmation screen
 * * Developer Feedback: Feature implemented
 * Date: February  26, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */
import { BillPaymentType, IBillPayee, IStates, BillPaymentDeliveryInterval } from '@app/core';
import { CountryStateModalComponent, IMeedModalContent, ModalService, SuccessModalPage } from '@app/shared';
import { CustomerService } from '@app/core/services/customer-service.service';
import { Injectable } from '@angular/core';
import { MemberService } from '@app/core/services/member.service';
import { noop, Observable, Subscription } from 'rxjs';
import { OtpVerificationModalPage } from '@app/shared/components/otp-verification-modal/container';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { Router } from '@angular/router';

@Injectable()
export class AddPayeeAddressFacade {
  billPayee: IBillPayee;
  otpCodeSubscription: Subscription;

  countryStates: IStates[];
  selectedCountryState: IStates;

  constructor(
    private customerService: CustomerService,
    private memberService: MemberService,
    private modalService: ModalService,
    private payBillService: PayBillService,
    private router: Router
  ) {}

  /**
   * @summary gets country states from customer service.
   *
   * @returns {Observable<IStates[]>}
   * @memberOf AddPayeeAddressFacade
   */
  getCountryState(): Observable<IStates[]> {
    return this.customerService.getCountryState(this.memberService.member.country);
  }

  /**
   * @sumamry sends otp
   *
   * @param {IBillPayee} billPayee
   * @returns {Observable<IBillPayee>}
   * @memberOf AddPayeeAddressFacade
   */
  sendOtp(billPayee: IBillPayee): Observable<IBillPayee> {
    Object.assign(this.payBillService.billPayee, billPayee);
    return this.payBillService.addPayee();
  }

  /**
   * Issue:  GMA-4417
   * Details: this method sets bill payee object from the given payee param.
   * and then navigates to the bill payment page.
   * Date: February 24, 2020
   * Developer: Baten <md.abdul@brainstation23.com>
   */
  navigateToPage(pageToRoute: string): void {
    this.router.navigate([pageToRoute]);
  }

  /**
   * @summary opens success modal
   *
   * @param {IBillPayee} payeeInfo
   * @returns {void}
   * @memberOf AddPayeeAddressFacade
   */
  openSuccessModal(payeeInfo: IBillPayee): void {
    this.modalService.openModal(SuccessModalPage, this.getAddPayeeSuccessModalCompProps(payeeInfo));
  }

  /**
   * Issue:  GMA-4417
   * Details: this method returns component props that will be used inside the confirmation modal.
   * Date: February 24, 2020
   * Developer: Baten <md.abdul@brainstation23.com>
   *
   *
   * @summary gets component props for payee added success modal
   *
   * @private
   * @param {IBillPayee} billPayee
   * @returns {IMeedModalContent}
   * @memberOf AddPayeeAddressFacade
   */
  private getAddPayeeSuccessModalCompProps(billPayee: IBillPayee): IMeedModalContent {
    const addPayeeDeliveryInterval: BillPaymentDeliveryInterval =
      billPayee.paymentMethodType === BillPaymentType.Electronic
        ? BillPaymentDeliveryInterval.Electronic
        : BillPaymentDeliveryInterval.Check;
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'move-money-module.pay-bills.add-payee.modal.content',
          values: { addPayeeDeliveryInterval }
        }
      ],
      actionButtons: [
        {
          text: 'move-money-module.pay-bills.add-payee.modal.payment-button',
          cssClass: 'grey-outline-button',
          handler: () => {
            this.payBillService.billPayee = billPayee;
            this.modalService.close();
            this.navigateToPage('/move-money/pay-bills/bill-payment');
          }
        },
        {
          text: 'move-money-module.pay-bills.add-payee.modal.done-button',
          cssClass: 'white-button',
          handler: () => {
            this.modalService.close();
            this.navigateToPage('/move-money/pay-bills/bill-pay');
          }
        }
      ]
    };

    return componentProps;
  }

  /**
   * @summary gets states
   *
   * @returns {void}
   * @memberOf AddPayeeAddressPage
   */
  getCountryStates(): void {
    this.getCountryState().subscribe((countryStates: IStates[]) => {
      this.countryStates = countryStates;
    });
  }

  /**
   * @summary removes selected state form country states.
   *
   * @private
   * @returns {void}
   * @memberOf AddPayeeAddressPage
   */
  private removeSelectedState(): void {
    this.countryStates = this.countryStates.filter(state => {
      return state.stateAbv !== this.selectedCountryState.stateAbv;
    });
  }

  /**
   * @sumamry opens state modal.
   *
   * @param {() => void} callback
   * @returns {void}
   * @memberOf AddPayeeAddressFacade
   */
  openStateModal(callback: () => void): void {
    if (this.selectedCountryState) {
      this.countryStates.unshift(this.selectedCountryState);
    }

    this.modalService.openModal(
      CountryStateModalComponent,
      {
        data: this.countryStates
      },
      (resp: any) => {
        const { data } = resp;
        if (data) {
          this.selectedCountryState = data;
          this.removeSelectedState();
          callback();
        }
      }
    );
  }

  /**
   * @summary opens otp modal after sending otp.
   * if otp matches opens success modal.
   *
   * @param {IBillPayee} _formValue
   * @returns {void}
   * @memberOf AddPayeeAddressFacade
   */
  continue(_formValue: IBillPayee): void {
    const billPayee: IBillPayee = _formValue;
    billPayee.state = this.selectedCountryState.stateAbv;
    this.sendOtp(billPayee).subscribe(noop, (err: any) => {
      if (err.status === 403) {
        this.modalService.openModal(OtpVerificationModalPage, {}, (dismissResp: any) => {
          const { data } = dismissResp;
          if (data) {
            /**
             * Issue:  GMA-4417
             * Details: opens confirmation modal after popping nav controller.
             * Date: February 24, 2020
             * Developer: Baten <md.abdul@brainstation23.com>
             */
            this.openSuccessModal(data);
          }
        });
      }
    });
  }
}
