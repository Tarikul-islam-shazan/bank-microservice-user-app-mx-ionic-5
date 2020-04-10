import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { CountryStateModalComponent, ModalService } from '@app/shared';
import { CustomerService } from '@app/core/services/customer-service.service';
import { ICustomer, IStates } from '@app/core';
import { Injectable } from '@angular/core';
import { MemberService } from '@app/core/services/member.service';
import { Observable, noop, Subscription } from 'rxjs';
import { OtpVerificationModalPage } from '@app/shared/components/otp-verification-modal/container';
import { PersonalDetailsState } from '@app/more/personal-details/facade/personal-details.state';

@Injectable()
export class ChangeAddressFacade {
  customer: ICustomer = {};
  countryStates: IStates[];
  selectedCountryState: IStates;

  constructor(
    private analyticsService: AnalyticsService,
    private customerService: CustomerService,
    private memberService: MemberService,
    private modalService: ModalService,
    private personalDetailsState: PersonalDetailsState
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
   * @summary gets states
   *
   * @param {(stateName: string) => void} callback
   * @returns {void}
   * @memberOf AddPayeeAddressPage
   */
  getCountryStates(callback: (stateName: string) => void): void {
    this.getCountryState().subscribe((countryStates: IStates[]) => {
      this.countryStates = countryStates;
      this.selectedCountryState = countryStates.filter(state => this.customer.state === state.stateAbv)[0];
      this.removeSelectedState();
      callback(this.selectedCountryState.stateName);
    });
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
   * @summary removes selected state form country states.
   *
   * @private
   * @returns {void}
   * @memberOf AddPayeeAddressPage
   */
  private removeSelectedState(): void {
    this.countryStates = this.countryStates.filter(state => state.stateAbv !== this.selectedCountryState.stateAbv);
  }

  /**
   * @sumamry opens state modal.
   *
   * @param {(stateName: string) => void} callback
   * @returns {void}
   * @memberOf ChangeAddressFacade
   */
  openStateModal(callback: (stateName: string) => void): void {
    if (this.selectedCountryState) {
      this.countryStates.unshift(this.selectedCountryState);
    }

    this.modalService.openModal(
      CountryStateModalComponent,
      {
        data: this.countryStates
      },
      (resp: any) => {
        const { data } = resp;
        if (data) {
          this.selectedCountryState = data;
          this.removeSelectedState();
          callback(this.selectedCountryState.stateName);
        }
      }
    );
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
}
