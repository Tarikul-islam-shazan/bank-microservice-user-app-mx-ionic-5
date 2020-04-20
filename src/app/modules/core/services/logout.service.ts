/**
 * Core Service: Logout service
 * Responseible to track how user logout app, By using manual logout or App session timeout
 * Based on logout reason we show logout success modal.
 * @author Sanitul <sanitul@bs-23.com>
 * Date: March 27, 2020
 */
import { Injectable } from '@angular/core';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';

/**
 * Logout reason as enum
 * @export
 * @enum {number}
 */
export enum LogoutReason {
  AppSessionTimeOut = 0,
  ByUser = 1,
  AuthTokenMissing = 2,
  AuthTokenInValidOrExpired = 3,
  AuthSessionTimeout = 4
}

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private _logoutReason: LogoutReason;
  constructor(private modalService: ModalService) {}
  /**
   * Sets logout reason
   */
  set logoutReason(reason: LogoutReason) {
    this._logoutReason = reason;
  }
  /**
   * Gets logout reason
   */
  get logoutReason(): LogoutReason {
    return this._logoutReason;
  }
  /**
   * Based on logout reason will show logout success modal
   * And return modal action button [login button] event for process auto login if Biometric enable
   * @returns {Promise<boolean>}
   * @memberof LogoutService
   */
  async isLoggedOut(): Promise<boolean> {
    switch (this.logoutReason) {
      case LogoutReason.AppSessionTimeOut:
      case LogoutReason.ByUser:
      case LogoutReason.AuthTokenMissing:
      case LogoutReason.AuthTokenInValidOrExpired:
      case LogoutReason.AuthSessionTimeout:
        return await this.successModal();
    }
  }
  /**
   * Show success modal and return actions button [Login button event true/false]
   * @returns {Promise<boolean>}
   * @memberof LogoutService
   */
  async successModal(): Promise<boolean> {
    return new Promise<boolean>(async resolve => {
      const componentProps: IMeedModalContent = {
        contents: [
          {
            title: 'logout-success-modal.header-title',
            details: ['logout-success-modal.message']
          }
        ],
        actionButtons: [
          {
            text: 'logout-success-modal.login-button',
            cssClass: 'white-button',
            handler: async () => {
              await this.modalService.close();
            }
          }
        ],
        // onDidDismiss will resolve both [login button] and [modal close button]
        onDidDismiss: () => {
          resolve(true);
        }
      };
      await this.modalService.openInfoModalComponent({ componentProps });
    });
  }
}
