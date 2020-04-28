/**
 * Facade: Government Disclosure Facade
 * Module: Signup
 * Details: This facade is responsible to call functionality from Signup Service.
 * Date: April 23, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
import { DropdownOption } from '@app/signup/models/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaticDataService, StaticDataCategory } from '@app/core/services/static-data.service';
import { DropdownModalComponent } from '@app/shared';
import { IGovtDisclosureApplication, IGovtDisclosureResponse } from '@app/core/models/dto';
import { SignUpService } from '@app/core';
import { REG_EX_PATTERNS } from '@app/core/models';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class GovernmentDisclosureFacade {
  holdGovtPosition: boolean;
  relativeHoldGovtPosition = false;

  holdGovtPositionForm: FormGroup;
  relativeGovtPositionForm: FormGroup;

  skipErrorMyFields: Record<string, string | boolean>;
  skipErrorRelativeFields: Record<string, string | boolean>;

  govtDisclosureApplication: IGovtDisclosureApplication;

  private govtPositions: DropdownOption[];
  private participation: DropdownOption[];

  private myGovPosition: string;
  private relativeGovPosition: string;
  private relativeParticipation: string;

  constructor(
    private router: Router,
    private staticDataService: StaticDataService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private signupService: SignUpService,
    private analytics: AnalyticsService
  ) {
    this.initializeForms();
    this.initializeDropdownData();
  }

  /**
   * This method will open a Modal for Select Government Position
   * and set the value to form position form field.
   *
   * @param whosePosition { string }
   * @returns null { void }
   */
  openPositionSelectionModal(whosePosition: string): void {
    const componentProps: IMeedModalContent = {
      data: this.govtPositions,
      onDidDismiss: (res: any) => {
        const { data } = res;
        if (data) {
          if (whosePosition === 'me') {
            this.holdGovtPositionForm.controls.position.setValue(data.text);
            this.myGovPosition = data.value;
          } else if (whosePosition === 'relative') {
            this.relativeGovtPositionForm.controls.position.setValue(data.text);
            this.relativeGovPosition = data.value;
          }
        }
      }
    };
    this.modalService.openModal(DropdownModalComponent, componentProps);
  }

  /**
   * This method will open relative Participation % selection modal
   * and set the value at participation form field
   *
   * @param null
   * @returns null { void }
   */
  openParticipationSelectionModal(): void {
    const componentProps: IMeedModalContent = {
      data: this.participation,
      onDidDismiss: (res: any) => {
        const { data } = res;
        if (data) {
          this.relativeGovtPositionForm.controls.participation.setValue(data.text);
          this.relativeParticipation = data.value;
        }
      }
    };
    this.modalService.openModal(DropdownModalComponent, componentProps);
  }

  /**
   * This method handle Government Participation form field error
   *
   * @param formControlName { string }
   * @returns null { void }
   */
  isMyInputFieldSkip(formControlName: string): void {
    const formFields: string[] = Object.keys(this.holdGovtPositionForm.controls);
    const currentFieldIndex = formFields.indexOf(formControlName);
    for (let i = currentFieldIndex - 1; i >= 0; i--) {
      const field = formFields[i];
      if (this.holdGovtPositionForm.controls[field].invalid) {
        this.skipErrorMyFields[field] = true;
      }
    }

    for (let i = currentFieldIndex + 1; i < formFields.length; i++) {
      const field = formFields[i];
      this.skipErrorMyFields[field] = false;
    }
  }

  /**
   * This method handle Relative Government Participation form field error
   *
   * @param formControlName { string }
   * @returns null { void }
   */
  isRelativeInputFieldSkip(formControlName: string) {
    const formFields: string[] = Object.keys(this.relativeGovtPositionForm.controls);
    const currentFieldIndex = formFields.indexOf(formControlName);
    for (let i = currentFieldIndex - 1; i >= 0; i--) {
      const field = formFields[i];
      if (this.relativeGovtPositionForm.controls[field].invalid) {
        this.skipErrorRelativeFields[field] = true;
      }
    }

    for (let i = currentFieldIndex + 1; i < formFields.length; i++) {
      const field = formFields[i];
      this.skipErrorRelativeFields[field] = false;
    }
  }

  /**
   * This method will remove space from fields value
   *
   * @param formControl { string }
   * @returns null { void }
   */
  removeSpace(formControl: string): void {
    const value = this.relativeGovtPositionForm.get(formControl).value;
    if (REG_EX_PATTERNS.WHITE_SPACE.test(value)) {
      this.relativeGovtPositionForm.get(formControl).setValue(value.trim());
    }
  }

  /**
   * This method will enable or disabled Next button based on
   * Radio button selection and valid Form fields
   *
   * @param null
   * @returns true/false { boolean }
   */
  enableNextButton(): boolean {
    if (this.holdGovtPosition === undefined) {
      return false;
    } else if (this.holdGovtPosition) {
      if (this.holdGovtPositionForm.valid) {
        if (this.relativeHoldGovtPosition) {
          return this.relativeGovtPositionForm.valid ? true : false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  /**
   * This method initialize request data and call the API service
   * after successfully request send it will take user to the verification
   * screen
   *
   * @param null
   * @returns null { void }
   */
  onClickNext(): void {
    this.initializeRequestData();
    this.signupService
      .submitGovernmentDisclosureApplication(this.govtDisclosureApplication)
      .subscribe((response: IGovtDisclosureResponse) => {
        if (this.holdGovtPosition) {
          this.analytics.logEvent(AnalyticsEventTypes.GovernmentDisclosureCompleted, {
            governmentService: 'yes',
            ...this.govtDisclosureApplication.positionInfo
          });
        } else {
          this.analytics.logEvent(AnalyticsEventTypes.GovernmentDisclosureCompleted, { governmentService: 'no' });
        }
        this.router.navigate(['/signup/identity-confirmation']);
        this.govtDisclosureApplication = {};
      });
  }

  /**
   * This method initialize all of the forms fields for data input
   *
   * @param null
   * @returns null { void }
   */
  private initializeForms(): void {
    this.holdGovtPositionForm = this.formBuilder.group({
      position: ['', [Validators.required]],
      association: ['', [Validators.required, Validators.maxLength(40)]]
    });

    this.relativeGovtPositionForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(26)]],
      secondName: ['', [Validators.maxLength(26)]],
      paternalLastName: ['', [Validators.required, Validators.maxLength(26)]],
      maternalLastName: ['', [Validators.maxLength(26)]],
      position: ['', [Validators.required]],
      homeAddress: ['', [Validators.required, Validators.maxLength(80)]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(20)]],
      participation: ['', Validators.required]
    });

    this.skipErrorMyFields = Object.assign({}, this.holdGovtPositionForm.value);
    this.skipErrorRelativeFields = Object.assign({}, this.relativeGovtPositionForm.value);

    this.govtDisclosureApplication = {};
  }

  /**
   * This method will initialize all Dropdown fields values
   *
   * @param null
   * @returns null { void }
   */
  private initializeDropdownData(): void {
    this.staticDataService.get([StaticDataCategory.GovtPosition]).subscribe(res => {
      this.govtPositions = res.govtPosition;
    });

    this.participation = [];
    for (let i = 1; i <= 10; i++) {
      this.participation.push({ value: `${i * 10}`, text: `${i * 10}%` });
    }
  }

  /**
   * This method will initialize api request data from Form fields values
   *
   * @param null
   * @returns null { void }
   */
  private initializeRequestData(): void {
    if (this.holdGovtPosition) {
      this.govtDisclosureApplication.holdGovPosition = this.holdGovtPosition;
      this.govtDisclosureApplication.positionInfo = this.holdGovtPositionForm.value;
      this.govtDisclosureApplication.positionInfo.position = this.myGovPosition;
      if (this.relativeHoldGovtPosition) {
        this.govtDisclosureApplication.relativeHoldGovPosition = this.relativeHoldGovtPosition;
        this.govtDisclosureApplication.relativeInfo = this.relativeGovtPositionForm.value;
        this.govtDisclosureApplication.relativeInfo.position = this.relativeGovPosition;
        this.govtDisclosureApplication.relativeInfo.participation = this.relativeParticipation;
      } else {
        this.govtDisclosureApplication.relativeHoldGovPosition = this.relativeHoldGovtPosition;
      }
    } else {
      this.govtDisclosureApplication.holdGovPosition = this.holdGovtPosition;
    }
  }
}
