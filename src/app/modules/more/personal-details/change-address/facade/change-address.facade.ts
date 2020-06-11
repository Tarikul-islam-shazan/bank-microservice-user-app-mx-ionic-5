import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { ModalService } from '@app/shared';
import { CustomerService } from '@app/core/services/customer-service.service';
import { ICustomer, IStates, SignUpService, IAddressInfo, IAddress } from '@app/core';
import { StaticDataService, StaticDataCategory, IDropdownOption } from '@app/core/services/static-data.service';
import { Injectable } from '@angular/core';
import { MemberService } from '@app/core/services/member.service';
import { Observable, Subscription } from 'rxjs';
import { PersonalDetailsState } from '@app/more/personal-details/facade/personal-details.state';

@Injectable()
export class ChangeAddressFacade {
  customer: ICustomer = {};
  selectedCountryState: IStates;
  constructor(
    private analyticsService: AnalyticsService,
    private customerService: CustomerService,
    private memberService: MemberService,
    private personalDetailsState: PersonalDetailsState,
    private staticDataService: StaticDataService,
    private signUpService: SignUpService,
    private modalService: ModalService
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

  getStaticData(): Observable<{ [key: string]: IDropdownOption[] }> {
    return this.staticDataService.get(StaticDataCategory.AddressInformation);
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
   * @summary opens OTP modal
   *
   * @param {ICustomer} formValue
   * @returns {void}
   * @memberOf ChangeAddressFacade
   */
  save(formValue: IAddress): void {
    const customer: Partial<ICustomer> = {};
    const addressArrar: IAddress[] = [formValue];
    customer.address = addressArrar;
    this.customerService.updateAddress(customer).subscribe((response: any) => {
      const data = response.address;
      this.customer.address = data;
      // Object.assign(this.customer, data);
      Object.assign(this.memberService.member, data);
      this.analyticsService.logEvent(AnalyticsEventTypes.AddressChanged);
      setTimeout(() => {
        this.modalService.close();
      }, 500);
    });
    // this.signUpService.submitAddressInfo(customer.address).subscribe(data => {
    //   this.analyticsService.logEvent(AnalyticsEventTypes.SignupAddressInfoCompleted);
    // });
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
