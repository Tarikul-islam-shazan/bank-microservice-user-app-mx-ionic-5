import { Injectable } from '@angular/core';
import { AccountRecoveryService } from '@app/core/services/account-recovery.service';
import { SuccessModalPage, ModalService, IMeedModalContent } from '@app/shared';
import { Router } from '@angular/router';
import { IRecoverPassword } from '@app/core';
@Injectable()
export class RecoverPasswordFacade {
  constructor(private service: AccountRecoveryService, private modalService: ModalService, private router: Router) {}

  recoverPassword(recoverPasswordParams: IRecoverPassword): void {
    this.service.recoverPassword(recoverPasswordParams).subscribe(() => {
      this.showResetPasswordSuccessModal();
    });
  }

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
