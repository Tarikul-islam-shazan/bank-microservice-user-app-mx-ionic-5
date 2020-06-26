import * as moment from 'moment';
import { AnalyticsService, AnalyticsUserProperties } from '@app/analytics';
import { ChangeAddressPage } from '../change-address/container/change-address.page';
import { ChangeEmailPage } from '../change-email/container/change-email.page';
import { ChangeNicknamePage } from '../change-nickname/container/change-nickname.page';
import { ChangePhonePage } from '../change-phone/container/change-phone.page';
import { CustomerService } from '@app/core/services/customer-service.service';
import { ICustomer, SettingsService } from '@app/core';
import { Injectable, Type } from '@angular/core';
import { ModalService, IMeedModalComponentProps } from '@app/shared';
import { Observable } from 'rxjs';
import { PersonalDetailsState } from './personal-details.state';

type PersonalDetailsEditModalType = Type<ChangeNicknamePage | ChangeAddressPage | ChangeEmailPage | ChangePhonePage>;

@Injectable()
export class PersonalDetailsFacade {
  customer$: Observable<ICustomer> = this.state.customer$;

  constructor(
    private analyticsService: AnalyticsService,
    private customerService: CustomerService,
    private modalService: ModalService,
    private state: PersonalDetailsState,
    private settingsService: SettingsService
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

  get bankIdentifier(): string {
    return this.settingsService.getSettings().userSettings.bankIdentifier;
  }

  get bankContactNumber(): string {
    const conatcts = this.settingsService.getSettings().userSettings.contacts;
    return conatcts && this.bankIdentifier ? conatcts[this.bankIdentifier] : '';
  }

  /**
   * Ticket: MM2-463
   * Date: June 26, 2020
   * Developer: Kausar <md.kausar@brainstation23.com>
   * @summary A function to show change name info as half modal;
   * @returns {Promise<void>}
   * @memberof PersonalDetailsFacade
   */
  async showEditFullNameInfoModal(): Promise<void> {
    const contactNumber = this.bankContactNumber;
    const modalComponentContent: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            title: 'more-module.personal-details.change-name-info-modal.title',
            details: ['more-module.personal-details.change-name-info-modal.message'],
            values: { contactNumber }
          }
        ]
      }
    };
    await this.modalService.openInfoModalComponent(modalComponentContent);
  }

  /**
   * Ticket: MM2-463
   * Date: June 26, 2020
   * Developer: Kausar <md.kausar@brainstation23.com>
   * @summary A function to convert a pattern phone number
   * @param {string} mobilePhone
   * @returns {string}
   * @memberof PersonalDetailsFacade
   *
   */
  getFormatedMobilePhoneNumber(mobilePhone: string): string {
    if (!mobilePhone) {
      return '';
    }
    const cleaned = mobilePhone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1' : '';
      return `${intlCode}-${match[1]}-${match[2]}-${match[3]}`;
    }
    return mobilePhone;
  }
}
