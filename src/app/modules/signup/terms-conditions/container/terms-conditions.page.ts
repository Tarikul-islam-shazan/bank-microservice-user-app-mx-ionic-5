import { Component, OnInit } from '@angular/core';
import { TncDocument } from '@app/core';
import { SignUpTermsConditionFacade } from '../facade';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss']
})
export class TermsConditionsPage implements OnInit {
  termsConditions: TncDocument[] = [];
  termsConditionForm: FormGroup;
  hasCorporateTnc = true;
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
      this.termsConditions = resp;
      this.termsConditions.forEach((tc, i) => {
        this.termsConditionForm.addControl(
          `tc${i}`,
          new FormControl(false, [Validators.required, Validators.requiredTrue])
        );
      });
      if (this.hasCorporateTnc) {
        this.termsConditionForm.addControl('corporateTnCAccepted', new FormControl(false));
        this.termsConditionForm.addControl('corporateTnCNotAccepted', new FormControl(false));
      }
      // if (resp.showCorporateTnc) {
      //   this.showCorporateTnc = resp.showCorporateTnc;
      //   this.corporateTnCAccepted = true;
      // }
    });
  }

  async acceptTermsConditions() {
    if (
      this.termsConditionForm.valid &&
      (this.termsConditionForm.controls.corporateTnCAccepted.value === true ||
        this.termsConditionForm.controls.corporateTnCNotAccepted.value === true)
    ) {
      // console.log(this.termsConditionForm);
      // console.log('============================');
      // console.log(
      //   this.termsConditionForm.controls.corporateTnCAccepted.value === true ||
      //     this.termsConditionForm.controls.corporateTnCNotAccepted.value === true
      // );
      // this.facade.acceptTermsCondition();
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
    }
  }
}
