import { Component, OnInit } from '@angular/core';
import { TncResponse } from '@app/core/models/dto/signup';
import { SignUpTermsConditionFacade } from '../facade';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss']
})
export class TermsConditionsPage implements OnInit {
  tncResponse: Partial<TncResponse> = {};
  termsConditionForm: FormGroup;
  corporateTnCAccepted = false;
  corporateTnCNotAccepted = false;
  constructor(private formBuilder: FormBuilder, public facade: SignUpTermsConditionFacade) {}

  ngOnInit() {
    this.getTermsConditions();
    this.initForm();
  }
  initForm() {
    this.termsConditionForm = this.formBuilder.group({});
  }
  async showPdf(code: string, title: string) {
    const doc = await this.facade.getTermsConditionBase64String(code);
    this.facade.openPdfViewer({ base64DataOrUrl: doc.document, pdfTitle: title });
  }
  getTermsConditions() {
    this.facade.getTermsConditions().subscribe(resp => {
      this.tncResponse = { ...resp };
      this.tncResponse.termsAndConditions.forEach((tc, i) => {
        this.termsConditionForm.addControl(
          `tc${i}`,
          new FormControl(false, [Validators.required, Validators.requiredTrue])
        );
      });
      if (this.tncResponse.tncOptions.hasCorporateTnc) {
        this.termsConditionForm.addControl('corporateTnCAccepted', new FormControl(false, Validators.required));
        this.termsConditionForm.addControl('corporateTnCNotAccepted', new FormControl(false, Validators.required));
      }
    });
  }

  acceptTermsConditions(): void {
    if (this.validateTNC()) {
      this.facade.submitTermsCondition(
        this.tncResponse.tncOptions.hasCorporateTnc,
        this.corporateTnCAccepted,
        this.tncResponse.tncOptions.nextPage
      );
    }
  }
  /**
   * This method check or uncheck "ion-checkbox" for
   * Ok to Share or Do Not Share checkbox.
   *
   * @param null
   * @returns null
   */
  onCorporateTnCAccepted(event): void {
    if (event.target.checked) {
      this.corporateTnCAccepted = event.target.checked;
      this.corporateTnCNotAccepted = !this.corporateTnCAccepted;
      this.termsConditionForm.controls.corporateTnCAccepted.patchValue(this.corporateTnCAccepted);
      this.termsConditionForm.controls.corporateTnCNotAccepted.patchValue(this.corporateTnCNotAccepted);
    } else {
      this.corporateTnCAccepted = event.target.checked;
      this.termsConditionForm.controls.corporateTnCAccepted.patchValue(this.corporateTnCAccepted);
    }
  }

  /**
   * This method check or uncheck "ion-checkbox" for
   * Ok to Share or Do Not Share checkbox.
   *
   * @param null
   * @returns null
   */
  onCorporateTnCNotAccepted(event): void {
    if (event.target.checked) {
      this.corporateTnCNotAccepted = event.target.checked;
      this.corporateTnCAccepted = !this.corporateTnCNotAccepted;
      this.termsConditionForm.controls.corporateTnCAccepted.patchValue(this.corporateTnCAccepted);
      this.termsConditionForm.controls.corporateTnCNotAccepted.patchValue(this.corporateTnCNotAccepted);
    } else {
      this.corporateTnCNotAccepted = event.target.checked;
      this.termsConditionForm.controls.corporateTnCNotAccepted.patchValue(this.corporateTnCNotAccepted);
    }
  }

  validateTNC(): boolean {
    if (this.tncResponse.tncOptions !== undefined && this.tncResponse.tncOptions.hasCorporateTnc) {
      return this.termsConditionForm.valid && (this.corporateTnCAccepted || this.corporateTnCNotAccepted);
    } else {
      return this.termsConditionForm.valid;
    }
  }
}
