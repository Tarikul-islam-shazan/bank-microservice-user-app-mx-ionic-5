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
   * @summary Update member phone
   *
   * @param {ICustomer} customer
   * @returns {Observable<ICustomer>}
   * @memberOf ChangePhoneFacade
   */
  updatePhone(customer: ICustomer): Observable<ICustomer> {
    return this.customerService.updatePhone(customer);
  }

  /**
   * @sumamry save updated phone number
   *
   * @param {ICustomer} formValue
   * @returns {void}
   * @memberOf ChangePhoneFacade
   */
  save(formValue: ICustomer): void {
    this.updatePhone(formValue).subscribe((customer: ICustomer) => {
      Object.assign(this.customer, customer);
      Object.assign(this.memberService.member, customer);
      this.dismissModal();
    });
  }
}
