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
  utilityBillForm: FormGroup;
  constructor(private router: Router, public facade: UtilityUploadFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setUtilityOptions();
    this.initUtilityBill();
  }

  get isSubmitButtonDisabled(): boolean {
    return this.utilityBillForm.invalid || !this.facade.scannedUtilityBillImage;
  }

  private setUtilityOptions(): void {
    this.facade.getUtilityOptions().subscribe(utilityDocument => {
      this.utitlityOptions = utilityDocument;
    });
  }

  private initUtilityBill(): void {
    this.utilityBillForm = this.formBuilder.group({
      utilityDocument: [null, Validators.required]
    });
  }

  openModal(): void {
    this.facade.openUtilityModal(this.utitlityOptions, (selectedUtility: DropdownOption) => {
      this.utilityBillForm.controls.utilityDocument.patchValue(selectedUtility.text);
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

  async uploadImage(): Promise<void> {
    let imageUploadElement: HTMLInputElement;
    imageUploadElement = await this.documentImageInput.getInputElement();
    this.facade.uploadImage(imageUploadElement);
  }

  continue(): void {
    if (!this.isSubmitButtonDisabled) {
      this.facade.continue();
    }
  }
}
