/**
 * Facade: ScanId facade
 * Details: To verify User ID
 * Date: March 06, 2020
 * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
 */
import { Injectable, NgZone } from '@angular/core';
import { JumioService } from '@app/signup/scan-id/services';
import {
  DocumentType,
  IJumioErrorResponse,
  IJumioSuccessResponse,
  JumioPlatformType,
  JumioResponseType
} from '@app/signup/scan-id/models';
import { IdentityType, IScannedIdData, UIInfo } from '@app/core/models';
import { JumioApiService, Logger, LogglyLoggerService } from '@app/core/services';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IMeedModalContent, ModalService } from '@app/shared/services/modal.service';

const log = new Logger('ScanIDFacade');
@Injectable()
export class ScanIDFacade {
  jumioProcessingDone = false;
  jumioWebInitialized: Observable<string> = this.jumioService.webIframeUrl$;
  constructor(
    private jumioService: JumioService,
    private jumioApiService: JumioApiService,
    private router: Router,
    private modalService: ModalService,
    private analytics: AnalyticsService,
    private ngZone: NgZone,
    private logglyLogger: LogglyLoggerService
  ) {}

  /**
   * Details: open Jumio and listening its succss and error response
   *
   * @memberof ScanIDFacade
   * Ticket: GMA-4317
   * Details: Sign Up>Scan Identity>Jumio might be not sending user name to backend and refactor code
   * Date: March 06, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  startNetverify(): void {
    this.loggerEvent({ name: AnalyticsEventTypes.IdVerificationStarted });
    this.jumioService
      .startNetverify()
      .pipe(take(1))
      .subscribe((parsedDocument: IJumioSuccessResponse | IJumioErrorResponse) => {
        if (parsedDocument.status !== JumioResponseType.SUCCESS) {
          this.loggerEvent({ name: AnalyticsEventTypes.IdVerificationFailed, message: parsedDocument });
          this.openErrorInfoModal();
        } else {
          this.jumioProcessingDone = true;
          const parsedDocumentData = parsedDocument as IJumioSuccessResponse;
          this.loggerEvent({ name: AnalyticsEventTypes.IdVerificationCompleted, message: parsedDocument });
          this.storeScannedIdData(parsedDocumentData);
          /**
           * Jumio service startNetverify is a jumio cordova subscription.
           * This subscription execute outside the angular zone.
           * So angular routing inside cordova plugin should trigger angular zone
           * Ticket: GMA-4644
           * Issue: Signup: "Next" button Activate/Deactivate takes more time than usual.
           * Date: March 9 2020
           * @author sanitul hassan <sanitul@bs-23.com>
           */
          if (parsedDocumentData.jumioPlatform === JumioPlatformType.NATIVE) {
            this.ngZone.run(() => {
              this.router.navigate(['/signup/general-information']);
            });
          }
        }
      });
  }

  /**
   * Details: log logger and analytics event
   * Issues:
   * GMA-4766 - Signup: jumio response log into logger UI,
   * MM2-180: Need to send inner object as stringify for loggly record.
   * Date: April 21, 2020
   * Developer: Utpaul <Utpal.Sarkar@brainstation23.com>
   * @memberof ScanIDFacade
   */
  loggerEvent(context: UIInfo) {
    context.message = context.message ? JSON.stringify(context.message) : {};
    this.analytics.logEvent(context.name, context.message);
    this.logglyLogger.logUI(context).subscribe();
  }
  /**
   * Details: Showing Jumio camera permission error
   *
   * @memberof ScanIDFacade
   */
  async openErrorInfoModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          details: ['info-modal-module.scan-id.jumio-camera-permission-error-message']
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }

  /**
   * Create jumio scan object based on jumio scan response from jumio web or device sdk
   * Map jumio document type with bank application identity Type
   * Default document type DrivingLicence
   * Jumio returns document type DRIVER_LICENSE on iOS and DRIVING_LICENSE on Android
   * Issues covers: [GMA-4447]Identity Document type is not pre-selected
   * Date: February 18, 2020
   * Developer: Sanitul <sanitul@bs-23.com>
   * @param {JumioResponse} jumioDocumentData
   * @memberof ScanIDFacade
   */
  storeScannedIdData(jumioDocumentData: IJumioSuccessResponse): void {
    let identificationType: IdentityType = IdentityType.DrivingLicence;
    switch (jumioDocumentData.selectedDocumentType) {
      case DocumentType.DRIVER_LICENSE:
      case DocumentType.DRIVING_LICENSE:
        identificationType = IdentityType.DrivingLicence;
        break;
      case DocumentType.PASSPORT:
        identificationType = IdentityType.Passport;
        break;
      case DocumentType.IDENTITY_CARD:
        identificationType = IdentityType.StateId;
        break;
      default:
        identificationType = IdentityType.DrivingLicence;
        break;
    }
    const jumioScannedIdData: IScannedIdData = {
      reference: jumioDocumentData.scanReference,
      extractionMethod: jumioDocumentData.extractionMethod ? jumioDocumentData.extractionMethod : '',
      firstName: jumioDocumentData.firstName ? jumioDocumentData.firstName.trim() : '',
      lastName: jumioDocumentData.lastName ? jumioDocumentData.lastName : '',
      dateOfBirth: jumioDocumentData.dob
        ? moment(jumioDocumentData.dob.toString().split('T')[0]).format('YYYY-MM-DD')
        : '',
      gender: jumioDocumentData.gender ? jumioDocumentData.gender.toLowerCase() : '',
      addressLine: jumioDocumentData.addressLine ? jumioDocumentData.addressLine : '',
      postCode: jumioDocumentData.postCode ? jumioDocumentData.postCode : '',
      subdivision: jumioDocumentData.subdivision ? jumioDocumentData.subdivision : '',
      country: jumioDocumentData.selectedCountry ? jumioDocumentData.selectedCountry : '',
      identificationType,
      idNumber: jumioDocumentData.idNumber ? jumioDocumentData.idNumber : '',
      issuingCountry: jumioDocumentData.issuingCountry ? jumioDocumentData.issuingCountry : '',
      issuingDate: jumioDocumentData.issuingDate
        ? moment(jumioDocumentData.issuingDate.toString().split('T')[0]).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD'),
      expiryDate: jumioDocumentData.expiryDate
        ? moment(jumioDocumentData.expiryDate.toString().split('T')[0]).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD'),
      city: jumioDocumentData.city ? jumioDocumentData.city : ''
    };
    this.jumioApiService.scannedIdData = jumioScannedIdData;
  }
  /**
   * Details: navigate to signup Personal and send logevent
   *
   * @memberof ScanIDFacade
   * Ticket: GMA-4317
   * Details: Sign Up>Scan Identity>Jumio might be not sending user name to backend and refactor code
   * Date: March 06, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  gotoSignupGeneralInformation() {
    this.analytics.logEvent(AnalyticsEventTypes.IdVerificationCompleted);
    this.router.navigate(['/signup/general-information']);
  }

  /**
   *
   * Details: cancel Jumio Operation and send logevent
   * @memberof ScanIDFacade
   */
  cancelJumioWeb() {
    this.analytics.logEvent(AnalyticsEventTypes.IdVerificationCanceled);
    this.jumioService.cancelWebInitialized();
  }
}
