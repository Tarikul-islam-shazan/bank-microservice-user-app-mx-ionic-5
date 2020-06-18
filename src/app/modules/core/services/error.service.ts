import * as moment from 'moment';
import { CrashalyticsService } from '@app/core/services/crashalytics.service';
import { environment } from '@env/environment';
import { ErrorCode, MeedErrorResponse, UIError } from '@app/core/models/error-types';
import { HttpErrorResponse } from '@angular/common/http';
import { IMeedModalComponentProps, IMeedModalContent, ModalService } from '@app/shared/services/modal.service';
import { Injectable } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { LogglyLoggerService } from '@app/core/services/loggly-logger.service';
import { MemberService } from './member.service';
import { Router } from '@angular/router';
import { LogoutReason, LogoutService } from '@app/core/services/logout.service';
import * as StackTrace from 'stacktrace-js';

/**
 * * Issue: GMA-4366
 * * Issue Details: MMP-773 MMP 2.2: Password Reset
 *  -- Invalid error message when the user account is locked due to 5 incorrect password tries.
 * * Developer Feedback: implement custom modal for specific case
 * * Date: February 25, 2020
 * *Developer: Zahidul Islam <zahidul@bs-23.net>
 * @export
 * @class ErrorService
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(
    private crashalytics: CrashalyticsService,
    private locationStrategy: LocationStrategy,
    private logglyLoggerService: LogglyLoggerService,
    private memberService: MemberService,
    private modalService: ModalService,
    private router: Router,
    private logoutService: LogoutService
  ) {}

  /**
   *  A function used to show modal info when errors occured in response.
   *
   *  Issue: GMA-4228
   *  Prevent calling showInfoErrorModal function when MeedErrorResponse code is 404.
   *  For MeedErrorResponse code 404 calling showChangePasswordInfoErrorModal() fuction
   *  for showing error message modal.
   * @param {MeedErrorResponse} errorResponse
   * @memberof ErrorService
   */

  /**
   * Issue: GMA-4399
   * Details:  Multiple inquiries (transactions) in the FIS database although it should have been one inquiry
   * Date: March 09, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  async handleApiError(httpErrorResponse: HttpErrorResponse) {
    const { status } = httpErrorResponse;
    let { error: errorResponse } = httpErrorResponse;
    // If network is not available we create an error
    if (status.toString() === ErrorCode.NetworkNotAvailable) {
      errorResponse = { code: ErrorCode.NetworkNotAvailable } as MeedErrorResponse;
    }
    // If OTP error happens
    if (status.toString() === ErrorCode.OTPrequired) {
      errorResponse = { code: ErrorCode.OTPrequired } as MeedErrorResponse;
    }
    if (errorResponse) {
      const { code, message } = errorResponse as MeedErrorResponse;
      switch (code) {
        case ErrorCode.LockedAccount:
          // locked account modal for forgot password
          this.modalService.showInfoErrorModal(errorResponse, this.getForgotPassLockedAccountCompProps(errorResponse));
          break;
        case ErrorCode.NewVerificationCodeRequired:
          // 1102 comes when the user enters wrong verification code 3 times, but no modal should be shown.
          // That's why breaking the case without doing anything
          break;
        case ErrorCode.OTPrequired:
          // this is otp error, so its not really an error, but in future we can display OTP popup here.
          break;
        case ErrorCode.SamePassword:
          // same password error modal show
          this.modalService.showInfoErrorModal(errorResponse, this.getChangePasswordInfoErrorCommponentProps());
          break;
        case ErrorCode.TexPayerIdAlreadyAssigned:
          this.modalService.openInfoModalComponent(this.texPayerIdAlreadyAssignedComponentProps(code, message));
          break;
        case ErrorCode.ServiceUnavilableOnCountry:
          /**
           * Issue:  GMA-4824
           * Details: incorrect message shows for unsupported country
           * Date: April 06, 2020
           * Developer: Baten <md.abdul@brainstation23.com>
           */
          const modalComponentProps = this.getUnavailableCountryModalComp(code);
          this.modalService.openInfoModalComponent(modalComponentProps);
          break;
        case ErrorCode.SessionTimeout:
        case ErrorCode.AuthenticationTokenMissing:
        case ErrorCode.AuthenticationTokenInvalidOrExpired:
          await this.logoutUser(code);
          break;
        case ErrorCode.InvalidInviteeEmail:
          const componentProps = this.invalidInviteeEmailInfoModalComponentProps(code);
          this.modalService.openInfoModalComponent(componentProps);
          break;
        default:
          // default modal for all error handler except any custom case
          this.modalService.showInfoErrorModal(errorResponse);
          break;
      }
    }
  }

  /**
   * Issue:  GMA-4904
   * Details: Redirect user to login page for error codes 303,1501,1502 as logout.
   * Date: April 16, 2020
   * Developer: Md.kasuar <md.kausar@brainstation23.com>
   * @param {ErrorCode} code
   * @returns {Promise<void>}
   * @memberof ErrorService
   */
  async logoutUser(code: ErrorCode): Promise<void> {
    let logoutReason: LogoutReason;
    switch (code) {
      case ErrorCode.SessionTimeout:
        logoutReason = LogoutReason.AuthSessionTimeout;
        break;
      case ErrorCode.AuthenticationTokenMissing:
        logoutReason = LogoutReason.AuthTokenMissing;
        break;
      case ErrorCode.AuthenticationTokenInvalidOrExpired:
        logoutReason = LogoutReason.AuthTokenInValidOrExpired;
        break;
    }
    if (logoutReason) {
      this.logoutService.logoutReason = logoutReason;
      await this.router.navigateByUrl('login-user', { replaceUrl: true });
    }
  }

  /**
   *  A function used to send a UI error to some backend logging and storage provider.
   *
   * @param {Error} error
   * @memberof ErrorService
   */
  public async sendError(errorCode: Error) {
    const errorToSend = await this.addContextInfo(errorCode);
    this.crashalytics.logError(errorToSend); // send error log to crashalytics
    this.logglyLoggerService.logError(errorToSend).subscribe(); // send error log to our backend to track loggly
  }

  async addContextInfo(error: Error): Promise<UIError> {
    let stackTrace = null;
    if (!(error instanceof HttpErrorResponse)) {
      stackTrace = await StackTrace.fromError(error);
    }
    const name = error.name || null;
    const label = environment.label;
    const deployment = environment.deployment;
    const user = this.memberService.getCachedMember() ? this.memberService.getCachedMember().username : '';
    const time = new Date().getTime();
    const location = this.locationStrategy;
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const message = error.message || error.toString();
    const errorToSend: UIError = {
      name,
      label,
      deployment,
      user,
      time,
      url,
      message,
      stackTrace
    };
    return errorToSend;
  }

  // locked account modal Content for forgot password
  getForgotPassLockedAccountCompProps(errorResponse: MeedErrorResponse): IMeedModalContent {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: `error-message-module.error-title`,
          details: [`error-message-module.code-${errorResponse.code}`]
        }
      ],
      actionButtons: [
        {
          text: 'error-message-module.dismiss-button',
          cssClass: 'white-button',
          handler: () => this.modalService.close()
        }
      ]
    };

    return componentProps;
  }

  /**
   *
   *  A function is used to return IMeedModalContent for MeedErrorResponse code 404
   *  Issue: GMA-4228
   *  Date: February 28, 2020
   *  Developer: Md.Kausar <md.kausar@brainstation23.com>
   * @param {MeedErrorResponse} errorResponse
   * @returns {IMeedModalContent}
   * @memberof ErrorService
   */
  getChangePasswordInfoErrorCommponentProps(): IMeedModalContent {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'error-message-module.error-title',
          details: ['error-message-module.code-404']
        }
      ],
      actionButtons: [
        {
          text: 'login-module.change-password.btn-modal-okay',
          cssClass: 'white-button',
          handler: () => this.modalService.close()
        }
      ]
    };
    return componentProps;
  }

  /**
   * @summary gets modal component props for unsupported country modal
   *
   * @private
   * @returns {IMeedModalComponentProps}
   * @memberOf ErrorService
   */
  private getUnavailableCountryModalComp(errorCode: string): IMeedModalComponentProps {
    const modalComponentContent: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            title: `error-message-module.code-${errorCode}.country-unavailable-modal-title`,
            details: [`error-message-module.code-${errorCode}.country-unavailable-modal-description`]
          }
        ],
        actionButtons: [
          {
            text: `error-message-module.code-${errorCode}.country-unavailable-modal-button-text`,
            cssClass: 'white-button',
            handler: () => this.modalService.close()
          }
        ]
      }
    };

    return modalComponentContent;
  }

  private invalidInviteeEmailInfoModalComponentProps(errorCode: string): IMeedModalComponentProps {
    const componentProps: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            title: 'error-message-module.error-title',
            details: [`error-message-module.code-${errorCode}`]
          }
        ],
        actionButtons: [
          {
            text: 'error-message-module.dismiss-button',
            cssClass: 'white-button',
            handler: () => {
              this.modalService.close();
            }
          }
        ]
      }
    };

    return componentProps;
  }

  /**
   * @summary
   * This method will show the error message like this
   * "The customer with Tax Payer ID RECL9406024Z7 has been already assigned the Customer ID 00000000355"
   *
   * @param code { string }
   * @param message { string }
   * @returns componentProps { IMeedModalComponentProps }
   */
  private texPayerIdAlreadyAssignedComponentProps(errorCode: string, errorMessage: string): IMeedModalComponentProps {
    const ids = errorMessage.match(/([A-Z+[0-9]+[A-Z]+[0-9]+)|\d+/g);
    const componentProps: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            title: 'error-message-module.error-title',
            details: [`error-message-module.code-${errorCode}`],
            values: {
              texPayerId: ids[0],
              customerId: ids[1]
            }
          }
        ],
        actionButtons: [
          {
            text: 'error-message-module.dismiss-button',
            cssClass: 'white-button',
            handler: () => {
              this.modalService.close();
            }
          }
        ]
      }
    };

    return componentProps;
  }
}
