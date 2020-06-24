import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ContactType } from '@app/p2p/models';
import { REG_EX_PATTERNS } from '@app/core';
import { P2PService } from '@app/p2p/services/p2p.service';
import { Observable } from 'rxjs';
import { ModalService, IMeedModalContent, SuccessModalPage } from '@app/shared';

interface IPayeeContact {
  payeeTo: string;
  payeeType: string;
}

@Injectable()
export class PayeeRegistrationTypeFacade {
  constructor(private router: Router, private p2pService: P2PService, private modalService: ModalService) {}

  continue(contact: IPayeeContact) {
    switch (contact.payeeType) {
      case ContactType.Meed:
        this.registerMeedMember({ contactType: contact.payeeType, email: contact.payeeTo });
        break;
      case ContactType.Invex:
        this.router.navigateByUrl('/p2p/invex-payee-registration');
        break;
      case ContactType.Other:
        this.router.navigateByUrl('/p2p/other-bank-payee-registration');
        break;
    }
  }

  verifyMeedMember(email: string): Observable<string[]> {
    return this.p2pService.verifyMember(email);
  }

  isEmail(email: string): boolean {
    const regex = new RegExp(REG_EX_PATTERNS.EMAIL);
    return regex.test(email);
  }

  registerMeedMember(contact: { contactType: string; email: string }) {
    this.p2pService.addMeedContact(contact).subscribe(resp => this.openSuccessModal());
  }

  openSuccessModal(): void {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'p2p-module.registration-type-page.meed-registration-success-title',
          details: ['p2p-module.registration-type-page.meed-registration-success-description']
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
