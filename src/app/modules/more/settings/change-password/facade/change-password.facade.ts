/**
 * Facade: Change Password facade
 * Details: More Menu>Settings>Change Password: Implementing Change Password Functionality .
 * Date: 25 March,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 * Include Ticket ID:GMA-4749
 */
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { ChangePasswordRequest } from '@app/more/models/more';
import { IMeedModalContent, ModalService, SuccessModalPage } from '@app/shared';
import { Injectable } from '@angular/core';
import { PasswordService } from '@app/more/settings/change-password/services/password.service';
import { Router } from '@angular/router';

@Injectable()
export class ChangePasswordFacade {
  constructor(
    private analyticsService: AnalyticsService,
    private modalService: ModalService,
    private passwordService: PasswordService,
    private router: Router
  ) {}

  /**
   * @summary Subscribing changePassword function of PasswordService
   *
   * @param {string} currentPassword
   * @param {string} newPassword
   * @returns {void}
   * @memberOf ChangePasswordFacade
   */
  changePassword(requestBody: ChangePasswordRequest): void {
    this.passwordService.changePassword(requestBody).subscribe(() => this.showChangePasswordSuccessModal());
  }

  /**
   * @summary Showing Password change success message using SuccessModalPage
   *
   * @returns {void}
   * @memberOf ChangePasswordFacade
   */
  showChangePasswordSuccessModal(): void {
    const componentPropsSuccess: IMeedModalContent = {
      contents: [
        {
          title: 'more-module.change-password.modal-succces-title-message'
        }
      ],
      actionButtons: [
        {
          text: 'more-module.change-password.modal-success-btn-finish',
          cssClass: 'white-button',
          handler: () => this.modalService.close()
        }
      ],
      onDidDismiss: () => {
        this.analyticsService.logEvent(AnalyticsEventTypes.PasswordChanged);
        this.router.navigate(['/more/settings'], { replaceUrl: true });
      }
    };
    this.modalService.openModal(SuccessModalPage, componentPropsSuccess);
  }
}
