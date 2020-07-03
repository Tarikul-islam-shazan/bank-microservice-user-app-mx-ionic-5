import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityUploadFacade } from '../facade/utility.facade';
import { IonInput } from '@ionic/angular';
import { DropdownOption } from '@app/signup/models/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'utility-upload',
  templateUrl: './utility-upload.page.html',
  styleUrls: ['./utility-upload.page.scss']
})
export class UtilityUploadPage implements OnInit {
  @ViewChild('documentImageInput', { static: false }) documentImageInput: IonInput;
  utitlityOptions: DropdownOption[];
  utilityBillForm: FormGroup;
  constructor(private router: Router, public facade: UtilityUploadFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setUtilityOptions();
    this.initUtilityBill();
    this.facade.utilityBillImage = '';
  }

  /**
   * this is to check if the form and scanned image is valid or not
   *
   * @readonly
   * @type {boolean}
   * @memberof UtilityUploadPage
   */
  get isSubmitButtonDisabled(): boolean {
    return this.utilityBillForm.invalid || !this.facade.scannedUtilityBillImage;
  }

  /**
   * loading the utility uplaod options
   *
   * @private
   * @memberof UtilityUploadPage
   */
  private setUtilityOptions(): void {
    this.facade.getUtilityOptions().subscribe(utilityDocument => {
      this.utitlityOptions = utilityDocument;
    });
  }

  /**
   * Initializing the utility form
   *
   * @private
   * @memberof UtilityUploadPage
   */
  private initUtilityBill(): void {
    this.utilityBillForm = this.formBuilder.group({
      utilityDocument: [null, Validators.required]
    });
  }

  /**
   * Opening the modal to show the uility options
   *
   * @memberof UtilityUploadPage
   */
  openModal(): void {
    this.facade.openUtilityModal(this.utitlityOptions, (selectedUtility: DropdownOption) => {
      this.utilityBillForm.controls.utilityDocument.patchValue(selectedUtility.text);
    });
  }

  dismiss() {
    this.router.navigate([`/more/personal-details/change-address`]);
  }

  /**
   * this method is use for uploading the doc from the web or from device
   *
   * @returns {Promise<void>}
   * @memberof UtilityUploadPage
   */
  async takePhoto(): Promise<void> {
    let imageUploadElement: HTMLInputElement;
    imageUploadElement = await this.documentImageInput.getInputElement();
    this.facade.takePhoto(imageUploadElement);
  }

  /**
   * This method displays the uploaded pic in the UI
   *
   * @returns {Promise<void>}
   * @memberof UtilityUploadPage
   */
  async uploadImage(): Promise<void> {
    let imageUploadElement: HTMLInputElement;
    imageUploadElement = await this.documentImageInput.getInputElement();
    this.facade.uploadImage(imageUploadElement);
  }

  /**
   * if the form is valid this function allows the user to submit the data to the server
   *
   * @memberof UtilityUploadPage
   */
  continue(): void {
    if (!this.isSubmitButtonDisabled) {
      this.facade.continue();
    }
  }
}
