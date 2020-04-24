/**
 * Service: ScanId Service
 * Details: Send weburl and jumio response to facade
 * Date: March 06, 2020
 * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { AppPlatform } from '@app/core/util/app-platform';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  IJumioSuccessResponse,
  IJumioErrorResponse,
  IJumioWebInitiateResponse,
  JumioResponseType,
  IJumioWebInitiate,
  JumioPlatformType
} from '@app/signup/scan-id/models';
import { DomSanitizer } from '@angular/platform-browser';
import { SignUpService } from '@app/core/services/sign-up-service.service';
import { JumioApiService } from '@app/core/services/jumio-api.service';
import { SettingsService } from '@app/core/services/settings.service';

declare var Jumio: any;
@Injectable()
export class JumioService {
  iframeUrl = new BehaviorSubject<string>('');
  _iframeUrl$ = this.iframeUrl.asObservable();
  jumioResponse = new Subject<IJumioSuccessResponse | IJumioErrorResponse>();
  callBackUrl: string;
  constructor(
    private appPlatform: AppPlatform,
    private signupService: SignUpService,
    private jumioApiService: JumioApiService,
    private sanitizer: DomSanitizer,
    private settingsService: SettingsService
  ) {
    /**
     * dynamically bank identifier and member id
     */
    this.callBackUrl = `${environment.jumio.callbackUrl}/${
      this.settingsService.getSettings().userSettings.bankIdentifier
    }/${this.signupService.member._id}`;
  }

  /**
   * Details: return platform is cordova or not
   *
   * @readonly
   * @type {boolean}
   * @memberof JumioService
   */
  get isNative(): boolean {
    return this.appPlatform.isCordova();
  }
  /**
   * Details: Return webIframeUrl
   *
   * @readonly
   * @type {Observable<string>}
   * @memberof JumioService
   */
  get webIframeUrl$(): Observable<string> {
    return this._iframeUrl$;
  }
  /**
   * Details: Set value to BehaviorSubject
   *
   * @param {string} [urlpath='']
   * @memberof JumioService
   */
  updateIframeUrl(urlpath: string = ''): void {
    this.iframeUrl.next(urlpath);
  }
  /**
   * Details: cancle cancelWebInitialized for
   *
   * @memberof JumioService
   */
  cancelWebInitialized() {
    this.updateIframeUrl();
    window.removeEventListener('message', events => {});
  }
  /**
   * Details: initialize Netverify NativeSDK for device
   *
   * @memberof JumioService
   */
  initializeNetverifyNativeSDK() {
    Jumio.initNetverify(environment.jumio.apiToken, environment.jumio.apiSecret, environment.jumio.dataCenter, {
      requireVerification: false,
      userReference: this.signupService.member.username,
      callbackUrl: this.callBackUrl,
      preselectedCountry: environment.jumio.customerIssuingCountry,
      cameraPosition: 'BACK',
      documentTypes: environment.jumio.documentTypes,
      enableWatchlistScreening: 'ENABLED'
    });
  }

  get webRequestData(): IJumioWebInitiate {
    return {
      customerInternalReference: this.signupService.member.username,
      userReference: this.signupService.member.username,
      callbackUrl: this.callBackUrl
    };
  }
  /**
   * Details: Return Observable data of IJumioSuccessResponse or IJumioErrorResponse data for web and native device
   *
   * @returns {(Observable<IJumioSuccessResponse | IJumioErrorResponse>)}
   * @memberof JumioService
   */
  startNetverify(): Observable<IJumioSuccessResponse | IJumioErrorResponse> {
    if (this.isNative) {
      this.startNetverifyNativeSDK();
    } else {
      this.startNetverifyWeb();
    }
    return this.jumioResponse.asObservable();
  }
  /**
   * Details: startNetverifyNativeSDK for native device
   *
   * @memberof JumioService
   */
  startNetverifyNativeSDK() {
    this.initializeNetverifyNativeSDK();
    Jumio.startNetverify(
      (documentData: IJumioSuccessResponse) => {
        const nativeSuccessData: IJumioSuccessResponse = { ...documentData };
        nativeSuccessData.status = JumioResponseType.SUCCESS;
        nativeSuccessData.jumioPlatform = JumioPlatformType.NATIVE;
        this.jumioResponse.next(nativeSuccessData);
      },
      (error: IJumioErrorResponse) => {
        const nativeError: IJumioErrorResponse = { ...error };
        nativeError.status = JumioResponseType.ERROR;
        this.jumioResponse.next(nativeError);
      }
    );
  }
  /**
   * Details: startNetverifyWeb for web
   *
   * @memberof JumioService
   */
  startNetverifyWeb() {
    this.jumioApiService.jumioWebInitiate(this.webRequestData).subscribe(
      (response: IJumioWebInitiateResponse) => {
        const iframeRedirectUrl = this.sanitizer.bypassSecurityTrustResourceUrl(response.redirectUrl);
        this.updateIframeUrl(iframeRedirectUrl as string);
        window.addEventListener('message', events => {
          if (events.origin === environment.jumio.iframeOrigin) {
            const jumioIframeData = JSON.parse(events.data);
            if (jumioIframeData.payload.value === 'success') {
              this.jumioResponse.next({
                scanReference: jumioIframeData.transactionReference,
                status: JumioResponseType.SUCCESS,
                jumioPlatform: JumioPlatformType.WEB
              } as IJumioSuccessResponse);
            }
          }
        });
      },
      error => {
        const webError: IJumioErrorResponse = { errorCode: error.error.code, errorMessage: error.error.message };
        webError.status = JumioResponseType.ERROR;
        this.jumioResponse.next(error);
      }
    );
  }
}
