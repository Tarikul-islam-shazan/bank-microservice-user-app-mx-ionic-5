import { Component, OnInit, ViewChild } from '@angular/core';
import { DropdownOption } from '@app/signup/models/signup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityConfirmationFacade } from '../facade/identity-confirmation.facade';
import { IonInput } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'identity-confirmation',
  templateUrl: './identity-confirmation.page.html',
  styleUrls: ['./identity-confirmation.page.scss']
})
export class IdentityConfirmationPage implements OnInit {
  identityConfirmationForm: FormGroup;
  utitlityOptions: DropdownOption[];

  @ViewChild('utilityPictureInput', { static: false }) utilityPictureInput: IonInput;

  get isSubmitButtonDisabled(): boolean {
    return this.identityConfirmationForm.invalid || !this.facade.scannedUtilityBillImage;
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
    this.facade.getUtilityOptions().subscribe(utilityDocument => {
      this.utitlityOptions = utilityDocument;
    });
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
      utilityDocument: [null, Validators.required]
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
      this.identityConfirmationForm.controls.utilityDocument.patchValue(selectedUtility.text);
    });
  }

  /**
   * @sumamry takes photo
   *
   * @returns {Promise<void>}
   * @memberOf IdentityConfirmationPage
   */
  async takePhoto(): Promise<void> {
    const imageUploadElement = await this.utilityPictureInput.getInputElement();

    this.facade.takePhoto(imageUploadElement);
  }

  /**
   * @summary uploads image
   *
   * @returns {Promise<void>}
   * @memberOf IdentityConfirmationPage
   */
  async uploadImage(): Promise<void> {
    const imageUploadElement = await this.utilityPictureInput.getInputElement();
    this.facade.uploadImage(imageUploadElement);
  }

  /**
   * @summary sets FormData and makes service call to continue signup
   *
   * @returns {void}
   * @memberOf IdentityConfirmationPage
   */
  continue(): void {
    if (!this.isSubmitButtonDisabled) {
      this.facade.continue();
    }
  }
}
