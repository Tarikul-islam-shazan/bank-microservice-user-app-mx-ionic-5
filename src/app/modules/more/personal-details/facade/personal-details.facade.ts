import * as moment from 'moment';
import { AnalyticsService, AnalyticsUserProperties } from '@app/analytics';
import { ChangeAddressPage } from '../change-address/container/change-address.page';
import { ChangeEmailPage } from '../change-email/container/change-email.page';
import { ChangeNamePage } from '../change-name/container/change-name.page';
import { ChangeNicknamePage } from '../change-nickname/container/change-nickname.page';
import { ChangePhonePage } from '../change-phone/container/change-phone.page';
import { CustomerService } from '@app/core/services/customer-service.service';
import { ICustomer } from '@app/core';
import { Injectable, Type } from '@angular/core';
import { ModalService } from '@app/shared';
import { Observable } from 'rxjs';
import { PersonalDetailsState } from './personal-details.state';

type PersonalDetailsEditModalType = Type<
  ChangeNamePage | ChangeNicknamePage | ChangeAddressPage | ChangeEmailPage | ChangePhonePage
>;

@Injectable()
export class PersonalDetailsFacade {
  customer$: Observable<ICustomer> = this.state.customer$;

  constructor(
    private analyticsService: AnalyticsService,
    private customerService: CustomerService,
    private modalService: ModalService,
    private state: PersonalDetailsState
  ) {}

  /**
   * @sumamry gets customer information
   *
   * @returns {void}
   * @memberOf PersonalDetailsFacade
   */
  getCustomerInfo(): void {
    this.customerService.getCustomerInfo().subscribe(customer => {
      this.state.updateCustomer(customer);
      this.updateAnalyticsUserProperties(customer);
    });
  }

  /**
   * @sumamry updates user property for analytics
   *
   * @param {ICustomer} customer
   * @returns {void}
   * @memberOf PersonalDetailsFacade
   */
  updateAnalyticsUserProperties(customer: ICustomer): void {
    this.analyticsService.setUserProperty(AnalyticsUserProperties.UserState, customer.state);
    this.analyticsService.setUserProperty(AnalyticsUserProperties.UserCity, customer.city);
    const userAge = moment()
      .diff(customer.dateOfBirth, 'years')
      .toString();
    this.analyticsService.setUserProperty(AnalyticsUserProperties.UserAge, userAge);
  }

  /**
   * @summary gets modal component
   *
   * @private
   * @param {string} editFieldName
   * @returns {*}
   * @memberOf PersonalDetailsPage
   */
  private getComponent(editFieldName: string): PersonalDetailsEditModalType {
    switch (editFieldName) {
      case 'name':
        return ChangeNamePage;
      case 'nickname':
        return ChangeNicknamePage;
      case 'address':
        return ChangeAddressPage;
      case 'email':
        return ChangeEmailPage;
      case 'mobile':
        return ChangePhonePage;
    }
  }

  /**
   * @summary opens edit modals
   *
   * @param {string} editFieldName
   * @returns {void}
   * @memberOf PersonalDetailsFacade
   */
  openEditModal(editFieldName: string): void {
    const componentClass = this.getComponent(editFieldName);
    this.modalService.openModal(componentClass);
  }
}
