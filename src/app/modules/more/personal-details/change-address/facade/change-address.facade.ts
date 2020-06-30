import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

import { CustomerService } from '@app/core/services/customer-service.service';
import { ICustomer, IStates, SignUpService, IAddressInfo, IAddress } from '@app/core';
import { StaticDataService, StaticDataCategory, IDropdownOption } from '@app/core/services/static-data.service';
import { Injectable } from '@angular/core';
import { MemberService } from '@app/core/services/member.service';
import { Observable, Subscription } from 'rxjs';
import { PersonalDetailsState } from '@app/more/personal-details/facade/personal-details.state';
import { Router, NavigationExtras } from '@angular/router';
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
    private router: Router
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

  getStaticData(): Promise<{ [key: string]: IDropdownOption[] }> {
    return this.staticDataService.get(StaticDataCategory.AddressInformation).toPromise();
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
    const navigationExtras: NavigationExtras = {
      queryParams: {
        address: JSON.stringify(formValue)
      }
    };
    this.router.navigate([`/more/personal-details/utility-upload`], navigationExtras);

    // this.customerService.updateAddress(customer).subscribe((response: any) => {
    //   const data = response.addresses;
    //   this.customer.addresses = data;
    //   // Object.assign(this.customer, data);
    //   Object.assign(this.memberService.member, data);
    //   this.analyticsService.logEvent(AnalyticsEventTypes.AddressChanged);
    //   setTimeout(() => {
    //     this.router.navigate([`/more/personal-details`]);
    //   }, 500);
    // });
  }

  /**
   *
   *
   * @param {*} postalCode
   * @returns {Observable<Partial<IAddressInfo[]>>}
   * @memberof AddressInformationFacade
   */
  getPostalCodeInfo(postalCode): Promise<Partial<IAddressInfo[]>> {
    return this.signUpService.getStateCityMunicipality(postalCode).toPromise();
  }
}
