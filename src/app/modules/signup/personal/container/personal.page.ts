import * as moment from 'moment';
import { AnalyticsService } from '@app/analytics';
import { Component, OnInit } from '@angular/core';
import { DropdownModalComponent } from '@app/shared/components';
import { DropdownOption } from '../../models/signup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMemberApplication, IScannedIdData, PAGES, REG_EX_PATTERNS } from '@app/core';
import { ModalController } from '@ionic/angular';
import { SignUpPersonalFacade } from '../facade';
import { IinputOption, InputFormatType } from '@app/shared/directives/mask-input.directive';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss']
})
export class PersonalPage implements OnInit {
  memberApplication: IMemberApplication;
  personalForm: FormGroup;
  prefix: DropdownOption;
  prefixOptions: DropdownOption[];
  occupation: DropdownOption;
  occupationOptions: DropdownOption[];
  monthlyIncome: DropdownOption[];
  monthlyIncomeOptions: DropdownOption[];
  sourceOfIncome: DropdownOption;
  sourceOfIncomeOptions: DropdownOption[];
  monthlyWithdrawal: DropdownOption;
  monthlyWithdrawalOptions: DropdownOption[];
  monthlyDeposit: DropdownOption;
  monthlyDepositOptions: DropdownOption[];
  skipErrorFields: Record<string, string | boolean>;
  scanData: IScannedIdData;
  socialSecurityNoValidLength = 9;
  onlyOneWordInput: IinputOption; // input directive property for firstName and lastName
  wordsInput: IinputOption; // input directive property for middleName
  constructor(
    private analyticsService: AnalyticsService,
    public facade: SignUpPersonalFacade,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {
    this.onlyOneWordInput = {
      type: InputFormatType.ONLY_ONE_WORD
    };
    this.wordsInput = {
      type: InputFormatType.WORDS
    };
  }

  ngOnInit(): void {
    this.analyticsService.setCurrentScreenName(PAGES.SIGNUP_PERSONAL.NAME);
    this.initPersonalForm();
    this.initDropdownOptions();
  }

  private initPersonalForm(): void {
    this.personalForm = this.formBuilder.group({
      prefix: [''], // prefix are now in first input field
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      dateOfBirth: [moment().format('YYYY-MM-DD'), Validators.required],
      socialSecurityNo: ['', Validators.required],
      occupation: ['', Validators.required],
      // remove monthlyIncome validator
      monthlyIncome: [''],
      sourceOfIncome: ['', Validators.required],
      monthlyWithdrawal: ['', Validators.required],
      monthlyDeposit: ['', Validators.required]
    });
    this.skipErrorFields = Object.assign({}, this.personalForm.value);
    this.memberApplication = this.personalForm.value;
    // this.initJumioDataIntoForm();
  }
  /**
   * set data to personalForm
   * Ticket: GMA-4686
   * Details: middle name error resolve
   * Date: March 10, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   * @memberof PersonalPage
   */
  initJumioDataIntoForm() {
    const { firstName, lastName, dateOfBirth } = this.facade.getJumioScanData();
    const [first, ...rest] = firstName.split(' ');
    this.personalForm.patchValue({
      firstName: first ? first : null,
      middleName: rest ? rest.join(' ') : null,
      lastName: lastName ? lastName : null,
      dateOfBirth: dateOfBirth ? dateOfBirth : ''
    });
  }

  /**
   *
   *
   * @param {string} fieldName taking control name of a form
   * @memberof PersonalPage
   * Ticket: GMA-4691
   * Details: The user can enter space in the first name and last name fields
   * Date: March 10, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  removeSpaceFromFromControl(fieldName: string): void {
    const fieldValue = this.personalForm.controls[fieldName].value;
    if (fieldName && REG_EX_PATTERNS.WHITE_SPACE.test(fieldValue)) {
      this.personalForm.patchValue({ [fieldName]: fieldValue.replace(REG_EX_PATTERNS.WHITE_SPACE, '') });
    }
  }

  private initDropdownOptions(): void {
    this.prefixOptions = [{ text: 'Mr.', value: 'mr' }, { text: 'Mrs.', value: 'mrs' }, { text: 'Ms.', value: 'ms' }];
    this.occupationOptions = [
      {
        text: 'Management Business Financial',
        value: 'ManagementBusinessFinancial'
      },
      {
        text: 'Computer Mathematical',
        value: 'ComputerMathematical'
      },
      {
        text: 'Architecture Engineering',
        value: 'ArchitectureEngineering'
      },
      {
        text: 'Science',
        value: 'Science'
      },
      {
        text: 'Legal',
        value: 'Legal'
      },
      {
        text: 'Education',
        value: 'Education'
      },
      {
        text: 'Arts',
        value: 'Arts'
      },
      {
        text: 'Healthcare Practitioners',
        value: 'HealthcarePractitioners'
      },
      {
        text: 'Healthcare Support',
        value: 'HealthcareSupport'
      },
      {
        text: 'Protective Service',
        value: 'ProtectiveService'
      },
      {
        text: 'Food Prep',
        value: 'FoodPrep'
      },
      {
        text: 'Building Cleaning Maintenance',
        value: 'BuildingCleaningMaintenance'
      },
      {
        text: 'Personal Care',
        value: 'PersonalCare'
      },
      {
        text: 'Sales',
        value: 'Sales'
      },
      {
        text: 'Office',
        value: 'Office'
      },
      {
        text: 'Farming Fishing Forestry',
        value: 'FarmingFishingForestry'
      },
      {
        text: 'Construction Extraction',
        value: 'ConstructionExtraction'
      },
      {
        text: 'Installation Maintenance Repair',
        value: 'InstallationMaintenanceRepair'
      },
      {
        text: 'Production',
        value: 'Production'
      },
      {
        text: 'Transportation',
        value: 'Transportation'
      },
      {
        text: 'Military',
        value: 'Military'
      },
      {
        text: 'Fire',
        value: 'Fire'
      },
      {
        text: 'Law',
        value: 'Law'
      },
      {
        text: 'Homemaker',
        value: 'Homemaker'
      },
      {
        text: 'Student',
        value: 'Student'
      },
      {
        text: 'Private Investor',
        value: 'PrivateInvestor'
      },
      {
        text: 'Real Estate',
        value: 'RealEstate'
      },
      {
        text: 'Religious',
        value: 'Religious'
      },
      {
        text: 'Retired',
        value: 'Retired'
      },
      {
        text: 'Unemployed',
        value: 'Unemployed'
      }
    ];
    this.sourceOfIncomeOptions = [
      {
        text: 'Salary Wages',
        value: 'SalaryWages'
      },
      {
        text: 'Inheritance',
        value: 'Inheritance'
      },
      {
        text: 'Property Company Sale',
        value: 'PropertyCompanySale'
      },
      {
        text: 'Investments',
        value: 'Investments'
      },
      {
        text: 'Divorce Settlement',
        value: 'DivorceSettlement'
      },
      {
        text: 'Other',
        value: 'Other'
      }
    ];
    this.monthlyDepositOptions = [
      {
        text: '0-1000',
        value: '0-1T'
      },
      {
        text: '>1000-5000',
        value: '1T-5T'
      },
      {
        text: '>5000-15000',
        value: '5T-15T'
      },
      {
        text: '>15000',
        value: 'GT-15T'
      }
    ];
    this.monthlyWithdrawalOptions = [
      {
        text: '0-1000',
        value: '0-1T'
      },
      {
        text: '>1000-5000',
        value: '1T-5T'
      },
      {
        text: '>5000-15000',
        value: '5T-15T'
      },
      {
        text: '>15000',
        value: 'GT-15T'
      }
    ];
  }

  isInputFieldSkip(formControlName: string) {
    const formFields: string[] = Object.keys(this.personalForm.controls);
    const currentFieldIndex = formFields.indexOf(formControlName);
    for (let i = currentFieldIndex - 1; i >= 0; i--) {
      const field = formFields[i];
      if (this.personalForm.controls[field].invalid) {
        this.skipErrorFields[field] = true;
      }
    }

    for (let i = currentFieldIndex + 1; i < formFields.length; i++) {
      const field = formFields[i];
      this.skipErrorFields[field] = false;
    }
  }

  async openOptionsModal(formControlName: string, options: DropdownOption[]): Promise<any> {
    this.isInputFieldSkip(formControlName);
    try {
      const modal = await this.modalCtrl.create({
        component: DropdownModalComponent,
        componentProps: { data: options }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      this.personalForm.controls[formControlName].patchValue(data.text);
      this[formControlName] = data ? data : null;
      this.memberApplication[formControlName] = data.value;
    } catch (error) {}
  }

  /**
   * Details: capitalize first character of a given string
   *
   * @param {string} word
   * @returns {string}
   * @memberof PersonalPage
   * Ticket: GMA-4691
   * Issue: The user can enter space in the first name and last name fields.
   * Date: March 20, 2020
   * Developer: Utpal <Utpal.Sarker@brainstation23.com>
   */
  capitalized(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  /**
   * formating personalform value and set to memberApplication
   *
   * @memberof PersonalPage
   * Ticket: GMA-4687
   * Issue: Signup: Wrong date of birth passed to axxiome.
   * Date: March 10, 2020
   * Developer: Utpal <Utpal.Sarker@brainstation23.com>
   */
  next(): void {
    const { firstName, middleName, lastName, dateOfBirth, socialSecurityNo, monthlyIncome } = this.personalForm.value;
    this.memberApplication.firstName = this.capitalized(firstName);
    this.memberApplication.middleName = this.capitalized(middleName);
    this.memberApplication.lastName = this.capitalized(lastName);
    this.memberApplication.dateOfBirth = dateOfBirth ? dateOfBirth.split('T')[0] : '';
    this.memberApplication.socialSecurityNo = socialSecurityNo;
    /**
     * Ticket: GMA-4774
     * Issue: Monthly income value should be sent without comma as string.
     * Date: March 30, 2020
     * Developer: Utpal <Utpal.Sarker@brainstation23.com>
     */
    if (monthlyIncome && monthlyIncome !== '0' && monthlyIncome !== '$0.00') {
      this.memberApplication.monthlyIncome = String(
        this.personalForm.controls.monthlyIncome.value.split('$')[1]
      ).replace(REG_EX_PATTERNS.COMMA_OPERATOR, '');
    }
    this.facade.goToNext(this.memberApplication);
  }

  /**
   * @summary checks if date of birth is a real valid date.
   *
   * @returns {boolean}
   * @memberOf PersonalPage
   *
   * Issue:  GMA-4648
   * Details: form error messages implemented.
   * Date: March 04, 2020
   * Developer: Baten <md.abdul@brainstation23.com>
   */

  isDateOfBirthInvalid(): boolean {
    const payDate = moment(this.personalForm.value.dateOfBirth).format('YYYY-MM-DD');
    const chkDate = moment(payDate, 'YYYY-MM-DD', true);
    return !chkDate.isValid();
  }

  /**
   * @summary checks if social security no is valid.
   *
   * @returns {boolean}
   * @memberOf PersonalPage
   */
  isSocialSecurityNoInvalid(): boolean {
    const socialSecurityNoLength = this.personalForm.value.socialSecurityNo.length;
    return socialSecurityNoLength === this.socialSecurityNoValidLength;
  }
}
