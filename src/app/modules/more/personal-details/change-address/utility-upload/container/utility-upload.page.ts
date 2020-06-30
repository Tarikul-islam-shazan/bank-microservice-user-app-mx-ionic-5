import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityUploadFacade } from '../facade/utility.facade';
import { IonInput } from '@ionic/angular';
import { DropdownOption } from '@app/signup/models/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICustomer, IAddress } from '@app/core';

@Component({
  selector: 'mbc-utility-upload',
  templateUrl: './utility-upload.page.html',
  styleUrls: ['./utility-upload.page.scss']
})
export class UtilityUploadPage implements OnInit {
  @ViewChild('documentImageInput', { static: false }) documentImageInput: IonInput;
  utitlityOptions: DropdownOption[];
  utilityBillForm: FormGroup;
  customer: Partial<ICustomer> = {};
  constructor(
    private router: Router,
    public facade: UtilityUploadFacade,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params && params.address) {
        const addressArrar: IAddress[] = [params.address];
        this.customer.addresses = addressArrar;
      }
    });
  }

  ngOnInit() {
    this.setUtilityOptions();
    this.initIdentityConfirmation();
  }

  get isSubmitButtonDisabled(): boolean {
    return this.utilityBillForm.invalid || !this.facade.scannedUtilityBillImage;
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
    this.utilityBillForm = this.formBuilder.group({
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

  continue(): void {
    if (!this.isSubmitButtonDisabled) {
      this.facade.continue(this.customer);
    }
  }
}
