import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { ModalService } from '@app/shared';
import { CustomerService } from '@app/core/services/customer-service.service';
import { ICustomer, IStates, SignUpService, IAddressInfo } from '@app/core';
import {
  StaticDataService,
  StaticDataCategory,
  StaticData,
  IDropdownOption
} from '@app/core/services/static-data.service';
import { Injectable } from '@angular/core';
import { MemberService } from '@app/core/services/member.service';
import { Observable, noop, Subscription } from 'rxjs';
import { OtpVerificationModalPage } from '@app/shared/components/otp-verification-modal/container';
import { PersonalDetailsState } from '@app/more/personal-details/facade/personal-details.state';

@Injectable()
export class ChangeAddressFacade {
  customer: ICustomer = {};
  selectedCountryState: IStates;
  public addressTypeList: IDropdownOption[] = [];
  public propertyTypeList: IDropdownOption[] = [];

  constructor(
    private analyticsService: AnalyticsService,
    private customerService: CustomerService,
    private memberService: MemberService,
    private modalService: ModalService,
    private personalDetailsState: PersonalDetailsState,
    private staticDataService: StaticDataService,
    private signUpService: SignUpService
  ) {
    this.getCustomer();
  }

  /**
   * @summary gets customer info
   *
   * @private
   * @returns {Subscription}
   * @memberOf ChangeAddressFacade
   */
  private getCustomer(): Subscription {
    return this.personalDetailsState.customer$.subscribe((customer: ICustomer) => {
      this.customer = customer;
    });
  }

  getStaticData(): void {
    this.staticDataService.get(StaticDataCategory.AddressInformation).subscribe(staticData => {
      this.addressTypeList = staticData[StaticData.AddressType];
      this.propertyTypeList = staticData[StaticData.PropertyType];
    });
  }

  /**
   * @summary gets country states from customer service.
   *
   * @returns {Observable<IStates[]>}
   * @memberOf ChangeAddressFacade
   */
  getCountryState(): Observable<IStates[]> {
    return this.customerService.getCountryState(this.memberService.member.country);
  }

  /**
   * @summary sends OTP
   *
   * @param {ICustomer} customer
   * @returns {Observable<ICustomer>}
   * @memberOf ChangeAddressFacade
   */
  sendOTP(customer: ICustomer): Observable<ICustomer> {
    return this.customerService.updateAddress(customer);
  }

  /**
   * @summary updates member data
   *
   * @returns {void}
   * @memberOf ChangeAddressFacade
   */
  openOTPModal(): void {
    this.modalService.openModal(OtpVerificationModalPage, {}, (response: any) => {
      const { data } = response;
      if (data) {
        Object.assign(this.customer, data);
        Object.assign(this.memberService.member, data);
        this.analyticsService.logEvent(AnalyticsEventTypes.AddressChanged);
        this.modalService.close();
      }
    });
  }

  /**
   * @summary opens OTP modal
   *
   * @param {ICustomer} formValue
   * @returns {void}
   * @memberOf ChangeAddressFacade
   */
  save(formValue: ICustomer): void {
    const customer: ICustomer = formValue;
    customer.state = this.selectedCountryState.stateAbv;
    this.sendOTP(customer).subscribe(noop, (err: any) => {
      if (err.status === 403) {
        this.openOTPModal();
      }
    });
  }

  /**
   *
   *
   * @param {*} postalCode
   * @returns {Observable<Partial<IAddressInfo[]>>}
   * @memberof AddressInformationFacade
   */
  getPostalCodeInfo(postalCode): Observable<Partial<IAddressInfo[]>> {
    return this.signUpService.getStateCityMunicipality(postalCode);
  }
}
