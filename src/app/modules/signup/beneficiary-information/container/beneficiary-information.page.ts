import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { BeneficiaryFacade } from '../facade/facade';
import { IBeneficiaryInfo } from '@app/core/models/dto/signup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IinputOption, InputFormatType } from '@app/shared/directives/mask-input.directive';
import { AnalyticsService } from '@app/analytics/services/analytics.service';
import { PAGES } from '@app/core/models/constants';
import { DropdownOption } from '@app/signup/models/signup';
import { ModalController } from '@ionic/angular';
import { DropdownModalComponent } from '@app/shared/components';
@Component({
  selector: 'mbc-beneficiary-information',
  templateUrl: './beneficiary-information.page.html',
  styleUrls: ['./beneficiary-information.page.scss']
})
export class BeneficiaryInformationPage implements OnInit {
  beneficiaryFormApplication: IBeneficiaryInfo = {};
  beneficiaryForm: FormGroup;
  skipErrorFields: Record<string, string | boolean>;
  onlyOneWordInput: IinputOption;
  wordsInput: IinputOption;
  relationship: DropdownOption[];
  maxLength = 26;
  constructor(
    public facade: BeneficiaryFacade,
    private formBuilder: FormBuilder,
    private analyticsService: AnalyticsService,
    private modalCtrl: ModalController
  ) {
    this.onlyOneWordInput = {
      type: InputFormatType.ONLY_ONE_WORD
    };
    this.wordsInput = {
      type: InputFormatType.WORDS
    };
  }

  ngOnInit() {
    // this name will be changed
    this.analyticsService.setCurrentScreenName(PAGES.SIGNUP_PERSONAL.NAME);
    this.initBeneficiaryForm();
    // this might be changed also since dropdown data is coming from backed
    this.initDropDownOptions();
  }

  private initBeneficiaryForm(): void {
    this.beneficiaryForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(26)]],
      secondName: ['', Validators.maxLength(26)],
      parentalName: ['', [Validators.required, Validators.maxLength(26)]],
      maternalLastName: ['', Validators.maxLength(26)],
      dateOfBirth: ['', Validators.required],
      relationship: ['', Validators.required]
    });
    this.skipErrorFields = Object.assign({}, this.beneficiaryForm.value);
  }

  private initDropDownOptions() {
    this.relationship = [
      {
        text: 'Management Business Financial',
        value: 'PA'
      }
    ];
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
      this.beneficiaryForm.controls[formControlName].patchValue(data.text);
      this[formControlName] = data ? data : null;
      this.beneficiaryFormApplication[formControlName] = data.value;
    } catch (error) {}
  }

  isInputFieldSkip(formControlName: string) {
    const formFields: string[] = Object.keys(this.beneficiaryForm.controls);
    const currentFieldIndex = formFields.indexOf(formControlName);
    for (let i = currentFieldIndex - 1; i >= 0; i--) {
      const field = formFields[i];
      if (this.beneficiaryForm.controls[field].invalid) {
        this.skipErrorFields[field] = true;
      }
    }

    for (let i = currentFieldIndex + 1; i < formFields.length; i++) {
      const field = formFields[i];
      this.skipErrorFields[field] = false;
    }
  }

  capitalized(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  next(): void {
    const {
      firstName,
      secondName,
      parentalName,
      maternalLastName,
      dateOfBirth,
      relationship
    } = this.beneficiaryForm.value;
    this.beneficiaryFormApplication.firstName = this.capitalized(firstName);
    this.beneficiaryFormApplication.secondName = this.capitalized(secondName);
    this.beneficiaryFormApplication.paternalLastName = this.capitalized(parentalName);
    this.beneficiaryFormApplication.maternalLastName = this.capitalized(maternalLastName);
    this.beneficiaryFormApplication.dateOfBirth = dateOfBirth;
    this.beneficiaryFormApplication.relationship = relationship;

    this.facade.submit(this.beneficiaryFormApplication);
  }

  openBeneficiaryModal(): void {
    // console.log("working");
  }
}
