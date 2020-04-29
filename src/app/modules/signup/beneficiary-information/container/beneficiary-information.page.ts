/**
 * Issue: MM2-26
 * Details:  Beneficiary Information - Screen
 * Date: April 22, 2020
 * Developer: Raihan <raihanuzzaman@bs-23.net>
 */

import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { BeneficiaryFacade } from '../facade/facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IinputOption, InputFormatType } from '@app/shared/directives/mask-input.directive';
import { AnalyticsService } from '@app/analytics/services/analytics.service';
import { PAGES } from '@app/core/models/constants';
import { DropdownOption } from '@app/signup/models/signup';
import { ModalController } from '@ionic/angular';
import { DropdownModalComponent } from '@app/shared/components';
import { IBeneficiaryInfo } from '@app/core/models/dto/signup';
import { IMeedModalContent } from '@app/shared/models/modal';
import { ModalService } from '@app/shared';
@Component({
  selector: 'mbc-beneficiary-information',
  templateUrl: './beneficiary-information.page.html',
  styleUrls: ['./beneficiary-information.page.scss']
})
export class BeneficiaryInformationPage implements OnInit {
  beneficiaryFormApplication: Partial<IBeneficiaryInfo> = {};
  beneficiaryForm: FormGroup;
  skipErrorFields: Record<string, string | boolean>;
  onlyOneWordInput: IinputOption;
  wordsInput: IinputOption;
  maxLength = 26;

  constructor(
    public facade: BeneficiaryFacade,
    private formBuilder: FormBuilder,
    private analyticsService: AnalyticsService,
    private modalCtrl: ModalController,
    private modalService: ModalService
  ) {
    this.onlyOneWordInput = {
      type: InputFormatType.ONLY_ONE_WORD
    };
    this.wordsInput = {
      type: InputFormatType.WORDS
    };
  }

  ngOnInit() {
    // setting up the beneficiary form
    this.initBeneficiaryForm();

    // fetching the static data from the api and setting up for the ui
    this.facade.fetchRelationshipData();
  }

  /**
   * setting up thebeneficiary form and validation
   *
   * @private
   * @memberof BeneficiaryInformationPage
   */
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
    const { firstName, secondName, parentalName, maternalLastName, dateOfBirth } = this.beneficiaryForm.value;
    this.beneficiaryFormApplication.firstName = this.capitalized(firstName);
    this.beneficiaryFormApplication.secondName = this.capitalized(secondName);
    this.beneficiaryFormApplication.paternalLastName = this.capitalized(parentalName);
    this.beneficiaryFormApplication.maternalLastName = this.capitalized(maternalLastName);
    this.beneficiaryFormApplication.dateOfBirth = moment(dateOfBirth).format('MM/DD/YYYY');

    this.facade.submit(this.beneficiaryFormApplication);
  }

  async openBeneficiaryModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'signup-module.signup-beneficiary-page.beneficiary-modal.title',
          details: ['signup-module.signup-beneficiary-page.beneficiary-modal.text']
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
