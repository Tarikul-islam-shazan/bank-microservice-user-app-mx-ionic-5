/**
 * Issue: MM2-40
 * Feature: Personal Information Facade
 * Details: This facade is responsible for all functionalites of Personal information screen.
 * Date: April 24, 2020
 * Developer: Kausar <md.kasuar@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import {
  IDropdownOption,
  StaticDataCategory,
  StaticData,
  StaticDataService
} from '@app/core/services/static-data.service';
import { IPersonalInfo } from '@app/core/models/dto/signup';
import { SignUpService } from '@app/core/services/sign-up-service.service';
import { ModalService, DropdownModalComponent } from '@app/shared';
@Injectable()
export class SignUpPersonalInfoFacade {
  readonly mexicoCountryCode: string = '484'; // Country of Birth = 484 for Mexico,
  private _personalInformaion: IPersonalInfo;
  countryOptions: IDropdownOption[];
  placeOfBirthOptions: IDropdownOption[];
  sexOptions: IDropdownOption[];
  maritalStatusOptions: IDropdownOption[];
  highestLevelOfEducationOptions: IDropdownOption[];
  professionOptions: IDropdownOption[];
  occupationOptions: IDropdownOption[];
  economicActivityOptions: IDropdownOption[];
  banxicoActivityOptions: IDropdownOption[];
  constructor(
    private router: Router,
    private analytics: AnalyticsService,
    private staticDataService: StaticDataService,
    private signupService: SignUpService,
    private modalService: ModalService
  ) {}

  /**
   * @summary Getting static data using StaticDataService
   *
   * @memberof SignUpPersonalInfoFacade
   */
  getStaticData(): void {
    this.staticDataService.get(StaticDataCategory.PersonalInformation).subscribe(staticData => {
      this.countryOptions = staticData[StaticData.Country];
      this.placeOfBirthOptions = staticData[StaticData.PlaceOfBirth];
      this.nationalityOptions = staticData[StaticData.Nationality];
      this.maritalStatusOptions = staticData[StaticData.MaritalStatus];
      this.sexOptions = staticData[StaticData.Gender];
      this.highestLevelOfEducationOptions = staticData[StaticData.HighestLevelOfEducation];
      this.professionOptions = staticData[StaticData.Profession];
      this.occupationOptions = staticData[StaticData.Occupation];
    });
  }

  /**
   * @summary A function to set all personal information
   *
   * @memberof SignUpPersonalInfoFacade
   */
  set personalInformation(personalInfo: IPersonalInfo) {
    this._personalInformaion = personalInfo;
  }

  /**
   *
   * @summary A function to updated personal information
   * @param {{ [key: string]: string }} personalInfo
   * @memberof SignUpPersonalInfoFacade
   */
  updatePersonalInformation(personalInfo: { [key: string]: string }): void {
    this._personalInformaion = { ...this._personalInformaion, ...personalInfo };
  }

  /**
   *
   * @summary A function to get Econimic activity option by occapation
   * @param {string} occupationValue
   * @memberof SignUpPersonalInfoFacade
   */
  updateEconomicActivityOptions(occupationValue: string): void {
    if (occupationValue) {
      const occapations: IDropdownOption & { [key: string]: any } = this.occupationOptions.find(
        occupation => occupation.value === occupationValue
      );
      this.economicActivityOptions = occapations && occapations.activities ? occapations.activities : [];
    } else {
      this.economicActivityOptions = [];
    }
  }

  /**
   *
   * @summary A function to get Econimic activity option by activite
   * @param {string} economicActivityValue
   * @memberof SignUpPersonalInfoFacade
   */
  updateBanxicoActivityOptions(economicActivityValue: string): void {
    if (economicActivityValue) {
      const economicActivities: IDropdownOption & { [key: string]: any } = this.economicActivityOptions.find(
        economicActivity => economicActivity.value === economicActivityValue
      );
      this.banxicoActivityOptions = economicActivities && economicActivities.banxico ? economicActivities.banxico : [];
    } else {
      this.banxicoActivityOptions = [];
    }
  }

  /**
   *
   * @summary A function to return CountryOfBirth is Maxi
   * @param {string} countryCode
   * @returns {boolean}
   * @memberof SignUpPersonalInfoFacade
   */
  isCountryOfBirthMexico(countryCode: string): boolean {
    return this.mexicoCountryCode === countryCode;
  }

  /**
   * @summary A function to save data to backend using SignUpService
   * @memberof SignUpPersonalInfoFacade
   */
  savePersonalInfomation(): void {
    this.signupService.submitPersonaInfo(this._personalInformaion).subscribe(res => {
      this.analytics.logEvent(AnalyticsEventTypes.SignupPersonalInfoCompleted);
      this.router.navigateByUrl('/signup/funding-information');
    });
  }

  /**
   *
   * @summary A function opne dropdown modal with a callback
   * @param {string} personalInfoKey
   * @param {IDropdownOption[]} options
   * @param {(data) => void} callback
   * @memberof SignUpPersonalInfoFacade
   */
  openDropdownOptionsModal(personalInfoKey: string, options: IDropdownOption[], callback: (data) => void): void {
    this.modalService.openModal(
      DropdownModalComponent,
      {
        data: options
      },
      (resp: any) => {
        const { data } = resp;
        if (data) {
          this.updatePersonalInformation({ [personalInfoKey]: data.value });
          callback(data);
        }
      }
    );
  }
}
