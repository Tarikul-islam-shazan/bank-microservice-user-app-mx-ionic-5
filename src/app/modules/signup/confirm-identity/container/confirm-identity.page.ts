import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnalyticsService } from '@app/analytics';
import { PAGES, IMemberApplication, IdentityType, IScannedIdData } from '@app/core';
import { ModalController } from '@ionic/angular';
import { DropdownModalComponent } from '@app/shared';
import { DropdownOption } from '@app/signup/models/signup';
import { SignupIdentityConfirmFacade } from '../facade';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-identity',
  templateUrl: './confirm-identity.page.html',
  styleUrls: ['./confirm-identity.page.scss']
})
export class ConfirmIdentityPage implements OnInit {
  identityForm: FormGroup;
  identityType: IdentityType;
  identityTypes: DropdownOption[];
  memberApplication: IMemberApplication = {};
  constructor(
    private formBuilder: FormBuilder,
    private analyticsService: AnalyticsService,
    private modalCtrl: ModalController,
    private facade: SignupIdentityConfirmFacade,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.analyticsService.setCurrentScreenName(PAGES.SIGNUP_CONFIRM_IDENTITY.NAME);
    this.initIdentityForm();
  }

  initIdentityForm(): void {
    this.identityForm = this.formBuilder.group({
      identityType: [null, Validators.compose([Validators.required])],
      identityNumber: [null, Validators.compose([Validators.required])]
    });

    // we do not have any identity type for Identity Card
    // StateId actually means Identity Card
    this.identityTypes = [
      {
        text: this.translate.instant('signup-module.confirm-identity-page.identification-type-driver-license'),
        value: IdentityType.DrivingLicence
      },
      {
        text: this.translate.instant('signup-module.confirm-identity-page.identification-type-state-id'),
        value: IdentityType.StateId
      },
      {
        text: this.translate.instant('signup-module.confirm-identity-page.identification-type-passport'),
        value: IdentityType.Passport
      },
      {
        text: this.translate.instant('signup-module.confirm-identity-page.identification-type-military-id'),
        value: IdentityType.MilitaryId
      }
    ];

    this.initJumioDataToForm();
  }

  /**
   * Retrive jumio data from scanID and patch document value according to selected scan document
   * For fallback it will set DrivingLicence
   * Issues covers: [GMA-4447]Identity Document type is not pre-selected
   * Date: February 18, 2020
   * Developer: Sanitul <sanitul@bs-23.com>
   *
   * @memberof ConfirmIdentityPage
   */
  initJumioDataToForm(): void {
    const { identificationType, idNumber }: IScannedIdData = this.facade.getJumioScanData();
    this.identityForm.controls.identityNumber.patchValue(idNumber);
    this.identityTypes.find(identityType => {
      if (identityType.value === identificationType) {
        this.identityForm.controls.identityType.patchValue(identityType.text);
        this.identityType = identificationType;
      }
    });
  }

  async openOptionsModal(): Promise<any> {
    try {
      const modal = await this.modalCtrl.create({
        component: DropdownModalComponent,
        componentProps: { data: this.identityTypes }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      this.identityForm.controls.identityType.patchValue(data.text);
      this.identityType = data ? data.value : null;
    } catch (error) {}
  }

  next() {
    this.memberApplication.identityType = this.identityType;
    this.memberApplication.identityNumber = this.identityForm.controls.identityNumber.value;
    this.facade.applyForBank(this.memberApplication);
  }
}
