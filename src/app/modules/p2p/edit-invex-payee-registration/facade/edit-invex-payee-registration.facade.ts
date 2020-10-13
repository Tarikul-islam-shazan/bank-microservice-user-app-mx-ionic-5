import { Injectable } from '@angular/core';
import { P2PService } from '@app/p2p/services/p2p.service';
import { ModalService, IMeedModalContent, SuccessModalPage } from '@app/shared';
import { Router } from '@angular/router';
import { IContact } from '@app/p2p/models';
import * as moment from 'moment';

@Injectable()
export class EditInvexPayeeRegistrationFacade {
  constructor(private router: Router, private p2pService: P2PService, private modalService: ModalService) {}

  next(contact: IContact) {
    this.p2pService.editInvexContact(contact).subscribe(resp => this.openSuccessModal());
  }

  openSuccessModal(): void {
    const updateExecutionDate = moment().format('MMM DD, YYYY');
    const referenceNumber = '1234551';
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'p2p-module.edit-invex-payee-registration-page.meed-update-success-title',
          details: [
            'p2p-module.edit-invex-payee-registration-page.registration-success-description',
            'p2p-module.edit-invex-payee-registration-page.update-date'
          ],
          reference: 'p2p-module.edit-invex-payee-registration-page.update-ref',
          values: {
            updateExecutionDate,
            referenceNumber
          }
        }
      ],
      actionButtons: [
        {
          text: 'p2p-module.edit-invex-payee-registration-page.done-button-text',
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
