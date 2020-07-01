import { CustomerService } from '@app/core/services/customer-service.service';
import { ICustomer, IStates, SignUpService, IAddressInfo, IAddress } from '@app/core';
import { StaticDataService, StaticDataCategory, IDropdownOption } from '@app/core/services/static-data.service';
import { Injectable } from '@angular/core';
import { MemberService } from '@app/core/services/member.service';
import { Observable, Subscription } from 'rxjs';
import { PersonalDetailsState } from '@app/more/personal-details/facade/personal-details.state';
import { Router } from '@angular/router';
import { ChangeAddressService } from '@app/more/personal-details/change-address/services/change-address.service';
@Injectable()
export class ChangeAddressFacade {
  customer: ICustomer = {};
  selectedCountryState: IStates;
  constructor(
    private customerService: CustomerService,
    private memberService: MemberService,
    private personalDetailsState: PersonalDetailsState,
    private staticDataService: StaticDataService,
    private signUpService: SignUpService,
    private router: Router,
    private changeAddressService: ChangeAddressService
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
    const customer: Partial<ICustomer> = {};
    const addressArrar: IAddress[] = [formValue];
    customer.addresses = addressArrar;
    this.changeAddressService.customerData = customer;
    this.router.navigate([`/more/personal-details/utility-upload`]);
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
