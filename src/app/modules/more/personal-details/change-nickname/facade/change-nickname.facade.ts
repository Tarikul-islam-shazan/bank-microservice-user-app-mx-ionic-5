import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { CustomerService } from '@app/core/services/customer-service.service';
import { ICustomer } from '@app/core';
import { Injectable } from '@angular/core';
import { ModalService } from '@app/shared';
import { PersonalDetailsState } from '@app/more/personal-details/facade/personal-details.state';

@Injectable()
export class ChangeNicknameFacade {
  customer: ICustomer;

  constructor(
    private analytics: AnalyticsService,
    private customerService: CustomerService,
    private modalService: ModalService,
    private personalDetailsState: PersonalDetailsState
  ) {
    this.personalDetailsState.customer$.subscribe(res => {
      this.customer = res;
    });
  }

  /**
   * @summary closes the modal
   *
   * @returns {void}
   * @memberOf ChangeNicknamePage
   */
  dismissModal(): void {
    this.modalService.close();
  }

  /**
   * @summary uodates nick name
   *
   * @param {string} nickname
   * @returns {void}
   * @memberOf ChangeNicknameFacade
   */
  updateCustomerNickname(nickname: string): void {
    this.customerService.updateNickname(nickname).subscribe(res => {
      this.analytics.logEvent(AnalyticsEventTypes.NameChangeCompleted);
      Object.assign(this.customer, res);
      this.personalDetailsState.updateCustomer(this.customer);
      this.dismissModal();
    });
  }
}
