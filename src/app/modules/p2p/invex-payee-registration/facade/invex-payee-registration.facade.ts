import { Injectable } from '@angular/core';
import { P2PService } from '@app/p2p/services/p2p.service';
import { ModalService, IMeedModalContent, SuccessModalPage } from '@app/shared';
import { Router } from '@angular/router';
import { IContact } from '@app/p2p/models';

@Injectable()
export class InvexPayeeRegistrationFacade {
  constructor(private router: Router, private p2pService: P2PService, private modalService: ModalService) {}

  next(contact: IContact) {
    this.p2pService.addInvexContact(contact).subscribe(resp => this.openSuccessModal());
  }

  openSuccessModal(): void {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'p2p-module.registration-type-page.meed-registration-success-title',
          details: ['p2p-module.invex-payee-registration-page.registration-success-description']
        }
      ],
      actionButtons: [
        {
          text: 'p2p-module.registration-type-page.done-button-text',
          cssClass: 'white-button',
          handler: async () => {
            this.modalService.close();
          }
        }
      ],
      onDidDismiss: async () => {
        this.router.navigate(['/p2p/home']);
      }
    };

    this.modalService.openModal(SuccessModalPage, componentProps);
  }
}
