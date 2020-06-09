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
   * Ticket:MM2-141
   * Date: June 09, 2020
   * Developer: Kausar <md.kausar@brainstation23.com>
   * @summary A function to call updateEmail of Customer service
   * @param {string} email
   * @returns {void}
   * @memberOf ChangeEmailFacade
   */
  save(email: string): void {
    this.customerService.updateEmail(email).subscribe(_customer => {
      this.personalDetailsState.updateCustomer({ ...this.customer, ..._customer });
      this.dismissModal();
    });
  }
}
