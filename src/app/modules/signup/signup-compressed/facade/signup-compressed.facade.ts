import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { CountryModalComponent } from '../components/country-modal';
import { ICountry, IMember, Logger, REG_EX_PATTERNS, SignUpService } from '@app/core';
import { IMeedModalComponentProps, ModalService, IMeedModalContent } from '@app/shared';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const logger = new Logger('SignupCompressedFacade');

@Injectable()
export class SignupCompressedFacade {
  countries: ICountry[];
  selectedCountry: ICountry;

  private infoModalOpened = false;

  constructor(
    private analytics: AnalyticsService,
    private modalService: ModalService,
    private router: Router,
    private signupService: SignUpService
  ) {}

  /**
   * @summary opens inviter modal
   *
   * @returns {void}
   * @memberOf SignupCompressedFacade
   */
  openInviterCheckInfoModal(): void {
    if (!this.infoModalOpened) {
      this.infoModalOpened = true;
      this.openInfoModal('', ['signup-module.signup-compressed-page.modals.inviter-found-own-modal-title'], true);
    }
  }

  /**
   * @summary opens country modal
   *
   * @param {() => void} callback
   * @returns {Promise<void>}
   * @memberOf SignupCompressedFacade
   */
  async openCountryModal(callback: () => void): Promise<void> {
    const componentProps: IMeedModalContent = {
      data: this.countries,
      fullScreen: false,
      onDidDismiss: response => {
        const { data } = response;
        if (data) {
          this.selectedCountry = data;
          callback();
        }
      }
    };
    await this.modalService.openModal(CountryModalComponent, componentProps);
  }

  /**
   * @summary gets countries
   *
   * @returns {void}
   * @memberOf SignupCompressedFacade
   */
  getCountries(): void {
    this.signupService.getCountries().subscribe(resp => {
      this.countries = resp;
      this.countries.push({
        _id: null,
        countryAbv: null,
        countryName: 'Others'
      });
    });
  }

  /**
   * @summary opens info modal
   *
   * @param {string} modalTitle
   * @param {string[]} modalDetails
   * @param {boolean} [infoModalStatus]
   * @memberOf SignupCompressedFacade
   */
  openInfoModal(modalTitle: string, modalDetails: string[], infoModalStatus?: boolean): void {
    const componentProps: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            title: modalTitle,
            details: modalDetails
          }
        ],
        actionButtons: [
          {
            text: 'signup-module.signup-compressed-page.modals.inviter-found-own-modal-button',
            cssClass: 'white-button',
            handler: () => this.modalService.close()
          }
        ],
        onDidDismiss: () => (this.infoModalOpened = infoModalStatus ? false : true),
        fullScreen: false
      }
    };
    this.modalService.openInfoModalComponent(componentProps);
  }

  /**
   * @summary opens country not supported modal
   *
   * @returns {void}
   * @memberOf SignupCompressedFacade
   */
  openUnavailableCountryModal(): void {
    this.openInfoModal('signup-module.signup-compressed-page.modals.country-unavailable-modal-title', [
      'signup-module.signup-compressed-page.modals.country-unavailable-modal-description'
    ]);
  }

  /**
   * @summary assigns form values to signup service
   * @summary navigates to verification page if success
   *
   * @param {*} memberInfo
   * @returns {void}
   * @memberOf SignupCompressedFacade
   */
  assignFormValues(memberInfo: any): void {
    const id = this.signupService.member._id;
    const { nickname, inviterEmailOrCode, inviterFoundOwn, country } = memberInfo;
    let member: IMember = {
      _id: id,
      nickname,
      country: this.selectedCountry._id
    };

    if (!inviterFoundOwn) {
      if (REG_EX_PATTERNS.INVITER_CODE.test(inviterEmailOrCode)) {
        member = Object.assign(member, { inviterCode: inviterEmailOrCode });
      } else if (REG_EX_PATTERNS.EMAIL.test(inviterEmailOrCode)) {
        member = Object.assign(member, { inviterEmail: inviterEmailOrCode });
      }
    } else {
      member = Object.assign(member, { inviter: null });
    }

    this.signupService.assignCompressed(member).subscribe(() => {
      this.analytics.logEvent(AnalyticsEventTypes.CompressedSubmitted, { nickname, country });
      this.router.navigate(['/signup/verification']);
    });
  }
}
