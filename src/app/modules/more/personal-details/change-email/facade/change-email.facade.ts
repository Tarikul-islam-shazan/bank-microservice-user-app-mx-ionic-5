import { CustomerService } from '@app/core/services/customer-service.service';
import { ICustomer, MemberService } from '@app/core';
import { Injectable } from '@angular/core';
import { ModalService } from '@app/shared';
import { noop, Observable, Subscription } from 'rxjs';
import { PersonalDetailsState } from '@app/more/personal-details/facade/personal-details.state';

@Injectable()
export class ChangeEmailFacade {
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
   * @memberOf ChangeEmailFacade
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
   * @memberOf ChangeEmailFacade
   */
  dismissModal(): void {
    this.modalService.close();
  }

  /**
   * @summary updtes email
   *
   * @param {ICustomer} customer
   * @returns {Observable<ICustomer>}
   * @memberOf ChangeEmailFacade
   */
  requestOTPCode(customer: ICustomer): Observable<ICustomer> {
    return this.customerService.updateEmail(customer);
  }

  /**
   * @summary updates email on success
   *
   * @returns {void}
   * @memberOf ChangeEmailPage
   */
  openOTPModal(): void {
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
   * @summary opens OTP modal
   *
   * @param {string} email
   * @returns {void}
   * @memberOf ChangeEmailFacade
   */
  save(email: string): void {
    this.requestOTPCode({ email }).subscribe(noop, err => {
      if (err.status === 403) {
        this.openOTPModal();
      }
    });
  }
}
