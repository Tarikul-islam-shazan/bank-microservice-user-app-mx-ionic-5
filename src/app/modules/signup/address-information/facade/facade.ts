/**
 * Feature: Address Information Facade
 * Details: This facade is responsible to call functionality from signup service for address info data.
 * Date: April 21, 2020
 * Developer: Sudipta Ghosh <sudipta.ghosh@bs-23.net>
 */

import { Injectable } from '@angular/core';
import { SignUpService, IAddressInfo } from '@app/core';
import { StaticDataService, StaticDataCategory, IDropdownOption } from '@app/core/services/static-data.service';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { Observable } from 'rxjs';
/**
 *
 *
 * @export
 * @class AddressInformationFacade
 */
@Injectable()
export class AddressInformationFacade {
  public maxDate: string;
  public addressTypeList: IDropdownOption[] = [];
  public propertyTypeList: IDropdownOption[] = [];

  constructor(
    private signUpService: SignUpService,
    private router: Router,
    private analytics: AnalyticsService,
    private staticDataService: StaticDataService
  ) {}

  /**
   *
   * @description get addressType and propertyType from static data
   * @memberof AddressInformationFacade
   */
  getStaticData(): void {
    this.staticDataService.get([StaticDataCategory.AddressType, StaticDataCategory.PropertyType]).subscribe(data => {
      this.addressTypeList = data[StaticDataCategory.AddressType];
      this.propertyTypeList = data[StaticDataCategory.PropertyType];
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

  /**
   *
   *
   * @param {IAddressInfo} addressInfoData
   * @memberof AddressInformationFacade
   */
  goToNext(addressInfoData: IAddressInfo) {
    this.signUpService.submitAddressInfo(addressInfoData).subscribe(data => {
      this.analytics.logEvent(AnalyticsEventTypes.AddressInfoSubmitted);
      this.router.navigate(['/signup/beneficiary-information']);
    });
  }
}
