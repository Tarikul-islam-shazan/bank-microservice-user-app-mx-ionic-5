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
    });
  }

  async acceptTermsConditions() {
    if (this.termsConditionForm.valid) {
      this.facade.acceptTermsCondition();
    }
  }
}
