import { Component, OnInit, ViewChild } from '@angular/core';
import { DropdownOption, ScanIdenittyPictureType } from '@app/signup/models/signup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityConfirmationFacade } from '../facade/identity-confirmation.facade';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'identity-confirmation',
  templateUrl: './identity-confirmation.page.html',
  styleUrls: ['./identity-confirmation.page.scss']
})
export class IdentityConfirmationPage implements OnInit {
  identityConfirmationForm: FormGroup;
  utitlityOptions: DropdownOption[];

  documentImageType = ScanIdenittyPictureType;

  @ViewChild('selfieInput', { static: false }) selfieInput: IonInput;
  @ViewChild('utilityPictureInput', { static: false }) utilityPictureInput: IonInput;

  get isSubmitButtonDisabled(): boolean {
    return (
      this.identityConfirmationForm.invalid || !this.facade.scannedSelfieImage || !this.facade.scannedUtilityBillImage
    );
  }

  constructor(private formBuilder: FormBuilder, public facade: IdentityConfirmationFacade) {}

  ngOnInit() {
    this.setUtilityOptions();
    this.initIdentityConfirmation();
  }

  /**
   * @summary gets utility sets utility options
   *
   * @private
   * @returns {void}
   * @memberOf IdentityConfirmationPage
   */
  private setUtilityOptions(): void {
    this.utitlityOptions = this.facade.getUtilityOptions();
  }

  /**
   * @summary initializes the form
   *
   * @private
   * @returns {void}
   * @memberOf IdentityConfirmationPage
   */
  private initIdentityConfirmation(): void {
    this.identityConfirmationForm = this.formBuilder.group({
      utilityType: [null, Validators.required]
    });
  }

  /**
   * @summary opens utility modal
   *
   * @returns {void}
   * @memberOf IdentityConfirmationPage
   */
  openModal(): void {
    this.facade.openUtilityModal(this.utitlityOptions, (selectedUtility: DropdownOption) => {
      this.identityConfirmationForm.controls.utilityType.patchValue(selectedUtility.text);
    });
  }

  /**
   * @sumamry takes photo
   *
   * @param {ScanIdenittyPictureType} type
   * @returns {Promise<void>}
   * @memberOf IdentityConfirmationPage
   */
  async takePhoto(type: ScanIdenittyPictureType): Promise<void> {
    let imageUploadElement: HTMLInputElement;

    switch (type) {
      case ScanIdenittyPictureType.Utility:
        imageUploadElement = await this.utilityPictureInput.getInputElement();
        break;
      case ScanIdenittyPictureType.Selfie:
        imageUploadElement = await this.selfieInput.getInputElement();
        break;
    }
    this.facade.takePhoto(type, imageUploadElement);
  }

  /**
   * @summary uploads image
   *
   * @param {ScanIdenittyPictureType} type
   * @returns {Promise<void>}
   * @memberOf IdentityConfirmationPage
   */
  async uploadImage(type: ScanIdenittyPictureType): Promise<void> {
    let imageUploadElement: HTMLInputElement;

    switch (type) {
      case ScanIdenittyPictureType.Utility:
        imageUploadElement = await this.utilityPictureInput.getInputElement();
        break;
      case ScanIdenittyPictureType.Selfie:
        imageUploadElement = await this.selfieInput.getInputElement();
        break;
    }
    this.facade.uploadImage(type, imageUploadElement);
  }

  /**
   * @summary sets FormData and makes service call to continue signup
   *
   * @returns {void}
   * @memberOf IdentityConfirmationPage
   */
  continue(): void {
    if (!this.isSubmitButtonDisabled) {
      const { utilityType } = this.identityConfirmationForm.value;
      const formData = this.facade.getFormData(utilityType);

      console.warn(formData);

      // this.facade.continue(utilityType);
    }
  }
}
