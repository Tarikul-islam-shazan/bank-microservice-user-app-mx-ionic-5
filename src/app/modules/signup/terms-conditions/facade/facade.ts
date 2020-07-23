import { Injectable } from '@angular/core';
import { SignUpService } from '@app/core/services/sign-up-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountApprovedModalComponent } from '@app/signup/components/account-approved-modal';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { UserSettings } from '@app/core/models/app-settings';
import { IPDFContent, PdfViewerService } from '@app/core/services/pdf-viewer.service';
import { IMeedModalContent, ModalService } from '@app/shared/services/modal.service';
import { TncResponse } from '@app/core/models/dto/signup';
import { SettingsService } from '@app/core/services/settings.service';
/**
 * * Issue: MM2-56
 * * Issue Details: Terms & Conditions - Screen
 * * Developer Feedback: Feature Implemented
 * Date: May 12, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */

@Injectable()
export class SignUpTermsConditionFacade {
  constructor(
    private service: SignUpService,
    private router: Router,
    private modalCtrl: ModalController,
    private analytics: AnalyticsService,
    private settingsService: SettingsService,
    private pdfService: PdfViewerService,
    private modalService: ModalService
  ) {}

  getTermsConditions(): Observable<TncResponse> {
    return this.service.getTermsConditions();
  }

  getTermsConditionBase64String(code: string) {
    return this.service.getTermsConditionBase64String(code).toPromise();
  }

  submitTermsCondition(hasCorporateTnc: boolean, corporateTnCAccepted: boolean, nextPage: string) {
    if (hasCorporateTnc && !corporateTnCAccepted) {
      this.corporateNotAcceptedAssuranceModal(corporateTnCAccepted, nextPage);
    } else {
      this.acceptTermsCondition(corporateTnCAccepted, nextPage);
    }
  }

  acceptTermsCondition(corporateTnCAccepted: boolean, nextPage: string) {
    this.service.acceptTermsCondition(corporateTnCAccepted).subscribe(resp => {
      this.analytics.logEvent(AnalyticsEventTypes.TermsAndConditionsAgreed);
      this.openApprovedModal(corporateTnCAccepted, nextPage);
    });
  }

  async openApprovedModal(corporateTnCAccepted: boolean, nextPage: string) {
    const userSettings: UserSettings = this.settingsService.getSettings().userSettings;
    userSettings.disabledSignUp = true;
    this.settingsService.setUserSettings(userSettings);
    const modal = await this.modalCtrl.create({
      component: AccountApprovedModalComponent
    });
    modal.present();
    await modal.onDidDismiss();
    // this.router.navigate(['/signup/account-funding']);

    if (corporateTnCAccepted) {
      if (nextPage) {
        this.router.navigate([`/signup/${nextPage}`]);
      } else {
        this.router.navigate(['/signup/account-funding']);
      }
    } else {
      this.router.navigate(['/signup/account-funding']);
    }
  }

  openPdfViewer(pdfContent: IPDFContent): void {
    this.pdfService.openPDFFromBase64Data(pdfContent);
  }

  async corporateNotAcceptedAssuranceModal(corporateTnCAccepted: boolean, nextPage: string): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          details: [
            'signup-module.terms-conditions-page.corporate-terms-not-accepted-assurance-modal.corporate-terms-not-accepted-modal-text-1',
            'signup-module.terms-conditions-page.corporate-terms-not-accepted-assurance-modal.corporate-terms-not-accepted-modal-text-2'
          ]
        }
      ],
      actionButtons: [
        {
          text: 'signup-module.terms-conditions-page.corporate-terms-not-accepted-assurance-modal.okay-button',
          cssClass: 'white-button',
          handler: () => {
            this.modalService.close();
            this.acceptTermsCondition(corporateTnCAccepted, nextPage);
          }
        },
        {
          text: 'signup-module.terms-conditions-page.corporate-terms-not-accepted-assurance-modal.cancel-button',
          cssClass: 'cancel-button',
          handler: () => {
            this.modalService.close();
          }
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
