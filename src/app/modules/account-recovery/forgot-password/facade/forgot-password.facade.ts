import { AccountRecoveryService } from '@app/core/services/account-recovery.service';
import { ITemporaryPassword, ITemporaryPasswordRequest } from '@app/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
import { SuccessModalPage } from '@app/shared/components/success-modal/container/success-modal.page';
import { Router } from '@angular/router';

@Injectable()
export class ForgotPasswordFacade {
  isSecurityQuesVisible = false;
  isUsernameAssigned = false;
  constructor(
    private accountRecoveryService: AccountRecoveryService,
    private modalService: ModalService,
    private router: Router
  ) {}

  requestTemporaryPassword(answer: ITemporaryPasswordRequest): Observable<ITemporaryPassword> {
    return this.accountRecoveryService.requestTemporaryPassword(answer);
  }

  openSuccessModal(): void {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'login-module.forgot-password-page.success-modal.temporary-password-email'
        }
      ],
      actionButtons: [
        {
          text: 'login-module.forgot-password-page.success-modal.continue-button',
          cssClass: 'white-button',
          handler: async () => {
            this.modalService.close();
          }
        }
      ],
      onDidDismiss: async () => {
        this.router.navigate(['/account-recovery/recover-password']);
      }
    };

    this.modalService.openModal(SuccessModalPage, componentProps);
  }
}
