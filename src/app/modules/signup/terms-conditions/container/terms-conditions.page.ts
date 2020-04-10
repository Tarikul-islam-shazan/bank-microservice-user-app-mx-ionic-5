import { Component, OnInit } from '@angular/core';
import { TncDocument } from '@app/core';
import { SignUpTermsConditionFacade } from '../facade';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.page.html',
  styleUrls: ['./terms-conditions.page.scss']
})
export class TermsConditionsPage implements OnInit {
  isTermsAccepted1 = false;
  isTermsAccepted2 = false;
  isTermsAccepted3 = false;
  isTermsAccepted4 = false;
  isTermsAccepted5 = false;
  processId: string;
  showCorporateTnc = false;
  corporateTnCAccepted = false;
  corporateTnCNotAccepted = false;
  termsConditions: TncDocument[];

  constructor(public facade: SignUpTermsConditionFacade) {}

  ngOnInit() {
    this.getTermsConditions();
  }
  showPdf(pdf: string, title: string): void {
    this.facade.openPdfViewer({ base64DataOrUrl: pdf, pdfTitle: title });
  }
  getTermsConditions() {
    this.facade.getTermsConditions().subscribe(resp => {
      this.processId = resp.processId;
      this.termsConditions = resp.termsAndConditions;
      if (resp.showCorporateTnc) {
        this.showCorporateTnc = resp.showCorporateTnc;
        this.corporateTnCAccepted = true;
      }
    });
  }

  isTermsAccepted(): boolean {
    return (
      this.isTermsAccepted1 &&
      this.isTermsAccepted2 &&
      this.isTermsAccepted3 &&
      this.isTermsAccepted4 &&
      this.isTermsAccepted5
    );
  }

  async acceptTermsConditions() {
    if (this.isTermsAccepted()) {
      this.facade.acceptTermsCondition(this.processId, this.corporateTnCAccepted);
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
