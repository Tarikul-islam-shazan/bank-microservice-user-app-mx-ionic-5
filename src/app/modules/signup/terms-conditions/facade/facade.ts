import { Injectable } from '@angular/core';
import { SignUpService, SettingsService, TncDocument } from '@app/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountApprovedModalComponent } from '@app/signup/components/account-approved-modal';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { UserSettings } from '@app/core/models/app-settings';
import { IPDFContent, PdfViewerService } from '@app/core/services/pdf-viewer.service';
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
    private readonly analyticsService: AnalyticsService,
    private settingsService: SettingsService,
    private pdfService: PdfViewerService
  ) {}

  getTermsConditions(): Observable<TncDocument[]> {
    return this.service.getTermsConditions();
  }

  getTermsConditionBase64String(code: string) {
    return this.service.getTermsConditionBase64String(code).toPromise();
  }

  acceptTermsCondition() {
    this.service.acceptTermsCondition().subscribe(resp => {
      this.analyticsService.logEvent(AnalyticsEventTypes.TermsAndConditionsAgreed);
      this.openApprovedModal();
    });
  }

  async openApprovedModal() {
    const userSettings: UserSettings = this.settingsService.getSettings().userSettings;
    userSettings.disabledSignUp = true;
    this.settingsService.setUserSettings(userSettings);
    const modal = await this.modalCtrl.create({
      component: AccountApprovedModalComponent
    });
    modal.present();
    await modal.onDidDismiss();
    this.router.navigate(['/signup/account-funding']);
  }

  openPdfViewer(pdfContent: IPDFContent): void {
    this.pdfService.openPDFFromBase64Data(pdfContent);
  }
}
