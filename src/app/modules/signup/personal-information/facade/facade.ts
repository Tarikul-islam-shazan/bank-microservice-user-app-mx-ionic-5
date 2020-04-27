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
import { StaticDataService } from '@app/core/services/static-data.service';
import { IPersonalInfo } from '@app/core/models/dto/signup';
import { SignUpService } from '@app/core/services/sign-up-service.service';
import { IDropdownOption, StaticDataCategory } from '@app/core/models/static-data';
import { ModalService, DropdownModalComponent } from '@app/shared';
import { MemberService } from '@app/core';
@Injectable()
export class SignUpPersonalInfoFacade {
  // Country of Birth = 484 for Mexico,
  readonly mexicoCountryCode: string = '484';
  private _personalInformaion: IPersonalInfo;
  countryOptions: IDropdownOption[];
  placeOfBirthMexico: IDropdownOption[];
  placeOfBirthOptions: IDropdownOption[];
  nationalityOptions: IDropdownOption[];
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
    private modalService: ModalService,
    private memberService: MemberService
  ) {}

  /**
   * @summary Getting static data using StaticDataService
   *
   * @memberof SignUpPersonalInfoFacade
   */
  getStaticData(): void {
    this.staticDataService
      .get([
        StaticDataCategory.Country,
        StaticDataCategory.PlaceOfBirthMexico,
        StaticDataCategory.PlaceOfBirthForeign,
        StaticDataCategory.Nationality,
        StaticDataCategory.Gender,
        StaticDataCategory.Relationship,
        StaticDataCategory.HighestLevelOfEducation,
        StaticDataCategory.Profession,
        StaticDataCategory.Occupation
      ])
      .subscribe(data => {
        this.countryOptions = data[StaticDataCategory.Country];
        this.placeOfBirthOptions = data[StaticDataCategory.PlaceOfBirthMexico];
        this.nationalityOptions = data[StaticDataCategory.Nationality];
        this.maritalStatusOptions = data[StaticDataCategory.Relationship];
        this.sexOptions = data[StaticDataCategory.Gender];
        this.highestLevelOfEducationOptions = data[StaticDataCategory.HighestLevelOfEducation];
        this.professionOptions = data[StaticDataCategory.Profession];
        this.occupationOptions = data[StaticDataCategory.Occupation];
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
      const occapations: any = this.occupationOptions.find(occupation => occupation.value === occupationValue);
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
      const economicActivities: any = this.economicActivityOptions.find(
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

  setDumyMember() {
    this.memberService.setMember({
      bank: '5e99b6dc8702aa4d8e50a11d',
      _id: '5e9dbe668cc2015fdf257d06',
      customerId: '00000000168'
    });
  }
}
