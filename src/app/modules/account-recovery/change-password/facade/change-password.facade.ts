import { Injectable } from '@angular/core';
import { AccountRecoveryService } from '@app/core/services/account-recovery.service';
import { Observable } from 'rxjs';
import jsSHA from 'jssha';
import { SuccessModalPage, ModalService, IMeedModalContent } from '@app/shared';
import { Router } from '@angular/router';
@Injectable()
export class ChangePasswordFacade {
  constructor(private service: AccountRecoveryService, private modalService: ModalService, private router: Router) {}

  resetPassword(password: string): Observable<any> {
    return this.service.resetPassword(this.generateHashPassword(password));
  }

  generateHashPassword(password: string): string {
    const shaObj = new jsSHA('SHA-256', 'TEXT');
    shaObj.update(password);
    return shaObj.getHash('HEX');
  }

  /**
   *  A function used to show a modal when password reset is successed.
   *
   *  Issue: GMA-4228
   *  Date: February 28, 2020
   *  Developer: Md.Kausar <md.kausar@brainstation23.com>
   * @memberof ChangePasswordFacade
   */
  showResetPasswordSuccessModal(): void {
    const componentPropsSuccess: IMeedModalContent = {
      contents: [
        {
          title: 'login-module.change-password.modal-succces-title-message'
        }
      ],
      actionButtons: [
        {
          text: 'login-module.change-password.modal-success-btn-finish',
          cssClass: 'white-button',
          handler: () => {
            this.modalService.close();
            this.router.navigate(['/login-user']);
          }
        }
      ]
    };

    this.modalService.openModal(SuccessModalPage, componentPropsSuccess);
  }
}
