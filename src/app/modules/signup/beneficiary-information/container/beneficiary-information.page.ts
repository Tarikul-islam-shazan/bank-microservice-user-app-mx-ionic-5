import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { BeneficiaryFacade } from '../facade/facade';
import { IBeneficiaryApplication } from '@app/core/models/dto/signup';
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
  beneficiaryFormApplication: IBeneficiaryApplication;
  beneficiaryForm: FormGroup;
  skipErrorFields: Record<string, string | boolean>;
  onlyOneWordInput: IinputOption;
  wordsInput: IinputOption;
  relationship: DropdownOption[];
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
      dateOfBirth: [moment().format('YYYY-MM-DD'), Validators.required],
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

  isDateOfBirthInvalid(): boolean {
    const payDate = moment(this.beneficiaryForm.value.dateOfBirth).format('YYYY-MM-DD');
    const chkDate = moment(payDate, 'YYYY-MM-DD', true);
    return !chkDate.isValid();
  }

  async openOptionsModal(formControlName: string, options: DropdownOption[]): Promise<any> {
    // this.isInputFieldSkip(formControlName);
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
  next(): void {}
}
