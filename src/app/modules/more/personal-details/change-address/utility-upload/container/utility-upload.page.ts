import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityUploadFacade } from '../facade/utility.facade';
import { IonInput } from '@ionic/angular';
import { DropdownOption } from '@app/signup/models/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'mbc-utility-upload',
  templateUrl: './utility-upload.page.html',
  styleUrls: ['./utility-upload.page.scss']
})
export class UtilityUploadPage implements OnInit {
  @ViewChild('documentImageInput', { static: false }) documentImageInput: IonInput;
  utitlityOptions: DropdownOption[];
  identityConfirmationForm: FormGroup;
  constructor(private router: Router, public facade: UtilityUploadFacade, private formBuilder: FormBuilder) {}

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

  dismiss() {
    this.router.navigate([`/more/personal-details/change-address`]);
  }

  async takePhoto(): Promise<void> {
    let imageUploadElement: HTMLInputElement;
    imageUploadElement = await this.documentImageInput.getInputElement();
    this.facade.takePhoto(imageUploadElement);
  }

  /**
   * @summary Called on click event on the image boxes if its on web. Calls facade to upload
   *
   * @async
   * @param {DocumentImageType} type
   * @returns {Promise<void>}
   * @memberOf ChangeNameRequiredDocumentsPage
   */
  async uploadImage(): Promise<void> {
    let imageUploadElement: HTMLInputElement;
    imageUploadElement = await this.documentImageInput.getInputElement();
    this.facade.uploadImage(imageUploadElement);
  }
}
