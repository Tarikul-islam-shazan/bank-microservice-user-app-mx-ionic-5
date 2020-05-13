import { Injectable } from '@angular/core';
import { SignUpService, TncResponse, AccountType, SettingsService } from '@app/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountApprovedModalComponent } from '@app/signup/components/account-approved-modal';
import { AccountDenyModalComponent } from '@app/signup/components/account-deny-modal';
import { UrbanAirshipService } from '@app/core/services/urban-airship.service';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { UserSettings } from '@app/core/models/app-settings';
import { IPDFContent, PdfViewerService } from '@app/core/services/pdf-viewer.service';
@Injectable()
export class SignUpTermsConditionFacade {
  constructor(
    private service: SignUpService,
    private router: Router,
    private modalCtrl: ModalController,
    private urbanAirshipService: UrbanAirshipService,
    private analytics: AnalyticsService,
    private settingsService: SettingsService,
    private pdfService: PdfViewerService
  ) {}

  getTermsConditions(): Observable<TncResponse> {
    return this.service.getTermsConditions();
  }

  acceptTermsCondition(processId: string, corporateTnCAccepted: boolean) {
    this.service.acceptTermsCondition(processId, corporateTnCAccepted).subscribe(
      resp => {
        const ddaAccount = resp.accounts.filter(account => {
          return account.accountType === AccountType.DDA;
        })[0];
        if (!ddaAccount.isHold) {
          this.urbanAirshipService.updateEmailChannel();
          this.analytics.logEvent(AnalyticsEventTypes.TermsAndConditionsAgreed);
          this.openApprovedModal();
        } else {
          this.openDenyModal();
        }
      },
      err => {
        throw err;
      }
    );
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
  async openDenyModal() {
    const modal = await this.modalCtrl.create({
      component: AccountDenyModalComponent
    });
    modal.present();
    await modal.onDidDismiss();
    this.router.navigate(['/login-user']);
  }

  /**
   * Issue: Fix/GMA-4656
   * Details: Terms & Condition: PDF's are not opening.
   * Date: 05-March-2020
   * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
   *
   * @param {pdfContent: IPDFContent}
   * @returns { null }
   */
  openPdfViewer(pdfContent: IPDFContent): void {
    this.pdfService.openPDFFromBase64Data(pdfContent);
  }
}
