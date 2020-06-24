import { Component, OnInit } from '@angular/core';
import { TncDocument } from '@app/core';
import { SignUpTermsConditionFacade } from '../facade';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss']
})
export class TermsConditionsPage implements OnInit {
  termsConditions: TncDocument[] = [];
  termsConditionForm: FormGroup;
  showCorporateTnc = false;
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
      if (true) {
        this.termsConditionForm.addControl(
          'corporateTnCAccepted',
          new FormControl(false, [Validators.required, Validators.requiredTrue])
        );
        this.termsConditionForm.addControl(
          'corporateTnCNotAccepted',
          new FormControl(false, [Validators.required, Validators.requiredTrue])
        );
      }
      // if (resp.showCorporateTnc) {
      //   this.showCorporateTnc = resp.showCorporateTnc;
      //   this.corporateTnCAccepted = true;
      // }
    });
  }

  async acceptTermsConditions() {
    if (this.termsConditionForm.valid) {
      this.facade.acceptTermsCondition();
    }
  }

  /**
   * This method check or uncheck "ion-checkbox" for
   * Ok to Share or Do Not Share checkbox.
   *
   * @param null
   * @returns null
   */
  onCorporateTnCAccepted(): void {
    if (!this.corporateTnCAccepted) {
      this.corporateTnCNotAccepted = true;
      this.termsConditionForm.controls.corporateTnCAccepted.patchValue(true);
      this.termsConditionForm.controls.corporateTnCNotAccepted.patchValue(false);
    } else {
      this.corporateTnCNotAccepted = false;
    }
  }

  /**
   * This method check or uncheck "ion-checkbox" for
   * Ok to Share or Do Not Share checkbox.
   *
   * @param null
   * @returns null
   */
  onCorporateTnCNotAccepted(): void {
    if (!this.corporateTnCNotAccepted) {
      this.corporateTnCAccepted = true;
    } else {
      this.corporateTnCAccepted = false;
    }
  }
}
