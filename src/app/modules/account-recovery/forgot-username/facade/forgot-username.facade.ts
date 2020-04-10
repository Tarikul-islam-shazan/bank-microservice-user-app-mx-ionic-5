import { Injectable } from '@angular/core';
import { AccountRecoveryService } from '@app/core/services/account-recovery.service';
import { ModalService, SuccessModalPage } from '@app/shared';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ForgotUsernameFacade {
  constructor(
    private service: AccountRecoveryService,
    private modalService: ModalService,
    private router: Router,
    private translate: TranslateService
  ) {}

  forgotUsername(email: string) {
    const componentProps = {
      contents: [
        {
          title: this.translate.instant('login-module.forgot-username-page.forgot-username-modal.modal-title')
        }
      ],
      actionButtons: [
        {
          text: this.translate.instant('login-module.forgot-username-page.forgot-username-modal.modal-btn'),
          cssClass: 'white-button',
          handler: () => {
            this.modalService.close(); // add new modal service close function instead of previous one
            this.router.navigate(['/login-user']);
          }
        }
      ]
    };
    this.service.forgotUsername(email).subscribe(resp => {
      this.modalService.openModal(SuccessModalPage, componentProps);
    });
  }
}
