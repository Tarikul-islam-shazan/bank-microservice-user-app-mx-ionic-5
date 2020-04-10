import { CustomerService } from '@app/core/services/customer-service.service';
import { ICustomer, MemberService } from '@app/core';
import { Injectable } from '@angular/core';
import { ModalService } from '@app/shared';
import { noop, Observable, Subscription } from 'rxjs';
import { PersonalDetailsState } from '@app/more/personal-details/facade/personal-details.state';

@Injectable()
export class ChangePhoneFacade {
  customer: ICustomer = {};

  constructor(
    private customerService: CustomerService,
    private memberService: MemberService,
    private modalService: ModalService,
    private personalDetailsState: PersonalDetailsState
  ) {
    this.getCustomer();
  }

  /**
   * @summary gets customer information
   *
   * @private
   * @returns {Subscription}
   * @memberOf ChangePhoneFacade
   */
  private getCustomer(): Subscription {
    return this.personalDetailsState.customer$.subscribe((customer: ICustomer) => {
      this.customer = customer;
    });
  }

  /**
   * @summary closes the modal
   *
   * @returns {void}
   * @memberOf ChangePhoneFacade
   */
  dismissModal(): void {
    this.modalService.close();
  }

  /**
   * @summary sends OTP
   *
   * @param {ICustomer} customer
   * @returns {Observable<ICustomer>}
   * @memberOf ChangePhoneFacade
   */
  sendOTP(customer: ICustomer): Observable<ICustomer> {
    return this.customerService.updatePhone(customer);
  }

  /**
   * * Open OTP modal With new OTP service
   * @memberof ChangePhonePage
   * @function openOtpModal
   */
  openOtpModal(): void {
    this.modalService.openOtpModal((dismissResp: any) => {
      const { data } = dismissResp;
      if (data) {
        Object.assign(this.customer, data);
        Object.assign(this.memberService.member, data);
        this.dismissModal();
      }
    });
  }

  /**
   * @sumamry opens OTP modal
   *
   * @param {ICustomer} formValue
   * @returns {void}
   * @memberOf ChangePhoneFacade
   */
  save(formValue: ICustomer): void {
    this.sendOTP(formValue).subscribe(noop, (err: any) => {
      if (err.status === 403) {
        this.openOtpModal();
      }
    });
  }
}
